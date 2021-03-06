import { NodeHttpClient } from "../src/services/http/NodeHttpClient";
import { getMedia, setHttpClient } from "../src/index";

// Set the Http client to Node
setHttpClient(NodeHttpClient);

const run = async () => {
  const media = await getMedia('740239', '360p', 'http://www.crunchyroll.com/boruto-naruto-next-generations/episode-17-run-sarada-740239?p360=1');
  
  const subtitles = media.getSubtitles();
  console.log("name, author, default");
  for (let i = 0; i < subtitles.length; i++)  {
    const content = await subtitles[i].getContent();
    console.log({
      id: content.id,
      title: content.title,
      locale: content.locale,
      localeString: content.localeString
    });
    console.log(subtitles[i].getTitle() + ", " + subtitles[i].getAuthor() + ", " + (subtitles[i].isDefault() ? "true" : "false"));
  }
};

run()
.then(undefined, err => console.error(err));