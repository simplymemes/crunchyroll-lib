export interface ISubtitleResolver {
  getSubtitleByUrl(url: string): Promise<Uint8Array>;
  getSubtitle(id: number, iv: Uint8Array, data: Uint8Array): Uint8Array;
}