"use client";

import React from "react";

interface StoryProgressProps {
  totalSlides: number;
  currentIndex: number;
  duration: number; // in milliseconds
  onSlideComplete: () => void;
  isPaused?: boolean;
}

const progressKeyframes = `
@keyframes grow {
  from { width: 0%; }
  to { width: 100%; }
}
`;

const ProgressSegment: React.FC<{
  isActive: boolean;
  isCompleted: boolean;
  duration: number; // in seconds for CSS
  isPaused: boolean;
}> = ({ isActive, isCompleted, duration, isPaused }) => {
  return (
    <div className="relative h-1 flex-1 bg-retro-black/20 rounded-full overflow-hidden">
        <style>{progressKeyframes}</style>
      <div
        // Key is crucial here! When starting a new slide, the `duration` prop changes (globally in StoryProgress).
        // By using `key`, we force React to destroy and recreate this div, ensuring the CSS animation *starts fresh* 
        // with the new duration. Without this, the browser might reuse the element and not restart the animation timeline correctly.
        key={`progress-${isActive}-${duration}`} 
        className="absolute top-0 left-0 bottom-0 bg-retro-red"
        style={{
            width: isCompleted ? "100%" : "0%",
            animation: isActive && !isCompleted ? `grow ${duration}s linear forwards` : "none",
            animationPlayState: isPaused ? "paused" : "running",
        }}
      />
    </div>
  );
};

const StoryProgress: React.FC<StoryProgressProps> = ({
  totalSlides,
  currentIndex,
  duration,
  onSlideComplete,
  isPaused = false,
}) => {
  // Use onAnimationEnd to trigger slide change instead of a timer
  // This ensures the slide changes exactly when the visual bar finishes
  const handleAnimationEnd = () => {
      if (!isPaused) {
        onSlideComplete();
      }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex gap-2 p-4 md:p-6 pointer-events-none"> 
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div 
            key={index} 
            className="flex-1"
            onAnimationEnd={index === currentIndex ? handleAnimationEnd : undefined}
        >
            <ProgressSegment
            isActive={index === currentIndex}
            isCompleted={index < currentIndex}
            duration={duration / 1000} // Convert to seconds for CSS
            isPaused={isPaused}
            />
        </div>
      ))}
    </div>
  );
};

export default StoryProgress;
