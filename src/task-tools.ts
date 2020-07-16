import { Maybe, just, nothing, isJust } from './maybe';
import { Either, right, left, isRight } from './either';
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

export function liftResult<R>(from: Result<R>): Task<R> {
  const stub = (_?: Result<Cancelable<R>> | undefined) => {};

  let globalResolve = stub;

  return task(
    new Promise<Maybe<Either<R, any>>>((resolve) => {
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
    (fail: boolean) => {
      if (fail) {
        globalResolve(just(left(new Error('Task cancelled'))));
      } else {
        globalResolve(nothing());
      }
      globalResolve = stub;
    },
  );
}

export function liftResultCreator<A extends any[], R>(creator: ResultCreator<A, R>): TaskCreator<A, R> {
  return (...args: A) => liftResult(creator(...args));
}

export const generateTask = <TT extends Task<any>, R>(generator: TaskGenerator<[], TT, R>): Task<R> => {
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
};

export function castResult<TT extends Result<any>, R extends ResultType<TT> = any>(arg: R): ResultType<TT> {
  return arg as ResultType<TT>;
}

export function castTask<TT extends Task<any>, R extends TaskType<TT> = any>(arg: R): TaskType<TT> {
  return arg as TaskType<TT>;
}

export function castResultCreator<TT extends ResultCreator<any[], any>, R extends ResultCreatorType<TT> = any>(
  arg: R,
): ResultCreatorType<TT> {
  return arg as ResultCreatorType<TT>;
}

export function castTaskCreator<TT extends TaskCreator<any[], any>, R extends TaskCreatorType<TT> = any>(
  arg: R,
): TaskCreatorType<TT> {
  return arg as TaskCreatorType<TT>;
}

export function sequenceTask<TT extends TaskCreator<any, any>>(tasks: TT[]): Task<TaskCreatorType<TT>[]> {
  return tasks.reduce((prev, task) => {
    return prev.chain((list) => {
      return task().fmap((value) => list.concat(value));
    });
  }, resolvedTask<TaskCreatorType<TT>[]>([]));
}

export function parallelTask<TT extends TaskCreator<any, any>>(taskCreators: TT[]): Task<TaskCreatorType<TT>[]> {
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
    (fail: boolean) => {
      if (fail) {
        globalResolve(just(left(new Error('Task cancelled'))));
      } else {
        globalResolve(nothing());
      }
      globalResolve = stub;

      tasks.forEach((task) => task.cancel());
    },
  );
}

export const timeoutTask = (delay: number): Task<void> => {
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
    (fail: boolean) => {
      if (fail) {
        globalResolve(just(left(new Error('Task cancelled'))));
      } else {
        globalResolve(nothing());
      }
      globalResolve = stub;

      clearTimeout(handler);
    },
  );
};

export const limitTask = <T>(task: Task<T>, limit: Task<void>): Task<T> => {
  const mappedLimit = limit.tap(() => task.reject());
  const mappedTask = task
    .tap(() => mappedLimit.cancel())
    .tapCanceled(() => mappedLimit.cancel())
    .tapRejected(() => mappedLimit.cancel());

  return mappedTask;
};

export const repeatTask = <T>(taskCreator: () => Task<T>, repeatCreator: () => Task<void>) => {
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
};
