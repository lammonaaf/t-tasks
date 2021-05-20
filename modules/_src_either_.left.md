[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](_src_either_.md) › [Left](_src_either_.left.md)

# Namespace: Left ‹**R, L**›

Left (erroneous) value of type L

Either data type specialization representing an erroneous value

**`remplate`** R underlying value type (needed for type merging, in fact alwas considered to be never)

## Type parameters

▪ **R**

▪ **L**

underlying error type

## Index

### Properties

* [left](_src_either_.left.md#readonly-left)

### Methods

* [chain](_src_either_.left.md#chain)
* [isLeft](_src_either_.left.md#isleft)
* [isRight](_src_either_.left.md#isright)
* [map](_src_either_.left.md#map)
* [matchChain](_src_either_.left.md#matchchain)
* [matchMap](_src_either_.left.md#matchmap)
* [matchTap](_src_either_.left.md#matchtap)
* [orChain](_src_either_.left.md#orchain)
* [orMap](_src_either_.left.md#ormap)
* [orTap](_src_either_.left.md#ortap)
* [tap](_src_either_.left.md#tap)

## Properties

### `Readonly` left

▸ **left**‹**R**, **L**›(`left`: [Left](_src_either_.left.md)‹R, L›): *L*

*Defined in [src/either.ts:429](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L429)*

Standalone Left error extractor

Userful for passing as a function to collection transformers

**Type parameters:**

▪ **R**

underlying value type

▪ **L**

underlying error type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`left` | [Left](_src_either_.left.md)‹R, L› | Left instance |

**Returns:** *L*

underlying error

## Methods

###  chain

▸ **chain**‹**R2**, **L2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:299](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L299)*

Either composition function

Applied to 'right value' returns 'op(value)'
Applied to 'left error' returns self without invoking composition function

**Type parameters:**

▪ **R2**

transformer function result's underlying value type

▪ **L2**

transformer function result's underlying error type

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *[Right](_src_either_.right.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

'op(value)' or 'left error'

▸ **chain**‹**R2**, **L2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:300](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L300)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *[Left](_src_either_.left.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

▸ **chain**‹**R2**, **L2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:301](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L301)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

▸ **chain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R2, L›*

*Defined in [src/either.ts:303](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L303)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *[Right](_src_either_.right.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R2, L›*

▸ **chain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Left](_src_either_.left.md)‹never, L | L2›*

*Defined in [src/either.ts:304](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L304)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *[Left](_src_either_.left.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Left](_src_either_.left.md)‹never, L | L2›*

▸ **chain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R2, L | L2›*

*Defined in [src/either.ts:305](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L305)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R2, L | L2›*

___

###  isLeft

▸ **isLeft**(): *this is Left‹R, L›*

*Defined in [src/either.ts:388](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L388)*

Either type guard for 'left'

**`example`** 
```typescript
if (either.isLeft()) {
  console.error(either.left)
}
```

**Returns:** *this is Left‹R, L›*

'true' in case this is 'left error' (and resolves type to be 'left')

___

###  isRight

▸ **isRight**(): *this is Right‹R, L›*

*Defined in [src/either.ts:374](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L374)*

Either type guard for 'right'

**`example`** 
```typescript
if (either.isRight()) {
  console.log(either.right)
}
```

**Returns:** *this is Right‹R, L›*

'true' in case this is 'right value' (and resolves type to be 'right')

___

###  map

▸ **map**‹**R2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Left](_src_either_.left.md)‹never, L›*

*Defined in [src/either.ts:252](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L252)*

Either transformer function

Applied to 'right value' returns 'right op(value)'
Applied to 'left error' returns self without invoking transformer

**Type parameters:**

▪ **R2**

transformer function's return type

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Left](_src_either_.left.md)‹never, L›*

'right op(value)' or 'left error'

▸ **map**‹**R2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R2, L›*

*Defined in [src/either.ts:254](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L254)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R2, L›*

___

###  matchChain

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R3, never›*

*Defined in [src/either.ts:342](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L342)*

Either pattern matching composition function

Applied to 'right value' returns 'op.right(value)'
Applied to 'left error' returns 'op.left(error)'

**Type parameters:**

▪ **R2**

right transformer function result's underlying value type

▪ **L2**

right transformer function result's underlying error type

▪ **R3**

left transformer function result's underlying value type

▪ **L3**

left transformer function result's underlying error type

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`left` | function | transformer to be invoked with underlying error in case of 'left' |
`right` | function | transformer to be invoked with underlying value in case of 'right' |

**Returns:** *[Right](_src_either_.right.md)‹R3, never›*

'op(value)' or 'op(error)'

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R3, never›*

*Defined in [src/either.ts:343](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L343)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Right](_src_either_.right.md)‹R3, never›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Left](_src_either_.left.md)‹never, L3›*

*Defined in [src/either.ts:344](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L344)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Left](_src_either_.left.md)‹never, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Left](_src_either_.left.md)‹never, L3›*

*Defined in [src/either.ts:345](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L345)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Left](_src_either_.left.md)‹never, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R3, never›*

*Defined in [src/either.ts:346](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L346)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Right](_src_either_.right.md)‹R3, never›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Left](_src_either_.left.md)‹never, L3›*

*Defined in [src/either.ts:347](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L347)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Left](_src_either_.left.md)‹never, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R3, L3›*

*Defined in [src/either.ts:348](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L348)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R3, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R3, L3›*

*Defined in [src/either.ts:349](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L349)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R3, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R3, L3›*

*Defined in [src/either.ts:350](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L350)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R3, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2 | R3, never›*

*Defined in [src/either.ts:352](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L352)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Right](_src_either_.right.md)‹R2 | R3, never›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R3, L2›*

*Defined in [src/either.ts:353](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L353)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R3, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2, L3›*

*Defined in [src/either.ts:354](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L354)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Left](_src_either_.left.md)‹never, L2 | L3›*

*Defined in [src/either.ts:355](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L355)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Left](_src_either_.left.md)‹never, L2 | L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2 | R3, L2›*

*Defined in [src/either.ts:356](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L356)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2 | R3, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2, L2 | L3›*

*Defined in [src/either.ts:357](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L357)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2, L2 | L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2 | R3, L3›*

*Defined in [src/either.ts:358](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L358)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2 | R3, L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R3, L2 | L3›*

*Defined in [src/either.ts:359](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L359)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R3, L2 | L3›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2 | R3, L2 | L3›*

*Defined in [src/either.ts:360](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L360)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2 | R3, L2 | L3›*

___

###  matchMap

▸ **matchMap**‹**R2**, **R3**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R3, never›*

*Defined in [src/either.ts:283](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L283)*

Either pattern matching transformer function

Applied to 'right value' returns 'right op.right(value)'
Applied to 'left error' returns 'right op.left(error)'

**Type parameters:**

▪ **R2**

right transformer function's return type

▪ **R3**

left transformer function's return type

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`left` | function | transformer to be invoked with underlying error in case of 'left' |
`right` | function | transformer to be invoked with underlying value in case of 'right' |

**Returns:** *[Right](_src_either_.right.md)‹R3, never›*

'right op.right(value)' or 'right op.left(error)'

▸ **matchMap**‹**R2**, **R3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2 | R3, never›*

*Defined in [src/either.ts:285](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L285)*

**Type parameters:**

▪ **R2**

▪ **R3**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Right](_src_either_.right.md)‹R2 | R3, never›*

___

###  matchTap

▸ **matchTap**(`op`: object): *this*

*Defined in [src/either.ts:239](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L239)*

Either pattern matching peeker function

Applied to 'right value' returns self invoking op.right(value) in process
Applied to 'left error' returns self invoking op.left(error) in process

**Parameters:**

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`left` | function | function to be invoked with underlying error in case of 'left' |
`right` | function | function to be invoked with underlying value in case of 'right' |

**Returns:** *this*

self

___

###  orChain

▸ **orChain**‹**R2**, **L2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:319](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L319)*

Either fallback composition function

Applied to 'right value' returns self without invoking composition function
Applied to 'left error' returns 'op(error)'

**Type parameters:**

▪ **R2**

transformer function result's underlying value type

▪ **L2**

transformer function result's underlying error type

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`error`: L): *[Right](_src_either_.right.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

'right value' or 'op(error)'

▸ **orChain**‹**R2**, **L2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Left](_src_either_.left.md)‹never, L2›*

*Defined in [src/either.ts:320](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L320)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *[Left](_src_either_.left.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Left](_src_either_.left.md)‹never, L2›*

▸ **orChain**‹**R2**, **L2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:321](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L321)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Either](_src_either_.either.md)‹R2, L2›*

▸ **orChain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R | R2, never›*

*Defined in [src/either.ts:323](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L323)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *[Right](_src_either_.right.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R | R2, never›*

▸ **orChain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R, L2›*

*Defined in [src/either.ts:324](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L324)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *[Left](_src_either_.left.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Either](_src_either_.either.md)‹R, L2›*

▸ **orChain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R | R2, L2›*

*Defined in [src/either.ts:325](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L325)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Either](_src_either_.either.md)‹R | R2, L2›*

___

###  orMap

▸ **orMap**‹**R2**›(`this`: [Left](_src_either_.left.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:266](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L266)*

Either fallback transformer function

Applied to 'right value' returns self without invoking transformer
Applied to 'left error' returns 'right op(error)'

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Left](_src_either_.left.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying error

▸ (`error`: L): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

'right value' or 'right op(error)'

▸ **orMap**‹**R2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R | R2, never›*

*Defined in [src/either.ts:268](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L268)*

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Either](_src_either_.either.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R | R2, never›*

___

###  orTap

▸ **orTap**(`op`: function): *this*

*Defined in [src/either.ts:227](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L227)*

Either fallback peeker function

Applied to 'right value' returns self without invoking callback
Applied to 'left error' returns self invoking op(error) in process

**Parameters:**

▪ **op**: *function*

function to be invoked with underlying value

▸ (`error`: L): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *this*

self

___

###  tap

▸ **tap**(`op`: function): *this*

*Defined in [src/either.ts:216](https://github.com/lammonaaf/t-tasks/blob/5564904/src/either.ts#L216)*

Either peeker function

Applied to 'right value' returns self invoking op(value) in process
Applied to 'left error' returns self without invoking callback

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
