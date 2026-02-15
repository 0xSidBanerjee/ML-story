"use client";

import React, { useEffect, useRef } from "react";
import { Howl, Howler } from "howler"; 
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
    } else if (phase === "epilogue") {
      // User requested: "ends the current playing song and again it all starts from the very first song"
      // So we pick the song from the first slide (Index 0)
      const firstSlide = storySlides[0];
      if (firstSlide && firstSlide.song) {
         trackToPlay = `/songs/${firstSlide.song}`;
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
        // Stop immediately if it's the same track to prevent echo/phasing
        if (currentTrackId.current === trackToPlay) {
             // This branch shouldn't ideally be hit due to the check above, but safe guard
            oldSound.stop();
            oldSound.unload();
        } else {
            oldSound.fade(oldSound.volume(), 0, 1000); // Fade out over 1s
            setTimeout(() => {
                // Only unload if it hasn't been reassigned (though we use closure var)
                oldSound.unload(); 
            }, 1000);
        }
      }

      currentTrackId.current = trackToPlay;
      
      const isFirstSongStart = (phase === "loading" || (phase === "story" && currentSlideIndex === 0));

      const sound = new Howl({
        src: [trackToPlay],
        loop: true, 
        preload: true, // Force preload
        volume: isFirstSongStart ? 0.5 : 0,  
        html5: true, 
        onload: () => {
             if (!isFirstSongStart) {
                sound.fade(0, 0.5, 1000); 
             }
        },
        onloaderror: (id, error) => {
            console.error(`[AudioManager] Load Error for ${trackToPlay}:`, error);
        },
        onplayerror: (id, error) => {
            // console.warn(`[AudioManager] Play Locked for ${trackToPlay}:`, error);
            sound.once('unlock', function() {
              // Vital Check: Only play if this sound is still current AND not already playing (to prevent echo)
              if (currentSound.current === sound && !sound.playing()) {
                  sound.play();
              }
            });
        }
      });
      
      // Attempt play immediately
      sound.play();
      currentSound.current = sound;
    } else if (!trackToPlay && currentSound.current) {
        // Handle case where we should stop playing (trackToPlay is null)
        currentSound.current.stop();
        currentSound.current.unload();
        currentSound.current = null;
        currentTrackId.current = null;
    }
    
  }, [phase, currentSlideIndex]);

  // Separate effect for cleanup on unmount ONLY
  useEffect(() => {
    return () => {
      if (currentSound.current) {
        currentSound.current.stop();
        currentSound.current.unload();
        currentSound.current = null;
      }
      currentTrackId.current = null;
    };
  }, []);

  return null; // Invisible component
};

export default AudioManager;
