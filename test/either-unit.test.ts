import { Either, Right, Left } from '../';

describe('Either.right("data")', () => {
  // So it does not coerse straight to Right
  const subject = ((): Either<string, boolean> => Either.right('data'))();
  // const subject = Either.right('data');

  it('is Right', () => {
    expect(Either.isRight(subject)).toBeTruthy();
    expect(subject.isRight()).toBeTruthy();
  });

  it('is not Left', () => {
    expect(Either.isLeft(subject)).toBeFalsy();
    expect(subject.isLeft()).toBeFalsy();
  });

  it('contains "data"', () => {
    expect(subject.isRight() && Right.right(subject) === 'data').toBeTruthy();
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
      right: callback1,
      left: callback2,
    });

    expect(callback1).toBeCalledTimes(1);
    expect(callback1).toBeCalledWith('data');
    expect(callback2).toBeCalledTimes(0);
    expect(mapped).toStrictEqual(subject);
  });

  it('maps to Either.right(4)', () => {
    const callback = jest.fn((data: string) => data.length);

    const mapped = subject.map(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(mapped).toStrictEqual(Either.right(4));
  });

  it('fallback maps to self', () => {
    const callback = jest.fn(() => 3);

    const mapped = subject.orMap(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('match maps to Either.right(4)', () => {
    const callback1 = jest.fn((data: string) => data.length);
    const callback2 = jest.fn(() => 'none');

    const mapped = subject.matchMap({
      right: callback1,
      left: callback2,
    });

    expect(callback1).toBeCalledTimes(1);
    expect(callback1).toBeCalledWith('data');
    expect(callback2).toBeCalledTimes(0);
    expect(mapped).toStrictEqual(Either.right(4));
  });

  it('chains to Either.right(4)', () => {
    const callback = jest.fn((data: string) => Either.right(data.length));

    const chained = subject.chain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(chained).toStrictEqual(Either.right(4));
  });

  it('chains to Either.left(true)', () => {
    const callback = jest.fn(() => Either.left('none'));

    const chained = subject.chain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('data');
    expect(chained).toStrictEqual(Either.left('none'));
  });

  it('fallback chains to self', () => {
    const callback = jest.fn(() => Either.right(3));

    const mapped = subject.orChain(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('fallback chains to self', () => {
    const callback = jest.fn(() => Either.left('none'));

    const mapped = subject.orChain(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('match maps to Either.right(4)', () => {
    const callback1 = jest.fn((data: string) => Either.right(data.length));
    const callback2 = jest.fn(() => Either.right('none'));

    const mapped = subject.matchChain({
      right: callback1,
      left: callback2,
    });

    expect(callback1).toBeCalledTimes(1);
    expect(callback1).toBeCalledWith('data');
    expect(callback2).toBeCalledTimes(0);
    expect(mapped).toStrictEqual(Either.right(4));
  });
});

describe('Either.left(false)', () => {
  // So it does not coerse straight to Left
  const subject = ((): Either<string, boolean> => Either.left(false))();
  // const subject = Either.left(false);

  it('is Left', () => {
    expect(Either.isLeft(subject)).toBeTruthy();
    expect(subject.isLeft()).toBeTruthy();
  });

  it('is not Right', () => {
    expect(Either.isRight(subject)).toBeFalsy();
    expect(subject.isRight()).toBeFalsy();
  });

  it('contains false', () => {
    expect(subject.isLeft() && Left.left(subject) === false).toBeTruthy();
  });

  it('does not tap', () => {
    const callback = jest.fn();

    const tapped = subject.tap(callback);

    expect(callback).not.toBeCalled();
    expect(tapped).toStrictEqual(subject);
  });

  it('fallback taps "false"', () => {
    const callback = jest.fn();

    const tapped = subject.orTap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(false);
    expect(tapped).toStrictEqual(subject);
  });

  it('match taps "false"', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const mapped = subject.matchTap({
      right: callback1,
      left: callback2,
    });

    expect(callback1).toBeCalledTimes(0);
    expect(callback2).toBeCalledTimes(1);
    expect(callback2).toBeCalledWith(false);
    expect(mapped).toStrictEqual(subject);
  });

  it('maps to self', () => {
    const callback = jest.fn((data: string) => data.length);

    const mapped = subject.map(callback);

    expect(callback).not.toBeCalled();
    expect(mapped).toStrictEqual(subject);
  });

  it('fallback maps to Either.right(3)', () => {
    const callback = jest.fn(() => 3);

    const mapped = subject.orMap(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(false);
    expect(mapped).toStrictEqual(Either.right(3));
  });

  it('match maps to Either.right("none")', () => {
    const callback1 = jest.fn((data: string) => data.length);
    const callback2 = jest.fn(() => false);

    const mapped = subject.matchMap({
      right: callback1,
      left: callback2,
    });

    expect(callback1).toBeCalledTimes(0);
    expect(callback2).toBeCalledTimes(1);
    expect(callback2).toBeCalledWith(false);
    expect(mapped).toStrictEqual(Either.right(false));
  });

  it('chains to self', () => {
    const callback = jest.fn((data: string) => Either.right(data.length));

    const chained = subject.chain(callback);

    expect(callback).not.toBeCalled();
    expect(chained).toStrictEqual(subject);
  });

  it('chains to self', () => {
    const callback = jest.fn(() => Either.left('none'));

    const chained = subject.chain(callback);

    expect(callback).not.toBeCalled();
    expect(chained).toStrictEqual(subject);
  });

  it('fallback chains to Either.right(3)', () => {
    const callback = jest.fn(() => Either.right(3));

    const mapped = subject.orChain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(false);
    expect(mapped).toStrictEqual(Either.right(3));
  });

  it('fallback chains to Either.left(true)', () => {
    const callback = jest.fn(() => Either.left('none'));

    const mapped = subject.orChain(callback);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(false);
    expect(mapped).toStrictEqual(Either.left('none'));
  });

  it('match maps to Either.right(4)', () => {
    const callback1 = jest.fn((data: string) => Either.right(data.length));
    const callback2 = jest.fn(() => Either.right('none'));

    const mapped = subject.matchChain({
      right: callback1,
      left: callback2,
    });

    expect(callback1).toBeCalledTimes(0);
    expect(callback2).toBeCalledTimes(1);
    expect(callback2).toBeCalledWith(false);
    expect(mapped).toStrictEqual(Either.right('none'));
  });
});

describe('Either.fromOptional', () => {
  it('creates Either.right(5) from 5', () => {
    const value = Either.fromOptional(5, 'some-error');

    expect(value).toStrictEqual(Either.right(5));
  });

  it('creates Either.right(null) from null', () => {
    const value = Either.fromOptional(null, 'some-error');

    expect(value).toStrictEqual(Either.right(null));
  });

  it('creates Either.left("some-error") from undefined', () => {
    const value = Either.fromOptional(undefined, 'some-error');

    expect(value).toStrictEqual(Either.left('some-error'));
  });
});

describe('Either.fromNullable', () => {
  it('creates Either.right(5) from 5', () => {
    const value = Either.fromNullable(5, 'some-error');

    expect(value).toStrictEqual(Either.right(5));
  });

  it('creates Either.left("some-error") from null', () => {
    const value = Either.fromNullable(null, 'some-error');

    expect(value).toStrictEqual(Either.left('some-error'));
  });

  it('creates Either.left("some-error") from undefined', () => {
    const value = Either.fromNullable(undefined, 'some-error');

    expect(value).toStrictEqual(Either.left('some-error'));
  });
});

describe('[Either.right("data1"), Either.right("data2"), Either.right("data3")]', () => {
  // So typescript does not make assumptions about actual type
  const subjects = ((): Either<string, boolean>[] => [Either.right('data1'), Either.right('data2'), Either.right('data3')])();
  // const subjects = [Either.right('data1'), Either.right('data2'), Either.right('data3')];

  it('is contains right', () => {
    expect(Either.someRight(subjects)).toBeTruthy();
  });

  it('is all right', () => {
    expect(Either.everyRight(subjects)).toBeTruthy();
  });

  it('is does not contain left', () => {
    expect(Either.someLeft(subjects)).toBeFalsy();
  });

  it('is not all left', () => {
    expect(Either.everyLeft(subjects)).toBeFalsy();
  });
});

describe('[Either.left(), Either.left(), Either.left()]', () => {
  // So typescript does not make assumptions about actual type
  const subjects = ((): Either<string, boolean>[] => [Either.left(false), Either.left(true), Either.left(false)])();
  // const subjects = [Either.left(), Either.left(), Either.left()];

  it('is does not contain right', () => {
    expect(Either.someRight(subjects)).toBeFalsy();
  });

  it('is not all right', () => {
    expect(Either.everyRight(subjects)).toBeFalsy();
  });

  it('is contains left', () => {
    expect(Either.someLeft(subjects)).toBeTruthy();
  });

  it('is all left', () => {
    expect(Either.everyLeft(subjects)).toBeTruthy();
  });
});

describe('[Either.left(), Either.right("data"), Either.left()]', () => {
  // So typescript does not make assumptions about actual type
  const subjects = ((): Either<string, boolean>[] => [Either.left(true), Either.right('data'), Either.left(false)])();
  // const subjects = [Either.left(), Either.right('data'), Either.left()];

  it('is contains right', () => {
    expect(Either.someRight(subjects)).toBeTruthy();
  });

  it('is not all right', () => {
    expect(Either.everyRight(subjects)).toBeFalsy();
  });

  it('is contains left', () => {
    expect(Either.someLeft(subjects)).toBeTruthy();
  });

  it('is not all left', () => {
    expect(Either.everyLeft(subjects)).toBeFalsy();
  });
});
