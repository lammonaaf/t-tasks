[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](_src_maybe_.md) › [Just](_src_maybe_.just.md)

# Namespace: Just ‹**R**›

Just a value

Maybe data type specialization representing an existing value

## Type parameters

▪ **R**

underlying value

## Index

### Properties

* [just](_src_maybe_.just.md#readonly-just)

### Methods

* [chain](_src_maybe_.just.md#chain)
* [isJust](_src_maybe_.just.md#isjust)
* [isNothing](_src_maybe_.just.md#isnothing)
* [map](_src_maybe_.just.md#map)
* [matchChain](_src_maybe_.just.md#matchchain)
* [matchMap](_src_maybe_.just.md#matchmap)
* [matchTap](_src_maybe_.just.md#matchtap)
* [orChain](_src_maybe_.just.md#orchain)
* [orMap](_src_maybe_.just.md#ormap)
* [orTap](_src_maybe_.just.md#ortap)
* [tap](_src_maybe_.just.md#tap)

## Properties

### `Readonly` just

▸ **just**‹**R**›(`just`: [Just](_src_maybe_.just.md)‹R›): *R*

*Defined in [src/maybe.ts:397](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L397)*

Standalone Just value extractor

Userful for passing as a function to collection transformers

**Type parameters:**

▪ **R**

underlying value type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`just` | [Just](_src_maybe_.just.md)‹R› | Just instance |

**Returns:** *R*

underlying value

## Methods

###  chain

▸ **chain**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:102](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L102)*

Maybe composition function

Applied to 'just value' returns 'op(value)'
Applied to 'nothing' returns self without invoking composition function

**Type parameters:**

▪ **R2**

transformer function result's underlying type

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *[Just](_src_maybe_.just.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

'op(value)' or 'nothing'

▸ **chain**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:103](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L103)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Nothing](_src_maybe_.nothing.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **chain**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:104](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L104)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

▸ (`value`: R): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **chain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:106](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L106)*

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

*Defined in [src/maybe.ts:107](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L107)*

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

*Defined in [src/maybe.ts:108](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L108)*

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

*Defined in [src/maybe.ts:174](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L174)*

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

*Defined in [src/maybe.ts:188](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L188)*

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

▸ **map**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:56](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L56)*

Maybe transformer function

Applied to 'just value' returns 'just op(value)'
Applied to 'nothing' returns self without invoking transformer

**Type parameters:**

▪ **R2**

transformer function's return type

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

'just op(value)' or 'nothing'

▸ **map**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:58](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L58)*

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

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:142](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L142)*

Maybe patter matching composition function

Applied to 'just value' returns 'op.just(value)'
Applied to 'nothing' returns op.nothing()

**Type parameters:**

▪ **R2**

just transformer function result's underlying type

▪ **R3**

nothing transformer function result's underlying type

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`just` | function | transformer to be invoked with underlying value in case of just |
`nothing` | function | transformer to be invoked in case of nothing |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

'op.just(value)' or 'op.nothing()'

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:143](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L143)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:144](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L144)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:145](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L145)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:146](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L146)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Nothing](_src_maybe_.nothing.md)‹never›*

*Defined in [src/maybe.ts:147](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L147)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Nothing](_src_maybe_.nothing.md)‹never›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:148](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L148)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:149](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L149)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:150](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L150)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`just` | function |
`nothing` | function |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

▸ **matchChain**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2 | R3›*

*Defined in [src/maybe.ts:152](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L152)*

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

*Defined in [src/maybe.ts:153](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L153)*

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

*Defined in [src/maybe.ts:154](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L154)*

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

*Defined in [src/maybe.ts:155](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L155)*

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

*Defined in [src/maybe.ts:156](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L156)*

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

*Defined in [src/maybe.ts:157](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L157)*

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

*Defined in [src/maybe.ts:158](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L158)*

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

*Defined in [src/maybe.ts:159](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L159)*

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

*Defined in [src/maybe.ts:160](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L160)*

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

▸ **matchMap**‹**R2**, **R3**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2›*

*Defined in [src/maybe.ts:87](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L87)*

Maybe patter matching transformer function

Applied to 'just value' returns 'just op.just(value)'
Applied to 'nothing' returns 'just op.nothing()'

**Type parameters:**

▪ **R2**

just transformer function's return type

▪ **R3**

nothing transformer function's return type

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`just` | function | transformer to be invoked with underlying value in case of just |
`nothing` | function | transformer to be invoked in case of nothing |

**Returns:** *[Just](_src_maybe_.just.md)‹R2›*

'just op.just(value)' or 'just op.nothing()'

▸ **matchMap**‹**R2**, **R3**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: object): *[Just](_src_maybe_.just.md)‹R2 | R3›*

*Defined in [src/maybe.ts:89](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L89)*

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

*Defined in [src/maybe.ts:43](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L43)*

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

▸ **orChain**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:121](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L121)*

Maybe fallback composition function

Applied to 'just value' returns self witjout invoking composition function
Applied to 'nothing' returns op()

**Type parameters:**

▪ **R2**

transformer function result's underlying type

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

transformer to be invoked

▸ (): *[Just](_src_maybe_.just.md)‹R2›*

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

'just value' or 'op()'

▸ **orChain**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:122](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L122)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

▸ (): *[Nothing](_src_maybe_.nothing.md)‹R2›*

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

▸ **orChain**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:123](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L123)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

▸ (): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

▸ **orChain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R | R2›*

*Defined in [src/maybe.ts:125](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L125)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (): *[Just](_src_maybe_.just.md)‹R2›*

**Returns:** *[Just](_src_maybe_.just.md)‹R | R2›*

▸ **orChain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R›*

*Defined in [src/maybe.ts:126](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L126)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (): *[Nothing](_src_maybe_.nothing.md)‹R2›*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R›*

▸ **orChain**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Maybe](_src_maybe_.maybe.md)‹R | R2›*

*Defined in [src/maybe.ts:127](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L127)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Maybe](_src_maybe_.maybe.md)‹R›*

▪ **op**: *function*

▸ (): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R | R2›*

___

###  orMap

▸ **orMap**‹**R2**›(`this`: [Just](_src_maybe_.just.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R›*

*Defined in [src/maybe.ts:70](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L70)*

Maybe fallback transformer function

Applied to 'just value' returns self without invoking transformer
Applied to 'nothing' returns 'just op()'

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Just](_src_maybe_.just.md)‹R›*

▪ **op**: *function*

function to be invoked

▸ (): *R2*

**Returns:** *[Just](_src_maybe_.just.md)‹R›*

'just value' or 'just op()'

▸ **orMap**‹**R2**›(`this`: [Maybe](_src_maybe_.maybe.md)‹R›, `op`: function): *[Just](_src_maybe_.just.md)‹R | R2›*

*Defined in [src/maybe.ts:72](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L72)*

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

*Defined in [src/maybe.ts:31](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L31)*

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

*Defined in [src/maybe.ts:20](https://github.com/lammonaaf/t-tasks/blob/77f617e/src/maybe.ts#L20)*

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
