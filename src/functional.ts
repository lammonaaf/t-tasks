export type Result<ResultType> = PromiseLike<ResultType> | ResultType;

export function tuple<Args extends any[]>(...args: Args | [Args]): Args {
  if (args.length === 1 && Array.isArray(args[0])) {
    return args[0] as Args;
  } else {
    return args as Args;
  }
}

export function nothrow<Args extends any[], ResultType>(
  func: (...args: Args) => Result<ResultType>,
): ((...args: Args) => Result<void>) {
  return async (...args: Args) => {
    try {
      await func(...args);
    } catch (e) {
      console.log(e);
    }
  };
}

export function optional<Args extends any[], ResultType>(
  func?: (...args: Args) => Result<ResultType>,
): ((...args: Args) => Result<void>) {
  return async (...args: Args) => {
    if (func) {
      func(...args);
    }
  };
}

export function defer<Args extends any[], ResultType>(
  func: (...args: Args) => Result<ResultType>,
) {
  return (...args: Args): void => {
    setTimeout(func, undefined, ...args);
  };
}

export function asyncCallback<Args extends any[], ResultType>(
  func: (...args: Args) => Result<ResultType>,
) {
  return (...args: Args): void => {
    func(...args);
  };
}

export function inversePromise<T, E>(p: Promise<T>): Promise<E> {
  return p.then(
    (val) => Promise.reject<E>(val),
    (err) => Promise.resolve<E>(err),
  );
}

export function anyPromise<T>(promises: Promise<T>[]) {
  return inversePromise<any, T>(Promise.all(
    promises.map((p) => inversePromise<T, any>(p)),
  ));
}
