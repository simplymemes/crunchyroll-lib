export enum SingleAsyncState {
  Pending,
  Working,
  Complete,
  Error
}

interface ISingleAsyncPromise<T> {
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export class SingleAsync<T> {
  private _fn: (...args: any[]) => Promise<T>;
  private _args: any[];

  private _state: SingleAsyncState = SingleAsyncState.Pending;
  private _value: T|undefined;
  private _error: any;

  private _promises: ISingleAsyncPromise<T>[] = [];

  constructor(fn: (...args: any[]) => Promise<T>, ...args: any[]) {
    this._fn = fn;
    this._args = args;
  }

  clear(): void {
    this._state = SingleAsyncState.Pending;
    this._value = undefined;
    this._error = undefined;

    let p: ISingleAsyncPromise<T>|undefined;
    while (p = this._promises.shift()) {
      try {
        p.reject(new Error(""));
      } catch (e) {
        // Silently fail
      }
    }
  }

  async get(): Promise<T> {
    if (this._state === SingleAsyncState.Complete) {
      return this._value as T;
    } else if (this._state === SingleAsyncState.Error) {
      throw this._error;
    }

    const p = new Promise<T>((resolve, reject) => {
      this._promises.push({
        resolve: resolve,
        reject: reject
      });
    });

    if (this._state === SingleAsyncState.Pending) {
      this._state = SingleAsyncState.Working;

      this._fn(...this._args)
      .then(value => {
        this._value = value;
        this._state = SingleAsyncState.Complete;

        let p: ISingleAsyncPromise<T>|undefined;
        while (p = this._promises.shift()) {
          try {
            p.resolve(value);
          } catch (e) {
            // Silently fail
          }
        }
      }, reason => {
        this._error = reason;
        this._state = SingleAsyncState.Error;

        let p: ISingleAsyncPromise<T>|undefined;
        while (p = this._promises.shift()) {
          try {
            p.reject(reason);
          } catch (e) {
            // Silently fail
          }
        }
      });
    }

    return p;
  }

  getValue(): T|undefined {
    return this._value;
  }

  getError(): any {
    return this._error;
  }

  getState(): SingleAsyncState {
    return this._state;
  }
}