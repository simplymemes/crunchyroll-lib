import { Element } from '../../services/xml/Element';
import { ParentNode } from "../../services/xml/ParentNode";
import { ConfigStreamInfo } from './ConfigStreamInfo';
import { ConfigMediaMetadata } from './ConfigMediaMetadata';
import { ConfigMediaSubtitles } from './ConfigMediaSubtitles';
import { SubtitleData } from '../SubtitleResolver';

export class ConfigPreload {
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

  get streamInfo(): ConfigStreamInfo {
    return new ConfigStreamInfo(this._getElement('stream_info'));
  }

  get mediaMetadata(): ConfigMediaMetadata {
    return new ConfigMediaMetadata(this._getElement('media_metadata'));
  }

  get subtitles(): ConfigMediaSubtitles {
    return new ConfigMediaSubtitles(this._getElement('subtitles'));
  }

  get subtitle(): SubtitleData {
    return new SubtitleData(this._getElement('subtitle'));
  }
}