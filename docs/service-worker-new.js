// service-worker.js
const SW_VERSION = 2;
const IDB_VERSION = 1;

const cacheName = `web-app-cache-${SW_VERSION}`;

const staticFiles = [

  "/index.html",
  "/offline.html",
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
const createIndexedDB = ({ name, stores }) => {
	const request = self.indexedDB.open(name, 1)

	return new Promise((resolve, reject) => {
		request.onupgradeneeded = (e) => {
			const db = e.target.result

			Object.keys(stores).forEach((store) => {
				const { name, keyPath } = stores[store]

				if (!db.objectStoreNames.contains(name)) {
					db.createObjectStore(name, { keyPath })
					console.log('create objectstore', name)
				}
			})
		}

		request.onsuccess = () => resolve(request.result)
		request.onerror = () => reject(request.error)
	})
}

const getStoreFactory =
	(dbName) =>
	({ name }, mode = 'readonly') => {
		return new Promise((resolve, reject) => {
			const request = self.indexedDB.open(dbName, IDB_VERSION)

			request.onsuccess = (e) => {
				const db = request.result
				const transaction = db.transaction(name, mode)
				const store = transaction.objectStore(name)

				// return a proxy object for the IDBObjectStore, allowing for promise-based access to methods
				const storeProxy = new Proxy(store, {
					get(target, prop) {
						if (typeof target[prop] === 'function') {
							return (...args) =>
								new Promise((resolve, reject) => {
									const req = target[prop].apply(target, args)

									req.onsuccess = () => resolve(req.result)
									req.onerror = (err) => reject(err)
								})
						}

						return target[prop]
					},
				})

				return resolve(storeProxy)
			}

			request.onerror = (e) => reject(request.error)
		})
	}


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
  const url = new URL(request.url);

  // Detect if this is a page navigation (critical for SPA routing)
  const isNavigationRequest =
    request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");

  e.respondWith(
    (async () => {
      // 1. Offline + mutable request → queue it and show offline page
      if (!navigator.onLine && isRequestEligibleForRetry(request)) {
        await storeRequest(request.clone());

        const offlinePage = await caches.match("/offline.html");
        if (offlinePage) return offlinePage;

        return new Response("You are offline – your changes will sync later.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      }

      // 2. Try network first (recommended for Vite apps with hashed assets)
      try {
        const networkResponse = await fetch(request);

        // Cache successful responses for future offline use
        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(cacheName);
          // Clone before putting because the body can only be read once
          cache.put(request, networkResponse.clone());
        }

        return networkResponse;

      } catch (networkError) {
        // 3. Network failed → try cache
        const cachedResponse = await caches.match(request, { ignoreSearch: true });
        if (cachedResponse) {
          return cachedResponse;
        }

        // 4. Special fallback for page navigation (refresh or deep links)
        if (isNavigationRequest) {
          const shellResponse = await caches.match("/index.html");
          if (shellResponse) {
            return shellResponse; // Let client-side router handle the route
          }
        }

        // 5. Final fallback: dedicated offline page
        const offlinePage = await caches.match("/offline.html");
        if (offlinePage) {
          return offlinePage;
        }

        // Absolute last resort
        return new Response("No connection and no cached page available.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      }
    })()
  );
};
// const fetchHandler = async (e) => {
//   const { request } = e;

//   // Detect navigation requests (HTML pages)
//   const isNavigation = request.mode === 'navigate' || 
//                        (request.headers.get('accept') || '').includes('text/html');

//   e.respondWith(
//     (async () => {
//       // Offline mutable requests: queue and show fallback
//       if (!navigator.onLine && isRequestEligibleForRetry(request)) {
//         await storeRequest(request);
//         const offlineResp = await caches.match('/offline.html');
//         return offlineResp || new Response('Offline – request queued', { status: 503 });
//       }

//       try {
//         // Try network first for better freshness (or cache-first if you prefer)
//         const networkResponse = await fetch(request);

//         // Runtime cache successful responses (optional but recommended)
//         if (networkResponse && networkResponse.status === 200) {
//           const cache = await caches.open(cacheName);
//           cache.put(request, networkResponse.clone());
//         }

//         return networkResponse;

//       } catch (err) {
//         // Network failed → try cache
//         const cached = await caches.match(request, { ignoreSearch: true });
//         if (cached) return cached;

//         // Special fallback for navigation requests (SPA routing!)
//         if (isNavigation) {
//           const fallback = await caches.match('/index.html');
//           if (fallback) return fallback;
//         }

//         // General fallback (create /offline.html and cache it!)
//         const offlineResp = await caches.match('/offline.html');
//         return offlineResp || new Response('Offline – no connection', { status: 503 });
//       }
//     })()
//   );
// };
// Message handler for postMessage communication from clients
const messageHandler = async (event) => {
  const { data } = event;

  if (!data || !data.type) return;

  switch (data.type) {
    case "SKIP_WAITING":
      // Allow immediate update when client asks
      await self.skipWaiting();
      await self.clients.claim();
      break;

    case "retry-requests":
      // Manual retry for browsers without Background Sync
      if (!("sync" in self.registration)) {
        await retryRequests();
      }
      break;

    // You can add more message types here if needed
    default:
      console.log("Unknown message type:", data.type);
  }
};
const syncHandler = async (e) => {
  if (e.tag === "retry-request") {
    e.waitUntil(retryRequests());
  }
};

// Now attach the listeners (this must come AFTER the function is defined)
self.addEventListener("message", messageHandler);

self.addEventListener("install", installHandler);
self.addEventListener("activate", activateHandler);
self.addEventListener("fetch", fetchHandler);
self.addEventListener("sync", syncHandler);

self.addEventListener("install", installHandler);
self.addEventListener("activate", activateHandler);
self.addEventListener("fetch", fetchHandler);
self.addEventListener("message", (e) => e.waitUntil(messageHandler(e)));
self.addEventListener("sync", syncHandler);