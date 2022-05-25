export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | undefined;
  private value: T | undefined;

  private constructor(isSuccess: boolean, error?: T, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }

    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public getValue() {
    if (!this.isSuccess) {
      throw new Error('Cannot get the value of an failed result');
    }

    return this.value as T;
  }

  public static success<U>(value: U) {
    return new Result<U>(true, undefined, value);
  }

  public static failure<U>(error: U) {
    return new Result<U>(false, error, undefined);
  }

  public static combine(results: Result<any>[]) {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }

    return Result.success(true);
  }
}