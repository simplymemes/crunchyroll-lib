import { IStream } from "./IStream";

export interface IStreamOptions {
  autoPlay?: boolean;
  affiliateId?: string;
}

export interface IStreamResolver {
  getStream(mediaId: string, streamFormat: string, streamQuality: string, currentPage: string, options?: IStreamOptions): Promise<IStream>;
}