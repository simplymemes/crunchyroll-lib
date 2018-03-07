import { Element } from '../../services/xml/Element';
import { ParentNode } from "../../services/xml/ParentNode";
import { IConfigMediaSubtitle } from './IConfigMediaSubtitle';

export class ConfigMediaSubtitles {
  private _element: ParentNode;

  constructor(element: ParentNode) {
    this._element = element;
  }

  private _getValue(name: string): string {
    return this._getElement(name).textContent;
  }

  private _getElement(name: string): Element {
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === name) {
        return children[i];
      }
    }
    throw new Error(`Unable to get property ${name} from StreamInfo.`);
  }

  private _getElements(name: string): Element[] {
    const elements: Element[] = [];
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === name) {
        elements.push(children[i]);
      }
    }
    return elements;
  }

  get items(): IConfigMediaSubtitle[] {
    const elements = this._getElements("subtitle");

    return elements.map(x => {
      return {
        id: parseInt(x.getAttribute("id"), 10),
        title: x.getAttribute("title"),
        author: x.getAttribute("user"),
        isDefault: x.getAttribute("default") === "1",
        delay: parseFloat(x.getAttribute("delay")),
        url: x.getAttribute("link")
      };
    });
  }
}