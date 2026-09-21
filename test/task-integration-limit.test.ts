/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

const delayedValueTask = <R>(value: R, delay: number) => Task.timeout(delay).map(() => value);

describe('Task.limit scenarios', () => {
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

  it('resolve in 200ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.limit(delayedValueTask(42, 200), Task.timeout(300))
      .tapCanceled(canceled)
      .tapRejected(rejected)
      .tap(resolved);

    await advanceTime(199);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith(42);

    await advanceTime(100);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(100);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(200);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});
