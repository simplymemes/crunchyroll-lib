import { ISubtitleResolver } from "../../models/ISubtitleResolver";
import { SingleAsync } from "../../utils/SingleAsync";
import { ISubtitle } from "../../models/ISubtitle";

export class Subtitle implements ISubtitle {
  private _id: number;
  private _title: string;
  private _author: string;
  private _isDefault: boolean;
  private _delay: number;

  private _url: string;

  private _resolver: ISubtitleResolver;
  private _singleRequest: SingleAsync<Uint8Array>;

  constructor(resolver: ISubtitleResolver, url: string, id: number, title: string, author: string, isDefault: boolean, delay: number) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._isDefault = isDefault;
    this._delay = delay;

    this._url = url;

    this._resolver = resolver;

    this._singleRequest = new SingleAsync(async () => await this._resolver.getSubtitleByUrl(this._url));
  }

  getId(): number {
    return this._id;
  }

  getTitle(): string {
    return this._title;
  }

  getContent(): Promise<Uint8Array> {
    return this._singleRequest.get();
  }

  async getContentAsString(): Promise<string> {
    return new TextDecoder("utf-8").decode(await this._singleRequest.get());
  }

  getAuthor(): string {
    return this._author;
  }

  isDefault(): boolean {
    return this._isDefault;
  }

  getDelay(): number {
    return this._delay;
  }
}