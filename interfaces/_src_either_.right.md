[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](../modules/_src_either_.md) › [Right](_src_either_.right.md)

# Interface: Right ‹**R**›

Right (correct) value of type R

Either data type specialization representing a correct value

## Type parameters

▪ **R**

## Hierarchy

* **Right**

## Implemented by

* [RightClass](../classes/_src_either_.rightclass.md)

## Index

### Properties

* [kind](_src_either_.right.md#readonly-kind)
* [right](_src_either_.right.md#readonly-right)

### Methods

* [chain](_src_either_.right.md#chain)
* [chainLeft](_src_either_.right.md#chainleft)
* [fmap](_src_either_.right.md#fmap)
* [fmapLeft](_src_either_.right.md#fmapleft)
* [tap](_src_either_.right.md#tap)
* [tapLeft](_src_either_.right.md#tapleft)

## Properties

### `Readonly` kind

• **kind**: *"right"*

*Defined in [src/either.ts:7](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L7)*

___

### `Readonly` right

• **right**: *R*

*Defined in [src/either.ts:8](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L8)*

## Methods

###  chain

▸ **chain**‹**R2**, **L2**›(`op`: function): *[Either](_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:21](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L21)*

chain applied to 'right value' returns 'op(value)'

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R2, L2›*

___

###  chainLeft

▸ **chainLeft**(): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:33](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L33)*

chainLeft applied to 'right value' returns self not invoking callback

**Returns:** *[Right](_src_either_.right.md)‹R›*

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Right](_src_either_.right.md)‹R2›*

*Defined in [src/either.ts:17](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L17)*

fmap applied to 'right value' returns 'right op(value)'

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Right](_src_either_.right.md)‹R2›*

___

###  fmapLeft

▸ **fmapLeft**(): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:29](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L29)*

fmapLeft applied to 'right value' returns self not invoking callback

**Returns:** *[Right](_src_either_.right.md)‹R›*

___

###  tap

▸ **tap**(`op`: function): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:13](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L13)*

tap applied to 'right value' returns self invoking op(value) in process

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Right](_src_either_.right.md)‹R›*

___

###  tapLeft

▸ **tapLeft**(): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:25](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L25)*

tapLeft applied to 'right value' returns self not invoking callback

**Returns:** *[Right](_src_either_.right.md)‹R›*
