import { IStreamResolver, IStreamOptions } from "../models/IStreamResolver";
import { IStream } from "../models/IStream";
import { IHttpClient } from "../models/http/IHttpClient";
import { IConfig } from "../models/IConfig";
import { DOMParser } from "../services/xml/DOMParser";

export class StreamResolver implements IStreamResolver {
  private _config: IConfig;

  constructor(config: IConfig) {
    this._config = config;
  }

  private _buildUrl(mediaId: string, streamFormat: string, streamQuality: string, currentPage: string, options?: IStreamOptions): string {
    let url = "http://www.crunchyroll.com/xml/?req=RpcApiVideoPlayer_GetStandardConfig"
      + "&media_id=" + encodeURIComponent(mediaId)
      + "&video_format=" + encodeURIComponent(streamFormat)
      + "&video_quality=" + encodeURIComponent(streamQuality)
      + "&current_page=" + encodeURIComponent(currentPage);
    if (options) {
      if (typeof options.autoPlay === 'boolean') {
        url += "&auto_play=" + (options.autoPlay ? '1' : '0');
      }
      if (typeof options.affiliateId === 'boolean') {
        url += "&aff=" + options.affiliateId;
      }
    }
    return url;
  }

  async getStream(mediaId: string, streamFormat: string, streamQuality: string, currentPage: string, options?: IStreamOptions): Promise<IStream> {
    const httpClient = this._config.HttpClient;
    if (!httpClient)
      throw new Error("HttpClient not found in confg.");
    const url = this._buildUrl(mediaId, streamFormat, streamQuality, currentPage, options);
    
    const response = await httpClient.get(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const doc = await (new DOMParser()).parseFromString(response.body);

    const streamInfo = doc.querySelector('stream_info');
    if (!streamInfo)
      throw new Error("Tag stream_info not found.");
    const encodeId = streamInfo.querySelector("video_encode_id")!.textContent;
    console.log(encodeId);
    throw new Error("Test");
  }
}