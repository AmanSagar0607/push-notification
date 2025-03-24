import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let messaging;
if (typeof window !== 'undefined') {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  messaging = getMessaging(app);

  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered successfully:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// Request Notification Permission
export const requestPermission = async () => {
  try {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications.');
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// Listen for Foreground Messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) {
      console.error('Firebase messaging not initialized.');
      return;
    }

    onMessage(messaging, (payload) => {
      console.log('Foreground Notification Received:', payload);
      resolve(payload);
    });
  });