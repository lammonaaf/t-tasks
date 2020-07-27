[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](../modules/_src_either_.md) › [RightClass](_src_either_.rightclass.md)

# Class: RightClass ‹**R**›

## Type parameters

▪ **R**

## Hierarchy

* **RightClass**

## Implements

* [Right](../interfaces/_src_either_.right.md)‹R›

## Index

### Constructors

* [constructor](_src_either_.rightclass.md#constructor)

### Properties

* [kind](_src_either_.rightclass.md#readonly-kind)
* [right](_src_either_.rightclass.md#readonly-right)

### Methods

* [chain](_src_either_.rightclass.md#chain)
* [chainLeft](_src_either_.rightclass.md#chainleft)
* [fmap](_src_either_.rightclass.md#fmap)
* [fmapLeft](_src_either_.rightclass.md#fmapleft)
* [tap](_src_either_.rightclass.md#tap)
* [tapLeft](_src_either_.rightclass.md#tapleft)

## Constructors

###  constructor

\+ **new RightClass**(`right`: R): *[RightClass](_src_either_.rightclass.md)*

*Defined in [src/either.ts:204](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`right` | R |

**Returns:** *[RightClass](_src_either_.rightclass.md)*

## Properties

### `Readonly` kind

• **kind**: *"right"* = "right"

*Implementation of [Right](../interfaces/_src_either_.right.md).[kind](../interfaces/_src_either_.right.md#readonly-kind)*

*Defined in [src/either.ts:204](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L204)*

___

### `Readonly` right

• **right**: *R*

*Implementation of [Right](../interfaces/_src_either_.right.md).[right](../interfaces/_src_either_.right.md#readonly-right)*

*Defined in [src/either.ts:206](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L206)*

## Methods

###  chain

▸ **chain**‹**R2**, **L2**›(`op`: function): *[Either](../interfaces/_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:216](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L216)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *[Either](../interfaces/_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](../interfaces/_src_either_.either.md)‹R2, L2›*

___

###  chainLeft

▸ **chainLeft**(): *this*

*Implementation of [Right](../interfaces/_src_either_.right.md)*

*Defined in [src/either.ts:225](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L225)*

**Returns:** *this*

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Right](../interfaces/_src_either_.right.md)‹R2›*

*Defined in [src/either.ts:213](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L213)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹R2›*

___

###  fmapLeft

▸ **fmapLeft**(): *this*

*Implementation of [Right](../interfaces/_src_either_.right.md)*

*Defined in [src/either.ts:222](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L222)*

**Returns:** *this*

___

###  tap

▸ **tap**(`op`: function): *this*

*Defined in [src/either.ts:208](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L208)*

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *this*

___

###  tapLeft

▸ **tapLeft**(): *this*

*Implementation of [Right](../interfaces/_src_either_.right.md)*

*Defined in [src/either.ts:219](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L219)*

**Returns:** *this*
