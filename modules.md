[t-tasks](README.md) / Exports

# t-tasks

## Table of contents

### Namespaces

- [Either](modules/Either.md)
- [Just](modules/Just.md)
- [Left](modules/Left.md)
- [Maybe](modules/Maybe.md)
- [Nothing](modules/Nothing.md)
- [Right](modules/Right.md)
- [Task](modules/Task.md)

### Interfaces

- [Just](interfaces/Just.md)
- [Left](interfaces/Left.md)
- [Nothing](interfaces/Nothing.md)
- [Right](interfaces/Right.md)
- [Task](interfaces/Task.md)

### Type aliases

- [Cancelable](modules.md#cancelable)
- [Either](modules.md#either)
- [Maybe](modules.md#maybe)
- [Rejectable](modules.md#rejectable)
- [TaskFunction](modules.md#taskfunction)
- [TaskGenerator](modules.md#taskgenerator)
- [TaskGeneratorFunction](modules.md#taskgeneratorfunction)

## Type aliases

### Cancelable

Ƭ **Cancelable**<`R`\>: [`Maybe`](modules.md#maybe)<[`Rejectable`](modules.md#rejectable)<`R`\>\>

Shortcut for underlying task result type

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying type |

#### Defined in

[task.ts:16](https://github.com/lammonaaf/t-tasks/blob/9184653/src/task.ts#L16)

___

### Either

Ƭ **Either**<`R`, `L`\>: [`Right`](interfaces/Right.md)<`R`, `L`\> \| [`Left`](interfaces/Left.md)<`R`, `L`\>

Either data type: either Right value of type R or Left value of type L

As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
Used throughout the library to represent the result of failable operations, namely failed tasks

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value type |
| `L` | underlying error type |

#### Defined in

[either.ts:400](https://github.com/lammonaaf/t-tasks/blob/9184653/src/either.ts#L400)

___

### Maybe

Ƭ **Maybe**<`R`\>: [`Just`](interfaces/Just.md)<`R`\> \| [`Nothing`](interfaces/Nothing.md)<`R`\>

Genric Maybe monad interface

As per classic Maybe monad implementation can eithr contain just a value or contain nothing
Used throughout the library to represent optional return type, specifically return type of cancelled tasks

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying value |

#### Defined in

[maybe.ts:385](https://github.com/lammonaaf/t-tasks/blob/9184653/src/maybe.ts#L385)

___

### Rejectable

Ƭ **Rejectable**<`R`\>: [`Either`](modules.md#either)<`R`, `any`\>

Shortcut for monadic Either type, where erroneous value is of type any

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | underlying type |

#### Defined in

[task.ts:9](https://github.com/lammonaaf/t-tasks/blob/9184653/src/task.ts#L9)

___

### TaskFunction

Ƭ **TaskFunction**<`A`, `R`\>: (...`args`: `A`) => [`Task`](interfaces/Task.md)<`R`\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `A` | extends `unknown`[] | argument types |
| `R` | `R` | returned task resolve type |

#### Type declaration

▸ (...`args`): [`Task`](interfaces/Task.md)<`R`\>

Function returning Task

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

##### Returns

[`Task`](interfaces/Task.md)<`R`\>

#### Defined in

[task.ts:24](https://github.com/lammonaaf/t-tasks/blob/9184653/src/task.ts#L24)

___

### TaskGenerator

Ƭ **TaskGenerator**<`T`, `TT`, `R`\>: `Generator`<`TT`, `R`, `T`\>

Task generator

**`example`**
```typescript
const generatorFunction = function*(): TaskGenerator<unknown, Task<string>, number> {
  const v = yield* someTaskFunction().generator();

  return v.length;
};
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `T` | - |
| `TT` | extends [`Task`](interfaces/Task.md)<`T`\> | yielded task type |
| `R` | `R` | returned task resolve type |

#### Defined in

[task.ts:41](https://github.com/lammonaaf/t-tasks/blob/9184653/src/task.ts#L41)

___

### TaskGeneratorFunction

Ƭ **TaskGeneratorFunction**<`A`, `T`, `TT`, `R`\>: (...`args`: `A`) => [`TaskGenerator`](modules.md#taskgenerator)<`T`, `TT`, `R`\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `A` | extends `unknown`[] | argument types |
| `T` | `T` | - |
| `TT` | extends [`Task`](interfaces/Task.md)<`T`\> | yielded task type |
| `R` | `R` | returned task resolve type |

#### Type declaration

▸ (...`args`): [`TaskGenerator`](modules.md#taskgenerator)<`T`, `TT`, `R`\>

Function returning task generator (generator function)

**`example`**
```typescript
const generatorFunction: TaskGeneratorFunction<[], unknown, Task<string>, number> = function*() {
  const v = yield* someTaskFunction().generator();

  return v.length;
};
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

##### Returns

[`TaskGenerator`](modules.md#taskgenerator)<`T`, `TT`, `R`\>

#### Defined in

[task.ts:59](https://github.com/lammonaaf/t-tasks/blob/9184653/src/task.ts#L59)
