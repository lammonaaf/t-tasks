[t-tasks](../README.md) / [Exports](../modules.md) / Just

# Interface: Just<R\>

Just a value

Maybe data type specialization representing an existing value

## Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value |

## Table of contents

### Properties

- [generator](Just.md#generator)
- [just](Just.md#just)

### Methods

- [chain](Just.md#chain)
- [isJust](Just.md#isjust)
- [isNothing](Just.md#isnothing)
- [map](Just.md#map)
- [matchChain](Just.md#matchchain)
- [matchMap](Just.md#matchmap)
- [matchTap](Just.md#matchtap)
- [orChain](Just.md#orchain)
- [orMap](Just.md#ormap)
- [orTap](Just.md#ortap)
- [tap](Just.md#tap)

## Properties

### generator

• **generator**: [`MaybeGeneratorFunction`](../modules.md#maybegeneratorfunction)<[], `R`, [`Just`](Just.md)<`R`\>, `R`\>

Wrap Maybe to singleton generator

Userful in order to avoid ambiguous yied types

**`returns`** generator of Maybe wrapping this

#### Defined in

[maybe.ts:197](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L197)

___

### just

• `Readonly` **just**: `R`

#### Defined in

[maybe.ts:9](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L9)

## Methods

### chain

▸ **chain**<`R2`\>(`op`): [`Just`](Just.md)<`R2`\>

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

[`Just`](Just.md)<`R2`\>

'op(value)' or 'nothing'

#### Defined in

[maybe.ts:102](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L102)

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

[maybe.ts:103](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L103)

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

[maybe.ts:104](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L104)

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

[maybe.ts:106](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L106)

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

[maybe.ts:107](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L107)

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

[maybe.ts:108](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L108)

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

[maybe.ts:174](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L174)

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

[maybe.ts:188](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L188)

___

### map

▸ **map**<`R2`\>(`op`): [`Just`](Just.md)<`R2`\>

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

[`Just`](Just.md)<`R2`\>

'just op(value)' or 'nothing'

#### Defined in

[maybe.ts:56](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L56)

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

[maybe.ts:58](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L58)

___

### matchChain

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R2`\>

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

[`Just`](Just.md)<`R2`\>

'op.just(value)' or 'op.nothing()'

#### Defined in

[maybe.ts:142](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L142)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R2`\>

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

[`Just`](Just.md)<`R2`\>

#### Defined in

[maybe.ts:143](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L143)

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
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:144](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L144)

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

[maybe.ts:145](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L145)

▸ **matchChain**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R2`\>

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

[`Just`](Just.md)<`R2`\>

#### Defined in

[maybe.ts:146](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L146)

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
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Nothing`](Nothing.md)<`never`\>

#### Defined in

[maybe.ts:147](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L147)

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
| `op.nothing` | () => [`Just`](Just.md)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:148](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L148)

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

[maybe.ts:149](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L149)

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
| `op.nothing` | () => [`Maybe`](../modules.md#maybe)<`R3`\> |

#### Returns

[`Maybe`](../modules.md#maybe)<`R2`\>

#### Defined in

[maybe.ts:150](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L150)

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

[maybe.ts:152](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L152)

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

[maybe.ts:153](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L153)

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

[maybe.ts:154](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L154)

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

[maybe.ts:155](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L155)

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

[maybe.ts:156](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L156)

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

[maybe.ts:157](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L157)

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

[maybe.ts:158](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L158)

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

[maybe.ts:159](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L159)

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

[maybe.ts:160](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L160)

___

### matchMap

▸ **matchMap**<`R2`, `R3`\>(`op`): [`Just`](Just.md)<`R2`\>

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

[`Just`](Just.md)<`R2`\>

'just op.just(value)' or 'just op.nothing()'

#### Defined in

[maybe.ts:87](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L87)

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

[maybe.ts:89](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L89)

___

### matchTap

▸ **matchTap**(`op`): [`Just`](Just.md)<`R`\>

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

[`Just`](Just.md)<`R`\>

self

#### Defined in

[maybe.ts:43](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L43)

___

### orChain

▸ **orChain**<`R2`\>(`op`): [`Just`](Just.md)<`R`\>

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

[`Just`](Just.md)<`R`\>

'just value' or 'op()'

#### Defined in

[maybe.ts:121](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L121)

▸ **orChain**<`R2`\>(`op`): [`Just`](Just.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => [`Nothing`](Nothing.md)<`R2`\> |

#### Returns

[`Just`](Just.md)<`R`\>

#### Defined in

[maybe.ts:122](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L122)

▸ **orChain**<`R2`\>(`op`): [`Just`](Just.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | () => [`Maybe`](../modules.md#maybe)<`R2`\> |

#### Returns

[`Just`](Just.md)<`R`\>

#### Defined in

[maybe.ts:123](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L123)

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

[maybe.ts:125](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L125)

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

[maybe.ts:126](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L126)

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

[maybe.ts:127](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L127)

___

### orMap

▸ **orMap**<`R2`\>(`op`): [`Just`](Just.md)<`R`\>

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

[`Just`](Just.md)<`R`\>

'just value' or 'just op()'

#### Defined in

[maybe.ts:70](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L70)

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

[maybe.ts:72](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L72)

___

### orTap

▸ **orTap**(`op`): [`Just`](Just.md)<`R`\>

Maybe fallback peeker function

Applied to 'just value' returns self without invoking callback
Applied to 'nothing' returns self invoking op() in process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | () => `void` | function to be invoked |

#### Returns

[`Just`](Just.md)<`R`\>

self

#### Defined in

[maybe.ts:31](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L31)

___

### tap

▸ **tap**(`op`): [`Just`](Just.md)<`R`\>

Maybe peeker function

Applied to 'just value' returns self invoking op(value) in process
Applied to 'nothing' returns self without invoking callback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `void` | function to be invoked with underlying value |

#### Returns

[`Just`](Just.md)<`R`\>

self

#### Defined in

[maybe.ts:20](https://github.com/lammonaaf/t-tasks/blob/873eb1b/src/maybe.ts#L20)
