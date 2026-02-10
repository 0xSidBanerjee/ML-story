"use client";

import React, { useEffect, useRef } from "react";
import { Howl } from "howler"; 
import { storySlides } from "../data/story";

interface AudioManagerProps {
  phase: string;
  currentSlideIndex: number;
}

const AudioManager: React.FC<AudioManagerProps> = ({ phase, currentSlideIndex }) => {
  const currentSound = useRef<Howl | null>(null);
  const currentTrackId = useRef<string | null>(null);

  useEffect(() => {
    // Determine which track to play based on phase and slide
    let trackToPlay = null;

    if (phase === "story" || phase === "finale") {
      const slide = storySlides[currentSlideIndex];
      if (slide && slide.song) {
        trackToPlay = `/songs/${slide.song}`;
      }
    } else if (phase === "success") {
      // Keep playing the finale song or switch to a "Success" anthem if desired.
      // For now, let's keep the finale song playing or loop it.
      // User didn't specify a "Success" song, usually "I Think They Call This Love" fits well.
      // So we might just let the finale song continue? 
      // Actually, let's re-use the finale song for success state to keep the mood.
      trackToPlay = `/songs/${storySlides[storySlides.length - 1].song}`;
    }

    // Logic to crossfade or switch tracks
    if (trackToPlay && trackToPlay !== currentTrackId.current) {
      // Fade out old sound
      if (currentSound.current) {
        const oldSound = currentSound.current;
        oldSound.fade(oldSound.volume(), 0, 1000); // Fade out over 1s
        setTimeout(() => {
             oldSound.unload(); // Unload after fade
        }, 1000);
      }

    //   console.log(`Swapping track to: ${trackToPlay}`);
      currentTrackId.current = trackToPlay;
      
      const sound = new Howl({
        src: [trackToPlay],
        loop: true, // Ensure looping as requested
        volume: 0,  // Start silent for fade-in
        html5: true, // Force HTML5 Audio to stream large files
        onload: () => {
             sound.fade(0, 0.5, 1000); // Fade in to 50% volume (not too loud)
        }
      });
      sound.play();
      currentSound.current = sound;
    }
  }, [phase, currentSlideIndex]);

  return null; // Invisible component
};

export default AudioManager;
