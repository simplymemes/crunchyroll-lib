import { ISubtitleResolver } from "../../models/ISubtitleResolver";
import { SingleAsync } from "../../utils/SingleAsync";
import { ISubtitle } from "../../models/ISubtitle";
import { TextDecoder } from 'text-encoding';
import { ISubtitleContent } from "../../models/ISubtitleContent";
import { DOMParser } from "../../services/xml/DOMParser";
import { SubtitleXMLModel } from "./SubtitleContent";

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

  async getContent(): Promise<ISubtitleContent> {
    const content = await this.getContentAsString();

    const doc = await (new DOMParser()).parseFromString(content);

    const subtitleScript = doc.getFirstElement();
    if (!subtitleScript) throw new Error("No content in XML");

    return new SubtitleXMLModel(subtitleScript);
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