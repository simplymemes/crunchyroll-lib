import { IStream } from "./IStream";

export interface IMediaFormat {
  /**
   * Returns whether this is the default media format.
   */
  isDefault(): boolean;

  /**
   * Returns the format.
   */
  getFormat(): number;

  /**
   * Returns the quality.
   */
  getQuality(): number;

  /**
   * Returns the stream of the media format.
   */
  getStream(): Promise<IStream>;
}