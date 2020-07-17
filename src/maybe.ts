/**
 * Just a value of type R
 *
 * Maybe monad specialization representing an existing value
 */
export interface JustBase<R> {
  readonly kind: 'just';
  readonly just: R;
}

/**
 * Nothing
 *
 * Maybe monad specialiation representing an absence of any value
 */
export interface NothingBase {
  readonly kind: 'nothing';
}

export type MaybeBase<R> = JustBase<R> | NothingBase;

export interface Just<R> extends JustBase<R> {
  /**
   * tap applied to 'just value' returns 'just value'
   */
  tap(op: (value: R) => void): Just<R>;
  /**
   * fmap applied to 'just value' returns 'just op(value)'
   */
  fmap<R2>(op: (value: R) => R2): Just<R2>;
  /**
   * chain applied to 'just value' returns 'op(value)'
   */
  chain<R2>(op: (value: R) => Maybe<R2>): Maybe<R2>;

  tapNothing(): Just<R>;
  fmapNothing(): Just<R>;
  chainNothing(): Just<R>;
}

export interface Nothing extends NothingBase {
  /**
   * tap applied to 'nothing' always returns 'nothing'
   */
  tap(): Nothing;
  /**
   * fmap applied to 'nothing' always returns 'nothing'
   */
  fmap(): Nothing;
  /**
   * chain applied to 'nothing' always returns 'nothing'
   */
  chain(): Nothing;

  tapNothing(op: () => void): Nothing;
  fmapNothing<R2>(op: () => R2): Just<R2>;
  chainNothing<R2>(op: () => Maybe<R2>): Maybe<R2>;
}

/**
 * Genric Maybe monad
 *
 * As per classic Maybe monad implementation can eithr contain just a value or contain nothing
 * Used throughout the library to represent optional return type, specifically return type of cancelled tasks
 */
export type Maybe<R> = MaybeBase<R> & {
  /**
   * Maybe peeker
   * @param op callback function to be called with underlying value
   *
   * Returns copy of self no matter whether callback was called or not
   */
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

  tapNothing(op: () => void): Maybe<R>;

  // fmapNothing<R2>(op: () => R2): Just<R2> | Just<R>; // this version of typings compiles 4 times faster
  fmapNothing<R2>(op: () => R2): Just<R | R2>;

  // chainNothing<R2>(op: () => Maybe<R2>): Just<R> | Maybe<R2>; // this version of typings compiles 4 times faster
  chainNothing<R2>(op: () => Maybe<R2>): Maybe<R | R2>;
};

class JustClass<R> implements Just<R> {
  readonly kind = 'just';

  constructor(readonly just: R) {}

  /**
   * tap applied to 'just value' returns 'just value'
   */
  tap(op: (value: R) => void) {
    op(this.just);

    return this;
  }

  /**
   * fmap applied to 'just value' returns 'just op(value)'
   */
  fmap<R2>(op: (value: R) => R2) {
    return just(op(this.just));
  }

  /**
   * chain applied to 'just value' returns 'op(value)'
   */
  chain<R2>(op: (value: R) => Maybe<R2>) {
    return op(this.just);
  }

  tapNothing() {
    return this;
  }

  fmapNothing() {
    return this;
  }

  chainNothing() {
    return this;
  }
}

class NothingClass implements Nothing {
  readonly kind = 'nothing';

  /**
   * tap applied to 'nothing' always returns 'nothing'
   */
  tap() {
    return this;
  }

  /**
   * fmap applied to 'nothing' always returns 'nothing'
   */
  fmap() {
    return this;
  }

  /**
   * chain applied to 'nothing' always returns 'nothing'
   */
  chain() {
    return this;
  }

  tapNothing(op: () => void) {
    op();

    return this;
  }

  fmapNothing<R2>(op: () => R2) {
    return just(op());
  }

  chainNothing<R2>(op: () => Maybe<R2>) {
    return op();
  }
}

/**
 * Non-empty monad constructor
 * @param value underlying value
 */
export function just<R>(value: R): Just<R> {
  return new JustClass<R>(value);
}

/**
 * Empty monad constructor
 */
export function nothing(): Nothing {
  return new NothingClass();
}

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
export function isJust<R, TT extends Maybe<R>>(maybe: TT): maybe is Just<R> & TT {
  return maybe.kind === 'just';
}

/**
 * Pattern mathching for 'nothing'
 * @param maybe wrapped value (or absence of it)
 *
 * Returns 'true' in case wrapped value does not exist (and resolves argument type to be 'Nothing')
 */
export function isNothing<TT extends Maybe<any>>(maybe: TT): maybe is Nothing & TT {
  return maybe.kind === 'nothing';
}
