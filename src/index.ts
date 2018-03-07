import { BrowserHttpClient } from "./services/http/BrowserHttpClient";
import { NodeHttpClient } from "./services/http/NodeHttpClient";
import Container from "./config";
import { IMediaResolver } from "./models/IMediaResolver";

const MediaResolver = Container.get<IMediaResolver>("IMediaResolver");

const run = async () => {
  const media = await MediaResolver
    .getMedia('740239', '106', '60', 'http://www.crunchyroll.com/boruto-naruto-next-generations/episode-17-run-sarada-740239?p360=1');
  
  const subtitles = media.getSubtitles();
  for (let i = 0; i < subtitles.length; i++)  {
    if (subtitles[i].isDefault()) {
      console.log(await subtitles[i].getContentAsString());
      break;
    }
  }
};

run()
.then(undefined, err => console.error(err));