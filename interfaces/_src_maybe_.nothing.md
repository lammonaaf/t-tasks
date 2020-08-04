[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [Nothing](_src_maybe_.nothing.md)

# Interface: Nothing

Absolutely Nothing

Maybe data type specialiation representing an absence of any value

## Hierarchy

* **Nothing**

## Index

### Methods

* [chain](_src_maybe_.nothing.md#chain)
* [isJust](_src_maybe_.nothing.md#isjust)
* [isNothing](_src_maybe_.nothing.md#isnothing)
* [map](_src_maybe_.nothing.md#map)
* [orChain](_src_maybe_.nothing.md#orchain)
* [orMap](_src_maybe_.nothing.md#ormap)
* [orTap](_src_maybe_.nothing.md#ortap)
* [tap](_src_maybe_.nothing.md#tap)

## Methods

###  chain

▸ **chain**(`op`: unknown): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:168](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L168)*

Maybe composition function

Applied to 'just value' returns 'op(value)'
Applied to 'nothing' returns self without invoking composition function

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | transformer to be invoked with underlying value |

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

'op(value)' or self

___

###  isJust

▸ **isJust**(): *this is Just<never>*

*Defined in [src/maybe.ts:194](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L194)*

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

*Defined in [src/maybe.ts:208](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L208)*

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

###  map

▸ **map**(`op`: unknown): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:145](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L145)*

Maybe transformer function

Applied to 'just value' returns 'just op(value)'
Applied to 'nothing' returns self without invoking transformer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | transformer to be invoked with underlying value |

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

'just op(value)' or self

___

###  orChain

▸ **orChain**‹**TT**›(`op`: function): *TT*

*Defined in [src/maybe.ts:180](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L180)*

Maybe fallback composition function

Applied to 'just value' returns self witjout invoking composition function
Applied to 'nothing' returns op()

**Type parameters:**

▪ **TT**: *[Maybe](../modules/_src_maybe_.maybe.md)‹unknown›*

composition function's return type

**Parameters:**

▪ **op**: *function*

function to be invoked

▸ (): *TT*

**Returns:** *TT*

self or 'op()'

___

###  orMap

▸ **orMap**‹**R2**›(`op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:157](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L157)*

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

###  orTap

▸ **orTap**(`op`: function): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:134](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L134)*

Maybe fallback peeker function

Applied to 'just value' returns self without invoking callback
Applied to 'nothing' returns self invoking op() in process

**Parameters:**

▪ **op**: *function*

function to be invoked

▸ (): *void*

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

self

___

###  tap

▸ **tap**(`op`: unknown): *[Nothing](_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:123](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L123)*

Maybe peeker function

Applied to 'just value' returns self invoking op(value) in process
Applied to 'nothing' returns self without invoking callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | function to be invoked with underlying value |

**Returns:** *[Nothing](_src_maybe_.nothing.md)*

self
