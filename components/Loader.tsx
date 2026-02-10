"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { DAYS_SINCE_START } from "../utils/date";
import Image from "next/image";

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 0: Analyzing... (Spinner)
    const timeout1 = setTimeout(() => setStep(1), 3000);
    // Step 1: Top Genre
    const timeout2 = setTimeout(() => setStep(2), 6500); // Extended for reading
    // Step 2: Top Artist
    const timeout3 = setTimeout(() => setStep(3), 11000); // Giving more time for the image
    // Step 3: Button appears
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 p-6 text-center select-none bg-retro-cream">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Retro Heart Spinner */}
            <div className="w-16 h-16 bg-retro-red rounded-full animate-pulse shadow-retro border-2 border-retro-black" /> 
            <div className="flex flex-col gap-2">
                <p className="text-retro-black font-retro-sans font-bold text-xl tracking-tight">
                analyzing {DAYS_SINCE_START.toLocaleString()} days of us...
                </p>
                <p className="text-retro-black/60 font-retro-serif italic text-lg">
                Scanning memories, late night calls,<br/>and stolen smiles…
                </p>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-4"
          >
             <h2 className="text-retro-black font-retro-sans font-bold text-2xl uppercase tracking-widest">
                Top Genre
             </h2>
             <div className="bg-retro-black text-retro-cream px-6 py-2 rounded-full font-retro-serif italic text-3xl md:text-5xl border-2 border-retro-red shadow-retro rotate-[-2deg]">
                Yap & Yearning
             </div>
             <p className="mt-4 text-retro-black/70 font-medium">
                Top 0.001% of yappers worldwide.
             </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-6"
          >
             <h2 className="text-retro-black font-retro-sans font-bold text-2xl uppercase tracking-widest">
                Top Artist of My Life
             </h2>
             
             {/* Artist Profile Picture */}
             <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-retro-black shadow-retro overflow-hidden">
                <Image 
                    src="/images/artist.jpg"
                    alt="Arpita"
                    fill
                    className="object-cover"
                />
             </div>

             <div className="text-retro-red font-retro-serif font-black text-5xl md:text-7xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                Arpita
             </div>
             <p className="text-retro-black/70 font-medium italic">
                #1 Streamed. Every. Single. Day.
             </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={onComplete}
              className="bg-retro-red text-retro-cream px-12 py-5 rounded-full font-retro-serif italic font-bold text-2xl border-4 border-retro-black shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95"
            >
              Unwrap Our Story
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Loader;
