import { IStream } from "./IStream";
import { IMedia } from "./IMedia";

export interface IMediaOptions {
  /** Whether to auto-play the video */
  autoPlay?: boolean;

  /** The affiliate ID used for other sites embedding Crunchyroll videos */
  affiliateId?: string;

  /** The format ID of the video. */
  streamFormat?: string;

  /** The quality ID of the video. */
  streamQuality?: string;
}

export interface IMediaResolver {
  /**
   * Returns the media.
   * @param mediaId the ID of the media.
   * @param currentPage the current page the media resides on.
   * @param options the options that's passed to Crunchyroll.
   */
  getMedia(mediaId: string, currentPage: string, options?: IMediaOptions): Promise<IMedia>;
}