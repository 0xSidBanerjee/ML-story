"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface CinematicTransitionProps {
  onComplete: () => void;
}

const CinematicTransition: React.FC<CinematicTransitionProps> = ({ onComplete }) => {
  useEffect(() => {
    // Total duration increased to accommodate slower, more emotional pacing
    const timer = setTimeout(onComplete, 6500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stitch-cream text-stitch-black p-6 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background: Warm Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl w-full flex flex-col gap-8 relative z-10 items-center">
        
        {/* Line 1: 'Some people meet...' */}
        <motion.p
          className="text-lg md:text-xl font-dm-sans font-medium italic text-stone-600/60 relative"
          style={{ textShadow: "0 0 10px #FDFBF7, 0 0 20px #FDFBF7" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
        >
          Some people meet and pass through each other’s lives...
        </motion.p>
        
        {/* Line 2: 'We met... and stayed.' (Hero) */}
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
        >
            <h1 
                className="text-6xl md:text-8xl font-retro-serif font-extrabold text-[#8a1c3d] leading-[0.9] text-center"
                style={{ textShadow: "0 0 15px #FDFBF7, 0 0 30px #FDFBF7, 0 0 40px #FDFBF7" }}
            >
                We met... <br/>
                and stayed.
            </h1>
        </motion.div>
        
        {/* Line 3: 'THROUGH EVERYTHING.' */}
        <div className="overflow-hidden">
            <motion.p
              className="text-sm md:text-base font-dm-sans font-bold uppercase text-black tracking-[0.4em] mt-6"
              style={{ textShadow: "0 0 10px #FDFBF7, 0 0 20px #FDFBF7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
            >
              THROUGH EVERYTHING.
            </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default CinematicTransition;
