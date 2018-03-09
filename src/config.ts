import { Container } from "./utils/container";
import { MediaResolver } from "./resolvers/MediaResolver";
import { SubtitleResolver } from "./resolvers/SubtitleResolver";
import { BrowserHttpClient } from "./services/http/BrowserHttpClient";

const container = new Container();

container.bind("IHttpClient", BrowserHttpClient);
container.bind("IMediaResolver", MediaResolver);
container.bind("ISubtitleResolver", SubtitleResolver);

export default container;