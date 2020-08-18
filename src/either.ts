/**
 * Right (correct) value of type R
 *
 * Either data type specialization representing a correct value
 *
 * @template R underlying value type
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
   * @param op function to be invoked with underlying value
   * @returns self
   */
  orTap(op: (error: L) => void): this;

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
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'right op(error)'
   */
  // Right case
  orMap<R2>(this: Right<R, L>, op: (error: L) => R2): Right<R, never>;
  // General case
  orMap<R2>(this: Either<R, L>, op: (error: L) => R2): Right<R | R2, never>;

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

  matchTap(op: { right: (value: R) => void; left: (error: any) => void }): this;

  // Right case
  matchMap<R2, R3 = R2>(this: Right<R, L>, op: { right: (value: R) => R2; left: (error: any) => R3 }): Right<R2, never>;
  // General case
  matchMap<R2, R3 = R2>(this: Either<R, L>, op: { right: (value: R) => R2; left: (error: any) => R3 }): Right<R2 | R3, never>;

  // Right cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Right<R3, L3> }): Right<R2, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Right<R3, L3> }): Left<never, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Left<R3, L3> }): Right<R2, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Left<R3, L3> }): Left<never, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Right<R3, L3> }): Either<R2, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Left<R3, L3> }): Either<R2, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Either<R3, L3> }): Right<R2, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Either<R3, L3> }): Left<never, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Right<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R2, L2>;
  // General cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Right<R3, L3> }): Right<R2 | R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Right<R3, L3> }): Either<R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Left<R3, L3> }): Either<R2, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Left<R3, L3> }): Left<never, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Right<R3, L3> }): Either<R2 | R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Left<R3, L3> }): Either<R2, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R2 | R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R3, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R2 | R3, L2 | L3>;

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
}

/**
 * Left (erroneous) value of type L
 *
 * Either data type specialization representing an erroneous value
 *
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
   * Either transformer function
   *
   * Applied to 'right value' returns 'right op(value)'
   * Applied to 'left error' returns self without invoking transformer
   *
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
   * @template R2 transformer function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'right value' or 'right op(error)'
   */
  // Left case
  orMap<R2>(this: Left<R, L>, op: (error: L) => R2): Right<R2, never>;
  // General case
  orMap<R2>(this: Either<R, L>, op: (error: L) => R2): Right<R | R2, never>;

  /**
   * Either composition function
   *
   * Applied to 'right value' returns 'op(value)'
   * Applied to 'left error' returns self without invoking composition function
   *
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
   * Either composition function
   *
   * Applied to 'right value' returns self without invoking composition function
   * Applied to 'left error' returns 'op(error)'
   *
   * @template TT composition function's return type
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

  matchTap(op: { right: (value: R) => void; left: (error: any) => void }): this;

  // Left case
  matchMap<R2, R3 = R2>(this: Left<R, L>, op: { right: (value: R) => R2; left: (error: any) => R3 }): Right<R3, never>;
  // General case
  matchMap<R2, R3 = R2>(this: Either<R, L>, op: { right: (value: R) => R2; left: (error: any) => R3 }): Right<R2 | R3, never>;

  // Left cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Right<R3, L3> }): Right<R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Right<R3, L3> }): Right<R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Left<R3, L3> }): Left<never, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Left<R3, L3> }): Left<never, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Right<R3, L3> }): Right<R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Left<R3, L3> }): Left<never, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Left<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R3, L3>;
  // General cases
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Right<R3, L3> }): Right<R2 | R3, never>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Right<R3, L3> }): Either<R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Left<R3, L3> }): Either<R2, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Left<R3, L3> }): Left<never, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Right<R3, L3> }): Either<R2 | R3, L2>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Left<R3, L3> }): Either<R2, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Right<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R2 | R3, L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Left<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R3, L2 | L3>;
  matchChain<R2, L2, R3 = R2, L3 = L2>(this: Either<R, L>, op: { right: (value: R) => Either<R2, L2>; left: (error: any) => Either<R3, L3> }): Either<R2 | R3, L2 | L3>;

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

  export function fromOptional<L>(value: undefined, error: L): Left<never, L>;
  export function fromOptional<R>(value: Exclude<R, undefined>, error: unknown): Right<R, never>;
  export function fromOptional<R, L>(value: R | undefined, error: L): Either<R, L>;
  export function fromOptional<R, L>(value: R | undefined, error: L) {
    return typeof value !== 'undefined' ? Either.right(value) : Either.left(error);
  }

  export function fromNullable<L>(value: undefined, error: L): Left<never, L>;
  export function fromNullable<L>(value: null, error: L): Left<never, L>;
  export function fromNullable<R>(value: Exclude<R, null | undefined>, error: unknown): Right<R, never>;
  export function fromNullable<R, L>(value: R | null | undefined, error: L): Either<R, L>;
  export function fromNullable<R, L>(value: R | null | undefined, error: L) {
    return Either.fromOptional(value, error).chain((v) => (v !== null ? Either.right(value) : Either.left(error)));
  }

  export function isRight<R, L>(either: Either<R, L>): either is Right<R, never> {
    return either.isRight();
  }

  export function isLeft<R, L>(either: Either<R, L>): either is Left<never, L> {
    return either.isLeft();
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
  matchTap(op: { left: (error: any) => void }) {
    return this.orTap(op.left);
  }
  matchMap<R2>(op: { left: (error: any) => R2 }) {
    return this.orMap(op.left);
  }
  matchChain<TT extends Either<unknown, unknown>>(op: { left: (error: any) => TT }) {
    return this.orChain(op.left);
  }
}
