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

* [everyLeft](_src_either_.either.md#everyleft)
* [everyRight](_src_either_.either.md#everyright)
* [fromNullable](_src_either_.either.md#fromnullable)
* [fromOptional](_src_either_.either.md#fromoptional)
* [isLeft](_src_either_.either.md#isleft)
* [isRight](_src_either_.either.md#isright)
* [left](_src_either_.either.md#left)
* [right](_src_either_.either.md#right)
* [someLeft](_src_either_.either.md#someleft)
* [someRight](_src_either_.either.md#someright)

## Functions

###  everyLeft

▸ **everyLeft**‹**R**, **L**›(`eithers`: [Either](_src_either_.either.md)‹R, L›[]): *eithers is Left‹never, L›[]*

*Defined in [src/either.ts:542](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L542)*

Standalone list predicate

**Type parameters:**

▪ **R**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eithers` | [Either](_src_either_.either.md)‹R, L›[] | a list of Either |

**Returns:** *eithers is Left‹never, L›[]*

true in case every list element is Left

___

###  everyRight

▸ **everyRight**‹**R**, **L**›(`eithers`: [Either](_src_either_.either.md)‹R, L›[]): *eithers is Right‹R, never›[]*

*Defined in [src/either.ts:522](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L522)*

Standalone list predicate

**Type parameters:**

▪ **R**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eithers` | [Either](_src_either_.either.md)‹R, L›[] | a list of Either |

**Returns:** *eithers is Right‹R, never›[]*

true in case every list element is Right

___

###  fromNullable

▸ **fromNullable**‹**L**›(`value`: undefined, `error`: L): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:482](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L482)*

Either constructor from optional or nullable value

Resolves to 'left error' in case of undefined or null value and 'right value' otherwise

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | undefined | possibly undefined or nullable value |
`error` | L | error to use in case of undefined or nullable value |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

either 'right value' or 'left error'

▸ **fromNullable**‹**L**›(`value`: null, `error`: L): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:483](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L483)*

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | null |
`error` | L |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

▸ **fromNullable**‹**R**›(`value`: Exclude‹R, null | undefined›, `error`: unknown): *[Right](_src_either_.right.md)‹R, never›*

*Defined in [src/either.ts:484](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L484)*

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹R, null &#124; undefined› |
`error` | unknown |

**Returns:** *[Right](_src_either_.right.md)‹R, never›*

▸ **fromNullable**‹**R**, **L**›(`value`: R | null | undefined, `error`: L): *[Either](_src_either_.either.md)‹R, L›*

*Defined in [src/either.ts:485](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L485)*

**Type parameters:**

▪ **R**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | R &#124; null &#124; undefined |
`error` | L |

**Returns:** *[Either](_src_either_.either.md)‹R, L›*

___

###  fromOptional

▸ **fromOptional**‹**L**›(`value`: undefined, `error`: L): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:466](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L466)*

Either constructor from optional value

Resolves to 'left error' in case of undefined value and 'right value' otherwise

**Type parameters:**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | undefined | possibly undefined value |
`error` | L | error to use in case of undefined value |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

either 'right value' or 'left error'

▸ **fromOptional**‹**R**›(`value`: Exclude‹R, undefined›, `error`: unknown): *[Right](_src_either_.right.md)‹R, never›*

*Defined in [src/either.ts:467](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L467)*

**Type parameters:**

▪ **R**

**Parameters:**

Name | Type |
------ | ------ |
`value` | Exclude‹R, undefined› |
`error` | unknown |

**Returns:** *[Right](_src_either_.right.md)‹R, never›*

▸ **fromOptional**‹**R**, **L**›(`value`: R | undefined, `error`: L): *[Either](_src_either_.either.md)‹R, L›*

*Defined in [src/either.ts:468](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L468)*

**Type parameters:**

▪ **R**

▪ **L**

**Parameters:**

Name | Type |
------ | ------ |
`value` | R &#124; undefined |
`error` | L |

**Returns:** *[Either](_src_either_.either.md)‹R, L›*

___

###  isLeft

▸ **isLeft**‹**R**, **L**›(`either`: [Either](_src_either_.either.md)‹R, L›): *either is Left‹never, L›*

*Defined in [src/either.ts:512](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L512)*

Standalone type guard for 'left'

Userful for passing as a predicate to collection transformers

**Type parameters:**

▪ **R**

underlying value type

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`either` | [Either](_src_either_.either.md)‹R, L› | Either instance |

**Returns:** *either is Left‹never, L›*

'true' in case argument is 'left error' (and resolves type to be 'left')

___

###  isRight

▸ **isRight**‹**R**, **L**›(`either`: [Either](_src_either_.either.md)‹R, L›): *either is Right‹R, never›*

*Defined in [src/either.ts:499](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L499)*

Standalone type guard for 'right'

Userful for passing as a predicate to collection transformers

**Type parameters:**

▪ **R**

underlying value type

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`either` | [Either](_src_either_.either.md)‹R, L› | Either instance |

**Returns:** *either is Right‹R, never›*

'true' in case argument is 'right value' (and resolves type to be 'right')

___

###  left

▸ **left**‹**L**›(`error`: L): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:453](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L453)*

Left monad constructor

**Type parameters:**

▪ **L**

underlying error type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | L | underlying error |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

'left error'

___

###  right

▸ **right**‹**R**›(`value`: R): *[Right](_src_either_.right.md)‹R, never›*

*Defined in [src/either.ts:442](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L442)*

Right monad constructor

**Type parameters:**

▪ **R**

underlying value type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | R | underlying value |

**Returns:** *[Right](_src_either_.right.md)‹R, never›*

'right value'

___

###  someLeft

▸ **someLeft**‹**R**, **L**›(`eithers`: [Either](_src_either_.either.md)‹R, L›[]): *eithers is Left‹never, L›[]*

*Defined in [src/either.ts:552](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L552)*

Standalone list predicate

**Type parameters:**

▪ **R**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eithers` | [Either](_src_either_.either.md)‹R, L›[] | a list of Either |

**Returns:** *eithers is Left‹never, L›[]*

true in case at least one list element is Left

___

###  someRight

▸ **someRight**‹**R**, **L**›(`eithers`: [Either](_src_either_.either.md)‹R, L›[]): *eithers is Right‹R, never›[]*

*Defined in [src/either.ts:532](https://github.com/lammonaaf/t-tasks/blob/f3810a3/src/either.ts#L532)*

Standalone list predicate

**Type parameters:**

▪ **R**

▪ **L**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eithers` | [Either](_src_either_.either.md)‹R, L›[] | a list of Either |

**Returns:** *eithers is Right‹R, never›[]*

true in case at least one list element is Right
