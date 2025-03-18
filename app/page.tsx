'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ripple } from '@/components/Ripple';

const NOTIFICATION_MESSAGES = [
  { title: "Likes", body: "8 new likes!" },
  { title: "WhatsApp", body: "New message!" },
  { title: "Instagram", body: "You got tagged!" },
  { title: "Twitter", body: "12 retweets!" },
  { title: "Email", body: "3 unread mails!" },
  { title: "LinkedIn", body: "5 profile views!" },
  { title: "YouTube", body: "New video!" },
  { title: "Facebook", body: "New request!" },
  { title: "Reminder", body: "Meeting at 3 PM!" },
  { title: "Weather", body: "Rain expected!" }
];

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<{ title: string; body: string } | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  // ✅ Check if the PWA is installable
  const isPWAInstallable = () => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    );
  };

  // ✅ Capture `beforeinstallprompt` event and store it
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault(); // Prevent default browser prompt
      setInstallPromptEvent(event); // Store the event for later use
      setShowInstallPrompt(true); // Show the install banner
      localStorage.setItem('installPromptEvent', 'true'); // Store in localStorage
    };

    // Only add the event listener if the PWA is not already installed
    if (!isPWAInstallable()) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    // Check localStorage on page load
    const shouldShowPrompt = localStorage.getItem('installPromptEvent');
    if (shouldShowPrompt && !isPWAInstallable()) {
      setShowInstallPrompt(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // ✅ Function to manually trigger PWA install
  const handleInstallPWA = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt(); // Show native install prompt

      // Set timeout to automatically hide the banner after 5 seconds
      const hideTimeout = setTimeout(() => {
        setShowInstallPrompt(false); // Hide the banner
        setInstallPromptEvent(null);
        localStorage.removeItem('installPromptEvent'); // Remove from localStorage
      }, 5000);

      installPromptEvent.userChoice.then((choiceResult: any) => {
        // Clear the timeout if the user responds before 5 seconds
        clearTimeout(hideTimeout);

        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installed');
        }
        setShowInstallPrompt(false); // Hide the banner
        setInstallPromptEvent(null);
        localStorage.removeItem('installPromptEvent'); // Remove from localStorage
      });
    }
  };

  // ✅ Auto-dismiss banner after 5 seconds
  useEffect(() => {
    if (showInstallPrompt) {
      const timeout = setTimeout(() => {
        setShowInstallPrompt(false);
        localStorage.removeItem('installPromptEvent'); // Remove from localStorage
      }, 5000); // Dismiss after 5 seconds
      return () => clearTimeout(timeout);
    }
  }, [showInstallPrompt]);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const getRandomNotification = () => {
    return NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
  };

  const handleNotification = () => {
    const notification = getRandomNotification();
    setCurrentNotification(notification);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000); // Hide after 5 sec
  };

  return (
<main className="min-h-[100vh] flex flex-col items-center justify-center w-full bg-gradient-to-b from-[#2C2143] to-[#000000] text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center min-h-[100vh]">
        <motion.h1
          key="title"
          className="text-lg sm:text-lg mb-8 sm:mb-6 lg:mt-0 -mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hola!
        </motion.h1>

        {/* Notification Bell with Red Dot & Smooth Shake */}
        <div className="relative w-full max-w-[300px] sm:max-w-[380px] aspect-square mb-24">
          <Ripple showNotification={showNotification} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="relative"
              animate={showNotification ? {
                rotate: [0, -5, 5, -3, 3, 0],
                scale: [1, 1.1, 1],
                transition: { duration: 0.5 }
              } : {}}
            >
              <Bell className="w-20 h-20 sm:w-18 sm:h-18 text-white border-blue-500" />
              <AnimatePresence>
                {showNotification && (
                  <motion.div
                    key="notification-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <motion.div
          key="text-section"
          className="text-center mb-4 sm:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl sm:text-[22px] font-bold mb-3">Lorem ipsum...</h2>
          <p className="text-sm sm:text-[16px] text-gray-400 mb-8 sm:mb-10">Lorem ipsum dolor sit amet.</p>
        </motion.div>

        <motion.div
          key="button-section"
          className="w-full max-w-md flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-center items-center w-full mb-4">
            <Button
              onClick={handleNotification}
              className="px-24 py-6 sm:px-24 sm:py-6 sm:text-lg text-white bg-[#1A0B33] border-2 border-[#6434ce] rounded-xl transition-all duration-300 hover:bg-[#2A1055] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#6A35FF]"
            >
              Send Notification
            </Button>
          </div>
        </motion.div>
      </div>

      {/* 🔔 Notification Toast (Top-Left) - Responsive */}
      <AnimatePresence>
        {showNotification && currentNotification && (
          <motion.div
            key="notification-toast"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-6 left-4 sm:left-6 bg-[#2A1C45] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm sm:text-base max-w-[90vw] sm:max-w-[320px] md:max-w-[400px]"
          >
            <Bell className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">{currentNotification.title}</span>
            <span className="text-gray-300">{truncateText(currentNotification.body, 10)}</span>
            <button
              onClick={() => setShowNotification(false)}
              className="text-white hover:text-gray-300 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📢 PWA Install Banner - Top Center */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            key="install-prompt"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 center-0 -translate-x-1/2 bg-[#3e305c] text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 sm:gap-6 text-sm sm:text-base max-w-[90vw] sm:max-w-[400px] backdrop-blur-sm border border-[#6A35FF]/20"
          >
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-[#9472d7]" />
              <p className="font-semibold">Install App</p>
            </div>
            <button
              onClick={handleInstallPWA}
              className="px-4 py-2 bg-[#5e488b] hover:bg-[#785bb1] text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6A35FF] focus:ring-offset-2"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}