/**
 * Right (correct) value of type R
 *
 * Either data type specialization representing a correct value
 */
export interface RightBase<R> {
  readonly kind: 'right';
  readonly right: R;
}

/**
 * Left (erroneous) value of type L
 *
 * Either data type specialization representing an erroneous value
 */
export interface LeftBase<L> {
  readonly kind: 'left';
  readonly left: L;
}

/**
 * Either data type: either Right value of type R or Left value of type L
 */
export type EitherBase<R, L> = Right<R> | Left<L>;

/**
 * Either monad interface for "Right" specialization
 */
export interface Right<R> extends RightBase<R> {
  /**
   * tap applied to 'right value' returns self invoking op(value) in process
   */
  tap(op: (value: R) => void): Right<R>;
  /**
   * fmap applied to 'right value' returns 'right op(value)'
   */
  fmap<R2>(op: (value: R) => R2): Right<R2>;
  /**
   * chain applied to 'right value' returns 'op(value)'
   */
  chain<R2, L2>(op: (value: R) => Either<R2, L2>): Either<R2, L2>;
  /**
   * tapLeft applied to 'right value' returns self not invoking callback
   */
  tapLeft(): Right<R>;
  /**
   * fmapLeft applied to 'right value' returns self not invoking callback
   */
  fmapLeft(): Right<R>;
  /**
   * chainLeft applied to 'right value' returns self not invoking callback
   */
  chainLeft(): Right<R>;
}

/**
 * Either monad interface for "Left" specialization
 */
export interface Left<L> extends LeftBase<L> {
  /**
   * tap applied to 'left error' returns self not invoking callback
   */
  tap(): Left<L>;
  /**
   * fmap applied to 'left error' returns self not invoking transformer
   */
  fmap(): Left<L>;
  /**
   * chain applied to 'left error' returns self not invoking transformer
   */
  chain(): Left<L>;
  /**
   * tapLeft applied to 'left error' returns self invoking op(error) in process
   */
  tapLeft(op: (error: L) => void): Left<L>;
  /**
   * fmapLeft applied to 'left error' returns 'just op(error)'
   */
  fmapLeft<R2>(op: (error: L) => R2): Right<R2>;
  /**
   * chainLeft applied to 'left error' returns 'op(error)'
   */
  chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>): Either<R2, L2>;
}

/**
 * Genric Either monad interface
 *
 * As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
 * Used throughout the library to represent the result of failable operations, namely failed tasks
 */
export type Either<R, L> = EitherBase<R, L> & {
  /**
   * Either peeker
   * @param op callback function to be called with underlying value
   *
   * Returns copy of self no matter whether callback was called or not
   */
  tap(op: (value: R) => void): Either<R, L>;

  /**
   * Either fmap transformer
   * @param op transformer function for the underlying value
   *
   * Returns 'left error' without invoking transformer if wrapped value is already 'left error'
   */
  fmap<R2>(op: (value: R) => R2): Either<R2, L>;

  /**
   * Chain multiple functions returning Either
   * @param op transformer function for the underlying value which can also return 'left'
   *
   * @example
   * ```typescript
   * // test(right(42))  - right 21
   * // test(right(41))  - left 'failure'
   * // test(left('invalid')) - left 'invalid'
   * function test(arg: Either<number, strign>): Either<number, string> {
   *   return arg.chain((magic) => {
   *     return magic % 2 === 0 ? right(magic / 2) : left('failure');
   *   });
   * }
   * ```
   *
   * @note
   * ```typescript
   * chain<R2, L2>(op: (value: R) => Either<R2, L2>): Either<R2, L2> | Left<L>; // this version of typings compiles 4 times faster
   * ```
   */
  chain<R2, L2>(op: (value: R) => Either<R2, L2>): Either<R2, L | L2>;

  /**
   * Inverse either peeker
   * @param op callback function to be called with underlying value
   *
   * Returns copy of self no matter whether callback was called or not
   */
  tapLeft(op: (error: L) => void): Either<R, L>;

  /**
   * Inverse either fmap tranformer
   * @param op callback function to be called with underlying error
   *
   * Returns self without invoking transformer if wrapped value is not 'left error', effectively acting as a fallback method
   *
   * @note
   * ```typescript
   * fmapLeft<R2>(op: (error: L) => R2): Right<R> | Right<R2>; // this version of typings compiles 4 times faster
   * ```
   */
  fmapLeft<R2>(op: (error: L) => R2): Right<R | R2>;

  /**
   * Chain fallback also returning Either
   * @param op callback function to be called with underlying error
   *
   * Returns self without invoking transformer if wrapped value is not 'left error', effectively acting as a fallback method
   *
   * @note
   * ```typescript
   * chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>): Right<R> | Either<R2, L2>; // this version of typings compiles 4 times faster
   * ```
   */
  chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>): Either<R | R2, L2>;
};

class RightClass<R> implements Right<R> {
  readonly kind = 'right';

  constructor(readonly right: R) {}

  tap(op: (value: R) => void) {
    op(this.right);

    return this;
  }
  fmap<R2>(op: (value: R) => R2) {
    return right(op(this.right));
  }
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
}

class LeftClass<L> implements Left<L> {
  readonly kind = 'left';

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
  chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>) {
    return op(this.left);
  }
}

/**
 * Right monad constructor
 * @param value underlying value
 */
export function right<R>(value: R): Right<R> {
  return new RightClass<R>(value);
}

/**
 * Left monad constructor
 * @param error underlying error
 */
export function left<L>(error: L): Left<L> {
  return new LeftClass<L>(error);
}

/**
 * Pattern mathching for 'right'
 * @param either 'right value' or 'left error'
 *
 * Returns 'true' in case either is right (and resolves argument type to be 'right value')
 *
 * @example
 * ```typescript
 * if (isRight(either)) {
 *   console.log(either.rigth)
 * }
 * ```
 */
export function isRight<R, TT extends Either<R, any>>(either: TT): either is Right<R> & TT {
  return either.kind === 'right';
}

/**
 * Pattern mathching for 'left'
 * @param either 'right value' or 'left error'
 *
 * Returns 'true' in case either is left (and resolves argument type to be 'left error')
 */
export function isLeft<L, TT extends Either<any, L>>(either: TT): either is Left<L> & TT {
  return either.kind === 'left';
}
