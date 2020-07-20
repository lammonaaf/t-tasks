import { timeoutTask, resolvedTask, right, just, rejectedTask, left, canceledTask, nothing } from '../src';

describe('resolvedTask()', () => {
  it('creates Task containing specified data', async () => {
    const task = resolvedTask('some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right('some-data')));
  });

  it('creates non-cancelable Task', async () => {
    const task = resolvedTask('some-data');

    task.cancel();

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right('some-data')));
  });

  it('creates non-rejectable Task', async () => {
    const task = resolvedTask('some-data');

    task.reject('some-error');

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right('some-data')));
  });

  it('creates Task fmappable to specified data', async () => {
    const task = resolvedTask(undefined).fmap(() => 'some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right('some-data')));
  });

  it('creates Task chainable to specified data', async () => {
    const task = resolvedTask(undefined).chain(() => resolvedTask('some-data'));

    const result = await task.resolve();

    expect(result).toStrictEqual(just(right('some-data')));
  });
});

describe('rejectedTask()', () => {
  it('creates Task containing specified error', async () => {
    const task = rejectedTask('some-error');

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('creates non-cancelable Task', async () => {
    const task = rejectedTask('some-error');

    task.cancel();

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('creates non-fmappable Task', async () => {
    const task = rejectedTask('some-error').fmap(() => 'some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });

  it('creates non-chainable Task', async () => {
    const task = rejectedTask('some-error').chain(() => resolvedTask('some-data'));

    const result = await task.resolve();

    expect(result).toStrictEqual(just(left('some-error')));
  });
});

describe('canceledTask()', () => {
  it('creates Task containing nothing', async () => {
    const task = canceledTask();

    const result = await task.resolve();

    expect(result).toStrictEqual(nothing());
  });

  it('creates non-rejectable Task', async () => {
    const task = canceledTask();

    task.reject('some-error');

    const result = await task.resolve();

    expect(result).toStrictEqual(nothing());
  });

  it('creates non-fmappable Task', async () => {
    const task = canceledTask().fmap(() => 'some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(nothing());
  });

  it('creates non-chainable Task', async () => {
    const task = canceledTask().chain(() => resolvedTask('some-data'));

    const result = await task.resolve();

    expect(result).toStrictEqual(nothing());
  });
});

describe('timoutTask', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  const advanceTime = async (by: number) => {
    await flushPromises();

    jest.advanceTimersByTime(by);

    await flushPromises();
  };

  it('creates Task resolving with undefined in exactly 100ms', async () => {
    const task = timeoutTask(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(99);

    expect(callback).not.toBeCalled();

    await advanceTime(1);

    expect(callback).toBeCalledWith(just(right(undefined)));
  });

  it('creates Task resolving with undefined in exactly 1ms', async () => {
    const task = timeoutTask(1);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(1);

    expect(callback).toBeCalledWith(just(right(undefined)));
  });

  it('creates Task resolving with undefined immediately', async () => {
    const task = timeoutTask(0);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(0);

    expect(callback).toBeCalledWith(just(right(undefined)));
  });

  it('creates Task cancelable in 50ms', async () => {
    const task = timeoutTask(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(50);

    expect(callback).not.toBeCalled();

    task.cancel();

    await flushPromises();

    expect(callback).toBeCalledWith(nothing());
  });

  it('creates Task cancelable immediately', async () => {
    const task = timeoutTask(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    task.cancel();

    await flushPromises();

    expect(callback).toBeCalledWith(nothing());
  });

  it('creates Task not cancelable after being resolved', async () => {
    const task = timeoutTask(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(100);

    task.cancel();

    await flushPromises();

    expect(callback).toBeCalledWith(just(right(undefined)));
  });

  it('creates Task rejectable in 50ms', async () => {
    const task = timeoutTask(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(50);

    expect(callback).not.toBeCalled();

    task.reject('some-error');

    await flushPromises();

    expect(callback).toBeCalledWith(just(left('some-error')));
  });
});
