// hooks/useInstallPrompt.tsx
'use client';

import { useEffect, useState } from "react";

export function useInstallPrompt() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  // Check if the PWA is installable
  const isPWAInstallable = () => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    );
  };

  // Capture beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
      setShowInstallPrompt(true);
      localStorage.setItem('installPromptEvent', 'true');
    };

    if (!isPWAInstallable()) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    const shouldShowPrompt = localStorage.getItem('installPromptEvent');
    if (shouldShowPrompt && !isPWAInstallable()) {
      setShowInstallPrompt(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Function to manually trigger PWA install
  const handleInstallPWA = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();

      const hideTimeout = setTimeout(() => {
        setShowInstallPrompt(false);
        setInstallPromptEvent(null);
        localStorage.removeItem('installPromptEvent');
      }, 5000);

      installPromptEvent.userChoice.then((choiceResult: any) => {
        clearTimeout(hideTimeout);

        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installed');
        }
        setShowInstallPrompt(false);
        setInstallPromptEvent(null);
        localStorage.removeItem('installPromptEvent');
      });
    }
  };

  // Auto-dismiss banner
  useEffect(() => {
    if (showInstallPrompt) {
      const timeout = setTimeout(() => {
        setShowInstallPrompt(false);
        localStorage.removeItem('installPromptEvent');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showInstallPrompt]);

  return {
    showInstallPrompt,
    handleInstallPWA,
    setShowInstallPrompt // Add this line
  };
}