import { Maybe, Either, Task } from '../src';

describe('resolvedTask()', () => {
  it('creates Task containing specified data', async () => {
    const task = Task.resolved('some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right('some-data')));
  });

  it('creates non-cancelable Task', async () => {
    const task = Task.resolved('some-data');

    task.cancel();

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right('some-data')));
  });

  it('creates non-rejectable Task', async () => {
    const task = Task.resolved('some-data');

    task.reject('some-error');

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right('some-data')));
  });

  it('creates Task mappable to specified data', async () => {
    const task = Task.resolved(undefined).map(() => 'some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right('some-data')));
  });

  it('creates Task chainable to specified data', async () => {
    const task = Task.resolved(undefined).chain(() => Task.resolved('some-data'));

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.right('some-data')));
  });
});

describe('rejectedTask()', () => {
  it('creates Task containing specified error', async () => {
    const task = Task.rejected('some-error');

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('creates non-cancelable Task', async () => {
    const task = Task.rejected('some-error');

    task.cancel();

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('creates non-mappable Task', async () => {
    const task = Task.rejected('some-error').map(() => 'some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });

  it('creates non-chainable Task', async () => {
    const task = Task.rejected('some-error').chain(() => Task.resolved('some-data'));

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.just(Either.left('some-error')));
  });
});

describe('canceledTask()', () => {
  it('creates Task containing nothing', async () => {
    const task = Task.canceled();

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('creates non-rejectable Task', async () => {
    const task = Task.canceled();

    task.reject('some-error');

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('creates non-mappable Task', async () => {
    const task = Task.canceled().map(() => 'some-data');

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
  });

  it('creates non-chainable Task', async () => {
    const task = Task.canceled().chain(() => Task.resolved('some-data'));

    const result = await task.resolve();

    expect(result).toStrictEqual(Maybe.nothing());
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
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(99);

    expect(callback).not.toBeCalled();

    await advanceTime(1);

    expect(callback).toBeCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task resolving with undefined in exactly 1ms', async () => {
    const task = Task.timeout(1);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(1);

    expect(callback).toBeCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task resolving with undefined immediately', async () => {
    const task = Task.timeout(0);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(0);

    expect(callback).toBeCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task cancelable in 50ms', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(50);

    expect(callback).not.toBeCalled();

    task.cancel();

    await flushPromises();

    expect(callback).toBeCalledWith(Maybe.nothing());
  });

  it('creates Task cancelable immediately', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    task.cancel();

    await flushPromises();

    expect(callback).toBeCalledWith(Maybe.nothing());
  });

  it('creates Task not cancelable after being resolved', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(100);

    task.cancel();

    await flushPromises();

    expect(callback).toBeCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task rejectable in 50ms', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(50);

    expect(callback).not.toBeCalled();

    task.reject('some-error');

    await flushPromises();

    expect(callback).toBeCalledWith(Maybe.just(Either.left('some-error')));
  });
});
