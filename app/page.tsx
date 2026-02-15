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
  // DYNAMIC DURATION LOGIC
  // ----------------------------------------------------
  const getSlideDuration = (index: number) => {
    // If it's the finale, no auto-advance functionality needed (handled by component), 
    // but we return a value for safety.
    if (index >= storySlides.length) return 5000;
    
    const slide = storySlides[index];
    if (slide.visualType === 'finale') return 999999; // Indefinite

    // Formula:
    // Stagger Delay per line: 0.8s
    // Initial Delay: 0.4s
    // Fade Duration: 0.6s
    // Reading Buffer: 3s
    const lineCount = slide.lines ? slide.lines.length : 1;
    const animationTime = 0.4 + ((lineCount - 1) * 0.8) + 0.6;
    const totalDuration = (animationTime + 3.0) * 1000; // Convert to ms

    return Math.max(5000, totalDuration); // Minimum 5s
  };

  const activeSlideDuration = getSlideDuration(currentSlideIndex);

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
            {/* Progress Bar - Restored and Active */}
            <StoryProgress
              totalSlides={storySlides.length}
              currentIndex={currentSlideIndex}
              duration={activeSlideDuration} // Dynamic based on text length
              onSlideComplete={handleNextSlide}
              isPaused={isPaused}
            />

            {/* Unified Gesture & Navigation Layer - Only for Story Slides */}
            {storySlides[currentSlideIndex].visualType !== 'finale' && (
                <div 
                    className="absolute inset-0 z-40 outline-none"
                    onPointerDown={(e) => {
                        // Start Press Timer
                        (window as any).isLongPress = false;
                        const timer = setTimeout(() => {
                            setIsPaused(true);
                            (window as any).isLongPress = true;
                        }, 200); // 200ms threshold for "Hold"
                        (window as any).pressTimer = timer;
                    }}
                    onPointerUp={(e) => {
                        if ((window as any).pressTimer) clearTimeout((window as any).pressTimer);
                        
                        if ((window as any).isLongPress) {
                            // Was a hold, just resume
                            setIsPaused(false);
                            (window as any).isLongPress = false; 
                        } else {
                            // Was a tap (short press)
                            // ONLY navigate if it wasn't a scroll (simple check: if duration was very short)
                            // Ideally checking movement distance is better, but for now:
                            const clientX = e.clientX;
                            const width = window.innerWidth;
                            
                            // 30% Left -> Previous, 70% Right -> Next
                            if (clientX < width * 0.3) {
                                handlePrevSlide();
                            } else if (clientX > width * 0.7) {
                                handleNextSlide();
                            }
                        }
                    }}
                    onPointerLeave={() => {
                        if ((window as any).pressTimer) clearTimeout((window as any).pressTimer);
                        setIsPaused(false);
                        (window as any).isLongPress = false;
                    }}
                    // Allow vertical scrolling (pan-y) but capture horizontal gestures if needed
                    style={{ touchAction: 'pan-y' }}
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
