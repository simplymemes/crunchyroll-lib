import { ISubtitleResolver } from "../models/ISubtitleResolver";
import { ISubtitle } from "../models/ISubtitle";
import { DOMParser } from "../services/xml/DOMParser";
import { Element } from "../services/xml/Element";
import { SubtitleDecryptor } from "../SubtitleDecryptor";
import { PreloadedSubtitle } from "../models/PreloadedSubtitle";
import { Container } from "../utils/container";
import { IHttpClient } from "../models/http/IHttpClient";
import { toByteArray } from 'base64-js';

export class SubtitleResolver implements ISubtitleResolver {
  private _httpClient: IHttpClient;

  constructor(container: Container) {
    this._httpClient = container.get("IHttpClient");
  }

  async getSubtitleByUrl(url: string): Promise<Uint8Array> {
    const response = await this._httpClient.get(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const doc = await (new DOMParser()).parseFromString(response.body);
    const body = doc.getFirstElement();
    if (!body)
      throw new Error("Empty DOM");
    
    const subtitleDecryptionData = new SubtitleData(body);

    const iv = toByteArray(subtitleDecryptionData.iv);
    const data = toByteArray(subtitleDecryptionData.data);

    return this.getSubtitle(subtitleDecryptionData.id, iv, data);
  }

  getSubtitle(id: number, iv: Uint8Array, data: Uint8Array): Uint8Array {
    const decrypter = new SubtitleDecryptor(id, iv, data);

    return decrypter.decrypt();
  }
}

export class SubtitleData {
  private _element: Element;

  constructor(element: Element) {
    this._element = element;
  }

  private _getValue(name: string): string {
    return this._getElement(name).textContent;
  }

  private _getElement(name: string): Element {
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === name) {
        return children[i];
      }
    }
    throw new Error(`Unable to get property ${name} from StreamInfo.`);
  }

  get id(): number {
    return parseInt(this._element.getAttribute('id'), 10);
  }

  get iv(): string {
    return this._getValue('iv');
  }

  get data(): string {
    return this._getValue('data');
  }
}