[t-tasks](../README.md) / [Exports](../modules.md) / Left

# Interface: Left<R, L\>

Left (erroneous) value of type L

Either data type specialization representing an erroneous value

**`remplate`** R underlying value type (needed for type merging, in fact alwas considered to be never)

## Type parameters

| Name | Description |
| :------ | :------ |
| `R` | - |
| `L` | underlying error type |

## Table of contents

### Properties

- [left](Left.md#left)

### Methods

- [chain](Left.md#chain)
- [isLeft](Left.md#isleft)
- [isRight](Left.md#isright)
- [map](Left.md#map)
- [matchChain](Left.md#matchchain)
- [matchMap](Left.md#matchmap)
- [matchTap](Left.md#matchtap)
- [orChain](Left.md#orchain)
- [orMap](Left.md#ormap)
- [orTap](Left.md#ortap)
- [tap](Left.md#tap)

## Properties

### left

• `Readonly` **left**: `L`

#### Defined in

[either.ts:205](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L205)

## Methods

### chain

▸ **chain**<`R2`, `L2`\>(`op`): [`Left`](Left.md)<`never`, `L`\>

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

[`Left`](Left.md)<`never`, `L`\>

'op(value)' or 'left error'

#### Defined in

[either.ts:299](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L299)

▸ **chain**<`R2`, `L2`\>(`op`): [`Left`](Left.md)<`never`, `L`\>

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

[`Left`](Left.md)<`never`, `L`\>

#### Defined in

[either.ts:300](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L300)

▸ **chain**<`R2`, `L2`\>(`op`): [`Left`](Left.md)<`never`, `L`\>

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

[`Left`](Left.md)<`never`, `L`\>

#### Defined in

[either.ts:301](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L301)

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

[either.ts:303](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L303)

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

[either.ts:304](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L304)

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

[either.ts:305](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L305)

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

[either.ts:388](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L388)

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

[either.ts:374](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L374)

___

### map

▸ **map**<`R2`\>(`op`): [`Left`](Left.md)<`never`, `L`\>

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

[`Left`](Left.md)<`never`, `L`\>

'right op(value)' or 'left error'

#### Defined in

[either.ts:252](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L252)

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

[either.ts:254](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L254)

___

### matchChain

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Right`](Right.md)<`R3`, `never`\>

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

[`Right`](Right.md)<`R3`, `never`\>

'op(value)' or 'op(error)'

#### Defined in

[either.ts:342](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L342)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Right`](Right.md)<`R3`, `never`\>

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

[`Right`](Right.md)<`R3`, `never`\>

#### Defined in

[either.ts:343](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L343)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Left`](Left.md)<`never`, `L3`\>

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

[`Left`](Left.md)<`never`, `L3`\>

#### Defined in

[either.ts:344](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L344)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Left`](Left.md)<`never`, `L3`\>

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

[`Left`](Left.md)<`never`, `L3`\>

#### Defined in

[either.ts:345](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L345)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Right`](Right.md)<`R3`, `never`\>

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

[`Right`](Right.md)<`R3`, `never`\>

#### Defined in

[either.ts:346](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L346)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Left`](Left.md)<`never`, `L3`\>

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

[`Left`](Left.md)<`never`, `L3`\>

#### Defined in

[either.ts:347](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L347)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R3`, `L3`\>

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

[`Either`](../modules.md#either)<`R3`, `L3`\>

#### Defined in

[either.ts:348](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L348)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R3`, `L3`\>

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

[`Either`](../modules.md#either)<`R3`, `L3`\>

#### Defined in

[either.ts:349](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L349)

▸ **matchChain**<`R2`, `L2`, `R3`, `L3`\>(`op`): [`Either`](../modules.md#either)<`R3`, `L3`\>

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

[`Either`](../modules.md#either)<`R3`, `L3`\>

#### Defined in

[either.ts:350](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L350)

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

[either.ts:352](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L352)

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

[either.ts:353](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L353)

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

[either.ts:354](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L354)

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

[either.ts:355](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L355)

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

[either.ts:356](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L356)

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

[either.ts:357](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L357)

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

[either.ts:358](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L358)

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

[either.ts:359](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L359)

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

[either.ts:360](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L360)

___

### matchMap

▸ **matchMap**<`R2`, `R3`\>(`op`): [`Right`](Right.md)<`R3`, `never`\>

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

[`Right`](Right.md)<`R3`, `never`\>

'right op.right(value)' or 'right op.left(error)'

#### Defined in

[either.ts:283](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L283)

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

[either.ts:285](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L285)

___

### matchTap

▸ **matchTap**(`op`): [`Left`](Left.md)<`R`, `L`\>

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

[`Left`](Left.md)<`R`, `L`\>

self

#### Defined in

[either.ts:239](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L239)

___

### orChain

▸ **orChain**<`R2`, `L2`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

Either fallback composition function

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

[`Right`](Right.md)<`R2`, `never`\>

'right value' or 'op(error)'

#### Defined in

[either.ts:319](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L319)

▸ **orChain**<`R2`, `L2`\>(`op`): [`Left`](Left.md)<`never`, `L2`\>

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

[`Left`](Left.md)<`never`, `L2`\>

#### Defined in

[either.ts:320](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L320)

▸ **orChain**<`R2`, `L2`\>(`op`): [`Either`](../modules.md#either)<`R2`, `L2`\>

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

[`Either`](../modules.md#either)<`R2`, `L2`\>

#### Defined in

[either.ts:321](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L321)

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

[either.ts:323](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L323)

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

[either.ts:324](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L324)

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

[either.ts:325](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L325)

___

### orMap

▸ **orMap**<`R2`\>(`op`): [`Right`](Right.md)<`R2`, `never`\>

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

[`Right`](Right.md)<`R2`, `never`\>

'right value' or 'right op(error)'

#### Defined in

[either.ts:266](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L266)

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

[either.ts:268](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L268)

___

### orTap

▸ **orTap**(`op`): [`Left`](Left.md)<`R`, `L`\>

Either fallback peeker function

Applied to 'right value' returns self without invoking callback
Applied to 'left error' returns self invoking op(error) in process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`error`: `L`) => `void` | function to be invoked with underlying value |

#### Returns

[`Left`](Left.md)<`R`, `L`\>

self

#### Defined in

[either.ts:227](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L227)

___

### tap

▸ **tap**(`op`): [`Left`](Left.md)<`R`, `L`\>

Either peeker function

Applied to 'right value' returns self invoking op(value) in process
Applied to 'left error' returns self without invoking callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `void` | function to be invoked with underlying value |

#### Returns

[`Left`](Left.md)<`R`, `L`\>

self

#### Defined in

[either.ts:216](https://github.com/lammonaaf/t-tasks/blob/1760ee2/src/either.ts#L216)
