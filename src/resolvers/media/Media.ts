import { Element } from '../../services/xml/Element';
import { ParentNode } from "../../services/xml/ParentNode";
import { IMedia } from '../../models/IMedia';
import { Config } from './Config';
import { ISubtitleResolver } from '../../models/ISubtitleResolver';
import { IMediaMetadata } from '../../models/IMediaMetadata';
import { IStream } from '../../models/IStream';
import { ISubtitle } from '../../models/ISubtitle';
import { Stream } from './Stream';
import { MediaMetadata } from './MediaMetadata';
import { Subtitle } from './Subtitle';
import { PreloadedSubtitle } from '../../models/PreloadedSubtitle';
import { toByteArray } from 'base64-js';

export class Media implements IMedia {
  private _config: Config;
  private _subtitleResolver: ISubtitleResolver;

  constructor(config: Config, subtitleResolver: ISubtitleResolver) {
    this._config = config;
    this._subtitleResolver = subtitleResolver;
  }

  getPingIntervals(): number[] {
    return this._config.preload.config.pingBackIntervals;
  }

  isAutoPlay(): boolean {
    return this._config.isAutoPlay;
  }

  getStartTime(): number {
    return this._config.startTime;
  }

  getId(): string {
    return this._config.preload.mediaMetadata.mediaId;
  }

  getMetadata(): IMediaMetadata {
    return new MediaMetadata(this._config.preload.mediaMetadata);
  }
  
  getStream(): IStream {
    return new Stream(this._config.preload.streamInfo);
  }

  getNextVideoUrl(): string {
    return this._config.nextUrl;
  }

  getSubtitles(): ISubtitle[] {
    const preload = this._config.preload;

    if (!preload.subtitles)
      return [];

    const subtitles: ISubtitle[] = [];

    const items = preload.subtitles.items;
    const preloadedData = preload.subtitle;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (preloadedData !== undefined && item.id === preloadedData.id) {
        const iv = toByteArray(preloadedData.iv);
        const data = toByteArray(preloadedData.data);

        const content = this._subtitleResolver.getSubtitle(preloadedData.id, iv, data);
        subtitles.push(new PreloadedSubtitle(content, item.id, item.title, item.author, item.isDefault, item.delay));
      } else {
        subtitles.push(new Subtitle(this._subtitleResolver, item.url, item.id, item.title, item.author, item.isDefault, item.delay));
      }
    }

    return subtitles;
  }
}