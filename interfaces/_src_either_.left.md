[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](../modules/_src_either_.md) › [Left](_src_either_.left.md)

# Interface: Left ‹**L**›

Left (erroneous) value of type L

Either data type specialization representing an erroneous value

## Type parameters

▪ **L**

underlying error type

## Hierarchy

* **Left**

## Index

### Properties

* [left](_src_either_.left.md#readonly-left)

### Methods

* [chain](_src_either_.left.md#chain)
* [isLeft](_src_either_.left.md#isleft)
* [isRight](_src_either_.left.md#isright)
* [map](_src_either_.left.md#map)
* [orChain](_src_either_.left.md#orchain)
* [orMap](_src_either_.left.md#ormap)
* [orTap](_src_either_.left.md#ortap)
* [tap](_src_either_.left.md#tap)

## Properties

### `Readonly` left

• **left**: *L*

*Defined in [src/either.ts:116](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L116)*

## Methods

###  chain

▸ **chain**(`op`: unknown): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:172](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L172)*

Either composition function

Applied to 'right value' returns 'op(value)'
Applied to 'left error' returns self without invoking composition function

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | transformer to be invoked with underlying value |

**Returns:** *[Left](_src_either_.left.md)‹L›*

'op(value)' or 'left error'

___

###  isLeft

▸ **isLeft**(): *this is Left<L>*

*Defined in [src/either.ts:212](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L212)*

Either type guard for 'left'

**`example`** 
```typescript
if (either.isLeft()) {
  console.error(either.left)
}
```

**Returns:** *this is Left<L>*

'true' in case this is 'left error' (and resolves type to be 'left')

___

###  isRight

▸ **isRight**(): *this is Right<never>*

*Defined in [src/either.ts:198](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L198)*

Either type guard for 'right'

**`example`** 
```typescript
if (either.isRight()) {
  console.log(either.right)
}
```

**Returns:** *this is Right<never>*

'true' in case this is 'right value' (and resolves type to be 'right')

___

###  map

▸ **map**(`op`: unknown): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:149](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L149)*

Either transformer function

Applied to 'right value' returns 'right op(value)'
Applied to 'left error' returns self without invoking transformer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | transformer to be invoked with underlying value |

**Returns:** *[Left](_src_either_.left.md)‹L›*

'right op(value)' or 'left error'

___

###  orChain

▸ **orChain**‹**TT**›(`op`: function): *TT*

*Defined in [src/either.ts:184](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L184)*

Either composition function

Applied to 'right value' returns self without invoking composition function
Applied to 'left error' returns 'op(error)'

**Type parameters:**

▪ **TT**: *[Either](../modules/_src_either_.either.md)‹unknown, unknown›*

composition function's return type

**Parameters:**

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`error`: L): *TT*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *TT*

'right value' or 'op(error)'

___

###  orMap

▸ **orMap**‹**R2**›(`op`: function): *[Right](_src_either_.right.md)‹R2›*

*Defined in [src/either.ts:161](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L161)*

Either fallback transformer function

Applied to 'right value' returns self without invoking transformer
Applied to 'left error' returns 'right op(error)'

**Type parameters:**

▪ **R2**

transformer function's return type

**Parameters:**

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`error`: L): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R2›*

'right value' or 'right op(error)'

___

###  orTap

▸ **orTap**(`op`: function): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:138](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L138)*

Either fallback peeker function

Applied to 'right value' returns self without invoking callback
Applied to 'left error' returns self invoking op(error) in process

**Parameters:**

▪ **op**: *function*

function to be invoked with underlying value

▸ (`error`: L): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Left](_src_either_.left.md)‹L›*

self

___

###  tap

▸ **tap**(`op`: unknown): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:127](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L127)*

Either peeker function

Applied to 'right value' returns self invoking op(value) in process
Applied to 'left error' returns self without invoking callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | function to be invoked with underlying value |

**Returns:** *[Left](_src_either_.left.md)‹L›*

self
