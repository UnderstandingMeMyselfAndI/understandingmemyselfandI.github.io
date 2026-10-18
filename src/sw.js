// eslint-env serviceworker
self.__WB_DISABLE_DEV_LOGS = true
import { precacheAndRoute, cleanupOutdatedCaches, matchPrecache } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { openDB } from 'idb'

const BUILD_VERSION = typeof __BUILD_VERSION__ !== 'undefined' ? __BUILD_VERSION__ : `dev-${Date.now()}`
const IMAGE_CACHE_NAME = `ummi-images-${BUILD_VERSION}`
const CHUNK_CACHE_NAME = `ummi-chunks-${BUILD_VERSION}`

// Precache every asset in dist/ (including lazy JS chunks, if configured
// correctly in vite.config — see notes below).
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// ---- Navigation fallback -------------------------------------------------
// Every navigation request returns the cached SPA shell, which then lets the
// client router resolve the correct activity. If index.html isn't in the
// precache (should not happen) or we're offline with no cache, return a
// real response instead of letting fetch() reject.

const OFFLINE_HTML =
  '<!doctype html><meta charset="utf-8"><title>Offline</title>' +
  '<style>body{font-family:system-ui;padding:2rem;text-align:center;color:#333}</style>' +
  '<h1>You are offline</h1><p>Please reconnect to load this page.</p>'

const navigationHandler = async ({ event }) => {
  const cached = await matchPrecache('index.html')
  if (cached) return cached
  try {
    return await fetch(event.request)
  } catch {
    return new Response(OFFLINE_HTML, {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }
}

registerRoute(({ request }) => request.mode === 'navigate', navigationHandler)

// ---- Runtime safety net for JS/CSS ---------------------------------------
// Precache should cover every chunk, but if a chunk ever misses the manifest
// (e.g. fetched before the SW installed), this catches it. On the next visit
// the SW precache takes precedence again, so this only matters for the first
// offline load after an update.

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: CHUNK_CACHE_NAME,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
)

// ---- Images --------------------------------------------------------------

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: IMAGE_CACHE_NAME,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
)

// ---- Cleanup old custom caches -------------------------------------------

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                (key.startsWith('ummi-images-') && key !== IMAGE_CACHE_NAME) ||
                (key.startsWith('ummi-chunks-') && key !== CHUNK_CACHE_NAME),
            )
            .map((key) => caches.delete(key)),
        ),
      ),
  )
})

// ---- Push notifications (unchanged) -------------------------------------

self.addEventListener('push', (event) => {
  event.waitUntil(
    (async () => {
      const data = event.data ? event.data.json() : {}
      const db = await openDB('UmmiApp', 1)
      const allKeys = await db.getAllKeys('content')
      if (allKeys.length === 0) return

      const now = new Date()
      const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
      const imageIndex = dayOfYear % allKeys.length

      const imageBlob = await db.get('content', allKeys[imageIndex])
      const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : null

      return self.registration.showNotification(data.title || 'Daily Motivation', {
        body: data.body || 'Your daily inspiration is ready.',
        image: imageUrl,
        icon: '/icons/pwa-192x192.png',
        tag: 'daily-alarm',
        data: { url: self.location.origin },
      })
    })(),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('/'))
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
