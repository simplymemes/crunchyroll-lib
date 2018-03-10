export interface ISubtitleDecryptor {
  /**
   * Decrypt the subtitles.
   */
  decrypt(): Uint8Array;
}