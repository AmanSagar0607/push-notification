'use client';

import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotificationBellProps {
  showNotification: boolean;
}

export const NotificationBell = ({ showNotification }: NotificationBellProps) => {
  return (
    <motion.div
      animate={showNotification ? {
        rotate: [0, -15, 15, -10, 10, 0],
        transition: { duration: 0.5 }
      } : {}}
      className="relative z-10"
    >
      <Bell className="w-12 h-12 text-white" />
    </motion.div>
  );
};