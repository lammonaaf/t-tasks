/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

const delayedValueTask = <R>(value: R, delay: number) => Task.fromCallback<NodeJS.Timeout, R>((resolve) => setTimeout(() => resolve(value), delay), clearTimeout);

describe('chained scenarios', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    return flushPromises();
  };

  it('resolve in 300ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainCanceled(() => Task.resolved('cat'))
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith('data');

    await advanceTime(199);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).not.toHaveBeenCalledWith(4);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith(4);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(2);

    expect(result).toStrictEqual(Maybe.just(Either.right(4)));
  });

  it('cancel on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toHaveBeenCalledTimes(2);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancel on second step in 150ms c', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .matchChain({
        resolved: (value) => delayedValueTask(value.length, 200),
        rejected: () => delayedValueTask(23, 100),
        canceled: () => delayedValueTask(45, 100),
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith('data');

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).not.toHaveBeenCalledWith(4);

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancel on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainCanceled(() => delayedValueTask(5, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(199);

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).not.toHaveBeenCalledWith(5);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith(5);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.right(5)));
  });

  it('cancel on first step in 50ms with extra fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .matchChain({
        resolved: (v) => delayedValueTask(v.length, 200),
        rejected: (e) => Task.rejected<number>(e),
        canceled: () => delayedValueTask(5, 200),
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((v) => delayedValueTask(v * 2, 100));

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(199);

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).not.toHaveBeenCalledWith(5);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith(5);

    await advanceTime(100);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.right(10)));
  });

  it('fail externally on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainCanceled(() => Task.resolved('cat'))
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(2);
    expect(resolved).toHaveBeenCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail externally on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith('data');

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).not.toHaveBeenCalledWith(4);

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally before first step', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.rejected('some-error')
      .chain(() => delayedValueTask('data', 100))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await flushPromises();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(300);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(2);
    expect(resolved).toHaveBeenCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 50)
      .tap(() => {
        throw 'some-error';
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(200);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(2);
    expect(resolved).toHaveBeenCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally between steps in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((value) => {
        throw 'some-error';

        // eslint-disable-next-line no-unreachable
        return delayedValueTask(value.length, 200);
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith('data');
    expect(resolved).not.toHaveBeenCalledWith(4);

    const result = await task.resolve();

    await advanceTime(200);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((value) => delayedValueTask(value.length, 50))
      .tap(() => {
        throw 'some-error';
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith('data');

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).not.toHaveBeenCalledWith(4);

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail externally on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainRejected(() => delayedValueTask(5, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(199);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).not.toHaveBeenCalledWith(5);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith(5);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.right(5)));
  });

  it('fail internally on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 50)
      .tap(() => {
        throw 'some-error';
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainRejected(() => delayedValueTask(5, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(199);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).not.toHaveBeenCalledWith(5);

    expect(task.resolved()).toStrictEqual(null);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith(5);

    expect(task.resolved()).toStrictEqual(Maybe.just(Either.right(5)));

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.right(5)));
  });

  test('Task.repeat or deep chainRejected recursion should not exceed call stack size', async () => {
    let attempts = 0;
    const maxAttempts = 100;

    const runWithRetry = (): Task<number> => {
      attempts++;
      if (attempts >= maxAttempts) {
        return Task.resolved(attempts);
      }
      return Task.rejected<number>('sync error').chainRejected(runWithRetry);
    };

    const task = runWithRetry();

    await task.resolve();

    expect(task.resolved()).toStrictEqual(Maybe.just(Either.right(maxAttempts)));
  });

  test('task.resolved() should not return settled result immediately after synchronous cancel()', async () => {
    const pendingTask = Task.fromPromise(new Promise(() => {
      //
    }));

    expect(pendingTask.resolved()).toBeNull();

    pendingTask.cancel();

    expect(pendingTask.resolved()).toStrictEqual(null);

    await pendingTask.resolve();

    expect(pendingTask.resolved()).toStrictEqual(Maybe.nothing());
  });

  beforeEach(() => {
    // Ensure clean state before each test if GC is exposed
    if (global.gc) {
      global.gc();
    }
  });

  it('memory bloat', async () => {
    if (!global.gc) {
      console.warn('Memory test skipped: run Jest with "node --expose-gc"');
      return;
    }

    global.gc();
    const baselineHeap = process.memoryUsage().heapUsed;

    const measure = (tag: string) => {
      global.gc?.();
      const finalHeap = process.memoryUsage().heapUsed;

      // 5. Calculate retained memory growth in MB
      const retainedBytes = finalHeap - baselineHeap;
      const retainedMB = retainedBytes / (1024 * 1024);

      console.log(tag, 'retainedMB', retainedMB);
    }

    // const taskChain = (length: number, start: number) => (
    //   new Array(length).fill(1).reduce<Task<number>>((p, c) => p.chain((pp) => Task.fromPromise(Promise.resolve(pp + c))), Task.fromPromise(Promise.resolve(start)))
    // );

    // const task = taskChain(100000, 0)
    //   .chain((value) => delayedValueTask(value, 100).chain((value) => taskChain(100000, value)))
    //   .chain((value) => delayedValueTask(value, 100).chain((value) => taskChain(100000, value)));

    const task = Task.generate(function* () {
      let sum = 0;

      for (let i = 0; i < 100000; ++i) {
        yield* Task.fromPromise(Promise.resolve()).generator();
        sum += 1;
      }

      yield* Task.timeout(100).generator();

      for (let i = 0; i < 100000; ++i) {
        yield* Task.fromPromise(Promise.resolve()).generator();
        sum += 1;
      }

      yield* Task.timeout(100).generator();

      for (let i = 0; i < 100000; ++i) {
        yield* Task.fromPromise(Promise.resolve()).generator();
        sum += 1;
      }

      return sum;
    });

    measure('fresh');

    await flushPromises();

    measure('after flush');

    await advanceTime(98);

    measure('after advance');

    await advanceTime(2);

    measure('after step');

    await advanceTime(98);

    measure('after advance');

    await advanceTime(2);

    measure('after step');

    const result = await task.resolve();

    measure('after resolve');

    expect(result).toStrictEqual(Maybe.just(Either.right(300000)));
  });
});
