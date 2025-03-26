importScripts('https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDM4nJvQzpC9v77B4Gllbv9-zbZAT1Yg0c",
  authDomain: "push-notification-1edfe.firebaseapp.com",
  projectId: "push-notification-1edfe",
  storageBucket: "push-notification-1edfe.firebasestorage.app",
  messagingSenderId: "972940484587",
  appId: "1:972940484587:web:b677ea6e83e04580c183ae",
  measurementId: "G-K54W145Z1F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle Background Notification
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message!',
    icon: payload.notification?.image || '/icon192.png',
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const actionUrl = event.notification?.data?.click_action;
  if (actionUrl) {
    event.waitUntil(clients.openWindow(actionUrl));
  }
});

self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event);
});