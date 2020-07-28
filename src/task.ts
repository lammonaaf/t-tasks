import { Maybe, just, nothing } from './maybe';
import { Either, right, left } from './either';

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
export type Cancelable<R> = Maybe<Either<R, any>>;

/**
 * Task monad interface
 *
 * @template R task resolve type
 */
export interface Task<R> extends TaskBase<R> {
  /**
   * Invoke callback when task is canceled (and only then)
   *
   * @param op callback to invoke
   * @returns self
   */
  tapCanceled(op: () => void): Task<R>;
  /**
   * Invoke callback when task is rejected (and only then)
   *
   * @param op callback to invoke
   * @returns self
   */
  tapRejected(op: (error: any) => void): Task<R>;
  /**
   * Invoke callback when task is resolved (and only then)
   *
   * @param op callback to invoke
   * @returns self
   */
  tap(op: (value: R) => void): Task<R>;
  /**
   * Invoke transformer when task is canceled (and only then) and return it's result instead
   *
   * @template R2 fallback return type
   * @param op transformer to invoke
   * @returns task returning fallback result in case of cancelation
   */
  fmapCanceled<R2>(op: () => R2): Task<R | R2>;
  /**
   * Invoke transformer when task is rejected (and only then) and return it's result instead
   *
   * @template R2 fallback return type
   * @param op transformer to invoke
   * @returns task returning fallback result in case of failure
   */
  fmapRejected<R2>(op: (error: any) => R2): Task<R | R2>;
  /**
   * Invoke transformer when task is resolved (and only then) and return it's result instead
   *
   * @template R2 transformer return type
   * @param op transformer to invoke
   * @returns task returning transformer result
   */
  fmap<R2>(op: (value: R) => R2): Task<R2>;
  /**
   * Invoke transformer when task is canceled (and only then) and continue execution with it's result
   *
   * @template R2 fallback task resolve type
   * @param op transformer to invoke
   * @returns task chaining to fallback task in case of cancelation
   */
  chainCanceled<R2>(op: () => Task<R2>): Task<R | R2>;
  /**
   * Invoke transformer when task is rejected (and only then) and continue execution with it's result
   *
   * @template R2 fallback task resolve type
   * @param op transformer to invoke
   * @returns task chaining to fallback task in case of failure
   */
  chainRejected<R2>(op: (error: any) => Task<R2>): Task<R | R2>;
  /**
   * Invoke transformer when task is resolved (and only then) and continue execution with it's result
   *
   * @template R2 transformer task resolve type
   * @param op transformer to invoke
   * @returns task chaining to transformer result task
   */
  chain<R2>(op: (value: R) => Task<R2>): Task<R2>;
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
}

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
export function task<R>(invoke: TaskInvoke<R>, cancel: TaskCancel): Task<R> {
  return new TaskClass<R>(invoke, cancel);
}

/**
 * Invariant task constructor creating resolved task from plain value
 *
 * @template R returned task's resolve type
 * @param value value to be returned upon awaiting
 * @returns task resolving to specified value
 */
export function resolvedTask<R>(value: R) {
  return task<R>(Promise.resolve(just(right(value))), () => {});
}

/**
 * Invariant task constructor creating rejected task from error value
 *
 * @template R returned task's resolve type
 * @param error error to be returned upon awaiting
 * @returns task resolving to specified value
 */
export function rejectedTask<R>(error: any) {
  return task<R>(Promise.resolve(just(left(error))), () => {});
}

/**
 * Invariant task constructor creating canceled task
 *
 * @template R returned task's resolve type
 * @returns task resolving to specified value
 */
export function canceledTask<R>() {
  return task<R>(Promise.resolve(nothing()), () => {});
}

/// --------------------------------------------------------------------------------------
/// Private section
/// --------------------------------------------------------------------------------------

type TaskInvoke<R> = Promise<Cancelable<R>>;
type TaskCancel = (error: Maybe<any>) => void;

interface TaskBase<R> {
  readonly _invoke: TaskInvoke<R>;
  readonly _cancel: TaskCancel;
}

function fmapTaskMaybe<R, R2>(_task: TaskBase<R>, op: (value: Cancelable<R>) => Cancelable<R2>) {
  return task(
    _task._invoke.then((maybe) => {
      try {
        return op(maybe);
      } catch (e) {
        return just(left(e));
      }
    }),
    _task._cancel,
  );
}

function fmapTaskEither<R, R2>(_task: TaskBase<R>, op: (value: Rejectable<R>) => Rejectable<R2>) {
  return fmapTaskMaybe<R, R2>(_task, (maybe) => maybe.fmap(op));
}

function fmapTask<R, R2>(_task: TaskBase<R>, op: (value: R) => R2) {
  return fmapTaskEither<R, R2>(_task, (either) => either.fmap(op));
}

function fmapTaskCanceled<R, R2>(_task: TaskBase<R>, op: () => R2) {
  return fmapTaskMaybe<R, R | R2>(_task, (maybe) => maybe.fmapNothing(() => right(op())));
}

function fmapTaskRejected<R, R2>(_task: TaskBase<R>, op: (error: any) => R2) {
  return fmapTaskEither<R, R | R2>(_task, (either) => either.fmapLeft(op));
}

function tapTaskMaybe<R>(_task: TaskBase<R>, op: (value: Cancelable<R>) => void) {
  return fmapTaskMaybe<R, R>(_task, (value) => {
    op(value);

    return value;
  });
}

function tapTaskEither<R>(_task: TaskBase<R>, op: (value: Rejectable<R>) => void) {
  return tapTaskMaybe<R>(_task, (maybe) => maybe.tap(op));
}

function tapTask<R>(_task: TaskBase<R>, op: (value: R) => void) {
  return tapTaskEither<R>(_task, (either) => either.tap(op));
}

function tapTaskCanceled<R>(_task: TaskBase<R>, op: () => void) {
  return tapTaskMaybe<R>(_task, (maybe) => maybe.tapNothing(op));
}

function tapTaskRejected<R>(_task: TaskBase<R>, op: (error: any) => void) {
  return tapTaskEither<R>(_task, (either) => either.tapLeft(op));
}

function chainTaskMaybe<R, R2>(_task: TaskBase<R>, op: (value: Cancelable<R>) => Task<R2>) {
  let globalCancel = _task._cancel;

  return task(
    _task._invoke.then((result) => {
      try {
        const { _invoke: invoke2, _cancel: cancel2 } = op(result);

        globalCancel = cancel2;

        return invoke2;
      } catch (e) {
        return just(left(e));
      }
    }),
    (error: Maybe<any>) => globalCancel(error),
  );
}

function chainTaskEither<R, R2>(_task: TaskBase<R>, op: (value: Rejectable<R>) => Task<R2>) {
  return chainTaskMaybe<R, R2>(_task, (maybe) => {
    if (maybe.isJust()) {
      return op(maybe.just);
    } else {
      return canceledTask<R2>();
    }
  });
}

function chainTask<R, R2>(_task: TaskBase<R>, op: (value: R) => Task<R2>) {
  return chainTaskEither<R, R2>(_task, (either) => {
    if (either.isRight()) {
      return op(either.right);
    } else {
      return rejectedTask<R2>(either.left);
    }
  });
}

function chainTaskCanceled<R, R2>(_task: TaskBase<R>, op: () => Task<R2>) {
  return chainTaskMaybe<R, R | R2>(_task, (maybe) => {
    if (maybe.isJust()) {
      if (maybe.just.isRight()) {
        return resolvedTask<R>(maybe.just.right);
      } else {
        return rejectedTask<R>(maybe.just.left);
      }
    } else {
      return op();
    }
  });
}

function chainTaskRejected<R, R2>(_task: TaskBase<R>, op: (error: any) => Task<R2>) {
  return chainTaskEither<R, R | R2>(_task, (either) => {
    if (either.isRight()) {
      return resolvedTask<R>(either.right);
    } else {
      return op(either.left);
    }
  });
}

class TaskClass<R> implements Task<R> {
  constructor(readonly _invoke: TaskInvoke<R>, readonly _cancel: TaskCancel) {}

  tapCanceled(op: () => void) {
    return tapTaskCanceled(this, op);
  }
  tapRejected(op: (error: any) => void) {
    return tapTaskRejected(this, op);
  }
  tap(op: (value: R) => void) {
    return tapTask(this, op);
  }

  fmapCanceled<R2>(op: () => R2) {
    return fmapTaskCanceled(this, op);
  }
  fmapRejected<R2>(op: (error: any) => R2) {
    return fmapTaskRejected(this, op);
  }
  fmap<R2>(op: (value: R) => R2) {
    return fmapTask(this, op);
  }

  chainCanceled<R2>(op: () => Task<R2>) {
    return chainTaskCanceled(this, op);
  }
  chainRejected<R2>(op: (error: any) => Task<R2>) {
    return chainTaskRejected(this, op);
  }
  chain<R2>(op: (value: R) => Task<R2>) {
    return chainTask(this, op);
  }

  resolve() {
    return this._invoke;
  }
  cancel() {
    return this._cancel(nothing());
  }
  reject(error: any) {
    return this._cancel(just(error));
  }
}
