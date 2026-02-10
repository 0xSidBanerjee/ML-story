"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface CinematicTransitionProps {
  onComplete: () => void;
}

const CinematicTransition: React.FC<CinematicTransitionProps> = ({ onComplete }) => {
  useEffect(() => {
    // Total duration: Fade in (1s) + Read time (3s) + Fade out (1s) = 5s
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-retro-black text-retro-cream p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-2xl flex flex-col gap-6">
        <motion.p
          className="text-xl md:text-3xl font-retro-serif italic opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          “Some people meet and pass through each other’s lives.
        </motion.p>
        
        <motion.p
          className="text-2xl md:text-4xl font-retro-serif font-bold text-retro-cream"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          We met… and stayed.
        </motion.p>
        
        <motion.p
          className="text-lg md:text-2xl font-retro-sans tracking-widest uppercase text-retro-pink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          Through everything.”
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CinematicTransition;
