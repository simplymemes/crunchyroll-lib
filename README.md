# Chrunchyroll Library
Library to get the media information about a Chrunchyroll video.

## How to use in Node
This library by default will use `XMLHttpRequest`. This can be changed by
setting the HTTP client to `NodeHttpClient`. Remember that this has to be done
in the start of the application before anything else is done with this library.

__Example__
```TypeScript
import { NodeHttpClient } from "./services/http/NodeHttpClient";
import { setHttpClient } from "./index";

// Set the Http client in the start of the application.
setHttpClient(NodeHttpClient);
```

# Examples
## Browser
```TypeScript
import { NodeHttpClient } from "./services/http/NodeHttpClient";
import { getMedia, setHttpClient } from "./index";

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
```