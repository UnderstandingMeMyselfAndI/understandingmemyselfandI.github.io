/* eslint-env serviceworker */
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { openDB } from 'idb';

// 1. Caching & Offline Support
// This replaces self.__WB_MANIFEST with the list of files to cache
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// This allows the SPA to work offline by serving index.html for navigation
try {
  const handler = createHandlerBoundToURL('/index.html');
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);
} catch (error) {
  console.error('Navigation route registration failed:', error);
}

// 2. The Daily Image Alarm logic (Background Push)
self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    const data = event.data ? event.data.json() : {};
    const db = await openDB('UmmiApp', 1);
    const allKeys = await db.getAllKeys('content');
    
    if (allKeys.length === 0) return;

    // Daily Rotation logic
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const imageIndex = dayOfYear % allKeys.length;
    
    const imageBlob = await db.get('content', allKeys[imageIndex]);
    const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : null;

    return self.registration.showNotification(data.title || 'Daily Motivation', {
      body: data.body || 'Your daily inspiration is ready.',
      image: imageUrl,
      icon: '/icons/pwa-192x192.png',
      tag: 'daily-alarm',
      data: { url: self.location.origin }
    });
  })());
});

// 3. Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow('/'));
});