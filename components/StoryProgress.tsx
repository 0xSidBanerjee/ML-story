"use client";

import React from "react";

interface StoryProgressProps {
  totalSlides: number;
  currentIndex: number;
}

const StoryProgress: React.FC<StoryProgressProps> = ({
  totalSlides,
  currentIndex,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex gap-2 p-4 pt-6 md:p-6 pointer-events-none safe-area-inset-top"> 
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div 
            key={index} 
            className="h-1 flex-1 rounded-full overflow-hidden"
            style={{
                backgroundColor: index <= currentIndex ? "#ee2b72" : "#d6d3d1" // Rose-500 (Theme) vs Stone-300
            }}
        />
      ))}
    </div>
  );
};

export default StoryProgress;
