export interface SlideData {
  id: number;
  idString: string;
  visualType: 'image' | 'finale';
  image?: string;
  title?: string;
  lines: string[];
  audioKeyword?: string;
  song?: string; // New property for audio filename
}

export const storySlides: SlideData[] = [
  {
    id: 1,
    idString: "The Spark",
    visualType: 'image',
    image: "/images/IMG-20250115-WA0016.jpg",
    lines: [
      "It all started with a weird,\nnewspaper-print umbrella.",
      "One random question.",
      "“Eta ki chaata?”",
      "I didn’t know that silly moment\nwould become the beginning\nof my favorite story.",
      "Since 2018,\nyou’ve been my best chapter."
    ],
    audioKeyword: "sparkle",
    song: "Sparkle Radwimps.mp3"
  },
  {
    id: 2,
    idString: "The Compass",
    visualType: 'image',
    image: "/images/IMG-20250115-WA0024.jpg",
    lines: [
      "12th December, 2018.",
      "We’ve had our on and offs.",
      "Silence.",
      "Distance.",
      "Moments that could’ve ended us.",
      "But somehow,\nevery single time,\nwe found our way back.",
      "Not because it was easy.",
      "But because it felt right.",
      "It’s either you.\nOr it’s no one."
    ],
    audioKeyword: "compass",
    song: "Until I Found You Stephen Sanchez.mp3"
  },
  {
    id: 3,
    idString: "The Mirrorball",
    visualType: 'image',
    image: "/images/IMG-20250128-WA0025.jpg",
    lines: [
      "I know what you tell yourself.",
      "That you’re the strong one.",
      "The responsible one.",
      "The one who carries too much.",
      "The one who makes sure\nnobody ever feels left out…",
      "But somehow,\nyou’re the one\nwho feels forgotten.",
      "You are not the backup.",
      "You are not too much.",
      "You are not second.",
      "You are everything to me."
    ],
    audioKeyword: "mirrorball",
    song: "Die With A Smile Bruno Mars.mp3"
  },
  {
    id: 4,
    idString: "The Sanctuary",
    visualType: 'image',
    image: "/images/IMG-20250203-WA0035.jpg",
    lines: [
      "I know about the panic.",
      "The sleepless nights.",
      "The quiet breakdowns.",
      "The days you whisper,\n‘I am not okay.\nI’m really not okay.’",
      "You don’t have to be strong\nevery second with me.",
      "In your chaos.",
      "In your calm.",
      "In your silence.",
      "I am here.\nAnd I’m not leaving."
    ],
    audioKeyword: "sanctuary",
    song: "yung kai - blue.mp3"
  },
  {
    id: 5,
    idString: "The Promise",
    visualType: 'image',
    image: "/images/IMG-20250203-WA0099.jpg",
    lines: [
      "I know I’m not perfect.",
      "I can be too logical\nwhen you need softness.",
      "I understand things,\nbut sometimes delay action.",
      "I stretch myself thin\ntrying to save everyone.",
      "But loving you\nis teaching me growth.",
      "I will work on my boundaries.",
      "I will listen deeper.",
      "I will act sooner.",
      "I will protect our space.",
      "And yes…\nI’ve only come once.",
      "But that story?\nIt’s about to change."
    ],
    audioKeyword: "promise",
    song: "Light Switch Charlie Puth.mp3"
  },
  {
    id: 6,
    idString: "The Forever",
    visualType: 'image',
    image: "/images/IMG-20250203-WA0107.jpg",
    lines: [
      "One day,\nwe’ll count grey hairs.",
      "Complain about back pain.",
      "Laugh at our old photos.",
      "And I’ll still look at you\nlike I did in 2018.",
      "Because beauty was never\njust your face.",
      "It was always your heart.",
      "And that never fades."
    ],
    audioKeyword: "forever",
    song: "her JVKE.mp3"
  },
  {
    id: 7,
    idString: "The Grand Finale",
    visualType: 'finale',
    image: "/images/IMG-20250203-WA0115.jpg",
    lines: [
        "After 2,616 days.",
        "After distance.",
        "After growth.",
        "After everything.",
        "Arpita…",
        "Will you be my Valentine\nfor ever and ever?"
    ],
    audioKeyword: "finale",
    song: "I Think They Call This Love.mp3"
  }
];
