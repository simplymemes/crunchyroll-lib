import { IConfig } from "./models/IConfig";
import { BrowserHttpClient } from "./services/http/BrowserHttpClient";
import { NodeHttpClient } from "./services/http/NodeHttpClient";
import { StreamResolver } from "./resolvers/StreamResolver";

const config: IConfig = {};

config.HttpClient = new NodeHttpClient();
config.StreamResolver = new StreamResolver(config);

export function setConfig<K extends keyof IConfig>(name: K, value: IConfig[K]) {
  config[name] = value;
}

config.StreamResolver
  .getStream('740239', '106', '60', 'http://www.crunchyroll.com/boruto-naruto-next-generations/episode-17-run-sarada-740239?p360=1')
  .then(console.log.bind(console), console.error.bind(console));