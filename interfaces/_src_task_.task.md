[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task"](../modules/_src_task_.md) › [Task](_src_task_.task.md)

# Interface: Task ‹**R**›

Task monad interface

## Type parameters

▪ **R**

task resolve type

## Hierarchy

* TaskBase‹R›

  ↳ **Task**

## Index

### Properties

* [_cancel](_src_task_.task.md#readonly-_cancel)
* [_invoke](_src_task_.task.md#readonly-_invoke)
* [cancel](_src_task_.task.md#cancel)
* [reject](_src_task_.task.md#reject)
* [resolve](_src_task_.task.md#resolve)

### Methods

* [chain](_src_task_.task.md#chain)
* [chainCanceled](_src_task_.task.md#chaincanceled)
* [chainRejected](_src_task_.task.md#chainrejected)
* [fmap](_src_task_.task.md#fmap)
* [fmapCanceled](_src_task_.task.md#fmapcanceled)
* [fmapRejected](_src_task_.task.md#fmaprejected)
* [tap](_src_task_.task.md#tap)
* [tapCanceled](_src_task_.task.md#tapcanceled)
* [tapRejected](_src_task_.task.md#taprejected)

## Properties

### `Readonly` _cancel

• **_cancel**: *TaskCancel*

*Inherited from [Task](_src_task_.task.md).[_cancel](_src_task_.task.md#readonly-_cancel)*

*Defined in [src/task.ts:166](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L166)*

___

### `Readonly` _invoke

• **_invoke**: *TaskInvoke‹R›*

*Inherited from [Task](_src_task_.task.md).[_invoke](_src_task_.task.md#readonly-_invoke)*

*Defined in [src/task.ts:165](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L165)*

___

###  cancel

• **cancel**: *function*

*Defined in [src/task.ts:102](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L102)*

Invoke underlying canel method without error

#### Type declaration:

▸ (): *void*

___

###  reject

• **reject**: *function*

*Defined in [src/task.ts:108](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L108)*

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

*Defined in [src/task.ts:98](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L98)*

Return underlying promise in order to await result

**`returns`** underlying promise

#### Type declaration:

▸ (): *TaskInvoke‹R›*

## Methods

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:92](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L92)*

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

*Defined in [src/task.ts:76](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L76)*

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

*Defined in [src/task.ts:84](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L84)*

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

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:68](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L68)*

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

###  fmapCanceled

▸ **fmapCanceled**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:52](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L52)*

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

###  fmapRejected

▸ **fmapRejected**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:60](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L60)*

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

###  tap

▸ **tap**(`op`: function): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:44](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L44)*

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

*Defined in [src/task.ts:30](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L30)*

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

*Defined in [src/task.ts:37](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/task.ts#L37)*

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
