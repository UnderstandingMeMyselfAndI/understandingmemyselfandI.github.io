/* eslint-env serviceworker */
// DISABLE WORKBOX LOGS HERE (Must be before imports)
self.__WB_DISABLE_DEV_LOGS = true
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL, matchPrecache } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
// 1. Import setConfig
import { ExpirationPlugin } from 'workbox-expiration' // <--- Optional: limits cache size
import { openDB } from 'idb'

// Caching & Offline Support
const IMAGE_CACHE_NAME  = `ummi-images-${__BUILD_VERSION__}`;

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// Catch-all navigation handler
const navigationHandler = async ({ event }) => {
  // Use matchPrecache to find the version of index.html Vite injected
  const response = await matchPrecache('/index.html')
  return response || fetch(event.request)
}

// Handle images 
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: IMAGE_CACHE_NAME ,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('ummi-images-') && key !== IMAGE_CACHE_NAME )
          .map((key) => caches.delete(key))
      );
    })
  );
});
// Simplified Catch-All Navigation
registerRoute(
  ({ request }) => request.mode === 'navigate',
  navigationHandler
)


// The Daily Image Alarm logic (Background Push)
self.addEventListener('push', (event) => {
  event.waitUntil(
    (async () => {
      const data = event.data ? event.data.json() : {}
      const db = await openDB('UmmiApp', 1)
      const allKeys = await db.getAllKeys('content')

      if (allKeys.length === 0) return

      // Daily Rotation logic
      const now = new Date()
      const dayOfYear = Math.floor(
        (now - new Date(now.getFullYear(), 0, 0)) / 86400000,
      )
      const imageIndex = dayOfYear % allKeys.length

      const imageBlob = await db.get('content', allKeys[imageIndex])
      const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : null

      return self.registration.showNotification(
        data.title || 'Daily Motivation',
        {
          body: data.body || 'Your daily inspiration is ready.',
          image: imageUrl,
          icon: '/icons/pwa-192x192.png',
          tag: 'daily-alarm',
          data: { url: self.location.origin },
        },
      )
    })(),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('/'))
})


self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});