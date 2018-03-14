import { BaseModel } from './BaseModel';

export class ConfigMediaMetadata extends BaseModel {
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