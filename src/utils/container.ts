interface IContainerConstructors {
  constructor: { new(...args: any[]): any };
  args: any[];
}

export class Container {
  private _boundConstructors: {[key: string]: IContainerConstructors} = {};
  private _instances: {[key: string]: any} = {};

  bind(token: string, constructor: { new(container: Container, ...args: any[]): any }, ...args: any[]): void {
    if (this._boundConstructors.hasOwnProperty(token)) {
      delete this._boundConstructors[token];
    }
    if (this._instances.hasOwnProperty(token)) {
      delete this._instances[token];
    }

    this._boundConstructors[token] = {
      constructor: constructor,
      args: args
    };
  }

  get<T>(token: string): T {
    if (!this._instances.hasOwnProperty(token)) {
      const data = this._boundConstructors[token];
      this._instances[token] = new data.constructor(this, ...data.args);
    }

    return this._instances[token];
  }
}