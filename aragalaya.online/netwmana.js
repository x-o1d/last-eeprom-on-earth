let connected = false;
let incomingCount = 0;

const postToWindow = async (type, payload) => {
  const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) {
      client.postMessage({
        type: type,
        data: payload,
      });
    }
}

const stream = new ReadableStream({
  start(controller) {
    for(let i=0; i<200;i++) {
      const array = new Uint8Array(12);
      [4,7,0,1,6,4,4,3,6,7,0,5].forEach((e,i) => {
        array[i] = e;
      });
      controller.enqueue(array);
    }
    controller.close();
  },
  pull(controller) {
  },
  cancel() {
  },
});

self.addEventListener('fetch', async event => {
  connected = (incomingCount > 0) && (incomingCount < 5);
  postToWindow('connected', connected);
  postToWindow('log', connected);
  const url = new URL(event.request.url);
  if (!url.pathname.includes('.matrix')) {
    return; // let browser handle it normally
  }
  postToWindow('log', '.matrix request received ' + incomingCount);
  incomingCount++;
  if(connected) {
    event.respondWith(
      fetch(event.request)
      .then((v) => {
        postToWindow('log', 'successful network fetch');
        return v;
      })
      .catch( () => {
        postToWindow('log', '.caught in connected ');
        caches.match(url).then((cachedResponse) => {
          if(cachedResponse) {
            postToWindow('log', 'returned from cache ');
            return cachedResponse;
          } else {
            postToWindow('log', 'returning stream ');
            return new Response(stream, {
              headers: { "Content-Type": "application/octet-stream" }
            });
          }
        })
      })
    );
  } else {
    postToWindow('log', '!connected returning stream');
    postToWindow('log', ' ');
    event.respondWith(new Response(stream, {
      headers: { "Content-Type": "application/octet-stream" }
    }));
  }
  
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'switch-matrix') {
    incomingCount = 0;
    postToWindow('connected', connected);
  }
});

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
    postToWindow('log', 'installed');
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
    postToWindow('log', 'activated');
    incomingCount = 0;
});