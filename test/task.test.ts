import { timeoutTask, generateTask, cast } from '../src/task-tools';
import { isJust, isNothing, isRight, isLeft, rejectedTask } from '../src';

describe('tasks', () => {
  const delayedValueTask = <R>(value: R, delay: number) => timeoutTask(delay).fmap(() => value);

  it('return 42 in 500ms', async () => {
    const callback = jest.fn();

    const task = delayedValueTask(42, 500).fmap((value) => {
      callback();

      return value;
    });

    const result = await task.resolve();

    expect(callback.mock.calls.length).toBe(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  }, 1000);

  it('cancel in 200ms', async () => {
    const callback = jest.fn();

    const task = delayedValueTask(42, 500).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(callback.mock.calls.length).toBe(0);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('return 4 in 700ms', async () => {
    const callback = jest.fn();

    const task = delayedValueTask('data', 400).fmap((value) => {
      callback();

      return value;
    }).chain((value) => delayedValueTask(value.length, 300)).fmap((value) => {
      callback();

      return value;
    });

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(callback.mock.calls.length).toBe(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(4);
  }, 1000);

  it('cancel on first step', async () => {
    const callback = jest.fn();

    const task = delayedValueTask('data', 400).fmap((value) => {
      callback();

      return value;
    }).chain((value) => delayedValueTask(value.length, 300)).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();
    
    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(callback.mock.calls.length).toBe(0);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('cancel on second step', async () => {
    const callback = jest.fn();

    const task = delayedValueTask('data', 400).fmap((value) => {
      callback();

      return value;
    }).chain((value) => delayedValueTask(value.length, 300)).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.cancel(), 500);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(callback.mock.calls.length).toBe(1);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('return 4 in 700ms', async () => {
    const callback = jest.fn();

    const task = generateTask(function* () {
      const value1 = cast<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = cast<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(callback.mock.calls.length).toBe(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(4);
  }, 1000);

  it('cancel on first step', async () => {
    const callback = jest.fn();

    const task = generateTask(function* () {
      const value1 = cast<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = cast<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(callback.mock.calls.length).toBe(0);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('cancel on second step', async () => {
    const callback = jest.fn();

    const task = generateTask(function* () {
      const value1 = cast<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = cast<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.cancel(), 500);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(callback.mock.calls.length).toBe(1);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('fail on first step', async () => {
    const callback = jest.fn();

    const task = generateTask(function* () {
      const value1 = cast<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = cast<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(callback.mock.calls.length).toBe(0);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail on second step', async () => {
    const callback = jest.fn();

    const task = generateTask(function* () {
      const value1 = cast<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = cast<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.reject(), 500);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(callback.mock.calls.length).toBe(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail on first step', async () => {
    const callback = jest.fn();

    const task = delayedValueTask('data', 400).fmap((value) => {
      callback();

      return value;
    }).chain((value) => delayedValueTask(value.length, 300)).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(callback.mock.calls.length).toBe(0);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail on second step', async () => {
    const callback = jest.fn();

    const task = delayedValueTask('data', 400).fmap((value) => {
      callback();

      return value;
    }).chain((value) => delayedValueTask(value.length, 300)).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.reject(), 500);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(callback.mock.calls.length).toBe(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('chain ignoring errors on first step', async () => {
    const callback = jest.fn();
    
    const task = delayedValueTask('data', 400).fmapEither((value) => {
      callback();

      return value;
    }).chainEither((value) => {
      if (isRight(value)) {
        return delayedValueTask(value.right.length, 300);
      } else {
        return delayedValueTask(5, 100);
      }
    }).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(callback.mock.calls.length).toBe(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(5);
  }, 1000);

  it('chain ignoring failure on first step', async () => {
    const callback = jest.fn();
    
    const task = delayedValueTask('data', 400).fmapMaybe((value) => {
      callback();

      return value;
    }).chainMaybe((value) => {
      if (isJust(value)) {
        if (isRight(value.just)) {
          return delayedValueTask(value.just.right.length, 300);
        } else {
          return rejectedTask(value.just.left);
        }
      } else {
        return delayedValueTask(7, 100);
      }
    }).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(callback.mock.calls.length).toBe(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(7);
  }, 1000);

  it('chain ignoring errors on first step', async () => {
    const callback = jest.fn();

    const task = generateTask(function* () {
      let value1: number;
      try {
        value1 = cast<string>(yield delayedValueTask('data', 400)).length;
      
        callback();
      } catch (error) {
        callback();

        value1 = cast<number>(yield delayedValueTask(5, 100));
      }
      
      callback();

      return value1;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(callback.mock.calls.length).toBe(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(5);
  }, 1000);
});
