import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Fredoka, Playfair_Display, Plus_Jakarta_Sans, DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Retro Fonts
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: 'swap',
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: 'swap',
});

// Title Font: Playfair Display (Bold/ExtraBold)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: 'swap',
});

// Body Font: DM Sans (Geometric, modern)
const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: 'swap',
});

// Script: Great Vibes (Handwritten)
const greatVibes = Great_Vibes({
    variable: "--font-great-vibes",
    subsets: ["latin"],
    weight: ["400"],
    display: 'swap',
});

export const metadata: Metadata = {
  title: "Arpita's Wrapped 2026",
  description: "A story about us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${fredoka.variable} ${playfair.variable} ${plusJakarta.variable} ${dmSans.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

