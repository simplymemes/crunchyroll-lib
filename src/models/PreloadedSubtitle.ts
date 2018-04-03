import { ISubtitle } from "./ISubtitle";
import { TextDecoder } from 'text-encoding';
import { ISubtitleContent } from "./ISubtitleContent";
import { SubtitleXMLModel } from "../resolvers/media/SubtitleContent";
import { DOMParser } from "../services/xml/DOMParser";

export class PreloadedSubtitle implements ISubtitle {
  private _id: number;
  private _title: string;
  private _author: string;
  private _isDefault: boolean;
  private _delay: number;

  private _content: Uint8Array;

  constructor(content: Uint8Array, id: number, title: string, author: string, isDefault: boolean, delay: number) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._isDefault = isDefault;
    this._delay = delay;

    this._content = content;
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
    return new TextDecoder("utf-8").decode(this._content);
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