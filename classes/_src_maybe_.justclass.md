[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [JustClass](_src_maybe_.justclass.md)

# Class: JustClass ‹**R**›

## Type parameters

▪ **R**

## Hierarchy

* **JustClass**

## Implements

* [Just](../interfaces/_src_maybe_.just.md)‹R›

## Index

### Constructors

* [constructor](_src_maybe_.justclass.md#constructor)

### Properties

* [just](_src_maybe_.justclass.md#readonly-just)
* [kind](_src_maybe_.justclass.md#readonly-kind)

### Methods

* [chain](_src_maybe_.justclass.md#chain)
* [chainNothing](_src_maybe_.justclass.md#chainnothing)
* [fmap](_src_maybe_.justclass.md#fmap)
* [fmapNothing](_src_maybe_.justclass.md#fmapnothing)
* [tap](_src_maybe_.justclass.md#tap)
* [tapNothing](_src_maybe_.justclass.md#tapnothing)

## Constructors

###  constructor

\+ **new JustClass**(`just`: R): *[JustClass](_src_maybe_.justclass.md)*

*Defined in [src/maybe.ts:192](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`just` | R |

**Returns:** *[JustClass](_src_maybe_.justclass.md)*

## Properties

### `Readonly` just

• **just**: *R*

*Implementation of [Just](../interfaces/_src_maybe_.just.md).[just](../interfaces/_src_maybe_.just.md#readonly-just)*

*Defined in [src/maybe.ts:194](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L194)*

___

### `Readonly` kind

• **kind**: *"just"* = "just"

*Implementation of [Just](../interfaces/_src_maybe_.just.md).[kind](../interfaces/_src_maybe_.just.md#readonly-kind)*

*Defined in [src/maybe.ts:192](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L192)*

## Methods

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Maybe](../interfaces/_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:204](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L204)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *[Maybe](../interfaces/_src_maybe_.maybe.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](../interfaces/_src_maybe_.maybe.md)‹R2›*

___

###  chainNothing

▸ **chainNothing**(): *this*

*Implementation of [Just](../interfaces/_src_maybe_.just.md)*

*Defined in [src/maybe.ts:213](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L213)*

**Returns:** *this*

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Just](../interfaces/_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:201](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L201)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹R2›*

___

###  fmapNothing

▸ **fmapNothing**(): *this*

*Implementation of [Just](../interfaces/_src_maybe_.just.md)*

*Defined in [src/maybe.ts:210](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L210)*

**Returns:** *this*

___

###  tap

▸ **tap**(`op`: function): *this*

*Defined in [src/maybe.ts:196](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L196)*

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *this*

___

###  tapNothing

▸ **tapNothing**(): *this*

*Implementation of [Just](../interfaces/_src_maybe_.just.md)*

*Defined in [src/maybe.ts:207](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L207)*

**Returns:** *this*
