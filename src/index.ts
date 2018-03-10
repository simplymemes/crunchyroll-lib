import container from "./config";
import { IHttpClient } from "./models/http/IHttpClient";
import { Container, ContainerConstructor } from "./utils/container";

export function setHttpClient(HttpClient: ContainerConstructor<IHttpClient>): void {
  container.bind("IHttpClient", HttpClient);
}

export { getMedia, getMediaByUrl } from "./media";