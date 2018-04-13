export enum MediaType {
  Anime = 1,
  Game = 2,
  MusicVideo = 3,
  Trailer = 4,
  Drama = 5,
  UserVideo = 6,
  Car = 7
}

export interface IStream {
  /**
   * Returns the type of stream.
   */
  getType(): MediaType;

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

  /**
   * Returns the encode ID.
   */
  getEncodeId(): string;
}