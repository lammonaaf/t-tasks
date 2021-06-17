[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](_src_either_.md) › [Right](_src_either_.right.md)

# Namespace: Right ‹**R, L**›

Right (correct) value of type R

Either data type specialization representing a correct value

## Type parameters

▪ **R**

underlying value type

▪ **L**

underlying error type (needed for type merging, in fact alwas considered to be never)

## Index

### Properties

* [right](_src_either_.right.md#readonly-right)

### Methods

* [chain](_src_either_.right.md#chain)
* [isLeft](_src_either_.right.md#isleft)
* [isRight](_src_either_.right.md#isright)
* [map](_src_either_.right.md#map)
* [matchChain](_src_either_.right.md#matchchain)
* [matchMap](_src_either_.right.md#matchmap)
* [matchTap](_src_either_.right.md#matchtap)
* [orChain](_src_either_.right.md#orchain)
* [orMap](_src_either_.right.md#ormap)
* [orTap](_src_either_.right.md#ortap)
* [tap](_src_either_.right.md#tap)

## Properties

### `Readonly` right

▸ **right**‹**R**, **L**›(`right`: [Right](_src_either_.right.md)‹R, L›): *R*

*Defined in [src/either.ts:413](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L413)*

Standalone Right value extractor

Userful for passing as a function to collection transformers

**Type parameters:**

▪ **R**

underlying value type

▪ **L**

underlying error type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`right` | [Right](_src_either_.right.md)‹R, L› | Right instance |

**Returns:** *R*

underlying value

## Methods

###  chain

▸ **chain**‹**R2**, **L2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:104](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L104)*

Either composition function

Applied to 'right value' returns 'op(value)'
Applied to 'left error' returns self without invoking composition function

**Type parameters:**

▪ **R2**

transformer function result's underlying value type

▪ **L2**

transformer function result's underlying error type

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *[Right](_src_either_.right.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

'op(value)' or 'left error'

▸ **chain**‹**R2**, **L2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Left](_src_either_.left.md)‹never, L2›*

*Defined in [src/either.ts:105](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L105)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *[Left](_src_either_.left.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Left](_src_either_.left.md)‹never, L2›*

▸ **chain**‹**R2**, **L2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:106](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L106)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

▸ (`value`: R): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R2, L2›*

▸ **chain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R2, L›*

*Defined in [src/either.ts:108](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L108)*

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

*Defined in [src/either.ts:109](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L109)*

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

*Defined in [src/either.ts:110](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L110)*

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

*Defined in [src/either.ts:193](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L193)*

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

*Defined in [src/either.ts:179](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L179)*

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

▸ **map**‹**R2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:57](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L57)*

Either transformer function

Applied to 'right value' returns 'right op(value)'
Applied to 'left error' returns self without invoking transformer

**Type parameters:**

▪ **R2**

transformer function's return type

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

'right op(value)' or 'left error'

▸ **map**‹**R2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Either](_src_either_.either.md)‹R2, L›*

*Defined in [src/either.ts:59](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L59)*

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

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:147](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L147)*

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

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`left` | function | transformer to be invoked with underlying error in case of 'left' |
`right` | function | transformer to be invoked with underlying value in case of 'right' |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

'op(value)' or 'op(error)'

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Left](_src_either_.left.md)‹never, L2›*

*Defined in [src/either.ts:148](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L148)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Left](_src_either_.left.md)‹never, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:149](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L149)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Left](_src_either_.left.md)‹never, L2›*

*Defined in [src/either.ts:150](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L150)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Left](_src_either_.left.md)‹never, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:151](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L151)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:152](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L152)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:153](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L153)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Left](_src_either_.left.md)‹never, L2›*

*Defined in [src/either.ts:154](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L154)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Left](_src_either_.left.md)‹never, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Either](_src_either_.either.md)‹R2, L2›*

*Defined in [src/either.ts:155](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L155)*

**Type parameters:**

▪ **R2**

▪ **L2**

▪ **R3**

▪ **L3**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type |
------ | ------ |
`left` | function |
`right` | function |

**Returns:** *[Either](_src_either_.either.md)‹R2, L2›*

▸ **matchChain**‹**R2**, **L2**, **R3**, **L3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2 | R3, never›*

*Defined in [src/either.ts:157](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L157)*

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

*Defined in [src/either.ts:158](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L158)*

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

*Defined in [src/either.ts:159](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L159)*

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

*Defined in [src/either.ts:160](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L160)*

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

*Defined in [src/either.ts:161](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L161)*

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

*Defined in [src/either.ts:162](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L162)*

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

*Defined in [src/either.ts:163](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L163)*

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

*Defined in [src/either.ts:164](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L164)*

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

*Defined in [src/either.ts:165](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L165)*

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

▸ **matchMap**‹**R2**, **R3**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2, never›*

*Defined in [src/either.ts:88](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L88)*

Either pattern matching transformer function

Applied to 'right value' returns 'right op.right(value)'
Applied to 'left error' returns 'right op.left(error)'

**Type parameters:**

▪ **R2**

right transformer function's return type

▪ **R3**

left transformer function's return type

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *object*

Name | Type | Description |
------ | ------ | ------ |
`left` | function | transformer to be invoked with underlying error in case of 'left' |
`right` | function | transformer to be invoked with underlying value in case of 'right' |

**Returns:** *[Right](_src_either_.right.md)‹R2, never›*

'right op.right(value)' or 'right op.left(error)'

▸ **matchMap**‹**R2**, **R3**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: object): *[Right](_src_either_.right.md)‹R2 | R3, never›*

*Defined in [src/either.ts:90](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L90)*

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

*Defined in [src/either.ts:44](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L44)*

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

▸ **orChain**‹**R2**, **L2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R, never›*

*Defined in [src/either.ts:124](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L124)*

Either composition function

Applied to 'right value' returns self without invoking composition function
Applied to 'left error' returns 'op(error)'

**Type parameters:**

▪ **R2**

transformer function result's underlying value type

▪ **L2**

transformer function result's underlying error type

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying value

▸ (`error`: L): *[Right](_src_either_.right.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R, never›*

'right value' or 'op(error)'

▸ **orChain**‹**R2**, **L2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R, never›*

*Defined in [src/either.ts:125](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L125)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *[Left](_src_either_.left.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R, never›*

▸ **orChain**‹**R2**, **L2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R, never›*

*Defined in [src/either.ts:126](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L126)*

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

▸ (`error`: L): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R, never›*

▸ **orChain**‹**R2**, **L2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R | R2, never›*

*Defined in [src/either.ts:128](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L128)*

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

*Defined in [src/either.ts:129](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L129)*

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

*Defined in [src/either.ts:130](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L130)*

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

▸ **orMap**‹**R2**›(`this`: [Right](_src_either_.right.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R, never›*

*Defined in [src/either.ts:71](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L71)*

Either fallback transformer function

Applied to 'right value' returns self without invoking transformer
Applied to 'left error' returns 'right op(error)'

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **this**: *[Right](_src_either_.right.md)‹R, L›*

▪ **op**: *function*

transformer to be invoked with underlying error

▸ (`error`: L): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R, never›*

'right value' or 'right op(error)'

▸ **orMap**‹**R2**›(`this`: [Either](_src_either_.either.md)‹R, L›, `op`: function): *[Right](_src_either_.right.md)‹R | R2, never›*

*Defined in [src/either.ts:73](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L73)*

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

*Defined in [src/either.ts:32](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L32)*

Either fallback peeker function

Applied to 'right value' returns self without invoking callback
Applied to 'left error' returns self invoking op(error) in process

**Parameters:**

▪ **op**: *function*

function to be invoked with underlying error

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

*Defined in [src/either.ts:21](https://github.com/lammonaaf/t-tasks/blob/26c5046/src/either.ts#L21)*

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
