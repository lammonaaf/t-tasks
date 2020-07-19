import { Maybe, just, nothing, isJust } from './maybe';
import { right, left, isRight } from './either';
import { Task, task, resolvedTask, Cancelable } from './task';

export type Result<R> = PromiseLike<R> | R;

export type ResultCreator<A extends any[], R> = (...args: A) => Result<R>;
export type TaskCreator<A extends any[], R> = (...args: A) => Task<R>;

export type ResultType<T> = T extends PromiseLike<infer U> ? U : T;
export type TaskType<TT extends Task<any>> = ResultType<TT['_invoke']> extends Cancelable<infer U> ? U : never;

export type ResultCreatorType<TT extends (...args: any[]) => Result<any>> = ResultType<ReturnType<TT>>;
export type TaskCreatorType<TT extends (...args: any[]) => Task<any>> = TaskType<ReturnType<TT>>;

export type TaskGenerator<A extends any[], TT extends Task<any>, R> = (
  ...args: A
) => Generator<TT, R, TaskType<TT>> | AsyncGenerator<TT, R, TaskType<TT>>;

/**
 * Lift from plain value/promise to task resolving to that value
 * @param from promise or plain value to be resolved
 *
 * Userfull for converting promises to tasks
 * If converted task is canceled or failed externally return value will be ignored without side-effects
 * All tasks are no-trowing by default, any occured errors are returned as Either:Left
 *
 * @example
 * ```typescript
 * const task = liftTask(someAsyncOperation('someData')).fmap((result) => result.length);
 * ```
 */
export function liftResult<R>(from: Result<R>): Task<R> {
  const stub = (_?: Result<Cancelable<R>> | undefined) => {};

  let globalResolve = stub;

  return task(
    new Promise<Cancelable<R>>((resolve) => {
      globalResolve = resolve;

      Promise.resolve(from).then(
        (value) => {
          globalResolve(just(right(value)));
          globalResolve = stub;
        },
        (error) => {
          globalResolve(just(left(error)));
          globalResolve = stub;
        },
      );
    }),
    (error: Maybe<any>) => {
      if (isJust(error)) {
        globalResolve(just(left(error.just)));
      } else {
        globalResolve(nothing());
      }
      globalResolve = stub;
    },
  );
}

/**
 * Lift from function returning value/promise to function returning task resolving to that value
 * @param creator function returning promise or plain value to be resolved
 *
 * Userfull for converting exising async functions to task creators for further use
 *
 * @see liftTask
 *
 * @example
 * ```typescript
 * const taskCreator = liftTaskCreator(someAsyncOperation);
 *
 * const task = taskCreator('someData').fmap((result) => result.length);
 * ```
 */
export function liftResultCreator<A extends any[], R>(creator: ResultCreator<A, R>): TaskCreator<A, R> {
  return (...args: A) => liftResult(creator(...args));
}

/**
 * Create compound task from generator function
 * @param generator (optionally async) generator function
 *
 * Applying yield to task within the generator function awaits task and returns underlying value in case of success
 *
 * In case of failure an error is thrown and may be caught by try-catch
 *
 * If error is not caught the task is interrupted and returns 'just left error' immediately. In case of cancelation the task is interrupted and returns 'nothing' immediately
 *
 * @note compound task execution is interrupted only at yield statements, so despite returning immediately any promise-based chains would continue running until the first yield
 * @note due to type unpredictability you HAVE to cast yield result to avoid werid type issues. Some helper functions for casting are provided
 *
 * @example
 * ```typescript
 * const task = generateTask(async function*() {
 *   try {
 *     const source = await getData();
 *
 *     const value1 = castResult<string>(yield delayedValueTask(source, 400));
 *
 *     const value2 = castResult<number>(yield delayedValueTask(value1.length, 300));
 *
 *     return value2;
 *   } catch (e) {
 *     return -1;
 *   }
 * });
 * ```
 */
export function generateTask<TT extends Task<any>, R>(generator: TaskGenerator<[], TT, R>): Task<R> {
  const iterator = generator();

  const sequentor = (next: IteratorResult<TT, R>): Task<R> => {
    return next.done
      ? resolvedTask<R>(next.value)
      : next.value
          .chain((value: TaskType<TT>) => {
            return liftResult(Promise.resolve().then(() => iterator.next(value))).chain(sequentor);
          })
          .chainRejected((error: any) => {
            return liftResult(Promise.resolve().then(() => iterator.throw(error))).chain(sequentor);
          });
  };

  return liftResult(Promise.resolve().then(() => iterator.next())).chain(sequentor);
}

/**
 * Cast helper
 * @param arg plain value of some compatible type
 * @returns arg casted to the type of specified promise or plain value type
 */
export function castResult<TT extends Result<any>, R extends ResultType<TT> = any>(arg: R): ResultType<TT> {
  return arg as ResultType<TT>;
}

/**
 * Cast helper
 * @param arg plain value of some compatible type
 * @returns arg casted to the reoslve type of specified task type
 */
export function castTask<TT extends Task<any>, R extends TaskType<TT> = any>(arg: R): TaskType<TT> {
  return arg as TaskType<TT>;
}

/**
 * Cast helper
 * @param arg plain value of some compatible type
 * @returns arg casted to the return type of specified function returning promise or plain value
 */
export function castResultCreator<TT extends ResultCreator<any[], any>, R extends ResultCreatorType<TT> = any>(
  arg: R,
): ResultCreatorType<TT> {
  return arg as ResultCreatorType<TT>;
}

/**
 * Cast helper
 * @param arg plain value of some compatible type
 * @returns arg casted to the reoslve type of specified function returning task
 */
export function castTaskCreator<TT extends TaskCreator<any[], any>, R extends TaskCreatorType<TT> = any>(
  arg: R,
): TaskCreatorType<TT> {
  return arg as TaskCreatorType<TT>;
}

/**
 * Chain multiple tasks one after another
 * @param taskCreators list of task creators (without arguments)
 * @returns composite task invoring every task in order and resolving to the list of results
 */
export function sequenceTask<TT extends TaskCreator<[], any>>(taskCreators: TT[]): Task<TaskCreatorType<TT>[]> {
  return taskCreators.reduce((prev, taskCreator) => {
    return prev.chain((list) => {
      return taskCreator().fmap((value) => list.concat(value));
    });
  }, resolvedTask<TaskCreatorType<TT>[]>([]));
}

/**
 * Under construction
 */
export function parallelTask<TT extends TaskCreator<[], any>>(taskCreators: TT[]): Task<TaskCreatorType<TT>[]> {
  const stub = (_?: Result<Cancelable<TaskCreatorType<TT>[]>> | undefined) => {};

  let globalResolve = stub;

  const tasks = taskCreators.map((creator) => creator());

  return task(
    new Promise<Cancelable<TaskCreatorType<TT>[]>>((resolve) => {
      globalResolve = resolve;

      Promise.all(
        tasks.map((task) => {
          return task.resolve().then((result) => {
            if (isJust(result)) {
              if (isRight(result.just)) {
                return result.just.right;
              } else {
                throw just(result.just.left);
              }
            } else {
              throw nothing();
            }
          });
        }),
      ).then(
        (result) => {
          globalResolve(just(right(result)));
          globalResolve = stub;
        },
        (error: Maybe<any>) => {
          if (isJust(error)) {
            globalResolve(just(left(error.just)));
            globalResolve = stub;
          } else {
            globalResolve(nothing());
            globalResolve = stub;
          }
        },
      );
    }),
    (error: Maybe<any>) => {
      if (isJust(error)) {
        globalResolve(just(left(error.just)));
      } else {
        globalResolve(nothing());
      }
      globalResolve = stub;

      tasks.forEach((task) => task.cancel());
    },
  );
}

/**
 * Generic timeout task
 * @param delay duration in ms after that the task resolves to void
 *
 * Userfull for creating delays in task chains or implementing limiting tasks
 *
 * @example
 * ```typescript
 * const delayedValueTask = <T>(value: T, delay: number) => timeoutTask(delay).fmap(() => value);
 *
 * const value = castResult<number>(yield delayedValueTask(42, 1000));
 *
 * console.log("It's past 1 second and here's a value:", value)
 * ```
 */
export function timeoutTask(delay: number) {
  let handler: NodeJS.Timeout;

  const stub = (_?: Result<Cancelable<void>> | undefined) => {};

  let globalResolve = stub;

  return task(
    new Promise<Cancelable<void>>((resolve) => {
      globalResolve = resolve;

      handler = setTimeout(() => {
        globalResolve(just(right(undefined)));

        globalResolve = stub;
      }, delay);
    }),
    (error: Maybe<any>) => {
      if (isJust(error)) {
        globalResolve(just(left(error.just)));
      } else {
        globalResolve(nothing());
      }
      globalResolve = stub;

      clearTimeout(handler);
    },
  );
}

/**
 * Under construction
 */
export function limitTask<T>(task: Task<T>, limit: Task<void>) {
  const mappedLimit = limit.tap(() => task.cancel());
  const mappedTask = task
    .tap(() => mappedLimit.cancel())
    .tapCanceled(() => mappedLimit.cancel())
    .tapRejected(() => mappedLimit.cancel());

  return mappedTask;
}

/**
 * Under construction
 */
export function repeatTask<T>(taskCreator: () => Task<T>, repeatCreator: () => Task<void>) {
  return generateTask(function*() {
    let result: Maybe<T> = nothing();

    do {
      try {
        result = just(castTaskCreator<typeof taskCreator>(yield taskCreator()));
      } catch (error) {
        yield repeatCreator();
      }
    } while (!isJust(result));

    return result.just;
  });
}
