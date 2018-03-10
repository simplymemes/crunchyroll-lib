import { IStream } from "./IStream";
import { IMedia } from "./IMedia";

export interface IMediaOptions {
  autoPlay?: boolean;
  affiliateId?: string;
}

export interface IMediaResolver {
  /**
   * Returns the media.
   * @param mediaId the ID of the media.
   * @param streamFormat the format ID of the video.
   * @param streamQuality the quality ID of the video.
   * @param currentPage the current page the media resides on.
   * @param options the options that's passed to Crunchyroll.
   */
  getMedia(mediaId: string, streamFormat: string, streamQuality: string, currentPage: string, options?: IMediaOptions): Promise<IMedia>;
}