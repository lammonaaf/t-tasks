import { Maybe, just, nothing } from './maybe';
import { right, left } from './either';
import { Task, task, resolvedTask, Cancelable } from './task';

/**
 * Function returning Promise (async function)
 *
 * @template A argument types
 * @template R returned promise resolve type
 */
export type PromiseFunction<A extends any[], R> = (...args: A) => PromiseLike<R>;

/**
 * Function returning Task
 *
 * @template A argument types
 * @template R returned task resolve type
 */
export type TaskFunction<A extends any[], R> = (...args: A) => Task<R>;

/**
 * Resolve type of a promise
 *
 * @template TT promise type
 */
export type PromiseType<TT extends PromiseLike<any>> = TT extends PromiseLike<infer U> ? U : never;

/**
 * Resolve type of a task
 *
 * @template TT task type
 */
export type TaskType<TT extends Task<any>> = PromiseType<TT['_invoke']> extends Cancelable<infer U> ? U : never;

/**
 * Resolve type of a promise returned by function
 *
 * @template TT promsie function Type
 */
export type PromiseFunctionType<TT extends PromiseFunction<any[], any>> = PromiseType<ReturnType<TT>>;

/**
 * Resolve type of a task returned by function
 *
 * @template TT task function Type
 */
export type TaskFunctionType<TT extends TaskFunction<any[], any>> = TaskType<ReturnType<TT>>;

/**
 * Task generator
 *
 * @template TT yielded task type
 * @template R returned task resolve type
 *
 * @example
 * ```typescript
 * const generatorFunction = function*(): TaskGenerator<Task<string>, number> {
 *   const v = cast<string>(yield someTaskFunction());
 *
 *   return v.length;
 * };
 * ```
 */
export type TaskGenerator<TT extends Task<any>, R> = Generator<TT, R, TaskType<TT>>;

/**
 * Function returning task generator (generator function)
 *
 * @template A argument types
 * @template TT yielded task type
 * @template R returned task resolve type
 *
 * @example
 * ```typescript
 * const generatorFunction: TaskGeneratorFunction<[], Task<string>, number> = function*() {
 *   const v = cast<string>(yield someTaskFunction());
 *
 *   return v.length;
 * };
 * ```
 */
export type TaskGeneratorFunction<A extends any[], TT extends Task<any>, R> = (...args: A) => TaskGenerator<TT, R>;

/**
 * Lift from promise to task resolving to that promise result
 *
 * Userfull for converting promises to tasks
 * If converted task is canceled or failed externally return value will be ignored without side-effects
 * All tasks are no-trowing by default, any occured errors are returned as Left<any>
 *
 * @template R returned task resolve type
 * @param promise promise to be resolved
 * @returns task resolving to specified promise value
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
      error.tap((error) => globalResolve(just(left(error)))).orTap(() => globalResolve(nothing()));

      globalResolve = stub;
    },
  );
}

/**
 * Lift from function returning value/promise to function returning task resolving to that value
 *
 * Userfull for converting exising async functions to task functions for further use
 *
 * @template A returned function's argument types
 * @template R returned function's result task's resolve type
 * @param promiseFunction function returning promise or plain value to be resolved
 * @returns task function wrapping specified promise function
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
 *
 * Applying yield to task within the generator function awaits task and returns underlying value in case of success

 * In case of failure an error is thrown and may be caught by try-catch
 *
 * If error is not caught the task is interrupted and returns 'just left error' immediately. In case of cancelation the task is interrupted and returns 'nothing' immediately
 *
 * @template TT yielded task type
 * @template R returned task resolve type
 * @param taskGeneratorFunction task generator function
 * @returns task resolving to generator's return type
 *
 * @note compound task execution is interrupted only at yield statements, so despite returning immediately any promise-based chains would continue running until the first yield
 * @note due to type unpredictability you HAVE to cast yield result to avoid werid type issues. Some helper functions for casting are provided
 *
 * @example
 * ```typescript
 * const task = generateTask(function*() {
 *   try {
 *     const value1 = castPromise<string>(yield delayedValueTask('data', 400));
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
export function generateTask<TT extends Task<any>, R>(
  taskGeneratorFunction: TaskGeneratorFunction<[], TT, R>,
): Task<R> {
  const generator = taskGeneratorFunction();

  const sequentor = (next: IteratorResult<TT, R>): Task<R> => {
    return next.done
      ? resolvedTask(next.value)
      : next.value
          .chain((value) => sequentor(generator.next(value)))
          .chainRejected((error) => sequentor(generator.throw(error)));
  };

  return resolvedTask(undefined).chain(() => sequentor(generator.next()));
}

/**
 * Generic timeout task
 *
 * Userfull for creating delays in task chains or implementing limiting tasks
 *
 * @param delay duration in ms after that the task resolves to void
 * @returns task resolving to void (undefined) after specified delay
 *
 * @example
 * ```typescript
 * const delayedValueTask = <T>(value: T, delay: number) => timeoutTask(delay).fmap(() => value);
 * // ... //
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
      error.tap((error) => globalResolve(just(left(error)))).orTap(() => globalResolve(nothing()));

      globalResolve = stub;

      clearTimeout(handler);
    },
  );
}

/**
 * Cast helper (with plain type specified)
 *
 * Useful when an exact type of the expression is short and well-known
 *
 * @template T target type
 * @template R source type
 * @param arg plain value of compatible type
 * @returns arg casted to the specified type
 *
 * @example
 * ```typescript
 * const result = cast<string>(yield someTaskFunction());
 * ```
 */
export function cast<T, R extends T = any>(arg: R): T {
  return arg as T;
}

/**
 * Cast helper (with promise type specified)
 *
 * Useful with ```typeof``` when promise is provided
 *
 * @template TT target promise type
 * @template R source type
 * @param arg plain value of compatible type
 * @returns arg casted to the specified promise's resolve type
 *
 * @example
 * ```typescript
 * const promise = somePromiseFunction();
 * // ... //
 * const result = castPromise<typeof promise>(yield liftPromise(promise));
 * ```
 */
export function castPromise<TT extends PromiseLike<any>, R extends PromiseType<TT> = any>(arg: R): PromiseType<TT> {
  return arg as PromiseType<TT>;
}

/**
 * Cast helper (with task type specified)
 *
 * Useful with ```typeof``` when task is provided
 *
 * @template TT target task type
 * @template R source type
 * @param arg plain value of compatible type
 * @returns arg casted to the specified task's resolve type
 *
 * @example
 * ```typescript
 * const task = someTaskFunction();
 * // ... //
 * const result = castTask<typeof task>(yield task);
 * ```
 */
export function castTask<TT extends Task<any>, R extends TaskType<TT> = any>(arg: R): TaskType<TT> {
  return arg as TaskType<TT>;
}

/**
 * Cast helper (with promise function type specified)
 *
 * Useful with ```typeof``` when an async function is lifted to task in-place
 *
 * @template TT type of promise function resolving to target type
 * @template R source type
 * @param arg plain value of compatible type
 * @returns arg casted to the return type of specified function's returned promise
 *
 * @example
 * ```typescript
 * const result = castPromiseFunction<typeof somePromiseFunction>(
 *   yield liftPromise(somePromiseFunction()),
 * );
 * ```
 */
export function castPromiseFunction<TT extends PromiseFunction<any[], any>, R extends PromiseFunctionType<TT> = any>(
  arg: R,
): PromiseFunctionType<TT> {
  return arg as PromiseFunctionType<TT>;
}

/**
 * Cast helper (with task function type specified)
 *
 * Useful with ```typeof``` when an task function is used
 *
 * @template TT type of task function resolving to target type
 * @template R source type
 * @param arg plain value of some compatible type
 * @returns arg casted to the reoslve type of specified function's returned task
 *
 * @example
 * ```typescript
 * const someTaskFunction = liftPromsieFunction(somePromiseFunction);
 * // ... //
 * const result = castTaskFunction<typeof someTaskFunction>(
 *   yield someTaskFunction(),
 * );
 * ```
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
            if (result.isJust()) {
              if (result.just.isRight()) {
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
          if (error.isJust()) {
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
      if (error.isJust()) {
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
  const iteration = () => {
    return taskFunction()
      .fmap(just)
      .chainRejected(() => repeatFunction().fmap(nothing));
  };

  const sequentor = (maybe: Maybe<T>): Task<T> => {
    return maybe
      .map(resolvedTask) // return on success
      .orMap(() => iteration().chain(sequentor)).just; // repeat on failure
  };

  return sequentor(nothing());
}
