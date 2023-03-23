[t-tasks](../README.md) / [Exports](../modules.md) / Maybe

# Namespace: Maybe

## Table of contents

### Functions

- [everyJust](Maybe.md#everyjust)
- [everyNothing](Maybe.md#everynothing)
- [fromNullable](Maybe.md#fromnullable)
- [fromOptional](Maybe.md#fromoptional)
- [generate](Maybe.md#generate)
- [isJust](Maybe.md#isjust)
- [isNothing](Maybe.md#isnothing)
- [just](Maybe.md#just)
- [nothing](Maybe.md#nothing)
- [someJust](Maybe.md#somejust)
- [someNothing](Maybe.md#somenothing)

## Functions

### everyJust

▸ **everyJust**<`R`\>(`maybes`): maybes is Just<R\>[]

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maybes` | [`Maybe`](../modules.md#maybe)<`R`\>[] | a list of Maybe |

#### Returns

maybes is Just<R\>[]

true in case every list element is Just

#### Defined in

[maybe.ts:509](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L509)

___

### everyNothing

▸ **everyNothing**<`R`\>(`maybes`): maybes is Nothing<never\>[]

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maybes` | [`Maybe`](../modules.md#maybe)<`R`\>[] | a list of Maybe |

#### Returns

maybes is Nothing<never\>[]

true in case every list element is Nothing

#### Defined in

[maybe.ts:529](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L529)

___

### fromNullable

▸ **fromNullable**(`value`): [`Nothing`](../interfaces/Nothing.md)<`never`\>

Maybe constructor from optional or nullable value

Resolves to 'nothing' in case of undefined or null value and 'just value' otherwise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` | possibly undefined value |

#### Returns

[`Nothing`](../interfaces/Nothing.md)<`never`\>

either 'just value' or 'nothing'

#### Defined in

[maybe.ts:469](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L469)

▸ **fromNullable**(`value`): [`Nothing`](../interfaces/Nothing.md)<`never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | ``null`` |

#### Returns

[`Nothing`](../interfaces/Nothing.md)<`never`\>

#### Defined in

[maybe.ts:470](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L470)

▸ **fromNullable**<`R`\>(`value`): [`Just`](../interfaces/Just.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Exclude`<`R`, `undefined` \| ``null``\> |

#### Returns

[`Just`](../interfaces/Just.md)<`R`\>

#### Defined in

[maybe.ts:471](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L471)

▸ **fromNullable**<`R`\>(`value`): [`Maybe`](../modules.md#maybe)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| ``null`` \| `R` |

#### Returns

[`Maybe`](../modules.md#maybe)<`R`\>

#### Defined in

[maybe.ts:472](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L472)

___

### fromOptional

▸ **fromOptional**(`value`): [`Nothing`](../interfaces/Nothing.md)<`never`\>

Maybe constructor from optional value

Resolves to 'nothing' in case of undefined value and 'just value' otherwise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` | possibly undefined value |

#### Returns

[`Nothing`](../interfaces/Nothing.md)<`never`\>

either 'just value' or 'nothing'

#### Defined in

[maybe.ts:454](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L454)

▸ **fromOptional**<`R`\>(`value`): [`Just`](../interfaces/Just.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Exclude`<`R`, `undefined`\> |

#### Returns

[`Just`](../interfaces/Just.md)<`R`\>

#### Defined in

[maybe.ts:455](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L455)

▸ **fromOptional**<`R`\>(`value`): [`Maybe`](../modules.md#maybe)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| `R` |

#### Returns

[`Maybe`](../modules.md#maybe)<`R`\>

#### Defined in

[maybe.ts:456](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L456)

___

### generate

▸ **generate**<`T`, `TT`, `R`\>(`maybeGeneratorFunction`): [`Maybe`](../modules.md#maybe)<`R`\>

Create compound Maybe from generator function

Applying yield to a Maybe within the generator function unwraps the Maybe and returns underlying value in case of success
However the convinient option for typescript is to use ```yield* maybe.generator()``` as othervise one may have to deal with union types

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | - |
| `TT` | extends [`Maybe`](../modules.md#maybe)<`T`\> | yielded Maybe type |
| `R` | `R` | returned underlying type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maybeGeneratorFunction` | [`MaybeGeneratorFunction`](../modules.md#maybegeneratorfunction)<[], `T`, `TT`, `R`\> | Maybe generator function |

#### Returns

[`Maybe`](../modules.md#maybe)<`R`\>

Just wrapping the result of generator function or Nothing
```

#### Defined in

[maybe.ts:555](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L555)

___

### isJust

▸ **isJust**<`R`\>(`maybe`): maybe is Just<R\>

Standalone type guard for 'just'

Userful for passing as a predicate to collection transformers

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maybe` | [`Maybe`](../modules.md#maybe)<`R`\> | Maybe instance |

#### Returns

maybe is Just<R\>

'true' in case wrapped value exists (and resolves argument type to be 'just')

#### Defined in

[maybe.ts:486](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L486)

___

### isNothing

▸ **isNothing**<`R`\>(`maybe`): maybe is Nothing<never\>

Standalone type guard for 'nothing'

Userful for passing as a predicate to collection transformers

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maybe` | [`Maybe`](../modules.md#maybe)<`R`\> | Maybe instance |

#### Returns

maybe is Nothing<never\>

'true' in case wrapped value is 'nothing' (and resolves argument type to be 'nothing')

#### Defined in

[maybe.ts:499](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L499)

___

### just

▸ **just**<`R`\>(`value`): [`Just`](../interfaces/Just.md)<`R`\>

Non-empty monad constructor

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `R` | underlying value |

#### Returns

[`Just`](../interfaces/Just.md)<`R`\>

'just value'

#### Defined in

[maybe.ts:433](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L433)

___

### nothing

▸ **nothing**(): [`Nothing`](../interfaces/Nothing.md)<`never`\>

Empty monad constructor

#### Returns

[`Nothing`](../interfaces/Nothing.md)<`never`\>

'nothing'

#### Defined in

[maybe.ts:442](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L442)

___

### someJust

▸ **someJust**<`R`\>(`maybes`): `boolean`

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maybes` | [`Maybe`](../modules.md#maybe)<`R`\>[] | a list of Maybe |

#### Returns

`boolean`

true in case al east one list element is Just

#### Defined in

[maybe.ts:519](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L519)

___

### someNothing

▸ **someNothing**<`R`\>(`maybes`): `boolean`

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maybes` | [`Maybe`](../modules.md#maybe)<`R`\>[] | a list of Maybe |

#### Returns

`boolean`

true in case at least one list element is Nothing

#### Defined in

[maybe.ts:539](https://github.com/lammonaaf/t-tasks/blob/6eb2b96/src/maybe.ts#L539)
