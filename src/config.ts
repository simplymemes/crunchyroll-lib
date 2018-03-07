import { Container } from "./utils/container";
import { NodeHttpClient } from "./services/http/NodeHttpClient";
import { MediaResolver } from "./resolvers/MediaResolver";
import { SubtitleResolver } from "./resolvers/SubtitleResolver";

const container = new Container();

container.bind("IHttpClient", NodeHttpClient);
container.bind("IMediaResolver", MediaResolver);
container.bind("ISubtitleResolver", SubtitleResolver);

export default container;