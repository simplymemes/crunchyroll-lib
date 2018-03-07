import { Element } from '../../services/xml/Element';
import { ParentNode } from "../../services/xml/ParentNode";

export class ConfigMediaMetadata {
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

  get mediaId(): string {
    return this._getValue('media_id');
  }

  get mediaType(): string {
    return this._getValue('media_type');
  }

  get parentMediaType(): string {
    return this._getValue('parent_media_type');
  }

  get videoFormat(): string {
    return this._getValue('video_format');
  }

  get videoEncodeQuality(): string {
    return this._getValue('video_encode_quality');
  }

  get seriesTitle(): string {
    return this._getValue('series_title');
  }

  get episodeTitle(): string {
    return this._getValue('episode_title');
  }

  get episodeNumber(): string {
    return this._getValue('episode_number');
  }

  get episodeImageUrl(): string {
    return this._getValue('episode_image_url');
  }

  get countdownSeconds(): number {
    return parseFloat(this._getValue('countdown_seconds'));
  }
}