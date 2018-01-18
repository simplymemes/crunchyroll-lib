export interface ISubtitle {
  /**
   * Returns the title of the subtitle.
   */
  getTitle(): string;

  /**
   * Returns the content of the subtitle as string.
   */
  getContent(): string;

  /**
   * Returns the locale (RFC 5646) of the subtitle.
   * @see https://tools.ietf.org/html/rfc5646
   */
  getLocale(): string;
}