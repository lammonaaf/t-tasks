[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](../modules/_src_either_.md) › [Right](_src_either_.right.md)

# Interface: Right ‹**R**›

Right (correct) value of type R

Either data type specialization representing a correct value

## Type parameters

▪ **R**

underlying value type

## Hierarchy

* **Right**

## Index

### Properties

* [right](_src_either_.right.md#readonly-right)

### Methods

* [chain](_src_either_.right.md#chain)
* [chainLeft](_src_either_.right.md#chainleft)
* [fmap](_src_either_.right.md#fmap)
* [fmapLeft](_src_either_.right.md#fmapleft)
* [isLeft](_src_either_.right.md#isleft)
* [isRight](_src_either_.right.md#isright)
* [tap](_src_either_.right.md#tap)
* [tapLeft](_src_either_.right.md#tapleft)

## Properties

### `Readonly` right

• **right**: *R*

*Defined in [src/either.ts:9](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L9)*

## Methods

###  chain

▸ **chain**‹**R2**, **L2**›(`op`: function): *[Either](../modules/_src_either_.md#either)‹R2, L2›*

*Defined in [src/either.ts:44](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L44)*

Either composition function

Applied to 'right value' returns 'op(value)'
Applied to 'left error' returns self without invoking composition function

**Type parameters:**

▪ **R2**

composition function's return type's underlying type

▪ **L2**

**Parameters:**

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *[Either](../modules/_src_either_.md#either)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](../modules/_src_either_.md#either)‹R2, L2›*

'op(value)' or 'left error'

___

###  chainLeft

▸ **chainLeft**(): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:79](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L79)*

Either composition function

Applied to 'right value' returns self without invoking composition function
Applied to 'left error' returns 'op(error)'

**`template`** composition function's return type's underlying type

**Returns:** *[Right](_src_either_.right.md)‹R›*

'right value' or 'op(error)'

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Right](_src_either_.right.md)‹R2›*

*Defined in [src/either.ts:32](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L32)*

Either transformer function

Applied to 'right value' returns 'right op(value)'
Applied to 'left error' returns self without invoking transformer

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

**Returns:** *[Right](_src_either_.right.md)‹R2›*

'right op(value)' or 'left error'

___

###  fmapLeft

▸ **fmapLeft**(): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:67](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L67)*

Either fallback transformer function

Applied to 'right value' returns self without invoking transformer
Applied to 'left error' returns 'right op(error)'

**`template`** transformer function's return type

**Returns:** *[Right](_src_either_.right.md)‹R›*

'right value' or 'right op(error)'

___

###  isLeft

▸ **isLeft**(): *this is Left<never>*

*Defined in [src/either.ts:107](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L107)*

Either type guard for 'left'

**`example`** 
```typescript
if (either.isLeft()) {
  console.error(either.left)
}
```

**Returns:** *this is Left<never>*

'true' in case this is 'left error' (and resolves type to be 'left')

___

###  isRight

▸ **isRight**(): *this is Right<R>*

*Defined in [src/either.ts:93](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L93)*

Either type guard for 'right'

**`example`** 
```typescript
if (either.isRight()) {
  console.log(either.right)
}
```

**Returns:** *this is Right<R>*

'true' in case this is 'right value' (and resolves type to be 'right')

___

###  tap

▸ **tap**(`op`: function): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:20](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L20)*

Either peeker function

Applied to 'right value' returns self invoking op(value) in process
Applied to 'left error' returns self without invoking callback

**Parameters:**

▪ **op**: *function*

function to be invoked with underlying value

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Right](_src_either_.right.md)‹R›*

self

___

###  tapLeft

▸ **tapLeft**(): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:55](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L55)*

Either fallback peeker function

Applied to 'right value' returns self without invoking callback
Applied to 'left error' returns self invoking op(error) in process

**Returns:** *[Right](_src_either_.right.md)‹R›*

self
