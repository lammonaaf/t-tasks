import { Maybe, just, isJust, nothing } from './maybe';
import { Either, right, isRight, left } from './either';

export type TaskBase<R> = {
  readonly _invoke: Promise<Maybe<Either<R>>>;
  readonly _cancel: (reject: boolean) => void;
};

export type Task<R> = TaskBase<R> & {
  tapMaybe(op: (value: Maybe<Either<R>>) => void): Task<R>;
  tapEither(op: (value: Either<R>) => void): Task<R>;
  tap(op: (value: R) => void): Task<R>;

  fmapMaybe<R2>(op: (value: Maybe<Either<R>>) => Maybe<Either<R2>>): Task<R2>;
  fmapEither<R2>(op: (value: Either<R>) => Either<R2>): Task<R2>;
  fmap<R2>(op: (value: R) => R2): Task<R2>;

  chainMaybe<R2>(op: (value: Maybe<Either<R>>) => Task<R2>): Task<R2>;
  chainEither<R2>(op: (value: Either<R>) => Task<R2>): Task<R2>;
  chain<R2>(op: (value: R) => Task<R2>): Task<R2>;

  resolve: () => Promise<Maybe<Either<R>>>;
  cancel: () => void;
  reject: () => void;
};

export const fmapTaskMaybe = <R, R2>(
  _task: TaskBase<R>,
  op: (value: Maybe<Either<R>>) => Maybe<Either<R2>>,
): Task<R2> => {
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
};

export const fmapTaskEither = <R, R2>(
  _task: TaskBase<R>,
  op: (value: Either<R>) => Either<R2>,
): Task<R2> => fmapTaskMaybe(_task, (maybe) => maybe.fmap(op));

export const fmapTask = <R, R2>(
  _task: TaskBase<R>,
  op: (value: R) => R2,
): Task<R2> => fmapTaskEither(_task, (either) => either.fmap(op));

export const tapTaskMaybe = <R>(
  _task: TaskBase<R>,
  op: (value: Maybe<Either<R>>) => void,
): Task<R> => {
  return fmapTaskMaybe(_task, (value) => {
    op(value);

    return value;
  });
};

export const tapTaskEither = <R>(
  _task: TaskBase<R>,
  op: (value: Either<R>) => void,
): Task<R> => {
  return fmapTaskEither(_task, (value) => {
    op(value);

    return value;
  });
};

export const tapTask = <R>(
  _task: TaskBase<R>,
  op: (value: R) => void,
): Task<R> => {
  return fmapTask(_task, (value) => {
    op(value);

    return value;
  });
};

export const chainTaskMaybe = <R1, R2>(
  _task: TaskBase<R1>,
  op: (value: Maybe<Either<R1>>) => Task<R2>,
): Task<R2> => {
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
    (reject: boolean) => globalCancel(reject),
  );
};

export const chainTaskEither = <R1, R2>(
  _task: TaskBase<R1>,
  op: (value: Either<R1>) => Task<R2>,
): Task<R2> => {
  return chainTaskMaybe(_task, (maybe) => {
    if (isJust(maybe)) {
      return op(maybe.just);
    } else {
      return cancelledTask();
    }
  });
};

export const chainTask = <R, R2>(
  _task: TaskBase<R>,
  op: (value: R) => Task<R2>,
): Task<R2> => {
  return chainTaskEither(_task, (either) => {
    if (isRight(either)) {
      return op(either.right);
    } else {
      return rejectedTask(either.left);
    }
  });
};

export const resolveTask = <R>({
  _invoke,
}: TaskBase<R>): Promise<Maybe<Either<R>>> => _invoke;
export const cancelTask = <R>({ _cancel }: TaskBase<R>): void => _cancel(false);
export const rejectTask = <R>({ _cancel }: TaskBase<R>): void => _cancel(true);

export const task = <R>(
  _invoke: Promise<Maybe<Either<R>>>,
  _cancel: (reject: boolean) => void,
): Task<R> => ({
  _invoke,
  _cancel,

  tapMaybe: (op) => tapTaskMaybe({ _invoke, _cancel }, op),
  tapEither: (op) => tapTaskEither({ _invoke, _cancel }, op),
  tap: (op) => tapTask({ _invoke, _cancel }, op),

  fmapMaybe: (op) => fmapTaskMaybe({ _invoke, _cancel }, op),
  fmapEither: (op) => fmapTaskEither({ _invoke, _cancel }, op),
  fmap: (op) => fmapTask({ _invoke, _cancel }, op),

  chainMaybe: (op) => chainTaskMaybe({ _invoke, _cancel }, op),
  chainEither: (op) => chainTaskEither({ _invoke, _cancel }, op),
  chain: (op) => chainTask({ _invoke, _cancel }, op),

  resolve: () => resolveTask({ _invoke, _cancel }),
  cancel: () => cancelTask({ _invoke, _cancel }),
  reject: () => rejectTask({ _invoke, _cancel }),
});

export const resolvedTask = <R>(value: R): Task<R> => {
  return task(Promise.resolve(just(right(value))), () => {});
};

export const rejectedTask = <R>(error: any): Task<R> => {
  return task(Promise.resolve(just(left(error))), () => {});
};

export const cancelledTask = <R>(): Task<R> => {
  return task(Promise.resolve(nothing()), () => {});
};
