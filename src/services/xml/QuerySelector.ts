export class QuerySelector {
  private _tokens: string[];

  constructor(selector: string) {
    this._tokens = selector.split(/[ ]+/g);
  }

  getNextElement() {

  }

  query() {
    const list = selector.split(/[ ]+/g);
    const token = list.shift();
    if (!token) return [];

    let elements: Element[];

    const mode = token.substring(0, 1);
    switch (mode) {
      case '.': {
        elements = this.getElementsByClassName(token.substring(1));
        break;
      }
      case '#': {
        const el = this.getElementById(token.substring(1));
        if (!el) return [];
        elements = [el];
        break;
      }
      default: {
        elements = this.getElementsByTagName(token);
        break;
      }
    }

    if (list.length === 0) {
      return elements;
    }

    let result: Element[] = [];
    switch (list[0]) {
      case '>': {
        
        break;
      }
      case '~': {
        break;
      }
      case '+': {
        break;
      }
      default: {
        for (let i = 0; i < elements.length; i++) {
          result = result.concat(elements[i].querySelectorAll(list.join(" ")));
        }
        break;
      }
    }

    return result;
  }
}