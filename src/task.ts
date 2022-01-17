import { Maybe, Just } from './maybe';
import { Either, Right } from './either';

/**
 * Shortcut for monadic Either type, where erroneous value is of type any
 *
 * @template R underlying type
 */
export type Rejectable<R> = Either<R, any>;

/**
 * Shortcut for underlying task result type
 *
 * @template R underlying type
 */
export type Cancelable<R> = Maybe<Rejectable<R>>;

/**
 * Function returning Task
 *
 * @template A argument types
 * @template R returned task resolve type
 */
export type TaskFunction<A extends unknown[], R> = (...args: A) => Task<R>;

/**
 * Task generator
 *
 * @template TT yielded task type
 * @template R returned task resolve type
 *
 * @example
 * ```typescript
 * const generatorFunction = function*(): TaskGenerator<unknown, Task<string>, number> {
 *   const v = yield* someTaskFunction().generator();
 *
 *   return v.length;
 * };
 * ```
 */
export type TaskGenerator<T, TT extends Task<T>, R> = Generator<TT, R, T>;

/**
 * Function returning task generator (generator function)
 *
 * @template A argument types
 * @template TT yielded task type
 * @template R returned task resolve type
 *
 * @example
 * ```typescript
 * const generatorFunction: TaskGeneratorFunction<[], unknown, Task<string>, number> = function*() {
 *   const v = yield* someTaskFunction().generator();
 *
 *   return v.length;
 * };
 * ```
 */
export type TaskGeneratorFunction<A extends unknown[], T, TT extends Task<T>, R> = (...args: A) => TaskGenerator<T, TT, R>;

/**
 * Task monad interface
 *
 * @template R task resolve type
 */
export interface Task<R> extends TaskBase<R> {
  /**
   * Invoke callback when task is resolved (and only then)
   *
   * @param op callback to invoke
   * @returns self
   */
  tap(op: (value: R) => void): Task<R>;

  /**
   * Invoke callback when task is rejected (and only then)
   *
   * @param op callback to invoke
   * @returns self
   */
  tapRejected(op: (error: any) => void): Task<R>;

  /**
   * Invoke callback when task is canceled (and only then)
   *
   * @param op callback to invoke
   * @returns self
   */
  tapCanceled(op: () => void): Task<R>;

  /**
   * Invoke a dedicated callback according to task resolution
   *
   * @param op.resolved callback to invoke on success
   * @param op.rejected callback to invoke on failure
   * @param op.canceled callback to invoke on cancelation
   * @returns self
   */
  matchTap(op: { resolved: (value: R) => void; rejected: (error: any) => void; canceled: () => void }): Task<R>;

  /**
   * Invoke transformer when task is resolved (and only then) and return it's result instead
   *
   * @template R2 transformer return type
   * @param op transformer to invoke
   * @returns task returning transformer result
   */
  map<R2>(op: (value: R) => R2): Task<R2>;

  /**
   * Invoke transformer when task is rejected (and only then) and return it's result instead
   *
   * @template R2 fallback return type
   * @param op transformer to invoke
   * @returns task returning fallback result in case of failure
   */
  mapRejected<R2>(op: (error: any) => R2): Task<R | R2>;

  /**
   * Invoke transformer when task is canceled (and only then) and return it's result instead
   *
   * @template R2 fallback return type
   * @param op transformer to invoke
   * @returns task returning fallback result in case of cancelation
   */
  mapCanceled<R2>(op: () => R2): Task<R | R2>;

  /**
   * Invoke a dedicated transformer according to task resolution
   *
   * @template R2 success transformer return type
   * @template R3 failure transformer return type
   * @template R4 cancelation transformer return type
   * @param op.resolved transformer to invoke on success
   * @param op.rejected transformer to invoke on failure
   * @param op.canceled transformer to invoke on cancelation
   * @returns task resolving to a corresponding transformer result
   */
  matchMap<R2, R3 = R2, R4 = R3>(op: { resolved: (value: R) => R2; rejected: (error: any) => R3; canceled: () => R4 }): Task<R2 | R3 | R4>;

  /**
   * Invoke transformer when task is resolved (and only then) and continue execution with it's result
   *
   * @template R2 transformer task resolve type
   * @param op transformer to invoke
   * @returns task chaining to transformer result task
   */
  chain<R2>(op: (value: R) => Task<R2>): Task<R2>;

  /**
   * Invoke transformer when task is rejected (and only then) and continue execution with it's result
   *
   * @template R2 fallback task resolve type
   * @param op transformer to invoke
   * @returns task chaining to fallback task in case of failure
   */
  chainRejected<R2>(op: (error: any) => Task<R2>): Task<R | R2>;

  /**
   * Invoke transformer when task is canceled (and only then) and continue execution with it's result
   *
   * @template R2 fallback task resolve type
   * @param op transformer to invoke
   * @returns task chaining to fallback task in case of cancelation
   */
  chainCanceled<R2>(op: () => Task<R2>): Task<R | R2>;

  /**
   * Invoke a dedicated transformer according to task resolution and continue execution with it's result
   *
   * @template R2 success transformer resolve type
   * @template R3 failure transformer resolve type
   * @template R4 cancelation transformer resolve type
   * @param op.resolved transformer to invoke on success
   * @param op.rejected transformer to invoke on failure
   * @param op.canceled transformer to invoke on cancelation
   * @returns task chaining to a corresponding transformer result
   */
  matchChain<R2, R3 = R2, R4 = R3>(op: { resolved: (value: R) => Task<R2>; rejected: (error: any) => Task<R3>; canceled: () => Task<R4> }): Task<R2 | R3 | R4>;

  /**
   * Return underlying promise in order to await result
   *
   * @returns underlying promise
   */
  resolve: () => TaskInvoke<R>;

  /**
   * Invoke underlying canel method without error
   */
  cancel: () => void;

  /**
   * Invoke underlying canel method with error
   *
   * @param error error value to be injected from outside
   */
  reject: (error: any) => void;

  /**
   * Wrap task to singleton generator
   *
   * Userful in order to avoid ambiguous yied types
   *
   * @returns generator of task wrapping the task
   * @example
   * ```typescript
   * const getString = () => Task.resolved('hello');
   * const getLength = (data: string) => Task.resolved(data.length);
   *
   * // ..... //
   *
   * Task.generate(function* () {
   *   const data = yield getString(); // data: string | number
   *   const length = yield getLength(data); // length: string | number
   *
   *   return length;
   * });
   *
   * // ..... //
   *
   * Task.generate(function* () {
   *   const data = yield* getString().generator(); // data: string
   *   const length = yield* getLength(data).generator(); // length: number
   *
   *   return length;
   * });
   * ```
   */
  generator: TaskGeneratorFunction<[], unknown, Task<R>, R>;
}

export namespace Task {
  /**
   * Custom task monad constructor
   *
   * @template R returned task's resolve type
   * @param invoke promise defining task execution
   * @param cancel cancelation function
   * @returns task resolving to resolve value of invoke
   *
   * @note low-level primitive for creating custom tasks, not intended for general use
   */
  export function create<R>(invoke: TaskInvoke<R>, cancel: TaskCancel): Task<R> {
    return new TaskClass<R>(invoke, cancel);
  }

  /**
   * Invariant task constructor creating resolved task from plain value
   *
   * @template R returned task's resolve type
   * @param value value to be returned upon awaiting
   * @returns task resolving to specified value
   */
  export function resolved<R>(value: R) {
    return Task.create<R>(Promise.resolve(Maybe.just(Either.right(value))), () => void undefined);
  }

  /**
   * Invariant task constructor creating rejected task from error value
   *
   * @template R returned task's resolve type
   * @param error error to be returned upon awaiting
   * @returns task resolving to specified value
   */
  export function rejected<R>(error: any) {
    return Task.create<R>(Promise.resolve(Maybe.just(Either.left(error))), () => void undefined);
  }

  /**
   * Invariant task constructor creating canceled task
   *
   * @template R returned task's resolve type
   * @returns task resolving to specified value
   */
  export function canceled<R>() {
    return Task.create<R>(Promise.resolve(Maybe.nothing()), () => void undefined);
  }

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
   * const task = Task.fromPromise(someAsyncOperation('someData')).map((result) => result.length);
   * ```
   */
  export function fromPromise<R>(promise: PromiseLike<R>): Task<R> {
    const [resolve, setResolve] = resolver<Cancelable<R>>();

    return Task.create(
      new Promise<Cancelable<R>>((_resolve) => {
        setResolve(_resolve);

        promise
          .then(Either.right, Either.left)
          .then(Maybe.just)
          .then(resolve);
      }),
      (error: Maybe<any>) => resolve(error.map(Either.left)),
    );
  }

  /**
   * Lift from sync function to task resolving to said function result
   *
   * Generally, functions are not considered tasks as they cannot be interrupted in any way
   * However there may be cases when impure function performs actions leading to cancelling or failing the task they are called from
   * Without such wrapper such cases would lead to ignoring said cancelation and continuilg task chain
   * This function is mostly used internally and is not expected to be widely used except of some edge scenarios
   *
   * If converted task is canceled or failed externally return value will be ignored without side-effects
   * All tasks are no-trowing by default, any occured errors are returned as Left<any>
   *
   * @template R returned task resolve type
   * @param producer function to be wrapped to a task
   * @param cancelRef reference object allowing to set cancelation function prior to invoking function
   * @returns task resolving to the specified function's result
   *
   * @example
   * ```typescript
   * const cancelRef = { cancel: () => {} };
   *
   * const task = Task.fromFunction(() => someFunction('someData'), cancelRef).map((result) => result.length);
   * ```
   */
  export function fromFunction<R>(producer: () => R, cancelRef: { cancel: TaskCancel }): Task<R> {
    const [resolve, setResolve] = resolver<Cancelable<R>>();

    const cancel = (error: Maybe<any>) => resolve(error.map(Either.left));

    cancelRef.cancel = cancel;

    return Task.create(
      new Promise<Cancelable<R>>((_resolve) => {
        setResolve(_resolve);

        try {
          resolve(Maybe.just(Either.right(producer())));
        } catch (e) {
          resolve(Maybe.just(Either.left(e)));
        }
      }),
      cancel,
    );
  }

  /**
   * Convinience shortcut for yielding async functions as tasks
   *
   * @template R returned generator resolve type
   * @param promise promise to be resolved
   * @returns generator to be be used with yield*
   */
  export function promiseGenerator<R>(promise: PromiseLike<R>) {
    return Task.fromPromise(promise).generator();
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
   * @see Task.fromPromise
   *
   * @example
   * ```typescript
   * const taskFunction = liftPromiseFunction(someAsyncOperation);
   *
   * const task = taskFunction('someData').map((result) => result.length);
   * ```
   */
  export function lift<A extends unknown[], R>(promiseFunction: (...args: A) => PromiseLike<R>): TaskFunction<A, R> {
    return (...args: A) => Task.fromPromise(promiseFunction(...args));
  }

  /**
   * Create compound task from generator function
   *
   * Applying yield to task within the generator function awaits the task and returns underlying value in case of success
   * However the convinient option for typescript is to use ```yield* task.generator()``` as othervise one may have to deal with union types
   *
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
   * @note due to type unpredictability you HAVE to use ```.generator()``` together with yield* to avoid type issues, despite the fact that task may be yielded directly
   *
   * @example
   * ```typescript
   * const task = Task.generate(function*() {
   *   try {
   *     const value1 = yield* delayedValueTask('data', 400).generator();
   *
   *     const value2 = yield* delayedValueTask(value1.length, 300).generator();
   *
   *     return value2;
   *   } catch (e) {
   *     return -1;
   *   }
   * });
   * ```
   */
  export function generate<T, TT extends Task<T>, R>(taskGeneratorFunction: TaskGeneratorFunction<[], T, TT, R>): Task<R> {
    const generator = taskGeneratorFunction();

    const sequentor = (next: IteratorResult<TT, R>): Task<R> => {
      return next.done
        ? Task.resolved(next.value)
        : next.value.matchChain<R>({
            resolved: (value) => sequentor(generator.next(value)),
            rejected: (error) => sequentor(generator.throw(error)),
            canceled: Task.canceled,
          });
    };

    return Task.resolved(undefined).chain(() => sequentor(generator.next()));
  }

  /**
   * Generic timeout task
   *
   * Usefull for creating delays in task chains or implementing limiting tasks
   *
   * @param delay duration in ms after that the task resolves to void
   * @returns task resolving to void (undefined) after specified delay
   *
   * @example
   * ```typescript
   * const delayedValueTask = <T>(value: T, delay: number) => Task.timeout(delay).map(() => value);
   * // ... //
   * const value = yield* delayedValueTask(42, 1000).generator();
   *
   * console.log("It's past 1 second and here's a value:", value)
   * ```
   */
  export function timeout(delay: number) {
    return fromCallback<NodeJS.Timeout, void>((resolve) => setTimeout(() => resolve(), delay), clearTimeout);
  }

  /**
   * Generic callback task
   *
   * Usefull for creating custom tasks from success and error callbacks and cancelaton function. Synchronous callbacks are not supported, @see fromFuction
   *
   * @param create task body with success and error callbacks
   * @param cancel cancelation function intended for stopping task execution
   * @returns task resolving to success value
   *
   * @example
   * ```typescript
   * export function timeout(delay: number) {
   *   return fromCallback<NodeJS.Timeout, void>((resolve) => setTimeout(() => resolve(), delay), clearTimeout);
   * }
   * ```
   */
  export function fromCallback<H, R>(create: (resolve: (result: R) => void, reject: (error: any) => void) => H, cancel: (handler: H) => void): Task<R> {
    let handler: H;

    const [resolve, setResolve] = resolver<Cancelable<R>>();

    return Task.create(
      new Promise<Cancelable<R>>((_resolve) => {
        setResolve(_resolve);

        handler = create(
          (r) => resolve(Maybe.just(Either.right(r))),
          (e) => resolve(Maybe.just(Either.left(e))),
        );
      }),
      (error: Maybe<any>) => {
        resolve(error.map(Either.left));

        cancel(handler);
      },
    );
  }

  /**
   * Start multiple tasks one after another
   *
   * @param taskFunctions list of task functions (without arguments)
   * @returns composite task invoring every task in order and resolving to the list of results
   */
  export function sequence<T>(taskFunctions: Iterable<TaskFunction<[], T>>): Task<T[]> {
    return Array.from(taskFunctions).reduce((prev, taskFunction) => {
      return prev.chain((list) => {
        return taskFunction().map((value) => list.concat(value));
      });
    }, Task.resolved<T[]>([]));
  }

  /**
   * Execute all tasks in parallel and return list of results
   *
   * Resulting task resolves when all tasks are resolved, returning list of tasks results maintaining result order
   * In case of failure (external or internal) resulting task is immediately immediately rejected with that error and all pending tasks are canceled
   * In case of cancelation resulting task is immediately immediately canceled together with all pending tasks
   *
   * @note direct equivalent of Promise.all
   *
   * @template T underlying task type
   * @param tasks iterable of tasks to execute
   * @retuirns task resolving to the list of results
   */
  export function all<T>(tasks: Iterable<Task<T>>) {
    const [resolve, setResolve] = resolver<Cancelable<T[]>>();

    const taskArray = Array.from(tasks);

    const cancel = (error: Maybe<any>) => taskArray.forEach((task) => task._cancel(error));

    const list = taskArray.map<Maybe<T>>(Maybe.nothing);

    const resolved = (value: T, i: number) => {
      list[i] = Maybe.just(value);

      if (Maybe.everyJust(list)) {
        resolve(Maybe.just(Either.right(list.map(Just.just))));
      }
    };
    const rejected = (error: Maybe<any>) => {
      resolve(error.map(Either.left));
      cancel(error);
    };

    return Task.create(
      new Promise<Cancelable<T[]>>((_resolve) => {
        setResolve(_resolve);

        if (taskArray.length < 1) {
          return resolve(Maybe.just(Either.right([])));
        }

        taskArray.map((task, i) => {
          return task.matchTap({
            resolved: (value) => resolved(value, i),
            rejected: (error) => rejected(Maybe.just(error)),
            canceled: () => rejected(Maybe.nothing()),
          });
        });
      }),
      cancel,
    );
  }

  /**
   * Execute all tasks in parallel and return the result of the first successful one
   *
   * Resulting task resolves when the first tasks is successfuly resolved, returning it's result
   * In case of external task rejecttion all tasks are rejected with that error and resulting task is rejected with an array of errors
   * In case of internal task rejection the execution is continued untill fthe first task resolves succesfully or all the tasks are rejected this way resulting task is rejected with an array of errors
   * In case of cancelation resulting task is immediately immediately canceled together with all pending tasks
   *
   * @note direct equivalent of Promise.any
   *
   * @template T underlying task type
   * @param tasks iterable of tasks to execute
   * @retuirns task resolving to the result of first successfull task
   */
  export function any<T>(tasks: Iterable<Task<T>>) {
    const [resolve, setResolve] = resolver<Cancelable<T>>();

    const taskArray = Array.from(tasks);

    const cancel = (error: Maybe<any>) => taskArray.forEach((task) => task._cancel(error));

    const list = taskArray.map<Maybe<any>>(Maybe.nothing);

    const resolved = (value: Maybe<T>) => {
      resolve(value.map(Either.right));
      cancel(Maybe.nothing());
    };
    const rejected = (error: any, i: number) => {
      list[i] = Maybe.just(error);

      if (Maybe.everyJust(list)) {
        resolve(Maybe.just(Either.left(list.map(Just.just))));
      }
    };

    return Task.create(
      new Promise<Cancelable<T>>((_resolve) => {
        setResolve(_resolve);

        if (taskArray.length < 1) {
          return resolve(Maybe.nothing());
        }

        taskArray.map((task, i) => {
          return task.matchTap({
            resolved: (value) => resolved(Maybe.just(value)),
            rejected: (error) => rejected(error, i),
            canceled: () => resolved(Maybe.nothing()),
          });
        });
      }),
      cancel,
    );
  }

  /**
   * Limit task execution based on another task
   *
   * If the second task resolves sooner than the first, resulting task is canceled
   * Otherwise the resulting task resolves together with the first one
   *
   * @param task task to limit
   * @param limitTask limiting task
   * @returns task limites according to limitTask
   */
  export function limit<T>(task: Task<T>, limitTask: Task<void>) {
    return Task.any<T>([task, limitTask.chain<T>(Task.canceled)]).chainRejected((errors) => Task.rejected<T>(errors[0]));
  }

  /**
   * Repeat task untill successful
   *
   * Given task is re-generated in case of failure (both external and internal)
   * Resulting task is still cancelable by standard means
   *
   * @param taskFunction task preoducing function
   */
  export function repeat<T>(taskFunction: TaskFunction<[], T>) {
    const sequentor = (): Task<T> => taskFunction().chainRejected(sequentor);

    return sequentor();
  }
}

/// --------------------------------------------------------------------------------------
/// Private section
/// --------------------------------------------------------------------------------------

type TaskInvoke<R> = Promise<Cancelable<R>>;
type TaskCancel = (error: Maybe<any>) => void;

/**
 * @hidden
 */
interface TaskBase<R> {
  /**
   * @hidden
   */
  readonly _invoke: TaskInvoke<R>;
  /**
   * @hidden
   */
  readonly _cancel: TaskCancel;
}

const resolver = <T>() => {
  const stub: (t: T) => void = () => void undefined;

  let globalResolve = stub;

  const resolve = (value: T) => {
    const r = globalResolve;

    globalResolve = stub;

    r(value);
  };

  const setResolve = (value: typeof resolve) => {
    globalResolve = value;
  };

  return [resolve, setResolve] as [typeof resolve, typeof setResolve];
};

function chainTaskMaybe<R, R2>(_task: TaskBase<R>, op: (value: Cancelable<R>) => Task<R2>) {
  const globalCancel = { cancel: _task._cancel };

  return Task.create(
    _task._invoke.then(async (result) => {
      // Tecnically it's not possible to throw here anymore as op is lifted into task now, but just in case
      try {
        const { _invoke: invoke2, _cancel: cancel2 } = Task.fromFunction(() => op(result), globalCancel);

        globalCancel.cancel = cancel2;

        const produced = await invoke2;

        if (produced.isNothing()) {
          return Maybe.nothing();
        }

        if (produced.just.isLeft()) {
          return Maybe.just(Either.left(produced.just.left));
        }

        const { _invoke: invoke3, _cancel: cancel3 } = produced.just.right;

        globalCancel.cancel = cancel3;

        return invoke3;
      } catch (e) {
        return Maybe.just(Either.left(e));
      }
    }),
    (error: Maybe<any>) => globalCancel.cancel(error),
  );
}

function chainTaskEither<R, R2>(_task: TaskBase<R>, op: (value: Rejectable<R>) => Task<R2>) {
  return chainTaskMaybe<R, R2>(_task, (maybe) => maybe.map(op).orMap<Task<R2>>(Task.canceled).just);
}

function mapTaskMaybe<R, R2>(_task: TaskBase<R>, op: (value: Cancelable<R>) => Cancelable<R2>) {
  return chainTaskMaybe<R, R2>(_task, (maybe) => {
    return op(maybe).matchMap<Task<R2>>({
      just: (either) =>
        either.matchMap<Task<R2>>({
          right: Task.resolved,
          left: Task.rejected,
        }).right,
      nothing: Task.canceled,
    }).just;
  });
}

function mapTaskEither<R, R2>(_task: TaskBase<R>, op: (value: Rejectable<R>) => Rejectable<R2>) {
  return mapTaskMaybe<R, R2>(_task, (maybe) => maybe.map(op));
}

function tapTaskMaybe<R>(_task: TaskBase<R>, op: (value: Cancelable<R>) => void) {
  return mapTaskMaybe<R, R>(_task, (value) => {
    op(value);

    return value;
  });
}

function tapTaskEither<R>(_task: TaskBase<R>, op: (value: Rejectable<R>) => void) {
  return tapTaskMaybe<R>(_task, (maybe) => maybe.tap(op));
}

class TaskClass<R> implements Task<R> {
  constructor(readonly _invoke: TaskInvoke<R>, readonly _cancel: TaskCancel) {}

  tapCanceled(op: () => void) {
    return tapTaskMaybe<R>(this, (maybe) => maybe.orTap(op));
  }
  tapRejected(op: (error: any) => void) {
    return tapTaskEither<R>(this, (either) => either.orTap(op));
  }
  tap(op: (value: R) => void) {
    return tapTaskEither<R>(this, (either) => either.tap(op));
  }

  mapCanceled<R2>(op: () => R2) {
    return mapTaskMaybe<R, R | R2>(this, (maybe) => maybe.orMap(() => Either.right(op())));
  }
  mapRejected<R2>(op: (error: any) => R2) {
    return mapTaskEither<R, R | R2>(this, (either) => either.orMap(op));
  }
  map<R2>(op: (value: R) => R2) {
    return mapTaskEither<R, R2>(this, (either) => either.map(op));
  }

  chainCanceled<R2>(op: () => Task<R2>) {
    const mapEither = (either: Rejectable<R>) => either.map(Task.resolved).orMap<Task<R>>(Task.rejected).right;

    return chainTaskMaybe<R, R | R2>(this, (maybe) => maybe.map(mapEither).orMap(op).just);
  }
  chainRejected<R2>(op: (error: any) => Task<R2>) {
    return chainTaskEither<R, R | R2>(this, (either) => either.map(Task.resolved).orMap(op).right);
  }
  chain<R2>(op: (value: R) => Task<R2>) {
    return chainTaskEither<R, R2>(this, (either) => either.map(op).orMap<Task<R2>>(Task.rejected).right);
  }

  resolve() {
    return this._invoke;
  }
  cancel() {
    return this._cancel(Maybe.nothing());
  }
  reject(error: any) {
    return this._cancel(Maybe.just(error));
  }

  generator() {
    return (function*(task) {
      return (yield task) as R;
    })(this);
  }

  matchTap(op: { resolved: (value: R) => void; rejected: (error: any) => void; canceled: () => void }) {
    return tapTaskMaybe(this, (maybe) => {
      return maybe.matchTap({
        just: (either) => {
          return either.matchTap({
            right: op.resolved,
            left: op.rejected,
          });
        },
        nothing: op.canceled,
      });
    });
  }

  matchMap<R2, R3 = R2, R4 = R3>(op: { resolved: (value: R) => R2; rejected: (error: any) => R3; canceled: () => R4 }) {
    return mapTaskMaybe(this, (maybe) => {
      return maybe.matchMap<Right<R2 | R3 | R4, any>>({
        just: (either) => {
          return either.matchMap({
            right: op.resolved,
            left: op.rejected,
          });
        },
        nothing: () => Either.right(op.canceled()),
      });
    });
  }

  matchChain<R2, R3 = R2, R4 = R3>(op: { resolved: (value: R) => Task<R2>; rejected: (error: any) => Task<R3>; canceled: () => Task<R4> }) {
    return chainTaskMaybe(this, (maybe) => {
      return maybe.matchMap<Task<R2 | R3 | R4>>({
        just: (either) => {
          return either.matchMap<Task<R2 | R3>>({
            right: op.resolved,
            left: op.rejected,
          }).right;
        },
        nothing: op.canceled,
      }).just;
    });
  }
}
