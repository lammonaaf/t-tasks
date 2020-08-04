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
* [isLeft](_src_either_.right.md#isleft)
* [isRight](_src_either_.right.md#isright)
* [map](_src_either_.right.md#map)
* [orChain](_src_either_.right.md#orchain)
* [orMap](_src_either_.right.md#ormap)
* [orTap](_src_either_.right.md#ortap)
* [tap](_src_either_.right.md#tap)

## Properties

### `Readonly` right

• **right**: *R*

*Defined in [src/either.ts:9](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L9)*

## Methods

###  chain

▸ **chain**‹**TT**›(`op`: function): *TT*

*Defined in [src/either.ts:66](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L66)*

Either composition function

Applied to 'right value' returns 'op(value)'
Applied to 'left error' returns self without invoking composition function

**Type parameters:**

▪ **TT**: *[Either](../modules/_src_either_.either.md)‹unknown, unknown›*

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

'op(value)' or 'left error'

___

###  isLeft

▸ **isLeft**(): *this is Left<never>*

*Defined in [src/either.ts:105](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L105)*

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

*Defined in [src/either.ts:91](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L91)*

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

###  map

▸ **map**‹**R2**›(`op`: function): *[Right](_src_either_.right.md)‹R2›*

*Defined in [src/either.ts:43](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L43)*

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

###  orChain

▸ **orChain**(`op`: unknown): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:77](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L77)*

Either composition function

Applied to 'right value' returns self without invoking composition function
Applied to 'left error' returns 'op(error)'

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | transformer to be invoked with underlying value |

**Returns:** *[Right](_src_either_.right.md)‹R›*

'right value' or 'op(error)'

___

###  orMap

▸ **orMap**(`op`: unknown): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:54](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L54)*

Either fallback transformer function

Applied to 'right value' returns self without invoking transformer
Applied to 'left error' returns 'right op(error)'

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | transformer to be invoked with underlying value |

**Returns:** *[Right](_src_either_.right.md)‹R›*

'right value' or 'right op(error)'

___

###  orTap

▸ **orTap**(`op`: unknown): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:31](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L31)*

Either fallback peeker function

Applied to 'right value' returns self without invoking callback
Applied to 'left error' returns self invoking op(error) in process

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`op` | unknown | function to be invoked with underlying value |

**Returns:** *[Right](_src_either_.right.md)‹R›*

self

___

###  tap

▸ **tap**(`op`: function): *[Right](_src_either_.right.md)‹R›*

*Defined in [src/either.ts:20](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L20)*

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
