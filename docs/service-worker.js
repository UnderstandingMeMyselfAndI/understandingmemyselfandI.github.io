// service-worker.js
const SW_VERSION = 2;
const IDB_VERSION = 1;

const cacheName = `web-app-cache-${SW_VERSION}`;

const staticFiles = [

  "/index.html",
  "/manifest.json",
  "/icons/UmmiIcons.svg",
  "/icons/apple-touch-icon-180x180.png",
  "/icons/maskable-icon-512x512.png",
  "/icons/pwa-192x192.png",
  "/icons/pwa-512x512.png",
  "/icons/QRCodes/qr-code-src-app-white-318.png",
  "/icons/QRCodes/qr-code-src-app-dark-318.png",
  "/fonts/PlusJakartaSans-VariableFont_wght.woff",
  "/fonts/PlusJakartaSans-Italic-VariableFont_wght.woff",
  "/bgs/1.avif",
  "/bgs/2.avif",
  "/bgs/3.avif",
  "/bgs/4.avif",
  "/bgs/5.avif",
];

const routes = ["/"];

const filesToCache = [...routes, ...staticFiles];

const requestsToRetryWhenOffline = [];

const IDBConfig = {
  name: "web-app-db",
  version: IDB_VERSION,
  stores: {
    requestStore: {
      name: "request-store",
      keyPath: "timestamp",
    },
  },
};

const isRequestEligibleForRetry = ({ url, method }) => {
  return ["POST", "PUT", "DELETE"].includes(method) || requestsToRetryWhenOffline.includes(url);
};

// IndexedDB helpers (unchanged, but solid)
const createIndexedDB = ({ name, stores }) => { /* ... same ... */ };
const getStoreFactory = (dbName) => ({ name }, mode = "readonly") => { /* ... same ... */ };
const openStore = getStoreFactory(IDBConfig.name);

const serializeHeaders = (headers) => [...headers.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

const storeRequest = async (request) => {
  const { url, method, headers, mode, credentials } = request;
  let body = null;

  if (request.body) {
    try {
      // Clone to avoid consuming the original stream
      const cloned = request.clone();
      body = await cloned.arrayBuffer();
    } catch (e) {
      console.error("Failed to read request body for storage", e);
    }
  }

  const serializedHeaders = serializeHeaders(headers);
  const timestamp = Date.now();

  try {
    const store = await openStore(IDBConfig.stores.requestStore, "readwrite");
    await store.add({
      timestamp,
      url,
      method,
      body,
      headers: serializedHeaders,
      mode,
      credentials,
    });

    if ("sync" in self.registration) {
      await self.registration.sync.register("retry-request");
    }
  } catch (error) {
    console.error("Failed to store request in IDB", error);
  }
};

const getRequests = async () => {
  try {
    const store = await openStore(IDBConfig.stores.requestStore, "readonly");
    return await store.getAll();
  } catch (err) {
    console.error("Failed to get requests", err);
    return [];
  }
};

const retryRequests = async () => {
  const reqs = await getRequests();

  const requests = reqs.map(({ url, method, headers, body, mode, credentials }) => {
    const init = {
      method,
      headers: new Headers(headers),
      mode,
      credentials,
      body: body || undefined,
    };
    return fetch(url, init);
  });

  const results = await Promise.allSettled(requests);
  const store = await openStore(IDBConfig.stores.requestStore, "readwrite");

  results.forEach(async (result, i) => {
    if (result.status === "fulfilled") {
      await store.delete(reqs[i].timestamp);
    } else {
      console.error("Retry failed", result.reason);
    }
  });
};

// Install: Remove unnecessary no-cache
const installHandler = (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then((cache) => Promise.all([
        cache.addAll(filesToCache),  // Direct URLs – uses normal caching
        createIndexedDB(IDBConfig)
      ]))
      .catch((err) => console.error("Install error", err))
  );
};

// Activate: Clean old caches
const activateHandler = (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key)))
    )
  );
};

// Fetch: Cache-first + runtime caching + better offline handling
const fetchHandler = async (e) => {
  const { request } = e;

  e.respondWith(
    (async () => {
      // Special handling for mutable requests when offline
      if (!navigator.onLine && isRequestEligibleForRetry(request)) {
        await storeRequest(request);
        return (await caches.match("/index.html")) || new Response("Offline – request queued", { status: 503 });
      }

      // Try cache first
      let response = await caches.match(request, { ignoreSearch: true });
      if (response) return response;

      // Network
      try {
        const networkResponse = await fetch(request);
        
        // Cache successful opaque/200 responses (runtime caching)
        if (networkResponse && (networkResponse.type === "basic" || networkResponse.type === "cors") && networkResponse.status === 200) {
          const cache = await caches.open(cacheName);
          cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch (err) {
        // General offline/network error fallback
        const offlineResponse = await caches.match("/index.html");
        if (offlineResponse) return offlineResponse;
        
        return new Response("Offline", { status: 503 });
      }
    })()
  );
};

// Message & Sync handlers (unchanged, but remove PREPARE_CACHES_FOR_UPDATE if unused)
const messageHandler = async ({ data }) => {
  const { type } = data;
  switch (type) {
    case "SKIP_WAITING":
      await self.skipWaiting();
      await self.clients.claim();
      break;
    case "retry-requests":
      if (!("sync" in self.registration)) await retryRequests();
      break;
    // Removed PREPARE_CACHES_FOR_UPDATE – not needed
  }
};

const syncHandler = async (e) => {
  if (e.tag === "retry-request") {
    e.waitUntil(retryRequests());
  }
};

self.addEventListener("install", installHandler);
self.addEventListener("activate", activateHandler);
self.addEventListener("fetch", fetchHandler);
self.addEventListener("message", (e) => e.waitUntil(messageHandler(e)));
self.addEventListener("sync", syncHandler);