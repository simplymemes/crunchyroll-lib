import { Container } from "./utils/container";
import { MediaResolver } from "./resolvers/MediaResolver";
import { SubtitleResolver } from "./resolvers/SubtitleResolver";
import { BrowserHttpClient } from "./services/http/BrowserHttpClient";
import { XMLHttpRequestFactory } from "./services/http/XMLHttpRequestFactory";

const container = new Container();

container.bind("IXMLHttpRequestFactory", XMLHttpRequestFactory);
container.bind("IHttpClient", BrowserHttpClient);
container.bind("IMediaResolver", MediaResolver);
container.bind("ISubtitleResolver", SubtitleResolver);

export default container;