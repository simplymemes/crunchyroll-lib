import { Element } from "../../services/xml/Element";

export class BaseModel {
  protected _element: Element;

  constructor(element: Element) {
    this._element = element;
  }

  protected _getValue(tagName: string): string {
    return this._getElement(tagName).textContent;
  }

  protected _getValueOrUndefined(tagName: string): string|undefined {
    const element = this._getElementOrUndefined(tagName);
    if (!element) return undefined;
    return element.textContent;
  }

  protected _getElement(tagName: string): Element {
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === tagName) {
        return children[i];
      }
    }
    throw new Error(`Element ${tagName} not found.`);
  }

  protected _getElements(tagName: string): Element[] {
    const elements: Element[] = [];
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === tagName) {
        elements.push(children[i]);
      }
    }
    return elements;
  }

  protected _getElementOrUndefined(tagName: string): Element|undefined {
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === tagName) {
        return children[i];
      }
    }
    return undefined;
  }
}