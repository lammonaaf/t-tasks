/* eslint-disable no-throw-literal */ // fore more confinient failure testing
import { Either, Maybe, Task } from '../';

import { setImmediate } from 'timers';

import 'regenerator-runtime/runtime';

describe('Task.repeat scenarios', () => {
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

    expect(taskFunction).toHaveBeenCalledTimes(1);
    expect(promiseFunction).toHaveBeenCalledTimes(1);
    expect(promiseFunction).toHaveReturnedTimes(0);

    await advanceTime(200);

    expect(taskFunction).toHaveBeenCalledTimes(2);
    expect(promiseFunction).toHaveBeenCalledTimes(1);
    expect(promiseFunction).toHaveReturnedTimes(0);

    await advanceTime(400);

    expect(taskFunction).toHaveBeenCalledTimes(2);
    expect(promiseFunction).toHaveBeenCalledTimes(2);
    expect(promiseFunction).toHaveReturnedTimes(0);

    await advanceTime(200);

    expect(taskFunction).toHaveBeenCalledTimes(3);
    expect(promiseFunction).toHaveBeenCalledTimes(2);
    expect(promiseFunction).toHaveReturnedTimes(0);

    await advanceTime(200);

    expect(taskFunction).toHaveBeenCalledTimes(3);
    expect(promiseFunction).toHaveBeenCalledTimes(3);
    expect(promiseFunction).toHaveReturnedTimes(1);

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right(42)));
  });
});
