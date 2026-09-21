/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

describe('Task.any', () => {
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

  it('cancel immediately with []', async () => {
    const task = Task.any([]);

    await flushPromises();

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('succeed in 200ms with 42', async () => {
    const promiseFunction1 = jest.fn(() => 40);
    const promiseFunction2 = jest.fn(() => 41);
    const promiseFunction3 = jest.fn(() => 42);

    const task = Task.any([Task.timeout(400).map(promiseFunction1), Task.timeout(600).map(promiseFunction2), Task.timeout(200).map(promiseFunction3)]);

    await advanceTime(200);

    expect(promiseFunction1).toHaveBeenCalledTimes(0);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(1);

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

    expect(promiseFunction1).toHaveBeenCalledTimes(0);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(0);
    expect(promiseFunction3).toHaveReturnedTimes(0);

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

    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(1);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(0);

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

    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(1);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(0);

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

    expect(promiseFunction1).toHaveBeenCalledTimes(0);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(0);
    expect(promiseFunction3).toHaveReturnedTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
  });
});
