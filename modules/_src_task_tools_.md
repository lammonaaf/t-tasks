[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task-tools"](_src_task_tools_.md)

# Module: "src/task-tools"

## Index

### Type aliases

* [PromiseFunction](_src_task_tools_.md#promisefunction)
* [PromiseFunctionType](_src_task_tools_.md#promisefunctiontype)
* [PromiseType](_src_task_tools_.md#promisetype)
* [TaskFunction](_src_task_tools_.md#taskfunction)
* [TaskFunctionType](_src_task_tools_.md#taskfunctiontype)
* [TaskGenerator](_src_task_tools_.md#taskgenerator)
* [TaskGeneratorFunction](_src_task_tools_.md#taskgeneratorfunction)
* [TaskType](_src_task_tools_.md#tasktype)

### Functions

* [cast](_src_task_tools_.md#cast)
* [castPromise](_src_task_tools_.md#castpromise)
* [castPromiseFunction](_src_task_tools_.md#castpromisefunction)
* [castTask](_src_task_tools_.md#casttask)
* [castTaskFunction](_src_task_tools_.md#casttaskfunction)
* [generateTask](_src_task_tools_.md#generatetask)
* [liftPromise](_src_task_tools_.md#liftpromise)
* [liftPromiseFunction](_src_task_tools_.md#liftpromisefunction)
* [limitTask](_src_task_tools_.md#limittask)
* [parallelTask](_src_task_tools_.md#paralleltask)
* [repeatTask](_src_task_tools_.md#repeattask)
* [sequenceTask](_src_task_tools_.md#sequencetask)
* [timeoutTask](_src_task_tools_.md#timeouttask)

## Type aliases

###  PromiseFunction

Ƭ **PromiseFunction**: *function*

*Defined in [src/task-tools.ts:11](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L11)*

Function returning Promise (async function)

#### Type declaration:

▸ (...`args`: A): *PromiseLike‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

___

###  PromiseFunctionType

Ƭ **PromiseFunctionType**: *[PromiseType](_src_task_tools_.md#promisetype)‹ReturnType‹TT››*

*Defined in [src/task-tools.ts:40](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L40)*

Resolve type of a promise returned by function

___

###  PromiseType

Ƭ **PromiseType**: *TT extends PromiseLike<infer U> ? U : never*

*Defined in [src/task-tools.ts:26](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L26)*

Resolve type of a promise

___

###  TaskFunction

Ƭ **TaskFunction**: *function*

*Defined in [src/task-tools.ts:19](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L19)*

Function returning Task

#### Type declaration:

▸ (...`args`: A): *[Task](../interfaces/_src_task_.task.md)‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

___

###  TaskFunctionType

Ƭ **TaskFunctionType**: *[TaskType](_src_task_tools_.md#tasktype)‹ReturnType‹TT››*

*Defined in [src/task-tools.ts:47](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L47)*

Resolve type of a task returned by function

___

###  TaskGenerator

Ƭ **TaskGenerator**: *Generator‹TT, R, [TaskType](_src_task_tools_.md#tasktype)‹TT››*

*Defined in [src/task-tools.ts:64](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L64)*

Task generator

**`example`** 
```typescript
const generatorFunction = function*(): TaskGenerator<Task<string>, number> {
  const v = cast<string>(yield someTaskFunction());

  return v.length;
};
```

___

###  TaskGeneratorFunction

Ƭ **TaskGeneratorFunction**: *function*

*Defined in [src/task-tools.ts:82](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L82)*

Function returning task generator (generator function)

**`example`** 
```typescript
const generatorFunction: TaskGeneratorFunction<[], Task<string>, number> = function*() {
  const v = cast<string>(yield someTaskFunction());

  return v.length;
};
```

#### Type declaration:

▸ (...`args`: A): *[TaskGenerator](_src_task_tools_.md#taskgenerator)‹TT, R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

___

###  TaskType

Ƭ **TaskType**: *PromiseType<TT["_invoke"]> extends Cancelable<infer U> ? U : never*

*Defined in [src/task-tools.ts:33](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L33)*

Resolve type of a task

## Functions

###  cast

▸ **cast**‹**T**, **R**›(`arg`: R): *T*

*Defined in [src/task-tools.ts:261](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L261)*

Cast helper (with plain type specified)

Useful when an exact type of the expression is short and well-known

**`example`** 
```typescript
const result = cast<string>(yield someTaskFunction());
```

**Type parameters:**

▪ **T**

target type

▪ **R**: *T*

source type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of compatible type |

**Returns:** *T*

arg casted to the specified type

___

###  castPromise

▸ **castPromise**‹**TT**, **R**›(`arg`: R): *[PromiseType](_src_task_tools_.md#promisetype)‹TT›*

*Defined in [src/task-tools.ts:282](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L282)*

Cast helper (with promise type specified)

Useful with ```typeof``` when promise is provided

**`example`** 
```typescript
const promise = somePromiseFunction();
// ... //
const result = castPromise<typeof promise>(yield liftPromise(promise));
```

**Type parameters:**

▪ **TT**: *PromiseLike‹any›*

target promise type

▪ **R**: *[PromiseType](_src_task_tools_.md#promisetype)‹TT›*

source type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of compatible type |

**Returns:** *[PromiseType](_src_task_tools_.md#promisetype)‹TT›*

arg casted to the specified promise's resolve type

___

###  castPromiseFunction

▸ **castPromiseFunction**‹**TT**, **R**›(`arg`: R): *[PromiseFunctionType](_src_task_tools_.md#promisefunctiontype)‹TT›*

*Defined in [src/task-tools.ts:324](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L324)*

Cast helper (with promise function type specified)

Useful with ```typeof``` when an async function is lifted to task in-place

**`example`** 
```typescript
const result = castPromiseFunction<typeof somePromiseFunction>(
  yield liftPromise(somePromiseFunction()),
);
```

**Type parameters:**

▪ **TT**: *[PromiseFunction](_src_task_tools_.md#promisefunction)‹any[], any›*

type of promise function resolving to target type

▪ **R**: *[PromiseFunctionType](_src_task_tools_.md#promisefunctiontype)‹TT›*

source type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of compatible type |

**Returns:** *[PromiseFunctionType](_src_task_tools_.md#promisefunctiontype)‹TT›*

arg casted to the return type of specified function's returned promise

___

###  castTask

▸ **castTask**‹**TT**, **R**›(`arg`: R): *[TaskType](_src_task_tools_.md#tasktype)‹TT›*

*Defined in [src/task-tools.ts:303](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L303)*

Cast helper (with task type specified)

Useful with ```typeof``` when task is provided

**`example`** 
```typescript
const task = someTaskFunction();
// ... //
const result = castTask<typeof task>(yield task);
```

**Type parameters:**

▪ **TT**: *[Task](../interfaces/_src_task_.task.md)‹any›*

target task type

▪ **R**: *[TaskType](_src_task_tools_.md#tasktype)‹TT›*

source type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of compatible type |

**Returns:** *[TaskType](_src_task_tools_.md#tasktype)‹TT›*

arg casted to the specified task's resolve type

___

###  castTaskFunction

▸ **castTaskFunction**‹**TT**, **R**›(`arg`: R): *[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›*

*Defined in [src/task-tools.ts:349](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L349)*

Cast helper (with task function type specified)

Useful with ```typeof``` when an task function is used

**`example`** 
```typescript
const someTaskFunction = liftPromsieFunction(somePromiseFunction);
// ... //
const result = castTaskFunction<typeof someTaskFunction>(
  yield someTaskFunction(),
);
```

**Type parameters:**

▪ **TT**: *[TaskFunction](_src_task_tools_.md#taskfunction)‹any[], any›*

type of task function resolving to target type

▪ **R**: *[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›*

source type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of some compatible type |

**Returns:** *[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›*

arg casted to the reoslve type of specified function's returned task

___

###  generateTask

▸ **generateTask**‹**TT**, **R**›(`taskGeneratorFunction`: [TaskGeneratorFunction](_src_task_tools_.md#taskgeneratorfunction)‹[], TT, R›): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task-tools.ts:183](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L183)*

Create compound task from generator function

Applying yield to task within the generator function awaits task and returns underlying value in case of success

In case of failure an error is thrown and may be caught by try-catch

If error is not caught the task is interrupted and returns 'just left error' immediately. In case of cancelation the task is interrupted and returns 'nothing' immediately

**`note`** compound task execution is interrupted only at yield statements, so despite returning immediately any promise-based chains would continue running until the first yield

**`note`** due to type unpredictability you HAVE to cast yield result to avoid werid type issues. Some helper functions for casting are provided

**`example`** 
```typescript
const task = generateTask(function*() {
  try {
    const value1 = castPromise<string>(yield delayedValueTask('data', 400));

    const value2 = castPromise<number>(yield delayedValueTask(value1.length, 300));

    return value2;
  } catch (e) {
    return -1;
  }
});
```

**Type parameters:**

▪ **TT**: *[Task](../interfaces/_src_task_.task.md)‹any›*

yielded task type

▪ **R**

returned task resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`taskGeneratorFunction` | [TaskGeneratorFunction](_src_task_tools_.md#taskgeneratorfunction)‹[], TT, R› | task generator function |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

task resolving to generator's return type

___

###  liftPromise

▸ **liftPromise**‹**R**›(`promise`: PromiseLike‹R›): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task-tools.ts:100](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L100)*

Lift from promise to task resolving to that promise result

Userfull for converting promises to tasks
If converted task is canceled or failed externally return value will be ignored without side-effects
All tasks are no-trowing by default, any occured errors are returned as Left<any>

**`example`** 
```typescript
const task = liftTask(someAsyncOperation('someData')).fmap((result) => result.length);
```

**Type parameters:**

▪ **R**

returned task resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promise` | PromiseLike‹R› | promise to be resolved |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

task resolving to specified promise value

___

###  liftPromiseFunction

▸ **liftPromiseFunction**‹**A**, **R**›(`promiseFunction`: [PromiseFunction](_src_task_tools_.md#promisefunction)‹A, R›): *[TaskFunction](_src_task_tools_.md#taskfunction)‹A, R›*

*Defined in [src/task-tools.ts:147](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L147)*

Lift from function returning value/promise to function returning task resolving to that value

Userfull for converting exising async functions to task functions for further use

**`see`** liftTask

**`example`** 
```typescript
const taskFunction = liftPromiseFunction(someAsyncOperation);

const task = taskFunction('someData').fmap((result) => result.length);
```

**Type parameters:**

▪ **A**: *any[]*

returned function's argument types

▪ **R**

returned function's result task's resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promiseFunction` | [PromiseFunction](_src_task_tools_.md#promisefunction)‹A, R› | function returning promise or plain value to be resolved |

**Returns:** *[TaskFunction](_src_task_tools_.md#taskfunction)‹A, R›*

task function wrapping specified promise function

___

###  limitTask

▸ **limitTask**‹**T**›(`task`: [Task](../interfaces/_src_task_.task.md)‹T›, `limit`: [Task](../interfaces/_src_task_.task.md)‹void›): *[Task](../interfaces/_src_task_.task.md)‹T›*

*Defined in [src/task-tools.ts:430](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L430)*

Under construction

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`task` | [Task](../interfaces/_src_task_.task.md)‹T› |
`limit` | [Task](../interfaces/_src_task_.task.md)‹void› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹T›*

___

###  parallelTask

▸ **parallelTask**‹**TT**›(`taskFunctions`: TT[]): *[Task](../interfaces/_src_task_.task.md)‹[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›[]›*

*Defined in [src/task-tools.ts:371](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L371)*

Under construction

**Type parameters:**

▪ **TT**: *[TaskFunction](_src_task_tools_.md#taskfunction)‹[], any›*

**Parameters:**

Name | Type |
------ | ------ |
`taskFunctions` | TT[] |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›[]›*

___

###  repeatTask

▸ **repeatTask**‹**T**›(`taskFunction`: [TaskFunction](_src_task_tools_.md#taskfunction)‹[], T›, `repeatFunction`: [TaskFunction](_src_task_tools_.md#taskfunction)‹[], void›): *[Task](../interfaces/_src_task_.task.md)‹T›*

*Defined in [src/task-tools.ts:443](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L443)*

Under construction

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`taskFunction` | [TaskFunction](_src_task_tools_.md#taskfunction)‹[], T› |
`repeatFunction` | [TaskFunction](_src_task_tools_.md#taskfunction)‹[], void› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹T›*

___

###  sequenceTask

▸ **sequenceTask**‹**TT**›(`taskFunctions`: TT[]): *[Task](../interfaces/_src_task_.task.md)‹[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›[]›*

*Defined in [src/task-tools.ts:360](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L360)*

Chain multiple tasks one after another

**Type parameters:**

▪ **TT**: *[TaskFunction](_src_task_tools_.md#taskfunction)‹[], any›*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`taskFunctions` | TT[] | list of task functions (without arguments) |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›[]›*

composite task invoring every task in order and resolving to the list of results

___

###  timeoutTask

▸ **timeoutTask**(`delay`: number): *[Task](../interfaces/_src_task_.task.md)‹void›*

*Defined in [src/task-tools.ts:216](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task-tools.ts#L216)*

Generic timeout task

Userfull for creating delays in task chains or implementing limiting tasks

**`example`** 
```typescript
const delayedValueTask = <T>(value: T, delay: number) => timeoutTask(delay).fmap(() => value);
// ... //
const value = castPromise<number>(yield delayedValueTask(42, 1000));

console.log("It's past 1 second and here's a value:", value)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`delay` | number | duration in ms after that the task resolves to void |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹void›*

task resolving to void (undefined) after specified delay
