/**
 * Right (correct) value of type R
 *
 * Either data type specialization representing a correct value
 *
 * @template R underlying value type
 */
export interface Right<R> {
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
  tap(op: (value: R) => void): Right<R>;

  /**
   * Either fallback peeker function
   *
   * Applied to 'right value' returns self without invoking callback
   * Applied to 'left error' returns self invoking op(error) in process
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  orTap(op: unknown): Right<R>;

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
  map<R2>(op: (value: R) => R2): Right<R2>;

  /**
   * Either fallback transformer function
   *
   * Applied to 'right value' returns self without invoking transformer
   * Applied to 'left error' returns 'right op(error)'
   *
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'right op(error)'
   */
  orMap(op: unknown): Right<R>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns 'op(value)'
   * Applied to 'left error' returns self without invoking composition function
   *
   * @template TT composition function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'left error'
   */
  chain<TT extends Either<unknown, unknown>>(op: (value: R) => TT): TT;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns self without invoking composition function
   * Applied to 'left error' returns 'op(error)'
   *
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'op(error)'
   */
  orChain(op: unknown): Right<R>;

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
  isRight(): this is Right<R>;

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
  isLeft(): this is Left<never>;
}

/**
 * Left (erroneous) value of type L
 *
 * Either data type specialization representing an erroneous value
 *
 * @template L underlying error type
 */
export interface Left<L> {
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
  tap(op: unknown): Left<L>;

  /**
   * Either fallback peeker function
   *
   * Applied to 'right value' returns self without invoking callback
   * Applied to 'left error' returns self invoking op(error) in process
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  orTap(op: (error: L) => void): Left<L>;

  /**
   * Either transformer function
   *
   * Applied to 'right value' returns 'right op(value)'
   * Applied to 'left error' returns self without invoking transformer
   *
   * @param op transformer to be invoked with underlying value
   * @returns 'right op(value)' or 'left error'
   */
  map(op: unknown): Left<L>;

  /**
   * Either fallback transformer function
   *
   * Applied to 'right value' returns self without invoking transformer
   * Applied to 'left error' returns 'right op(error)'
   *
   * @template R2 transformer function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'right op(error)'
   */
  orMap<R2>(op: (error: L) => R2): Right<R2>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns 'op(value)'
   * Applied to 'left error' returns self without invoking composition function
   *
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'left error'
   */
  chain(op: unknown): Left<L>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns self without invoking composition function
   * Applied to 'left error' returns 'op(error)'
   *
   * @template TT composition function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'op(error)'
   */
  orChain<TT extends Either<unknown, unknown>>(op: (error: L) => TT): TT;

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
  isRight(): this is Right<never>;

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
  isLeft(): this is Left<L>;
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
export type Either<R, L> = Right<R> | Left<L>;

export namespace Either {
  /**
   * Right monad constructor
   *
   * @template R underlying value type
   * @param value underlying value
   * @returns 'right value'
   */
  export function right<R>(value: R): Right<R> {
    return new RightClass<R>(value);
  }

  /**
   * Left monad constructor
   *
   * @template L underlying error type
   * @param error underlying error
   * @returns 'left error'
   */
  export function left<L>(error: L): Left<L> {
    return new LeftClass<L>(error);
  }

  export function fromOptional<L>(value: undefined, error: L): Left<L>;
  export function fromOptional<T, L>(value: Exclude<T, undefined>, error: L): Right<T>;
  export function fromOptional<T, L>(value: T | undefined, error: L): Right<T> | Left<L>;
  export function fromOptional<T, L>(value: T | undefined, error: L) {
    return typeof value !== 'undefined' ? Either.right(value) : Either.left(error);
  }

  export function fromNullable<L>(value: undefined, error: L): Left<L>;
  export function fromNullable<L>(value: null, error: L): Left<L>;
  export function fromNullable<T, L>(value: Exclude<T, null | undefined>, error: L): Right<T>;
  export function fromNullable<T, L>(value: T | null | undefined, error: L): Right<T> | Left<L>;
  export function fromNullable<T, L>(value: T | null | undefined, error: L) {
    return Either.fromOptional(value, error).chain((v) => (v !== null ? Either.right(value) : Either.left(error)));
  }
}

/// --------------------------------------------------------------------------------------
/// Private section
/// --------------------------------------------------------------------------------------

class RightClass<R> implements Right<R> {
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
  isRight(): this is Right<R> {
    return true;
  }
  isLeft(): this is Left<never> {
    return false;
  }
}

class LeftClass<L> implements Left<L> {
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
  isRight(): this is Right<never> {
    return false;
  }
  isLeft(): this is Left<L> {
    return true;
  }
}
