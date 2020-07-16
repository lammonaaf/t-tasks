export type Just<R> = {
  readonly kind: 'just';
  readonly just: R;

  tap(op: (value: R) => void): Just<R>;
  /**
   * fmap applied to 'just value' returns 'just op(value)'
   */
  fmap<R2>(op: (value: R) => R2): Just<R2>;
  /**
   * chain applied to 'just value' returns 'op(value)'
   */
  chain<R2>(op: (value: R) => Maybe<R2>): Maybe<R2>;
}

export type Nothing = {
  readonly kind: 'nothing';

  tap(): Nothing;
  /**
   * fmap applied to 'nothing' always returns 'nothing'
   */
  fmap(): Nothing;
  /**
   * chain applied to 'nothing' always returns 'nothing'
   */
  chain(): Nothing;
}

/**
 * Genric Maybe monad
 * 
 * As per classic Maybe monad implementation can eithr contain just a value or contain nothing
 * Used throughout the library to represent optional return type, specifically return type of cancelled tasks
 */
export type Maybe<R> = (Just<R> | Nothing) & {
  tap(op: (value: R) => void): Maybe<R>;

  /**
   * Maybe fmap transformer
   * @param op transformer function for the underlying value
   * 
   * Returns 'nothing' without invoking transformer if wrapped value is already 'nothing'
   */
  fmap<R2>(op: (value: R) => R2): Maybe<R2>;

  /**
   * Chain multiple functions returning Maybe
   * @param op transformer function for the underlying value which can also return nothing
   * 
   * @example
   * ```typescript
   * // test(just(42))  - just 21
   * // test(just(41))  - nothing
   * // test(nothing()) - nothing
   * function test(arg: Maybe<number>): Maybe<number> {
   *   return arg.chain((magic) => {
   *     return magic % 2 === 0 ? just(magic / 2) : nothing();
   *   });
   * }
   * ```
   */
  chain<R2>(op: (value: R) => Maybe<R2>): Maybe<R2>;
};

/**
 * Non-empty monad constructor
 * @param value underlying value
 */
export const just = <R>(value: R): Just<R> => ({
  kind: 'just',
  just: value,
  tap: (op) => {
    op(value);

    return just(value);
  },
  fmap: (op) => just(op(value)),
  chain: (op) => op(value),
});

/**
 * Empty monad constructor
 */
export const nothing = (): Nothing => ({
  kind: 'nothing',
  tap: () => nothing(),
  fmap: () => nothing(),
  chain: () => nothing(),
});

/**
 * Pattern mathching for 'just'
 * @param maybe wrapped value (or absence of it)
 * 
 * Returns 'true' in case wrapped value exists (and resolves argument type to be 'Just')
 * 
 * @example
 * ```typescript
 * if (isJust(maybe)) {
 *   console.log(maybe.just)
 * }
 * ```
 */
export const isJust = <R>(maybe: Maybe<R>): maybe is Just<R> => maybe.kind === 'just';

/**
 * Pattern mathching for 'nothing'
 * @param maybe wrapped value (or absence of it)
 * 
 * Returns 'true' in case wrapped value does not exist (and resolves argument type to be 'Nothing')
 */
export const isNothing = <R>(maybe: Maybe<R>): maybe is Nothing => maybe.kind === 'nothing';

export const tapMaybe = <R>(maybe: Maybe<R>, op: (value: R) => void): Maybe<R> => {
  return maybe.tap(op);
};

/**
   * Maybe fmap transformer (standalone version)
   * @param maybe wrapped value (or absence of it)
   * @param op transformer function for the underlying value
   * 
   * Returns 'nothing' without invoking transformer if wrapped value is already 'nothing'
   * As infix notation is not possible in TS and writing composable functions is awkward anyways, using dot-version is recommended
   */
export const fmapMaybe = <R, R2>(maybe: Maybe<R>, op: (value: R) => R2): Maybe<R2> => {
  return maybe.fmap(op);
};

/**
 * Chain multiple functions returning Maybe (standalone version)
 * @param maybe wrapped value (or absence of it)
 * @param op transformer function for the underlying value which can also return nothing
 * 
 * Subsequent functions would not be invoked if Maybe resolves to 'Nothing'
 * As infix notation is not possible in TS and writing composable functions is awkward anyways, using dot-version is recommended
 */
export const chainMaybe = <R, R2>(maybe: Maybe<R>, op: (value: R) => Maybe<R2>): Maybe<R2> => {
  return maybe.chain(op);
};