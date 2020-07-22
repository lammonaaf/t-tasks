/**
 * Just a value of type R
 *
 * Maybe data type specialization representing an existing value
 */
export interface JustBase<R> {
  readonly kind: 'just';
  readonly just: R;
}

/**
 * Absolutely Nothing
 *
 * Maybe data type specialiation representing an absence of any value
 */
export interface NothingBase {
  readonly kind: 'nothing';
}

/**
 * Maybe data type: either Just a value of type R or Nothing
 */
export type MaybeBase<R> = JustBase<R> | NothingBase;

/**
 * Maybe monad interface for "Just" specialization
 */
export interface Just<R> extends JustBase<R> {
  /**
   * tap applied to 'just value' returns self invoking op(value) in process
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
  /**
   * tapNothing applied to 'just value' returns self not invoking callback
   */
  tapNothing(): Just<R>;
  /**
   * fmapNothing applied to 'just value' returns self not invoking transformer
   */
  fmapNothing(): Just<R>;
  /**
   * chainNothing applied to 'just value' returns self not invoking transformer
   */
  chainNothing(): Just<R>;
}

/**
 * Maybe monad interface for "Nothing" specialization
 */
export interface Nothing extends NothingBase {
  /**
   * tap applied to 'nothing' returns self not invoking callback
   */
  tap(): Nothing;
  /**
   * fmap applied to 'nothing' returns self not invoking transformer
   */
  fmap(): Nothing;
  /**
   * chain applied to 'nothing' returns self not invoking transformer
   */
  chain(): Nothing;
  /**
   * tapNothing applied to 'nothing' returns self invoking op() in process
   */
  tapNothing(op: () => void): Nothing;
  /**
   * fmapNothing applied to 'nothing' returns just(op())
   */
  fmapNothing<R2>(op: () => R2): Just<R2>;
  /**
   * chainNothing applied to 'nothing' returns op()
   */
  chainNothing<R2>(op: () => Maybe<R2>): Maybe<R2>;
}

/**
 * Genric Maybe monad interface
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

  /**
   * Inverse maybe peeker
   * @param op callback function to be called in case of 'nothing'
   *
   * Returns copy of self no matter whether callback was called or not
   */
  tapNothing(op: () => void): Maybe<R>;

  /**
   * inverse maybe fmap transformer
   * @param op transformer function to be called in case of 'nothing'
   *
   * Returns self without invoking transformer if wrapped value is not 'nothing', effectively acting as a fallback method
   *
   * @note ```typescript
   * fmapNothing<R2>(op: () => R2): Just<R2> | Just<R>; // this version of typings compiles 4 times faster
   * ```
   */
  fmapNothing<R2>(op: () => R2): Just<R | R2>;

  /**
   * Chain fallback also returning Maybe
   * @param op transformer function to be called in case of nothing
   *
   * @note ```typescript
   * chainNothing<R2>(op: () => Maybe<R2>): Just<R> | Maybe<R2>; // this version of typings compiles 4 times faster
   * ```
   */
  chainNothing<R2>(op: () => Maybe<R2>): Maybe<R | R2>;
};

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
export function isJust<R>(maybe: Maybe<R>): maybe is Just<R> {
  return maybe.kind === 'just';
}

/**
 * Pattern mathching for 'nothing'
 * @param maybe wrapped value (or absence of it)
 *
 * Returns 'true' in case wrapped value does not exist (and resolves argument type to be 'Nothing')
 */
export function isNothing(maybe: Maybe<any>): maybe is Nothing {
  return maybe.kind === 'nothing';
}

/// --------------------------------------------------------------------------------------
/// Private section
/// --------------------------------------------------------------------------------------

class JustClass<R> implements Just<R> {
  readonly kind = 'just';

  constructor(readonly just: R) {}

  tap(op: (value: R) => void) {
    op(this.just);

    return this;
  }
  fmap<R2>(op: (value: R) => R2) {
    return just(op(this.just));
  }
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

  tap() {
    return this;
  }
  fmap() {
    return this;
  }
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
