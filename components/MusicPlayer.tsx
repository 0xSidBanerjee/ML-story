"use client";

import React from "react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  currentSongTitle: string;
  isPlaying: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSongTitle, isPlaying }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-5 py-3 rounded-full max-w-[90vw] md:max-w-md overflow-hidden bg-white/80 backdrop-blur-md border border-rose-100 shadow-lg shadow-rose-500/10"
    >
      {/* Equalizer Icon */}
      <div className="flex gap-[3px] items-center h-4 shrink-0">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            animate={isPlaying ? {
              height: [4, 14, 6, 16, 4],
            } : { height: 4 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: bar * 0.1,
              ease: "easeInOut"
            }}
            className="w-1 bg-[#ff2d55] rounded-full"
          />
        ))}
      </div>

      {/* Scrolling Text Container with Gradient Mask */}
      <div 
        className="w-48 md:w-64 overflow-hidden relative"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <motion.div
          animate={{ x: isPlaying ? ["0%", "-50%"] : "0%" }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 whitespace-nowrap items-center"
        >
          {/* Content Duplicated 4 times to ensure seamless loop even on wider screens */}
          {[1, 2, 3, 4].map((i) => (
             <React.Fragment key={i}>
                <span className="text-sm font-dm-sans font-medium text-stone-800">
                    {currentSongTitle}
                </span>
                <span className="text-stone-400 text-[10px]">•</span>
             </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
