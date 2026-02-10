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
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Layer: Plain Cream for Retro feel */}
      <div className="absolute inset-0 z-0 bg-retro-cream" />

      {/* Main Content Layer: Polaroid Card Style */}
      {data.image && (
        <motion.div
            className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "backOut" }}
        >
             {/* Polaroid Container - Straight, no rotation */}
             <div className="relative w-full max-w-sm md:max-w-4xl bg-white border-4 border-retro-black shadow-retro rounded-xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Image Section (Top on Mobile, Left on Desktop) */}
                <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:h-auto border-b-4 md:border-b-0 md:border-r-4 border-retro-black">
                    <Image
                        src={data.image}
                        alt={data.title || "Story Image"}
                        fill
                        className="object-cover"
                        priority
                    />
                     {/* ID Tag Overlay on Image (Top Left) */}
                    {data.idString && (
                        <div className="absolute top-4 left-4 inline-block bg-retro-pink text-retro-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#2D2A26] border-2 border-retro-black z-10">
                            <h3 className="font-retro-sans font-bold text-[10px] md:text-sm uppercase tracking-widest">
                                {data.idString}
                            </h3>
                        </div>
                    )}
                </div>

                {/* Text/Caption Section (Bottom on Mobile, Right on Desktop) */}
                <div className="w-full md:w-1/2 p-3 md:p-10 bg-white flex flex-col items-center justify-center text-center min-h-[100px] md:min-h-[400px] relative">
                    {/* Subtle Gradient Overlay for Readability (Top to Bottom fade or subtle vignette) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

                    <div className="max-w-xs md:max-w-md flex flex-col gap-1.5 md:gap-4 md:gap-5 relative z-10">
                        {data.lines.map((line, index) => {
                            const isLastLine = index === data.lines.length - 1;
                            return (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                    transition={{ 
                                        delay: isActive ? 0.4 + (index * 0.8) : 0, // Stagger 0.8s
                                        duration: 0.6,
                                        ease: "easeOut" 
                                    }}
                                    className={`
                                        font-retro-serif italic leading-tight md:leading-normal text-retro-black whitespace-pre-line
                                        ${isLastLine ? "text-xl md:text-2xl font-bold mt-1 md:mt-4 drop-shadow-md" : "text-base md:text-xl font-medium opacity-90"}
                                    `}
                                    style={isLastLine ? {
                                        // Dynamic Glow Effect based on Slide content/vibes
                                        textShadow: data.idString === "The Mirrorball" ? "0 0 10px rgba(0, 255, 255, 0.4)" // Cyan
                                                  : data.idString === "The Sanctuary" ? "0 0 10px rgba(255, 126, 95, 0.4)" // Warm
                                                  : "0 0 10px rgba(214, 64, 69, 0.3)" // Default Red/Pink
                                    } : {}}
                                >
                                    {line}
                                </motion.p>
                            );
                        })}
                    </div>
                </div>
             </div>
        </motion.div>
      )}

      {/* Removed separate Content Overlay div since text is now inside the card */}
    </div>
  );
};

export default StorySlide;
