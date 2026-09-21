/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

describe('Task.sequence', () => {
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

    expect(taskFunction).toHaveBeenCalledTimes(3);
    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(1);
    expect(promiseFunction2).toHaveBeenCalledTimes(1);
    expect(promiseFunction2).toHaveReturnedTimes(1);
    expect(promiseFunction3).toHaveBeenCalledTimes(1);
    expect(promiseFunction3).toHaveReturnedTimes(1);

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

    expect(taskFunction).toHaveBeenCalledTimes(2);
    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(1);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(0);
    expect(promiseFunction3).toHaveReturnedTimes(0);

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

    expect(taskFunction).toHaveBeenCalledTimes(2);
    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(1);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(0);
    expect(promiseFunction3).toHaveReturnedTimes(0);

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

    expect(taskFunction).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(0);
    expect(promiseFunction2).toHaveBeenCalledTimes(0);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(0);
    expect(promiseFunction3).toHaveReturnedTimes(0);

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

    expect(taskFunction).toHaveBeenCalledTimes(2);
    expect(promiseFunction1).toHaveBeenCalledTimes(1);
    expect(promiseFunction1).toHaveReturnedTimes(1);
    expect(promiseFunction2).toHaveBeenCalledTimes(1);
    expect(promiseFunction2).toHaveReturnedTimes(0);
    expect(promiseFunction3).toHaveBeenCalledTimes(0);
    expect(promiseFunction3).toHaveReturnedTimes(0);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});
