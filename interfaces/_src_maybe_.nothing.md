[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [Nothing](_src_maybe_.nothing.md)

# Interface: Nothing

Absolutely Nothing

Maybe data type specialiation representing an absence of any value

## Hierarchy

* **Nothing**

## Index

### Methods

* [chain](_src_maybe_.nothing.md#chain)
* [chainNothing](_src_maybe_.nothing.md#chainnothing)
* [fmap](_src_maybe_.nothing.md#fmap)
* [fmapNothing](_src_maybe_.nothing.md#fmapnothing)
* [isJust](_src_maybe_.nothing.md#isjust)
* [isNothing](_src_maybe_.nothing.md#isnothing)
* [tap](_src_maybe_.nothing.md#tap)
* [tapNothing](_src_maybe_.nothing.md#tapnothing)

## Methods

###  chain

▸ **chain**(): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:149](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L149)*

Maybe composition function

Applied to 'just value' returns 'op(value)'
Applied to 'nothing' returns self without invoking composition function

**`template`** composition function's return type's underlying type

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

'op(value)' or self

___

###  chainNothing

▸ **chainNothing**‹**R2**›(`op`: function): *[Maybe](../modules/_src_maybe_.md#maybe)‹R2›*

*Defined in [src/maybe.ts:184](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L184)*

Maybe fallback composition function

Applied to 'just value' returns self witjout invoking composition function
Applied to 'nothing' returns op()

**Type parameters:**

▪ **R2**

composition function's return type's underlying type

**Parameters:**

▪ **op**: *function*

function to be invoked

▸ (): *[Maybe](../modules/_src_maybe_.md#maybe)‹R2›*

**Returns:** *[Maybe](../modules/_src_maybe_.md#maybe)‹R2›*

self or 'op()'

___

###  fmap

▸ **fmap**(): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:137](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L137)*

Maybe transformer function

Applied to 'just value' returns 'just op(value)'
Applied to 'nothing' returns self without invoking transformer

**`template`** transformer function return type

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

'just op(value)' or self

___

###  fmapNothing

▸ **fmapNothing**‹**R2**›(`op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:172](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L172)*

Maybe fallback transformer function

Applied to 'just value' returns self without invoking transformer
Applied to 'nothing' returns 'just op()'

**Type parameters:**

▪ **R2**

transformer function's result type

**Parameters:**

▪ **op**: *function*

function to be invoked

▸ (): *R2*

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

self or 'just op()'

___

###  isJust

▸ **isJust**(): *this is Just<never>*

*Defined in [src/maybe.ts:198](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L198)*

Maybe type guard for 'just'

**`example`** 
```typescript
if (maybe.isJust()) {
  console.log(maybe.just);
}
```

**Returns:** *this is Just<never>*

'true' in case wrapped value exists (and resolves argument type to be 'just')

___

###  isNothing

▸ **isNothing**(): *this is Nothing*

*Defined in [src/maybe.ts:212](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L212)*

Maybe type guard for 'nothing'

**`example`** 
```typescript
if (maybe.isNohing()) {
  console.log('nothing');
}
```

**Returns:** *this is Nothing*

'true' in case wrapped value is 'nothing' (and resolves argument type to be 'nothing')

___

###  tap

▸ **tap**(): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:125](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L125)*

Maybe peeker function

Applied to 'just value' returns self invoking op(value) in process
Applied to 'nothing' returns self without invoking callback

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

self

___

###  tapNothing

▸ **tapNothing**(`op`: function): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:160](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L160)*

Maybe fallback peeker function

Applied to 'just value' returns self without invoking callback
Applied to 'nothing' returns self invoking op() in process

**Parameters:**

▪ **op**: *function*

function to be invoked

▸ (): *void*

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

self
