import { Maybe, just, isJust, nothing } from './maybe';
import { Either, right, isRight, left } from './either';

export type Rejectable<R> = Either<R, any>;
export type Cancelable<R> = Maybe<Either<R, any>>;

export interface TaskBase<R> {
  readonly _invoke: Promise<Cancelable<R>>;
  readonly _cancel: (reject: boolean) => void;
}

export interface Task<R> extends TaskBase<R> {
  tapCanceled(op: () => void): Task<R>;
  tapRejected(op: (error: any) => void): Task<R>;
  tap(op: (value: R) => void): Task<R>;

  fmapCanceled<R2>(op: () => R2): Task<R | R2>;
  fmapRejected<R2>(op: (error: any) => R2): Task<R | R2>;
  fmap<R2>(op: (value: R) => R2): Task<R2>;

  chainCanceled<R2>(op: () => Task<R2>): Task<R | R2>;
  chainRejected<R2>(op: (error: any) => Task<R2>): Task<R | R2>;
  chain<R2>(op: (value: R) => Task<R2>): Task<R2>;

  resolve: () => Promise<Cancelable<R>>;
  cancel: () => void;
  reject: () => void;
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
        return just<Rejectable<R2>>(left<any>(e));
      }
    }),
    (reject: boolean) => globalCancel(reject),
  );
}

function chainTaskEither<R, R2>(_task: TaskBase<R>, op: (value: Rejectable<R>) => Task<R2>) {
  return chainTaskMaybe<R, R2>(_task, (maybe) => {
    if (isJust(maybe)) {
      return op(maybe.just);
    } else {
      return cancelledTask<R2>();
    }
  });
}

function chainTask<R, R2>(_task: TaskBase<R>, op: (value: R) => Task<R2>) {
  return chainTaskEither<R, R2>(_task, (either) => {
    if (isRight(either)) {
      return op(either.right);
    } else {
      return rejectedTask<R2>(either.left);
    }
  });
}

function chainTaskCanceled<R, R2>(_task: TaskBase<R>, op: () => Task<R2>) {
  return chainTaskMaybe<R, R | R2>(_task, (maybe) => {
    if (isJust(maybe)) {
      if (isRight(maybe.just)) {
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
    if (isRight(either)) {
      return resolvedTask<R>(either.right);
    } else {
      return op(either.left);
    }
  });
}

class TaskClass<R> implements Task<R> {
  constructor(readonly _invoke: Promise<Maybe<Either<R, any>>>, readonly _cancel: (reject: boolean) => void) {}

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
    return this._cancel(false);
  }
  reject() {
    return this._cancel(true);
  }
}

export const task = <R>(_invoke: Promise<Cancelable<R>>, _cancel: (reject: boolean) => void): Task<R> => {
  return new TaskClass<R>(_invoke, _cancel);
};

export function resolvedTask<R>(value: R) {
  return task<R>(Promise.resolve(just(right(value))), () => {});
}

export function rejectedTask<R>(error: any) {
  return task<R>(Promise.resolve(just(left(error))), () => {});
}

export function cancelledTask<R>() {
  return task<R>(Promise.resolve(nothing()), () => {});
}
