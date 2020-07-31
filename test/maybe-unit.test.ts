import { just, nothing, Maybe } from '../src';

describe('just("data")', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => just('data'))();

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

    expect(mapped).toStrictEqual(just(4));
  });

  it('does not fallback', () => {
    const mapped = subject.orMap(() => 6);

    expect(mapped).toStrictEqual(just('data'));
  });

  it('chains to length 4', () => {
    const mapped = subject.chain((value) => just(value.length));

    expect(mapped).toStrictEqual(just(4));
  });

  it('chains to nothing', () => {
    const mapped = subject.chain((_) => nothing());

    expect(mapped).toStrictEqual(nothing());
  });

  it('doues not fallback chain', () => {
    const mapped = subject.orChain(() => just(6));

    expect(mapped).toStrictEqual(just('data'));
  });

  it('doues not fallback chain', () => {
    const mapped = subject.orChain(() => nothing());

    expect(mapped).toStrictEqual(just('data'));
  });
});

describe('nothing()', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => nothing())();

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

    expect(mapped).toStrictEqual(nothing());
  });

  it('fallbacks to just 6', () => {
    const mapped = subject.orMap(() => 6);

    expect(mapped).toStrictEqual(just(6));
  });

  it('chains to nothing', () => {
    const mapped = subject.chain((value) => just(value.length));

    expect(mapped).toStrictEqual(nothing());
  });

  it('chains to nothing', () => {
    const mapped = subject.chain((_) => nothing());

    expect(mapped).toStrictEqual(nothing());
  });

  it('fallback chains to just 6', () => {
    const mapped = subject.orChain(() => just(6));

    expect(mapped).toStrictEqual(just(6));
  });

  it('fallback chains to nothing', () => {
    const mapped = subject.orChain(() => nothing());

    expect(mapped).toStrictEqual(nothing());
  });
});
