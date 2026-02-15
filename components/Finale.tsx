"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  const [isZooming, setIsZooming] = useState(false);
  const [showOneMoreThing, setShowOneMoreThing] = useState(false);
  const [inEpilogue, setInEpilogue] = useState(false);

  const moveNoButton = () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100; // Jump 100-200px
    setNoBtnPosition({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  };

  const handleYesClick = () => {
    // Trigger Zoom Animation first
    setIsZooming(true);

    // Delay the actual sequence start to allow the zoom to be felt
    setTimeout(() => {
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
            // Trigger "One more thing" appearance shortly after playlist
            setTimeout(() => {
                setShowOneMoreThing(true);
            }, 2500);
        }, 7500);
    }, 600); // 600ms delay for the zoom effect
  };

  const handleOneMoreThingClick = () => {
      setInEpilogue(true);
      setShowOneMoreThing(false); // Hide the link
      // onEpilogueStart(); // REMOVED: User wants to continue current song
      // REMOVED: Confetti burst
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden bg-stitch-cream">
      
       {/* Background: Pulsing Gradient Orb (Always present) */}
       <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-200 rounded-full blur-[100px] pointer-events-none -z-10"
        />

       {/* Background Watermark Photo */}
       <div 
            className="absolute inset-0 bg-cover bg-center opacity-5 blur-xl grayscale pointer-events-none -z-20 scale-110"
            style={{ backgroundImage: 'url("/images/IMG-20250203-WA0146.jpg")' }} 
       />

       {/* EPILOGUE: FLOATING FLOWERS BACKGROUND & OVERLAY */}
       {inEpilogue && (
           <div className="absolute inset-0 z-50 overflow-hidden flex items-center justify-center">
               
               {/* Background Image with Ken Burns & Blur Effect */}
               <motion.div 
                    initial={{ opacity: 0, scale: 1, filter: "blur(0px)" }}
                    animate={{ opacity: 1, scale: 1.1, filter: "blur(4px)" }}
                    transition={{ 
                        opacity: { duration: 1.5 },
                        scale: { duration: 10, ease: "linear" },
                        filter: { delay: 2, duration: 2 } // Start sharp, then blur as text appears
                    }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/images/flowers.jpg")' }}
               />
               
               {/* Darker Overlay for Text Contrast */}
               <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-black pointer-events-none"
               />

                {/* Glassmorphism Text Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-4 flex flex-col gap-8 shadow-2xl"
                >
                    <div className="flex flex-col gap-3">
                        <p className="text-xl md:text-2xl font-playfair text-white tracking-wide leading-relaxed">
                            All these flowers, and yet...
                        </p>
                        <h1 className="text-3xl md:text-5xl font-playfair font-extrabold text-white leading-tight drop-shadow-md">
                             I still find you more beautiful
                        </h1>
                         <p className="text-2xl md:text-3xl font-playfair italic text-white mt-1">
                             than any of them.
                        </p>
                    </div>

                    {/* Pulsing Heart */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white text-4xl drop-shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-8 h-8 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </motion.div>

                    {/* Signature with 'Live-Writing' Animation */}
                    <motion.div
                        className="relative mt-8" // Increased margin-top
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4, duration: 1 }} // Start slightly later
                    >
                        <motion.div
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                            transition={{ 
                                delay: 4.5, // Start writing 1.5s after main text (approx 3s + 1.5s)
                                duration: 3, 
                                ease: "linear" // Linear is better for writing effect
                            }}
                            className="text-4xl md:text-5xl text-white font-script drop-shadow-md pr-2 py-1 leading-relaxed"
                            style={{ fontFamily: 'var(--font-great-vibes), cursive' }} // Explicit fallback
                        >
                            With love, from ML
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Replay Link */}
                 <motion.button
                    onClick={onRestart}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ delay: 6, duration: 1 }}
                    className="absolute bottom-8 z-20 text-sm text-white font-dm-sans tracking-[0.2em] uppercase hover:text-white border-b border-transparent hover:border-white transition-all drop-shadow-md"
                >
                    Replay Our Story
                </motion.button>
           </div>
       )}

      <AnimatePresence mode="wait">
        {/* THE PROPOSAL - DIRECT ON PAGE (No Card) */}
        {!hasClickedYes && (
            <motion.div 
                key="proposal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)", transition: { duration: 1 } }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col gap-8 items-center justify-center w-full max-w-3xl"
            >
                {/* Animated Heart SVG Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] pointer-events-none opacity-20 z-0">
                    <svg viewBox="0 0 100 100" fill="none" stroke="#8a1c3d" strokeWidth="0.5" className="w-full h-full overflow-visible">
                        <motion.path
                            d="M50 88.9L46.9 85.8C35.9 75.8 28.6 69.2 28.6 61.1C28.6 54.5 33.8 49.3 40.4 49.3C44.1 49.3 47.7 51 50 53.7C52.3 51 55.9 49.3 59.6 49.3C66.2 49.3 71.4 54.5 71.4 61.1C71.4 69.2 64.1 75.8 53.1 85.8L50 88.9Z"
                            initial={{ pathLength: 0, scale: 0.8 }}
                            animate={{ pathLength: 1, scale: 1.1 }}
                            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                            transform="scale(1.5) translate(-16, -15)" 
                        />
                    </svg>
                </div>

                <div className="flex flex-col items-center gap-6 relative z-10">
                     <motion.h1 
                        className="text-7xl md:text-9xl font-retro-serif font-extrabold text-[#8a1c3d] tracking-tight leading-none drop-shadow-sm"
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
                        className="flex flex-col items-center gap-4 mt-4"
                     >
                         <div className="flex flex-col items-center">
                            <p className="text-4xl md:text-6xl font-retro-serif italic font-medium text-retro-black leading-tight">
                                Will you be
                            </p>
                            <p className="text-4xl md:text-6xl font-retro-serif italic font-medium text-retro-black leading-tight">
                                my Valentine?
                            </p>
                         </div>
                         
                         <div className="flex items-center gap-3 mt-4 opacity-70">
                            <span className="text-[#d68c9c] text-xl">~</span>
                            <p className="font-dm-sans uppercase tracking-[0.3em] text-[#d68c9c] text-sm md:text-base font-bold">
                                FOREVER AND EVER?
                            </p>
                            <span className="text-[#d68c9c] text-xl">~</span>
                         </div>
                     </motion.div>
                </div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, type: "spring" }} 
                    className="flex flex-col md:flex-row gap-12 items-center justify-center w-full mt-10 relative z-20"
                >
                    <motion.button
                        onClick={handleYesClick}
                        animate={isZooming ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "anticipate" }}
                        className="relative group bg-rose-600 text-white text-2xl md:text-3xl px-16 py-6 rounded-full font-retro-serif font-bold shadow-[0_0_40px_rgba(225,29,72,0.4)] hover:shadow-[0_0_60px_rgba(225,29,72,0.6)] hover:scale-110 transition-all duration-300"
                    >
                        <span className="relative z-10">YES</span>
                        {/* Breathing Halo Glow */}
                        <div className="absolute inset-0 rounded-full border border-rose-400 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
                        <div className="absolute -inset-4 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
                    </motion.button>

                     <motion.button
                        animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton}
                        className="bg-transparent text-stone-400 text-base md:text-lg font-dm-sans hover:text-stone-600 transition-colors cursor-pointer"
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

        {/* PHASE 4: Playlist Reveal (Light Glass Vinyl) */}
        {successPhase >= 4 && (
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showOneMoreThing ? 1 : (inEpilogue ? 0 : 1) }} // Fade out when epilogue starts
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Soft Glass Container - Compact & Lifted */}
                    <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 items-center -translate-y-10"> 
                        
                        {/* Album Art - Vinyl Style */}
                        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full shadow-2xl overflow-hidden shrink-0 group">
                            {/* Spinning Animation Helper */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full"
                            >
                                <div className="w-full h-full relative">
                                    <Image 
                                        src="/images/album-art.jpg" 
                                        alt="Us" 
                                        fill
                                        className="object-cover" 
                                    />
                                     {/* Vinyl texture overlay */}
                                    <div className="absolute inset-0 rounded-full border-2 border-black/5 opacity-20" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                                     {/* Center Hole for Vinyl Effect */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-stone-100 rounded-full border border-stone-300 shadow-inner z-10" />
                                </div>
                            </motion.div>
                             {/* Soft Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none rounded-full" />
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
                                href="https://music.youtube.com/playlist?list=PL2-2-V-2-2-2-2-2" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-8 py-3 bg-transparent border-2 border-[#ff2d55] text-[#ff2d55] rounded-full font-bold text-sm md:text-base tracking-wider hover:bg-[#ff2d55] hover:text-white transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                        >
                                <span className="relative z-10 flex items-center gap-2">
                                    Play Our Soundtrack <span className="group-hover:translate-x-1 transition-transform">🎧</span>
                                </span>
                        </a>

                        {/* One More Thing Link - Inside Card */}
                        <AnimatePresence>
                            {showOneMoreThing && !inEpilogue && (
                                <motion.button
                                    onClick={handleOneMoreThingClick}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ 
                                        delay: 2, // Wait 2s after playlist appears
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        repeatDelay: 0.5
                                    }}
                                    className="mt-2 text-[#8a1c3d] opacity-70 hover:opacity-100 font-retro-serif italic text-sm border-b border-[#8a1c3d]/30 hover:border-[#8a1c3d] transition-all pb-0.5"
                                >
                                    One more thing...
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
      </AnimatePresence>
    </div>
  );
};

export default Finale;
