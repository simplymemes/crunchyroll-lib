import { Element } from '../../services/xml/Element';
import { ParentNode } from "../../services/xml/ParentNode";
import { ConfigStreamInfoMetadata } from './ConfigStreamInfoMetadata';

export class ConfigStreamInfo {
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

  get mediaType(): number {
    return parseInt(this._getValue('media_type'), 10);
  }

  get host(): string {
    return this._getValue('host');
  }

  get file(): string {
    return this._getValue('file');
  }

  get videoFormat(): string {
    return this._getValue('video_format');
  }

  get videoEncodeId(): string {
    return this._getValue('video_encode_id');
  }

  get videoEncodeQuality(): string {
    return this._getValue('video_encode_quality');
  }

  get token(): string {
    return this._getValue('token');
  }

  get metadata(): ConfigStreamInfoMetadata {
    return new ConfigStreamInfoMetadata(this._getElement('metadata'));
  }
}