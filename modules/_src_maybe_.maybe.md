[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](_src_maybe_.md) › [Maybe](_src_maybe_.maybe.md)

# Namespace: Maybe ‹**R**›

Genric Maybe monad interface

As per classic Maybe monad implementation can eithr contain just a value or contain nothing
Used throughout the library to represent optional return type, specifically return type of cancelled tasks

## Type parameters

▪ **R**

underlying value

## Index

### Functions

* [fromNullable](_src_maybe_.maybe.md#fromnullable)
* [fromOptional](_src_maybe_.maybe.md#fromoptional)
* [just](_src_maybe_.maybe.md#just)
* [nothing](_src_maybe_.maybe.md#nothing)

## Functions

###  fromNullable

▸ **fromNullable**(`value`: undefined): *[Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:249](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L249)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | undefined |

**Returns:** *[Nothing](../interfaces/_src_maybe_.nothing.md)*

▸ **fromNullable**(`value`: null): *[Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:250](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | null |

**Returns:** *[Nothing](../interfaces/_src_maybe_.nothing.md)*

▸ **fromNullable**‹**T**›(`value`: Exclude‹T, null | undefined›): *[Just](../interfaces/_src_maybe_.just.md)‹T›*

*Defined in [src/maybe.ts:251](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L251)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹T, null &#124; undefined› |

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹T›*

▸ **fromNullable**‹**T**›(`value`: T | null | undefined): *[Just](../interfaces/_src_maybe_.just.md)‹T› | [Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:252](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L252)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`value` | T &#124; null &#124; undefined |

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹T› | [Nothing](../interfaces/_src_maybe_.nothing.md)*

___

###  fromOptional

▸ **fromOptional**(`value`: undefined): *[Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:242](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | undefined |

**Returns:** *[Nothing](../interfaces/_src_maybe_.nothing.md)*

▸ **fromOptional**‹**T**›(`value`: Exclude‹T, undefined›): *[Just](../interfaces/_src_maybe_.just.md)‹T›*

*Defined in [src/maybe.ts:243](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L243)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹T, undefined› |

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹T›*

▸ **fromOptional**‹**T**›(`value`: T | undefined): *[Just](../interfaces/_src_maybe_.just.md)‹T› | [Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:244](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L244)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`value` | T &#124; undefined |

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹T› | [Nothing](../interfaces/_src_maybe_.nothing.md)*

___

###  just

▸ **just**‹**R**›(`value`: R): *[Just](../interfaces/_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:229](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L229)*

Non-empty monad constructor

**Type parameters:**

▪ **R**

underlying type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | underlying value |

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹R›*

'just value'

___

###  nothing

▸ **nothing**(): *[Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:238](https://github.com/lammonaaf/t-tasks/blob/009a7bd/src/maybe.ts#L238)*

Empty monad constructor

**Returns:** *[Nothing](../interfaces/_src_maybe_.nothing.md)*

'nothing'
