[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [Nothing](_src_maybe_.nothing.md)

# Interface: Nothing

Absolutely Nothing

Maybe data type specialiation representing an absence of any value

## Hierarchy

* **Nothing**

## Implemented by

* [NothingClass](../classes/_src_maybe_.nothingclass.md)

## Index

### Properties

* [kind](_src_maybe_.nothing.md#readonly-kind)

### Methods

* [chain](_src_maybe_.nothing.md#chain)
* [chainNothing](_src_maybe_.nothing.md#chainnothing)
* [fmap](_src_maybe_.nothing.md#fmap)
* [fmapNothing](_src_maybe_.nothing.md#fmapnothing)
* [tap](_src_maybe_.nothing.md#tap)
* [tapNothing](_src_maybe_.nothing.md#tapnothing)

## Properties

### `Readonly` kind

• **kind**: *"nothing"*

*Defined in [src/maybe.ts:42](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L42)*

## Methods

###  chain

▸ **chain**(): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:55](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L55)*

chain applied to 'nothing' returns self not invoking transformer

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

___

###  chainNothing

▸ **chainNothing**‹**R2**›(`op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:67](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L67)*

chainNothing applied to 'nothing' returns op()

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

___

###  fmap

▸ **fmap**(): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:51](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L51)*

fmap applied to 'nothing' returns self not invoking transformer

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

___

###  fmapNothing

▸ **fmapNothing**‹**R2**›(`op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:63](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L63)*

fmapNothing applied to 'nothing' returns just(op())

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

▸ (): *R2*

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

___

###  tap

▸ **tap**(): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:47](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L47)*

tap applied to 'nothing' returns self not invoking callback

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

___

###  tapNothing

▸ **tapNothing**(`op`: function): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:59](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L59)*

tapNothing applied to 'nothing' returns self invoking op() in process

**Parameters:**

▪ **op**: *function*

▸ (): *void*

**Returns:** *[Nothing](_src_maybe_.nothing.md)*
