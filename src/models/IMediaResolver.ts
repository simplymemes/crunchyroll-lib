import { IStream } from "./IStream";
import { IMedia } from "./IMedia";

export interface IMediaOptions {
  autoPlay?: boolean;
  affiliateId?: string;
}

export interface IMediaResolver {
  getMedia(mediaId: string, streamFormat: string, streamQuality: string, currentPage: string, options?: IMediaOptions): Promise<IMedia>;
}