import { Element } from '../../services/xml/Element';
import { ParentNode } from "../../services/xml/ParentNode";
import { ConfigPreload } from './ConfigPreload';

export class Config {
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

  private _getElementOrUndefined(name: string): Element|undefined {
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === name) {
        return children[i];
      }
    }
    return undefined;
  }

  get nextUrl(): string {
    return this._getValue('default:nextUrl');
  }

  get enableAutoAdvance(): boolean {
    return this._getValue('default:enableAutoAdvance') === "1";
  }

  get enableChromecast(): boolean {
    return this._getValue('default:enableChromecast') === "1";
  }

  get startTime(): number {
    const element = this._getElementOrUndefined('default:startTime');
    if (!element) return 0;

    return parseFloat(element.textContent);
  }

  get isAutoPlay(): boolean {
    const element = this._getElementOrUndefined('default:isAutoPlay');
    return !!element;
  }

  get isClickThrough(): boolean {
    const element = this._getElementOrUndefined('default:isClickThrough');
    return !!element;
  }

  get preload(): ConfigPreload {
    return new ConfigPreload(this._getElement('default:preload'));
  }
}