[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](_src_either_.md) › [Either](_src_either_.either.md)

# Namespace: Either ‹**R, L**›

Either data type: either Right value of type R or Left value of type L

As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
Used throughout the library to represent the result of failable operations, namely failed tasks

## Type parameters

▪ **R**

underlying value type

▪ **L**

underlying error type

## Index

### Functions

* [fromNullable](_src_either_.either.md#fromnullable)
* [fromOptional](_src_either_.either.md#fromoptional)
* [left](_src_either_.either.md#left)
* [right](_src_either_.either.md#right)

## Functions

###  fromNullable

▸ **fromNullable**‹**L**›(`value`: undefined, `error`: L): *[Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:256](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L256)*

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | undefined |
`error` | L |

**Returns:** *[Left](../interfaces/_src_either_.left.md)‹L›*

▸ **fromNullable**‹**L**›(`value`: null, `error`: L): *[Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:257](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L257)*

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | null |
`error` | L |

**Returns:** *[Left](../interfaces/_src_either_.left.md)‹L›*

▸ **fromNullable**‹**T**, **L**›(`value`: Exclude‹T, null | undefined›, `error`: L): *[Right](../interfaces/_src_either_.right.md)‹T›*

*Defined in [src/either.ts:258](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L258)*

**Type parameters:**

▪ **T**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹T, null &#124; undefined› |
`error` | L |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹T›*

▸ **fromNullable**‹**T**, **L**›(`value`: T | null | undefined, `error`: L): *[Right](../interfaces/_src_either_.right.md)‹T› | [Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:259](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L259)*

**Type parameters:**

▪ **T**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | T &#124; null &#124; undefined |
`error` | L |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹T› | [Left](../interfaces/_src_either_.left.md)‹L›*

___

###  fromOptional

▸ **fromOptional**‹**L**›(`value`: undefined, `error`: L): *[Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:249](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L249)*

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | undefined |
`error` | L |

**Returns:** *[Left](../interfaces/_src_either_.left.md)‹L›*

▸ **fromOptional**‹**T**, **L**›(`value`: Exclude‹T, undefined›, `error`: L): *[Right](../interfaces/_src_either_.right.md)‹T›*

*Defined in [src/either.ts:250](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L250)*

**Type parameters:**

▪ **T**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹T, undefined› |
`error` | L |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹T›*

▸ **fromOptional**‹**T**, **L**›(`value`: T | undefined, `error`: L): *[Right](../interfaces/_src_either_.right.md)‹T› | [Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:251](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L251)*

**Type parameters:**

▪ **T**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | T &#124; undefined |
`error` | L |

**Returns:** *[Right](../interfaces/_src_either_.right.md)‹T› | [Left](../interfaces/_src_either_.left.md)‹L›*

___

###  left

▸ **left**‹**L**›(`error`: L): *[Left](../interfaces/_src_either_.left.md)‹L›*

*Defined in [src/either.ts:245](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L245)*

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

*Defined in [src/either.ts:234](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/either.ts#L234)*

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
