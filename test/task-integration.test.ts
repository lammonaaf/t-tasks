/* eslint-disable no-throw-literal */ // fore more confinient failure testing

import {
  timeoutTask,
  generateTask,
  cast,
  castPromise,
  liftPromise,
  liftPromiseFunction,
  repeatTask,
  limitTask,
  parallelTask,
  sequenceTask,
  castTask,
  castPromiseFunction,
} from '../src/task-tools';
import { just, right, left, nothing, rejectedTask, resolvedTask, Task } from '../src';

const delayedValueTask = <R>(value: R, delay: number) => timeoutTask(delay).fmap(() => value);
const delayedValuePromise = async <R>(value: R, delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay)).then(() => value);
};

describe('basic scenarios', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    jest.advanceTimersByTime(by);

    return flushPromises();
  };

  it('resolve in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask(42, 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(42);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(42)));
  });

  it('cancel in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask(42, 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(nothing());
  });

  it('cancel in 50ms with fallback', async () => {
    const canceled = jest.fn(() => 63);
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask(42, 100)
      .fmapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(63)));
  });

  it('fail externally in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask(42, 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail externally in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn(() => 63);
    const resolved = jest.fn();

    const task = delayedValueTask(42, 100)
      .tapCanceled(canceled)
      .fmapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(63)));
  });

  it('fail internally in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask(42, 50)
      .tap(() => {
        throw 'some-error';
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn(() => 63);
    const resolved = jest.fn();

    const task = delayedValueTask(42, 50)
      .tap(() => {
        throw 'some-error';
      })
      .tapCanceled(canceled)
      .fmapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(63)));
  });
});

describe('chained scenarios', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
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
      .chainCanceled(() => resolvedTask('cat'))
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(199);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalledWith(4);

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(4);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(2);

    expect(result).toStrictEqual(just(right(4)));
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

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(2);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(nothing());
  });

  it('cancel on second step in 150ms', async () => {
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

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalledWith(4);

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(nothing());
  });

  it('cancel on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainCanceled(() => {
        return delayedValueTask(5, 200);
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(199);

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalledWith(5);

    await advanceTime(1);

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(5);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(5)));
  });

  it('fail externally on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainCanceled(() => resolvedTask('cat'))
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(2);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
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

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalledWith(4);

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally before first step', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = rejectedTask('some-error')
      .chain(() => delayedValueTask('data', 100))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chain((value) => delayedValueTask(value.length, 200))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(300);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(2);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
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

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(200);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(2);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
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

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith('data');
    expect(resolved).not.toBeCalledWith(4);

    const result = await task.resolve();

    await advanceTime(200);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(left('some-error')));
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

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalledWith(4);

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail externally on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask('data', 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved)
      .chainRejected(() => {
        return delayedValueTask(5, 200);
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    await advanceTime(199);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalledWith(5);

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(5);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(5)));
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
      .chainRejected(() => {
        return delayedValueTask(5, 200);
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    await advanceTime(199);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalledWith(5);

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(5);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(5)));
  });
});

describe('generated scenarios', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('resolve in 300ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = castTask<Task<string>>(yield delayedValueTask('data', 100));

      resolved(data);

      const length = castPromiseFunction<() => Promise<number>>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(199);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalledWith(4);

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(4);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(2);

    expect(result).toStrictEqual(just(right(4)));
  });

  it('cancel on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = castTask<Task<string>>(yield delayedValueTask('data', 100));

      resolved(data);

      const length = castPromiseFunction<() => Promise<number>>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(nothing());
  });

  it('cancel on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = cast<string>(yield delayedValueTask('data', 100));

      resolved(data);

      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(nothing());
  });

  it('fail externally on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = castPromise<Promise<string>>(yield delayedValueTask('data', 100));

      resolved(data);

      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail externally on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = castPromise<Promise<string>>(yield delayedValueTask('data', 100));

      resolved(data);

      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith('data');

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally before first step', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      const data = cast<string>(yield delayedValueTask('data', 50));

      resolved(data);

      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = cast<string>(
        yield delayedValueTask('data', 50).tap(() => {
          throw 'some-error';
        }),
      );

      resolved(data);

      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally between steps in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = cast<string>(yield delayedValueTask('data', 100));

      resolved(data);

      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(100);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith('data');

    const result = await task.resolve();

    await advanceTime(200);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      const data = cast<string>(yield delayedValueTask('data', 100));

      resolved(data);

      const length = cast<number>(
        yield delayedValueTask(data.length, 50).tap(() => {
          throw 'some-error';
        }),
      );

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith('data');

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith('data');

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail externally on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      let data: string;
      try {
        data = cast<string>(yield delayedValueTask('data', 100));
      } catch (e) {
        rejected(e);

        data = 'cat';
      }

      resolved(data);

      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith('cat');

    await advanceTime(199);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalledWith(3);

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(3);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(2);

    expect(result).toStrictEqual(just(right(3)));
  });

  it('fail internally on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = generateTask(function*() {
      let data: string;
      try {
        data = cast<string>(
          yield delayedValueTask('data', 50).tap(() => {
            throw 'some-error';
          }),
        );
      } catch (e) {
        rejected(e);

        data = 'cat';
      }

      resolved(data);

      const length = cast<number>(yield delayedValueTask(data.length, 200));

      resolved(length);

      return length;
    })
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith('cat');

    await advanceTime(199);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalledWith(3);

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(3);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(2);

    expect(result).toStrictEqual(just(right(3)));
  });
});

describe('liftPromise scenarios', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('resolve in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = liftPromise(delayedValuePromise(42, 100))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(42);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(42)));
  });

  it('cancel in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = liftPromise(delayedValuePromise(42, 100))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(nothing());
  });

  it('cancel in 50ms with fallback', async () => {
    const canceled = jest.fn(() => 63);
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = liftPromise(delayedValuePromise(42, 100))
      .fmapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(63)));
  });

  it('fail externally in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = liftPromise(delayedValuePromise(42, 100))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail externally in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn(() => 63);
    const resolved = jest.fn();

    const task = liftPromise(delayedValuePromise(42, 100))
      .tapCanceled(canceled)
      .fmapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(63)));
  });

  it('fail internally in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = liftPromise(delayedValuePromise(42, 50))
      .tap(() => {
        throw 'some-error';
      })
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn(() => 63);
    const resolved = jest.fn();

    const task = liftPromise(
      new Promise<number>((_, reject) => setTimeout(() => reject('some-error'), 50)),
    )
      .tapCanceled(canceled)
      .fmapRejected(rejected)
      .tap(resolved);

    await advanceTime(50);

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).toBeCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(63)));
  });
});

describe('liftPromiseFunction scenarios', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('resolve in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const promiseFunction = liftPromiseFunction(delayedValuePromise);

    const task = promiseFunction(42, 100)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(42);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(42)));
  });
});

describe('repeatTask scenarios', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('resolve in 1300ms', async () => {
    const promiseFunction = jest
      .fn(() => 45)
      .mockImplementationOnce(() => {
        throw new Error('Error 1');
      })
      .mockImplementationOnce(() => {
        throw new Error('Error 2');
      })
      .mockImplementationOnce(() => {
        return 42;
      });
    const taskFunction = jest
      .fn(() => timeoutTask(300).fmap(promiseFunction))
      .mockImplementationOnce(() => timeoutTask(300).fmap(promiseFunction))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction));

    const task = repeatTask(taskFunction, () => timeoutTask(200));

    await advanceTime(300);

    expect(taskFunction).toBeCalledTimes(1);
    expect(promiseFunction).toBeCalledTimes(1);
    expect(promiseFunction).toReturnTimes(0);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(2);
    expect(promiseFunction).toBeCalledTimes(1);
    expect(promiseFunction).toReturnTimes(0);

    await advanceTime(400);

    expect(taskFunction).toBeCalledTimes(2);
    expect(promiseFunction).toBeCalledTimes(2);
    expect(promiseFunction).toReturnTimes(0);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(3);
    expect(promiseFunction).toBeCalledTimes(2);
    expect(promiseFunction).toReturnTimes(0);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(3);
    expect(promiseFunction).toBeCalledTimes(3);
    expect(promiseFunction).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right(42)));
  });
});

describe('limitTask scenarios', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('resolve in 200ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = limitTask(delayedValueTask(42, 200), timeoutTask(300))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(199);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).toBeCalledWith(42);

    await advanceTime(100);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(1);

    expect(result).toStrictEqual(just(right(42)));
  });

  it('cancel in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = limitTask(delayedValueTask(42, 200), timeoutTask(100))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(100);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(nothing());
  });

  it('fail in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = limitTask(delayedValueTask(42, 200), timeoutTask(300))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(100);

    task.reject('some-error');

    await flushPromises();

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    await advanceTime(200);

    const result = await task.resolve();

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(just(left('some-error')));
  });
});

describe('parallelTask', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('succeed in 600ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = parallelTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(600);

    expect(taskFunction).toBeCalledTimes(3);
    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(1);
    expect(promiseFunction2).toBeCalledTimes(1);
    expect(promiseFunction2).toReturnTimes(1);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right([40, 41, 42])));
  });

  it('cancel in 300ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = parallelTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(300);

    task.cancel();

    await flushPromises();

    expect(taskFunction).toBeCalledTimes(3);
    expect(promiseFunction1).toBeCalledTimes(0);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(nothing());
  });

  it('fail externally in 300ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = parallelTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(300);

    task.reject('some-error');

    await flushPromises();

    expect(taskFunction).toBeCalledTimes(3);
    expect(promiseFunction1).toBeCalledTimes(0);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally in 400ms', async () => {
    const promiseFunction1 = jest.fn(() => {
      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      return 40;
    });
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = parallelTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(400);

    expect(taskFunction).toBeCalledTimes(3);
    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });
});

describe('sequenceTask', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('succeed in 600ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = sequenceTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(400);

    await advanceTime(600);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(3);
    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(1);
    expect(promiseFunction2).toBeCalledTimes(1);
    expect(promiseFunction2).toReturnTimes(1);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right([40, 41, 42])));
  });

  it('cancel in 500ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = sequenceTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(400);

    await advanceTime(100);

    task.cancel();

    await flushPromises();

    await advanceTime(500);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(2);
    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(1);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(0);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(nothing());
  });

  it('fail externally in 500ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = sequenceTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(400);

    await advanceTime(100);

    task.reject('some-error');

    await flushPromises();

    await advanceTime(500);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(2);
    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(1);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(0);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally in 400ms', async () => {
    const promiseFunction1 = jest.fn(() => {
      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      return 40;
    });
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = sequenceTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(400);

    await advanceTime(600);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(1);
    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(0);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('fail internally in 1000ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => {
      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      return 41;
    });
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(promiseFunction1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(promiseFunction2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(promiseFunction3));

    const task = sequenceTask([taskFunction, taskFunction, taskFunction]);

    await advanceTime(400);

    await advanceTime(600);

    await advanceTime(200);

    expect(taskFunction).toBeCalledTimes(2);
    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(1);
    expect(promiseFunction2).toBeCalledTimes(1);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(0);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });
});
