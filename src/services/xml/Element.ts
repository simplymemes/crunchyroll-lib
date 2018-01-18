import { ParentNode } from './ParentNode';

export class Element extends ParentNode {
  nodeType: number = 1;

  attributes: { [key: string]: string };

  constructor(nodeName: string, attributes: { [key: string]: string }) {
    super(nodeName);

    this.attributes = attributes;
  }

  get tagName(): string { return this.nodeName; }

  get id(): string {
    return this.getAttribute('id');
  }
  set id(id: string) { this.setAttribute('id', id); }

  get className(): string {
    return this.getAttribute('class');
  }
  set className(className: string) { this.setAttribute('class', className); }

  setAttribute(name: string, value: string): void {
    this.attributes[name] = value;
  }

  getAttribute(name: string): string {
    return this.attributes[name] || "";
  }

  hasAttribute(name: string): boolean {
    return this.attributes.hasOwnProperty(name);
  }
}