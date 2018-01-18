import { IOptions } from "./IOptions";
import { IResponse } from "./IResponse";

export type BodyType = string|{[key: string]: string|number};

export interface IHttpClient {
  method(method: 'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'CONNECT'|'OPTIONS'|'PATCH', url: string, body?: BodyType, options?: IOptions): Promise<IResponse<string>>;

  get(url: string, options?: IOptions): Promise<IResponse<string>>;
  post(url: string, body?: BodyType, options?: IOptions): Promise<IResponse<string>>;
}