import { Either } from '../src';

describe('Either.right("data")', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Either<string, boolean> => Either.right('data'))();

  it('is Right', () => {
    expect(subject.isRight()).toBeTruthy();
  });

  it('is not Left', () => {
    expect(subject.isLeft()).toBeFalsy();
  });

  it('contains "data"', () => {
    expect(subject.isRight() && subject.right === 'data').toBeTruthy();
  });

  it('taps "data"', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
  });

  it('transforms to length 4', () => {
    const mapped = subject.map((value) => value.length);

    expect(mapped.isRight() && mapped.right === 4).toBeTruthy();
  });

  it('does not fallback', () => {
    const callback = jest.fn((_: boolean) => {});

    const mapped = subject.orMap((error) => {
      callback(error);

      return 3;
    });

    expect(callback).not.toBeCalled();
    expect(mapped.isRight() && mapped.right === 'data').toBeTruthy();
  });

  it('chains to length 4', () => {
    const mapped = subject.chain((value) => Either.right(value.length));

    expect(mapped.isRight() && mapped.right === 4).toBeTruthy();
  });

  it('chains to false', () => {
    const mapped = subject.chain(() => Either.left(false));

    expect(mapped.isLeft() && mapped.left === false).toBeTruthy();
  });

  it('does not fallback chain', () => {
    const callback = jest.fn((_: boolean) => {});

    const mapped = subject.orChain((value) => {
      callback(value);

      return Either.right(3);
    });

    expect(callback).not.toBeCalled();
    expect(mapped.isRight() && mapped.right === 'data').toBeTruthy();
  });
});

describe('Either.left(false)', () => {
  // So typescript does not make assumptions about actual type
  const subject = ((): Either<string, boolean> => Either.left(false))();

  it('is Left', () => {
    expect(subject.isLeft()).toBeTruthy();
  });

  it('is not Right', () => {
    expect(subject.isRight()).toBeFalsy();
  });

  it('contains false', () => {
    expect(subject.isLeft() && subject.left === false).toBeTruthy();
  });

  it('does not tap', () => {
    const callback = jest.fn((_: string) => {});

    subject.tap(callback);

    expect(callback).not.toBeCalled();
  });

  it('transforms to left false', () => {
    const mapped = subject.map((value) => value.length);

    expect(mapped.isLeft() && mapped.left === false).toBeTruthy();
  });

  it('fallbacks to 3', () => {
    const callback = jest.fn((_: boolean) => {});

    const mapped = subject.orMap((error) => {
      callback(error);

      return 3;
    });

    expect(callback).toBeCalledWith(false);
    expect(mapped.isRight() && mapped.right === 3).toBeTruthy();
  });

  it('chains to left false', () => {
    const mapped = subject.chain((value) => Either.right(value.length));

    expect(mapped.isLeft() && mapped.left === false).toBeTruthy();
  });

  it('chains to left false', () => {
    const mapped = subject.chain(() => Either.left(true));

    expect(mapped.isLeft() && mapped.left === false).toBeTruthy();
  });

  it('fallback chains to 3', () => {
    const callback = jest.fn((_: boolean) => {});

    const mapped = subject.orChain((value) => {
      callback(value);

      return Either.right(3);
    });

    expect(callback).toBeCalledWith(false);
    expect(mapped.isRight() && mapped.right === 3).toBeTruthy();
  });
});

describe('fromOptional()', () => {
  it('creates just 5 from 5', () => {
    const value = Either.fromOptional(5, 'some-error');

    expect(value).toStrictEqual(Either.right(5));
  });

  it('creates nothing from undefined', () => {
    const value = Either.fromOptional(undefined, 'some-error');

    expect(value).toStrictEqual(Either.left('some-error'));
  });

  it('creates just null from null', () => {
    const value = Either.fromOptional(null, 'some-error');

    expect(value).toStrictEqual(Either.right(null));
  });
});

describe('fromNullable()', () => {
  it('creates just 5 from 5', () => {
    const value = Either.fromNullable(5, 'some-error');

    expect(value).toStrictEqual(Either.right(5));
  });

  it('creates nothing from undefined', () => {
    const value = Either.fromNullable(undefined, 'some-error');

    expect(value).toStrictEqual(Either.left('some-error'));
  });

  it('creates nothing from null', () => {
    const value = Either.fromNullable(null, 'some-error');

    expect(value).toStrictEqual(Either.left('some-error'));
  });
});
