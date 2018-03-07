export class ClassList {
  private _classes: string[] = [];

  get length(): number { return this._classes.length; }
  get value(): string { return this._classes.join(" "); }
  set value(value: string) { this._classes = this._parseValue(value); }

  constructor(classes?: string) {
    if (classes) {
      this._classes = this._parseValue(classes);
    }
  }

  private _parseValue(value: string): string[] {
    return value.split(/[ ]+/g)
      .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
  }

  add(token: string): void {
    if (!this.contains(token)) {
      this._classes.push(token);
    }
  }

  remove(token: string): void {
    const index = this._classes.indexOf(token);
    if (index !== -1) {
      this._classes.splice(index, 1);
    }
  }

  item(index: number): string {
    if (index < 0 || index >= this._classes.length)
      throw new Error("Index out of bounds.");
    return this._classes[index];
  }

  toggle(token: string): boolean {
    const index = this._classes.indexOf(token);
    if (index === -1) {
      this._classes.push(token);
      return true;
    } else {
      this._classes.splice(index, 1);
      return false;
    }
  }

  contains(token: string): boolean {
    return this._classes.indexOf(token) !== -1;
  }

  replace(oldToken: string, newToken: string): void {
    const index = this._classes.indexOf(oldToken);
    if (index !== -1) {
      this._classes.splice(index, 1, newToken);
    }
  }

  entries(): IterableIterator<[number, string]> {
    return this._classes.entries();
  }

  forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void {
    const list = Array.from(this._classes);

    list.forEach(callbackfn, thisArg);
  }

  keys(): IterableIterator<number> {
    return this._classes.keys();
  }

  values(): IterableIterator<string> {
    return this._classes.values();
  }
}