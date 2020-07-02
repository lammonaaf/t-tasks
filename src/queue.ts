import { defer, nothrow, optional, Result, tuple } from './functional';
import { isJust } from 'maybe';
import { Either } from 'either';
import { Task } from 'task';

export type QueueItem<ResultType> = {
  taskCreator: () => Task<ResultType>;
  onStarted: () => Result<void>;
  onDone: (result: Either<ResultType>) => Result<void>;
};

export function createQueue<ResultType = any>(
  onTaskStarted?: (id: string) => Result<void>,
  onTaskDone?: (id: string, result: Either<ResultType>) => Result<void>,
  onEmpty?: () => Result<void>,
) {
  let queue: [string, QueueItem<ResultType>][] = [];

  let cancelCurrent: ((fail: boolean) => void) | null = null;

  const dequeue: () => void = defer(async () => {
    if (cancelCurrent) {
      return;
    }

    if (!queue.length) {
      return nothrow(optional(onEmpty))();
    }

    const [first, ...rest] = queue;

    queue = rest;

    const [id, { taskCreator, onStarted, onDone }] = first;

    await nothrow(optional(onTaskStarted))(id);
    await nothrow(onStarted)();

    try {
      const task = taskCreator();

      cancelCurrent = task.cancel;

      const result = await task.resolve();

      cancelCurrent = null;

      if (isJust(result)) {
        await nothrow(onDone)(result.just);
        await nothrow(optional(onTaskDone))(id, result.just);
      }
    } catch (e) {}

    return dequeue();
  });

  const test = (id: string) => {
    return !!queue.find(([key]) => key === id);
  };

  const enqueue = <R extends ResultType>(
    id: string,
    taskCreator: () => Task<R>,
    onStarted?: () => Result<void>,
    onDone?: (result: Either<R>) => Result<void>,
  ): string => {
    if (test(id)) {
      return id;
    }

    queue = [
      ...queue, [
        id, {
          taskCreator,
          onStarted: optional(onStarted) as () => Result<void>,
          onDone: optional(onDone) as (result: Either<ResultType>) => Result<void>,
        },
      ],
    ];

    dequeue();

    return id;
  };

  const clear = (): void => {
    if (cancelCurrent) {
      nothrow(cancelCurrent)(false);
    }

    queue = [];
  };

  return tuple(enqueue, clear, test);
}
