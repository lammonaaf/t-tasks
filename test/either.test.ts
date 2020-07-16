import { Either, right, isRight, left, isLeft, fmapEither, chainEither, tapEither } from '../src';

describe('right("data")', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Either<string, boolean> => right('data'))();

  it('is Right', () => {
    expect(isRight(subject)).toBeTruthy();
  });

  it('contains "data"', () => {
    expect(isRight(subject) && subject.right === 'data').toBeTruthy();
  });

  it('taps "data"', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
  });

  it('taps "data"', () => {
    const callback = jest.fn((_: string) => {});

    tapEither(subject, callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
  });

  it('transforms to length 4', () => {
    const mapped = subject.fmap((value) => value.length);

    expect(isRight(mapped) && mapped.right === 4).toBeTruthy();
  });

  it('chains to length 4', () => {
    const mapped = subject.chain((value) => right(value.length));

    expect(isRight(mapped) && mapped.right === 4).toBeTruthy();
  });

  it('chains to false', () => {
    const mapped = subject.chain(() => left(false));

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });

  it('transforms to length 4', () => {
    const mapped = fmapEither(subject, (value) => value.length);

    expect(isRight(mapped) && mapped.right === 4).toBeTruthy();
  });

  it('chains to length 4', () => {
    const mapped = chainEither(subject, (value) => right(value.length));

    expect(isRight(mapped) && mapped.right === 4).toBeTruthy();
  });

  it('chains to false', () => {
    const mapped = chainEither(subject, () => left(false));

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });
});

describe('left(false)', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Either<string, boolean> => left(false))();

  it('is Left', () => {
    expect(isLeft(subject)).toBeTruthy();
  });

  it('contains false', () => {
    expect(isLeft(subject) && subject.left === false).toBeTruthy();
  });

  it('does not tap', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).not.toBeCalled();
  });

  it('transforms to left(false)', () => {
    const mapped = subject.fmap((value) => value.length);

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });

  it('chains to left(false)', () => {
    const mapped = subject.chain((value) => right(value.length));

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });

  it('chains to left(false)', () => {
    const mapped = subject.chain(() => left(true));

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });

  it('transforms to left(false)', () => {
    const mapped = fmapEither(subject, (value) => value.length);

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });

  it('chains to left(false)', () => {
    const mapped = chainEither(subject, (value) => right(value.length));

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });

  it('chains to left(false)', () => {
    const mapped = chainEither(subject, () => left(true));

    expect(isLeft(mapped) && mapped.left === false).toBeTruthy();
  });
});