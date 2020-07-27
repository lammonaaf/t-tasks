[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](../modules/_src_either_.md) › [LeftClass](_src_either_.leftclass.md)

# Class: LeftClass ‹**L**›

## Type parameters

▪ **L**

## Hierarchy

* **LeftClass**

## Implements

* [Left](../interfaces/_src_either_.left.md)‹L›

## Index

### Constructors

* [constructor](_src_either_.leftclass.md#constructor)

### Properties

* [kind](_src_either_.leftclass.md#readonly-kind)
* [left](_src_either_.leftclass.md#readonly-left)

### Methods

* [chain](_src_either_.leftclass.md#chain)
* [chainLeft](_src_either_.leftclass.md#chainleft)
* [fmap](_src_either_.leftclass.md#fmap)
* [fmapLeft](_src_either_.leftclass.md#fmapleft)
* [tap](_src_either_.leftclass.md#tap)
* [tapLeft](_src_either_.leftclass.md#tapleft)

## Constructors

###  constructor

\+ **new LeftClass**(`left`: L): *[LeftClass](_src_either_.leftclass.md)*

*Defined in [src/either.ts:231](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L231)*

**Parameters:**

Name | Type |
------ | ------ |
`left` | L |

**Returns:** *[LeftClass](_src_either_.leftclass.md)*

## Properties

### `Readonly` kind

• **kind**: *"left"* = "left"

*Implementation of [Left](../interfaces/_src_either_.left.md).[kind](../interfaces/_src_either_.left.md#readonly-kind)*

*Defined in [src/either.ts:231](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L231)*

___

### `Readonly` left

• **left**: *L*

*Implementation of [Left](../interfaces/_src_either_.left.md).[left](../interfaces/_src_either_.left.md#readonly-left)*

*Defined in [src/either.ts:233](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L233)*

## Methods

###  chain

▸ **chain**(): *this*

*Implementation of [Left](../interfaces/_src_either_.left.md)*

*Defined in [src/either.ts:241](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L241)*

**Returns:** *this*

___

###  chainLeft

▸ **chainLeft**‹**R2**, **L2**›(`op`: function): *[Either](../interfaces/_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:252](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L252)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **op**: *function*

▸ (`error`: L): *[Either](../interfaces/_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Either](../interfaces/_src_either_.either.md)‹R2, L2›*

___

###  fmap

▸ **fmap**(): *this*

*Implementation of [Left](../interfaces/_src_either_.left.md)*

*Defined in [src/either.ts:238](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L238)*

**Returns:** *this*

___

###  fmapLeft

▸ **fmapLeft**‹**R2**›(`op`: function): *[Right](../interfaces/_src_either_.right.md)‹R2›*

*Defined in [src/either.ts:249](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L249)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`error`: L): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹R2›*

___

###  tap

▸ **tap**(): *this*

*Implementation of [Left](../interfaces/_src_either_.left.md)*

*Defined in [src/either.ts:235](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L235)*

**Returns:** *this*

___

###  tapLeft

▸ **tapLeft**(`op`: function): *this*

*Defined in [src/either.ts:244](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/either.ts#L244)*

**Parameters:**

▪ **op**: *function*

▸ (`error`: L): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *this*
