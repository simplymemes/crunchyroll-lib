import { Node } from './Node';

export class Text extends Node {
  nodeType: number = 3;
  private _text: string;

  constructor(text: string) {
    super("#text");

    this._text = text;
  }

  get textContent(): string {
    return this._text;
  }

  set textContent(text: string) {
    this._text = text;
  }
}