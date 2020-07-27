[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](_src_maybe_.md)

# Module: "src/maybe"

## Index

### Classes

* [JustClass](../classes/_src_maybe_.justclass.md)
* [NothingClass](../classes/_src_maybe_.nothingclass.md)

### Interfaces

* [Just](../interfaces/_src_maybe_.just.md)
* [Maybe](../interfaces/_src_maybe_.maybe.md)
* [Nothing](../interfaces/_src_maybe_.nothing.md)

### Functions

* [isJust](_src_maybe_.md#isjust)
* [isNothing](_src_maybe_.md#isnothing)
* [just](_src_maybe_.md#just)
* [nothing](_src_maybe_.md#nothing)

## Functions

###  isJust

▸ **isJust**‹**R**›(`maybe`: [Maybe](../interfaces/_src_maybe_.maybe.md)‹R›): *maybe is Just<R>*

*Defined in [src/maybe.ts:173](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L173)*

Pattern mathching for 'just'

**`example`** 
```typescript
if (isJust(maybe)) {
  console.log(maybe.just)
}
```

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybe` | [Maybe](../interfaces/_src_maybe_.maybe.md)‹R› | wrapped value (or absence of it)  Returns 'true' in case wrapped value exists (and resolves argument type to be 'Just')  |

**Returns:** *maybe is Just<R>*

___

###  isNothing

▸ **isNothing**(`maybe`: [Maybe](../interfaces/_src_maybe_.maybe.md)‹any›): *maybe is Nothing*

*Defined in [src/maybe.ts:183](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L183)*

Pattern mathching for 'nothing'

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybe` | [Maybe](../interfaces/_src_maybe_.maybe.md)‹any› | wrapped value (or absence of it)  Returns 'true' in case wrapped value does not exist (and resolves argument type to be 'Nothing')  |

**Returns:** *maybe is Nothing*

___

###  just

▸ **just**‹**R**›(`value`: R): *[Just](../interfaces/_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:149](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L149)*

Non-empty monad constructor

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | underlying value  |

**Returns:** *[Just](../interfaces/_src_maybe_.just.md)‹R›*

___

###  nothing

▸ **nothing**(): *[Nothing](../interfaces/_src_maybe_.nothing.md)*

*Defined in [src/maybe.ts:156](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/maybe.ts#L156)*

Empty monad constructor

**Returns:** *[Nothing](../interfaces/_src_maybe_.nothing.md)*
