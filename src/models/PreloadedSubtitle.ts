import { ISubtitle } from "./ISubtitle";
import { TextDecoder } from 'text-encoding';

export class PreloadedSubtitle implements ISubtitle {
  private _title: string;
  private _author: string;
  private _isDefault: boolean;
  private _delay: number;

  private _content: Uint8Array;

  constructor(content: Uint8Array, title: string, author: string, isDefault: boolean, delay: number) {
    this._title = title;
    this._author = author;
    this._isDefault = isDefault;
    this._delay = delay;

    this._content = content;
  }

  getTitle(): string {
    return this._title;
  }

  getContent(): Promise<Uint8Array> {
    return Promise.resolve(this._content);
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