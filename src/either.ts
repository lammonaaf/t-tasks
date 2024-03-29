/**
 * Right (correct) value of type R
 *
 * Either data type specialization representing a correct value
 *
 * @template R underlying value type
 * @template L underlying error type (needed for type merging, in fact alwas considered to be never)
 */
export interface Right<R, L> {
  readonly right: R;

  /**
   * Either peeker function
   *
   * Applied to 'right value' returns self invoking op(value) in process
   * Applied to 'left error' returns self without invoking callback
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  tap(op: (value: R) => void): this;

  /**
   * Either fallback peeker function
   *
   * Applied to 'right value' returns self without invoking callback
   * Applied to 'left error' returns self invoking op(error) in process
   *
   * @param op function to be invoked with underlying error
   * @returns self
   */
  orTap(op: (error: L) => void): this;

  /**
   * Either pattern matching peeker function
   *
   * Applied to 'right value' returns self invoking op.right(value) in process
   * Applied to 'left error' returns self invoking op.left(error) in process
   *
   * @param op.right function to be invoked with underlying value in case of 'right'
   * @param op.left function to be invoked with underlying error in case of 'left'
   * @returns self
   */
  matchTap(op: { right: (value: R) => void; left: (error: L) => void }): this;

  /**
   * Either transformer function
   *
   * Applied to 'right value' returns 'right op(value)'
   * Applied to 'left error' returns self without invoking transformer
   *
   * @template R2 transformer function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'right op(value)' or 'left error'
   */
  // Right case
  map<R2>(this: Right<R, L>, op: (value: R) => R2): Right<R2, never>;
  // General case
  map<R2>(this: Either<R, L>, op: (value: R) => R2): Either<R2, L>;

  /**
   * Either fallback transformer function
   *
   * Applied to 'right value' returns self without invoking transformer
   * Applied to 'left error' returns 'right op(error)'
   *
   * @param op transformer to be invoked with underlying error
   * @returns 'right value' or 'right op(error)'
   */
  // Right case
  orMap<R2>(this: Right<R, L>, op: (error: L) => R2): Right<R, never>;
  // General case
  orMap<R2>(this: Either<R, L>, op: (error: L) => R2): Right<R | R2, never>;

  /**
   * Either pattern matching transformer function
   *
   * Applied to 'right value' returns 'right op.right(value)'
   * Applied to 'left error' returns 'right op.left(error)'
   *
   * @template R2 right transformer function's return type
   * @template R3 left transformer function's return type
   * @param op.right transformer to be invoked with underlying value in case of 'right'
   * @param op.left transformer to be invoked with underlying error in case of 'left'
   * @returns 'right op.right(value)' or 'right op.left(error)'
   */
  // Right case
  matchMap<R2, R3 = R2>(this: Right<R, L>, op: { right: (value: R) => R2; left: (error: L) => R3 }): Right<R2, never>;
  // General case
  matchMap<R2, R3 = R2>(this: Either<R, L>, op: { right: (value: R) => R2; left: (error: L) => R3 }): Right<R2 | R3, never>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns 'op(value)'
   * Applied to 'left error' returns self without invoking composition function
   *
   * @template R2 transformer function result's underlying value type
   * @template L2 transformer function result's underlying error type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'left error'
   */
  // Right cases
  chain<R2, L2>(this: Right<R, L>, op: (value: R) => Right<R2, L2>): Right<R2, never>;
  chain<R2, L2>(this: Right<R, L>, op: (value: R) => Left<R2, L2>): Left<never, L2>;
  chain<R2, L2>(this: Right<R, L>, op: (value: R) => Either<R2, L2>): Either<R2, L2>;
  // General cases
  chain<R2, L2>(this: Either<R, L>, op: (value: R) => Right<R2, L2>): Either<R2, L>;
  chain<R2, L2>(this: Either<R, L>, op: (value: R) => Left<R2, L2>): Left<never, L | L2>;
  chain<R2, L2>(this: Either<R, L>, op: (value: R) => Either<R2, L2>): Either<R2, L | L2>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns self without invoking composition function
   * Applied to 'left error' returns 'op(error)'
   *
   * @template R2 transformer function result's underlying value type
   * @template L2 transformer function result's underlying error type
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'op(error)'
   */
  // Right cases
  orChain<R2, L2>(this: Right<R, L>, op: (error: L) => Right<R2, L2>): Right<R, never>;
  orChain<R2, L2>(this: Right<R, L>, op: (error: L) => Left<R2, L2>): Right<R, never>;
  orChain<R2, L2>(this: Right<R, L>, op: (error: L) => Either<R2, L2>): Right<R, never>;
  // General cases
  orChain<R2, L2>(this: Either<R, L>, op: (error: L) => Right<R2, L2>): Right<R | R2, never>;
  orChain<R2, L2>(this: Either<R, L>, op: (error: L) => Left<R2, L2>): Either<R, L2>;
  orChain<R2, L2>(this: Either<R, L>, op: (error: L) => Either<R2, L2>): Either<R | R2, L2>;

  /**
   * Either pattern matching composition function
   *
   * Applied to 'right value' returns 'op.right(value)'
   * Applied to 'left error' returns 'op.left(error)'
   *
   * @template R2 right transformer function result's underlying value type
   * @template L2 right transformer function result's underlying error type
   * @template R3 left transformer function result's underlying value type
   * @template L3 left transformer function result's underlying error type
   * @param op.right transformer to be invoked with underlying value in case of 'right'
   * @param op.left transformer to be invoked with underlying error in case of 'left'
   * @returns 'op(value)' or 'op(error)'
   */
  // Right cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Right<R3, L3> }): Right<R2, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Right<R3, L3> }): Left<never, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Left<R3, L3> }): Right<R2, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Left<R3, L3> }): Left<never, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Right<R3, L3> }): Either<R2, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Left<R3, L3> }): Either<R2, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Either<R3, L3> }): Right<R2, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Either<R3, L3> }): Left<never, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R2, L2>;
  // General cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Right<R3, L3> }): Right<R2 | R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Right<R3, L3> }): Either<R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Left<R3, L3> }): Either<R2, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Left<R3, L3> }): Left<never, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Right<R3, L3> }): Either<R2 | R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Left<R3, L3> }): Either<R2, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R2 | R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R3, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R2 | R3, L2 | L3>;

  /**
   * Either type guard for 'right'
   *
   * @returns 'true' in case this is 'right value' (and resolves type to be 'right')
   *
   * @example
   * ```typescript
   * if (either.isRight()) {
   *   console.log(either.right)
   * }
   * ```
   */
  isRight(): this is Right<R, L>;

  /**
   * Either type guard for 'left'
   *
   * @returns 'true' in case this is 'left error' (and resolves type to be 'left')
   *
   * @example
   * ```typescript
   * if (either.isLeft()) {
   *   console.error(either.left)
   * }
   * ```
   */
  isLeft(): this is Left<R, L>;

  /**
   * Wrap Maybe to singleton generator
   *
   * Userful in order to avoid ambiguous yied types
   *
   * @returns generator of Maybe wrapping this
   */
   generator: EitherGeneratorFunction<[], R, Right<R, L>, R>
}

/**
 * Left (erroneous) value of type L
 *
 * Either data type specialization representing an erroneous value
 *
 * @remplate R underlying value type (needed for type merging, in fact alwas considered to be never)
 * @template L underlying error type
 */
export interface Left<R, L> {
  readonly left: L;

  /**
   * Either peeker function
   *
   * Applied to 'right value' returns self invoking op(value) in process
   * Applied to 'left error' returns self without invoking callback
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  tap(op: (value: R) => void): this;

  /**
   * Either fallback peeker function
   *
   * Applied to 'right value' returns self without invoking callback
   * Applied to 'left error' returns self invoking op(error) in process
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  orTap(op: (error: L) => void): this;

  /**
   * Either pattern matching peeker function
   *
   * Applied to 'right value' returns self invoking op.right(value) in process
   * Applied to 'left error' returns self invoking op.left(error) in process
   *
   * @param op.right function to be invoked with underlying value in case of 'right'
   * @param op.left function to be invoked with underlying error in case of 'left'
   * @returns self
   */
  matchTap(op: { right: (value: R) => void; left: (error: L) => void }): this;

  /**
   * Either transformer function
   *
   * Applied to 'right value' returns 'right op(value)'
   * Applied to 'left error' returns self without invoking transformer
   *
   * @template R2 transformer function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'right op(value)' or 'left error'
   */
  // Left case
  map<R2>(this: Left<R, L>, op: (value: R) => R2): Left<never, L>;
  // General case
  map<R2>(this: Either<R, L>, op: (value: R) => R2): Either<R2, L>;

  /**
   * Either fallback transformer function
   *
   * Applied to 'right value' returns self without invoking transformer
   * Applied to 'left error' returns 'right op(error)'
   *
   * @param op transformer to be invoked with underlying error
   * @returns 'right value' or 'right op(error)'
   */
  // Left case
  orMap<R2>(this: Left<R, L>, op: (error: L) => R2): Right<R2, never>;
  // General case
  orMap<R2>(this: Either<R, L>, op: (error: L) => R2): Right<R | R2, never>;

  /**
   * Either pattern matching transformer function
   *
   * Applied to 'right value' returns 'right op.right(value)'
   * Applied to 'left error' returns 'right op.left(error)'
   *
   * @template R2 right transformer function's return type
   * @template R3 left transformer function's return type
   * @param op.right transformer to be invoked with underlying value in case of 'right'
   * @param op.left transformer to be invoked with underlying error in case of 'left'
   * @returns 'right op.right(value)' or 'right op.left(error)'
   */
  // Left case
  matchMap<R2, R3 = R2>(this: Left<R, L>, op: { right: (value: R) => R2; left: (error: L) => R3 }): Right<R3, never>;
  // General case
  matchMap<R2, R3 = R2>(this: Either<R, L>, op: { right: (value: R) => R2; left: (error: L) => R3 }): Right<R2 | R3, never>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns 'op(value)'
   * Applied to 'left error' returns self without invoking composition function
   *
   * @template R2 transformer function result's underlying value type
   * @template L2 transformer function result's underlying error type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'left error'
   */
  // Right cases
  chain<R2, L2>(this: Left<R, L>, op: (value: R) => Right<R2, L2>): Left<never, L>;
  chain<R2, L2>(this: Left<R, L>, op: (value: R) => Left<R2, L2>): Left<never, L>;
  chain<R2, L2>(this: Left<R, L>, op: (value: R) => Either<R2, L2>): Left<never, L>;
  // General cases
  chain<R2, L2>(this: Either<R, L>, op: (value: R) => Right<R2, L2>): Either<R2, L>;
  chain<R2, L2>(this: Either<R, L>, op: (value: R) => Left<R2, L2>): Left<never, L | L2>;
  chain<R2, L2>(this: Either<R, L>, op: (value: R) => Either<R2, L2>): Either<R2, L | L2>;

  /**
   * Either fallback composition function
   *
   * Applied to 'right value' returns self without invoking composition function
   * Applied to 'left error' returns 'op(error)'
   *
   * @template R2 transformer function result's underlying value type
   * @template L2 transformer function result's underlying error type
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'op(error)'
   */
  // Left cases
  orChain<R2, L2>(this: Left<R, L>, op: (error: L) => Right<R2, L2>): Right<R2, never>;
  orChain<R2, L2>(this: Left<R, L>, op: (error: L) => Left<R2, L2>): Left<never, L2>;
  orChain<R2, L2>(this: Left<R, L>, op: (error: L) => Either<R2, L2>): Either<R2, L2>;
  // General cases
  orChain<R2, L2>(this: Either<R, L>, op: (error: L) => Right<R2, L2>): Right<R | R2, never>;
  orChain<R2, L2>(this: Either<R, L>, op: (error: L) => Left<R2, L2>): Either<R, L2>;
  orChain<R2, L2>(this: Either<R, L>, op: (error: L) => Either<R2, L2>): Either<R | R2, L2>;

  /**
   * Either pattern matching composition function
   *
   * Applied to 'right value' returns 'op.right(value)'
   * Applied to 'left error' returns 'op.left(error)'
   *
   * @template R2 right transformer function result's underlying value type
   * @template L2 right transformer function result's underlying error type
   * @template R3 left transformer function result's underlying value type
   * @template L3 left transformer function result's underlying error type
   * @param op.right transformer to be invoked with underlying value in case of 'right'
   * @param op.left transformer to be invoked with underlying error in case of 'left'
   * @returns 'op(value)' or 'op(error)'
   */
  // Left cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Right<R3, L3> }): Right<R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Right<R3, L3> }): Right<R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Left<R3, L3> }): Left<never, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Left<R3, L3> }): Left<never, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Right<R3, L3> }): Right<R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Left<R3, L3> }): Left<never, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R3, L3>;
  // General cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Right<R3, L3> }): Right<R2 | R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Right<R3, L3> }): Either<R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Left<R3, L3> }): Either<R2, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Left<R3, L3> }): Left<never, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Right<R3, L3> }): Either<R2 | R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Left<R3, L3> }): Either<R2, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R2 | R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R3, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: L) => Either<R3, L3> }): Either<R2 | R3, L2 | L3>;

  /**
   * Either type guard for 'right'
   *
   * @returns 'true' in case this is 'right value' (and resolves type to be 'right')
   *
   * @example
   * ```typescript
   * if (either.isRight()) {
   *   console.log(either.right)
   * }
   * ```
   */
  isRight(): this is Right<R, L>;

  /**
   * Either type guard for 'left'
   *
   * @returns 'true' in case this is 'left error' (and resolves type to be 'left')
   *
   * @example
   * ```typescript
   * if (either.isLeft()) {
   *   console.error(either.left)
   * }
   * ```
   */
  isLeft(): this is Left<R, L>;

  /**
   * Wrap Maybe to singleton generator
   *
   * Userful in order to avoid ambiguous yied types
   *
   * @returns generator of Maybe wrapping this
   */
   generator: EitherGeneratorFunction<[], R, Left<R, L>, R>
}

/**
 * Either data type: either Right value of type R or Left value of type L
 *
 * As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
 * Used throughout the library to represent the result of failable operations, namely failed tasks
 *
 * @template R underlying value type
 * @template L underlying error type
 */
export type Either<R, L> = Right<R, L> | Left<R, L>;

export namespace Right {
  /**
   * Standalone Right value extractor
   *
   * Userful for passing as a function to collection transformers
   *
   * @template R underlying value type
   * @template L underlying error type
   * @param right Right instance
   * @returns underlying value
   */
  export function right<R, L>(right: Right<R, L>) {
    return right.right;
  }
}

export namespace Left {
  /**
   * Standalone Left error extractor
   *
   * Userful for passing as a function to collection transformers
   *
   * @template R underlying value type
   * @template L underlying error type
   * @param left Left instance
   * @returns underlying error
   */
  export function left<R, L>(left: Left<R, L>) {
    return left.left;
  }
}

export type EitherGenerator<T, TT extends Either<T, any>, R> = Generator<TT, R, T>;
export type EitherGeneratorFunction<A extends unknown[], T, TT extends Either<T, any>, R> = (...args: A) => EitherGenerator<T, TT, R>;

export namespace Either {
  /**
   * Right monad constructor
   *
   * @template R underlying value type
   * @param value underlying value
   * @returns 'right value'
   */
  export function right<R>(value: R): Right<R, never> {
    return new RightClass<R>(value);
  }

  /**
   * Left monad constructor
   *
   * @template L underlying error type
   * @param error underlying error
   * @returns 'left error'
   */
  export function left<L>(error: L): Left<never, L> {
    return new LeftClass<L>(error);
  }

  /**
   * Either constructor from optional value
   *
   * Resolves to 'left error' in case of undefined value and 'right value' otherwise
   *
   * @param value possibly undefined value
   * @param error error to use in case of undefined value
   * @returns either 'right value' or 'left error'
   */
  export function fromOptional<L>(value: undefined, error: L): Left<never, L>;
  export function fromOptional<R>(value: Exclude<R, undefined>, error: unknown): Right<R, never>;
  export function fromOptional<R, L>(value: R | undefined, error: L): Either<R, L>;
  export function fromOptional<R, L>(value: R | undefined, error: L) {
    return typeof value !== 'undefined' ? Either.right(value) : Either.left(error);
  }

  /**
   * Either constructor from optional or nullable value
   *
   * Resolves to 'left error' in case of undefined or null value and 'right value' otherwise
   *
   * @param value possibly undefined or nullable value
   * @param error error to use in case of undefined or nullable value
   * @returns either 'right value' or 'left error'
   */
  export function fromNullable<L>(value: undefined, error: L): Left<never, L>;
  export function fromNullable<L>(value: null, error: L): Left<never, L>;
  export function fromNullable<R>(value: Exclude<R, null | undefined>, error: unknown): Right<R, never>;
  export function fromNullable<R, L>(value: R | null | undefined, error: L): Either<R, L>;
  export function fromNullable<R, L>(value: R | null | undefined, error: L) {
    return Either.fromOptional(value, error).chain((v) => (v !== null ? Either.right(value) : Either.left(error)));
  }

  /**
   * Standalone type guard for 'right'
   *
   * Userful for passing as a predicate to collection transformers
   *
   * @template R underlying value type
   * @param either Either instance
   * @returns 'true' in case argument is 'right value' (and resolves type to be 'right')
   */
  export function isRight<R, L>(either: Either<R, L>): either is Right<R, never> {
    return either.isRight();
  }

  /**
   * Standalone type guard for 'left'
   *
   * Userful for passing as a predicate to collection transformers
   *
   * @template R underlying value type
   * @param either Either instance
   * @returns 'true' in case argument is 'left error' (and resolves type to be 'left')
   */
  export function isLeft<R, L>(either: Either<R, L>): either is Left<never, L> {
    return either.isLeft();
  }

  /**
   * Standalone list predicate
   *
   * @param eithers a list of Either
   * @returns true in case every list element is Right
   */
  export function everyRight<R, L>(eithers: Either<R, L>[]): eithers is Right<R, never>[] {
    return eithers.every(Either.isRight);
  }

  /**
   * Standalone list predicate
   *
   * @param eithers a list of Either
   * @returns true in case at least one list element is Right
   */
  export function someRight<R, L>(eithers: Either<R, L>[]): boolean {
    return eithers.some(Either.isRight);
  }

  /**
   * Standalone list predicate
   *
   * @param eithers a list of Either
   * @returns true in case every list element is Left
   */
  export function everyLeft<R, L>(eithers: Either<R, L>[]): eithers is Left<never, L>[] {
    return eithers.every(Either.isLeft);
  }

  /**
   * Standalone list predicate
   *
   * @param eithers a list of Either
   * @returns true in case at least one list element is Left
   */
  export function someLeft<R, L>(eithers: Either<R, L>[]): boolean {
    return eithers.some(Either.isLeft);
  }

  /**
   * Create compound Either from generator function
   *
   * Applying yield to a Maybe within the generator function unwraps the Maybe and returns underlying value in case of success
   * However the convinient option for typescript is to use ```yield* maybe.generator()``` as othervise one may have to deal with union types
   *
   * @template TT yielded Maybe type
   * @template R returned underlying type
   * @param maybeGeneratorFunction Maybe generator function
   * @returns Just wrapping the result of generator function or Nothing
   * ```
   */
  export function generate<T, TT extends Either<T, any>, R>(eitherGeneratorFunction: EitherGeneratorFunction<[], T, TT, R>): Either<R, any> {
    const generator = eitherGeneratorFunction();

    const sequentor = (next: IteratorResult<TT, R>): Either<R, any> => {
      return next.done ? (
        Either.right(next.value)
      ) : (
        next.value.matchChain<R, any>({
          right: (value) => sequentor(generator.next(value)),
          left: Either.left,
        })
      );
    };

    return Either.right(undefined).chain(() => sequentor(generator.next()));
  }
}

/// --------------------------------------------------------------------------------------
/// Private section
/// --------------------------------------------------------------------------------------

class RightClass<R> implements Right<R, never> {
  constructor(readonly right: R) {}

  tap(op: (value: R) => void) {
    op(this.right);

    return this;
  }
  orTap() {
    return this;
  }
  map<R2>(op: (value: R) => R2) {
    return Either.right(op(this.right));
  }
  orMap() {
    return this;
  }
  chain<TT extends Either<unknown, unknown>>(op: (value: R) => TT) {
    return op(this.right);
  }
  orChain() {
    return this;
  }
  isRight(): this is Right<R, never> {
    return true;
  }
  isLeft(): this is Left<R, never> {
    return false;
  }
  matchTap(op: { right: (value: R) => void }) {
    return this.tap(op.right);
  }
  matchMap<R2>(op: { right: (value: R) => R2 }) {
    return this.map(op.right);
  }
  matchChain<TT extends Either<unknown, unknown>>(op: { right: (value: R) => TT }) {
    return this.chain(op.right);
  }
  generator() {
    return (function*(value) {
      return (yield value) as R;
    })(this);
  }
}

class LeftClass<L> implements Left<never, L> {
  constructor(readonly left: L) {}

  tap() {
    return this;
  }
  orTap(op: (error: L) => void) {
    op(this.left);

    return this;
  }
  map() {
    return this;
  }
  orMap<R2>(op: (error: L) => R2) {
    return Either.right(op(this.left));
  }
  chain() {
    return this;
  }
  orChain<TT extends Either<unknown, unknown>>(op: (error: L) => TT) {
    return op(this.left);
  }
  isRight(): this is Right<never, L> {
    return false;
  }
  isLeft(): this is Left<never, L> {
    return true;
  }
  matchTap(op: { left: (error: L) => void }) {
    return this.orTap(op.left);
  }
  matchMap<R2>(op: { left: (error: L) => R2 }) {
    return this.orMap(op.left);
  }
  matchChain<TT extends Either<unknown, unknown>>(op: { left: (error: L) => TT }) {
    return this.orChain(op.left);
  }
  generator() {
    return (function*(value) {
      return (yield value) as never;
    })(this);
  }
}
