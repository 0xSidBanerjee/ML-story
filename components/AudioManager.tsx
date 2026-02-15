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

    if (phase === "story" || phase === "finale" || phase === "loading") {
      // Use slide index if in story/finale phase, otherwise default to first slide song for loading
      const slideIndexToUse = phase === "loading" ? 0 : currentSlideIndex;
      const slide = storySlides[slideIndexToUse];
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
        // console.log(`[AudioManager] Swapping track to: ${trackToPlay}, Phase: ${phase}`);

      // Fade out old sound
      if (currentSound.current) {
        const oldSound = currentSound.current;
         // Stop immediately if it's the same track to prevent echo/phasing, otherwise fade
        if (currentTrackId.current === trackToPlay) {
            oldSound.stop();
            oldSound.unload();
        } else {
            oldSound.fade(oldSound.volume(), 0, 1000); // Fade out over 1s
            setTimeout(() => {
                oldSound.unload(); // Unload after fade
            }, 1000);
        }
      }

      currentTrackId.current = trackToPlay;
      
      // No fade-in if it's the very first song (loading phase or first slide) to ensure immediate impact
      const isFirstSongStart = (phase === "loading" || (phase === "story" && currentSlideIndex === 0));

      const sound = new Howl({
        src: [trackToPlay],
        loop: true, // Ensure looping as requested
        volume: isFirstSongStart ? 0.5 : 0,  
        html5: true, // Force HTML5 Audio to stream large files
        onload: () => {
             if (!isFirstSongStart) {
                sound.fade(0, 0.5, 1000); 
             }
        },
        onloaderror: (id, error) => {
            console.error(`[AudioManager] Load Error for ${trackToPlay}:`, error);
        },
        onplayerror: (id, error) => {
            console.error(`[AudioManager] Play Error for ${trackToPlay}:`, error);
            sound.once('unlock', function() {
              sound.play();
            });
        }
      });
      sound.play();
      currentSound.current = sound;
    }
    
    // Cleanup function to stop sound when component unmounts
    return () => {
        if (currentSound.current) {
            currentSound.current.stop();
            currentSound.current.unload();
        }
    };
  }, [phase, currentSlideIndex]);

  return null; // Invisible component
};

export default AudioManager;
