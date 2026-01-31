const handleSetAlarm = async (selectedTime) => {
  // 1. Request Permission
  const status = await Notification.requestPermission();
  if (status !== 'granted') return;

  // 2. Get Push Subscription
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  // 3. Send subscription & time to your "minimal" backend
  await saveSubscriptionToServer(subscription, selectedTime);
};

import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseConfig";

const scheduleAlarm = async (selectedTime) => {
  const token = await getToken(messaging, { vpaidKey: "YOUR_VAPID_KEY" });
  
  await fetch('https://your-droplet-ip:3001/set-alarm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, time: selectedTime })
  });
};