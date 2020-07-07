import { timeoutTask, generateTask, liftResult, liftResultCreator, castResult, repeatTask, limitTask, catchTask, onCancelled, parallelTask, sequenceTask } from '../src/task-tools';
import { isJust, isNothing, isRight, isLeft, rejectedTask, resolvedTask } from '../src';

const time = () => performance.now();
const measureTime = (last: number) => time() - last;
const expectTime = (last: number, limit: number) => expect(Math.abs(measureTime(last) - limit)).toBeLessThan(50);

const delayedValueTask = <R>(value: R, delay: number) => timeoutTask(delay).fmap(() => value);

describe('tasks', () => {
  it('return 42 in 500ms', async () => {
    const taskCreator = jest.fn(() => delayedValueTask(42, 500));
    const startTime = time();

    const task = taskCreator();

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(taskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  }, 1000);

  it('fail externally in 200ms', async () => {
    const taskCreator = jest.fn(() => delayedValueTask(42, 500));
    const startTime = time();

    const task = taskCreator();

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(taskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail internally in 200ms', async () => {
    const taskCreator = jest.fn(() => delayedValueTask(42, 200).fmap((value) => {
      throw new Error('Failed');

      return value;
    }));

    const startTime = time();

    const task = taskCreator();

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(taskCreator).toBeCalledTimes(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('cancel in 200ms', async () => {
    const taskCreator = jest.fn(() => delayedValueTask(42, 500));
    const startTime = time();

    const task = taskCreator();

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(taskCreator).toBeCalledTimes(1);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);
});

describe('chainTask', () => {
  it('return 4 in 700ms', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 400));
    const secondTaskCreator = jest.fn((value: string) => delayedValueTask(value.length, 300));
    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    const result = await task.resolve();

    expectTime(startTime, 700);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(4);
  }, 1000);

  it('cancel on first step in 200ms', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 400));
    const secondTaskCreator = jest.fn((value: string) => delayedValueTask(value.length, 300));
    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();
    
    expectTime(startTime, 200);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(0);

    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('cancel on second step in 500ms', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 400));
    const secondTaskCreator = jest.fn((value: string) => delayedValueTask(value.length, 300));
    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    setTimeout(() => task.cancel(), 500);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(1);

    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('fail externally on first step in 200ms', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 400));
    const secondTaskCreator = jest.fn((value: string) => delayedValueTask(value.length, 300));

    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(0);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail externally on second step in 500ms', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 400));
    const secondTaskCreator = jest.fn((value: string) => delayedValueTask(value.length, 300));

    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    setTimeout(() => task.reject(), 500);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail internally on first step in 200ms', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 200).fmap((value) => {
      throw new Error('Failed');

      return value;
    }));
    const secondTaskCreator = jest.fn((value: string) => delayedValueTask(value.length, 300));

    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(0);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail internally on second step in 500ms', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 400));
    const secondTaskCreator = jest.fn((value: string) => delayedValueTask(value.length, 100).fmap((value) => {
      throw new Error('Failed');

      return value;
    }));

    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail internally on second step in 400ms (chain failure)', async () => {
    const firstTaskCreator = jest.fn(() => delayedValueTask('data', 400));
    const secondTaskCreator = jest.fn((value: string) => {
      throw new Error('Failed');

      return delayedValueTask(value.length, 100);
    });

    const startTime = time();

    const task = firstTaskCreator().chain(secondTaskCreator);

    const result = await task.resolve();

    expectTime(startTime, 400);

    expect(firstTaskCreator).toBeCalledTimes(1);
    expect(secondTaskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('chain ignoring external errors on first step', async () => {
    const callback = jest.fn();
    const startTime = time();
    
    const task = delayedValueTask('data', 400).fmapEither((value) => {
      callback();

      return value;
    }).chainEither((value) => {
      if (isRight(value)) {
        return delayedValueTask(value.right.length, 300);
      } else {
        return delayedValueTask(5, 300);
      }
    }).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(5);
  }, 1000);

  it('chain ignoring internal errors on first step', async () => {
    const callback = jest.fn();
    const startTime = time();
    
    const task = delayedValueTask('data', 200).fmapEither((value) => {
      throw new Error('Failed');

      callback();

      return value;
    }).chainEither((value) => {
      if (isRight(value)) {
        return delayedValueTask(value.right.length, 300);
      } else {
        return delayedValueTask(5, 300);
      }
    }).fmap((value) => {
      callback();

      return value;
    });

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(5);
  }, 1000);

  it('chain ignoring cancel on first step', async () => {
    const callback = jest.fn();
    const startTime = time();
    
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
        return delayedValueTask(7, 300);
      }
    }).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(7);
  }, 1000);
});

describe('generateTask', () => {
  const delayedValueTask = <R>(value: R, delay: number) => timeoutTask(delay).fmap(() => value);

  it('return 4 in 700ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      const value1 = castResult<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = castResult<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    const result = await task.resolve();

    expectTime(startTime, 700);

    expect(callback).toBeCalledTimes(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(4);
  }, 1000);

  it('cancel on first step in 200ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      const value1 = castResult<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = castResult<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(callback).toBeCalledTimes(0);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('cancel on second step in 500ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      const value1 = castResult<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = castResult<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.cancel(), 500);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(1);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);

  it('fail externally on first step in 200ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      const value1 = castResult<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = castResult<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(callback).toBeCalledTimes(0);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail externally on second step in 500ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      const value1 = castResult<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = castResult<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    setTimeout(() => task.reject(), 500);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail internally on first step in 200ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      const value1 = castResult<string>(yield delayedValueTask('data', 200));

      throw new Error('Failed');
      
      callback();
  
      const value2 = castResult<number>(yield delayedValueTask(value1.length, 300));
      
      callback();

      return value2;
    });

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(callback).toBeCalledTimes(0);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail internally on second step in 500ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      const value1 = castResult<string>(yield delayedValueTask('data', 400));
      
      callback();
  
      const value2 = castResult<number>(yield delayedValueTask(value1.length, 100));

      throw new Error('Failed');
      
      callback();

      return value2;
    });

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('chain ignoring external errors on first step', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      let value1: number;
      try {
        value1 = castResult<string>(yield delayedValueTask('data', 400)).length;
      
        callback();
      } catch (error) {
        callback();

        value1 = castResult<number>(yield delayedValueTask(5, 100));
      }
      
      callback();

      return value1;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    expectTime(startTime, 300);

    expect(callback).toBeCalledTimes(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(5);
  }, 1000);

  it('chain ignoring internal errors on first step', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = generateTask(function* () {
      let value1: number;
      try {
        value1 = castResult<string>(yield delayedValueTask('data', 200)).length;

        throw new Error('Failed');
      
        callback();
      } catch (error) {
        callback();

        value1 = castResult<number>(yield delayedValueTask(5, 100));
      }
      
      callback();

      return value1;
    });

    const result = await task.resolve();

    expectTime(startTime, 300);

    expect(callback).toBeCalledTimes(2);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(5);
  }, 1000);
});

describe('liftResult', () => {
  it('return 42 in 500ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = liftResult(new Promise((resolve) => setTimeout(() => {
      resolve(42);
    }, 500))).fmap((value) => {
      callback();

      return value;
    });

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  });

  it('fail externally in 200ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = liftResult(new Promise((resolve) => setTimeout(() => {
      resolve(42);
    }, 500))).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.reject(), 200);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(callback).toBeCalledTimes(0);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('fail internally in 200ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = liftResult(new Promise((_, reject) => setTimeout(() => {
      reject("Rejected");
    }, 200))).fmap((value) => {
      callback();

      return value;
    });

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(callback).toBeCalledTimes(0);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  }, 1000);

  it('cancel in 200ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const task = liftResult(new Promise((resolve) => setTimeout(() => {
      resolve(42);
    }, 500))).fmap((value) => {
      callback();

      return value;
    });

    setTimeout(() => task.cancel(), 200);

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(callback).toBeCalledTimes(0);
    expect(isNothing(result)).toBeTruthy();
  }, 1000);
});

describe('liftResultCreator', () => {
  const resultCreator = <R>(value: R, delay: number) => new Promise<R>((resolve) => setTimeout(() => {
    resolve(value);
  }, delay));

  it('return 42 in 500ms', async () => {
    const callback = jest.fn();
    const startTime = time();

    const taskCreator = liftResultCreator(resultCreator);

    const task = taskCreator(42, 500).fmap((value) => {
      callback();

      return value;
    });

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(callback).toBeCalledTimes(1);
    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  });
});

describe('repeatTask', () => {
  it('return 42 in 1300ms', async () => {
    const resultCreator = jest.fn(() => 45)
      .mockImplementationOnce(() => {
        throw new Error('Error 1');
      })
      .mockImplementationOnce(() => {
        throw new Error('Error 2');
      })
      .mockImplementationOnce(() => {
        return 42;
      })
    const taskCreator = jest.fn(() => timeoutTask(300).fmap(resultCreator))
      .mockImplementationOnce(() => timeoutTask(300).fmap(resultCreator))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator));

    const startTime = time();

    const task = repeatTask(taskCreator, () => timeoutTask(200));

    const result = await task.resolve();

    expectTime(startTime, 300 + 200 + 400 + 200 + 200);

    expect(taskCreator).toBeCalledTimes(3);
    expect(resultCreator).toBeCalledTimes(3);
    expect(resultCreator).toReturnTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  });
});

describe('limitTask', () => {
  it('fail in 200ms', async () => {
    const resultCreator = jest.fn(() => 42)
    const taskCreator = jest.fn(() => timeoutTask(500).fmap(resultCreator));

    const startTime = time();

    const task = limitTask(taskCreator(), timeoutTask(200));

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(taskCreator).toBeCalledTimes(1);
    expect(resultCreator).toBeCalledTimes(0);
    expect(resultCreator).toReturnTimes(0);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  });

  it('succeed in 500ms', async () => {
    const resultCreator = jest.fn(() => 42)
    const taskCreator = jest.fn(() => timeoutTask(500).fmap(resultCreator));

    const startTime = time();

    const task = limitTask(taskCreator(), timeoutTask(700));

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(taskCreator).toBeCalledTimes(1);
    expect(resultCreator).toBeCalledTimes(1);
    expect(resultCreator).toReturnTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  });
});

describe('catchTask', () => {
  it('return fallback in 200ms', async () => {
    const taskCreator = jest.fn(() => timeoutTask(200).fmap(() => {
      throw new Error('Failed');

      return 42;
    }));

    const startTime = time();

    const task = catchTask(taskCreator(), () => resolvedTask(65));

    const result = await task.resolve();

    expectTime(startTime, 200);

    expect(taskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(65);
  });

  it('succeed in 500ms', async () => {
    const taskCreator = jest.fn(() => timeoutTask(500).fmap(() => {
      return 42;
    }));

    const startTime = time();

    const task = catchTask(taskCreator(), () => resolvedTask(65));

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(taskCreator).toBeCalledTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  });
});

describe('onCanceled', () => {
  it('succeed in 500ms', async () => {
    const callback = jest.fn();
    const resultCreator = jest.fn(() => 42);
    const taskCreator = jest.fn(() => onCancelled(timeoutTask(500).fmap(resultCreator), callback));

    const startTime = time();

    const task = taskCreator();

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(taskCreator).toBeCalledTimes(1);
    expect(resultCreator).toBeCalledTimes(1);
    expect(callback).toBeCalledTimes(0);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual(42);
  });

  it('cancel in 300ms', async () => {
    const callback = jest.fn();
    const resultCreator = jest.fn(() => 42);
    const taskCreator = jest.fn(() => onCancelled(timeoutTask(500).fmap(resultCreator), callback));

    const startTime = time();

    const task = taskCreator();

    setTimeout(() => task.cancel(), 300);

    const result = await task.resolve();

    expectTime(startTime, 300);

    expect(taskCreator).toBeCalledTimes(1);
    expect(resultCreator).toBeCalledTimes(0);
    expect(callback).toBeCalledTimes(1);

    expect(isNothing(result)).toBeTruthy();
  });
});

describe('parallelTask', () => {
  it('succeed in 600ms', async () => {
    const resultCreator1 = jest.fn(() => 40);
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = parallelTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    const result = await task.resolve();

    expectTime(startTime, 600);

    expect(taskCreator).toBeCalledTimes(3);
    expect(resultCreator1).toBeCalledTimes(1);
    expect(resultCreator1).toReturnTimes(1);
    expect(resultCreator2).toBeCalledTimes(1);
    expect(resultCreator2).toReturnTimes(1);
    expect(resultCreator3).toBeCalledTimes(1);
    expect(resultCreator3).toReturnTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual([40, 41, 42]);
  });

  it('cancel in 300ms', async () => {
    const resultCreator1 = jest.fn(() => 40);
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = parallelTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    setTimeout(() => task.cancel(), 300);

    const result = await task.resolve();

    expectTime(startTime, 300);

    expect(taskCreator).toBeCalledTimes(3);
    expect(resultCreator1).toBeCalledTimes(0);
    expect(resultCreator1).toReturnTimes(0);
    expect(resultCreator2).toBeCalledTimes(0);
    expect(resultCreator2).toReturnTimes(0);
    expect(resultCreator3).toBeCalledTimes(1);
    expect(resultCreator3).toReturnTimes(1);

    expect(isNothing(result)).toBeTruthy();
  });

  it('fail externally in 300ms', async () => {
    const resultCreator1 = jest.fn(() => 40);
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = parallelTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    setTimeout(() => task.reject(), 300);

    const result = await task.resolve();

    expectTime(startTime, 300);

    expect(taskCreator).toBeCalledTimes(3);
    expect(resultCreator1).toBeCalledTimes(0);
    expect(resultCreator1).toReturnTimes(0);
    expect(resultCreator2).toBeCalledTimes(0);
    expect(resultCreator2).toReturnTimes(0);
    expect(resultCreator3).toBeCalledTimes(1);
    expect(resultCreator3).toReturnTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  });

  it('fail internally in 400ms', async () => {
    const resultCreator1 = jest.fn(() => {
      throw new Error('Failed');

      return 40;
    });
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = parallelTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    const result = await task.resolve();

    expectTime(startTime, 400);

    expect(taskCreator).toBeCalledTimes(3);
    expect(resultCreator1).toBeCalledTimes(1);
    expect(resultCreator1).toReturnTimes(0);
    expect(resultCreator2).toBeCalledTimes(0);
    expect(resultCreator2).toReturnTimes(0);
    expect(resultCreator3).toBeCalledTimes(1);
    expect(resultCreator3).toReturnTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  });
});

describe('sequenceTask', () => {
  it('succeed in 600ms', async () => {
    const resultCreator1 = jest.fn(() => 40);
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = sequenceTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    const result = await task.resolve();

    expectTime(startTime, 1200);

    expect(taskCreator).toBeCalledTimes(3);
    expect(resultCreator1).toBeCalledTimes(1);
    expect(resultCreator1).toReturnTimes(1);
    expect(resultCreator2).toBeCalledTimes(1);
    expect(resultCreator2).toReturnTimes(1);
    expect(resultCreator3).toBeCalledTimes(1);
    expect(resultCreator3).toReturnTimes(1);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isRight(result.just)).toBeTruthy();
    expect(isJust(result) && isRight(result.just) ? result.just.right : -1).toEqual([40, 41, 42]);
  });

  it('cancel in 500ms', async () => {
    const resultCreator1 = jest.fn(() => 40);
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = sequenceTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    setTimeout(() => task.cancel(), 500);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(taskCreator).toBeCalledTimes(2);
    expect(resultCreator1).toBeCalledTimes(1);
    expect(resultCreator1).toReturnTimes(1);
    expect(resultCreator2).toBeCalledTimes(0);
    expect(resultCreator2).toReturnTimes(0);
    expect(resultCreator3).toBeCalledTimes(0);
    expect(resultCreator3).toReturnTimes(0);

    expect(isNothing(result)).toBeTruthy();
  });

  it('fail externally in 500ms', async () => {
    const resultCreator1 = jest.fn(() => 40);
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = sequenceTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    setTimeout(() => task.reject(), 500);

    const result = await task.resolve();

    expectTime(startTime, 500);

    expect(taskCreator).toBeCalledTimes(2);
    expect(resultCreator1).toBeCalledTimes(1);
    expect(resultCreator1).toReturnTimes(1);
    expect(resultCreator2).toBeCalledTimes(0);
    expect(resultCreator2).toReturnTimes(0);
    expect(resultCreator3).toBeCalledTimes(0);
    expect(resultCreator3).toReturnTimes(0);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  });

  it('fail internally in 400ms', async () => {
    const resultCreator1 = jest.fn(() => {
      throw new Error('Failed');

      return 40;
    });
    const resultCreator2 = jest.fn(() => 41);
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = sequenceTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    const result = await task.resolve();

    expectTime(startTime, 400);

    expect(taskCreator).toBeCalledTimes(1);
    expect(resultCreator1).toBeCalledTimes(1);
    expect(resultCreator1).toReturnTimes(0);
    expect(resultCreator2).toBeCalledTimes(0);
    expect(resultCreator2).toReturnTimes(0);
    expect(resultCreator3).toBeCalledTimes(0);
    expect(resultCreator3).toReturnTimes(0);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  });

  it('fail internally in 1000ms', async () => {
    const resultCreator1 = jest.fn(() => 40);
    const resultCreator2 = jest.fn(() => {
      throw new Error('Failed');

      return 41;
    });
    const resultCreator3 = jest.fn(() => 42);

    const taskCreator = jest.fn(() => resolvedTask(65))
      .mockImplementationOnce(() => timeoutTask(400).fmap(resultCreator1))
      .mockImplementationOnce(() => timeoutTask(600).fmap(resultCreator2))
      .mockImplementationOnce(() => timeoutTask(200).fmap(resultCreator3));

    const startTime = time();

    const task = sequenceTask([
      taskCreator,
      taskCreator,
      taskCreator,
    ]);

    const result = await task.resolve();

    expectTime(startTime, 1000);

    expect(taskCreator).toBeCalledTimes(2);
    expect(resultCreator1).toBeCalledTimes(1);
    expect(resultCreator1).toReturnTimes(1);
    expect(resultCreator2).toBeCalledTimes(1);
    expect(resultCreator2).toReturnTimes(0);
    expect(resultCreator3).toBeCalledTimes(0);
    expect(resultCreator3).toReturnTimes(0);

    expect(isJust(result)).toBeTruthy();
    expect(isJust(result) && isLeft(result.just)).toBeTruthy();
  });
});
