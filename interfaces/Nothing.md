[t-tasks](../README.md) / [Exports](../modules.md) / Nothing

# Interface: Nothing<R\>

Absolutely Nothing

Maybe data type specialiation representing an absence of any value

## Type parameters

| Name |
| :------ |
| `R` |

## Table of contents

### Properties

- [generator](Nothing.md#generator)

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

## Properties

### generator

• **generator**: [`MaybeGeneratorFunction`](../modules.md#maybegeneratorfunction)<[], `R`, [`Nothing`](Nothing.md)<`R`\>, `R`\>

Wrap Maybe to singleton generator

Userful in order to avoid ambiguous yied types

**`returns`** generator of Maybe wrapping this

#### Defined in

[maybe.ts:392](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L392)

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

[maybe.ts:297](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L297)

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

[maybe.ts:298](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L298)

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

[maybe.ts:299](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L299)

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

[maybe.ts:301](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L301)

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

[maybe.ts:302](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L302)

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

[maybe.ts:303](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L303)

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

[maybe.ts:369](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L369)

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

[maybe.ts:383](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L383)

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

[maybe.ts:251](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L251)

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

[maybe.ts:253](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L253)

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

[maybe.ts:337](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L337)

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

[maybe.ts:338](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L338)

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

[maybe.ts:339](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L339)

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

[maybe.ts:340](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L340)

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

[maybe.ts:341](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L341)

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

[maybe.ts:342](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L342)

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

[maybe.ts:343](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L343)

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

[maybe.ts:344](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L344)

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

[maybe.ts:345](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L345)

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

[maybe.ts:347](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L347)

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

[maybe.ts:348](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L348)

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

[maybe.ts:349](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L349)

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

[maybe.ts:350](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L350)

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

[maybe.ts:351](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L351)

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

[maybe.ts:352](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L352)

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

[maybe.ts:353](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L353)

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

[maybe.ts:354](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L354)

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

[maybe.ts:355](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L355)

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

[maybe.ts:282](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L282)

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

[maybe.ts:284](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L284)

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

[maybe.ts:238](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L238)

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

[maybe.ts:316](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L316)

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

[maybe.ts:317](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L317)

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

[maybe.ts:318](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L318)

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

[maybe.ts:320](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L320)

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

[maybe.ts:321](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L321)

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

[maybe.ts:322](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L322)

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

[maybe.ts:265](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L265)

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

[maybe.ts:267](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L267)

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

[maybe.ts:226](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L226)

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

[maybe.ts:215](https://github.com/lammonaaf/t-tasks/blob/82fb525/src/maybe.ts#L215)
