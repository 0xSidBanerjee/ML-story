"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { DAYS_SINCE_START } from "../utils/date";

interface FinaleProps {
  onRestart: () => void;
}

const Finale: React.FC<FinaleProps> = ({ onRestart }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hasClickedYes, setHasClickedYes] = useState(false);

  const moveNoButton = () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100; // Jump 100-200px
    setNoBtnPosition({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  };

  const handleYesClick = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return;
      
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff2d55', '#ffffff'] 
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff2d55', '#ffffff'] 
      });

      requestAnimationFrame(frame);
    }());

    setHasClickedYes(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden bg-retro-cream">
      
      <div className="relative z-10 max-w-2xl flex flex-col gap-6 md:gap-8 items-center">
        
        {/* Intro Lines - Fade out on Success */}
        {!hasClickedYes && (
            <div className="flex flex-col gap-2">
                <motion.p 
                    className="text-lg md:text-xl font-retro-sans text-retro-black/70"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    After {DAYS_SINCE_START.toLocaleString()} days.
                </motion.p>
                <motion.p 
                    className="text-lg md:text-xl font-retro-sans text-retro-black/70"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                After distance. After growth. After everything.
                </motion.p>
            </div>
        )}

        {/* Name or Success Headline */}
        <motion.h1
            className="text-5xl md:text-7xl font-retro-serif italic font-black text-retro-red"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: hasClickedYes ? 0 : 4, duration: 1 }} // Name appears at 4s
        >
            {hasClickedYes ? "I knew it." : "Arpita…"}
        </motion.h1>

        {/* The Question or Success Subtext */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: hasClickedYes ? 0.5 : 6, duration: 1 }} // Question appears at 6s
            className="flex flex-col gap-4"
        >
            {hasClickedYes ? (
                 <p className="text-3xl md:text-5xl font-retro-serif font-bold text-retro-black drop-shadow-md">
                    It was always you. ❤️
                 </p>
            ) : (
                <p className="text-2xl md:text-4xl font-retro-serif font-medium text-retro-black">
                    Will you be my Valentine<br/>
                    <span className="text-retro-pink font-bold drop-shadow-sm">for ever and ever?</span>
                </p>
            )}
        </motion.div>

        {/* Buttons - Hide on Success */}
        {!hasClickedYes && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 8, type: "spring" }} // Buttons appear at 8s
                className="mt-8 flex gap-6 items-center justify-center w-full relative h-24"
            >
                <button
                    onClick={handleYesClick}
                    className="bg-retro-red text-retro-cream text-xl md:text-2xl px-12 py-4 rounded-full font-retro-serif font-bold border-4 border-retro-black shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all z-20"
                >
                    YES!
                </button>

                <motion.button
                    animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    className="bg-white text-retro-black text-lg md:text-xl px-8 py-4 rounded-full font-retro-serif font-bold border-4 border-retro-black hover:bg-gray-100 transition-all z-10"
                >
                    No
                </motion.button>
            </motion.div>
        )}

        {/* Restart (Subtle) */}
        <motion.button
            onClick={onRestart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 9 }}
            className="mt-12 text-sm text-retro-black/40 hover:text-retro-black underline font-retro-mono"
        >
            Replay Story
        </motion.button>

      </div>
    </div>
  );
};

export default Finale;
