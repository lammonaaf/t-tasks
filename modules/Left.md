[t-tasks](../README.md) / [Exports](../modules.md) / Left

# Namespace: Left

## Table of contents

### Functions

- [left](Left.md#left)

## Functions

### left

▸ **left**<`R`, `L`\>(`left`): `L`

Standalone Left error extractor

Userful for passing as a function to collection transformers

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |
| `L` | underlying error type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `left` | [`Left`](../interfaces/Left.md)<`R`, `L`\> | Left instance |

#### Returns

`L`

underlying error

#### Defined in

[either.ts:429](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L429)
