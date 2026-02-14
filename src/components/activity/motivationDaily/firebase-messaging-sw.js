import { openDB } from 'idb'

self.addEventListener('push', (event) => {
  const payload = event.data.json()

  if (payload.data.trigger_local_image) {
    event.waitUntil(
      (async () => {
        // Access IndexedDB to get the image you stored earlier
        const db = await openDB('MotivationApp', 1)
        const imgBlob = await db.get('images', 'daily-image')
        const imgUrl = URL.createObjectURL(imgBlob)

        return self.registration.showNotification('Daily Inspiration', {
          body: 'Tap to see your motivational image!',
          image: imgUrl,
          icon: '/icon.png',
        })
      })(),
    )
  }
})
