export interface IMediaMetadata {
  /**
   * Returns the title of the series.
   */
  getSeriesTitle(): string;

  /**
   * Returns the title of the episode.
   */
  getEpisodeTitle(): string;

  /**
   * Returns the number of the episode.
   */
  getEpisodeNumber(): string;

  /**
   * Returns the episode image URL.
   */
  getEpisodeImageUrl(): string;
}