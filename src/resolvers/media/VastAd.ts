import { BaseModel } from "./BaseModel";

export class VastAd extends BaseModel {
  get url(): string {
    return this._element.getAttribute("url");
  }

  get order(): number {
    return parseInt(this._element.getAttribute("order"), 10);
  }
}