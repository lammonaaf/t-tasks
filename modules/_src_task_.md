[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task"](_src_task_.md)

# Module: "src/task"

## Index

### Classes

* [TaskClass](../classes/_src_task_.taskclass.md)

### Interfaces

* [Task](../interfaces/_src_task_.task.md)
* [TaskBase](../interfaces/_src_task_.taskbase.md)

### Type aliases

* [Cancelable](_src_task_.md#cancelable)
* [Rejectable](_src_task_.md#rejectable)
* [TaskCancel](_src_task_.md#taskcancel)
* [TaskInvoke](_src_task_.md#taskinvoke)

### Functions

* [canceledTask](_src_task_.md#canceledtask)
* [chainTask](_src_task_.md#chaintask)
* [chainTaskCanceled](_src_task_.md#chaintaskcanceled)
* [chainTaskEither](_src_task_.md#chaintaskeither)
* [chainTaskMaybe](_src_task_.md#chaintaskmaybe)
* [chainTaskRejected](_src_task_.md#chaintaskrejected)
* [fmapTask](_src_task_.md#fmaptask)
* [fmapTaskCanceled](_src_task_.md#fmaptaskcanceled)
* [fmapTaskEither](_src_task_.md#fmaptaskeither)
* [fmapTaskMaybe](_src_task_.md#fmaptaskmaybe)
* [fmapTaskRejected](_src_task_.md#fmaptaskrejected)
* [rejectedTask](_src_task_.md#rejectedtask)
* [resolvedTask](_src_task_.md#resolvedtask)
* [tapTask](_src_task_.md#taptask)
* [tapTaskCanceled](_src_task_.md#taptaskcanceled)
* [tapTaskEither](_src_task_.md#taptaskeither)
* [tapTaskMaybe](_src_task_.md#taptaskmaybe)
* [tapTaskRejected](_src_task_.md#taptaskrejected)
* [task](_src_task_.md#const-task)

## Type aliases

###  Cancelable

Ƭ **Cancelable**: *[Maybe](../interfaces/_src_maybe_.maybe.md)‹[Either](../interfaces/_src_either_.either.md)‹R, any››*

*Defined in [src/task.ts:11](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L11)*

Shortcut for underlying task result type

___

###  Rejectable

Ƭ **Rejectable**: *[Either](../interfaces/_src_either_.either.md)‹R, any›*

*Defined in [src/task.ts:7](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L7)*

Shortcut for monadic Either type, where erroneous value is of type any

___

###  TaskCancel

Ƭ **TaskCancel**: *function*

*Defined in [src/task.ts:14](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L14)*

#### Type declaration:

▸ (`error`: [Maybe](../interfaces/_src_maybe_.maybe.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | [Maybe](../interfaces/_src_maybe_.maybe.md)‹any› |

___

###  TaskInvoke

Ƭ **TaskInvoke**: *Promise‹[Cancelable](_src_task_.md#cancelable)‹R››*

*Defined in [src/task.ts:13](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L13)*

## Functions

###  canceledTask

▸ **canceledTask**‹**R**›(): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:123](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L123)*

Invariant task constructor creating canceled task

**Type parameters:**

▪ **R**

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  chainTask

▸ **chainTask**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:213](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L213)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  chainTaskCanceled

▸ **chainTaskCanceled**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:223](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L223)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  chainTaskEither

▸ **chainTaskEither**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:203](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L203)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: [Rejectable](_src_task_.md#rejectable)‹R›): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Rejectable](_src_task_.md#rejectable)‹R› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  chainTaskMaybe

▸ **chainTaskMaybe**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:184](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L184)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: [Cancelable](_src_task_.md#cancelable)‹R›): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Cancelable](_src_task_.md#cancelable)‹R› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  chainTaskRejected

▸ **chainTaskRejected**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:237](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L237)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`error`: any): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  fmapTask

▸ **fmapTask**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:148](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L148)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  fmapTaskCanceled

▸ **fmapTaskCanceled**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:152](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L152)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (): *R2*

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  fmapTaskEither

▸ **fmapTaskEither**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:144](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L144)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: [Rejectable](_src_task_.md#rejectable)‹R›): *[Rejectable](_src_task_.md#rejectable)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Rejectable](_src_task_.md#rejectable)‹R› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  fmapTaskMaybe

▸ **fmapTaskMaybe**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:131](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L131)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: [Cancelable](_src_task_.md#cancelable)‹R›): *[Cancelable](_src_task_.md#cancelable)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Cancelable](_src_task_.md#cancelable)‹R› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  fmapTaskRejected

▸ **fmapTaskRejected**‹**R**, **R2**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:156](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L156)*

**Type parameters:**

▪ **R**

▪ **R2**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`error`: any): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  rejectedTask

▸ **rejectedTask**‹**R**›(`error`: any): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:116](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L116)*

Invariant task constructor creating rejected task from error value

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | any | error to be returned upon awaiting  |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  resolvedTask

▸ **resolvedTask**‹**R**›(`value`: R): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:108](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L108)*

Invariant task constructor creating resolved task from plain value

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | value to be returned upon awaiting  |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  tapTask

▸ **tapTask**‹**R**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:172](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L172)*

**Type parameters:**

▪ **R**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  tapTaskCanceled

▸ **tapTaskCanceled**‹**R**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:176](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L176)*

**Type parameters:**

▪ **R**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (): *void*

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  tapTaskEither

▸ **tapTaskEither**‹**R**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:168](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L168)*

**Type parameters:**

▪ **R**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: [Rejectable](_src_task_.md#rejectable)‹R›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Rejectable](_src_task_.md#rejectable)‹R› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  tapTaskMaybe

▸ **tapTaskMaybe**‹**R**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:160](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L160)*

**Type parameters:**

▪ **R**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`value`: [Cancelable](_src_task_.md#cancelable)‹R›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Cancelable](_src_task_.md#cancelable)‹R› |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  tapTaskRejected

▸ **tapTaskRejected**‹**R**›(`_task`: [TaskBase](../interfaces/_src_task_.taskbase.md)‹R›, `op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:180](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L180)*

**Type parameters:**

▪ **R**

**Parameters:**

▪ **_task**: *[TaskBase](../interfaces/_src_task_.taskbase.md)‹R›*

▪ **op**: *function*

▸ (`error`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

### `Const` task

▸ **task**‹**R**›(`_invoke`: [TaskInvoke](_src_task_.md#taskinvoke)‹R›, `_cancel`: [TaskCancel](_src_task_.md#taskcancel)): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:100](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/task.ts#L100)*

Task monad constructor

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_invoke` | [TaskInvoke](_src_task_.md#taskinvoke)‹R› | promise defining task execution |
`_cancel` | [TaskCancel](_src_task_.md#taskcancel) | cancelation function  If reject object is passed to cancelation function the task is considered to be rejected from outside  |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*
