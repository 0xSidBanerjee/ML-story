"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideData } from "../data/story";
import Image from "next/image";

interface StorySlideProps {
  data: SlideData;
  isActive: boolean;
}

const StorySlide: React.FC<StorySlideProps> = ({ data, isActive }) => {
  return (
    <div className="w-full h-full bg-stitch-cream overflow-y-auto scroll-smooth custom-scrollbar relative">
      <div className="w-full flex flex-col min-h-full pb-24">
          
          {/* 1. Blended Photo Header (Top 45-50% - Parallax Wrapper) */}
          <div className="relative w-full h-[50vh] shrink-0 overflow-hidden">
             
             {/* Pink Orb Backlight */}
             <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-300 rounded-full blur-[80px] z-0"
             />

             {data.image && (
                <motion.div 
                    className="relative w-full h-full z-10"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {/* Image Container with CSS Mask for Perfect Blend */}
                    <div 
                        className="relative w-full h-full"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                        }}
                    >
                        <Image
                            src={data.image}
                            alt={data.title || "Story Image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
             )}
          </div>

          {/* 2. Text Content (Natural Flow) */}
          <div className="relative z-20 px-6 md:px-12 flex flex-col gap-3 md:gap-4 -mt-16 text-center items-center pb-32">
             
             {/* Title: Playfair Display, Bold (700), Deep Wine Red */}
             {data.title && (
                <motion.h2 
                    className="text-3xl md:text-5xl font-retro-serif font-bold text-[#8a1c3d] drop-shadow-sm leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    {data.title}
                </motion.h2>
             )}

             {/* Body Text: DM Sans, Medium (500), Rich Black, Wide Tracking */}
             <div className="flex flex-col gap-3 md:gap-4 max-w-lg w-full">
                {data.lines.map((line, index) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ 
                            delay: isActive ? 0.6 + (index * 0.5) : 0, 
                            duration: 1 
                        }}
                        className="font-dm-sans text-[15px] md:text-xl font-medium text-gray-900 leading-relaxed tracking-wide"
                    >
                        {line}
                    </motion.p>
                ))}
             </div>

             {/* Divider */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 0.5 } : { opacity: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-8 text-stitch-red/60 text-2xl"
             >
                ~ ❦ ~
             </motion.div>
          </div>
      </div>
    </div>
  );
};

export default StorySlide;
