[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](_src_either_.md)

# Module: "src/either"

## Index

### Interfaces

* [Left](../interfaces/_src_either_.left.md)
* [Right](../interfaces/_src_either_.right.md)

### Type aliases

* [Either](_src_either_.md#either)

### Functions

* [left](_src_either_.md#left)
* [right](_src_either_.md#right)

## Type aliases

###  Either

Ƭ **Either**: *[Right](../interfaces/_src_either_.right.md)‹R› | [Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:228](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L228)*

Either data type: either Right value of type R or Left value of type L

As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
Used throughout the library to represent the result of failable operations, namely failed tasks

## Functions

###  left

▸ **left**‹**L**›(`error`: L): *[Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:248](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L248)*

Left monad constructor

**Type parameters:**

▪ **L**

underlying error type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | L | underlying error |

**Returns:** *[Left](../interfaces/_src_either_.left.md)‹L›*

'left error'

___

###  right

▸ **right**‹**R**›(`value`: R): *[Right](../interfaces/_src_either_.right.md)‹R›*

*Defined in [src/either.ts:237](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/either.ts#L237)*

Right monad constructor

**Type parameters:**

▪ **R**

underlying value type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | underlying value |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹R›*

'right value'
