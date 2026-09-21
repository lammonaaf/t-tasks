/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

const delayedValueTask = <R>(value: R, delay: number) => Task.timeout(delay).map(() => value);

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
});
