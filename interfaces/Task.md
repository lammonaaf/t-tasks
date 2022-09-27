[t-tasks](../README.md) / [Exports](../modules.md) / Task

# Interface: Task<R\>

Task monad interface

## Type parameters

| Name | Description |
| :------ | :------ |
| `R` | task resolve type |

## Hierarchy

- `TaskBase`<`R`\>

  ↳ **`Task`**

## Table of contents

### Properties

- [generator](Task.md#generator)

### Methods

- [cancel](Task.md#cancel)
- [chain](Task.md#chain)
- [chainCanceled](Task.md#chaincanceled)
- [chainRejected](Task.md#chainrejected)
- [map](Task.md#map)
- [mapCanceled](Task.md#mapcanceled)
- [mapRejected](Task.md#maprejected)
- [matchChain](Task.md#matchchain)
- [matchMap](Task.md#matchmap)
- [matchTap](Task.md#matchtap)
- [reject](Task.md#reject)
- [resolve](Task.md#resolve)
- [tap](Task.md#tap)
- [tapCanceled](Task.md#tapcanceled)
- [tapRejected](Task.md#taprejected)

## Properties

### generator

• **generator**: [`TaskGeneratorFunction`](../modules.md#taskgeneratorfunction)<[], `unknown`, [`Task`](Task.md)<`R`\>, `R`\>

Wrap task to singleton generator

Userful in order to avoid ambiguous yied types

**`returns`** generator of task wrapping the task

**`example`**
```typescript
const getString = () => Task.resolved('hello');
const getLength = (data: string) => Task.resolved(data.length);

// ..... //

Task.generate(function* () {
  const data = yield getString(); // data: string | number
  const length = yield getLength(data); // length: string | number

  return length;
});

// ..... //

Task.generate(function* () {
  const data = yield* getString().generator(); // data: string
  const length = yield* getLength(data).generator(); // length: number

  return length;
});
```

#### Defined in

[task.ts:230](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L230)

## Methods

### cancel

▸ **cancel**(): `void`

Invoke underlying canel method without error

#### Returns

`void`

#### Defined in

[task.ts:191](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L191)

___

### chain

▸ **chain**<`R2`\>(`op`): [`Task`](Task.md)<`R2`\>

Invoke transformer when task is resolved (and only then) and continue execution with it's result

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer task resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => [`Task`](Task.md)<`R2`\> | transformer to invoke |

#### Returns

[`Task`](Task.md)<`R2`\>

task chaining to transformer result task

#### Defined in

[task.ts:148](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L148)

___

### chainCanceled

▸ **chainCanceled**<`R2`\>(`op`): [`Task`](Task.md)<`R` \| `R2`\>

Invoke transformer when task is canceled (and only then) and continue execution with it's result

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | fallback task resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | () => [`Task`](Task.md)<`R2`\> | transformer to invoke |

#### Returns

[`Task`](Task.md)<`R` \| `R2`\>

task chaining to fallback task in case of cancelation

#### Defined in

[task.ts:166](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L166)

___

### chainRejected

▸ **chainRejected**<`R2`\>(`op`): [`Task`](Task.md)<`R` \| `R2`\>

Invoke transformer when task is rejected (and only then) and continue execution with it's result

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | fallback task resolve type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`error`: `any`) => [`Task`](Task.md)<`R2`\> | transformer to invoke |

#### Returns

[`Task`](Task.md)<`R` \| `R2`\>

task chaining to fallback task in case of failure

#### Defined in

[task.ts:157](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L157)

___

### map

▸ **map**<`R2`\>(`op`): [`Task`](Task.md)<`R2`\>

Invoke transformer when task is resolved (and only then) and return it's result instead

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | transformer return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `R2` | transformer to invoke |

#### Returns

[`Task`](Task.md)<`R2`\>

task returning transformer result

#### Defined in

[task.ts:108](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L108)

___

### mapCanceled

▸ **mapCanceled**<`R2`\>(`op`): [`Task`](Task.md)<`R` \| `R2`\>

Invoke transformer when task is canceled (and only then) and return it's result instead

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | fallback return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | () => `R2` | transformer to invoke |

#### Returns

[`Task`](Task.md)<`R` \| `R2`\>

task returning fallback result in case of cancelation

#### Defined in

[task.ts:126](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L126)

___

### mapRejected

▸ **mapRejected**<`R2`\>(`op`): [`Task`](Task.md)<`R` \| `R2`\>

Invoke transformer when task is rejected (and only then) and return it's result instead

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R2` | fallback return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`error`: `any`) => `R2` | transformer to invoke |

#### Returns

[`Task`](Task.md)<`R` \| `R2`\>

task returning fallback result in case of failure

#### Defined in

[task.ts:117](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L117)

___

### matchChain

▸ **matchChain**<`R2`, `R3`, `R4`\>(`op`): [`Task`](Task.md)<`R2` \| `R3` \| `R4`\>

Invoke a dedicated transformer according to task resolution and continue execution with it's result

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R2` | `R2` | success transformer resolve type |
| `R3` | `R2` | failure transformer resolve type |
| `R4` | `R3` | cancelation transformer resolve type |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.canceled` | () => [`Task`](Task.md)<`R4`\> |
| `op.rejected` | (`error`: `any`) => [`Task`](Task.md)<`R3`\> |
| `op.resolved` | (`value`: `R`) => [`Task`](Task.md)<`R2`\> |

#### Returns

[`Task`](Task.md)<`R2` \| `R3` \| `R4`\>

task chaining to a corresponding transformer result

#### Defined in

[task.ts:179](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L179)

___

### matchMap

▸ **matchMap**<`R2`, `R3`, `R4`\>(`op`): [`Task`](Task.md)<`R2` \| `R3` \| `R4`\>

Invoke a dedicated transformer according to task resolution

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R2` | `R2` | success transformer return type |
| `R3` | `R2` | failure transformer return type |
| `R4` | `R3` | cancelation transformer return type |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.canceled` | () => `R4` |
| `op.rejected` | (`error`: `any`) => `R3` |
| `op.resolved` | (`value`: `R`) => `R2` |

#### Returns

[`Task`](Task.md)<`R2` \| `R3` \| `R4`\>

task resolving to a corresponding transformer result

#### Defined in

[task.ts:139](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L139)

___

### matchTap

▸ **matchTap**(`op`): [`Task`](Task.md)<`R`\>

Invoke a dedicated callback according to task resolution

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `Object` |
| `op.canceled` | () => `void` |
| `op.rejected` | (`error`: `any`) => `void` |
| `op.resolved` | (`value`: `R`) => `void` |

#### Returns

[`Task`](Task.md)<`R`\>

self

#### Defined in

[task.ts:99](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L99)

___

### reject

▸ **reject**(`error`): `void`

Invoke underlying canel method with error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `any` | error value to be injected from outside |

#### Returns

`void`

#### Defined in

[task.ts:198](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L198)

___

### resolve

▸ **resolve**(): `TaskInvoke`<`R`\>

Return underlying promise in order to await result

#### Returns

`TaskInvoke`<`R`\>

underlying promise

#### Defined in

[task.ts:186](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L186)

___

### tap

▸ **tap**(`op`): [`Task`](Task.md)<`R`\>

Invoke callback when task is resolved (and only then)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`value`: `R`) => `void` | callback to invoke |

#### Returns

[`Task`](Task.md)<`R`\>

self

#### Defined in

[task.ts:73](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L73)

___

### tapCanceled

▸ **tapCanceled**(`op`): [`Task`](Task.md)<`R`\>

Invoke callback when task is canceled (and only then)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | () => `void` | callback to invoke |

#### Returns

[`Task`](Task.md)<`R`\>

self

#### Defined in

[task.ts:89](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L89)

___

### tapRejected

▸ **tapRejected**(`op`): [`Task`](Task.md)<`R`\>

Invoke callback when task is rejected (and only then)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | (`error`: `any`) => `void` | callback to invoke |

#### Returns

[`Task`](Task.md)<`R`\>

self

#### Defined in

[task.ts:81](https://github.com/lammonaaf/t-tasks/blob/70988eb/src/task.ts#L81)
