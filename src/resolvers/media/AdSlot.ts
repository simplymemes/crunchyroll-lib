import { BaseModel } from "./BaseModel";
import { VastAd } from "./VastAd";

export class AdSlot extends BaseModel {
  get type(): string {
    return this._element.getAttribute("type");
  }
  
  get time(): number {
    return parseInt(this._element.getAttribute("time"), 10);
  }

  get vastAds(): VastAd[] {
    return this._element.children.map(x => new VastAd(x));
  }
}