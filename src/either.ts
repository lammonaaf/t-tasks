export type Right<R> = {
  readonly kind: 'right';
  readonly right: R;

  fmap<R2>(op: (value: R) => R2): Right<R2>;
  chain<R2, L>(op: (value: R) => Either<R2, L>): Either<R2, L>;
}

export type Left<L> = {
  readonly kind: 'left';
  readonly left: L;

  fmap(): Left<L>;
  chain(): Left<L>;
}

/**
 * Genric Either monad
 * 
 * As per classic Either monad implementation can eithr contain a right (correct) value or a left (erroneous) value
 * Used throughout the library to represent the result of failable operations, namely failed tasks
 */
export type Either<R, L = any> = (Left<L> | Right<R>) & {
  fmap<R2>(op: (value: R) => R2): Either<R2, L>;
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
  fmap: (op) => right(op(value)),
  chain: (op) => op(value),
});

export const left = <L = any>(error: L): Left<L> => ({
  kind: 'left',
  left: error,
  fmap: () => left(error),
  chain: () => left(error),
});

export const fmapEither = <R1, R2, L1>(either: Either<R1, L1>, op: (value: R1) => R2): Either<R2, L1> => {
  return either.fmap(op);
};

export const chainEither = <R1, R2, L1, L2>(either: Either<R1, L1>, op: (value: R1) => Either<R2, L2>): Either<R2, L1 | L2> => {
  return either.chain(op);
};