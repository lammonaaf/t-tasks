/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

const delayedValuePromise = async <R>(value: R, delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay)).then(() => value);
};

describe('Task.liftPromise scenarios', () => {
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

  it('resolve in 100ms', async () => {
    const canceled = jest.fn();
    const rejected = jest.fn();
    const resolved = jest.fn();

    const task = Task.fromPromise(delayedValuePromise(42, 100))
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
    expect(resolved).toHaveBeenCalledWith(42);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

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

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(1);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith(63);

    const result = await task.resolve();

    await advanceTime(50);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.right(63)));
  });
});

describe('Task.lift scenarios', () => {
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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledWith(42);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });
});
