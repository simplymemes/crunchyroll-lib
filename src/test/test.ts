import { NodeHttpClient } from "../services/http/NodeHttpClient";
import { getMedia, setHttpClient } from "../index";

// Set the Http client to Node
setHttpClient(NodeHttpClient);

const run = async () => {
  const media = await getMedia('740239', '360p', 'http://www.crunchyroll.com/boruto-naruto-next-generations/episode-17-run-sarada-740239?p360=1');
  
  const subtitles = media.getSubtitles();
  console.log("name, author, default");
  for (let i = 0; i < subtitles.length; i++)  {
    console.log(subtitles[i].getTitle() + ", " + subtitles[i].getAuthor() + ", " + (subtitles[i].isDefault() ? "true" : "false"));
  }
};

run()
.then(undefined, err => console.error(err));