import { Maybe, Task } from '../';

const delayedValueTask = <R>(value: R, delay: number) => Task.timeout(delay).map(() => value);

/**
 * chainTaskMaybe does not own settlement: cancel only forwards to a mutable
 * slot, and `await invoke2` yields before that slot points at the child.
 *
 * These cases should stay canceled (Nothing) with no continuation side effects.
 * They fail on the current implementation.
 */
describe('chain cancel cell races', () => {
  it('repeated relaunch case', async () => {
    const op = jest.fn(() => Task.resolved('from-chain'));

    const task = delayedValueTask('parent', 100).chain(op);

    task.cancel();

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

    const task = Task.resolved('parent').chain(op);

    await Promise.resolve();

    expect(op).toHaveBeenCalledTimes(1);

    task.cancel();

    await Promise.resolve();

    finishChild('from-child');

    expect(await task.resolve()).toStrictEqual(Maybe.nothing());
    expect(childFinished).not.toHaveBeenCalled();
  });
});
