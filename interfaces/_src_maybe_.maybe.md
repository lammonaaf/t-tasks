[t-tasks](../README.md) › [Globals](../globals.md) › ["src/maybe"](../modules/_src_maybe_.md) › [Maybe](_src_maybe_.maybe.md)

# Interface: Maybe ‹**R**›

Genric Maybe monad interface

As per classic Maybe monad implementation can eithr contain just a value or contain nothing
Used throughout the library to represent optional return type, specifically return type of cancelled tasks

## Type parameters

▪ **R**

## Hierarchy

* **Maybe**

## Index

### Properties

* [just](_src_maybe_.maybe.md#optional-readonly-just)
* [kind](_src_maybe_.maybe.md#readonly-kind)

### Methods

* [chain](_src_maybe_.maybe.md#chain)
* [chainNothing](_src_maybe_.maybe.md#chainnothing)
* [fmap](_src_maybe_.maybe.md#fmap)
* [fmapNothing](_src_maybe_.maybe.md#fmapnothing)
* [tap](_src_maybe_.maybe.md#tap)
* [tapNothing](_src_maybe_.maybe.md#tapnothing)

## Properties

### `Optional` `Readonly` just

• **just**? : *R*

*Defined in [src/maybe.ts:78](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L78)*

___

### `Readonly` kind

• **kind**: *"just" | "nothing"*

*Defined in [src/maybe.ts:77](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L77)*

## Methods

###  chain

▸ **chain**‹**R2**›(`op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:112](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L112)*

Chain multiple functions returning Maybe

**`example`** 
```typescript
// test(just(42))  - just 21
// test(just(41))  - nothing
// test(nothing()) - nothing
function test(arg: Maybe<number>): Maybe<number> {
  return arg.chain((magic) => {
    return magic % 2 === 0 ? just(magic / 2) : nothing();
  });
}
```

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

transformer function for the underlying value which can also return nothing

▸ (`value`: R): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

___

###  chainNothing

▸ **chainNothing**‹**R2**›(`op`: function): *[Maybe](_src_maybe_.maybe.md)‹R | R2›*

*Defined in [src/maybe.ts:142](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L142)*

Chain fallback also returning Maybe

**`note`** ```typescript
chainNothing<R2>(op: () => Maybe<R2>): Just<R> | Maybe<R2>; // this version of typings compiles 4 times faster
```

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

transformer function to be called in case of nothing

▸ (): *[Maybe](_src_maybe_.maybe.md)‹R2›*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R | R2›*

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Maybe](_src_maybe_.maybe.md)‹R2›*

*Defined in [src/maybe.ts:94](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L94)*

Maybe fmap transformer

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

transformer function for the underlying value

Returns 'nothing' without invoking transformer if wrapped value is already 'nothing'

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R2›*

___

###  fmapNothing

▸ **fmapNothing**‹**R2**›(`op`: function): *[Just](_src_maybe_.just.md)‹R | R2›*

*Defined in [src/maybe.ts:132](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L132)*

inverse maybe fmap transformer

**`note`** ```typescript
fmapNothing<R2>(op: () => R2): Just<R2> | Just<R>; // this version of typings compiles 4 times faster
```

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

transformer function to be called in case of 'nothing'

Returns self without invoking transformer if wrapped value is not 'nothing', effectively acting as a fallback method

▸ (): *R2*

**Returns:** *[Just](_src_maybe_.just.md)‹R | R2›*

___

###  tap

▸ **tap**(`op`: function): *[Maybe](_src_maybe_.maybe.md)‹R›*

*Defined in [src/maybe.ts:86](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L86)*

Maybe peeker

**Parameters:**

▪ **op**: *function*

callback function to be called with underlying value

Returns copy of self no matter whether callback was called or not

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R›*

___

###  tapNothing

▸ **tapNothing**(`op`: function): *[Maybe](_src_maybe_.maybe.md)‹R›*

*Defined in [src/maybe.ts:120](https://github.com/lammonaaf/t-tasks/blob/f57e57b/src/maybe.ts#L120)*

Inverse maybe peeker

**Parameters:**

▪ **op**: *function*

callback function to be called in case of 'nothing'

Returns copy of self no matter whether callback was called or not

▸ (): *void*

**Returns:** *[Maybe](_src_maybe_.maybe.md)‹R›*
