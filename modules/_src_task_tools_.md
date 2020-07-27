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

*Defined in [src/task-tools.ts:5](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L5)*

#### Type declaration:

▸ (...`args`: A): *PromiseLike‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

___

###  PromiseFunctionType

Ƭ **PromiseFunctionType**: *[PromiseType](_src_task_tools_.md#promisetype)‹ReturnType‹TT››*

*Defined in [src/task-tools.ts:11](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L11)*

___

###  PromiseType

Ƭ **PromiseType**: *T extends PromiseLike<infer U> ? U : never*

*Defined in [src/task-tools.ts:8](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L8)*

___

###  TaskFunction

Ƭ **TaskFunction**: *function*

*Defined in [src/task-tools.ts:6](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L6)*

#### Type declaration:

▸ (...`args`: A): *[Task](../interfaces/_src_task_.task.md)‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

___

###  TaskFunctionType

Ƭ **TaskFunctionType**: *[TaskType](_src_task_tools_.md#tasktype)‹ReturnType‹TT››*

*Defined in [src/task-tools.ts:12](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L12)*

___

###  TaskGenerator

Ƭ **TaskGenerator**: *function*

*Defined in [src/task-tools.ts:14](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L14)*

#### Type declaration:

▸ (...`args`: A): *Generator‹TT, R, [TaskType](_src_task_tools_.md#tasktype)‹TT››*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

___

###  TaskType

Ƭ **TaskType**: *PromiseType<TT["_invoke"]> extends Cancelable<infer U> ? U : never*

*Defined in [src/task-tools.ts:9](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L9)*

## Functions

###  cast

▸ **cast**‹**T**, **R**›(`arg`: R): *T*

*Defined in [src/task-tools.ts:123](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L123)*

**Type parameters:**

▪ **T**

▪ **R**: *T*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | R |

**Returns:** *T*

___

###  castPromise

▸ **castPromise**‹**TT**, **R**›(`arg`: R): *[PromiseType](_src_task_tools_.md#promisetype)‹TT›*

*Defined in [src/task-tools.ts:132](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L132)*

Cast helper

**Type parameters:**

▪ **TT**: *PromiseLike‹any›*

▪ **R**: *[PromiseType](_src_task_tools_.md#promisetype)‹TT›*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of some compatible type |

**Returns:** *[PromiseType](_src_task_tools_.md#promisetype)‹TT›*

arg casted to the type of specified promise or plain value type

___

###  castPromiseFunction

▸ **castPromiseFunction**‹**TT**, **R**›(`arg`: R): *[PromiseFunctionType](_src_task_tools_.md#promisefunctiontype)‹TT›*

*Defined in [src/task-tools.ts:150](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L150)*

Cast helper

**Type parameters:**

▪ **TT**: *[PromiseFunction](_src_task_tools_.md#promisefunction)‹any[], any›*

▪ **R**: *[PromiseFunctionType](_src_task_tools_.md#promisefunctiontype)‹TT›*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of some compatible type |

**Returns:** *[PromiseFunctionType](_src_task_tools_.md#promisefunctiontype)‹TT›*

arg casted to the return type of specified function returning promise or plain value

___

###  castTask

▸ **castTask**‹**TT**, **R**›(`arg`: R): *[TaskType](_src_task_tools_.md#tasktype)‹TT›*

*Defined in [src/task-tools.ts:141](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L141)*

Cast helper

**Type parameters:**

▪ **TT**: *[Task](../interfaces/_src_task_.task.md)‹any›*

▪ **R**: *[TaskType](_src_task_tools_.md#tasktype)‹TT›*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of some compatible type |

**Returns:** *[TaskType](_src_task_tools_.md#tasktype)‹TT›*

arg casted to the reoslve type of specified task type

___

###  castTaskFunction

▸ **castTaskFunction**‹**TT**, **R**›(`arg`: R): *[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›*

*Defined in [src/task-tools.ts:161](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L161)*

Cast helper

**Type parameters:**

▪ **TT**: *[TaskFunction](_src_task_tools_.md#taskfunction)‹any[], any›*

▪ **R**: *[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | R | plain value of some compatible type |

**Returns:** *[TaskFunctionType](_src_task_tools_.md#taskfunctiontype)‹TT›*

arg casted to the reoslve type of specified function returning task

___

###  generateTask

▸ **generateTask**‹**TT**, **R**›(`taskGenerator`: [TaskGenerator](_src_task_tools_.md#taskgenerator)‹[], TT, R›): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task-tools.ts:109](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L109)*

Create compound task from generator function

**`note`** compound task execution is interrupted only at yield statements, so despite returning immediately any promise-based chains would continue running until the first yield

**`note`** due to type unpredictability you HAVE to cast yield result to avoid werid type issues. Some helper functions for casting are provided

**`example`** 
```typescript
const task = generateTask(async function*() {
  try {
    const source = await getData();

    const value1 = castPromise<string>(yield delayedValueTask(source, 400));

    const value2 = castPromise<number>(yield delayedValueTask(value1.length, 300));

    return value2;
  } catch (e) {
    return -1;
  }
});
```

**Type parameters:**

▪ **TT**: *[Task](../interfaces/_src_task_.task.md)‹any›*

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`taskGenerator` | [TaskGenerator](_src_task_tools_.md#taskgenerator)‹[], TT, R› | (optionally async) generator function  Applying yield to task within the generator function awaits task and returns underlying value in case of success  In case of failure an error is thrown and may be caught by try-catch  If error is not caught the task is interrupted and returns 'just left error' immediately. In case of cancelation the task is interrupted and returns 'nothing' immediately  |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  liftPromise

▸ **liftPromise**‹**R**›(`promise`: PromiseLike‹R›): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task-tools.ts:29](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L29)*

Lift from plain value/promise to task resolving to that value

**`example`** 
```typescript
const task = liftTask(someAsyncOperation('someData')).fmap((result) => result.length);
```

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promise` | PromiseLike‹R› | promise or plain value to be resolved  Userfull for converting promises to tasks If converted task is canceled or failed externally return value will be ignored without side-effects All tasks are no-trowing by default, any occured errors are returned as Either:Left  |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  liftPromiseFunction

▸ **liftPromiseFunction**‹**A**, **R**›(`promiseFunction`: [PromiseFunction](_src_task_tools_.md#promisefunction)‹A, R›): *[TaskFunction](_src_task_tools_.md#taskfunction)‹A, R›*

*Defined in [src/task-tools.ts:75](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L75)*

Lift from function returning value/promise to function returning task resolving to that value

**`see`** liftTask

**`example`** 
```typescript
const taskFunction = liftPromiseFunction(someAsyncOperation);

const task = taskFunction('someData').fmap((result) => result.length);
```

**Type parameters:**

▪ **A**: *any[]*

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promiseFunction` | [PromiseFunction](_src_task_tools_.md#promisefunction)‹A, R› | function returning promise or plain value to be resolved  Userfull for converting exising async functions to task functions for further use  |

**Returns:** *[TaskFunction](_src_task_tools_.md#taskfunction)‹A, R›*

___

###  limitTask

▸ **limitTask**‹**T**›(`task`: [Task](../interfaces/_src_task_.task.md)‹T›, `limit`: [Task](../interfaces/_src_task_.task.md)‹void›): *[Task](../interfaces/_src_task_.task.md)‹T›*

*Defined in [src/task-tools.ts:287](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L287)*

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

*Defined in [src/task-tools.ts:183](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L183)*

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

*Defined in [src/task-tools.ts:300](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L300)*

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

*Defined in [src/task-tools.ts:172](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L172)*

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

*Defined in [src/task-tools.ts:254](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task-tools.ts#L254)*

Generic timeout task

**`example`** 
```typescript
const delayedValueTask = <T>(value: T, delay: number) => timeoutTask(delay).fmap(() => value);

const value = castPromise<number>(yield delayedValueTask(42, 1000));

console.log("It's past 1 second and here's a value:", value)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`delay` | number | duration in ms after that the task resolves to void  Userfull for creating delays in task chains or implementing limiting tasks  |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹void›*
