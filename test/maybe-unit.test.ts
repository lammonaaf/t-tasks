import 'regenerator-runtime/runtime';

import { Maybe, Just } from '../';

describe('Maybe.just("data")', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => Maybe.just('data'))();
  // const subject = Maybe.just('data');

  it('is Just', () => {
    expect(Maybe.isJust(subject)).toBeTruthy();
    expect(subject.isJust()).toBeTruthy();
  });

  it('is not Nothing', () => {
    expect(Maybe.isNothing(subject)).toBeFalsy();
    expect(subject.isNothing()).toBeFalsy();
  });

  it('contains "data"', () => {
    expect(subject.isJust() && Just.just(subject) === 'data').toBeTruthy();
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

  it('match taps "data"', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const mapped = subject.matchTap({
      just: callback1,
      nothing: callback2,
    });

    expect(callback1).toBeCalledTimes(1);
    expect(callback1).toBeCalledWith('data');
    expect(callback2).toBeCalledTimes(0);
    expect(mapped).toStrictEqual(subject);
  });

  it('maps to Maybe.just(4)', () => {
    const callback = jest.fn((data: string) => data.length);

    const mapped = subject.map(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(mapped).toStrictEqual(Maybe.just(4));
  });

  it('fallback maps to self', () => {
    const callback = jest.fn(() => false);

    const mapped = subject.orMap(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('match maps to Maybe.just(4)', () => {
    const callback1 = jest.fn((data: string) => data.length);
    const callback2 = jest.fn(() => false);

    const mapped = subject.matchMap({
      just: callback1,
      nothing: callback2,
    });

    expect(callback1).toBeCalledTimes(1);
    expect(callback1).toBeCalledWith('data');
    expect(callback2).toBeCalledTimes(0);
    expect(mapped).toStrictEqual(Maybe.just(4));
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
    const callback = jest.fn(() => Maybe.just(false));

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

  it('chains to Maybe.just(4)', () => {
    const callback1 = jest.fn((data: string) => Maybe.just(data.length));
    const callback2 = jest.fn(() => Maybe.just(false));

    const chained = subject.matchChain({
      just: callback1,
      nothing: callback2,
    });

    expect(callback1).toBeCalledTimes(1);
    expect(callback1).toBeCalledWith('data');
    expect(callback2).toBeCalledTimes(0);
    expect(chained).toStrictEqual(Maybe.just(4));
  });
});

describe('Maybe.nothing()', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => Maybe.nothing())();
  // const subject = Maybe.nothing();

  it('is not Just', () => {
    expect(Maybe.isJust(subject)).toBeFalsy();
    expect(subject.isJust()).toBeFalsy();
  });

  it('is Nothing', () => {
    expect(Maybe.isNothing(subject)).toBeTruthy();
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

  it('match taps', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const mapped = subject.matchTap({
      just: callback1,
      nothing: callback2,
    });

    expect(callback1).toBeCalledTimes(0);
    expect(callback2).toBeCalledTimes(1);
    expect(callback2).toBeCalledWith();
    expect(mapped).toStrictEqual(subject);
  });

  it('maps to self', () => {
    const callback = jest.fn((data: string) => data.length);

    const mapped = subject.map(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('fallback maps to Maybe.just(3)', () => {
    const callback = jest.fn(() => false);

    const mapped = subject.orMap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(mapped).toStrictEqual(Maybe.just(false));
  });

  it('match maps to Maybe.just("none")', () => {
    const callback1 = jest.fn((data: string) => data.length);
    const callback2 = jest.fn(() => false);

    const mapped = subject.matchMap({
      just: callback1,
      nothing: callback2,
    });

    expect(callback1).toBeCalledTimes(0);
    expect(callback2).toBeCalledTimes(1);
    expect(callback2).toBeCalledWith();
    expect(mapped).toStrictEqual(Maybe.just(false));
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
    const callback = jest.fn(() => Maybe.just(false));

    const mapped = subject.orChain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(mapped).toStrictEqual(Maybe.just(false));
  });

  it('fallback chains to Maybe.nothing()', () => {
    const callback = jest.fn(() => Maybe.nothing());

    const mapped = subject.orChain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(mapped).toStrictEqual(Maybe.nothing());
  });

  it('chains to Maybe.just("none")', () => {
    const callback1 = jest.fn((data: string) => Maybe.just(data.length));
    const callback2 = jest.fn(() => Maybe.just(false));

    const chained = subject.matchChain({
      just: callback1,
      nothing: callback2,
    });

    expect(callback1).toBeCalledTimes(0);
    expect(callback2).toBeCalledTimes(1);
    expect(callback2).toBeCalledWith();
    expect(chained).toStrictEqual(Maybe.just(false));
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

describe('[Maybe.just("data1"), Maybe.just("data2"), Maybe.just("data3")]', () => {
  // So typescript does not make assumptions about actual type
  const subjects = ((): Maybe<string>[] => [Maybe.just('data1'), Maybe.just('data2'), Maybe.just('data3')])();
  // const subjects = [Maybe.just('data1'), Maybe.just('data2'), Maybe.just('data3')];

  it('is contains Just', () => {
    expect(Maybe.someJust(subjects)).toBeTruthy();
  });

  it('is all Just', () => {
    expect(Maybe.everyJust(subjects)).toBeTruthy();
  });

  it('is does not contain Nothing', () => {
    expect(Maybe.someNothing(subjects)).toBeFalsy();
  });

  it('is not all Nothing', () => {
    expect(Maybe.everyNothing(subjects)).toBeFalsy();
  });
});

describe('[Maybe.nothing(), Maybe.nothing(), Maybe.nothing()]', () => {
  // So typescript does not make assumptions about actual type
  const subjects = ((): Maybe<string>[] => [Maybe.nothing(), Maybe.nothing(), Maybe.nothing()])();
  // const subjects = [Maybe.nothing(), Maybe.nothing(), Maybe.nothing()];

  it('is does not contain Just', () => {
    expect(Maybe.someJust(subjects)).toBeFalsy();
  });

  it('is not all Just', () => {
    expect(Maybe.everyJust(subjects)).toBeFalsy();
  });

  it('is contains Nothing', () => {
    expect(Maybe.someNothing(subjects)).toBeTruthy();
  });

  it('is all Nothing', () => {
    expect(Maybe.everyNothing(subjects)).toBeTruthy();
  });
});

describe('[Maybe.nothing(), Maybe.just("data"), Maybe.nothing()]', () => {
  // So typescript does not make assumptions about actual type
  const subjects = ((): Maybe<string>[] => [Maybe.nothing(), Maybe.just('data'), Maybe.nothing()])();
  // const subjects = [Maybe.nothing(), Maybe.just('data'), Maybe.nothing()];

  it('is contains Just', () => {
    expect(Maybe.someJust(subjects)).toBeTruthy();
  });

  it('is not all Just', () => {
    expect(Maybe.everyJust(subjects)).toBeFalsy();
  });

  it('is contains Nothing', () => {
    expect(Maybe.someNothing(subjects)).toBeTruthy();
  });

  it('is not all Nothing', () => {
    expect(Maybe.everyNothing(subjects)).toBeFalsy();
  });
});

describe('generate()', () => {
  it('does stuff', () => {
    const f = (one: number | null, two: number | undefined) => Maybe.generate(function* () {
      return (
        yield* Maybe.fromNullable(one).generator()
      ) + (
        yield* Maybe.fromOptional(two).generator()
      );
    });

    expect(f(null, undefined)).toStrictEqual(Maybe.nothing());
    expect(f(null, 2)).toStrictEqual(Maybe.nothing());
    expect(f(3, undefined)).toStrictEqual(Maybe.nothing());
    expect(f(3, 2)).toStrictEqual(Maybe.just(5));
  });
});
