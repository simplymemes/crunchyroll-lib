import { ISubtitleContent } from "./ISubtitleContent";

export interface ISubtitle {
  /**
   * Returns the ID of the subtitle.
   */
  getId(): number;

  /**
   * Returns the title of the subtitle.
   */
  getTitle(): string;

  /**
   * Retuns the content of the subtitle.
   */
  getContent(): Promise<ISubtitleContent>;

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
}