export type Right<R> = {
  readonly kind: 'right';
  readonly right: R;

  tap(op: (value: R) => void): Right<R>;
  /**
   * fmap applied to 'right value' returns 'right op(value)'
   */
  fmap<R2>(op: (value: R) => R2): Right<R2>;
  /**
   * chain applied to 'right value' returns 'op(value)'
   */
  chain<R2, L>(op: (value: R) => Either<R2, L>): Either<R2, L>;
};

export type Left<L> = {
  readonly kind: 'left';
  readonly left: L;

  tap(): Left<L>;
  /**
   * fmap applied to 'left error' always returns 'left error'
   */
  fmap(): Left<L>;
  /**
   * chain applied to 'left error' always returns 'left error'
   */
  chain(): Left<L>;
};

/**
 * Genric Either monad
 *
 * As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
 * Used throughout the library to represent the result of failable operations, namely failed tasks
 */
export type Either<R, L = any> = (Left<L> | Right<R>) & {
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
  chain<R2, L2>(op: (value: R) => Either<R2, L2>): Either<R2, L | L2>;
};

export const isRight = <R, L>(either: Either<R, L>): either is Right<R> => {
  return either.kind === 'right';
};

export const isLeft = <R, L>(either: Either<R, L>): either is Left<L> => {
  return either.kind === 'left';
};

export const right = <R>(value: R): Right<R> => ({
  kind: 'right',
  right: value,
  tap: (op) => {
    op(value);

    return right(value);
  },
  fmap: (op) => right(op(value)),
  chain: (op) => op(value),
});

export const left = <L = any>(error: L): Left<L> => ({
  kind: 'left',
  left: error,
  tap: () => left(error),
  fmap: () => left(error),
  chain: () => left(error),
});

export const tapEither = <R1, L1>(
  either: Either<R1, L1>,
  op: (value: R1) => void,
): Either<R1, L1> => either.tap(op);

export const fmapEither = <R1, R2, L1>(
  either: Either<R1, L1>,
  op: (value: R1) => R2,
): Either<R2, L1> => either.fmap(op);

export const chainEither = <R1, R2, L1, L2>(
  either: Either<R1, L1>,
  op: (value: R1) => Either<R2, L2>,
): Either<R2, L1 | L2> => either.chain(op);
