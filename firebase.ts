import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM4nJvQzpC9v77B4Gllbv9-zbZAT1Yg0c",
  authDomain: "push-notification-1edfe.firebaseapp.com",
  projectId: "push-notification-1edfe",
  storageBucket: "push-notification-1edfe.firebasestorage.app",
  messagingSenderId: "972940484587",
  appId: "1:972940484587:web:b677ea6e83e04580c183ae",
  measurementId: "G-K54W145Z1F"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
