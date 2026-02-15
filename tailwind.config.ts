import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ededed",
        neon: {
          pink: "#ff2d55",
          cyan: "#00f2ea",
          violet: "#7000ff",
        },
        romantic: {
            deep: "#4a0404", // Deep red
            rose: "#881337", // Rose
            gold: "#fbbf24",
            blush: "#fce7f3",
        },
        retro: {
            cream: "#FFFDF5",
            red: "#D64045", // Vintage Rose
            black: "#2D2A26", // Warm Black/Espresso
            pink: "#FFC2D1", // Pastel Pink
        },
        stitch: {
            red: "#ee2b72", // Stitch Design Red
            black: "#1a1a1a", // Stitch Design Black
            cream: "#fbfbfb", // Stitch Design Background (simulated from screenshot)
        }
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "var(--font-geist-sans)", "sans-serif"], // Default sans to DM Sans
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-playfair)", "serif"], // Default serif to Playfair
        "retro-serif": ["var(--font-playfair)", "serif"],
        "retro-sans": ["var(--font-dm-sans)", "sans-serif"], // Override Fredoka with DM Sans
        "stitch-sans": ["var(--font-plus-jakarta)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        "script": ["var(--font-great-vibes)", "cursive"],
      },
      boxShadow: {
        retro: "5px 5px 0px 0px #2D2A26", // Black shadow
        "retro-lg": "8px 8px 0px 0px #2D2A26",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
        "fade-out": "fadeOut 1s ease-in-out forwards",
        "pulse-glow": "pulseGlow 2s infinite ease-in-out",
        "bounce-subtle": "bounceSubtle 2s infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 45, 85, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 45, 85, 0.8)" },
        },
        bounceSubtle: {
            "0%, 100%": { transform: "translateY(-5%)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
            "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" }
        },
        float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
        },
        "gradient-xy": {
            "0%, 100%": {
                "background-size": "400% 400%",
                "background-position": "left center"
            },
            "50%": {
                "background-size": "200% 200%",
                "background-position": "right center"
            }
        }
      },
    },
  },
  plugins: [],
};
export default config;
