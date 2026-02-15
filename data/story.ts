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
      "It started with a strange,\nnewspaper-print umbrella.",
      "One random question.",
      "\"Eta ki chaata?\"",
"I didn’t know that moment\nwould begin\nmy favorite story.",
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
"We’ve had our on and offs.\nSilence. Distance. Almost losing us.",
"But somehow,\nwe kept choosing each other.",
"It was never easy.\nIt was just always you.",
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
"That you have to be the strong one.\nThe one who carries it all.",
"The one who makes sure\nno one feels left out.",
"And somehow,\nyou’re the one left alone.",
"You are not too much.\nYou were never second.",
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
"I know about the panic.\nThe sleepless nights.\nThe quiet breaking points.",
"The days you whisper,\n\"I’m not okay.\"",
"You don’t have to be strong with me.",
"In your chaos or your calm,\nI am here.\n I always will be.",
"And I’m not leaving."
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
"I can be too logical\nwhen you need warmth.",
"I understand… but sometimes wait too long.",
"I give too much of myself\nto everyone else.",
"But loving you\nis teaching me better.",
"I will listen deeper.\nI will show up sooner.\nI will protect us.",
"And yes… I’ve only come once to meet you.",
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
