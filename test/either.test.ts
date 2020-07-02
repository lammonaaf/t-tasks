import { Either, right, isRight, left, isLeft } from '../src/either';

describe('right("data")', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Either<string, boolean> => right('data'))();

  it('is Right', () => {
    expect(isRight(subject)).toBeTruthy();
  });

  it('contains "data"', () => {
    expect(isRight(subject) && subject.right === 'data').toBeTruthy();
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
});
