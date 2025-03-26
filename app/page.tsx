"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Download } from "lucide-react";
import { Ripple } from "@/components/Ripple";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useServiceWorker } from "@/hooks/useServiceWorker";

const NOTIFICATION_MESSAGES = [
  { title: "Thank you", body: "Message sent successfully!" },
  { title: "Success", body: "Notification delivered!" },
  { title: "Confirmation", body: "Your message is on its way!" },
  { title: "Update", body: "Notification sent!" },
  { title: "Status", body: "Message processed successfully!" },
];

type Notification = {
  title: string;
  body: string;
};

export default function Home() {
  useServiceWorker();
  const { token, notificationPermissionStatus } = useFcmToken();
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const { showInstallPrompt, handleInstallPWA, setShowInstallPrompt } = useInstallPrompt();

  const handleTestNotification = async () => {
    try {
      if (!token) {
        console.error("No token available");
        return;
      }

      const notification = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
      setCurrentNotification(notification);
      setShowNotification(true);

      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          title: notification.title,
          message: notification.body,
          link: "/contact",
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending notification:", error);
      setCurrentNotification({
        title: "Error",
        body: "Failed to send notification. Please try again.",
      });
      setShowNotification(true);
    }
  };

  return (
    <main className="min-h-[100vh]min-h-[100vh] flex flex-col items-center justify-center w-full bg-gradient-to-b from-[#2C2143] to-[#000000] text-white overflow-hidden">
      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            key="install-prompt"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 left-4 sm:left-6 right-4 sm:right-6 z-50 bg-[#1A0B33] text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 sm:gap-6 text-sm sm:text-base max-w-[90vw] sm:max-w-[400px] backdrop-blur-sm border border-[#6A35FF]/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#6A35FF]/20 rounded-full">
                <Download className="w-5 h-5 text-[#6A35FF]" />
              </div>
              <div>
                <h3 className="font-semibold">Install App</h3>
                <p className="text-[#6A35FF]/80 text-xs">Add to Home Screen</p>
              </div>
            </div>
            <div className="flex-1" />
            <button
              onClick={handleInstallPWA}
              className="px-4 py-2 bg-[#6A35FF] hover:bg-[#5e488b] text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6A35FF]/50 focus:ring-offset-2"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="p-2 hover:bg-[#6A35FF]/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-[#6A35FF]/80" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
              onClick={handleTestNotification}
              disabled={!token}
              className="px-24 py-6 sm:px-24 sm:py-6 sm:text-lg text-white bg-[#1A0B33] border-2 border-[#6434ce] rounded-xl transition-all duration-300 hover:bg-[#2A1055] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#6A35FF]"
              >
              Send Notification
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
        {showNotification && currentNotification && (
          <motion.div
            key="notification-toast"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-6 right-6 sm:right-8  bg-[#412c6a] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm sm:text-base max-w-[90vw] sm:max-w-[320px] md:max-w-[400px]"
          >
            <Bell className="w-4 h-4 text-yellow-400" />
            <div>
              <h3 className="font-semibold">{currentNotification.title}</h3>
              <p>{currentNotification.body}</p>
            </div>
            <button onClick={() => setShowNotification(false)}>
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </main>
  );
}