/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

const delayedValueTask = <R>(value: R, delay: number) => Task.timeout(delay).map(() => value);
const delayedValuePromise = async <R>(value: R, delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay)).then(() => value);
};

describe('generated scenarios', () => {
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

    expect(canceled).toHaveBeenCalled();
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(0);

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
    expect(resolved).toHaveBeenCalledWith('data');

    const result = await task.resolve();

    await advanceTime(150);

    expect(canceled).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenCalledTimes(0);
    expect(resolved).toHaveBeenCalledTimes(1);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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
    expect(resolved).toHaveBeenCalledWith('data');

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledTimes(0);

    const result = await task.resolve();

    await advanceTime(250);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(0);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith('data');

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
    expect(resolved).toHaveBeenCalledWith('data');

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith('cat');

    await advanceTime(199);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).not.toHaveBeenCalledWith(3);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith(3);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(2);

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

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith('cat');

    await advanceTime(199);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).not.toHaveBeenCalledWith(3);

    await advanceTime(1);

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledWith('some-error');
    expect(resolved).toHaveBeenCalledWith(3);

    const result = await task.resolve();

    expect(canceled).toHaveBeenCalledTimes(0);
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveBeenCalledTimes(2);

    expect(result).toStrictEqual(Maybe.just(Either.right(3)));
  });
});
