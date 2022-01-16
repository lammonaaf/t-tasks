/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import 'regenerator-runtime/runtime';

import { Either, Maybe, Task } from '../';

const delayedValueTask = <R>(value: R, delay: number) => Task.timeout(delay).map(() => value);
const delayedValuePromise = async <R>(value: R, delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay)).then(() => value);
};

describe('basic scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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

    const task = delayedValueTask(42, 100).matchTap({
      resolved,
      rejected,
      canceled,
    });

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

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });

  it('cancel in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask(42, 100).matchTap({
      resolved,
      rejected,
      canceled,
    });

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

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancel in 50ms with fallback', async () => {
    const canceled = jest.fn(() => 63);
    const rejected = jest.fn(() => 46);
    const resolved = jest.fn(() => 32);

    const task = delayedValueTask(42, 100).matchMap({
      resolved,
      rejected,
      canceled,
    });

    await advanceTime(50);

    task.cancel();

    await flushPromises();

    expect(canceled).toBeCalledWith();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.right(63)));
  });

  it('fail externally in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = delayedValueTask(42, 100).matchTap({
      resolved,
      rejected,
      canceled,
    });

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail externally in 50ms with fallback', async () => {
    const canceled = jest.fn(() => 63);
    const rejected = jest.fn(() => 46);
    const resolved = jest.fn(() => 32);

    const task = delayedValueTask(42, 100).matchMap({
      resolved,
      rejected,
      canceled,
    });

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

    expect(result).toStrictEqual(Maybe.just(Either.right(46)));
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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
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
      .mapRejected(rejected)
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

    expect(result).toStrictEqual(Maybe.just(Either.right(63)));
  });
});

describe('chained scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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
      .chainCanceled(() => Task.resolved('cat'))
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

    expect(canceled).toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(2);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancel on second step in 150ms', async () => {
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

    expect(result).toStrictEqual(Maybe.just(Either.right(5)));
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

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(2);
    expect(resolved).toBeCalledTimes(0);

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

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(300);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(2);
    expect(resolved).toBeCalledTimes(0);

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

    expect(canceled).not.toBeCalled();
    expect(rejected).toBeCalledWith('some-error');
    expect(resolved).not.toBeCalled();

    const result = await task.resolve();

    await advanceTime(200);

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(2);
    expect(resolved).toBeCalledTimes(0);

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

    expect(result).toStrictEqual(Maybe.just(Either.right(5)));
  });
});

describe('generated scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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

    const task = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.right(4)));
  });

  it('cancel on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      const data = yield* Task.promiseGenerator(delayedValuePromise('data', 100));

      resolved(data);

      const length = yield* Task.promiseGenerator(delayedValuePromise(data.length, 200));

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

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancel on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('fail externally on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail externally on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally before first step', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      const data = yield* delayedValueTask('data', 50).generator();

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally on first step in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 50)
        .tap(() => {
          throw 'some-error';
        })
        .generator();

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally between steps in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      resolved(data);

      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally on second step in 150ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      resolved(data);

      const length = yield* delayedValueTask(data.length, 50)
        .tap(() => {
          throw 'some-error';
        })
        .generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail externally on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      let data: string;
      try {
        data = yield* delayedValueTask('data', 100).generator();
      } catch (e) {
        rejected(e);

        data = 'cat';
      }

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.right(3)));
  });

  it('fail internally on first step in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.generate(function*() {
      let data: string;
      try {
        data = yield* delayedValueTask('data', 50)
          .tap(() => {
            throw 'some-error';
          })
          .generator();
      } catch (e) {
        rejected(e);

        data = 'cat';
      }

      resolved(data);

      const length = yield* delayedValueTask(data.length, 200).generator();

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

    expect(result).toStrictEqual(Maybe.just(Either.right(3)));
  });
});

describe('Task.liftPromise scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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

    const task = Task.fromPromise(delayedValuePromise(42, 100))
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

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });

  it('cancel in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.fromPromise(delayedValuePromise(42, 100))
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

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancel in 50ms with fallback', async () => {
    const canceled = jest.fn(() => 63);
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.fromPromise(delayedValuePromise(42, 100))
      .mapCanceled(canceled)
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

    expect(result).toStrictEqual(Maybe.just(Either.right(63)));
  });

  it('fail externally in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.fromPromise(delayedValuePromise(42, 100))
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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail externally in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn(() => 63);
    const resolved = jest.fn();

    const task = Task.fromPromise(delayedValuePromise(42, 100))
      .tapCanceled(canceled)
      .mapRejected(rejected)
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

    expect(result).toStrictEqual(Maybe.just(Either.right(63)));
  });

  it('fail internally in 50ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.fromPromise(delayedValuePromise(42, 50))
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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally in 50ms with fallback', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn(() => 63);
    const resolved = jest.fn();

    const task = Task.fromPromise(
      new Promise<number>((_, reject) => setTimeout(() => reject('some-error'), 50)),
    )
      .tapCanceled(canceled)
      .mapRejected(rejected)
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

    expect(result).toStrictEqual(Maybe.just(Either.right(63)));
  });
});

describe('Task.lift scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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

    const promiseFunction = Task.lift(delayedValuePromise);

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

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });
});

describe('Task.repeat scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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
      .fn(() => Task.timeout(300).map(promiseFunction))
      .mockImplementationOnce(() => Task.timeout(300).map(promiseFunction))
      .mockImplementationOnce(() => Task.timeout(400).map(promiseFunction))
      .mockImplementationOnce(() => Task.timeout(200).map(promiseFunction));

    const task = Task.repeat(() => {
      return taskFunction().chainRejected((error) => Task.timeout(200).chain(() => Task.rejected<number>(error)));
    });

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

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });
});

describe('Task.limit scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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

    const task = Task.limit(delayedValueTask(42, 200), Task.timeout(300))
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

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });

  it('cancel in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.limit(delayedValueTask(42, 200), Task.timeout(100))
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

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('fail in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.limit(delayedValueTask(42, 200), Task.timeout(300))
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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});

describe('Task.all', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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

    const task = Task.all([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(600);

    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(1);
    expect(promiseFunction2).toBeCalledTimes(1);
    expect(promiseFunction2).toReturnTimes(1);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right([40, 41, 42])));
  });

  it('cancel in 300ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.all([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(300);

    task.cancel();

    await flushPromises();

    expect(promiseFunction1).toBeCalledTimes(0);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('fail externally in 300ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.all([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(300);

    task.reject('some-error');

    await flushPromises();

    expect(promiseFunction1).toBeCalledTimes(0);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('fail internally in 400ms', async () => {
    const promiseFunction1 = jest.fn(() => {
      throw 'some-error';

      // eslint-disable-next-line no-unreachable
      return 40;
    });
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.all([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(400);

    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});

describe('Task.sequence', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
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
      .fn(() => Task.resolved(65))
      .mockImplementationOnce(() => Task.timeout(400).map(promiseFunction1))
      .mockImplementationOnce(() => Task.timeout(600).map(promiseFunction2))
      .mockImplementationOnce(() => Task.timeout(200).map(promiseFunction3));

    const task = Task.sequence([taskFunction, taskFunction, taskFunction]);

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

    expect(result).toStrictEqual(Maybe.just(Either.right([40, 41, 42])));
  });

  it('cancel in 500ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => Task.resolved(65))
      .mockImplementationOnce(() => Task.timeout(400).map(promiseFunction1))
      .mockImplementationOnce(() => Task.timeout(600).map(promiseFunction2))
      .mockImplementationOnce(() => Task.timeout(200).map(promiseFunction3));

    const task = Task.sequence([taskFunction, taskFunction, taskFunction]);

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

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('fail externally in 500ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const taskFunction = jest
      .fn(() => Task.resolved(65))
      .mockImplementationOnce(() => Task.timeout(400).map(promiseFunction1))
      .mockImplementationOnce(() => Task.timeout(600).map(promiseFunction2))
      .mockImplementationOnce(() => Task.timeout(200).map(promiseFunction3));

    const task = Task.sequence([taskFunction, taskFunction, taskFunction]);

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
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
      .fn(() => Task.resolved(65))
      .mockImplementationOnce(() => Task.timeout(400).map(promiseFunction1))
      .mockImplementationOnce(() => Task.timeout(600).map(promiseFunction2))
      .mockImplementationOnce(() => Task.timeout(200).map(promiseFunction3));

    const task = Task.sequence([taskFunction, taskFunction, taskFunction]);

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
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
      .fn(() => Task.resolved(65))
      .mockImplementationOnce(() => Task.timeout(400).map(promiseFunction1))
      .mockImplementationOnce(() => Task.timeout(600).map(promiseFunction2))
      .mockImplementationOnce(() => Task.timeout(200).map(promiseFunction3));

    const task = Task.sequence([taskFunction, taskFunction, taskFunction]);

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

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});

describe('Task.any', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('succeed in 200ms with 42', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.any([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(200);

    expect(promiseFunction1).toBeCalledTimes(0);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });

  it('fail externally in 100ms with "some-error"', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.any([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(100);

    task.reject('some-error');

    await flushPromises();

    expect(promiseFunction1).toBeCalledTimes(0);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(0);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left(['some-error', 'some-error', 'some-error'])));
  });

  it('succeed in 400ms with 40', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn((): number => {
      throw 'some-error';
    });

    const task = Task.any([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(400);

    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(1);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right(40)));
  });

  it('fail in 600ms with some-error231', async () => {
    const promiseFunction1 = jest.fn((): number => {
      throw 'some-error2';
    });
    const promiseFunction2 = jest.fn((): number => {
      throw 'some-error3';
    });
    const promiseFunction3 = jest.fn((): number => {
      throw 'some-error1';
    });

    const task = Task.any([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(600);

    expect(promiseFunction1).toBeCalledTimes(1);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(1);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(1);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left(['some-error2', 'some-error3', 'some-error1'])));
  });

  it('cancel externally in 100ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.any([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(100);

    task.cancel();

    await flushPromises();

    expect(promiseFunction1).toBeCalledTimes(0);
    expect(promiseFunction1).toReturnTimes(0);
    expect(promiseFunction2).toBeCalledTimes(0);
    expect(promiseFunction2).toReturnTimes(0);
    expect(promiseFunction3).toBeCalledTimes(0);
    expect(promiseFunction3).toReturnTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
  });
});

describe('self manipulation scenarios', () => {
  beforeEach(() => jest.useFakeTimers('legacy'));
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('cancels self in chain in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = delayedValueTask('data', 100)
      .chain((data) => {
        inspect(data);

        task.cancel();

        return Task.resolved(data);
      })
      .map((value) => value.length)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancels self in map in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = delayedValueTask('data', 100)
      .map((data) => {
        inspect(data);

        task.cancel();

        return data;
      })
      .map((value) => value.length)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('cancels self in tap in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = delayedValueTask('data', 100)
      .tap((data) => {
        inspect(data);

        task.cancel();
      })
      .map((value) => value.length)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('rejects self in chain in 100ms with "some-error"', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = delayedValueTask('data', 100)
      .chain((data) => {
        inspect(data);

        task.reject('some-error');

        return Task.resolved(data);
      })
      .map((value) => value.length)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('rejects self in map in 100ms with "some-error"', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = delayedValueTask('data', 100)
      .map((data) => {
        inspect(data);

        task.reject('some-error');

        return data;
      })
      .map((value) => value.length)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('rejects self in tap in 100ms with "some-error"', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = delayedValueTask('data', 100)
      .tap((data) => {
        inspect(data);

        task.reject('some-error');
      })
      .map((value) => value.length)
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('cancels self in generator in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      inspect(data);

      task.cancel();

      return data.length;
    })
      .tap(resolved)
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(1);
    expect(rejected).toBeCalledTimes(0);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('rejects self in generator in 100ms with "some-error"', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      inspect(data);

      task.reject('some-error');

      return data.length;
    })
      .tap(resolved)
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('self reject can not be caught', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const inspect = jest.fn();

    const task: Task<number> = Task.generate(function*() {
      const data = yield* delayedValueTask('data', 100).generator();

      inspect(data);

      try {
        task.reject('some-error');

        return data.length;
      } catch (e) {
        console.log(e);

        return 63;
      }
    })
      .tap(resolved)
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(inspect).not.toBeCalled();

    expect(canceled).not.toBeCalled();
    expect(rejected).not.toBeCalled();
    expect(resolved).not.toBeCalled();

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toBeCalledWith('data');

    expect(canceled).toBeCalledTimes(0);
    expect(rejected).toBeCalledTimes(1);
    expect(resolved).toBeCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});
