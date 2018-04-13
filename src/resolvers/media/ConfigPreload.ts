import { ConfigStreamInfo } from './ConfigStreamInfo';
import { ConfigMediaMetadata } from './ConfigMediaMetadata';
import { ConfigMediaSubtitles } from './ConfigMediaSubtitles';
import { SubtitleModel } from '../SubtitleResolver';
import { BaseModel } from './BaseModel';
import { ConfigPreloadConfig } from './ConfigPreloadConfig';
import { AdSlot } from './AdSlot';

export class ConfigPreload extends BaseModel {
  get streamInfo(): ConfigStreamInfo {
    return new ConfigStreamInfo(this._getElement('stream_info'));
  }

  get mediaMetadata(): ConfigMediaMetadata {
    return new ConfigMediaMetadata(this._getElement('media_metadata'));
  }

  get subtitles(): ConfigMediaSubtitles|undefined {
    const subtitles = this._getElementOrUndefined('subtitles');
    if (subtitles) {
      return new ConfigMediaSubtitles(subtitles);
    }
    return undefined;
  }

  get subtitle(): SubtitleModel|undefined {
    const subtitle = this._getElementOrUndefined('subtitle');
    if (subtitle) {
      return new SubtitleModel(subtitle);
    }
    return undefined;
  }

  get config(): ConfigPreloadConfig {
    return new ConfigPreloadConfig(this._getElement('config:Config'));
  }

  get adSlots(): AdSlot[] {
    const adSlots = this._getElementOrUndefined('adSlots');

    if (adSlots) {
      return adSlots.children.map(x => new AdSlot(x));
    }

    return [];
  }
}