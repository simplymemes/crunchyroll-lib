import { ConfigStreamInfoMetadata } from './ConfigStreamInfoMetadata';
import { BaseModel } from './BaseModel';
import { MediaType } from '../../models/IStream';

export class ConfigStreamInfo extends BaseModel {
  get mediaId(): string {
    return this._getValue('media_id');
  }

  get mediaType(): MediaType {
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