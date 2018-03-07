import { ParentNode } from './ParentNode';
import { Attribute } from './Attribute';
import { ClassList } from './ClassList';

export class Element extends ParentNode {
  prefix: string|undefined;
  localName: string;
  namespaceURI: string|undefined;

  nodeType: number = 1;

  private _attributes: { [key: string]: Attribute };
  classList: ClassList = new ClassList();

  get attributes(): { [key: string]: Attribute } { return this._attributes; }

  constructor(nodeName: string, prefix: string|undefined, localName: string, attributes: { [key: string]: Attribute }) {
    super(nodeName);

    this.prefix = prefix;
    this.localName = localName;
    this._attributes = attributes;
  }

  get tagName(): string { return this.nodeName; }

  get id(): string {
    return this.getAttribute('id');
  }
  set id(id: string) { this.setAttribute('id', id); }

  get className(): string {
    return this.classList.value;
  }
  set className(className: string) {
    this.classList.value = className;
  }

  get parentElement(): Element|undefined {
    if (this.parentNode && this.parentNode.nodeType === 1) {
      return this.parentNode as Element;
    }
    return undefined;
  }

  get nextElementSibling(): Element|undefined {
    const parent = this.parentNode as ParentNode;

    if (!parent) return undefined;
    const nextSiblingIndex = parent.children.indexOf(this) + 1;

    if (nextSiblingIndex >= parent.children.length) return undefined;

    return parent.children[nextSiblingIndex];
  }

  get previousElementSibling(): Element|undefined {
    const parent = this.parentNode as ParentNode;

    if (!parent) return undefined;
    const nextSiblingIndex = parent.children.indexOf(this) - 1;

    if (nextSiblingIndex < 0) return undefined;

    return parent.children[nextSiblingIndex];
  }

  setAttribute(name: string, value: string): void {
    if (name in this.attributes) {
      this._attributes[name].value = value;
    } else {
      this._attributes[name] = new Attribute(name, undefined, name, undefined, value);
    }
  }

  getAttribute(name: string): string {
    if (name in this.attributes) {
      return this.attributes[name].value;
    } else {
      return "";
    }
  }

  hasAttribute(name: string): boolean {
    return name in this.attributes;
  }
}