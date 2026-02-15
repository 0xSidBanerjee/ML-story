"use strict";

import React from "react";
import Image from "next/image";
import { storySlides } from "@/data/story";

const AssetPreloader = () => {
    return (
        <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
            {/* Preload Story Images */}
            {storySlides.map((slide, index) => (
                slide.image && (
                    <Image
                        key={`preload-img-${index}`}
                        src={slide.image}
                        alt="preload"
                        width={10} // Minimal dimensions just to trigger load
                        height={10}
                        priority={true} // Force high priority loading
                        loading="eager"
                        onLoad={() => console.log(`[Preloader] Image loaded: ${slide.image}`)}
                    />
                )
            ))}

            {/* Preload Artist Image */}
            <Image
                src="/images/artist.jpeg"
                alt="preload-artist"
                width={10}
                height={10}
                priority={true}
            />

             {/* Preload Flowers Background */}
             <Image
                src="/images/flowers.jpg"
                alt="preload-flowers"
                width={10}
                height={10}
                priority={true}
            />

            {/* Pre-render Fonts & Emojis */}
            <span className="font-script" style={{ fontFamily: 'var(--font-great-vibes), cursive' }}>
                With love, from ML
            </span>
            <span>
                🌷 🌹 ❤️ 🎧 📖 💬 🕯️ ✨
            </span>
        </div>
    );
};

export default AssetPreloader;
