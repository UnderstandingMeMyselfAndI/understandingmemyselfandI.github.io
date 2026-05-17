// Migration service worker – redirects everything to the new PWA domain
const NEW_DOMAIN = 'https://app.ummi.now';

self.addEventListener('install', () => {
  // Activate immediately, don't wait for other tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      // Grab every open window of this origin and redirect them
      return self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          // Only redirect if not already on the new domain (safety)
          if (!client.url.startsWith(NEW_DOMAIN)) {
            client.navigate(NEW_DOMAIN);
          }
        });
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept any page load (navigation) on the old domain...
  if (event.request.mode === 'navigate' && url.hostname === self.location.hostname) {
    event.respondWith(Response.redirect(NEW_DOMAIN, 302));
    return;
  }

  // ...for everything else, go straight to the network.
  event.respondWith(fetch(event.request));
});