import { BaseModel } from "./BaseModel";

export class ConfigStreamInfoMetadata extends BaseModel {
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