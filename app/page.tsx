'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ripple } from '@/components/Ripple';
import { requestPermission } from '../lib/firebase';

const NOTIFICATION_MESSAGES = [
  { title: "Thank you", body: "Message sent successfully!" },
  { title: "Success", body: "Notification delivered!" },
  { title: "Confirmation", body: "Your message is on its way!" },
  { title: "Update", body: "Notification sent!" },
  { title: "Status", body: "Message processed successfully!" }
];

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<{ title: string; body: string } | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('Not subscribed');
  const [token, setToken] = useState('');

  useEffect(() => {
    const handlePermission = async () => {
      try {
        const token = await requestPermission();
        if (token) {
          setToken(token);
          setSubscriptionStatus('Subscribed');
        } else {
          setSubscriptionStatus('Permission denied');
        }
      } catch (error) {
        console.error('Error:', error);
        setSubscriptionStatus('Error');
      }
    };

    handlePermission();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const getRandomNotification = () => {
    return NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
  };

  const handleSendNotification = async () => {
    if (!token) {
      setSubscriptionStatus('Please subscribe first');
      return;
    }

    try {
      const notification = getRandomNotification();
      setCurrentNotification(notification);
      setShowNotification(true);

      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          title: notification.title,
          body: notification.body,
          image: '/icon192.png'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      setTimeout(() => setShowNotification(false), 5000);
    } catch (error) {
      console.error('Error sending notification:', error);
      setSubscriptionStatus('Failed to send notification');
    }
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
              onClick={handleSendNotification}
              className="px-24 py-6 sm:px-24 sm:py-6 sm:text-lg text-white bg-[#1A0B33] border-2 border-[#6434ce] rounded-xl transition-all duration-300 hover:bg-[#2A1055] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#6A35FF]"
              disabled={subscriptionStatus !== 'Subscribed'}
            >
              Send Notification
            </Button>
          </div>
        </motion.div>

        {/* <div className="space-y-4">
          <p className="text-sm text-gray-400">Status: {subscriptionStatus}</p>
        </div> */}

        {/* 🔔 Notification Toast (Top-Left) - Responsive */}
        <AnimatePresence>
          {showNotification && currentNotification && (
            <motion.div
              key="notification-toast"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed right-5 bottom-5 bg-[#2A1C45] text-white px-3 py-2 sm:px-4 sm:py-4 rounded-lg shadow-lg flex items-center gap-2 text-sm sm:text-base max-w-[90vw] sm:max-w-[320px] md:max-w-[400px]"
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
      </div>
    </main>
  );
}