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

- [generator](Left.md#generator)
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

### generator

• **generator**: [`EitherGeneratorFunction`](../modules.md#eithergeneratorfunction)<[], `R`, [`Left`](Left.md)<`R`, `L`\>, `R`\>

Wrap Maybe to singleton generator

Userful in order to avoid ambiguous yied types

**`returns`** generator of Maybe wrapping this

#### Defined in

[either.ts:406](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L406)

___

### left

• `Readonly` **left**: `L`

#### Defined in

[either.ts:214](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L214)

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

[either.ts:308](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L308)

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

[either.ts:309](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L309)

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

[either.ts:310](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L310)

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

[either.ts:312](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L312)

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

[either.ts:313](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L313)

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

[either.ts:314](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L314)

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

[either.ts:397](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L397)

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

[either.ts:383](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L383)

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

[either.ts:261](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L261)

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

[either.ts:263](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L263)

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
| `op.left` | (`error`: `L`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R3`, `never`\>

'op(value)' or 'op(error)'

#### Defined in

[either.ts:351](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L351)

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
| `op.left` | (`error`: `L`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R3`, `never`\>

#### Defined in

[either.ts:352](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L352)

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
| `op.left` | (`error`: `L`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L3`\>

#### Defined in

[either.ts:353](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L353)

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
| `op.left` | (`error`: `L`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L3`\>

#### Defined in

[either.ts:354](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L354)

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
| `op.left` | (`error`: `L`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R3`, `never`\>

#### Defined in

[either.ts:355](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L355)

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
| `op.left` | (`error`: `L`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L3`\>

#### Defined in

[either.ts:356](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L356)

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
| `op.left` | (`error`: `L`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R3`, `L3`\>

#### Defined in

[either.ts:357](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L357)

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
| `op.left` | (`error`: `L`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R3`, `L3`\>

#### Defined in

[either.ts:358](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L358)

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
| `op.left` | (`error`: `L`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R3`, `L3`\>

#### Defined in

[either.ts:359](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L359)

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
| `op.left` | (`error`: `L`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Right`](Right.md)<`R2` \| `R3`, `never`\>

#### Defined in

[either.ts:361](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L361)

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
| `op.left` | (`error`: `L`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R3`, `L2`\>

#### Defined in

[either.ts:362](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L362)

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
| `op.left` | (`error`: `L`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L3`\>

#### Defined in

[either.ts:363](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L363)

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
| `op.left` | (`error`: `L`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Left`](Left.md)<`never`, `L2` \| `L3`\>

#### Defined in

[either.ts:364](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L364)

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
| `op.left` | (`error`: `L`) => [`Right`](Right.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2` \| `R3`, `L2`\>

#### Defined in

[either.ts:365](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L365)

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
| `op.left` | (`error`: `L`) => [`Left`](Left.md)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2`, `L2` \| `L3`\>

#### Defined in

[either.ts:366](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L366)

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
| `op.left` | (`error`: `L`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Right`](Right.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2` \| `R3`, `L3`\>

#### Defined in

[either.ts:367](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L367)

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
| `op.left` | (`error`: `L`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Left`](Left.md)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R3`, `L2` \| `L3`\>

#### Defined in

[either.ts:368](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L368)

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
| `op.left` | (`error`: `L`) => [`Either`](../modules.md#either)<`R3`, `L3`\> |
| `op.right` | (`value`: `R`) => [`Either`](../modules.md#either)<`R2`, `L2`\> |

#### Returns

[`Either`](../modules.md#either)<`R2` \| `R3`, `L2` \| `L3`\>

#### Defined in

[either.ts:369](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L369)

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
| `op.left` | (`error`: `L`) => `R3` |
| `op.right` | (`value`: `R`) => `R2` |

#### Returns

[`Right`](Right.md)<`R3`, `never`\>

'right op.right(value)' or 'right op.left(error)'

#### Defined in

[either.ts:292](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L292)

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
| `op.left` | (`error`: `L`) => `R3` |
| `op.right` | (`value`: `R`) => `R2` |

#### Returns

[`Right`](Right.md)<`R2` \| `R3`, `never`\>

#### Defined in

[either.ts:294](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L294)

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
| `op.left` | (`error`: `L`) => `void` |
| `op.right` | (`value`: `R`) => `void` |

#### Returns

[`Left`](Left.md)<`R`, `L`\>

self

#### Defined in

[either.ts:248](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L248)

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

[either.ts:328](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L328)

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

[either.ts:329](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L329)

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

[either.ts:330](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L330)

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

[either.ts:332](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L332)

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

[either.ts:333](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L333)

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

[either.ts:334](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L334)

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

[either.ts:275](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L275)

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

[either.ts:277](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L277)

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

[either.ts:236](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L236)

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

[either.ts:225](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L225)
