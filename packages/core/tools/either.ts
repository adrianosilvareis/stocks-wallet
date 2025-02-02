export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }

  map<T>(_: (r: R) => T): Either<L, T> {
    return this as any;
  }

  fold<T>(leftFn: (l: L) => T, _: (r: R) => T): T {
    return leftFn(this.value);
  }
}

export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }

  map<T>(fn: (r: R) => T): Either<L, T> {
    return new Right(fn(this.value));
  }

  fold<T>(leftFn: (l: L) => T, rightFn: (r: R) => T): T {
    return rightFn(this.value);
  }
}

export const left = <L, R>(l: L): Either<L, R> => new Left(l);
export const right = <L, R>(r: R): Either<L, R> => new Right(r);
