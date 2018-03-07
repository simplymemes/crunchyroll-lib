import { ParentNode } from './ParentNode';
import { Element } from "./Element";

export class Document extends ParentNode {
  nodeType: number = 9;

  constructor() {
    super("#document");
  }

  getFirstElement(): Element|undefined {
    for (let i = 0; i < this.children.length; i++) {
      return this.children[i];
    }
    return undefined;
  }
}