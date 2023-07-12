[t-tasks](../README.md) / [Exports](../modules.md) / Either

# Namespace: Either

## Table of contents

### Functions

- [everyLeft](Either.md#everyleft)
- [everyRight](Either.md#everyright)
- [fromNullable](Either.md#fromnullable)
- [fromOptional](Either.md#fromoptional)
- [generate](Either.md#generate)
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

[either.ts:563](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L563)

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

[either.ts:543](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L543)

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

[either.ts:503](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L503)

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

[either.ts:504](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L504)

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

[either.ts:505](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L505)

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

[either.ts:506](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L506)

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

[either.ts:487](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L487)

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

[either.ts:488](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L488)

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

[either.ts:489](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L489)

___

### generate

▸ **generate**<`T`, `TT`, `R`\>(`eitherGeneratorFunction`): [`Either`](../modules.md#either)<`R`, `any`\>

Create compound Either from generator function

Applying yield to a Maybe within the generator function unwraps the Maybe and returns underlying value in case of success
However the convinient option for typescript is to use ```yield* maybe.generator()``` as othervise one may have to deal with union types

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | - |
| `TT` | extends [`Either`](../modules.md#either)<`T`, `any`\> | yielded Maybe type |
| `R` | `R` | returned underlying type |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eitherGeneratorFunction` | [`EitherGeneratorFunction`](../modules.md#eithergeneratorfunction)<[], `T`, `TT`, `R`\> |

#### Returns

[`Either`](../modules.md#either)<`R`, `any`\>

Just wrapping the result of generator function or Nothing
```

#### Defined in

[either.ts:589](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L589)

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

[either.ts:533](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L533)

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

[either.ts:520](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L520)

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

[either.ts:474](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L474)

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

[either.ts:463](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L463)

___

### someLeft

▸ **someLeft**<`R`, `L`\>(`eithers`): `boolean`

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

`boolean`

true in case at least one list element is Left

#### Defined in

[either.ts:573](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L573)

___

### someRight

▸ **someRight**<`R`, `L`\>(`eithers`): `boolean`

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

`boolean`

true in case at least one list element is Right

#### Defined in

[either.ts:553](https://github.com/lammonaaf/t-tasks/blob/6cda431/src/either.ts#L553)
