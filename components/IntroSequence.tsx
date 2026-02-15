"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DAYS_SINCE_START } from "../utils/date";

interface IntroSequenceProps {
  onComplete: () => void;
}

const LoadingText = () => {
    const messages = [
        "Retrieving first memories...",
        "Calculating total laughter...",
        "Analyzing 3 AM calls...",
        "Loading our forever...",
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-stitch-black/70 italic text-lg md:text-xl font-retro-serif"
        >
            {messages[index]}
        </motion.p>
    );
};

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(-1); // Start at -1 for "Tap to Open"

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === 0) {
        // Step 0: Analyzing... -> Wait 4s (enough for cycle)
        timeout = setTimeout(() => setStep(1), 4000);
    } else if (step === 1) {
        // Step 1: Top Genre -> Wait 4s
        timeout = setTimeout(() => setStep(2), 4000); 
    } else if (step === 2) {
        // Step 2: Top Artist -> Wait 5s
        timeout = setTimeout(() => setStep(3), 5000); 
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [step]);

  const handleStart = () => {
      setStep(0);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-stitch-cream text-stitch-black font-stitch-sans select-none overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* Step -1: Landing (The Story of Us) */}
        {step === -1 && (
             <motion.div
                key="step-landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                className="flex flex-col items-center justify-center gap-12 w-full h-full relative overflow-hidden"
             >
                {/* Background: Pulsing Gradient Orb */}
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-300 rounded-full blur-[100px] pointer-events-none"
                />

                {/* Floating Dust Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-stitch-black/20 rounded-full"
                            initial={{ 
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                                opacity: Math.random() * 0.5 + 0.1 
                            }}
                            animate={{ 
                                y: [null, Math.random() * -100], 
                                x: [null, (Math.random() - 0.5) * 50] 
                            }}
                            transition={{ 
                                duration: Math.random() * 10 + 10, 
                                repeat: Infinity, 
                                ease: "linear" 
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="flex flex-col items-center text-center gap-6 z-10 -mt-20">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col gap-3"
                    >
                        <span className="font-retro-sans text-sm md:text-base tracking-[0.2em] text-stitch-black/60 uppercase">
                            For Arpita
                        </span>
                        <h1 className="text-5xl md:text-7xl font-retro-serif font-bold text-stitch-black leading-tight">
                            The Story of Us
                        </h1>
                    </motion.div>
                
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        onClick={handleStart}
                        className="mt-8 px-10 py-4 bg-transparent border border-stitch-black/20 rounded-full text-stitch-black font-retro-sans tracking-widest text-sm md:text-base hover:bg-stitch-black hover:text-white transition-all duration-500 flex items-center gap-3 group backdrop-blur-sm"
                    >
                        <span>BEGIN THE JOURNEY</span>
                        <span className="group-hover:translate-x-1 transition-transform opacity-60">→</span>
                    </motion.button>
                </div>
             </motion.div>
        )}

        {/* Step 0: Analyzing */}
        {step === 0 && (
          <motion.div
            key="step-analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden gap-10"
          >
             {/* Background: Pulsing Gradient Orb (Consistent Atmosphere) */}
             <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-200 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Gathering Particles Effect */}
            <div className="absolute inset-0 pointer-events-none">
                 {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={`gather-${i}`}
                        className="absolute w-1 h-1 bg-stitch-red/40 rounded-full"
                        initial={{ 
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            opacity: 0
                        }}
                        animate={{ 
                            x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
                            y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0]
                        }}
                        transition={{ 
                            duration: Math.random() * 2 + 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                    />
                 ))}
            </div>

            {/* Organic Heartbeat Loader */}
            <div className="relative w-40 h-40 flex items-center justify-center z-10">
                 {/* Soft Shockwaves */}
                 {[0, 1].map((index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 bg-stitch-red/20 rounded-full blur-xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 1,
                            ease: "easeOut"
                        }}
                    />
                 ))}
                 
                 {/* The Heart */}
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
                    transition={{ 
                        duration: 1.2, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 1] // Double beat rhythm: bum-bum...
                    }}
                    className="relative w-24 h-24 bg-stitch-red rounded-full shadow-[0_0_40px_rgba(238,43,114,0.6)] flex items-center justify-center"
                 >
                    <span className="text-5xl pt-2">❤️</span>
                 </motion.div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center z-10">
                <h2 className="text-4xl md:text-6xl font-retro-serif font-bold text-stitch-black">
                    {DAYS_SINCE_START.toLocaleString()} days
                </h2>
                <LoadingText />
            </div>
          </motion.div>
        )}

        {/* Step 1: Top Genre (Yap & Yearning) */}
        {step === 1 && (
          <motion.div
            key="step-genre"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center justify-center gap-8 w-full h-full relative overflow-hidden"
          >
             {/* Background: Pulsing Gradient Orb */}
             <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-200 rounded-full blur-[100px] pointer-events-none"
            />

             <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-stitch-black/60 relative z-10">
                TOP GENRE
             </h2>
             
             {/* Frosted Glass Badge with Float Animation */}
             <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 bg-white/30 backdrop-blur-xl border-2 border-pink-500/30 px-10 py-6 rounded-full shadow-[0_8px_32px_rgba(255,194,209,0.3)] transform rotate-[-2deg] flex items-center justify-center gap-4"
             >
                {/* Floating Chat Bubbles Decoration */}
                <motion.div 
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: -40, rotate: -10 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute left-0 top-0 -translate-y-1/2 w-10 h-10 bg-white rounded-full rounded-br-none shadow-md flex items-center justify-center text-lg"
                >
                    💬
                </motion.div>
                <motion.div 
                    initial={{ scale: 0, x: 20 }}
                    animate={{ scale: 1, x: 40, rotate: 10 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute right-0 bottom-0 translate-y-1/2 w-8 h-8 bg-stitch-pink rounded-full rounded-tl-none shadow-md flex items-center justify-center text-sm"
                >
                    ❤️
                </motion.div>

                <span className="font-retro-serif italic text-3xl md:text-5xl text-stitch-black font-bold">
                    Yap & Yearning
                </span>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-4 relative z-10 bg-red-50/50 px-4 py-2 rounded-lg border border-red-100"
             >
                 <p className="text-[#8B2E49] font-retro-sans font-bold text-xs md:text-sm tracking-widest uppercase">
                    Top 0.001% of yappers worldwide
                 </p>
             </motion.div>
          </motion.div>
        )}

        {/* Step 2: Top Artist (Arpita) */}
        {step === 2 && (
          <motion.div
            key="step-artist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center gap-8 w-full h-full relative overflow-hidden"
          >
             {/* Background: Pulsing Gradient Orb */}
             <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-100 rounded-full blur-[120px] pointer-events-none"
            />

             <h2 className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-stitch-black/50 mb-4 relative z-10 translate-y-4">
                TOP ARTIST OF MY LIFE
             </h2>
             
             {/* Vinyl Record Photo with Glowing Halo */}
             <div className="relative group z-10 translate-y-[-20px]">
                 {/* Glowing Halo */}
                 <motion.div 
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-stitch-red blur-xl opacity-50"
                 />
                 
                 {/* Spinning Record */}
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-[8px] border-black shadow-2xl overflow-hidden shrink-0 bg-black"
                 >
                    <Image 
                        src="/images/artist.jpeg"
                        alt="Arpita"
                        fill
                        className="object-cover opacity-90"
                    />
                    {/* Vinyl Shine Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-full" />
                 </motion.div>

                 {/* Center Spindle Hole */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full z-20 border border-gray-300" />
             </div>

             <div className="flex flex-col items-center z-20 mt-8 relative">
                 {/* Massive Name - No Overlap */}
                 <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-8xl font-retro-serif font-bold text-[#590d22] drop-shadow-2xl tracking-tighter leading-none"
                 >
                    Arpita
                 </motion.h1>
                 
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 px-6 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm"
                 >
                    <p className="text-stitch-black/80 font-retro-sans font-medium text-sm md:text-base tracking-wide">
                        #1 Streamed. Every. Single. Day.
                    </p>
                 </motion.div>
             </div>
          </motion.div>
        )}

        {/* Step 3: Unwrap (Final CTA) */}
        {step === 3 && (
          <motion.div
            key="step-unwrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden"
          >
             {/* Background: Large Breathing Pink Orb */}
             <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-200 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Floating Polaroid Frames */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`polaroid-${i}`}
                        className="absolute bg-white p-2 pb-6 shadow-xl rotate-12 opacity-40 border border-gray-100"
                        style={{
                            width: Math.random() * 60 + 80 + 'px',
                            height: Math.random() * 80 + 100 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                        }}
                        animate={{ 
                            y: [0, -100, 0],
                            rotate: [Math.random() * 20 - 10, Math.random() * 20 - 10 + 180, Math.random() * 20 - 10 + 360],
                        }}
                        transition={{ 
                            duration: Math.random() * 20 + 20, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        <div className="w-full h-full bg-gray-100/50" />
                    </motion.div>
                ))}
            </div>

             <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-md px-6">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl font-retro-serif font-bold text-stitch-black mb-2 leading-tight">
                        The chapters are written.
                    </h1>
                    <p className="font-retro-sans text-stone-600 tracking-wide text-sm md:text-base">
                        {DAYS_SINCE_START.toLocaleString()} days of us, collected.
                    </p>
                </motion.div>

                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  onClick={onComplete}
                  className="group relative bg-[#ff2d55] text-white px-10 py-5 rounded-full font-bold text-xl md:text-2xl shadow-[0_10px_40px_rgba(255,45,85,0.4)] hover:shadow-[0_15px_50px_rgba(255,45,85,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Open Our Story 
                    <span className="group-hover:translate-x-1 transition-transform">📖</span>
                  </span>
                  
                  {/* Subtle Sheen Effect */}
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "linear", 
                        repeatDelay: 1 
                    }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  />
                  
                  {/* Heartbeat Pulse Ring */}
                  {/* <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" /> */}
                </motion.button>
             </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default IntroSequence;
