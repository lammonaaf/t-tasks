[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](_src_maybe_.md) › [Nothing](_src_maybe_.nothing.md)

# Namespace: Nothing ‹**R**›

Absolutely Nothing

Maybe data type specialiation representing an absence of any value

## Type parameters

▪ **R**

## Index

### Methods

* [chain](_src_maybe_.nothing.md#chain)
* [isJust](_src_maybe_.nothing.md#isjust)
* [isNothing](_src_maybe_.nothing.md#isnothing)
* [map](_src_maybe_.nothing.md#map)
* [matchChain](_src_maybe_.nothing.md#matchchain)
* [matchMap](_src_maybe_.nothing.md#matchmap)
* [matchTap](_src_maybe_.nothing.md#matchtap)
* [orChain](_src_maybe_.nothing.md#orchain)
* [orMap](_src_maybe_.nothing.md#ormap)
* [orTap](_src_maybe_.nothing.md#ortap)
* [tap](_src_maybe_.nothing.md#tap)

## Methods

###  chain

▸ **chain**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:288](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L288)*

Maybe composition function

Applied to 'just value' returns 'op(value)'
Applied to 'nothing' returns self without invoking composition function

**Type parameters:**

▪ **R2**

transformer function result's underlying type

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *[Just](_src_maybe_.just.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

'op(value)' or 'nothing'

▸ **chain**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:289](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L289)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Nothing](_src_maybe_.nothing.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **chain**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:290](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L290)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **chain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:292](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L292)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Just](_src_maybe_.just.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **chain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:293](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L293)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Nothing](_src_maybe_.nothing.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **chain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:294](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L294)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

___

###  isJust

▸ **isJust**(): *this is Just‹R›*

*Defined in [src/maybe.ts:360](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L360)*

Maybe type guard for 'just'

**`example`** 
```typescript
if (maybe.isJust()) {
  console.log(maybe.just);
}
```

**Returns:** *this is Just‹R›*

'true' in case wrapped value exists (and resolves this type to be 'just')

___

###  isNothing

▸ **isNothing**(): *this is Nothing‹R›*

*Defined in [src/maybe.ts:374](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L374)*

Maybe type guard for 'nothing'

**`example`** 
```typescript
if (maybe.isNohing()) {
  console.log('nothing');
}
```

**Returns:** *this is Nothing‹R›*

'true' in case wrapped value is 'nothing' (and resolves this type to be 'nothing')

___

###  map

▸ **map**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:242](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L242)*

Maybe transformer function

Applied to 'just value' returns 'just op(value)'
Applied to 'nothing' returns self without invoking transformer

**Type parameters:**

▪ **R2**

transformer function's return type

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

'just op(value)' or 'nothing'

▸ **map**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:244](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L244)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

___

###  matchChain

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R3›*

*Defined in [src/maybe.ts:328](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L328)*

Maybe patter matching composition function

Applied to 'just value' returns 'op.just(value)'
Applied to 'nothing' returns op.nothing()

**Type parameters:**

▪ **R2**

just transformer function result's underlying type

▪ **R3**

nothing transformer function result's underlying type

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`just` | function | transformer to be invoked with underlying value in case of just |
`nothing` | function | transformer to be invoked in case of nothing |

**Returns:** *[Just](_src_maybe_.just.md)‹R3›*

'op.just(value)' or 'op.nothing()'

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:329](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L329)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R3›*

*Defined in [src/maybe.ts:330](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L330)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Just](_src_maybe_.just.md)‹R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:331](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L331)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R3›*

*Defined in [src/maybe.ts:332](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L332)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R3›*

*Defined in [src/maybe.ts:333](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L333)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R3›*

*Defined in [src/maybe.ts:334](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L334)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Just](_src_maybe_.just.md)‹R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:335](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L335)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R3›*

*Defined in [src/maybe.ts:336](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L336)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2 | R3›*

*Defined in [src/maybe.ts:338](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L338)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Just](_src_maybe_.just.md)‹R2 | R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:339](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L339)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R3›*

*Defined in [src/maybe.ts:340](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L340)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:341](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L341)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2 | R3›*

*Defined in [src/maybe.ts:342](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L342)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2 | R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R3›*

*Defined in [src/maybe.ts:343](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L343)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2 | R3›*

*Defined in [src/maybe.ts:344](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L344)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2 | R3›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:345](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L345)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2 | R3›*

*Defined in [src/maybe.ts:346](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L346)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2 | R3›*

___

###  matchMap

▸ **matchMap**‹**R2**, **R3**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R3›*

*Defined in [src/maybe.ts:273](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L273)*

Maybe patter matching transformer function

Applied to 'just value' returns 'just op.just(value)'
Applied to 'nothing' returns 'just op.nothing()'

**Type parameters:**

▪ **R2**

just transformer function's return type

▪ **R3**

nothing transformer function's return type

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`just` | function | transformer to be invoked with underlying value in case of just |
`nothing` | function | transformer to be invoked in case of nothing |

**Returns:** *[Just](_src_maybe_.just.md)‹R3›*

'just op.just(value)' or 'just op.nothing()'

▸ **matchMap**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2 | R3›*

*Defined in [src/maybe.ts:275](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L275)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Just](_src_maybe_.just.md)‹R2 | R3›*

___

###  matchTap

▸ **matchTap**(`op`: object): *this*

*Defined in [src/maybe.ts:229](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L229)*

Maybe patter matching peeker function

Applied to 'just value' returns self invoking op.just(value) in process
Applied to 'nothing' returns self invoking op.nothing() in process

**Parameters:**

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`just` | function | function to be invoked with underlying value in case of just |
`nothing` | function | function to be invoked in case of nothing |

**Returns:** *this*

self

___

###  orChain

▸ **orChain**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:307](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L307)*

Maybe fallback composition function

Applied to 'just value' returns self witjout invoking composition function
Applied to 'nothing' returns op()

**Type parameters:**

▪ **R2**

transformer function result's underlying type

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

transformer to be invoked

▸ (): *[Just](_src_maybe_.just.md)‹R2›*

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

'just value' or 'op()'

▸ **orChain**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:308](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L308)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

▸ (): *[Nothing](_src_maybe_.nothing.md)‹R2›*

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **orChain**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:309](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L309)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

▸ (): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **orChain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R | R2›*

*Defined in [src/maybe.ts:311](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L311)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (): *[Just](_src_maybe_.just.md)‹R2›*

**Returns:** *[Just](_src_maybe_.just.md)‹R | R2›*

▸ **orChain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R›*

*Defined in [src/maybe.ts:312](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L312)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (): *[Nothing](_src_maybe_.nothing.md)‹R2›*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R›*

▸ **orChain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R | R2›*

*Defined in [src/maybe.ts:313](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L313)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R | R2›*

___

###  orMap

▸ **orMap**‹**R2**›(`this`: [Nothing](_src_maybe_.nothing.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:256](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L256)*

Maybe fallback transformer function

Applied to 'just value' returns self without invoking transformer
Applied to 'nothing' returns 'just op()'

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Nothing](_src_maybe_.nothing.md)‹R›*

▪ **op**: *function*

function to be invoked

▸ (): *R2*

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

'just value' or 'just op()'

▸ **orMap**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R | R2›*

*Defined in [src/maybe.ts:258](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L258)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (): *R2*

**Returns:** *[Just](_src_maybe_.just.md)‹R | R2›*

___

###  orTap

▸ **orTap**(`op`: function): *this*

*Defined in [src/maybe.ts:217](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L217)*

Maybe fallback peeker function

Applied to 'just value' returns self without invoking callback
Applied to 'nothing' returns self invoking op() in process

**Parameters:**

▪ **op**: *function*

function to be invoked

▸ (): *void*

**Returns:** *this*

self

___

###  tap

▸ **tap**(`op`: function): *this*

*Defined in [src/maybe.ts:206](https://github.com/lammonaaf/t-tasks/blob/ef685cd/src/maybe.ts#L206)*

Maybe peeker function

Applied to 'just value' returns self invoking op(value) in process
Applied to 'nothing' returns self without invoking callback

**Parameters:**

▪ **op**: *function*

function to be invoked with underlying value

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *this*

self
