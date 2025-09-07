const CACHE_NAME = 'my-site-cache-v1';
const ASSETS_TO_CACHE = [
	'/', // root
	'/index.html',
	'/manifest.json',
	'/icons/icon-192.png',
	'/icons/icon-512.png',
	// add your CSS/JS files here
];

// Install event: cache app shell
self.addEventListener('install', (event) => {
	console.log('[ServiceWorker] Install');
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('[ServiceWorker] Pre-caching offline assets');
			return cache.addAll(ASSETS_TO_CACHE);
		})
	);
	self.skipWaiting();
});

// Activate event: cleanup old caches
self.addEventListener('activate', (event) => {
	console.log('[ServiceWorker] Activate');
	event.waitUntil(
		caches.keys().then((keyList) =>
			Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						console.log('[ServiceWorker] Removing old cache:', key);
						return caches.delete(key);
					}
				})
			)
		)
	);
	self.clients.claim();
});

// Fetch event: serve cached content first, fallback to network
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return (
				response ||
				fetch(event.request).catch(
					() => caches.match('/index.html') // fallback if offline
				)
			);
		})
	);
});
