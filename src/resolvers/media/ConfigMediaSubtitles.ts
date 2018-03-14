import { IConfigMediaSubtitle } from './IConfigMediaSubtitle';
import { BaseModel } from './BaseModel';

export class ConfigMediaSubtitles extends BaseModel {
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