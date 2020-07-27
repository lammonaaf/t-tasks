[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task"](../modules/_src_task_.md) › [TaskClass](_src_task_.taskclass.md)

# Class: TaskClass ‹**R**›

## Type parameters

▪ **R**

## Hierarchy

* **TaskClass**

## Implements

* [Task](../interfaces/_src_task_.task.md)‹R›

## Index

### Constructors

* [constructor](_src_task_.taskclass.md#constructor)

### Properties

* [_cancel](_src_task_.taskclass.md#readonly-_cancel)
* [_invoke](_src_task_.taskclass.md#readonly-_invoke)

### Methods

* [cancel](_src_task_.taskclass.md#cancel)
* [chain](_src_task_.taskclass.md#chain)
* [chainCanceled](_src_task_.taskclass.md#chaincanceled)
* [chainRejected](_src_task_.taskclass.md#chainrejected)
* [fmap](_src_task_.taskclass.md#fmap)
* [fmapCanceled](_src_task_.taskclass.md#fmapcanceled)
* [fmapRejected](_src_task_.taskclass.md#fmaprejected)
* [reject](_src_task_.taskclass.md#reject)
* [resolve](_src_task_.taskclass.md#resolve)
* [tap](_src_task_.taskclass.md#tap)
* [tapCanceled](_src_task_.taskclass.md#tapcanceled)
* [tapRejected](_src_task_.taskclass.md#taprejected)

## Constructors

###  constructor

\+ **new TaskClass**(`_invoke`: [TaskInvoke](../modules/_src_task_.md#taskinvoke)‹R›, `_cancel`: [TaskCancel](../modules/_src_task_.md#taskcancel)): *[TaskClass](_src_task_.taskclass.md)*

*Defined in [src/task.ts:247](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`_invoke` | [TaskInvoke](../modules/_src_task_.md#taskinvoke)‹R› |
`_cancel` | [TaskCancel](../modules/_src_task_.md#taskcancel) |

**Returns:** *[TaskClass](_src_task_.taskclass.md)*

## Properties

### `Readonly` _cancel

• **_cancel**: *[TaskCancel](../modules/_src_task_.md#taskcancel)*

*Implementation of [Task](../interfaces/_src_task_.task.md).[_cancel](../interfaces/_src_task_.task.md#readonly-_cancel)*

*Defined in [src/task.ts:248](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L248)*

___

### `Readonly` _invoke

• **_invoke**: *[TaskInvoke](../modules/_src_task_.md#taskinvoke)‹R›*

*Implementation of [Task](../interfaces/_src_task_.task.md).[_invoke](../interfaces/_src_task_.task.md#readonly-_invoke)*

*Defined in [src/task.ts:248](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L248)*

## Methods

###  cancel

▸ **cancel**(): *void*

*Defined in [src/task.ts:283](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L283)*

**Returns:** *void*

___

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:276](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L276)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  chainCanceled

▸ **chainCanceled**‹**R2**›(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:270](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L270)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  chainRejected

▸ **chainRejected**‹**R2**›(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:273](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L273)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`error`: any): *[Task](../interfaces/_src_task_.task.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R2›*

*Defined in [src/task.ts:266](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L266)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R2›*

___

###  fmapCanceled

▸ **fmapCanceled**‹**R2**›(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:260](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L260)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (): *R2*

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  fmapRejected

▸ **fmapRejected**‹**R2**›(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

*Defined in [src/task.ts:263](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L263)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`error`: any): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R | R2›*

___

###  reject

▸ **reject**(`error`: any): *void*

*Defined in [src/task.ts:286](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L286)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *void*

___

###  resolve

▸ **resolve**(): *Promise‹[Maybe](../interfaces/_src_maybe_.maybe.md)‹[Either](../interfaces/_src_either_.either.md)‹R, any›››*

*Defined in [src/task.ts:280](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L280)*

**Returns:** *Promise‹[Maybe](../interfaces/_src_maybe_.maybe.md)‹[Either](../interfaces/_src_either_.either.md)‹R, any›››*

___

###  tap

▸ **tap**(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:256](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L256)*

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  tapCanceled

▸ **tapCanceled**(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:250](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L250)*

**Parameters:**

▪ **op**: *function*

▸ (): *void*

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*

___

###  tapRejected

▸ **tapRejected**(`op`: function): *[Task](../interfaces/_src_task_.task.md)‹R›*

*Defined in [src/task.ts:253](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/task.ts#L253)*

**Parameters:**

▪ **op**: *function*

▸ (`error`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *[Task](../interfaces/_src_task_.task.md)‹R›*
