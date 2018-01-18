import { IHttpClient } from "./http/IHttpClient";
import { IStreamResolver } from "./IStreamResolver";

export interface IConfig {
  HttpClient?: IHttpClient;
  StreamResolver?: IStreamResolver;
}