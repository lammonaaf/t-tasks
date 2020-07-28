[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](_src_maybe_.md)

# Module: "src/maybe"

## Index

### Interfaces

* [Just](../interfaces/_src_maybe_.just.md)
* [Nothing](../interfaces/_src_maybe_.nothing.md)

### Type aliases

* [Maybe](_src_maybe_.md#maybe)

### Functions

* [just](_src_maybe_.md#just)
* [nothing](_src_maybe_.md#nothing)

## Type aliases

###  Maybe

Ƭ **Maybe**: *[Just](../interfaces/_src_maybe_.just.md)‹R› | [Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:223](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L223)*

Genric Maybe monad interface

As per classic Maybe monad implementation can eithr contain just a value or contain nothing
Used throughout the library to represent optional return type, specifically return type of cancelled tasks

## Functions

###  just

▸ **just**‹**R**›(`value`: R): *[Just](../interfaces/_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:232](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L232)*

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

*Defined in [src/maybe.ts:241](https://github.com/lammonaaf/t-tasks/blob/3fc1177/src/maybe.ts#L241)*

Empty monad constructor

**Returns:** *[Nothing](../interfaces/_src_maybe_.nothing.md)*

'nothing'
