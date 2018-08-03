import { IMediaOptions, IMediaResolver } from "./models/IMediaResolver";
import { IMedia } from "./models/IMedia";
import { IHttpClient } from "./models/http/IHttpClient";
import container from "./config";

export type FormatMap = { quality: string, format: string };
export interface Formats {
  '360p': FormatMap;
  '480p': FormatMap;
  '720p': FormatMap;
  '1080p': FormatMap;
}

export const FORMAT_IDS: Formats = {
  '360p': {
    quality: '60',
    format: '106'
  },
  '480p': {
    quality: '61',
    format: '106'
  },
  '720p': {
    quality: '62',
    format: '106'
  },
  '1080p': {
    quality: '80',
    format: '108'
  }
};

type MediaUrl = {
  prefix: string,
  restUrl: string,
  mediaId: string
};

const parseMediaUrl = (url: string): MediaUrl => {
  const re = /https?:\/\/(?:(www|m)\.)?(crunchyroll\.(?:com|fr)\/(?:media(?:-|\/\?id=)|[^/]*\/[^/?&]*?)([0-9]+))(?:[/?&]|$)/g;
  const match = re.exec(url);
  if (!match) throw new Error("Invalid URL");

  return {
    prefix: match[1],
    restUrl: match[2],
    mediaId: match[3]
  };
};

function searchFor(text: string, start: string, end: string): string {
  const startIndex = text.indexOf(start);
  if (startIndex === -1) throw new Error("Couldn't find start in text");
  text = text.substring(startIndex + start.length);
  const endIndex = text.indexOf(end);
  if (endIndex === -1) throw new Error("Couldn't find end in text");

  return text.substring(0, endIndex);
}

/**
 * Returns the media.
 * @param url the URL of the media.
 * @param videoQuality the quality of the video.
 * @param options the options passed to Crunchyroll.
 */
export async function getMediaByUrl(url: string, videoQuality: keyof Formats, options?: IMediaOptions): Promise<IMedia>;

/**
 * Returns the media.
 * @param url the URL of the media.
 * @param streamFormat the format ID of the video.
 * @param streamQuality the quality ID of the video.
 * @param options the options passed to Crunchyroll.
 */
export async function getMediaByUrl(url: string, streamFormat: string, streamQuality: string, options?: IMediaOptions): Promise<IMedia>;

export async function getMediaByUrl(url: string, streamFormatOrVideoQuality: string|keyof Formats, streamQualityOrOptions?: string|IMediaOptions, options?: IMediaOptions): Promise<IMedia> {
  let quality: string;
  let format: string;

  let { prefix, mediaId } = parseMediaUrl(url);

  if (typeof streamFormatOrVideoQuality === "string" && typeof streamQualityOrOptions === "string") {
    quality = streamQualityOrOptions;
    format = streamFormatOrVideoQuality;
  } else {
    const formatMap = FORMAT_IDS[streamFormatOrVideoQuality as keyof Formats];
    quality = formatMap.quality;
    format = formatMap.format;

    if (prefix === "m") {
      const httpClient = container.get<IHttpClient>("IHttpClient");
      const response = await httpClient.get(url);
      
      url = searchFor(response.body, "<link rel=\"canonical\" href=\"", "\" />");

      mediaId = parseMediaUrl(url).mediaId;
    }
  }

  return await getMedia(mediaId, format, quality, url, options);
}

/**
 * Returns the media.
 * @param mediaId the ID of the media
 * @param videoQuality the quality of the video.
 * @param currentPage the URL of the media.
 * @param options the options passed to Crunchyroll.
 */
export async function getMedia(mediaId: string, videoQuality: keyof Formats, currentPage: string, options?: IMediaOptions): Promise<IMedia>;

/**
 * Returns the media.
 * @param mediaId the ID of the media
 * @param streamFormat the format ID of the video.
 * @param streamQuality the quality ID of the video.
 * @param currentPage the URL of the media.
 * @param options the options passed to Crunchyroll.
 */
export async function getMedia(mediaId: string, streamFormat: string, streamQuality: string, currentPage: string, options?: IMediaOptions): Promise<IMedia>;

export async function getMedia(mediaId: string, videoQualityOrStreamFormat: string|keyof Formats, currentPageOrStreamQuality: string, optionsOrCurrentPage?: string|IMediaOptions, options?: IMediaOptions): Promise<IMedia> {
  let streamFormat: string;
  let streamQuality: string;
  let currentPage: string;
  if (typeof optionsOrCurrentPage === "string") {
    streamFormat = videoQualityOrStreamFormat;
    streamQuality = currentPageOrStreamQuality;
    currentPage = optionsOrCurrentPage;
  } else {
    const formatMap = FORMAT_IDS[videoQualityOrStreamFormat as keyof Formats];

    streamFormat = formatMap.format;
    streamQuality = formatMap.quality;
    currentPage = currentPageOrStreamQuality;
    options = optionsOrCurrentPage;
  }

  const MediaResolver = container.get<IMediaResolver>("IMediaResolver");

  options = options || {};

  options.streamFormat = streamFormat;
  options.streamQuality = streamQuality;

  return await MediaResolver.getMedia(mediaId, currentPage, options);
}