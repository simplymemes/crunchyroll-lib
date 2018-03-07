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
}