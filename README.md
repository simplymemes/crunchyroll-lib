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

```