[t-tasks](../README.md) / [Exports](../modules.md) / Right

# Interface: Right<R, L\>

Right (correct) value of type R

Either data type specialization representing a correct value

## Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |
| `L` | underlying error type (needed for type merging, in fact alwas considered to be never) |

## Table of contents

### Properties

- [right](Right.md#right)

### Methods

- [chain](Right.md#chain)
- [isLeft](Right.md#isleft)
- [isRight](Right.md#isright)
- [map](Right.md#map)
- [matchChain](Right.md#matchchain)
- [matchMap](Right.md#matchmap)
- [matchTap](Right.md#matchtap)
- [orChain](Right.md#orchain)
- [orMap](Right.md#ormap)
- [orTap](Right.md#ortap)
- [tap](Right.md#tap)

## Properties

### right

• `Readonly` **right**: `R`

#### Defined in

[either.ts:10](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L10)

## Methods

### chain

▸ **chain**<`R2`, `L2`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

Either composition function

Applied to 'right value' returns 'op(value)'
Applied to 'left error' returns self without invoking composition function

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer function result's underlying value type |
| `L2` | transformer function result's underlying error type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> | transformer to be invoked with underlying value |

#### Returns

[`Right`](Right.md)<`R2`, `never`\>

'op(value)' or 'left error'

#### Defined in

[either.ts:104](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L104)

▸ **chain**<`R2`, `L2`\>(`op`): [`Left`](Left.md)<`never`, `L2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L2`\>

#### Defined in

[either.ts:105](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L105)

▸ **chain**<`R2`, `L2`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L2`\>

#### Defined in

[either.ts:106](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L106)

▸ **chain**<`R2`, `L2`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L`\>

#### Defined in

[either.ts:108](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L108)

▸ **chain**<`R2`, `L2`\>(`op`): [`Left`](Left.md)<`never`, `L` \| `L2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L` \| `L2`\>

#### Defined in

[either.ts:109](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L109)

▸ **chain**<`R2`, `L2`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L` \| `L2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L` \| `L2`\>

#### Defined in

[either.ts:110](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L110)

___

### isLeft

▸ **isLeft**(): this is Left<R, L\>

Either type guard for 'left'

**`example`**
```typescript
if (either.isLeft()) {
  console.error(either.left)
}
```

#### Returns

this is Left<R, L\>

'true' in case this is 'left error' (and resolves type to be 'left')

#### Defined in

[either.ts:193](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L193)

___

### isRight

▸ **isRight**(): this is Right<R, L\>

Either type guard for 'right'

**`example`**
```typescript
if (either.isRight()) {
  console.log(either.right)
}
```

#### Returns

this is Right<R, L\>

'true' in case this is 'right value' (and resolves type to be 'right')

#### Defined in

[either.ts:179](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L179)

___

### map

▸ **map**<`R2`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

Either transformer function

Applied to 'right value' returns 'right op(value)'
Applied to 'left error' returns self without invoking transformer

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer function's return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `R2` | transformer to be invoked with underlying value |

#### Returns

[`Right`](Right.md)<`R2`, `never`\>

'right op(value)' or 'left error'

#### Defined in

[either.ts:57](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L57)

▸ **map**<`R2`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => `R2` |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L`\>

#### Defined in

[either.ts:59](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L59)

___

### matchChain

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

Either pattern matching composition function

Applied to 'right value' returns 'op.right(value)'
Applied to 'left error' returns 'op.left(error)'

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R2` | `R2` | right transformer function result's underlying value type |
| `L2` | `L2` | right transformer function result's underlying error type |
| `R3` | `R2` | left transformer function result's underlying value type |
| `L3` | `L2` | left transformer function result's underlying error type |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R2`, `never`\>

'op(value)' or 'op(error)'

#### Defined in

[either.ts:147](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L147)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Left`](Left.md)<`never`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L2`\>

#### Defined in

[either.ts:148](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L148)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R2`, `never`\>

#### Defined in

[either.ts:149](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L149)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Left`](Left.md)<`never`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L2`\>

#### Defined in

[either.ts:150](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L150)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L2`\>

#### Defined in

[either.ts:151](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L151)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L2`\>

#### Defined in

[either.ts:152](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L152)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R2`, `never`\>

#### Defined in

[either.ts:153](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L153)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Left`](Left.md)<`never`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L2`\>

#### Defined in

[either.ts:154](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L154)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L2`\>

#### Defined in

[either.ts:155](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L155)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Right`](Right.md)<`R2` \| `R3`, `never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R2` \| `R3`, `never`\>

#### Defined in

[either.ts:157](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L157)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R3`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R3`, `L2`\>

#### Defined in

[either.ts:158](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L158)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L3`\>

#### Defined in

[either.ts:159](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L159)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Left`](Left.md)<`never`, `L2` \| `L3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L2` \| `L3`\>

#### Defined in

[either.ts:160](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L160)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2` \| `R3`, `L2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2` \| `R3`, `L2`\>

#### Defined in

[either.ts:161](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L161)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L2` \| `L3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L2` \| `L3`\>

#### Defined in

[either.ts:162](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L162)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2` \| `R3`, `L3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2` \| `R3`, `L3`\>

#### Defined in

[either.ts:163](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L163)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R3`, `L2` \| `L3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R3`, `L2` \| `L3`\>

#### Defined in

[either.ts:164](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L164)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R2` \| `R3`, `L2` \| `L3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `L2` | `L2` |
| `R3` | `R2` |
| `L3` | `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2` \| `R3`, `L2` \| `L3`\>

#### Defined in

[either.ts:165](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L165)

___

### matchMap

▸ **matchMap**<`R2`, `R3`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

Either pattern matching transformer function

Applied to 'right value' returns 'right op.right(value)'
Applied to 'left error' returns 'right op.left(error)'

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R2` | `R2` | right transformer function's return type |
| `R3` | `R2` | left transformer function's return type |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => `R3` |
| `op.right` | (`value`: `R`) => `R2` |

#### Returns

[`Right`](Right.md)<`R2`, `never`\>

'right op.right(value)' or 'right op.left(error)'

#### Defined in

[either.ts:88](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L88)

▸ **matchMap**<`R2`, `R3`\>(`op`): [`Right`](Right.md)<`R2` \| `R3`, `never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => `R3` |
| `op.right` | (`value`: `R`) => `R2` |

#### Returns

[`Right`](Right.md)<`R2` \| `R3`, `never`\>

#### Defined in

[either.ts:90](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L90)

___

### matchTap

▸ **matchTap**(`op`): [`Right`](Right.md)<`R`, `L`\>

Either pattern matching peeker function

Applied to 'right value' returns self invoking op.right(value) in process
Applied to 'left error' returns self invoking op.left(error) in process

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.left` | (`error`: `any`) => `void` |
| `op.right` | (`value`: `R`) => `void` |

#### Returns

[`Right`](Right.md)<`R`, `L`\>

self

#### Defined in

[either.ts:44](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L44)

___

### orChain

▸ **orChain**<`R2`, `L2`\>(`op`): [`Right`](Right.md)<`R`, `never`\>

Either composition function

Applied to 'right value' returns self without invoking composition function
Applied to 'left error' returns 'op(error)'

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer function result's underlying value type |
| `L2` | transformer function result's underlying error type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`error`: `L`) => [`Right`](Right.md)<`R2`, `L2`\> | transformer to be invoked with underlying value |

#### Returns

[`Right`](Right.md)<`R`, `never`\>

'right value' or 'op(error)'

#### Defined in

[either.ts:124](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L124)

▸ **orChain**<`R2`, `L2`\>(`op`): [`Right`](Right.md)<`R`, `never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`error`: `L`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R`, `never`\>

#### Defined in

[either.ts:125](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L125)

▸ **orChain**<`R2`, `L2`\>(`op`): [`Right`](Right.md)<`R`, `never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`error`: `L`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R`, `never`\>

#### Defined in

[either.ts:126](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L126)

▸ **orChain**<`R2`, `L2`\>(`op`): [`Right`](Right.md)<`R` \| `R2`, `never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`error`: `L`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R` \| `R2`, `never`\>

#### Defined in

[either.ts:128](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L128)

▸ **orChain**<`R2`, `L2`\>(`op`): [`Either`](../modules.md#either)<`R`, `L2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`error`: `L`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R`, `L2`\>

#### Defined in

[either.ts:129](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L129)

▸ **orChain**<`R2`, `L2`\>(`op`): [`Either`](../modules.md#either)<`R` \| `R2`, `L2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `L2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`error`: `L`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R` \| `R2`, `L2`\>

#### Defined in

[either.ts:130](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L130)

___

### orMap

▸ **orMap**<`R2`\>(`op`): [`Right`](Right.md)<`R`, `never`\>

Either fallback transformer function

Applied to 'right value' returns self without invoking transformer
Applied to 'left error' returns 'right op(error)'

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`error`: `L`) => `R2` | transformer to be invoked with underlying error |

#### Returns

[`Right`](Right.md)<`R`, `never`\>

'right value' or 'right op(error)'

#### Defined in

[either.ts:71](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L71)

▸ **orMap**<`R2`\>(`op`): [`Right`](Right.md)<`R` \| `R2`, `never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`error`: `L`) => `R2` |

#### Returns

[`Right`](Right.md)<`R` \| `R2`, `never`\>

#### Defined in

[either.ts:73](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L73)

___

### orTap

▸ **orTap**(`op`): [`Right`](Right.md)<`R`, `L`\>

Either fallback peeker function

Applied to 'right value' returns self without invoking callback
Applied to 'left error' returns self invoking op(error) in process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`error`: `L`) => `void` | function to be invoked with underlying error |

#### Returns

[`Right`](Right.md)<`R`, `L`\>

self

#### Defined in

[either.ts:32](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L32)

___

### tap

▸ **tap**(`op`): [`Right`](Right.md)<`R`, `L`\>

Either peeker function

Applied to 'right value' returns self invoking op(value) in process
Applied to 'left error' returns self without invoking callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `void` | function to be invoked with underlying value |

#### Returns

[`Right`](Right.md)<`R`, `L`\>

self

#### Defined in

[either.ts:21](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L21)
