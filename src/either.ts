export interface RightBase<R> {
  readonly kind: 'right';
  readonly right: R;
}

export interface LeftBase<L> {
  readonly kind: 'left';
  readonly left: L;
}

export type EitherBase<R, L> = Right<R> | Left<L>;

/**
 * Right (correct) value
 *
 * Either monad specialization representing a right (correct) result
 */
export interface Right<R> extends RightBase<R> {
  tap(op: (value: R) => void): Right<R>;
  /**
   * fmap applied to 'right value' returns 'right op(value)'
   */
  fmap<R2>(op: (value: R) => R2): Right<R2>;
  /**
   * chain applied to 'right value' returns 'op(value)'
   */
  chain<R2, L2>(op: (value: R) => Either<R2, L2>): Either<R2, L2>;

  tapLeft(): Right<R>;
  fmapLeft(): Right<R>;
  chainLeft(): Right<R>;
}

/**
 * Right (erroneous) value
 *
 * Either monad specialization representing a left (erroneous) result
 */
export interface Left<L> extends LeftBase<L> {
  tap(): Left<L>;
  /**
   * fmap applied to 'left error' always returns 'left error'
   */
  fmap(): Left<L>;
  /**
   * chain applied to 'left error' always returns 'left error'
   */
  chain(): Left<L>;

  tapLeft(op: (error: L) => void): Left<L>;
  fmapLeft<R2>(op: (error: L) => R2): Right<R2>;
  chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>): Either<R2, L2>;
}

/**
 * Genric Either monad
 *
 * As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
 * Used throughout the library to represent the result of failable operations, namely failed tasks
 */
export type Either<R, L> = EitherBase<R, L> & {
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
   */
  chain<R2, L2>(op: (value: R) => Either<R2, L2>): Either<R2, L2> | Left<L>;

  tapLeft(op: (error: L) => void): Either<R, L>;
  fmapLeft<R2>(op: (error: L) => R2): Right<R> | Right<R2>;
  chainLeft<R2, L2>(op: (error: L) => Either<R2, L2>): Right<R> | Either<R2, L2>;
};

export function isRight<R>(either: Either<R, any>): either is Right<R> {
  return either.kind === 'right';
}

export function isLeft<L>(either: Either<any, L>): either is Left<L> {
  return either.kind === 'left';
}

class RightClass<R> implements Right<R> {
  readonly kind = 'right';

  constructor(readonly right: R) {}

  tap(op: (value: R) => void) {
    op(this.right);

    return this;
  }
  /**
   * fmap applied to 'right value' returns 'right op(value)'
   */
  fmap<R2>(op: (value: R) => R2) {
    return right(op(this.right));
  }
  /**
   * chain applied to 'right value' returns 'op(value)'
   */
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
  /**
   * fmap applied to 'left error' always returns 'left error'
   */
  fmap() {
    return this;
  }
  /**
   * chain applied to 'left error' always returns 'left error'
   */
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

export function right<R>(value: R): Right<R> {
  return new RightClass<R>(value);
}

export function left<L>(error: L): Left<L> {
  return new LeftClass<L>(error);
}
