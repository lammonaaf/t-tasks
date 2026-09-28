/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

describe('Task.all', () => {
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

  it('succeed immediately with []', async () => {
    const task = Task.all([]);

    await flushPromises();

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right([])));
  });

  it('succeed in 600ms', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.all([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(600);

    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(1);
    expect(promiseFunction2).toHaveBeenCalledTimes(1);
    expect(promiseFunction2).toHaveReturnedTimes(1);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(1);

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

    expect(promiseFunction1).toHaveBeenCalledTimes(0);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(1);

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

    expect(promiseFunction1).toHaveBeenCalledTimes(0);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(1);

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

    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});
