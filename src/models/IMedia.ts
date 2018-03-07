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
   * Returns the stream.
   */
  getStream(): IStream;

  /**
   * Returns list of subtitles.
   */
  getSubtitles(): ISubtitle[];
}