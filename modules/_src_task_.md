[t-tasks](../README.md) › [Globals](../globals.md) › ["src/task"](_src_task_.md)

# Module: "src/task"

## Index

### Namespaces

* [Task](_src_task_.task.md)

### Type aliases

* [Cancelable](_src_task_.md#cancelable)
* [Rejectable](_src_task_.md#rejectable)
* [TaskFunction](_src_task_.md#taskfunction)
* [TaskGenerator](_src_task_.md#taskgenerator)
* [TaskGeneratorFunction](_src_task_.md#taskgeneratorfunction)

## Type aliases

###  Cancelable

Ƭ **Cancelable**: *[Maybe](_src_maybe_.maybe.md)‹[Rejectable](_src_task_.md#rejectable)‹R››*

*Defined in [src/task.ts:16](https://github.com/lammonaaf/t-tasks/blob/865a6db/src/task.ts#L16)*

Shortcut for underlying task result type

___

###  Rejectable

Ƭ **Rejectable**: *[Either](_src_either_.either.md)‹R, any›*

*Defined in [src/task.ts:9](https://github.com/lammonaaf/t-tasks/blob/865a6db/src/task.ts#L9)*

Shortcut for monadic Either type, where erroneous value is of type any

___

###  TaskFunction

Ƭ **TaskFunction**: *function*

*Defined in [src/task.ts:24](https://github.com/lammonaaf/t-tasks/blob/865a6db/src/task.ts#L24)*

Function returning Task

#### Type declaration:

▸ (...`args`: A): *[Task](_src_task_.task.md)‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |

___

###  TaskGenerator

Ƭ **TaskGenerator**: *Generator‹TT, R, T›*

*Defined in [src/task.ts:41](https://github.com/lammonaaf/t-tasks/blob/865a6db/src/task.ts#L41)*

Task generator

**`example`** 
```typescript
const generatorFunction = function*(): TaskGenerator<unknown, Task<string>, number> {
  const v = yield* someTaskFunction().generator();

  return v.length;
};
```

___

###  TaskGeneratorFunction

Ƭ **TaskGeneratorFunction**: *function*

*Defined in [src/task.ts:59](https://github.com/lammonaaf/t-tasks/blob/865a6db/src/task.ts#L59)*

Function returning task generator (generator function)

**`example`** 
```typescript
const generatorFunction: TaskGeneratorFunction<[], unknown, Task<string>, number> = function*() {
  const v = yield* someTaskFunction().generator();

  return v.length;
};
```

#### Type declaration:

▸ (...`args`: A): *[TaskGenerator](_src_task_.md#taskgenerator)‹T, TT, R›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | A |
