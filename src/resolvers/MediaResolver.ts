import { IMediaResolver, IMediaOptions } from "../models/IMediaResolver";
import { IStream } from "../models/IStream";
import { IHttpClient } from "../models/http/IHttpClient";
import { DOMParser } from "../services/xml/DOMParser";
import { Element } from '../services/xml/Element';
import { Document } from '../services/xml/Document';
import { ParentNode } from "../services/xml/ParentNode";
import { IMedia } from "../models/IMedia";
import { Container } from "../utils/container";
import { IMediaMetadata } from "../models/IMediaMetadata";
import { ISubtitle } from "../models/ISubtitle";
import { PreloadedSubtitle } from "../models/PreloadedSubtitle";
import { ISubtitleResolver } from "../models/ISubtitleResolver";
import { Config } from "./media/Config";
import { Media } from "./media/Media";

function _(doc: ParentNode, name: string): Element {
  const elements = doc.getElementsByTagName(name);

  if (elements.length === 0)
    throw new Error("Unable to find " + name + " in node.");
  return elements[0];
}

export class MediaResolver implements IMediaResolver {
  private _httpClient: IHttpClient;
  private _subtitleResolver: ISubtitleResolver;

  constructor(container: Container) {
    this._httpClient = container.get("IHttpClient");
    this._subtitleResolver = container.get("ISubtitleResolver");
  }

  private _buildUrl(mediaId: string, currentPage: string, options?: IMediaOptions): string {
    let url = "http://www.crunchyroll.com/xml/?req=RpcApiVideoPlayer_GetStandardConfig"
      + "&media_id=" + encodeURIComponent(mediaId)
      + "&current_page=" + encodeURIComponent(currentPage);
    
    if (options) {
      if (options.streamFormat) {
        url += "&video_format=" + encodeURIComponent(options.streamFormat);
      }
      if (options.streamQuality) {
        url += "&video_quality=" + encodeURIComponent(options.streamQuality);
      }

      if (typeof options.autoPlay === 'boolean') {
        url += "&auto_play=" + (options.autoPlay ? '1' : '0');
      }
      if (typeof options.affiliateId === 'boolean') {
        url += "&aff=" + options.affiliateId;
      }
    }
    return url;
  }

  async getMedia(mediaId: string, currentPage: string, options?: IMediaOptions): Promise<IMedia> {
    const url = this._buildUrl(mediaId, currentPage, options);
    
    const response = await this._httpClient.get(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const doc = await (new DOMParser()).parseFromString(response.body);
    const body = doc.getFirstElement();
    if (!body)
      throw new Error("Empty DOM");

    return new Media(new Config(body), this._subtitleResolver);
  }
}
