/* eslint-env serviceworker */
// 1. DISABLE WORKBOX LOGS HERE (Must be before imports)
self.__WB_DISABLE_DEV_LOGS = true
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
// 1. Import setConfig
import { ExpirationPlugin } from 'workbox-expiration' // <--- Optional: limits cache size
import { openDB } from 'idb'

// Disable debug logs

// Caching & Offline Support

precacheAndRoute(self.__WB_MANIFEST)
//  uses these globpatterns in vite config for assets injectManifest: {
//         // This is crucial for offline support and background images
//         globPatterns: ['index.html', '**/*.{js,css}'],
//         globIgnores: ['**/dev/**'],
//       },
cleanupOutdatedCaches()

// Catch-all navigation handler
const navigationHandler = async ({ event }) => {
  // Use matchPrecache to find the version of index.html Vite injected
  const response = await matchPrecache('/index.html')
  return response || fetch(event.request)
}

// Handle images (bgs, icons) that are not precached
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)
// Simplified Catch-All Navigation
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    try {
      // Attempt to serve the precached index.html
      const precachedResponse = await matchPrecache('/index.html')
      if (precachedResponse) {
        return precachedResponse
      }
      // Fallback to network if precache fails
      return await fetch(event.request)
    } catch (error) {
      // Final fallback to the network for the specific request
      return fetch(event.request)
    }
  },
)

// Register the route for all navigation requests
const navigationRoute = new NavigationRoute(navigationHandler)
registerRoute(navigationRoute)

// This allows the SPA to work offline by serving index.html for navigation
try {
  const handler = createHandlerBoundToURL('/index.html')
  const navigationRoute = new NavigationRoute(handler)
  registerRoute(navigationRoute)
} catch (error) {
  // console.warn('Navigation route registration failed (this is normal in development if index.html is not precached):', error);
}

// 2. The Daily Image Alarm logic (Background Push)
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

// 3. Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('/'))
})
