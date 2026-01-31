import { openDB } from 'idb';

const setupImagePool = async (imageUrls) => {
  const db = await openDB('UmmiApp', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('content')) {
        db.createObjectStore('content'); // Create store if it doesn't exist
      }
    },
  });

  // Fetch and store each image as a Blob
  for (let i = 0; i < imageUrls.length; i++) {
    const response = await fetch(imageUrls[i]);
    const blob = await response.blob();
    await db.put('content', blob, `image-${i}`); // Unique keys for rotation
  }
  console.log(`${imageUrls.length} images saved for the month.`);
};