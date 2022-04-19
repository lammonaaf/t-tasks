[t-tasks](../README.md) / [Exports](../modules.md) / Maybe

# Namespace: Maybe

## Table of contents

### Functions

- [everyJust](Maybe.md#everyjust)
- [everyNothing](Maybe.md#everynothing)
- [fromNullable](Maybe.md#fromnullable)
- [fromOptional](Maybe.md#fromoptional)
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

[maybe.ts:488](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L488)

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

[maybe.ts:508](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L508)

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

[maybe.ts:448](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L448)

▸ **fromNullable**(`value`): [`Nothing`](../interfaces/Nothing.md)<`never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | ``null`` |

#### Returns

[`Nothing`](../interfaces/Nothing.md)<`never`\>

#### Defined in

[maybe.ts:449](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L449)

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

[maybe.ts:450](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L450)

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

[maybe.ts:451](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L451)

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

[maybe.ts:433](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L433)

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

[maybe.ts:434](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L434)

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

[maybe.ts:435](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L435)

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

[maybe.ts:465](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L465)

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

[maybe.ts:478](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L478)

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

[maybe.ts:412](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L412)

___

### nothing

▸ **nothing**(): [`Nothing`](../interfaces/Nothing.md)<`never`\>

Empty monad constructor

#### Returns

[`Nothing`](../interfaces/Nothing.md)<`never`\>

'nothing'

#### Defined in

[maybe.ts:421](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L421)

___

### someJust

▸ **someJust**<`R`\>(`maybes`): maybes is Just<R\>[]

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

true in case al east one list element is Just

#### Defined in

[maybe.ts:498](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L498)

___

### someNothing

▸ **someNothing**<`R`\>(`maybes`): maybes is Nothing<never\>[]

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

true in case at least one list element is Nothing

#### Defined in

[maybe.ts:518](https://github.com/lammonaaf/t-tasks/blob/2965c75/src/maybe.ts#L518)
