[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](_src_either_.md)

# Module: "src/either"

## Index

### Classes

* [LeftClass](../classes/_src_either_.leftclass.md)
* [RightClass](../classes/_src_either_.rightclass.md)

### Interfaces

* [Either](../interfaces/_src_either_.either.md)
* [Left](../interfaces/_src_either_.left.md)
* [Right](../interfaces/_src_either_.right.md)

### Functions

* [isLeft](_src_either_.md#isleft)
* [isRight](_src_either_.md#isright)
* [left](_src_either_.md#left)
* [right](_src_either_.md#right)

## Functions

###  isLeft

▸ **isLeft**‹**L**›(`either`: [Either](../interfaces/_src_either_.either.md)‹any, L›): *either is Left<L>*

*Defined in [src/either.ts:195](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L195)*

Pattern mathching for 'left'

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`either` | [Either](../interfaces/_src_either_.either.md)‹any, L› | 'right value' or 'left error'  Returns 'true' in case either is left (and resolves argument type to be 'left error')  |

**Returns:** *either is Left<L>*

___

###  isRight

▸ **isRight**‹**R**›(`either`: [Either](../interfaces/_src_either_.either.md)‹R, any›): *either is Right<R>*

*Defined in [src/either.ts:185](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L185)*

Pattern mathching for 'right'

**`example`** 
```typescript
if (isRight(either)) {
  console.log(either.rigth)
}
```

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`either` | [Either](../interfaces/_src_either_.either.md)‹R, any› | 'right value' or 'left error'  Returns 'true' in case either is right (and resolves argument type to be 'right value')  |

**Returns:** *either is Right<R>*

___

###  left

▸ **left**‹**L**›(`error`: L): *[Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:168](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L168)*

Left monad constructor

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | L | underlying error  |

**Returns:** *[Left](../interfaces/_src_either_.left.md)‹L›*

___

###  right

▸ **right**‹**R**›(`value`: R): *[Right](../interfaces/_src_either_.right.md)‹R›*

*Defined in [src/either.ts:160](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L160)*

Right monad constructor

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | underlying value  |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹R›*
