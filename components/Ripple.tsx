'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleProps {
  showNotification: boolean;
}

export function Ripple({ showNotification }: RippleProps) {
  const [circles, setCircles] = useState<number[]>([]);
  const numCircles = 3;

  useEffect(() => {
    if (showNotification) {
      setCircles([...Array(numCircles)].map((_, i) => i));
      const timer = setTimeout(() => setCircles([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Static circles */}
      <motion.div 
        className="absolute w-[90%] h-[90%] rounded-full bg-[#2A1C45] opacity-30"
        animate={{
          scale: [1, 1.05, 1],
          transition: { duration: 3, repeat: Infinity }
        }}
      />
      <motion.div 
        className="absolute w-[70%] h-[70%] rounded-full bg-[#3A2A5A] opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 3, delay: 0.5, repeat: Infinity }
        }}
      />
      <motion.div 
        className="absolute w-[50%] h-[50%] rounded-full bg-[#4A3870] opacity-70"
        animate={{
          scale: [1, 1.15, 1],
          transition: { duration: 3, delay: 1, repeat: Infinity }
        }}
      />
      
      {/* Animated ripples */}
      <AnimatePresence>
        {circles.map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ 
              scale: [1, 2],
              opacity: [0.7, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
              times: [0, 1],
              delay: i * 0.2
            }}
            className="absolute w-[90%] h-[90%] rounded-full bg-purple-500/30"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}