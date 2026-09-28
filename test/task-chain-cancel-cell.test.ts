import { Maybe, Task } from '../';

import { setImmediate } from 'timers';

const delayedValueTask = <R>(value: R, delay: number) => Task.fromCallback<NodeJS.Timeout, R>((resolve) => setTimeout(() => resolve(value), delay), clearTimeout);

describe('chain cancel cell races', () => {
  it('repeated relaunch case', async () => {
    const op = jest.fn(() => Task.resolved('from-chain'));

    const task = delayedValueTask('parent', 100).chain(op);

    task.cancel();

    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(op).not.toHaveBeenCalled();
  });

  it('cancel after chaining off a settled parent skips the continuation', async () => {
    const op = jest.fn(() => Task.resolved('from-chain'));

    const task = Task.fromPromise(Promise.resolve('parent')).chain(op);
    task.cancel();

    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(op).not.toHaveBeenCalled();
  });

  it('cancel after mapping a settled parent skips the mapper', async () => {
    const op = jest.fn(() => 'from-map');

    const task = Task.fromPromise(Promise.resolve('parent')).map(op);
    task.cancel();

    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(op).not.toHaveBeenCalled();
  });

  it('cancel after mapping a settled parent skips the mapper', async () => {
    const op = jest.fn(() => 'from-map');
    const cancel = jest.fn();

    const cancelRef = { cancel: () => cancel() }

    const task = Task.fromPromise(Promise.resolve('parent').then(() => cancelRef.cancel())).map(op);

    cancelRef.cancel = () => task.cancel();

    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(op).not.toHaveBeenCalled();
  });

  it('cancel after the chain op ran but before child cancel is installed aborts the child', async () => {
    let finishChild!: (value: string) => void;
    const childFinished = jest.fn();

    const op = jest.fn(() =>
      Task.fromPromise(
        new Promise<string>((resolve) => {
          finishChild = resolve;
        }),
      ).tap(childFinished),
    );

    const task = Task.fromPromise(Promise.resolve('parent')).chain(op);

    await new Promise((resolve) => setImmediate(resolve));

    expect(op).toHaveBeenCalledTimes(1);

    task.cancel();

    await new Promise((resolve) => setImmediate(resolve));

    finishChild('from-child');

    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(childFinished).not.toHaveBeenCalled();
  });
});
