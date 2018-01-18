import { IHttpClient, BodyType } from "../../models/http/IHttpClient";
import { IOptions } from "../../models/http/IOptions";
import { IResponse } from "../../models/http/IResponse";
import * as request from 'request';

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

function getResponse(req: request.RequestResponse): IResponse<string> {
  return {
    body: req.body as string,
    status: req.statusCode || 0,
    statusText: req.statusMessage || ""
  };
}

export class NodeHttpClient implements IHttpClient {
  get(url: string, options?: IOptions): Promise<IResponse<string>> {
    return this.method('GET', url, undefined, options);
  }
  post(url: string, body?: BodyType, options?: IOptions): Promise<IResponse<string>> {
    return this.method('GET', url, body, options);
  }

  method(method: string, url: string, body?: BodyType, options?: IOptions): Promise<IResponse<string>> {
    return new Promise<IResponse<string>>((resolve, reject) => {
      request({
        'method': method,
        'uri': url,
        'body': processBody(body)
      }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const res = getResponse(response);
          if (response.statusCode === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        }
      });
    });
  }
}