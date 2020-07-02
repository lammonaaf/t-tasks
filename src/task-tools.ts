import { Result } from './functional';
import { Maybe, just, nothing, isJust, isNothing } from './maybe';
import { Either, right, left, isRight } from './either';
import { Task, task, resolvedTask, chainTaskEither, chainTask, fmapTask, fmapTaskMaybe, resolveTask, cancelTask, rejectTask } from './task';

export const createTask = <R>(from: Result<R>): Task<R> => {
  const stub = (_?: Result<Maybe<Either<R>>> | undefined) => {};

  let globalResolve = stub;

  return task(new Promise<Maybe<Either<R>>>((resolve) => {
    globalResolve = resolve;

    Promise.resolve(from).then((value) => {
      globalResolve(just(right(value)));
      globalResolve = stub;
    }, (error) => {
      globalResolve(just(left(error)));
      globalResolve = stub;
    });
  }), (fail: boolean) => {
    if (fail) {
      globalResolve(just(left(new Error('Task cancelled'))));
    } else {
      globalResolve(nothing());
    }
    globalResolve = stub;
  });
};

export const liftTask = <A extends any[], R>(creator: (...args: A) => Result<R>) => (...args: A) => createTask(creator(...args));

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type TaskType<TT extends Task<any>> = ThenArg<TT['_invoke']> extends Maybe<Either<infer U>> ? U : never;

export type TaskCreatorType<TT extends (...args: any[]) => Task<any>> = TaskType<ReturnType<TT>>;

export const generateTask = <TT extends Task<any>, R>(
  from: () => Generator<TT, R, TaskType<TT>> | AsyncGenerator<TT, R, TaskType<TT>>,
): Task<R> => {
  const iterator = from();

  const sequentor = (next: IteratorResult<TT, R>): Task<R> => next.done ? (
    resolvedTask<R>(next.value)
  ) : (
    chainTaskEither(next.value, (v: Either<TaskType<TT>>) => isRight(v) ? (
      chainTask(createTask(Promise.resolve().then(() => iterator.next(v.right))), sequentor)
    ) : (
      chainTask(createTask(Promise.resolve().then(() => iterator.throw(v.left))), sequentor)
    ))
  );

  return chainTask(createTask(Promise.resolve().then(() => iterator.next())), sequentor);
};

export function cast<T, R extends T = any>(arg: R): T {
  return arg as T;
}

export function castResult<TT extends (...args: any[]) => Result<any>, R extends ThenArg<ReturnType<TT>> = any>(
  arg: R,
): ThenArg<ReturnType<TT>> {
  return arg as ThenArg<ReturnType<TT>>;
}

export function castTask<TT extends Task<any>, R extends TaskType<TT> = any>(arg: R): TaskType<TT> {
  return arg as TaskType<TT>;
}

export function castTaskCreator<TT extends (...args: any[]) => Task<any>, R extends TaskCreatorType<TT> = any>(
  arg: R,
): TaskCreatorType<TT> {
  return arg as TaskCreatorType<TT>;
}

export function sequenceTask<TT extends Task<any>>(tasks: TT[]): Task<TaskType<TT>[]> {
  return tasks.reduce((prev, task) => {
    return chainTask(prev, (list) => {
      return fmapTask(task, (value: TaskType<TT>) => list.concat(value));
    });
  }, resolvedTask<TaskType<TT>[]>([]));
}

export function parallelTask<TT extends Task<any>>(tasks: TT[]): Task<TaskType<TT>[]> {
  const stub = (_?: Result<Maybe<Either<TaskType<TT>[]>>> | undefined) => {};

  let globalResolve = stub;

  return task(new Promise<Maybe<Either<TaskType<TT>[]>>>((resolve) => {
    globalResolve = resolve;

    Promise.all(tasks.map((task) => {
      return resolveTask<TaskType<TT>>(task).then((result) => {
        if (isJust(result)) {
          if (isRight(result.just)) {
            return result.just.right;
          } else {
            throw just(result.just.left);
          }
        } else {
          throw nothing();
        }
      }, (error: any) => {
        throw just(error);
      });
    })).then((result) => {
      globalResolve(just(right(result)));
      globalResolve = stub;
    }, (error: Maybe<any>) => {
      if (isJust(error)) {
        globalResolve(just(left(error.just)));
        globalResolve = stub;
      } else {
        globalResolve(nothing());
        globalResolve = stub;
      }
    });
  }), (fail: boolean) => {
    if (fail) {
      globalResolve(just(left(new Error('Task cancelled'))));
    } else {
      globalResolve(nothing());
    }
    globalResolve = stub;

    tasks.forEach(cancelTask);
  });
}

export const timeoutTask = (delay: number): Task<void> => {
  let handler: NodeJS.Timeout;

  const stub = (_?: Result<Maybe<Either<void>>> | undefined) => {};

  let globalResolve = stub;

  return task(new Promise<Maybe<Either<void>>>((resolve) => {
    globalResolve = resolve;

    handler = setTimeout(() => {
      globalResolve(just(right(undefined)));

      globalResolve = stub;
    }, delay);
  }), (fail: boolean) => {
    if (fail) {
      globalResolve(just(left(new Error('Task cancelled'))));
    } else {
      globalResolve(nothing());
    }
    globalResolve = stub;

    clearTimeout(handler);
  });
}

export const onCancelled = <T>(task: Task<T>, callback: () => void): Task<T> => fmapTaskMaybe(task, (value) => {
  if (!value) {
    callback();
  }

  return value;
});

export const catchTask = <T, R>(task: Task<T>, handler: () => Task<R>): Task<T | R> => chainTaskEither(task, (value) => {
  if (isRight(value)) {
    return resolvedTask<T | R>(value.right);
  }

  return handler();
});

export const limitTask = <T>(task: Task<T>, limit: Task<void>): Task<T> => {
  const mappedLimit = fmapTask(limit, () => rejectTask(task));
  const mappedTask = fmapTaskMaybe(task, (value) => {
    cancelTask(mappedLimit);

    return value;
  });

  return mappedTask;
};

export const repeatTask = <T>(taskCreator: () => Task<T>, repeatCreator: () => Task<void>) => generateTask(function* () {
  let result: Maybe<T> = nothing();

  do {
    try {
      result = just(castTaskCreator<typeof taskCreator>(yield taskCreator()));
    } catch (error) {
      yield repeatCreator();
    }
  } while (isNothing(result));

  return result.just;
});
