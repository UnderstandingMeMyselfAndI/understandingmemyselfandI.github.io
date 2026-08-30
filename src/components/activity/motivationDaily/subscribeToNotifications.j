import { getToken } from "firebase/messaging";
import { messaging } from "@firebaseConfig"; // You'll need to set this up

const subscribeToNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { 
        vapidKey: 'YOUR_FIREBASE_PUBLIC_VAPID_KEY' 
      });
      
      // Send this to your DigitalOcean Droplet
      await fetch('https://your-droplet-domain.com/set-alarm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token, 
          time: '08:00' // Or whatever the user selected
        })
      });
    }
  } catch (error) {
    console.error("Subscription failed", error);
  }
};