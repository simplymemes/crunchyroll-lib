import { BrowserHttpClient } from "./services/http/BrowserHttpClient";
import container from "./config";
import { IMediaResolver, IMediaOptions } from "./models/IMediaResolver";
import { IMedia } from "./models/IMedia";
import { IHttpClient } from "./models/http/IHttpClient";
import { Container } from "./utils/container";

export async function getMedia(mediaId: string, streamFormat: string, streamQuality: string, currentPage: string, options?: IMediaOptions): Promise<IMedia> {
  const MediaResolver = container.get<IMediaResolver>("IMediaResolver");

  return await MediaResolver.getMedia(mediaId, streamFormat, streamQuality, currentPage, options);
}

export function setHttpClient(httpClient: { new(container: Container, ...args: any[]): IHttpClient }): void {
  container.bind("IHttpClient", httpClient);
}