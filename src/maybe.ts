/**
 * Just a value
 *
 * Maybe data type specialization representing an existing value
 *
 * @template R underlying value
 */
export interface Just<R> {
  readonly just: R;

  /**
   * Maybe peeker function
   *
   * Applied to 'just value' returns self invoking op(value) in process
   * Applied to 'nothing' returns self without invoking callback
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  tap(op: (value: R) => void): Just<R>;

  /**
   * Maybe fallback peeker function
   *
   * Applied to 'just value' returns self without invoking callback
   * Applied to 'nothing' returns self invoking op() in process
   *
   * @param op function to be invoked
   * @returns self
   */
  orTap(op: unknown): Just<R>;

  /**
   * Maybe transformer function
   *
   * Applied to 'just value' returns 'just op(value)'
   * Applied to 'nothing' returns self without invoking transformer
   *
   * @template R2 transformer function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'just op(value)' or 'nothing'
   */
  map<R2>(op: (value: R) => R2): Just<R2>;

  /**
   * Maybe fallback transformer function
   *
   * Applied to 'just value' returns self without invoking transformer
   * Applied to 'nothing' returns 'just op()'
   *
   * @param op function to be invoked
   * @returns 'just value' or 'just op()'
   */
  orMap(op: unknown): Just<R>;

  /**
   * Maybe composition function
   *
   * Applied to 'just value' returns 'op(value)'
   * Applied to 'nothing' returns self without invoking composition function
   *
   * @template TT composition function's return type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'nothing'
   */
  chain<TT extends Maybe<unknown>>(op: (value: R) => TT): TT;

  /**
   * Maybe fallback composition function
   *
   * Applied to 'just value' returns self witjout invoking composition function
   * Applied to 'nothing' returns op()
   *
   * @param op function to be invoked
   * @returns 'just value' or 'op()'
   */
  orChain(op: unknown): Just<R>;

  /**
   * Maybe type guard for 'just'
   *
   * @returns 'true' in case wrapped value exists (and resolves argument type to be 'just')
   *
   * @example
   * ```typescript
   * if (maybe.isJust()) {
   *   console.log(maybe.just);
   * }
   * ```
   */
  isJust(): this is Just<R>;

  /**
   * Maybe type guard for 'nothing'
   *
   * @returns 'true' in case wrapped value is 'nothing' (and resolves argument type to be 'nothing')
   *
   * @example
   * ```typescript
   * if (maybe.isNohing()) {
   *   console.log('nothing');
   * }
   * ```
   */
  isNothing(): this is Nothing;
}

/**
 * Absolutely Nothing
 *
 * Maybe data type specialiation representing an absence of any value
 */
export interface Nothing {
  /**
   * Maybe peeker function
   *
   * Applied to 'just value' returns self invoking op(value) in process
   * Applied to 'nothing' returns self without invoking callback
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  tap(op: unknown): Nothing;

  /**
   * Maybe fallback peeker function
   *
   * Applied to 'just value' returns self without invoking callback
   * Applied to 'nothing' returns self invoking op() in process
   *
   * @param op function to be invoked
   * @returns self
   */
  orTap(op: () => void): Nothing;

  /**
   * Maybe transformer function
   *
   * Applied to 'just value' returns 'just op(value)'
   * Applied to 'nothing' returns self without invoking transformer
   *
   * @param op transformer to be invoked with underlying value
   * @returns 'just op(value)' or self
   */
  map(op: unknown): Nothing;

  /**
   * Maybe fallback transformer function
   *
   * Applied to 'just value' returns self without invoking transformer
   * Applied to 'nothing' returns 'just op()'
   *
   * @template R2 transformer function's result type
   * @param op function to be invoked
   * @returns self or 'just op()'
   */
  orMap<R2>(op: () => R2): Just<R2>;

  /**
   * Maybe composition function
   *
   * Applied to 'just value' returns 'op(value)'
   * Applied to 'nothing' returns self without invoking composition function
   *
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or self
   */
  chain(op: unknown): Nothing;

  /**
   * Maybe fallback composition function
   *
   * Applied to 'just value' returns self witjout invoking composition function
   * Applied to 'nothing' returns op()
   *
   * @template TT composition function's return type
   * @param op function to be invoked
   * @returns self or 'op()'
   */
  orChain<TT extends Maybe<unknown>>(op: () => TT): TT;

  /**
   * Maybe type guard for 'just'
   *
   * @returns 'true' in case wrapped value exists (and resolves argument type to be 'just')
   *
   * @example
   * ```typescript
   * if (maybe.isJust()) {
   *   console.log(maybe.just);
   * }
   * ```
   */
  isJust(): this is Just<never>;

  /**
   * Maybe type guard for 'nothing'
   *
   * @returns 'true' in case wrapped value is 'nothing' (and resolves argument type to be 'nothing')
   *
   * @example
   * ```typescript
   * if (maybe.isNohing()) {
   *   console.log('nothing');
   * }
   * ```
   */
  isNothing(): this is Nothing;
}

/**
 * Genric Maybe monad interface
 *
 * As per classic Maybe monad implementation can eithr contain just a value or contain nothing
 * Used throughout the library to represent optional return type, specifically return type of cancelled tasks
 *
 * @template R underlying value
 */
export type Maybe<R> = Just<R> | Nothing;

export namespace Maybe {
  /**
   * Non-empty monad constructor
   *
   * @template R underlying type
   * @param value underlying value
   * @returns 'just value'
   */
  export function just<R>(value: R): Just<R> {
    return new JustClass<R>(value);
  }

  /**
   * Empty monad constructor
   *
   * @returns 'nothing'
   */
  export function nothing(): Nothing {
    return staticNothing;
  }

  export function fromOptional(value: undefined): Nothing;
  export function fromOptional<T>(value: Exclude<T, undefined>): Just<T>;
  export function fromOptional<T>(value: T | undefined): Just<T> | Nothing;
  export function fromOptional<T>(value: T | undefined) {
    return typeof value !== 'undefined' ? Maybe.just(value) : Maybe.nothing();
  }

  export function fromNullable(value: undefined): Nothing;
  export function fromNullable(value: null): Nothing;
  export function fromNullable<T>(value: Exclude<T, null | undefined>): Just<T>;
  export function fromNullable<T>(value: T | null | undefined): Just<T> | Nothing;
  export function fromNullable<T>(value: T | null | undefined) {
    return Maybe.fromOptional(value).chain((v) => (v !== null ? Maybe.just(v) : Maybe.nothing()));
  }
}

/// --------------------------------------------------------------------------------------
/// Private section
/// --------------------------------------------------------------------------------------

class JustClass<R> implements Just<R> {
  constructor(readonly just: R) {}

  tap(op: (value: R) => void) {
    op(this.just);

    return this;
  }
  orTap() {
    return this;
  }
  map<R2>(op: (value: R) => R2) {
    return Maybe.just(op(this.just));
  }
  orMap() {
    return this;
  }
  chain<TT extends Maybe<unknown>>(op: (value: R) => TT) {
    return op(this.just);
  }
  orChain() {
    return this;
  }
  isJust(): this is Just<R> {
    return true;
  }
  isNothing(): this is Nothing {
    return false;
  }
}

class NothingClass implements Nothing {
  tap() {
    return this;
  }
  orTap(op: () => void) {
    op();

    return this;
  }
  map() {
    return this;
  }
  orMap<R2>(op: () => R2) {
    return Maybe.just(op());
  }
  chain() {
    return this;
  }
  orChain<TT extends Maybe<unknown>>(op: () => TT) {
    return op();
  }
  isJust(): this is Just<never> {
    return false;
  }
  isNothing(): this is Nothing {
    return true;
  }
}

const staticNothing = new NothingClass();
