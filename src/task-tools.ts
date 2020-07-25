import { Maybe, just, nothing, isJust } from './maybe';
import { right, left, isRight } from './either';
import { Task, task, resolvedTask, Cancelable } from './task';

export type PromiseFunction<A extends any[], R> = (...args: A) => PromiseLike<R>;
export type TaskFunction<A extends any[], R> = (...args: A) => Task<R>;

export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : never;
export type TaskType<TT extends Task<any>> = PromiseType<TT['_invoke']> extends Cancelable<infer U> ? U : never;

export type PromiseFunctionType<TT extends (...args: any[]) => PromiseLike<any>> = PromiseType<ReturnType<TT>>;
export type TaskFunctionType<TT extends (...args: any[]) => Task<any>> = TaskType<ReturnType<TT>>;

export type TaskGenerator<A extends any[], TT extends Task<any>, R> = (...args: A) => Generator<TT, R, TaskType<TT>>;

/**
 * Lift from plain value/promise to task resolving to that value
 * @param promise promise or plain value to be resolved
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
export function liftPromise<R>(promise: PromiseLike<R>): Task<R> {
  const stub = (_?: Cancelable<R> | PromiseLike<Cancelable<R>> | undefined) => {};

  let globalResolve = stub;

  return task(
    new Promise<Cancelable<R>>((resolve) => {
      globalResolve = resolve;

      promise.then(
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
 * @param promiseFunction function returning promise or plain value to be resolved
 *
 * Userfull for converting exising async functions to task functions for further use
 *
 * @see liftTask
 *
 * @example
 * ```typescript
 * const taskFunction = liftPromiseFunction(someAsyncOperation);
 *
 * const task = taskFunction('someData').fmap((result) => result.length);
 * ```
 */
export function liftPromiseFunction<A extends any[], R>(promiseFunction: PromiseFunction<A, R>): TaskFunction<A, R> {
  return (...args: A) => liftPromise(promiseFunction(...args));
}

/**
 * Create compound task from generator function
 * @param taskGenerator (optionally async) generator function
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
 *     const value1 = castPromise<string>(yield delayedValueTask(source, 400));
 *
 *     const value2 = castPromise<number>(yield delayedValueTask(value1.length, 300));
 *
 *     return value2;
 *   } catch (e) {
 *     return -1;
 *   }
 * });
 * ```
 */
export function generateTask<TT extends Task<any>, R>(taskGenerator: TaskGenerator<[], TT, R>): Task<R> {
  const iterator = taskGenerator();

  const sequentor = (next: IteratorResult<TT, R>): Task<R> => {
    return next.done
      ? resolvedTask(next.value)
      : next.value
          .chain((value) => sequentor(iterator.next(value)))
          .chainRejected((error) => sequentor(iterator.throw(error)));
  };

  return resolvedTask(undefined).chain(() => sequentor(iterator.next()));
}

export function cast<T, R extends T = any>(arg: R): T {
  return arg as T;
}

/**
 * Cast helper
 * @param arg plain value of some compatible type
 * @returns arg casted to the type of specified promise or plain value type
 */
export function castPromise<TT extends PromiseLike<any>, R extends PromiseType<TT> = any>(arg: R): PromiseType<TT> {
  return arg as PromiseType<TT>;
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
export function castPromiseFunction<TT extends PromiseFunction<any[], any>, R extends PromiseFunctionType<TT> = any>(
  arg: R,
): PromiseFunctionType<TT> {
  return arg as PromiseFunctionType<TT>;
}

/**
 * Cast helper
 * @param arg plain value of some compatible type
 * @returns arg casted to the reoslve type of specified function returning task
 */
export function castTaskFunction<TT extends TaskFunction<any[], any>, R extends TaskFunctionType<TT> = any>(
  arg: R,
): TaskFunctionType<TT> {
  return arg as TaskFunctionType<TT>;
}

/**
 * Chain multiple tasks one after another
 * @param taskFunctions list of task functions (without arguments)
 * @returns composite task invoring every task in order and resolving to the list of results
 */
export function sequenceTask<TT extends TaskFunction<[], any>>(taskFunctions: TT[]): Task<TaskFunctionType<TT>[]> {
  return taskFunctions.reduce((prev, taskFunction) => {
    return prev.chain((list) => {
      return taskFunction().fmap((value) => list.concat(value));
    });
  }, resolvedTask<TaskFunctionType<TT>[]>([]));
}

/**
 * Under construction
 */
export function parallelTask<TT extends TaskFunction<[], any>>(taskFunctions: TT[]): Task<TaskFunctionType<TT>[]> {
  const stub = (
    _?: Cancelable<TaskFunctionType<TT>[]> | PromiseLike<Cancelable<TaskFunctionType<TT>[]>> | undefined,
  ) => {};

  let globalResolve = stub;

  const tasks = taskFunctions.map((taskFunction) => taskFunction());

  return task(
    new Promise<Cancelable<TaskFunctionType<TT>[]>>((resolve) => {
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
 * const value = castPromise<number>(yield delayedValueTask(42, 1000));
 *
 * console.log("It's past 1 second and here's a value:", value)
 * ```
 */
export function timeoutTask(delay: number) {
  let handler: NodeJS.Timeout;

  const stub = (_?: Cancelable<void> | PromiseLike<Cancelable<void>> | undefined) => {};

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
export function repeatTask<T>(taskFunction: TaskFunction<[], T>, repeatFunction: TaskFunction<[], void>) {
  return generateTask(function*() {
    let result: Maybe<T> = nothing();

    do {
      try {
        result = just(castTaskFunction<typeof taskFunction>(yield taskFunction()));
      } catch (error) {
        yield repeatFunction();
      }
    } while (!isJust(result));

    return result.just;
  });
}
