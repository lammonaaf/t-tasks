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
   * Either transformer function
   *
   * Applied to 'right value' returns 'right op(value)'
   * Applied to 'left error' returns self without invoking transformer
   *
   * @template R2 transformer function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'right op(value)' or 'left error'
   */
  fmap<R2>(op: (value: R) => R2): Right<R2>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns 'op(value)'
   * Applied to 'left error' returns self without invoking composition function
   *
   * @template R2 composition function's return type's underlying type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'left error'
   */
  chain<TT extends Either<any, any>>(op: (value: R) => TT): TT;

  /**
   * Either fallback peeker function
   *
   * Applied to 'right value' returns self without invoking callback
   * Applied to 'left error' returns self invoking op(error) in process
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  tapLeft(op: unknown): Right<R>;

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
  fmapLeft(op: unknown): Right<R>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns self without invoking composition function
   * Applied to 'left error' returns 'op(error)'
   *
   * @template R2 composition function's return type's underlying type
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'op(error)'
   */
  chainLeft(op: unknown): Right<R>;

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
   * Either transformer function
   *
   * Applied to 'right value' returns 'right op(value)'
   * Applied to 'left error' returns self without invoking transformer
   *
   * @template R2 transformer function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'right op(value)' or 'left error'
   */
  fmap(op: unknown): Left<L>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns 'op(value)'
   * Applied to 'left error' returns self without invoking composition function
   *
   * @template R2 composition function's return type's underlying type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'left error'
   */
  chain(op: unknown): Left<L>;

  /**
   * Either fallback peeker function
   *
   * Applied to 'right value' returns self without invoking callback
   * Applied to 'left error' returns self invoking op(error) in process
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  tapLeft(op: (error: L) => void): Left<L>;

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
  fmapLeft<R2>(op: (error: L) => R2): Right<R2>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns self without invoking composition function
   * Applied to 'left error' returns 'op(error)'
   *
   * @template R2 composition function's return type's underlying type
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'op(error)'
   */
  chainLeft<TT extends Either<any, any>>(op: (error: L) => TT): TT;

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

/// --------------------------------------------------------------------------------------
/// Private section
/// --------------------------------------------------------------------------------------

class RightClass<R> implements Right<R> {
  constructor(readonly right: R) {}

  tap(op: (value: R) => void) {
    op(this.right);

    return this;
  }
  fmap<R2>(op: (value: R) => R2) {
    return right(op(this.right));
  }
  chain<R2>(op: (value: R) => Right<R2>): Right<R2>;
  chain<L2>(op: (value: R) => Left<L2>): Left<L2>;
  chain<R2, L2>(op: (value: R) => Either<R2, L2>) {
    return op(this.right);
  }
  tapLeft() {
    return this;
  }
  fmapLeft() {
    return this;
  }
  chainLeft() {
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
  fmap() {
    return this;
  }
  chain() {
    return this;
  }
  tapLeft(op: (error: L) => void) {
    op(this.left);

    return this;
  }
  fmapLeft<R2>(op: (error: L) => R2) {
    return right(op(this.left));
  }
  chainLeft<L2>(op: (error: L) => Left<L2>): Left<L2>;
  chainLeft<R2>(op: (error: L) => Right<R2>): Right<R2>;
  chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>) {
    return op(this.left);
  }
  isRight(): this is Right<never> {
    return false;
  }
  isLeft(): this is Left<L> {
    return true;
  }
}
