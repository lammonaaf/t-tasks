[t-tasks](../README.md) › [Globals](../globals.md) › ["src/either"](../modules/_src_either_.md) › [Either](_src_either_.either.md)

# Interface: Either ‹**R, L**›

Either data type: either Right value of type R or Left value of type L

As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
Used throughout the library to represent the result of failable operations, namely failed tasks

## Type parameters

▪ **R**

▪ **L**

## Hierarchy

* **Either**

## Index

### Properties

* [kind](_src_either_.either.md#readonly-kind)
* [left](_src_either_.either.md#optional-readonly-left)
* [right](_src_either_.either.md#optional-readonly-right)

### Methods

* [chain](_src_either_.either.md#chain)
* [chainLeft](_src_either_.either.md#chainleft)
* [fmap](_src_either_.either.md#fmap)
* [fmapLeft](_src_either_.either.md#fmapleft)
* [tap](_src_either_.either.md#tap)
* [tapLeft](_src_either_.either.md#tapleft)

## Properties

### `Readonly` kind

• **kind**: *"left" | "right"*

*Defined in [src/either.ts:78](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L78)*

___

### `Optional` `Readonly` left

• **left**? : *L*

*Defined in [src/either.ts:80](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L80)*

___

### `Optional` `Readonly` right

• **right**? : *R*

*Defined in [src/either.ts:79](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L79)*

## Methods

###  chain

▸ **chain**‹**R2**, **L2**›(`op`: function): *[Either](_src_either_.either.md)‹R2, L | L2›*

*Defined in [src/either.ts:119](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L119)*

Chain multiple functions returning Either

**`example`** 
```typescript
// test(right(42))  - right 21
// test(right(41))  - left 'failure'
// test(left('invalid')) - left 'invalid'
function test(arg: Either<number, strign>): Either<number, string> {
  return arg.chain((magic) => {
    return magic % 2 === 0 ? right(magic / 2) : left('failure');
  });
}
```

**`note`** 
```typescript
chain<R2, L2>(op: (value: R) => Either<R2, L2>): Either<R2, L2> | Left<L>; // this version of typings compiles 4 times faster
```

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **op**: *function*

transformer function for the underlying value which can also return 'left'

▸ (`value`: R): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R2, L | L2›*

___

###  chainLeft

▸ **chainLeft**‹**R2**, **L2**›(`op`: function): *[Either](_src_either_.either.md)‹R | R2, L2›*

*Defined in [src/either.ts:153](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L153)*

Chain fallback also returning Either

**`note`** 
```typescript
chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>): Right<R> | Either<R2, L2>; // this version of typings compiles 4 times faster
```

**Type parameters:**

▪ **R2**

▪ **L2**

**Parameters:**

▪ **op**: *function*

callback function to be called with underlying error

Returns self without invoking transformer if wrapped value is not 'left error', effectively acting as a fallback method

▸ (`error`: L): *[Either](_src_either_.either.md)‹R2, L2›*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Either](_src_either_.either.md)‹R | R2, L2›*

___

###  fmap

▸ **fmap**‹**R2**›(`op`: function): *[Either](_src_either_.either.md)‹R2, L›*

*Defined in [src/either.ts:96](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L96)*

Either fmap transformer

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

transformer function for the underlying value

Returns 'left error' without invoking transformer if wrapped value is already 'left error'

▸ (`value`: R): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R2, L›*

___

###  fmapLeft

▸ **fmapLeft**‹**R2**›(`op`: function): *[Right](_src_either_.right.md)‹R | R2›*

*Defined in [src/either.ts:140](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L140)*

Inverse either fmap tranformer

**`note`** 
```typescript
fmapLeft<R2>(op: (error: L) => R2): Right<R> | Right<R2>; // this version of typings compiles 4 times faster
```

**Type parameters:**

▪ **R2**

**Parameters:**

▪ **op**: *function*

callback function to be called with underlying error

Returns self without invoking transformer if wrapped value is not 'left error', effectively acting as a fallback method

▸ (`error`: L): *R2*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Right](_src_either_.right.md)‹R | R2›*

___

###  tap

▸ **tap**(`op`: function): *[Either](_src_either_.either.md)‹R, L›*

*Defined in [src/either.ts:88](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L88)*

Either peeker

**Parameters:**

▪ **op**: *function*

callback function to be called with underlying value

Returns copy of self no matter whether callback was called or not

▸ (`value`: R): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | R |

**Returns:** *[Either](_src_either_.either.md)‹R, L›*

___

###  tapLeft

▸ **tapLeft**(`op`: function): *[Either](_src_either_.either.md)‹R, L›*

*Defined in [src/either.ts:127](https://github.com/lammonaaf/t-tasks/blob/f271a8d/src/either.ts#L127)*

Inverse either peeker

**Parameters:**

▪ **op**: *function*

callback function to be called with underlying value

Returns copy of self no matter whether callback was called or not

▸ (`error`: L): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | L |

**Returns:** *[Either](_src_either_.either.md)‹R, L›*
