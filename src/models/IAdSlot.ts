import { IVastAd } from "./IVastAd";

export interface IAdSlot {
  /**
   * The type of ad.
   */
  type: string;

  /**
   * The time of when to display the ad in seconds.
   */
  time: number;

  /**
   * The vast ads.
   */
  vastAds: IVastAd[];
}