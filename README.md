![CI](https://github.com/lammonaaf/t-ask/workflows/CI/badge.svg?branch=master)

# T-Tasks task library

T-Tasks provides a Task quasi-monad, allowing to schedule, cancel and externally reject async operations in a composable, semi-functional way.

Sometimes (for example, within React hooks) you need to cancel any ongoing asynchronous operation to prevent side-effects. Switching from async functions to chained tasks one can simply cancel current task execution ensuring that the operation will be cancelled at the nearest spot, preventing any unwanted side efects afterwards.

## Examples

### Prevent side-effects after async function

Keep in mind, that pure promises are still not cancelable, so the original function will still finish. In this scenario we can only elliminate side effects within task composition chain.

```typescript
const task = Task.fromPromise(someAsyncFunction())
  .tap((result) => {
    setSomething(result); // side-effects
  });

task.cancel(); // prevent unwanted side effects
```

### Chain multiple async functions togeter

In this scenario if one cancels the task during first operation, the seconf one would not be initiated at all

```typescript
const task = Task.fromPromise(someAsyncFunction())
  .chain((result1) => otherAsyncFunction(result1))
  .tap((result2) => {
    setSomething(result); // side-effects
  });

task.cancel(); // prevent unwanted side effects
```

### Chain multiple async functions via generator

In this scenario is identical to the previous one except of using generator syntax. Note usage of ```.generator()``` is required due to typescript being unable to predict types correctly othewise.

```typescript
const task = Task.generate(function*() {
  const result1 = yield* Task.fromPromise(someAsyncFunction()).generator();

  const result2 = yield* Task.fromPromise(otherAsyncFunction(result1)).generator();
  
  setSomething(result2); // side-effects
});

task.cancel(); // prevent unwanted side effects
```

### Throw exceptions straight to generators

It is also possible to reject pending tasks manually, resulting in an immediate interruption with exception. However you still can catch that exception within the task itself and fallback if necessary.

```typescript
const task = Task.generate(function*() {
  let result1: number;

  try {
    result1 = yield* Task.fromPromise(someAsyncFunction()).generator();
  } catch (e) {
    console.error(e);

    result1 = 42; // Sometimes we have to give an answer in time i guess
  }

  const result2 = yield* Task.fromPromise(otherAsyncFunction(result1)).generator();
  
  setSomething(result2); // side-effects
});

task.reject(new Error('Stop right there')); // prevent unwanted side effects
```
