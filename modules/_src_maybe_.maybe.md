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

* [everyJust](_src_maybe_.maybe.md#everyjust)
* [everyNothing](_src_maybe_.maybe.md#everynothing)
* [fromNullable](_src_maybe_.maybe.md#fromnullable)
* [fromOptional](_src_maybe_.maybe.md#fromoptional)
* [isJust](_src_maybe_.maybe.md#isjust)
* [isNothing](_src_maybe_.maybe.md#isnothing)
* [just](_src_maybe_.maybe.md#just)
* [nothing](_src_maybe_.maybe.md#nothing)
* [someJust](_src_maybe_.maybe.md#somejust)
* [someNothing](_src_maybe_.maybe.md#somenothing)

## Functions

###  everyJust

▸ **everyJust**‹**R**›(`maybes`: [Maybe](_src_maybe_.maybe.md)‹R›[]): *maybes is Just<R>[]*

*Defined in [src/maybe.ts:488](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L488)*

Standalone list predicate

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybes` | [Maybe](_src_maybe_.maybe.md)‹R›[] | a list of Maybe |

**Returns:** *maybes is Just<R>[]*

true in case every list element is Just

___

###  everyNothing

▸ **everyNothing**‹**R**›(`maybes`: [Maybe](_src_maybe_.maybe.md)‹R›[]): *maybes is Nothing<never>[]*

*Defined in [src/maybe.ts:508](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L508)*

Standalone list predicate

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybes` | [Maybe](_src_maybe_.maybe.md)‹R›[] | a list of Maybe |

**Returns:** *maybes is Nothing<never>[]*

true in case every list element is Nothing

___

###  fromNullable

▸ **fromNullable**‹**R**›(`value`: undefined): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:448](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L448)*

Maybe constructor from optional or nullable value

Resolves to 'nothing' in case of undefined or null value and 'just value' otherwise

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | undefined | possibly undefined value |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

either 'just value' or 'nothing'

▸ **fromNullable**‹**R**›(`value`: null): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:449](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L449)*

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type |
------ | ------ |
`value` | null |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **fromNullable**‹**R**›(`value`: Exclude‹R, null | undefined›): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:450](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L450)*

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹R, null &#124; undefined› |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

▸ **fromNullable**‹**R**›(`value`: R | null | undefined): *[Maybe](_src_maybe_.maybe.md)‹R›*

*Defined in [src/maybe.ts:451](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L451)*

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type |
------ | ------ |
`value` | R &#124; null &#124; undefined |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R›*

___

###  fromOptional

▸ **fromOptional**‹**R**›(`value`: undefined): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:433](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L433)*

Maybe constructor from optional value

Resolves to 'nothing' in case of undefined value and 'just value' otherwise

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | undefined | possibly undefined value |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

either 'just value' or 'nothing'

▸ **fromOptional**‹**R**›(`value`: Exclude‹R, undefined›): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:434](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L434)*

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹R, undefined› |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

▸ **fromOptional**‹**R**›(`value`: R | undefined): *[Maybe](_src_maybe_.maybe.md)‹R›*

*Defined in [src/maybe.ts:435](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L435)*

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type |
------ | ------ |
`value` | R &#124; undefined |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R›*

___

###  isJust

▸ **isJust**‹**R**›(`maybe`: [Maybe](_src_maybe_.maybe.md)‹R›): *maybe is Just<R>*

*Defined in [src/maybe.ts:465](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L465)*

Standalone type guard for 'just'

Userful for passing as a predicate to collection transformers

**Type parameters:**

▪ **R**

underlying value type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybe` | [Maybe](_src_maybe_.maybe.md)‹R› | Maybe instance |

**Returns:** *maybe is Just<R>*

'true' in case wrapped value exists (and resolves argument type to be 'just')

___

###  isNothing

▸ **isNothing**‹**R**›(`maybe`: [Maybe](_src_maybe_.maybe.md)‹R›): *maybe is Nothing<never>*

*Defined in [src/maybe.ts:478](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L478)*

Standalone type guard for 'nothing'

Userful for passing as a predicate to collection transformers

**Type parameters:**

▪ **R**

underlying value type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybe` | [Maybe](_src_maybe_.maybe.md)‹R› | Maybe instance |

**Returns:** *maybe is Nothing<never>*

'true' in case wrapped value is 'nothing' (and resolves argument type to be 'nothing')

___

###  just

▸ **just**‹**R**›(`value`: R): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:412](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L412)*

Non-empty monad constructor

**Type parameters:**

▪ **R**

underlying type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | underlying value |

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

'just value'

___

###  nothing

▸ **nothing**(): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:421](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L421)*

Empty monad constructor

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

'nothing'

___

###  someJust

▸ **someJust**‹**R**›(`maybes`: [Maybe](_src_maybe_.maybe.md)‹R›[]): *maybes is Just<R>[]*

*Defined in [src/maybe.ts:498](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L498)*

Standalone list predicate

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybes` | [Maybe](_src_maybe_.maybe.md)‹R›[] | a list of Maybe |

**Returns:** *maybes is Just<R>[]*

true in case al east one list element is Just

___

###  someNothing

▸ **someNothing**‹**R**›(`maybes`: [Maybe](_src_maybe_.maybe.md)‹R›[]): *maybes is Nothing<never>[]*

*Defined in [src/maybe.ts:518](https://github.com/lammonaaf/t-tasks/blob/aa45fa7/src/maybe.ts#L518)*

Standalone list predicate

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`maybes` | [Maybe](_src_maybe_.maybe.md)‹R›[] | a list of Maybe |

**Returns:** *maybes is Nothing<never>[]*

true in case at least one list element is Nothing
