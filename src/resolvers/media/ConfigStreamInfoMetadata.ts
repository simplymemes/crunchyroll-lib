import { ParentNode } from "../../services/xml/ParentNode";

export class ConfigStreamInfoMetadata {
  private _element: ParentNode;

  constructor(element: ParentNode) {
    this._element = element;
  }

  private _getValue(name: string): string {
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === name) {
        return children[i].textContent;
      }
    }
    throw new Error(`Unable to get property ${name} from StreamInfo.`);
  }

  get width(): number {
    return parseFloat(this._getValue('width'));
  }

  get height(): number {
    return parseFloat(this._getValue('height'));
  }

  get duration(): number {
    return parseFloat(this._getValue('duration'));
  }
}