export interface ISubtitleResolver {
  /**
   * Returns the subtitle by their URL.
   * @param url the url of the subtitles.
   */
  getSubtitleByUrl(url: string): Promise<Uint8Array>;

  /**
   * Returns the subtitle.
   * @param id the ID of the subtitle.
   * @param iv the IV of the subtitle.
   * @param data the data of the subtitle.
   */
  getSubtitle(id: number, iv: Uint8Array, data: Uint8Array): Uint8Array;
}