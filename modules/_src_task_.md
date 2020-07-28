[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task"](_src_task_.md)

# Module: "src/task"

## Index

### Interfaces

* [Task](../interfaces/_src_task_.task.md)

### Type aliases

* [Cancelable](_src_task_.md#cancelable)
* [Rejectable](_src_task_.md#rejectable)

### Functions

* [canceledTask](_src_task_.md#canceledtask)
* [rejectedTask](_src_task_.md#rejectedtask)
* [resolvedTask](_src_task_.md#resolvedtask)
* [task](_src_task_.md#task)

## Type aliases

###  Cancelable

Ƭ **Cancelable**: *[Maybe](_src_maybe_.md#maybe)‹[Either](_src_either_.md#either)‹R, any››*

*Defined in [src/task.ts:16](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L16)*

Shortcut for underlying task result type

___

###  Rejectable

Ƭ **Rejectable**: *[Either](_src_either_.md#either)‹R, any›*

*Defined in [src/task.ts:9](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L9)*

Shortcut for monadic Either type, where erroneous value is of type any

## Functions

###  canceledTask

▸ **canceledTask**‹**R**›(): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:153](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L153)*

Invariant task constructor creating canceled task

**Type parameters:**

▪ **R**

returned task's resolve type

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

task resolving to specified value

___

###  rejectedTask

▸ **rejectedTask**‹**R**›(`error`: any): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:143](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L143)*

Invariant task constructor creating rejected task from error value

**Type parameters:**

▪ **R**

returned task's resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | any | error to be returned upon awaiting |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

task resolving to specified value

___

###  resolvedTask

▸ **resolvedTask**‹**R**›(`value`: R): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:132](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L132)*

Invariant task constructor creating resolved task from plain value

**Type parameters:**

▪ **R**

returned task's resolve type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | value to be returned upon awaiting |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

task resolving to specified value

___

###  task

▸ **task**‹**R**›(`invoke`: TaskInvoke‹R›, `cancel`: TaskCancel): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:121](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L121)*

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

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

task resolving to resolve value of invoke
