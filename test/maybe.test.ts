import { just, isJust, nothing, isNothing, Maybe } from '../src';

describe('just("data")', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => just('data'))();

  it('is Just', () => {
    expect(isJust(subject)).toBeTruthy();
  });

  it('contains "data"', () => {
    expect(isJust(subject) && subject.just === 'data').toBeTruthy();
  });

  it('taps "data"', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
  });

  it('transforms to length 4', () => {
    const mapped = subject.fmap((value) => value.length);

    expect(isJust(mapped) && mapped.just === 4).toBeTruthy();
  });

  it('chains to length 4', () => {
    const mapped = subject.chain((value) => just(value.length));

    expect(isJust(mapped) && mapped.just === 4).toBeTruthy();
  });

  it('chains to nothing', () => {
    const mapped = subject.chain(() => nothing());

    expect(isNothing(mapped)).toBeTruthy();
  });
});

describe('nothing()', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Maybe<string> => nothing())();

  it('is Nothing', () => {
    expect(isNothing(subject)).toBeTruthy();
  });

  it('does not tap', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).not.toBeCalled();
  });

  it('transforms to Nothing', () => {
    const mapped = subject.fmap((value) => value.length);

    expect(isNothing(mapped)).toBeTruthy();
  });

  it('chains to nothing', () => {
    const mapped = subject.chain((value) => just(value.length));

    expect(isNothing(mapped)).toBeTruthy();
  });

  it('chains to nothing', () => {
    const mapped = subject.chain(() => nothing());

    expect(isNothing(mapped)).toBeTruthy();
  });
});
