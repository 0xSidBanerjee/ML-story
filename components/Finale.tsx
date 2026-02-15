"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { DAYS_SINCE_START } from "../utils/date";

interface FinaleProps {
  onRestart: () => void;
}

const Finale: React.FC<FinaleProps> = ({ onRestart }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hasClickedYes, setHasClickedYes] = useState(false);
  // successState: 0=idle, 1=PhaseA(I knew it), 2=PhaseB(It was always you), 3=PhaseC(Gift Intro), 4=PhaseD(Playlist)
  const [successPhase, setSuccessPhase] = useState(0);

  const moveNoButton = () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100; // Jump 100-200px
    setNoBtnPosition({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  };

  const handleYesClick = () => {
    // Confetti
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
        colors: ['#D64045', '#FFD700'] 
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D64045', '#FFD700'] 
      });

      requestAnimationFrame(frame);
    }());

    setHasClickedYes(true);
    setSuccessPhase(1); // Start Phase 1
    
    // Sequence Logic
    // Phase 1: "I knew it" (0s - 2.5s)
    setTimeout(() => {
        setSuccessPhase(2); // Start Phase 2: "It was always you"
    }, 2500);

    // Phase 2: "It was always you" (2.5s - 5s)
    setTimeout(() => {
        setSuccessPhase(3); // Start Phase 3: "And now... a gift"
    }, 5000);

    // Phase 3: "And now... a gift" (5s - 7.5s)
    setTimeout(() => {
        setSuccessPhase(4); // Start Phase 4: Playlist
    }, 7500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden bg-stitch-cream">
      
       {/* Background: Pulsing Gradient Orb (Always present) */}
       <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-200 rounded-full blur-[100px] pointer-events-none -z-10"
        />

      <AnimatePresence mode="wait">
        {/* THE PROPOSAL - DIRECT ON PAGE (No Card) */}
        {!hasClickedYes && (
            <motion.div 
                key="proposal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col gap-8 items-center justify-center w-full max-w-3xl"
            >
                <div className="flex flex-col items-center gap-6">
                     <motion.h1 
                        className="text-6xl md:text-8xl font-retro-serif font-extrabold text-[#8a1c3d] tracking-tight leading-none drop-shadow-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                     >
                        Arpita...
                     </motion.h1>
                     
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="flex flex-col items-center gap-3 mt-4"
                     >
                         <p className="text-4xl md:text-5xl font-retro-serif italic font-medium text-retro-black leading-tight">
                            Will you be my Valentine?
                         </p>
                         <p className="font-dm-sans uppercase tracking-[0.3em] text-[#d68c9c] text-sm md:text-base font-bold mt-2">
                            forever and ever?
                         </p>
                     </motion.div>
                </div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, type: "spring" }} 
                    className="flex flex-col md:flex-row gap-8 items-center justify-center w-full mt-8"
                >
                    <button
                        onClick={handleYesClick}
                        className="relative group bg-gradient-to-r from-red-500 to-pink-600 text-white text-xl md:text-2xl px-14 py-5 rounded-full font-retro-serif font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <span className="relative z-10">YES</span>
                        {/* Heartbeat Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-pink-500/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    </button>

                     <motion.button
                        animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton}
                        className="bg-transparent text-retro-black/60 text-lg md:text-xl px-8 py-3 rounded-full font-retro-serif font-bold hover:text-retro-black transition-all"
                    >
                        No
                    </motion.button>
                </motion.div>
            </motion.div>
        )}

        {/* PHASE 1: "I knew it." */}
        {successPhase === 1 && (
            <motion.div
                key="phase-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.8 } }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            >
                <h1 className="text-5xl md:text-7xl font-playfair font-black text-[#8a1c3d] drop-shadow-lg leading-tight">
                    I knew it.
                </h1>
            </motion.div>
        )}

        {/* PHASE 2: "It was always you. ❤️" */}
        {successPhase === 2 && (
            <motion.div
                key="phase-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.8 } }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            >
                <h1 className="text-4xl md:text-6xl font-playfair font-bold italic text-retro-black drop-shadow-md leading-tight">
                    It was always you. ❤️
                </h1>
            </motion.div>
        )}

        {/* PHASE 3: Gift Intro */}
        {successPhase === 3 && (
            <motion.div
                key="phase-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            >
                 <p className="text-xl md:text-2xl font-dm-sans font-medium text-stone-600 tracking-wide">
                    And now... a gift for the distance.
                </p>
            </motion.div>
        )}

        {/* PHASE 4: Playlist Reveal (Soft Glass) */}
        {successPhase === 4 && (
            <motion.div
                key="phase-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-lg relative z-20"
            >
                {/* Soft Glass Container */}
                <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 items-center">
                    
                    {/* Album Art */}
                    <div className="relative w-56 h-56 rounded-2xl shadow-xl overflow-hidden shrink-0 group">
                        <img src="/images/album-art.jpg" alt="Us" className="w-full h-full object-cover" />
                        {/* Soft Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
                    </div>

                    {/* Text Info */}
                    <div className="text-center flex flex-col gap-3 relative z-10 mt-2">
                        <h2 className="text-[#8a1c3d] font-retro-serif font-bold text-3xl md:text-4xl tracking-tight">
                            The Us Mix
                        </h2>
                        <p className="text-stone-700 font-dm-sans text-sm md:text-base leading-relaxed max-w-sm mx-auto font-medium">
                            Distance is just geography. I curated this to bridge the miles between us. For your sleepless nights, your anxious days, and every moment you need a hand to hold.<br/>
                            <span className="font-bold text-[#8a1c3d] mt-2 block">I’m always with you.</span>
                        </p>
                    </div>

                    {/* YouTube Music Button */}
                    <a 
                            href="https://music.youtube.com/playlist?list=PLcGGlAj226t9AOFGmvrC-BCP8ttg1dNx-" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#FF0000] text-white px-8 py-3 rounded-full font-bold text-base tracking-wide shadow-[0_4px_15px_rgba(255,0,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,0,0,0.6)] hover:scale-105 transition-all flex items-center gap-3 animate-pulse whitespace-nowrap mt-2"
                    >
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                        Play Our Soundtrack
                    </a>
                </div>


            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Finale;
