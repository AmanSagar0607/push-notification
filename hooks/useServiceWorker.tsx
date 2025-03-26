'use client';

import { useEffect } from 'react';

export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js', {
          scope: '/',
          updateViaCache: 'none'
        })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
          // Request permission for notifications
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('Notification permission granted');
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    } else {
      console.warn('Service Workers are not supported in this browser.');
    }
  }, []);
}