[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [Just](_src_maybe_.just.md)

# Interface: Just ‹**R**›

Just a value

Maybe data type specialization representing an existing value

## Type parameters

▪ **R**

underlying value

## Hierarchy

* **Just**

## Index

### Properties

* [just](_src_maybe_.just.md#readonly-just)

### Methods

* [chain](_src_maybe_.just.md#chain)
* [chainNothing](_src_maybe_.just.md#chainnothing)
* [fmap](_src_maybe_.just.md#fmap)
* [fmapNothing](_src_maybe_.just.md#fmapnothing)
* [isJust](_src_maybe_.just.md#isjust)
* [isNothing](_src_maybe_.just.md#isnothing)
* [tap](_src_maybe_.just.md#tap)
* [tapNothing](_src_maybe_.just.md#tapnothing)

## Properties

### `Readonly` just

• **just**: *R*

*Defined in [src/maybe.ts:9](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L9)*

## Methods

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Maybe](../modules/_src_maybe_.md#maybe)‹R2›*

*Defined in [src/maybe.ts:44](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L44)*

Maybe composition function

Applied to 'just value' returns 'op(value)'
Applied to 'nothing' returns self without invoking composition function

**Type parameters:**

▪ **R2**

composition function's return type's underlying type

**Parameters:**

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *[Maybe](../modules/_src_maybe_.md#maybe)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](../modules/_src_maybe_.md#maybe)‹R2›*

'op(value)' or 'nothing'

___

###  chainNothing

▸ **chainNothing**(): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:79](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L79)*

Maybe fallback composition function

Applied to 'just value' returns self witjout invoking composition function
Applied to 'nothing' returns op()

**`template`** composition function's return type's underlying type

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

'just value' or 'op()'

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:32](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L32)*

Maybe transformer function

Applied to 'just value' returns 'just op(value)'
Applied to 'nothing' returns self without invoking transformer

**Type parameters:**

▪ **R2**

transformer function's return type

**Parameters:**

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

'just op(value)' or 'nothing'

___

###  fmapNothing

▸ **fmapNothing**(): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:67](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L67)*

Maybe fallback transformer function

Applied to 'just value' returns self without invoking transformer
Applied to 'nothing' returns 'just op()'

**`template`** transformer function's result type

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

'just value' or 'just op()'

___

###  isJust

▸ **isJust**(): *this is Just<R>*

*Defined in [src/maybe.ts:93](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L93)*

Maybe type guard for 'just'

**`example`** 
```typescript
if (maybe.isJust()) {
  console.log(maybe.just);
}
```

**Returns:** *this is Just<R>*

'true' in case wrapped value exists (and resolves argument type to be 'just')

___

###  isNothing

▸ **isNothing**(): *this is Nothing*

*Defined in [src/maybe.ts:107](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L107)*

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

▸ **tap**(`op`: function): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:20](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L20)*

Maybe peeker function

Applied to 'just value' returns self invoking op(value) in process
Applied to 'nothing' returns self without invoking callback

**Parameters:**

▪ **op**: *function*

function to be invoked with underlying value

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

self

___

###  tapNothing

▸ **tapNothing**(): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:55](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L55)*

Maybe fallback peeker function

Applied to 'just value' returns self without invoking callback
Applied to 'nothing' returns self invoking op() in process

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

self
