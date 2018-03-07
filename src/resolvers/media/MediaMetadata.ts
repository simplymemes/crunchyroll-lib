import { IMediaMetadata } from "../../models/IMediaMetadata";
import { ConfigMediaMetadata } from "./ConfigMediaMetadata";

export class MediaMetadata implements IMediaMetadata {
  private _metadata: ConfigMediaMetadata;

  constructor(metadata: ConfigMediaMetadata) {
    this._metadata = metadata;
  }

  getSeriesTitle(): string {
    return this._metadata.seriesTitle;
  }

  getEpisodeTitle(): string {
    return this._metadata.episodeTitle;
  }
  
  getEpisodeNumber(): string {
    return this._metadata.episodeNumber;
  }

  getEpisodeImageUrl(): string {
    return this._metadata.episodeImageUrl;
  }
}