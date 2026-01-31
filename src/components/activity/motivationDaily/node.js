/* Droplet Server: server.js */
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendDailyAlarm(userToken) {
  const message = {
    // 'data' payload wakes up the Service Worker in the background
    data: {
      title: "Ummi Daily Inspiration",
      body: "Tap to see your motivational image for today!",
      wake_up: "true"
    },
    token: userToken,
    // Android-specific settings for high priority
    android: {
      priority: 'high',
    },
    // iOS-specific settings to wake the background worker
    apns: {
      payload: {
        aps: {
          contentAvailable: true, // Crucial for waking iOS background
        },
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.log('Error sending message:', error);
  }
}