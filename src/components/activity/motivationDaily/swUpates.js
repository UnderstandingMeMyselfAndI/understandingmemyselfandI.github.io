self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}

  // Logic to pick a motivational image from IndexedDB or a URL
  const options = {
    body: 'Your daily motivation is here!',
    image: '/images/motivation_1.jpg', // Or a blob URL from IndexedDB
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: { url: self.location.origin },
  }

  event.waitUntil(self.registration.showNotification('Stay Inspired!', options))
})
