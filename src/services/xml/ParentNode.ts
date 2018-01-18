import { Node } from './Node';
import { Text } from './Text';
import { Element } from './Element';

export class ParentNode extends Node {
  get children(): Element[] {
    return this.childNodes.filter(n => n.nodeType === 1) as any[] as Element[];
  }

  get firstElementChild(): Element|undefined {
    const children = this.children;
    if (children.length === 0) return undefined;

    return children[0];
  }

  get lastElementChild(): Element|undefined {
    const children = this.children;
    if (children.length === 0) return undefined;

    return children[children.length - 1];
  }

  get childElementCount(): number {
    return this.children.length;
  }

  get textContent(): string {
    return this.childNodes.map(node => node.textContent).join("");
  }

  set textContent(text: string) {
    const textNode = new Text(text);
    textNode.parentNode = this;

    this.childNodes.splice(0, this.childNodes.length, textNode);
  }

  getElementById(id: string): Element|undefined {
    const children = this.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].id === id)
          return children[i];
        const el = children[i].getElementById(id);
        if (el) return el;
      }
      return undefined;
  }

  getElementsByClassName(className: string): Element[] {
    const classList = className.split(/[ ]+/g);
    let elements: Element[] = [];

    const children = this.children;

    for (let i = 0; i < children.length; i++) {
      const childClassList = children[i].className.split(/[ ]+/g);
      a: {
        for (let i = 0; i < classList.length; i++) {
          if (childClassList.indexOf(classList[i]) === -1) break a;
        }
        elements.push(children[i]);
      }

      elements = elements.concat(children[i].getElementsByClassName(className));
    }

    return elements;
  }

  getElementsByTagName(tagName: string): Element[] {
    let elements: Element[] = [];

    const children = this.children;

    for (let i = 0; i < children.length; i++) {
      if (tagName === '*' || children[i].tagName === tagName) {
        elements.push(children[i]);
      }
      elements = elements.concat(children[i].getElementsByTagName(tagName));
    }

    return elements;
  }

  querySelector(selector: string): Element|undefined {
    const list = selector.split(/[ ]+/g);
    const token = list.shift();
    if (!token) return undefined;

    let elements: Element[];

    const mode = token.substring(0, 1);
    switch (mode) {
      case '.': {
        elements = this.getElementsByClassName(token.substring(1));
        break;
      }
      case '#': {
        const el = this.getElementById(token.substring(1));
        if (!el) return undefined;
        elements = [el];
        break;
      }
      default: {
        elements = this.getElementsByTagName(token);
        break;
      }
    }

    if (list.length === 0) {
      return elements.length > 0 ? elements[0] : undefined;
    }

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i].querySelector(list.join(" "));
      if (el) {
        return el;
      }
    }

    return undefined;
  }

  querySelectorAll(selector: string): Element[] {
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
    for (let i = 0; i < elements.length; i++) {
      result = result.concat(elements[i].querySelectorAll(list.join(" ")));
    }

    return result;
  }
}