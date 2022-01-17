[t-tasks](../README.md) / [Exports](../modules.md) / Either

# Namespace: Either

## Table of contents

### Functions

- [everyLeft](Either.md#everyleft)
- [everyRight](Either.md#everyright)
- [fromNullable](Either.md#fromnullable)
- [fromOptional](Either.md#fromoptional)
- [isLeft](Either.md#isleft)
- [isRight](Either.md#isright)
- [left](Either.md#left)
- [right](Either.md#right)
- [someLeft](Either.md#someleft)
- [someRight](Either.md#someright)

## Functions

### everyLeft

▸ **everyLeft**<`R`, `L`\>(`eithers`): eithers is Left<never, L\>[]

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |
| `L` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eithers` | [`Either`](../modules.md#either)<`R`, `L`\>[] | a list of Either |

#### Returns

eithers is Left<never, L\>[]

true in case every list element is Left

#### Defined in

[either.ts:542](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L542)

___

### everyRight

▸ **everyRight**<`R`, `L`\>(`eithers`): eithers is Right<R, never\>[]

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |
| `L` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eithers` | [`Either`](../modules.md#either)<`R`, `L`\>[] | a list of Either |

#### Returns

eithers is Right<R, never\>[]

true in case every list element is Right

#### Defined in

[either.ts:522](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L522)

___

### fromNullable

▸ **fromNullable**<`L`\>(`value`, `error`): [`Left`](../interfaces/Left.md)<`never`, `L`\>

Either constructor from optional or nullable value

Resolves to 'left error' in case of undefined or null value and 'right value' otherwise

#### Type parameters

| Name |
| :------ |
| `L` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` | possibly undefined or nullable value |
| `error` | `L` | error to use in case of undefined or nullable value |

#### Returns

[`Left`](../interfaces/Left.md)<`never`, `L`\>

either 'right value' or 'left error'

#### Defined in

[either.ts:482](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L482)

▸ **fromNullable**<`L`\>(`value`, `error`): [`Left`](../interfaces/Left.md)<`never`, `L`\>

#### Type parameters

| Name |
| :------ |
| `L` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | ``null`` |
| `error` | `L` |

#### Returns

[`Left`](../interfaces/Left.md)<`never`, `L`\>

#### Defined in

[either.ts:483](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L483)

▸ **fromNullable**<`R`\>(`value`, `error`): [`Right`](../interfaces/Right.md)<`R`, `never`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Exclude`<`R`, `undefined` \| ``null``\> |
| `error` | `unknown` |

#### Returns

[`Right`](../interfaces/Right.md)<`R`, `never`\>

#### Defined in

[either.ts:484](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L484)

▸ **fromNullable**<`R`, `L`\>(`value`, `error`): [`Either`](../modules.md#either)<`R`, `L`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `L` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| ``null`` \| `R` |
| `error` | `L` |

#### Returns

[`Either`](../modules.md#either)<`R`, `L`\>

#### Defined in

[either.ts:485](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L485)

___

### fromOptional

▸ **fromOptional**<`L`\>(`value`, `error`): [`Left`](../interfaces/Left.md)<`never`, `L`\>

Either constructor from optional value

Resolves to 'left error' in case of undefined value and 'right value' otherwise

#### Type parameters

| Name |
| :------ |
| `L` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` | possibly undefined value |
| `error` | `L` | error to use in case of undefined value |

#### Returns

[`Left`](../interfaces/Left.md)<`never`, `L`\>

either 'right value' or 'left error'

#### Defined in

[either.ts:466](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L466)

▸ **fromOptional**<`R`\>(`value`, `error`): [`Right`](../interfaces/Right.md)<`R`, `never`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Exclude`<`R`, `undefined`\> |
| `error` | `unknown` |

#### Returns

[`Right`](../interfaces/Right.md)<`R`, `never`\>

#### Defined in

[either.ts:467](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L467)

▸ **fromOptional**<`R`, `L`\>(`value`, `error`): [`Either`](../modules.md#either)<`R`, `L`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `L` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| `R` |
| `error` | `L` |

#### Returns

[`Either`](../modules.md#either)<`R`, `L`\>

#### Defined in

[either.ts:468](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L468)

___

### isLeft

▸ **isLeft**<`R`, `L`\>(`either`): either is Left<never, L\>

Standalone type guard for 'left'

Userful for passing as a predicate to collection transformers

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |
| `L` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `either` | [`Either`](../modules.md#either)<`R`, `L`\> | Either instance |

#### Returns

either is Left<never, L\>

'true' in case argument is 'left error' (and resolves type to be 'left')

#### Defined in

[either.ts:512](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L512)

___

### isRight

▸ **isRight**<`R`, `L`\>(`either`): either is Right<R, never\>

Standalone type guard for 'right'

Userful for passing as a predicate to collection transformers

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |
| `L` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `either` | [`Either`](../modules.md#either)<`R`, `L`\> | Either instance |

#### Returns

either is Right<R, never\>

'true' in case argument is 'right value' (and resolves type to be 'right')

#### Defined in

[either.ts:499](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L499)

___

### left

▸ **left**<`L`\>(`error`): [`Left`](../interfaces/Left.md)<`never`, `L`\>

Left monad constructor

#### Type parameters

| Name | Description |
| :------ | :------ |
| `L` | underlying error type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `L` | underlying error |

#### Returns

[`Left`](../interfaces/Left.md)<`never`, `L`\>

'left error'

#### Defined in

[either.ts:453](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L453)

___

### right

▸ **right**<`R`\>(`value`): [`Right`](../interfaces/Right.md)<`R`, `never`\>

Right monad constructor

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `R` | underlying value |

#### Returns

[`Right`](../interfaces/Right.md)<`R`, `never`\>

'right value'

#### Defined in

[either.ts:442](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L442)

___

### someLeft

▸ **someLeft**<`R`, `L`\>(`eithers`): eithers is Left<never, L\>[]

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |
| `L` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eithers` | [`Either`](../modules.md#either)<`R`, `L`\>[] | a list of Either |

#### Returns

eithers is Left<never, L\>[]

true in case at least one list element is Left

#### Defined in

[either.ts:552](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L552)

___

### someRight

▸ **someRight**<`R`, `L`\>(`eithers`): eithers is Right<R, never\>[]

Standalone list predicate

#### Type parameters

| Name |
| :------ |
| `R` |
| `L` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eithers` | [`Either`](../modules.md#either)<`R`, `L`\>[] | a list of Either |

#### Returns

eithers is Right<R, never\>[]

true in case at least one list element is Right

#### Defined in

[either.ts:532](https://github.com/lammonaaf/t-tasks/blob/a02b49d/src/either.ts#L532)
