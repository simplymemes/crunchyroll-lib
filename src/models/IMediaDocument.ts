import { IMediaFormat } from "./IMediaFormat";

export interface IMediaDocument {
  /**
   * Returns the title of the media.
   */
  getTitle(): string;

  /**
   * Returns the description of the media.
   */
  getDescription(): string;
  
  /**
   * Returns the unique ID of the media.
   */
  getId(): string;

  /**
   * Returns the formats of the media.
   */
  getMediaFormats(): IMediaFormat[];
}