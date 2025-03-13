'use client';

import { motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

export const dynamic = 'force-static'; // Ensure it is statically exported

export default function Offline() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#2C2143] to-[#000000] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-8">
          <WifiOff className="w-16 h-16 text-red-400" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-bold mb-4">
          You are offline
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center text-gray-400 max-w-md">
          Please check your internet connection and try again. This app requires an internet connection to function properly.
        </motion.p>
      </div>
    </main>
  );
}
