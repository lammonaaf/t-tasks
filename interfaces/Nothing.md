[t-tasks](../README.md) / [Exports](../modules.md) / Nothing

# Interface: Nothing<R\>

Absolutely Nothing

Maybe data type specialiation representing an absence of any value

## Type parameters

| Name |
| :------ |
| `R` |

## Table of contents

### Methods

- [chain](Nothing.md#chain)
- [isJust](Nothing.md#isjust)
- [isNothing](Nothing.md#isnothing)
- [map](Nothing.md#map)
- [matchChain](Nothing.md#matchchain)
- [matchMap](Nothing.md#matchmap)
- [matchTap](Nothing.md#matchtap)
- [orChain](Nothing.md#orchain)
- [orMap](Nothing.md#ormap)
- [orTap](Nothing.md#ortap)
- [tap](Nothing.md#tap)

## Methods

### chain

▸ **chain**<`R2`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

Maybe composition function

Applied to 'just value' returns 'op(value)'
Applied to 'nothing' returns self without invoking composition function

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer function result's underlying type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> | transformer to be invoked with underlying value |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

'op(value)' or 'nothing'

#### Defined in

[maybe.ts:288](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L288)

▸ **chain**<`R2`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:289](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L289)

▸ **chain**<`R2`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:290](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L290)

▸ **chain**<`R2`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:292](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L292)

▸ **chain**<`R2`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:293](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L293)

▸ **chain**<`R2`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:294](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L294)

___

### isJust

▸ **isJust**(): this is Just<R\>

Maybe type guard for 'just'

**`example`**
```typescript
if (maybe.isJust()) {
  console.log(maybe.just);
}
```

#### Returns

this is Just<R\>

'true' in case wrapped value exists (and resolves this type to be 'just')

#### Defined in

[maybe.ts:360](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L360)

___

### isNothing

▸ **isNothing**(): this is Nothing<R\>

Maybe type guard for 'nothing'

**`example`**
```typescript
if (maybe.isNohing()) {
  console.log('nothing');
}
```

#### Returns

this is Nothing<R\>

'true' in case wrapped value is 'nothing' (and resolves this type to be 'nothing')

#### Defined in

[maybe.ts:374](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L374)

___

### map

▸ **map**<`R2`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

Maybe transformer function

Applied to 'just value' returns 'just op(value)'
Applied to 'nothing' returns self without invoking transformer

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer function's return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `R2` | transformer to be invoked with underlying value |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

'just op(value)' or 'nothing'

#### Defined in

[maybe.ts:242](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L242)

▸ **map**<`R2`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`value`: `R`) => `R2` |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:244](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L244)

___

### matchChain

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R3`\>

Maybe patter matching composition function

Applied to 'just value' returns 'op.just(value)'
Applied to 'nothing' returns op.nothing()

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R2` | `R2` | just transformer function result's underlying type |
| `R3` | `R2` | nothing transformer function result's underlying type |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> |
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Just`](Just.md)<`R3`\>

'op.just(value)' or 'op.nothing()'

#### Defined in

[maybe.ts:328](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L328)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> |
| `op.nothing` | () => [`Nothing`](Nothing.md)<`R3`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:329](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L329)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Just`](Just.md)<`R3`\>

#### Defined in

[maybe.ts:330](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L330)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |
| `op.nothing` | () => [`Nothing`](Nothing.md)<`R3`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:331](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L331)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> |
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R3`\>

#### Defined in

[maybe.ts:332](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L332)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R3`\>

#### Defined in

[maybe.ts:333](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L333)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Just`](Just.md)<`R3`\>

#### Defined in

[maybe.ts:334](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L334)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |
| `op.nothing` | () => [`Nothing`](Nothing.md)<`R3`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:335](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L335)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R3`\>

#### Defined in

[maybe.ts:336](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L336)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R2` \| `R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> |
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Just`](Just.md)<`R2` \| `R3`\>

#### Defined in

[maybe.ts:338](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L338)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> |
| `op.nothing` | () => [`Nothing`](Nothing.md)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:339](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L339)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R3`\>

#### Defined in

[maybe.ts:340](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L340)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |
| `op.nothing` | () => [`Nothing`](Nothing.md)<`R3`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:341](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L341)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2` \| `R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Just`](Just.md)<`R2`\> |
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2` \| `R3`\>

#### Defined in

[maybe.ts:342](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L342)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Nothing`](Nothing.md)<`R2`\> |
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R3`\>

#### Defined in

[maybe.ts:343](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L343)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2` \| `R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2` \| `R3`\>

#### Defined in

[maybe.ts:344](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L344)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |
| `op.nothing` | () => [`Nothing`](Nothing.md)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:345](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L345)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2` \| `R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => [`Maybe`](../modules.md#maybe)<`R2`\> |
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2` \| `R3`\>

#### Defined in

[maybe.ts:346](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L346)

___

### matchMap

▸ **matchMap**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R3`\>

Maybe patter matching transformer function

Applied to 'just value' returns 'just op.just(value)'
Applied to 'nothing' returns 'just op.nothing()'

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R2` | `R2` | just transformer function's return type |
| `R3` | `R2` | nothing transformer function's return type |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => `R2` |
| `op.nothing` | () => `R3` |

#### Returns

[`Just`](Just.md)<`R3`\>

'just op.just(value)' or 'just op.nothing()'

#### Defined in

[maybe.ts:273](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L273)

▸ **matchMap**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R2` \| `R3`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R2` | `R2` |
| `R3` | `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => `R2` |
| `op.nothing` | () => `R3` |

#### Returns

[`Just`](Just.md)<`R2` \| `R3`\>

#### Defined in

[maybe.ts:275](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L275)

___

### matchTap

▸ **matchTap**(`op`): [`Nothing`](Nothing.md)<`R`\>

Maybe patter matching peeker function

Applied to 'just value' returns self invoking op.just(value) in process
Applied to 'nothing' returns self invoking op.nothing() in process

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.just` | (`value`: `R`) => `void` |
| `op.nothing` | () => `void` |

#### Returns

[`Nothing`](Nothing.md)<`R`\>

self

#### Defined in

[maybe.ts:229](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L229)

___

### orChain

▸ **orChain**<`R2`\>(`op`): [`Just`](Just.md)<`R2`\>

Maybe fallback composition function

Applied to 'just value' returns self witjout invoking composition function
Applied to 'nothing' returns op()

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer function result's underlying type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | () => [`Just`](Just.md)<`R2`\> | transformer to be invoked |

#### Returns

[`Just`](Just.md)<`R2`\>

'just value' or 'op()'

#### Defined in

[maybe.ts:307](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L307)

▸ **orChain**<`R2`\>(`op`): [`Nothing`](Nothing.md)<`never`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => [`Nothing`](Nothing.md)<`R2`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:308](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L308)

▸ **orChain**<`R2`\>(`op`): [`Maybe`](../modules.md#maybe)<`R2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => [`Maybe`](../modules.md#maybe)<`R2`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:309](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L309)

▸ **orChain**<`R2`\>(`op`): [`Just`](Just.md)<`R` \| `R2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => [`Just`](Just.md)<`R2`\> |

#### Returns

[`Just`](Just.md)<`R` \| `R2`\>

#### Defined in

[maybe.ts:311](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L311)

▸ **orChain**<`R2`\>(`op`): [`Maybe`](../modules.md#maybe)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => [`Nothing`](Nothing.md)<`R2`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R`\>

#### Defined in

[maybe.ts:312](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L312)

▸ **orChain**<`R2`\>(`op`): [`Maybe`](../modules.md#maybe)<`R` \| `R2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => [`Maybe`](../modules.md#maybe)<`R2`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R` \| `R2`\>

#### Defined in

[maybe.ts:313](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L313)

___

### orMap

▸ **orMap**<`R2`\>(`op`): [`Just`](Just.md)<`R2`\>

Maybe fallback transformer function

Applied to 'just value' returns self without invoking transformer
Applied to 'nothing' returns 'just op()'

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | () => `R2` | function to be invoked |

#### Returns

[`Just`](Just.md)<`R2`\>

'just value' or 'just op()'

#### Defined in

[maybe.ts:256](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L256)

▸ **orMap**<`R2`\>(`op`): [`Just`](Just.md)<`R` \| `R2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => `R2` |

#### Returns

[`Just`](Just.md)<`R` \| `R2`\>

#### Defined in

[maybe.ts:258](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L258)

___

### orTap

▸ **orTap**(`op`): [`Nothing`](Nothing.md)<`R`\>

Maybe fallback peeker function

Applied to 'just value' returns self without invoking callback
Applied to 'nothing' returns self invoking op() in process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | () => `void` | function to be invoked |

#### Returns

[`Nothing`](Nothing.md)<`R`\>

self

#### Defined in

[maybe.ts:217](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L217)

___

### tap

▸ **tap**(`op`): [`Nothing`](Nothing.md)<`R`\>

Maybe peeker function

Applied to 'just value' returns self invoking op(value) in process
Applied to 'nothing' returns self without invoking callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `void` | function to be invoked with underlying value |

#### Returns

[`Nothing`](Nothing.md)<`R`\>

self

#### Defined in

[maybe.ts:206](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L206)
