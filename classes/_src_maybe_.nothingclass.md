[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [NothingClass](_src_maybe_.nothingclass.md)

# Class: NothingClass

## Hierarchy

* **NothingClass**

## Implements

* [Nothing](../interfaces/_src_maybe_.nothing.md)

## Index

### Properties

* [kind](_src_maybe_.nothingclass.md#readonly-kind)

### Methods

* [chain](_src_maybe_.nothingclass.md#chain)
* [chainNothing](_src_maybe_.nothingclass.md#chainnothing)
* [fmap](_src_maybe_.nothingclass.md#fmap)
* [fmapNothing](_src_maybe_.nothingclass.md#fmapnothing)
* [tap](_src_maybe_.nothingclass.md#tap)
* [tapNothing](_src_maybe_.nothingclass.md#tapnothing)

## Properties

### `Readonly` kind

• **kind**: *"nothing"* = "nothing"

*Implementation of [Nothing](../interfaces/_src_maybe_.nothing.md).[kind](../interfaces/_src_maybe_.nothing.md#readonly-kind)*

*Defined in [src/maybe.ts:219](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L219)*

## Methods

###  chain

▸ **chain**(): *this*

*Implementation of [Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:227](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L227)*

**Returns:** *this*

___

###  chainNothing

▸ **chainNothing**‹**R2**›(`op`: function): *[Maybe](../interfaces/_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:238](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L238)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (): *[Maybe](../interfaces/_src_maybe_.maybe.md)‹R2›*

**Returns:** *[Maybe](../interfaces/_src_maybe_.maybe.md)‹R2›*

___

###  fmap

▸ **fmap**(): *this*

*Implementation of [Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:224](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L224)*

**Returns:** *this*

___

###  fmapNothing

▸ **fmapNothing**‹**R2**›(`op`: function): *[Just](../interfaces/_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:235](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L235)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (): *R2*

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹R2›*

___

###  tap

▸ **tap**(): *this*

*Implementation of [Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:221](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L221)*

**Returns:** *this*

___

###  tapNothing

▸ **tapNothing**(`op`: function): *this*

*Defined in [src/maybe.ts:230](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L230)*

**Parameters:**

▪ **op**: *function*

▸ (): *void*

**Returns:** *this*
