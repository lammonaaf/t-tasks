import { Maybe, Either, Task } from '../';

import { setImmediate } from 'timers';

describe('Task.resolved()', () => {
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

  it('exposes the settled result and ignores cancel and reject', () => {
    const task = Task.resolved('some-data');

    expect(task.resolved()).toStrictEqual(Maybe.just(Either.right('some-data')));
    expect(task.cancel()).toBe(false);
    expect(task.reject('some-error')).toBe(false);
  });
});

describe('Task.rejected()', () => {
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

  it('exposes the settled result and ignores cancel and reject', () => {
    const task = Task.rejected('some-error');

    expect(task.resolved()).toStrictEqual(Maybe.just(Either.left('some-error')));
    expect(task.cancel()).toBe(false);
    expect(task.reject('other-error')).toBe(false);
  });
});

describe('Task.canceled()', () => {
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

  it('exposes the settled result and ignores cancel and reject', () => {
    const task = Task.canceled();

    expect(task.resolved()).toStrictEqual(Maybe.nothing());
    expect(task.cancel()).toBe(false);
    expect(task.reject('some-error')).toBe(false);
  });
});

describe('Task.timeout', () => {
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

  it('creates Task resolving with undefined in exactly 100ms', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(99);

    expect(callback).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.right(undefined)));

    expect(task.resolved()).toStrictEqual(Maybe.just(Either.right(undefined)));
  });

  it('creates Task resolving with undefined in exactly 1ms', async () => {
    const task = Task.timeout(1);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(1);

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task resolving with undefined immediately', async () => {
    const task = Task.timeout(0);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(0);

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task cancelable in 50ms', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(50);

    expect(callback).toHaveBeenCalledTimes(0);

    task.cancel();

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.nothing());
  });

  it('creates Task cancelable immediately', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    task.cancel();

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.nothing());
  });

  it('creates Task not cancelable after being resolved', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(100);

    task.cancel();

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task rejectable in 50ms', async () => {
    const task = Task.timeout(100);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(50);

    expect(callback).toHaveBeenCalledTimes(0);

    task.reject('some-error');

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.left('some-error')));
  });
});

describe('Task.fromCallback', () => {
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

  it('creates Task resolving with undefined in exactly 100ms', async () => {
    const task = Task.fromCallback<NodeJS.Timeout, void>((resolve) => setTimeout(() => resolve(), 100), clearTimeout);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(99);

    expect(callback).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.right(undefined)));
  });

  it('creates Task resolving with true immediately', async () => {
    const cleanup = jest.fn();

    const task = Task.fromCallback<number, true>((resolve) => {
      resolve(true);
      return 42;
    }, cleanup);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(cleanup).toHaveBeenCalledTimes(0);
    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.right(true)));
  });

  it('creates Task rejecting in constructor immediately', async () => {
    const cleanup = jest.fn();

    const task = Task.fromCallback<number, true>((resolve) => {
      throw 'some-error';
      resolve(true);
      return 42;
    }, cleanup);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(cleanup).toHaveBeenCalledTimes(0);
    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.left('some-error')));
  });

  it('creates Task rejecting immediately', async () => {
    const cleanup = jest.fn();

    const task = Task.fromCallback<number, true>((_resolve, reject) => {
      reject('some-error');
      return 42;
    }, cleanup);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.left('some-error')));
  });

  it('creates Task canceling in exactly 100ms', async () => {
    const task = Task.fromCallback<NodeJS.Timeout, void>((_resolve, _reject, cancel) => setTimeout(cancel, 100), clearTimeout);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(99);

    expect(callback).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(callback).toHaveBeenCalledWith(Maybe.nothing());
  });

  it('creates Task rejecting with some-error in exactly 100ms', async () => {
    const task = Task.fromCallback<NodeJS.Timeout, void>((_resolve, reject) => setTimeout(() => reject('some-error'), 100), clearTimeout);

    const callback = jest.fn();

    task.resolve().then(callback);

    await advanceTime(99);

    expect(callback).toHaveBeenCalledTimes(0);

    await advanceTime(1);

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.left('some-error')));
  });

  it('calls onCancel once when canceled externally and ignores a later resolve', async () => {
    let resolve!: (value: true) => void;
    const cleanup = jest.fn();

    const task = Task.fromCallback<number, true>((res) => {
      resolve = res;
      return 42;
    }, cleanup);

    expect(task.cancel()).toBe(true);
    expect(task.cancel()).toBe(false);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledWith(42);

    resolve(true);

    await flushPromises();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(task.cancel()).toBe(false);
    expect(task.reject('some-error')).toBe(false);
  });

  it('calls onCancel once when rejected externally and ignores a later resolve', async () => {
    let resolve!: (value: true) => void;
    const cleanup = jest.fn();

    const task = Task.fromCallback<number, true>((res) => {
      resolve = res;
      return 42;
    }, cleanup);

    expect(task.reject('some-error')).toBe(true);
    expect(task.reject('other-error')).toBe(false);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledWith(42);

    resolve(true);

    await flushPromises();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(await task.resolve()).toStrictEqual(Maybe.just(Either.left('some-error')));
    expect(task.cancel()).toBe(false);
    expect(task.reject('other-error')).toBe(false);
  });

  it('calls onCancel once when canceled synchronously', async () => {
    const cleanup = jest.fn();

    const task = Task.fromCallback<number, true>((_resolve, _reject, cancel) => {
      cancel();
      return 42;
    }, cleanup);

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledWith(42);

    await flushPromises();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(task.cancel()).toBe(false);
    expect(task.reject('some-error')).toBe(false);
  });
});

describe('Task.fromPromise', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  it('returns true from cancel and reject only while pending', async () => {
    let resolvePromise!: (value: number) => void;
    const task = Task.fromPromise(new Promise<number>((resolve) => {
      resolvePromise = resolve;
    }));

    expect(task.resolved()).toBeNull();
    expect(task.reject('some-error')).toBe(true);
    expect(task.reject('other-error')).toBe(false);
    expect(task.cancel()).toBe(false);

    resolvePromise(42);

    await flushPromises();

    expect(await task.resolve()).toStrictEqual(Maybe.just(Either.left('some-error')));
    expect(task.resolved()).toStrictEqual(Maybe.just(Either.left('some-error')));
    expect(task.cancel()).toBe(false);
    expect(task.reject('other-error')).toBe(false);
  });

  it('stays canceled when the promise rejects afterwards', async () => {
    let rejectPromise!: (error: unknown) => void;
    const task = Task.fromPromise(new Promise<number>((_resolve, reject) => {
      rejectPromise = reject;
    }));

    expect(task.cancel()).toBe(true);
    expect(task.cancel()).toBe(false);
    expect(task.reject('some-error')).toBe(false);

    rejectPromise('some-error');

    await flushPromises();

    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(task.resolved()).toStrictEqual(Maybe.nothing());
  });
});

describe('Task.fromFunction', () => {
  beforeEach(() => jest.useFakeTimers({ legacyFakeTimers: true }));
  afterEach(() => jest.useRealTimers());

  const flushPromises = async () => {
    return new Promise((resolve) => setImmediate(resolve));
  };

  it('creates Task resolving with 42 inmmediately', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ref = { cancel: (_error: Maybe<any>) => true }

    const task = Task.fromFunction(() => 42, ref);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.right(42)));
  });

  it('creates Task rejecting in constructor immediately', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ref = { cancel: (_error: Maybe<any>) => true }

    const task = Task.fromFunction(() => {
      throw 'some-error';
    }, ref);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.left('some-error')));
  });

  it('creates Task rejecting immediately', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ref = { cancel: (_error: Maybe<any>) => true }

    const task = Task.fromFunction(() => ref.cancel(Maybe.just('some-error')), ref);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.just(Either.left('some-error')));
  });

  it('creates Task canceling immediately', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ref = { cancel: (_error: Maybe<any>) => true }

    const task = Task.fromFunction(() => ref.cancel(Maybe.nothing()), ref);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.nothing());
  });

  it('ignores the value returned after cancelation', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ref = { cancel: (_error: Maybe<any>) => true };

    const task = Task.fromFunction(() => {
      ref.cancel(Maybe.nothing());
      return 42;
    }, ref);

    const callback = jest.fn();

    task.resolve().then(callback);

    await flushPromises();

    expect(callback).toHaveBeenCalledWith(Maybe.nothing());
  });

  it('returns false from cancel and reject after the producer returns', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ref = { cancel: (_error: Maybe<any>) => true };

    const task = Task.fromFunction(() => 42, ref);

    expect(task.cancel()).toBe(false);
    expect(task.reject('some-error')).toBe(false);

    await flushPromises();

    expect(await task.resolve()).toStrictEqual(Maybe.just(Either.right(42)));
  });
});
