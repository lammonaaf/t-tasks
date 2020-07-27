[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task"](../modules/_src_task_.md) › [Task](_src_task_.task.md)

# Interface: Task ‹**R**›

Task monad interface

## Type parameters

▪ **R**

## Hierarchy

* [TaskBase](_src_task_.taskbase.md)‹R›

  ↳ **Task**

## Implemented by

* [TaskClass](../classes/_src_task_.taskclass.md)

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

• **_cancel**: *[TaskCancel](../modules/_src_task_.md#taskcancel)*

*Inherited from [TaskBase](_src_task_.taskbase.md).[_cancel](_src_task_.taskbase.md#readonly-_cancel)*

*Defined in [src/task.ts:21](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L21)*

___

### `Readonly` _invoke

• **_invoke**: *[TaskInvoke](../modules/_src_task_.md#taskinvoke)‹R›*

*Inherited from [TaskBase](_src_task_.taskbase.md).[_invoke](_src_task_.taskbase.md#readonly-_invoke)*

*Defined in [src/task.ts:20](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L20)*

___

###  cancel

• **cancel**: *function*

*Defined in [src/task.ts:86](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L86)*

Invoke underlying canel method without error

#### Type declaration:

▸ (): *void*

___

###  reject

• **reject**: *function*

*Defined in [src/task.ts:90](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L90)*

Invoke underlying canel method with error

#### Type declaration:

▸ (`error`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

___

###  resolve

• **resolve**: *function*

*Defined in [src/task.ts:82](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L82)*

Return underlying promise in order to await result

#### Type declaration:

▸ (): *[TaskInvoke](../modules/_src_task_.md#taskinvoke)‹R›*

## Methods

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:78](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L78)*

Invoke transformer when task is resolved (and only then) and continue execution with it's result

**Type parameters:**

▪ **R2**

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

*Defined in [src/task.ts:66](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L66)*

Invoke transformer when task is canceled (and only then) and continue execution with it's result

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (): *[Task](_src_task_.task.md)‹R2›*

**Returns:** *[Task](_src_task_.task.md)‹R | R2›*

task chaining to fallback task in case of cancelation

___

###  chainRejected

▸ **chainRejected**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:72](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L72)*

Invoke transformer when task is rejected (and only then) and continue execution with it's result

**Type parameters:**

▪ **R2**

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

*Defined in [src/task.ts:60](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L60)*

Invoke transformer when task is resolved (and only then) and return it's result instead

**Type parameters:**

▪ **R2**

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

*Defined in [src/task.ts:48](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L48)*

Invoke transformer when task is canceled (and only then) and return it's result instead

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

transformer to invoke

▸ (): *R2*

**Returns:** *[Task](_src_task_.task.md)‹R | R2›*

task returning fallback result in case of cancelation

___

###  fmapRejected

▸ **fmapRejected**‹**R2**›(`op`: function): *[Task](_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:54](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L54)*

Invoke transformer when task is rejected (and only then) and return it's result instead

**Type parameters:**

▪ **R2**

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

*Defined in [src/task.ts:42](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L42)*

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

___

###  tapCanceled

▸ **tapCanceled**(`op`: function): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:32](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L32)*

Invoke callback when task is canceled (and only then)

**Parameters:**

▪ **op**: *function*

callback to invoke

▸ (): *void*

**Returns:** *[Task](_src_task_.task.md)‹R›*

___

###  tapRejected

▸ **tapRejected**(`op`: function): *[Task](_src_task_.task.md)‹R›*

*Defined in [src/task.ts:37](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L37)*

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
