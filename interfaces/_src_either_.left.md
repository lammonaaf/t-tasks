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
* [chainLeft](_src_either_.left.md#chainleft)
* [fmap](_src_either_.left.md#fmap)
* [fmapLeft](_src_either_.left.md#fmapleft)
* [isLeft](_src_either_.left.md#isleft)
* [isRight](_src_either_.left.md#isright)
* [tap](_src_either_.left.md#tap)
* [tapLeft](_src_either_.left.md#tapleft)

## Properties

### `Readonly` left

• **left**: *L*

*Defined in [src/either.ts:118](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L118)*

## Methods

###  chain

▸ **chain**(): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:153](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L153)*

Either composition function

Applied to 'right value' returns 'op(value)'
Applied to 'left error' returns self without invoking composition function

**`template`** composition function's return type's underlying type

**Returns:** *[Left](_src_either_.left.md)‹L›*

'op(value)' or 'left error'

___

###  chainLeft

▸ **chainLeft**‹**R2**, **L2**›(`op`: function): *[Either](../modules/_src_either_.md#either)‹R2, L2›*

*Defined in [src/either.ts:188](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L188)*

Either composition function

Applied to 'right value' returns self without invoking composition function
Applied to 'left error' returns 'op(error)'

**Type parameters:**

▪ **R2**

composition function's return type's underlying type

▪ **L2**

**Parameters:**

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`error`: L): *[Either](../modules/_src_either_.md#either)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Either](../modules/_src_either_.md#either)‹R2, L2›*

'right value' or 'op(error)'

___

###  fmap

▸ **fmap**(): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:141](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L141)*

Either transformer function

Applied to 'right value' returns 'right op(value)'
Applied to 'left error' returns self without invoking transformer

**`template`** transformer function's return type

**Returns:** *[Left](_src_either_.left.md)‹L›*

'right op(value)' or 'left error'

___

###  fmapLeft

▸ **fmapLeft**‹**R2**›(`op`: function): *[Right](_src_either_.right.md)‹R2›*

*Defined in [src/either.ts:176](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L176)*

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

###  isLeft

▸ **isLeft**(): *this is Left<L>*

*Defined in [src/either.ts:216](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L216)*

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

*Defined in [src/either.ts:202](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L202)*

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

###  tap

▸ **tap**(): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:129](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L129)*

Either peeker function

Applied to 'right value' returns self invoking op(value) in process
Applied to 'left error' returns self without invoking callback

**Returns:** *[Left](_src_either_.left.md)‹L›*

self

___

###  tapLeft

▸ **tapLeft**(`op`: function): *[Left](_src_either_.left.md)‹L›*

*Defined in [src/either.ts:164](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L164)*

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
