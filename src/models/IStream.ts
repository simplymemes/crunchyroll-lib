export interface IStream {
  /**
   * Returns the type of stream.
   * @todo Figure out the values of this to convert it into an enum.
   */
  getType(): number;

  /**
   * Returns the file url.
   */
  getFile(): string|undefined;

  /**
   * Returns the file host.
   */
  getHost(): string|undefined;

  /**
   * Returns the duration of the stream.
   */
  getDuration(): number;

  /**
   * Returns the width of the stream.
   */
  getWidth(): number;

  /**
   * Returns the height of the stream.
   */
  getHeight(): number;
}