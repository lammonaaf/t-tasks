/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

const delayedValueTask = <R>(value: R, delay: number) => Task.timeout(delay).map(() => value);

describe('self manipulation scenarios', () => {
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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('self reject can not be caught', async () => {
    const canceled = jest.fn();
    const inrejected = jest.fn();
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
        inrejected(e);

        return 63;
      }
    })
      .tap(resolved)
      .tapCanceled(canceled)
      .tapRejected(rejected);

    await advanceTime(99);

    expect(inspect).toHaveBeenCalledTimes(0);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    const result = await task.resolve();

    expect(inspect).toHaveBeenCalledWith('data');

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});
