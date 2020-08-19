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
  tap(op: (value: R) => void): this;

  /**
   * Maybe fallback peeker function
   *
   * Applied to 'just value' returns self without invoking callback
   * Applied to 'nothing' returns self invoking op() in process
   *
   * @param op function to be invoked
   * @returns self
   */
  orTap(op: () => void): this;

  /**
   * Maybe patter matching peeker function
   *
   * Applied to 'just value' returns self invoking op.just(value) in process
   * Applied to 'nothing' returns self invoking op.nothing() in process
   *
   * @param op.just function to be invoked with underlying value in case of just
   * @param op.nothing function to be invoked in case of nothing
   * @returns self
   */
  matchTap(op: { just: (value: R) => void; nothing: () => void }): this;

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
  // Just case
  map<R2>(this: Just<R>, op: (value: R) => R2): Just<R2>;
  // Generic case
  map<R2>(this: Maybe<R>, op: (value: R) => R2): Maybe<R2>;

  /**
   * Maybe fallback transformer function
   *
   * Applied to 'just value' returns self without invoking transformer
   * Applied to 'nothing' returns 'just op()'
   *
   * @param op function to be invoked
   * @returns 'just value' or 'just op()'
   */
  // Just case
  orMap<R2>(this: Just<R>, op: () => R2): Just<R>;
  // Generic case
  orMap<R2>(this: Maybe<R>, op: () => R2): Just<R | R2>;

  /**
   * Maybe patter matching transformer function
   *
   * Applied to 'just value' returns 'just op.just(value)'
   * Applied to 'nothing' returns 'just op.nothing()'
   *
   * @template R2 just transformer function's return type
   * @template R3 nothing transformer function's return type
   * @param op.just transformer to be invoked with underlying value in case of just
   * @param op.nothing transformer to be invoked in case of nothing
   * @returns 'just op.just(value)' or 'just op.nothing()'
   */
  // Just cases
  matchMap<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => R2; nothing: () => R3 }): Just<R2>;
  // General case
  matchMap<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => R2; nothing: () => R3 }): Just<R2 | R3>;

  /**
   * Maybe composition function
   *
   * Applied to 'just value' returns 'op(value)'
   * Applied to 'nothing' returns self without invoking composition function
   *
   * @template R2 transformer function result's underlying type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'nothing'
   */
  // Just cases
  chain<R2>(this: Just<R>, op: (value: R) => Just<R2>): Just<R2>;
  chain<R2>(this: Just<R>, op: (value: R) => Nothing<R2>): Nothing<never>;
  chain<R2>(this: Just<R>, op: (value: R) => Maybe<R2>): Maybe<R2>;
  // General cases
  chain<R2>(this: Maybe<R>, op: (value: R) => Just<R2>): Maybe<R2>;
  chain<R2>(this: Maybe<R>, op: (value: R) => Nothing<R2>): Nothing<never>;
  chain<R2>(this: Maybe<R>, op: (value: R) => Maybe<R2>): Maybe<R2>;

  /**
   * Maybe fallback composition function
   *
   * Applied to 'just value' returns self witjout invoking composition function
   * Applied to 'nothing' returns op()
   *
   * @template R2 transformer function result's underlying type
   * @param op transformer to be invoked
   * @returns 'just value' or 'op()'
   */
  // Just cases
  orChain<R2>(this: Just<R>, op: () => Just<R2>): Just<R>;
  orChain<R2>(this: Just<R>, op: () => Nothing<R2>): Just<R>;
  orChain<R2>(this: Just<R>, op: () => Maybe<R2>): Just<R>;
  // General case
  orChain<R2>(this: Maybe<R>, op: () => Just<R2>): Just<R | R2>;
  orChain<R2>(this: Maybe<R>, op: () => Nothing<R2>): Maybe<R>;
  orChain<R2>(this: Maybe<R>, op: () => Maybe<R2>): Maybe<R | R2>;

  /**
   * Maybe patter matching composition function
   *
   * Applied to 'just value' returns 'op.just(value)'
   * Applied to 'nothing' returns op.nothing()
   *
   * @template R2 just transformer function result's underlying type
   * @template R3 nothing transformer function result's underlying type
   * @param op.just transformer to be invoked with underlying value in case of just
   * @param op.nothing transformer to be invoked in case of nothing
   * @returns 'op.just(value)' or 'op.nothing()'
   */
  // Just cases
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Just<R2>; nothing: () => Just<R3> }): Just<R2>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Just<R2>; nothing: () => Nothing<R3> }): Just<R2>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Just<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Nothing<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Just<R2>; nothing: () => Maybe<R3> }): Just<R2>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Maybe<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Just<R3> }): Maybe<R2>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Nothing<R3> }): Maybe<R2>;
  matchChain<R2, R3 = R2>(this: Just<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Maybe<R3> }): Maybe<R2>;
  // General cases
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Just<R2>; nothing: () => Just<R3> }): Just<R2 | R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Just<R2>; nothing: () => Nothing<R3> }): Maybe<R2>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Just<R3> }): Maybe<R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Nothing<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Just<R2>; nothing: () => Maybe<R3> }): Maybe<R2 | R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Maybe<R3> }): Maybe<R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Just<R3> }): Maybe<R2 | R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Nothing<R3> }): Maybe<R2>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Maybe<R3> }): Maybe<R2 | R3>;

  /**
   * Maybe type guard for 'just'
   *
   * @returns 'true' in case wrapped value exists (and resolves this type to be 'just')
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
   * @returns 'true' in case wrapped value is 'nothing' (and resolves this type to be 'nothing')
   *
   * @example
   * ```typescript
   * if (maybe.isNohing()) {
   *   console.log('nothing');
   * }
   * ```
   */
  isNothing(): this is Nothing<R>;
}

/**
 * Absolutely Nothing
 *
 * Maybe data type specialiation representing an absence of any value
 */
export interface Nothing<R> {
  /**
   * Maybe peeker function
   *
   * Applied to 'just value' returns self invoking op(value) in process
   * Applied to 'nothing' returns self without invoking callback
   *
   * @param op function to be invoked with underlying value
   * @returns self
   */
  tap(op: (value: R) => void): this;

  /**
   * Maybe fallback peeker function
   *
   * Applied to 'just value' returns self without invoking callback
   * Applied to 'nothing' returns self invoking op() in process
   *
   * @param op function to be invoked
   * @returns self
   */
  orTap(op: () => void): this;

  /**
   * Maybe patter matching peeker function
   *
   * Applied to 'just value' returns self invoking op.just(value) in process
   * Applied to 'nothing' returns self invoking op.nothing() in process
   *
   * @param op.just function to be invoked with underlying value in case of just
   * @param op.nothing function to be invoked in case of nothing
   * @returns self
   */
  matchTap(op: { just: (value: R) => void; nothing: () => void }): this;

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
  // Nothing case
  map<R2>(this: Nothing<R>, op: (value: R) => R2): Nothing<never>;
  // Generic case
  map<R2>(this: Maybe<R>, op: (value: R) => R2): Maybe<R2>;

  /**
   * Maybe fallback transformer function
   *
   * Applied to 'just value' returns self without invoking transformer
   * Applied to 'nothing' returns 'just op()'
   *
   * @param op function to be invoked
   * @returns 'just value' or 'just op()'
   */
  // Nothing case
  orMap<R2>(this: Nothing<R>, op: () => R2): Just<R2>;
  // Generic case
  orMap<R2>(this: Maybe<R>, op: () => R2): Just<R | R2>;

  /**
   * Maybe patter matching transformer function
   *
   * Applied to 'just value' returns 'just op.just(value)'
   * Applied to 'nothing' returns 'just op.nothing()'
   *
   * @template R2 just transformer function's return type
   * @template R3 nothing transformer function's return type
   * @param op.just transformer to be invoked with underlying value in case of just
   * @param op.nothing transformer to be invoked in case of nothing
   * @returns 'just op.just(value)' or 'just op.nothing()'
   */
  // Nothing cases
  matchMap<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => R2; nothing: () => R3 }): Just<R3>;
  // General cases
  matchMap<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => R2; nothing: () => R3 }): Just<R2 | R3>;

  /**
   * Maybe composition function
   *
   * Applied to 'just value' returns 'op(value)'
   * Applied to 'nothing' returns self without invoking composition function
   *
   * @template R2 transformer function result's underlying type
   * @param op transformer to be invoked with underlying value
   * @returns 'op(value)' or 'nothing'
   */
  // Nothing cases
  chain<R2>(this: Nothing<R>, op: (value: R) => Just<R2>): Nothing<never>;
  chain<R2>(this: Nothing<R>, op: (value: R) => Nothing<R2>): Nothing<never>;
  chain<R2>(this: Nothing<R>, op: (value: R) => Maybe<R2>): Nothing<never>;
  // General cases
  chain<R2>(this: Maybe<R>, op: (value: R) => Just<R2>): Maybe<R2>;
  chain<R2>(this: Maybe<R>, op: (value: R) => Nothing<R2>): Nothing<never>;
  chain<R2>(this: Maybe<R>, op: (value: R) => Maybe<R2>): Maybe<R2>;

  /**
   * Maybe fallback composition function
   *
   * Applied to 'just value' returns self witjout invoking composition function
   * Applied to 'nothing' returns op()
   *
   * @template R2 transformer function result's underlying type
   * @param op transformer to be invoked
   * @returns 'just value' or 'op()'
   */
  // Nothing cases
  orChain<R2>(this: Nothing<R>, op: () => Just<R2>): Just<R2>;
  orChain<R2>(this: Nothing<R>, op: () => Nothing<R2>): Nothing<never>;
  orChain<R2>(this: Nothing<R>, op: () => Maybe<R2>): Maybe<R2>;
  // General cases
  orChain<R2>(this: Maybe<R>, op: () => Just<R2>): Just<R | R2>;
  orChain<R2>(this: Maybe<R>, op: () => Nothing<R2>): Maybe<R>;
  orChain<R2>(this: Maybe<R>, op: () => Maybe<R2>): Maybe<R | R2>;

  /**
   * Maybe patter matching composition function
   *
   * Applied to 'just value' returns 'op.just(value)'
   * Applied to 'nothing' returns op.nothing()
   *
   * @template R2 just transformer function result's underlying type
   * @template R3 nothing transformer function result's underlying type
   * @param op.just transformer to be invoked with underlying value in case of just
   * @param op.nothing transformer to be invoked in case of nothing
   * @returns 'op.just(value)' or 'op.nothing()'
   */
  // Nothing cases
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Just<R2>; nothing: () => Just<R3> }): Just<R3>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Just<R2>; nothing: () => Nothing<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Just<R3> }): Just<R3>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Nothing<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Just<R2>; nothing: () => Maybe<R3> }): Maybe<R3>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Maybe<R3> }): Maybe<R3>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Just<R3> }): Just<R3>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Nothing<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Nothing<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Maybe<R3> }): Maybe<R3>;
  // General cases
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Just<R2>; nothing: () => Just<R3> }): Just<R2 | R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Just<R2>; nothing: () => Nothing<R3> }): Maybe<R2>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Just<R3> }): Maybe<R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Nothing<R3> }): Nothing<never>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Just<R2>; nothing: () => Maybe<R3> }): Maybe<R2 | R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Nothing<R2>; nothing: () => Maybe<R3> }): Maybe<R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Just<R3> }): Maybe<R2 | R3>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Nothing<R3> }): Maybe<R2>;
  matchChain<R2, R3 = R2>(this: Maybe<R>, op: { just: (value: R) => Maybe<R2>; nothing: () => Maybe<R3> }): Maybe<R2 | R3>;

  /**
   * Maybe type guard for 'just'
   *
   * @returns 'true' in case wrapped value exists (and resolves this type to be 'just')
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
   * @returns 'true' in case wrapped value is 'nothing' (and resolves this type to be 'nothing')
   *
   * @example
   * ```typescript
   * if (maybe.isNohing()) {
   *   console.log('nothing');
   * }
   * ```
   */
  isNothing(): this is Nothing<R>;
}

/**
 * Genric Maybe monad interface
 *
 * As per classic Maybe monad implementation can eithr contain just a value or contain nothing
 * Used throughout the library to represent optional return type, specifically return type of cancelled tasks
 *
 * @template R underlying value
 */
export type Maybe<R> = Just<R> | Nothing<R>;

export namespace Just {
  /**
   * Standalone Just value extractor
   *
   * Userful for passing as a function to collection transformers
   *
   * @template R underlying value type
   * @param just Just instance
   * @returns underlying value
   */
  export function just<R>(just: Just<R>) {
    return just.just;
  }
}

export namespace Nothing {}

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
  export function nothing(): Nothing<never> {
    return staticNothing;
  }

  /**
   * Maybe constructor from optional value
   *
   * Resolves to 'nothing' in case of undefined value and 'just value' otherwise
   *
   * @param value possibly undefined value
   * @returns either 'just value' or 'nothing'
   */
  export function fromOptional<R>(value: undefined): Nothing<never>;
  export function fromOptional<R>(value: Exclude<R, undefined>): Just<R>;
  export function fromOptional<R>(value: R | undefined): Maybe<R>;
  export function fromOptional<R>(value: R | undefined) {
    return typeof value !== 'undefined' ? Maybe.just(value) : Maybe.nothing();
  }

  /**
   * Maybe constructor from optional or nullable value
   *
   * Resolves to 'nothing' in case of undefined or null value and 'just value' otherwise
   *
   * @param value possibly undefined value
   * @returns either 'just value' or 'nothing'
   */
  export function fromNullable<R>(value: undefined): Nothing<never>;
  export function fromNullable<R>(value: null): Nothing<never>;
  export function fromNullable<R>(value: Exclude<R, null | undefined>): Just<R>;
  export function fromNullable<R>(value: R | null | undefined): Maybe<R>;
  export function fromNullable<R>(value: R | null | undefined) {
    return Maybe.fromOptional(value).chain((v) => (v !== null ? Maybe.just(v) : Maybe.nothing()));
  }

  /**
   * Standalone type guard for 'just'
   *
   * Userful for passing as a predicate to collection transformers
   *
   * @template R underlying value type
   * @param maybe Maybe instance
   * @returns 'true' in case wrapped value exists (and resolves argument type to be 'just')
   */
  export function isJust<R>(maybe: Maybe<R>): maybe is Just<R> {
    return maybe.isJust();
  }

  /**
   * Standalone type guard for 'nothing'
   *
   * Userful for passing as a predicate to collection transformers
   *
   * @template R underlying value type
   * @param maybe Maybe instance
   * @returns 'true' in case wrapped value is 'nothing' (and resolves argument type to be 'nothing')
   */
  export function isNothing<R>(maybe: Maybe<R>): maybe is Nothing<never> {
    return maybe.isNothing();
  }

  /**
   * Standalone list predicate
   *
   * @param maybes a list of Maybe
   * @returns true in case every list element is Just
   */
  export function everyJust<R>(maybes: Maybe<R>[]): maybes is Just<R>[] {
    return maybes.every(Maybe.isJust);
  }

  /**
   * Standalone list predicate
   *
   * @param maybes a list of Maybe
   * @returns true in case al east one list element is Just
   */
  export function someJust<R>(maybes: Maybe<R>[]): maybes is Just<R>[] {
    return maybes.some(Maybe.isJust);
  }

  /**
   * Standalone list predicate
   *
   * @param maybes a list of Maybe
   * @returns true in case every list element is Nothing
   */
  export function everyNothing<R>(maybes: Maybe<R>[]): maybes is Nothing<never>[] {
    return maybes.every(Maybe.isNothing);
  }

  /**
   * Standalone list predicate
   *
   * @param maybes a list of Maybe
   * @returns true in case at least one list element is Nothing
   */
  export function someNothing<R>(maybes: Maybe<R>[]): maybes is Nothing<never>[] {
    return maybes.some(Maybe.isNothing);
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
  chain<RR extends Maybe<unknown>>(op: (value: R) => RR) {
    return op(this.just);
  }
  orChain() {
    return this;
  }
  isJust(): this is Just<R> {
    return true;
  }
  isNothing(): this is Nothing<R> {
    return false;
  }
  matchTap(op: { just: (value: R) => void }) {
    return this.tap(op.just);
  }
  matchMap<R2>(op: { just: (value: R) => R2 }) {
    return this.map(op.just);
  }
  matchChain<RR extends Maybe<unknown>>(op: { just: (value: R) => RR }) {
    return this.chain(op.just);
  }
}

class NothingClass implements Nothing<never> {
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
  orChain<RR extends Maybe<unknown>>(op: () => RR) {
    return op();
  }
  isJust(): this is Just<never> {
    return false;
  }
  isNothing(): this is Nothing<never> {
    return true;
  }
  matchTap(op: { nothing: () => void }) {
    return this.orTap(op.nothing);
  }
  matchMap<R2>(op: { nothing: () => R2 }) {
    return this.orMap(op.nothing);
  }
  matchChain<RR extends Maybe<unknown>>(op: { nothing: () => RR }) {
    return this.orChain(op.nothing);
  }
}

const staticNothing = new NothingClass();
