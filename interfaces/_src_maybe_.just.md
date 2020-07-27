[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [Just](_src_maybe_.just.md)

# Interface: Just ‹**R**›

Just a value of type R

Maybe data type specialization representing an existing value

## Type parameters

▪ **R**

## Hierarchy

* **Just**

## Implemented by

* [JustClass](../classes/_src_maybe_.justclass.md)

## Index

### Properties

* [just](_src_maybe_.just.md#readonly-just)
* [kind](_src_maybe_.just.md#readonly-kind)

### Methods

* [chain](_src_maybe_.just.md#chain)
* [chainNothing](_src_maybe_.just.md#chainnothing)
* [fmap](_src_maybe_.just.md#fmap)
* [fmapNothing](_src_maybe_.just.md#fmapnothing)
* [tap](_src_maybe_.just.md#tap)
* [tapNothing](_src_maybe_.just.md#tapnothing)

## Properties

### `Readonly` just

• **just**: *R*

*Defined in [src/maybe.ts:8](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L8)*

___

### `Readonly` kind

• **kind**: *"just"*

*Defined in [src/maybe.ts:7](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L7)*

## Methods

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:21](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L21)*

chain applied to 'just value' returns 'op(value)'

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

___

###  chainNothing

▸ **chainNothing**(): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:33](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L33)*

chainNothing applied to 'just value' returns self not invoking transformer

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:17](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L17)*

fmap applied to 'just value' returns 'just op(value)'

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

___

###  fmapNothing

▸ **fmapNothing**(): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:29](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L29)*

fmapNothing applied to 'just value' returns self not invoking transformer

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

___

###  tap

▸ **tap**(`op`: function): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:13](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L13)*

tap applied to 'just value' returns self invoking op(value) in process

**Parameters:**

▪ **op**: *function*

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

___

###  tapNothing

▸ **tapNothing**(): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:25](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L25)*

tapNothing applied to 'just value' returns self not invoking callback

**Returns:** *[Just](_src_maybe_.just.md)‹R›*
