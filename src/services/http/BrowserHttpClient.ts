import { IHttpClient, BodyType } from "../../models/http/IHttpClient";
import { IOptions } from "../../models/http/IOptions";
import { IResponse } from "../../models/http/IResponse";
import { IXMLHttpRequestFactory } from "../../models/http/IXMLHttpRequestFactory";
import { Container } from "../../utils/container";

function processBody(body?: BodyType): string|undefined {
  if (!body) return undefined;

  if (typeof body === "object") {
    let tokens: string[] = [];
    for (let key in body) {
      if (body.hasOwnProperty(key)) {
        tokens.push(encodeURIComponent(key) + "=" + encodeURIComponent(body[key] + ''));
      }
    }

    return tokens.join("&");
  } else {
    return body;
  }
}

function getResponse(req: XMLHttpRequest): IResponse<string> {
  return {
    body: req.responseText,
    status: req.status,
    statusText: req.statusText
  };
}

export class BrowserHttpClient implements IHttpClient {
  private _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  async get(url: string, options?: IOptions): Promise<IResponse<string>> {
    return await this.method('GET', url, undefined, options);
  }

  async post(url: string, body?: BodyType, options?: IOptions | undefined): Promise<IResponse<string>> {
    return await this.method('POST', url, body, options);
  }

  method(method: string, url: string, body?: BodyType, options?: IOptions): Promise<IResponse<string>> {
    return new Promise<IResponse<string>>((resolve, reject) => {
      const req = this._container.get<IXMLHttpRequestFactory>("IXMLHttpRequestFactory").create();
      req.responseType = 'text';

      req.addEventListener("load", () => {
        if (req.readyState === 4) {
          try {
            if (req.status >= 200 && req.status < 300) {
              resolve(getResponse(req));
            } else {
              reject(getResponse(req));
            }
          } catch (e) {
            reject(e);
          }
        }
      });
      req.addEventListener("error", () => {
        reject(getResponse(req));
      });
      req.open(method, url, true);

      if (options) {
        if (options.headers) {
          for (let key in options.headers) {
            if (options.headers.hasOwnProperty(key)) {
              req.setRequestHeader(key, options.headers[key])
            }
          }
        }
      }

      req.send(processBody(body));
    });
  }
}