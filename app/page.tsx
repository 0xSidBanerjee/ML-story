"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import IntroSequence from "@/components/IntroSequence";
import StorySlide from "@/components/StorySlide";
import Finale from "@/components/Finale";
import StoryProgress from "@/components/StoryProgress";
import AudioManager from "@/components/AudioManager";
import CinematicTransition from "@/components/CinematicTransition";
import MusicPlayer from "@/components/MusicPlayer";
import { storySlides } from "@/data/story";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(false); // Phase B State
  const [startStory, setStartStory] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [restartKey, setRestartKey] = useState(0); // Key to force re-render/reset

  // Handle Loader Complete -> Phase B
  const handleLoaderComplete = () => {
    setLoading(false);
    setShowTransition(true); 
  };

  // Handle Transition Complete -> Phase C (Story)
  const handleTransitionComplete = () => {
    setShowTransition(false);
    setStartStory(true);
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < storySlides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // ----------------------------------------------------
  // PAUSE LOGIC
  // ----------------------------------------------------
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);



  // ----------------------------------------------------
  // RESTART LOGIC
  // ----------------------------------------------------
  const handleRestart = () => {
    // Increment key to fully unmount and remount components to reset their internal states
    setRestartKey(prev => prev + 1);
    setLoading(true);
    setShowTransition(false);
    setStartStory(false);
    setCurrentSlideIndex(0);
    setIsPaused(false);
  };

  // Preload Images
  useEffect(() => {
    storySlides.forEach((slide) => {
      if (slide.image) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = slide.image;
        document.head.appendChild(link);
      }
    });
  }, []);

  return (
    <main 
        key={restartKey}
        className="relative w-full h-screen overflow-hidden bg-retro-cream select-none touch-none"
    >
      <AnimatePresence mode="wait">
        {loading && <IntroSequence onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showTransition && <CinematicTransition onComplete={handleTransitionComplete} />}
      </AnimatePresence>

      {/* Audio Manager (Global) - Plays during loading too */}
      <AudioManager 
        phase={
            loading ? "loading" :
            showTransition ? "story" : // Keep playing first song during transition
            (currentSlideIndex === storySlides.length - 1 && storySlides[currentSlideIndex].visualType === 'finale') ? "finale" : 
            "story"
        } 
        currentSlideIndex={currentSlideIndex} 
      />

      <AnimatePresence mode="wait">
        {startStory && (
          <motion.div
            key="story-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            {/* Progress Bar - Static Segments (Fade out on Finale) */}
            <motion.div
                animate={{ opacity: storySlides[currentSlideIndex].visualType === 'finale' ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="relative z-50"
            >
                <StoryProgress
                totalSlides={storySlides.length}
                currentIndex={currentSlideIndex}
                />
            </motion.div>

            {/* Inactivity Hint (Tap to continue) - Disabled on Finale */}
            <TapHint active={!isPaused && storySlides[currentSlideIndex].visualType !== 'finale'} />

            {/* Unified Gesture & Navigation Layer - Only for Story Slides */}
            {storySlides[currentSlideIndex].visualType !== 'finale' && (
                <div 
                    className="absolute inset-0 z-40 outline-none"
                    onClick={(e) => {
                        const clientY = e.clientY;
                        const height = window.innerHeight;
                        
                        // Zone Logic:
                        // Top 60% -> Navigation Allowed
                        // Bottom 40% -> Scroll Only (Do nothing here, let click pass through or just ignore)
                        
                        if (clientY < height * 0.6) {
                            const clientX = e.clientX;
                            const width = window.innerWidth;
                            
                            // Left 30% -> Previous
                            if (clientX < width * 0.3) {
                                handlePrevSlide();
                            } 
                            // Right 70% -> Next (Larger tap area for forward progress)
                            else {
                                handleNextSlide();
                            }
                        }
                    }}
                    // Allow all touch actions (scrolling) to pass through naturally
                    // We only capture clicks (taps)
                    style={{ touchAction: 'auto' }}
                />
            )}

            {/* Slide Content */}
            <div className="w-full h-full pointer-events-auto relative z-30"> 
              <AnimatePresence mode="wait">
                  {storySlides[currentSlideIndex].visualType === 'finale' ? (
                     <motion.div 
                        key="finale"
                        className="w-full h-full pointer-events-auto relative z-50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                     >
                        <Finale onRestart={handleRestart} />
                     </motion.div>
                  ) : (
                    <motion.div
                        key={`slide-${currentSlideIndex}`}
                        className="w-full h-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <StorySlide
                          data={storySlides[currentSlideIndex]}
                          isActive={true} 
                        />
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Persistent Music Player */}
      <MusicPlayer 
        currentSongTitle={
            loading || showTransition 
                ? (storySlides[0].songTitle || "Sparkle - Radwimps") 
                : (storySlides[currentSlideIndex].songTitle || "Story Song")
        } 
        isPlaying={!isPaused}
      />
    </main>
  );
}

// Visual Hint Component
const TapHint = ({ active }: { active: boolean }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!active) return;
        
        const timer = setTimeout(() => {
            setVisible(true);
        }, 5000); // Show hint after 5s of no interaction (in this case, just time on slide)

        return () => {
            clearTimeout(timer);
            setVisible(false); // Reset if active prop changes (e.g. slide change)
        };
    }, [active]);

    // Reset timer on any click (global listener is simpler but specific is fine too)
    // For now, since 'active' resets on slide change, it works per slide.

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center gap-1"
                >
                    <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm shadow-sm flex items-center justify-center animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-rose-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
