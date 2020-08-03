import { Maybe } from '../src';

describe('Maybe.just("data")', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => Maybe.just('data'))();

  it('is Just', () => {
    expect(subject.isJust()).toBeTruthy();
  });

  it('is not Nothing', () => {
    expect(subject.isNothing()).toBeFalsy();
  });

  it('contains "data"', () => {
    expect(subject.isJust() && subject.just === 'data').toBeTruthy();
  });

  it('taps "data"', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
  });

  it('does not fallback tap', () => {
    const callback = jest.fn(() => {});

    subject.orTap(callback);

    expect(callback).toBeCalledTimes(0);
  });

  it('transforms to length 4', () => {
    const mapped = subject.map((value) => value.length);

    expect(mapped).toStrictEqual(Maybe.just(4));
  });

  it('does not fallback', () => {
    const mapped = subject.orMap(() => 6);

    expect(mapped).toStrictEqual(Maybe.just('data'));
  });

  it('chains to length 4', () => {
    const mapped = subject.chain((value) => Maybe.just(value.length));

    expect(mapped).toStrictEqual(Maybe.just(4));
  });

  it('chains to nothing', () => {
    const mapped = subject.chain((_) => Maybe.nothing());

    expect(mapped).toStrictEqual(Maybe.nothing());
  });

  it('doues not fallback chain', () => {
    const mapped = subject.orChain(() => Maybe.just(6));

    expect(mapped).toStrictEqual(Maybe.just('data'));
  });

  it('doues not fallback chain', () => {
    const mapped = subject.orChain(() => Maybe.nothing());

    expect(mapped).toStrictEqual(Maybe.just('data'));
  });
});

describe('Maybe.nothing()', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => Maybe.nothing())();

  it('is not Just', () => {
    expect(subject.isJust()).toBeFalsy();
  });

  it('is Nothing', () => {
    expect(subject.isNothing()).toBeTruthy();
  });

  it('does not tap', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).toBeCalledTimes(0);
  });

  it('taps nothing', () => {
    const callback = jest.fn(() => {});

    subject.orTap(callback);

    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith();
  });

  it('transforms to Nothing', () => {
    const mapped = subject.map((value) => value.length);

    expect(mapped).toStrictEqual(Maybe.nothing());
  });

  it('fallbacks to just 6', () => {
    const mapped = subject.orMap(() => 6);

    expect(mapped).toStrictEqual(Maybe.just(6));
  });

  it('chains to nothing', () => {
    const mapped = subject.chain((value) => Maybe.just(value.length));

    expect(mapped).toStrictEqual(Maybe.nothing());
  });

  it('chains to nothing', () => {
    const mapped = subject.chain((_) => Maybe.nothing());

    expect(mapped).toStrictEqual(Maybe.nothing());
  });

  it('fallback chains to just 6', () => {
    const mapped = subject.orChain(() => Maybe.just(6));

    expect(mapped).toStrictEqual(Maybe.just(6));
  });

  it('fallback chains to nothing', () => {
    const mapped = subject.orChain(() => Maybe.nothing());

    expect(mapped).toStrictEqual(Maybe.nothing());
  });
});

describe('fromOptional()', () => {
  it('creates just 5 from 5', () => {
    const value = Maybe.fromOptional(5);

    expect(value).toStrictEqual(Maybe.just(5));
  });

  it('creates nothing from undefined', () => {
    const value = Maybe.fromOptional(undefined);

    expect(value).toStrictEqual(Maybe.nothing());
  });

  it('creates just null from null', () => {
    const value = Maybe.fromOptional(null);

    expect(value).toStrictEqual(Maybe.just(null));
  });
});

describe('fromNullable()', () => {
  it('creates just 5 from 5', () => {
    const value = Maybe.fromNullable(5);

    expect(value).toStrictEqual(Maybe.just(5));
  });

  it('creates nothing from undefined', () => {
    const value = Maybe.fromNullable(undefined);

    expect(value).toStrictEqual(Maybe.nothing());
  });

  it('creates nothing from null', () => {
    const value = Maybe.fromNullable(null);

    expect(value).toStrictEqual(Maybe.nothing());
  });
});
