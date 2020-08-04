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
* [isJust](_src_maybe_.just.md#isjust)
* [isNothing](_src_maybe_.just.md#isnothing)
* [map](_src_maybe_.just.md#map)
* [orChain](_src_maybe_.just.md#orchain)
* [orMap](_src_maybe_.just.md#ormap)
* [orTap](_src_maybe_.just.md#ortap)
* [tap](_src_maybe_.just.md#tap)

## Properties

### `Readonly` just

• **just**: *R*

*Defined in [src/maybe.ts:9](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L9)*

## Methods

###  chain

▸ **chain**‹**TT**›(`op`: function): *TT*

*Defined in [src/maybe.ts:66](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L66)*

Maybe composition function

Applied to 'just value' returns 'op(value)'
Applied to 'nothing' returns self without invoking composition function

**Type parameters:**

▪ **TT**: *[Maybe](../modules/_src_maybe_.maybe.md)‹unknown›*

composition function's return type

**Parameters:**

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *TT*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *TT*

'op(value)' or 'nothing'

___

###  isJust

▸ **isJust**(): *this is Just<R>*

*Defined in [src/maybe.ts:91](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L91)*

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

*Defined in [src/maybe.ts:105](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L105)*

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

▸ **map**‹**R2**›(`op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:43](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L43)*

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

###  orChain

▸ **orChain**(`op`: unknown): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:77](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L77)*

Maybe fallback composition function

Applied to 'just value' returns self witjout invoking composition function
Applied to 'nothing' returns op()

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | function to be invoked |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

'just value' or 'op()'

___

###  orMap

▸ **orMap**(`op`: unknown): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:54](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L54)*

Maybe fallback transformer function

Applied to 'just value' returns self without invoking transformer
Applied to 'nothing' returns 'just op()'

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | function to be invoked |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

'just value' or 'just op()'

___

###  orTap

▸ **orTap**(`op`: unknown): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:31](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L31)*

Maybe fallback peeker function

Applied to 'just value' returns self without invoking callback
Applied to 'nothing' returns self invoking op() in process

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | function to be invoked |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

self

___

###  tap

▸ **tap**(`op`: function): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:20](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L20)*

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
