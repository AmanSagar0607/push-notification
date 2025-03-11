'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Ripple } from '@/components/Ripple';

const NOTIFICATION_MESSAGES = [
  { title: "New Likes", body: "You have 8 new likes on your recent post!" },
  { title: "WhatsApp", body: "You received a new message on WhatsApp" },
  { title: "Instagram", body: "Someone tagged you in a photo" },
  { title: "Twitter", body: "Your tweet got 12 retweets!" },
  { title: "Email", body: "You have 3 unread emails in your inbox" },
  { title: "LinkedIn", body: "5 people viewed your profile today" },
  { title: "YouTube", body: "A channel you subscribe to posted a new video" },
  { title: "Facebook", body: "You have a new friend request" },
  { title: "Reminder", body: "Don't forget your meeting at 3 PM" },
  { title: "Weather Alert", body: "It's going to rain in your area today" }
];

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const { toast } = useToast();

  const getRandomNotification = () => {
    return NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
  };

  const handleNotification = () => {
    const notification = getRandomNotification();
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);

    toast({
      title: notification.title,
      description: notification.body,
      className: "bg-[#2A1C45] border-[#4A3870]",
    });

    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(notification.title, {
            body: notification.body,
            icon: "/notification-icon.png"
          });
        }
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1333] to-[#0A0515] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence>
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hola!
          </motion.h1>

          <div className="relative w-full max-w-[300px] sm:max-w-[400px] aspect-square mb-12 sm:mb-24">
            <Ripple showNotification={showNotification} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="relative"
                animate={showNotification ? {
                  rotate: [0, -15, 15, -10, 10, 0],
                  scale: [1, 1.1, 1],
                  transition: { duration: 0.5 }
                } : {}}
              >
                <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                <AnimatePresence>
                  {showNotification && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Lorem Ipsum...</h2>
            <p className="text-lg sm:text-xl text-gray-400">Lorem ipsum dolor sit amet.</p>
          </motion.div>

          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={handleNotification}
              className="w-full py-4 sm:py-6 text-base sm:text-lg bg-transparent hover:bg-[#3A2A5A] border-2 border-[#4A3870] rounded-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Send Notification
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}