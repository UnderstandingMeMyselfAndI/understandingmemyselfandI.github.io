import { getMessaging, getToken } from 'firebase/messaging'
import { messaging } from './firebase-config' // Your initialized Firebase app

const registerUserAlarm = async (alarmTime) => {
  try {
    // 1. Request Browser Permission
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      alert('Permission denied. Notifications are required for alarms.')
      return
    }

    // 2. Get FCM Registration Token
    // VAPID key is found in Firebase Console > Project Settings > Cloud Messaging
    const currentToken = await getToken(messaging, {
      vapidKey: 'YOUR_PUBLIC_VAPID_KEY',
    })

    if (currentToken) {
      // 3. Send Token and Time to your DigitalOcean Droplet
      const response = await fetch(
        'https://your-droplet-domain.com/set-alarm',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: currentToken,
            time: alarmTime, // Format "HH:mm"
          }),
        },
      )

      if (response.ok) console.log('Alarm successfully synced to server.')
    } else {
      console.warn('No registration token available. Check your VAPID key.')
    }
  } catch (err) {
    console.error('An error occurred while setting the alarm:', err)
  }
}
