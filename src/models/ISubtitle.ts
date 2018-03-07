export interface ISubtitle {
  /**
   * Returns the title of the subtitle.
   */
  getTitle(): string;

  /**
   * Retuns the content of the subtitle.
   */
  getContent(): Promise<Uint8Array>;

  /**
   * Returns the content of the subtitle as string.
   */
  getContentAsString(): Promise<string>;

  /**
   * Returns the author of the subtitle.
   */
  getAuthor(): string;

  /**
   * Returns whether the subtitle is default.
   */
  isDefault(): boolean;

  /**
   * Returns the amount of delay to apply to the subtitle.
   */
  getDelay(): number;

  /**
   * Returns the locale (RFC 5646) of the subtitle.
   * @see https://tools.ietf.org/html/rfc5646
   */
  getLocale(): string;
}