[t-tasks](../README.md) / [Exports](../modules.md) / Task

# Namespace: Task

## Table of contents

### Functions

- [all](Task.md#all)
- [any](Task.md#any)
- [canceled](Task.md#canceled)
- [create](Task.md#create)
- [fromCallback](Task.md#fromcallback)
- [fromFunction](Task.md#fromfunction)
- [fromPromise](Task.md#frompromise)
- [generate](Task.md#generate)
- [generateFunction](Task.md#generatefunction)
- [lift](Task.md#lift)
- [limit](Task.md#limit)
- [promiseGenerator](Task.md#promisegenerator)
- [rejected](Task.md#rejected)
- [repeat](Task.md#repeat)
- [resolved](Task.md#resolved)
- [sequence](Task.md#sequence)
- [timeout](Task.md#timeout)
- [timeoutGenerator](Task.md#timeoutgenerator)

## Functions

### all

▸ **all**<`T`\>(`tasks`): [`Task`](../interfaces/Task.md)<`T`[]\>

Execute all tasks in parallel and return list of results

Resulting task resolves when all tasks are resolved, returning list of tasks results maintaining result order
In case of failure (external or internal) resulting task is immediately immediately rejected with that error and all pending tasks are canceled
In case of cancelation resulting task is immediately immediately canceled together with all pending tasks

**`note`** direct equivalent of Promise.all

**`retuirns`** task resolving to the list of results

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | underlying task type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | `Iterable`<[`Task`](../interfaces/Task.md)<`T`\>\> | iterable of tasks to execute |

#### Returns

[`Task`](../interfaces/Task.md)<`T`[]\>

#### Defined in

[task.ts:555](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L555)

___

### any

▸ **any**<`T`\>(`tasks`): [`Task`](../interfaces/Task.md)<`T`\>

Execute all tasks in parallel and return the result of the first successful one

Resulting task resolves when the first tasks is successfuly resolved, returning it's result
In case of external task rejecttion all tasks are rejected with that error and resulting task is rejected with an array of errors
In case of internal task rejection the execution is continued untill fthe first task resolves succesfully or all the tasks are rejected this way resulting task is rejected with an array of errors
In case of cancelation resulting task is immediately immediately canceled together with all pending tasks

**`note`** direct equivalent of Promise.any

**`retuirns`** task resolving to the result of first successfull task

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | underlying task type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | `Iterable`<[`Task`](../interfaces/Task.md)<`T`\>\> | iterable of tasks to execute |

#### Returns

[`Task`](../interfaces/Task.md)<`T`\>

#### Defined in

[task.ts:610](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L610)

___

### canceled

▸ **canceled**<`R`\>(): [`Task`](../interfaces/Task.md)<`R`\>

Invariant task constructor creating canceled task

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | returned task's resolve type |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to specified value

#### Defined in

[task.ts:276](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L276)

___

### create

▸ **create**<`R`\>(`invoke`, `cancel`): [`Task`](../interfaces/Task.md)<`R`\>

Custom task monad constructor

**`note`** low-level primitive for creating custom tasks, not intended for general use

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | returned task's resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `invoke` | `TaskInvoke`<`R`\> | promise defining task execution |
| `cancel` | `TaskCancel` | cancelation function |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to resolve value of invoke

#### Defined in

[task.ts:244](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L244)

___

### fromCallback

▸ **fromCallback**<`H`, `R`\>(`create`, `onCancel`): [`Task`](../interfaces/Task.md)<`R`\>

Generic callback task

Usefull for creating custom tasks from success and error callbacks and cancelaton function. Synchronous callbacks are not supported, @see fromFuction

**`example`**
```typescript
export function timeout(delay: number) {
  return fromCallback<NodeJS.Timeout, void>((resolve) => setTimeout(() => resolve(), delay), clearTimeout);
}
```

#### Type parameters

| Name |
| :------ |
| `H` |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `create` | (`resolve`: (`result`: `R`) => `void`, `reject`: (`error`: `any`) => `void`, `cancel`: () => `void`) => `H` | task body with success and error callbacks |
| `onCancel` | (`handler`: `H`) => `void` | - |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to success value

#### Defined in

[task.ts:505](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L505)

___

### fromFunction

▸ **fromFunction**<`R`\>(`producer`, `cancelRef`): [`Task`](../interfaces/Task.md)<`R`\>

Lift from sync function to task resolving to said function result

Generally, functions are not considered tasks as they cannot be interrupted in any way
However there may be cases when impure function performs actions leading to cancelling or failing the task they are called from
Without such wrapper such cases would lead to ignoring said cancelation and continuilg task chain
This function is mostly used internally and is not expected to be widely used except of some edge scenarios

If converted task is canceled or failed externally return value will be ignored without side-effects
All tasks are no-trowing by default, any occured errors are returned as Left<any>

**`example`**
```typescript
const cancelRef = { cancel: () => {} };

const task = Task.fromFunction(() => someFunction('someData'), cancelRef).map((result) => result.length);
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | returned task resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `producer` | () => `R` | function to be wrapped to a task |
| `cancelRef` | `Object` | reference object allowing to set cancelation function prior to invoking function |
| `cancelRef.cancel` | `TaskCancel` | - |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to the specified function's result

#### Defined in

[task.ts:335](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L335)

___

### fromPromise

▸ **fromPromise**<`R`\>(`promise`): [`Task`](../interfaces/Task.md)<`R`\>

Lift from promise to task resolving to that promise result

Userfull for converting promises to tasks
If converted task is canceled or failed externally return value will be ignored without side-effects
All tasks are no-trowing by default, any occured errors are returned as Left<any>

**`example`**
```typescript
const task = Task.fromPromise(someAsyncOperation('someData')).map((result) => result.length);
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | returned task resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promise` | `PromiseLike`<`R`\> | promise to be resolved |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to specified promise value

#### Defined in

[task.ts:296](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L296)

___

### generate

▸ **generate**<`T`, `TT`, `R`\>(`taskGeneratorFunction`): [`Task`](../interfaces/Task.md)<`R`\>

Create compound task from generator function

Applying yield to task within the generator function awaits the task and returns underlying value in case of success
However the convinient option for typescript is to use ```yield* task.generator()``` as othervise one may have to deal with union types

In case of failure an error is thrown and may be caught by try-catch

If error is not caught the task is interrupted and returns 'just left error' immediately. In case of cancelation the task is interrupted and returns 'nothing' immediately

**`note`** compound task execution is interrupted only at yield statements, so despite returning immediately any promise-based chains would continue running until the first yield

**`note`** due to type unpredictability you HAVE to use ```.generator()``` together with yield* to avoid type issues, despite the fact that task may be yielded directly

**`example`**
```typescript
const task = Task.generate(function*() {
  try {
    const value1 = yield* delayedValueTask('data', 400).generator();

    const value2 = yield* delayedValueTask(value1.length, 300).generator();

    return value2;
  } catch (e) {
    return -1;
  }
});
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | - |
| `TT` | extends [`Task`](../interfaces/Task.md)<`T`, `TT`\> | yielded task type |
| `R` | `R` | returned task resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `taskGeneratorFunction` | [`TaskGeneratorFunction`](../modules.md#taskgeneratorfunction)<[], `T`, `TT`, `R`\> | task generator function |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to generator's return type

#### Defined in

[task.ts:433](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L433)

___

### generateFunction

▸ **generateFunction**<`Args`, `T`, `TT`, `R`\>(`taskGeneratorFunction`): (...`args`: `Args`) => [`Task`](../interfaces/Task.md)<`R`\>

Task function generator

Simplifies wrighting functions returning generated tasks

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Args` | extends `any`[] | generator arguments |
| `T` | `T` | - |
| `TT` | extends [`Task`](../interfaces/Task.md)<`T`, `TT`\> | yielded task type |
| `R` | `R` | returned task resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `taskGeneratorFunction` | [`TaskGeneratorFunction`](../modules.md#taskgeneratorfunction)<`Args`, `T`, `TT`, `R`\> | function* (...args) task generator function |

#### Returns

`fn`

task resolving to generator's return type

▸ (...`args`): [`Task`](../interfaces/Task.md)<`R`\>

Task function generator

Simplifies wrighting functions returning generated tasks

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

##### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to generator's return type

#### Defined in

[task.ts:462](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L462)

___

### lift

▸ **lift**<`A`, `R`\>(`promiseFunction`): [`TaskFunction`](../modules.md#taskfunction)<`A`, `R`\>

Lift from function returning value/promise to function returning task resolving to that value

Userfull for converting exising async functions to task functions for further use

**`see`** Task.fromPromise

**`example`**
```typescript
const taskFunction = liftPromiseFunction(someAsyncOperation);

const task = taskFunction('someData').map((result) => result.length);
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `A` | extends `unknown`[] | returned function's argument types |
| `R` | `R` | returned function's result task's resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseFunction` | (...`args`: `A`) => `PromiseLike`<`R`\> | function returning promise or plain value to be resolved |

#### Returns

[`TaskFunction`](../modules.md#taskfunction)<`A`, `R`\>

task function wrapping specified promise function

#### Defined in

[task.ts:396](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L396)

___

### limit

▸ **limit**<`T`\>(`task`, `limitTask`): [`Task`](../interfaces/Task.md)<`T`\>

Limit task execution based on another task

If the second task resolves sooner than the first, resulting task is canceled
Otherwise the resulting task resolves together with the first one

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `task` | [`Task`](../interfaces/Task.md)<`T`\> | task to limit |
| `limitTask` | [`Task`](../interfaces/Task.md)<`void`\> | limiting task |

#### Returns

[`Task`](../interfaces/Task.md)<`T`\>

task limites according to limitTask

#### Defined in

[task.ts:661](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L661)

___

### promiseGenerator

▸ **promiseGenerator**<`R`\>(`promise`): [`TaskGenerator`](../modules.md#taskgenerator)<`unknown`, [`Task`](../interfaces/Task.md)<`R`\>, `R`\>

Convinience shortcut for yielding async functions as tasks

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | returned generator resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promise` | `PromiseLike`<`R`\> | promise to be resolved |

#### Returns

[`TaskGenerator`](../modules.md#taskgenerator)<`unknown`, [`Task`](../interfaces/Task.md)<`R`\>, `R`\>

generator to be be used with yield*

#### Defined in

[task.ts:363](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L363)

___

### rejected

▸ **rejected**<`R`\>(`error`): [`Task`](../interfaces/Task.md)<`R`\>

Invariant task constructor creating rejected task from error value

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | returned task's resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `any` | error to be returned upon awaiting |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to specified value

#### Defined in

[task.ts:266](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L266)

___

### repeat

▸ **repeat**<`T`\>(`taskFunction`): [`Task`](../interfaces/Task.md)<`T`\>

Repeat task untill successful

Given task is re-generated in case of failure (both external and internal)
Resulting task is still cancelable by standard means

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `taskFunction` | [`TaskFunction`](../modules.md#taskfunction)<[], `T`\> | task preoducing function |

#### Returns

[`Task`](../interfaces/Task.md)<`T`\>

#### Defined in

[task.ts:673](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L673)

___

### resolved

▸ **resolved**<`R`\>(`value`): [`Task`](../interfaces/Task.md)<`R`\>

Invariant task constructor creating resolved task from plain value

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | returned task's resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `R` | value to be returned upon awaiting |

#### Returns

[`Task`](../interfaces/Task.md)<`R`\>

task resolving to specified value

#### Defined in

[task.ts:255](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L255)

___

### sequence

▸ **sequence**<`T`\>(`taskFunctions`): [`Task`](../interfaces/Task.md)<`T`[]\>

Start multiple tasks one after another

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `taskFunctions` | `Iterable`<[`TaskFunction`](../modules.md#taskfunction)<[], `T`\>\> | list of task functions (without arguments) |

#### Returns

[`Task`](../interfaces/Task.md)<`T`[]\>

composite task invoring every task in order and resolving to the list of results

#### Defined in

[task.ts:534](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L534)

___

### timeout

▸ **timeout**(`delay`): [`Task`](../interfaces/Task.md)<`void`\>

Generic timeout task

Usefull for creating delays in task chains or implementing limiting tasks

**`example`**
```typescript
const delayedValueTask = <T>(value: T, delay: number) => Task.timeout(delay).map(() => value);
// ... //
const value = yield* delayedValueTask(42, 1000).generator();

console.log("It's past 1 second and here's a value:", value)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delay` | `number` | duration in ms after that the task resolves to void |

#### Returns

[`Task`](../interfaces/Task.md)<`void`\>

task resolving to void (undefined) after specified delay

#### Defined in

[task.ts:485](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L485)

___

### timeoutGenerator

▸ **timeoutGenerator**(`delay`): [`TaskGenerator`](../modules.md#taskgenerator)<`unknown`, [`Task`](../interfaces/Task.md)<`void`\>, `void`\>

Convinience shortcut for yielding timers

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

[`TaskGenerator`](../modules.md#taskgenerator)<`unknown`, [`Task`](../interfaces/Task.md)<`void`\>, `void`\>

generator to be be used with yield*

#### Defined in

[task.ts:374](https://github.com/lammonaaf/t-tasks/blob/69289b9/src/task.ts#L374)
