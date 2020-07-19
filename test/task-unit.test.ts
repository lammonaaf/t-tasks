import { timeoutTask } from '../src';

describe('timoutTask', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('should create task resolving at specified time', async () => {
    const task = timeoutTask(1000);

    const callback = jest.fn();

    task.resolve().then(callback);

    jest.advanceTimersByTime(999);

    await Promise.resolve();

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1);

    await Promise.resolve();

    expect(callback).toBeCalled();
  });
});
