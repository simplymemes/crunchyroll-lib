import { ConfigPreload } from './ConfigPreload';
import { BaseModel } from './BaseModel';

export class Config extends BaseModel {
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