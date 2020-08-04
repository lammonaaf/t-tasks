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
    const callback = jest.fn();

    const tapped = subject.tap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(tapped).toStrictEqual(subject);
  });

  it('does not fallback tap', () => {
    const callback = jest.fn();

    const tapped = subject.orTap(callback);

    expect(callback).not.toBeCalled();
    expect(tapped).toStrictEqual(subject);
  });

  it('maps to Maybe.just(4)', () => {
    const callback = jest.fn((data: string) => data.length);

    const mapped = subject.map(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(mapped).toStrictEqual(Maybe.just(4));
  });

  it('fallback maps to self', () => {
    const callback = jest.fn(() => 3);

    const mapped = subject.orMap(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('chains to Maybe.just(4)', () => {
    const callback = jest.fn((data: string) => Maybe.just(data.length));

    const chained = subject.chain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(chained).toStrictEqual(Maybe.just(4));
  });

  it('chains to Maybe.nothing()', () => {
    const callback = jest.fn(() => Maybe.nothing());

    const chained = subject.chain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(chained).toStrictEqual(Maybe.nothing());
  });

  it('fallback chains to self', () => {
    const callback = jest.fn(() => Maybe.just(3));

    const mapped = subject.orChain(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('fallback chains to self', () => {
    const callback = jest.fn(() => Maybe.nothing());

    const mapped = subject.orChain(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
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
    const callback = jest.fn();

    const tapped = subject.tap(callback);

    expect(callback).not.toBeCalled();
    expect(tapped).toStrictEqual(subject);
  });

  it('fallback taps', () => {
    const callback = jest.fn();

    const tapped = subject.orTap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(tapped).toStrictEqual(subject);
  });

  it('maps to self', () => {
    const callback = jest.fn((data: string) => data.length);

    const mapped = subject.map(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('fallback maps to Maybe.just(3)', () => {
    const callback = jest.fn(() => 3);

    const mapped = subject.orMap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(mapped).toStrictEqual(Maybe.just(3));
  });

  it('chains to self', () => {
    const callback = jest.fn((data: string) => Maybe.just(data.length));

    const chained = subject.chain(callback);

    expect(callback).not.toBeCalled();
    expect(chained).toStrictEqual(subject);
  });

  it('chains to self', () => {
    const callback = jest.fn(() => Maybe.nothing());

    const chained = subject.chain(callback);

    expect(callback).not.toBeCalled();
    expect(chained).toStrictEqual(subject);
  });

  it('fallback chains to Maybe.just(3)', () => {
    const callback = jest.fn(() => Maybe.just(3));

    const mapped = subject.orChain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(mapped).toStrictEqual(Maybe.just(3));
  });

  it('fallback chains to Maybe.nothing()', () => {
    const callback = jest.fn(() => Maybe.nothing());

    const mapped = subject.orChain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
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
