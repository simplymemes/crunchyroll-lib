import { ConfigStreamInfo } from './ConfigStreamInfo';
import { ConfigMediaMetadata } from './ConfigMediaMetadata';
import { ConfigMediaSubtitles } from './ConfigMediaSubtitles';
import { SubtitleModel } from '../SubtitleResolver';
import { BaseModel } from './BaseModel';
import { ConfigPreloadConfig } from './ConfigPreloadConfig';

export class ConfigPreload extends BaseModel {
  get streamInfo(): ConfigStreamInfo {
    return new ConfigStreamInfo(this._getElement('stream_info'));
  }

  get mediaMetadata(): ConfigMediaMetadata {
    return new ConfigMediaMetadata(this._getElement('media_metadata'));
  }

  get subtitles(): ConfigMediaSubtitles {
    return new ConfigMediaSubtitles(this._getElement('subtitles'));
  }

  get subtitle(): SubtitleModel {
    return new SubtitleModel(this._getElement('subtitle'));
  }

  get config(): ConfigPreloadConfig {
    return new ConfigPreloadConfig(this._getElement('config:Config'));
  }
}