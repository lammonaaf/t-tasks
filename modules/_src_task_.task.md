[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task"](_src_task_.md) › [Task](_src_task_.task.md)

# Namespace: Task ‹**R**›

Task monad interface

## Type parameters

▪ **R**

task resolve type

## Index

### Properties

* [cancel](_src_task_.task.md#cancel)
* [generator](_src_task_.task.md#generator)
* [reject](_src_task_.task.md#reject)
* [resolve](_src_task_.task.md#resolve)

### Functions

* [all](_src_task_.task.md#all)
* [any](_src_task_.task.md#any)
* [canceled](_src_task_.task.md#canceled)
* [create](_src_task_.task.md#create)
* [fromPromise](_src_task_.task.md#frompromise)
* [generate](_src_task_.task.md#generate)
* [lift](_src_task_.task.md#lift)
* [limit](_src_task_.task.md#limit)
* [promiseGenerator](_src_task_.task.md#promisegenerator)
* [rejected](_src_task_.task.md#rejected)
* [repeat](_src_task_.task.md#repeat)
* [resolved](_src_task_.task.md#resolved)
* [sequence](_src_task_.task.md#sequence)
* [timeout](_src_task_.task.md#timeout)

### Methods

* [chain](_src_task_.task.md#chain)
* [chainCanceled](_src_task_.task.md#chaincanceled)
* [chainRejected](_src_task_.task.md#chainrejected)
* [map](_src_task_.task.md#map)
* [mapCanceled](_src_task_.task.md#mapcanceled)
* [mapRejected](_src_task_.task.md#maprejected)
* [matchChain](_src_task_.task.md#matchchain)
* [matchMap](_src_task_.task.md#matchmap)
* [matchTap](_src_task_.task.md#matchtap)
* [tap](_src_task_.task.md#tap)
* [tapCanceled](_src_task_.task.md#tapcanceled)
* [tapRejected](_src_task_.task.md#taprejected)

## Properties

###  cancel

• **cancel**: *function*

*Defined in [src/task.ts:191](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L191)*

Invoke underlying canel method without error

#### Type declaration:

▸ (): *void*

___

###  generator

• **generator**: *[TaskGeneratorFunction](_src_task_.md#taskgeneratorfunction)‹[], unknown, [Task](_src_task_.task.md)‹R›, R›*

*Defined in [src/task.ts:230](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L230)*

Wrap task to singleton generator

Userful in order to avoid ambiguous yied types

**`returns`** generator of task wrapping the task

**`example`** 
```typescript
const getString = () => Task.resolved('hello');
const getLength = (data: string) => Task.resolved(data.length);

// ..... //

Task.generate(function* () {
  const data = yield getString(); // data: string | number
  const length = yield getLength(data); // length: string | number

  return length;
});

// ..... //

Task.generate(function* () {
  const data = yield* getString().generator(); // data: string
  const length = yield* getLength(data).generator(); // length: number

  return length;
});
```

___

###  reject

• **reject**: *function*

*Defined in [src/task.ts:198](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L198)*

Invoke underlying canel method with error

**`param`** error value to be injected from outside

#### Type declaration:

▸ (`error`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

___

###  resolve

• **resolve**: *function*

*Defined in [src/task.ts:186](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L186)*

Return underlying promise in order to await result

**`returns`** underlying promise

#### Type declaration:

▸ (): *TaskInvoke‹R›*

## Functions

###  all

▸ **all**‹**T**›(`tasks`: Iterable‹[Task](_src_task_.task.md)‹T››): *[Task](_src_task_.task.md)‹T[]›*

*Defined in [src/task.ts:461](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L461)*

Execute all tasks in parallel and return list of results

Resulting task resolves when all tasks are resolved, returning list of tasks results maintaining result order
In case of failure (external or internal) resulting task is immediately immediately rejected with that error and all pending tasks are canceled
In case of cancelation resulting task is immediately immediately canceled together with all pending tasks

**`note`** direct equivalent of Promise.all

**`retuirns`** task resolving to the list of results

**Type parameters:**

▪ **T**

underlying task type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tasks` | Iterable‹[Task](_src_task_.task.md)‹T›› | iterable of tasks to execute |

**Returns:** *[Task](_src_task_.task.md)‹T[]›*

___

###  any

▸ **any**‹**T**›(`tasks`: Iterable‹[Task](_src_task_.task.md)‹T››): *[Task](_src_task_.task.md)‹T›*

*Defined in [src/task.ts:512](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L512)*

Execute all tasks in parallel and return the result of the first successful one

Resulting task resolves when the first tasks is successfuly resolved, returning it's result
In case of external task rejecttion all tasks are rejected with that error and resulting task is rejected with an array of errors
In case of internal task rejection the execution is continued untill fthe first task resolves succesfully or all the tasks are rejected this way resulting task is rejected with an array of errors
In case of cancelation resulting task is immediately immediately canceled together with all pending tasks

**`note`** direct equivalent of Promise.any

**`retuirns`** task resolving to the result of first successfull task

**Type parameters:**

▪ **T**

underlying task type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tasks` | Iterable‹[Task](_src_task_.task.md)‹T›› | iterable of tasks to execute |

**Returns:** *[Task](_src_task_.task.md)‹T›*

___

###  canceled

▸ **canceled**‹**R**›(): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:276](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L276)*

Invariant task constructor creating canceled task

**Type parameters:**

▪ **R**

returned task's resolve type

**Returns:** *[Task](_src_task_.task.md)‹R›*

task resolving to specified value

___

###  create

▸ **create**‹**R**›(`invoke`: TaskInvoke‹R›, `cancel`: TaskCancel): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:244](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L244)*

Custom task monad constructor

**`note`** low-level primitive for creating custom tasks, not intended for general use

**Type parameters:**

▪ **R**

returned task's resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`invoke` | TaskInvoke‹R› | promise defining task execution |
`cancel` | TaskCancel | cancelation function |

**Returns:** *[Task](_src_task_.task.md)‹R›*

task resolving to resolve value of invoke

___

###  fromPromise

▸ **fromPromise**‹**R**›(`promise`: PromiseLike‹R›): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:296](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L296)*

Lift from promise to task resolving to that promise result

Userfull for converting promises to tasks
If converted task is canceled or failed externally return value will be ignored without side-effects
All tasks are no-trowing by default, any occured errors are returned as Left<any>

**`example`** 
```typescript
const task = Task.fromPromise(someAsyncOperation('someData')).map((result) => result.length);
```

**Type parameters:**

▪ **R**

returned task resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promise` | PromiseLike‹R› | promise to be resolved |

**Returns:** *[Task](_src_task_.task.md)‹R›*

task resolving to specified promise value

___

###  generate

▸ **generate**‹**T**, **TT**, **R**›(`taskGeneratorFunction`: [TaskGeneratorFunction](_src_task_.md#taskgeneratorfunction)‹[], T, TT, R›): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:380](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L380)*

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

**Type parameters:**

▪ **T**

▪ **TT**: *[Task](_src_task_.task.md)‹T›*

yielded task type

▪ **R**

returned task resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`taskGeneratorFunction` | [TaskGeneratorFunction](_src_task_.md#taskgeneratorfunction)‹[], T, TT, R› | task generator function |

**Returns:** *[Task](_src_task_.task.md)‹R›*

task resolving to generator's return type

___

###  lift

▸ **lift**‹**A**, **R**›(`promiseFunction`: function): *[TaskFunction](_src_task_.md#taskfunction)‹A, R›*

*Defined in [src/task.ts:343](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L343)*

Lift from function returning value/promise to function returning task resolving to that value

Userfull for converting exising async functions to task functions for further use

**`see`** Task.fromPromise

**`example`** 
```typescript
const taskFunction = liftPromiseFunction(someAsyncOperation);

const task = taskFunction('someData').map((result) => result.length);
```

**Type parameters:**

▪ **A**: *unknown[]*

returned function's argument types

▪ **R**

returned function's result task's resolve type

**Parameters:**

▪ **promiseFunction**: *function*

function returning promise or plain value to be resolved

▸ (...`args`: A): *PromiseLike‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

**Returns:** *[TaskFunction](_src_task_.md#taskfunction)‹A, R›*

task function wrapping specified promise function

___

###  limit

▸ **limit**‹**T**›(`task`: [Task](_src_task_.task.md)‹T›, `limitTask`: [Task](_src_task_.task.md)‹void›): *[Task](_src_task_.task.md)‹T›*

*Defined in [src/task.ts:559](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L559)*

Limit task execution based on another task

If the second task resolves sooner than the first, resulting task is canceled
Otherwise the resulting task resolves together with the first one

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`task` | [Task](_src_task_.task.md)‹T› | task to limit |
`limitTask` | [Task](_src_task_.task.md)‹void› | limiting task |

**Returns:** *[Task](_src_task_.task.md)‹T›*

task limites according to limitTask

___

###  promiseGenerator

▸ **promiseGenerator**‹**R**›(`promise`: PromiseLike‹R›): *Generator‹[Task](_src_task_.task.md)‹R›, R, unknown›*

*Defined in [src/task.ts:321](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L321)*

Convinience shortcut for yielding async functions as tasks

**Type parameters:**

▪ **R**

returned generator resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promise` | PromiseLike‹R› | promise to be resolved |

**Returns:** *Generator‹[Task](_src_task_.task.md)‹R›, R, unknown›*

generator to be be used with yield*

___

###  rejected

▸ **rejected**‹**R**›(`error`: any): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:266](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L266)*

Invariant task constructor creating rejected task from error value

**Type parameters:**

▪ **R**

returned task's resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | any | error to be returned upon awaiting |

**Returns:** *[Task](_src_task_.task.md)‹R›*

task resolving to specified value

___

###  repeat

▸ **repeat**‹**T**›(`taskFunction`: [TaskFunction](_src_task_.md#taskfunction)‹[], T›): *[Task](_src_task_.task.md)‹T›*

*Defined in [src/task.ts:571](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L571)*

Repeat task untill successful

Given task is re-generated in case of failure (both external and internal)
Resulting task is still cancelable by standard means

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`taskFunction` | [TaskFunction](_src_task_.md#taskfunction)‹[], T› | task preoducing function  |

**Returns:** *[Task](_src_task_.task.md)‹T›*

___

###  resolved

▸ **resolved**‹**R**›(`value`: R): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:255](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L255)*

Invariant task constructor creating resolved task from plain value

**Type parameters:**

▪ **R**

returned task's resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | value to be returned upon awaiting |

**Returns:** *[Task](_src_task_.task.md)‹R›*

task resolving to specified value

___

###  sequence

▸ **sequence**‹**T**›(`taskFunctions`: Iterable‹[TaskFunction](_src_task_.md#taskfunction)‹[], T››): *[Task](_src_task_.task.md)‹T[]›*

*Defined in [src/task.ts:440](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L440)*

Start multiple tasks one after another

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`taskFunctions` | Iterable‹[TaskFunction](_src_task_.md#taskfunction)‹[], T›› | list of task functions (without arguments) |

**Returns:** *[Task](_src_task_.task.md)‹T[]›*

composite task invoring every task in order and resolving to the list of results

___

###  timeout

▸ **timeout**(`delay`: number): *[Task](_src_task_.task.md)‹void›*

*Defined in [src/task.ts:413](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L413)*

Generic timeout task

Userfull for creating delays in task chains or implementing limiting tasks

**`example`** 
```typescript
const delayedValueTask = <T>(value: T, delay: number) => Task.timeout(delay).map(() => value);
// ... //
const value = yield* delayedValueTask(42, 1000).generator();

console.log("It's past 1 second and here's a value:", value)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`delay` | number | duration in ms after that the task resolves to void |

**Returns:** *[Task](_src_task_.task.md)‹void›*

task resolving to void (undefined) after specified delay

## Methods

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:148](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L148)*

Invoke transformer when task is resolved (and only then) and continue execution with it's result

**Type parameters:**

▪ **R2**

transformer task resolve type

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (`value`: R): *[Task](_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](_src_task_.task.md)‹R2›*

task chaining to transformer result task

___

###  chainCanceled

▸ **chainCanceled**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:166](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L166)*

Invoke transformer when task is canceled (and only then) and continue execution with it's result

**Type parameters:**

▪ **R2**

fallback task resolve type

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (): *[Task](_src_task_.task.md)‹R2›*

**Returns:** *[Task](_src_task_.task.md)‹R | R2›*

task chaining to fallback task in case of cancelation

___

###  chainRejected

▸ **chainRejected**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:157](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L157)*

Invoke transformer when task is rejected (and only then) and continue execution with it's result

**Type parameters:**

▪ **R2**

fallback task resolve type

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (`error`: any): *[Task](_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](_src_task_.task.md)‹R | R2›*

task chaining to fallback task in case of failure

___

###  map

▸ **map**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:108](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L108)*

Invoke transformer when task is resolved (and only then) and return it's result instead

**Type parameters:**

▪ **R2**

transformer return type

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](_src_task_.task.md)‹R2›*

task returning transformer result

___

###  mapCanceled

▸ **mapCanceled**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:126](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L126)*

Invoke transformer when task is canceled (and only then) and return it's result instead

**Type parameters:**

▪ **R2**

fallback return type

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (): *R2*

**Returns:** *[Task](_src_task_.task.md)‹R | R2›*

task returning fallback result in case of cancelation

___

###  mapRejected

▸ **mapRejected**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:117](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L117)*

Invoke transformer when task is rejected (and only then) and return it's result instead

**Type parameters:**

▪ **R2**

fallback return type

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (`error`: any): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](_src_task_.task.md)‹R | R2›*

task returning fallback result in case of failure

___

###  matchChain

▸ **matchChain**‹**R2**, **R3**, **R4**›(`op`: object): *[Task](_src_task_.task.md)‹R2 | R3 | R4›*

*Defined in [src/task.ts:179](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L179)*

Invoke a dedicated transformer according to task resolution and continue execution with it's result

**Type parameters:**

▪ **R2**

success transformer resolve type

▪ **R3**

failure transformer resolve type

▪ **R4**

cancelation transformer resolve type

**Parameters:**

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`canceled` | function | transformer to invoke on cancelation |
`rejected` | function | transformer to invoke on failure |
`resolved` | function | transformer to invoke on success |

**Returns:** *[Task](_src_task_.task.md)‹R2 | R3 | R4›*

task chaining to a corresponding transformer result

___

###  matchMap

▸ **matchMap**‹**R2**, **R3**, **R4**›(`op`: object): *[Task](_src_task_.task.md)‹R2 | R3 | R4›*

*Defined in [src/task.ts:139](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L139)*

Invoke a dedicated transformer according to task resolution

**Type parameters:**

▪ **R2**

success transformer return type

▪ **R3**

failure transformer return type

▪ **R4**

cancelation transformer return type

**Parameters:**

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`canceled` | function | transformer to invoke on cancelation |
`rejected` | function | transformer to invoke on failure |
`resolved` | function | transformer to invoke on success |

**Returns:** *[Task](_src_task_.task.md)‹R2 | R3 | R4›*

task resolving to a corresponding transformer result

___

###  matchTap

▸ **matchTap**(`op`: object): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:99](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L99)*

Invoke a dedicated callback according to task resolution

**Parameters:**

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`canceled` | function | callback to invoke on cancelation |
`rejected` | function | callback to invoke on failure |
`resolved` | function | callback to invoke on success |

**Returns:** *[Task](_src_task_.task.md)‹R›*

self

___

###  tap

▸ **tap**(`op`: function): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:73](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L73)*

Invoke callback when task is resolved (and only then)

**Parameters:**

▪ **op**: *function*

callback to invoke

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](_src_task_.task.md)‹R›*

self

___

###  tapCanceled

▸ **tapCanceled**(`op`: function): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:89](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L89)*

Invoke callback when task is canceled (and only then)

**Parameters:**

▪ **op**: *function*

callback to invoke

▸ (): *void*

**Returns:** *[Task](_src_task_.task.md)‹R›*

self

___

###  tapRejected

▸ **tapRejected**(`op`: function): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:81](https://github.com/lammonaaf/t-tasks/blob/4fd4047/src/task.ts#L81)*

Invoke callback when task is rejected (and only then)

**Parameters:**

▪ **op**: *function*

callback to invoke

▸ (`error`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](_src_task_.task.md)‹R›*

self
