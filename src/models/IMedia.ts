import { IStream } from "./IStream";
import { ISubtitle } from "./ISubtitle";
import { IMediaMetadata } from "./IMediaMetadata";

export interface IMedia {
  /**
   * Returns the ID of the media.
   */
  getId(): string;

  /**
   * Returns the metadata of the media.
   */
  getMetadata(): IMediaMetadata;

  /**
   * Returns the next video URL.
   */
  getNextVideoUrl(): string;

  /**
   * Returns the stream.
   */
  getStream(): IStream;

  /**
   * Returns list of subtitles.
   */
  getSubtitles(): ISubtitle[];

  /**
   * Returns whether to auto-play the media.
   */
  isAutoPlay(): boolean;

  /**
   * Returns the time at which to resume the media from.
   */
  getStartTime(): number;

  /**
   * Returns the ping intervals in ms.
   */
  getPingIntervals(): number[];
}