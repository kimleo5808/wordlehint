/**
 * Static copy for /strands-hint-today.
 * Daily values (clue, spangram, theme words, number, editor) come from
 * lib/strands-daily.ts — keep this file free of puzzle-specific data.
 */

export const PAGE_META = {
  titleBase: "Strands Hint Today",
  descriptionBase:
    "Today's NYT Strands hints, spangram, and answers — revealed step by step so you stay spoiler-free. Get a nudge for the spangram, then each theme word.",
  keywords: [
    "strands hint today",
    "nyt strands hints",
    "strands spangram today",
    "strands answer today",
    "strands today",
    "nyt strands answers",
    "strands theme words",
  ],
};

/** Quotable, <50-word definition block (GEO target for LLM citations). */
export const STRANDS_DEFINITION =
  "NYT Strands is a daily word-search game from The New York Times. You get a 6×8 grid of letters and a theme, and you find the hidden theme words. One special word — the spangram — stretches across the whole board and names the theme.";

export const SECTIONS = {
  howToUse: {
    heading: "How to Use These Strands Hints",
    steps: [
      {
        name: "Read the theme clue",
        text: "The clue is the same hint the game gives you. Use it to guess what the words have in common before revealing anything.",
      },
      {
        name: "Nudge the spangram",
        text: "Reveal a clue for the spangram — its first letter and length — then the full spanning word only if you still need it.",
      },
      {
        name: "Uncover the theme words",
        text: "Each theme word shows its first letter and length first. Reveal them one at a time, or reveal everything at once.",
      },
    ],
  },
  todaysAnswer: {
    heading: "Today's Strands Answers",
    intro:
      "Want the full solution — spangram and every theme word? It's hidden below until you choose to reveal it.",
  },
  whatIs: {
    heading: "What Is NYT Strands?",
    body: [
      "Strands joined the New York Times puzzle lineup in 2024 and quickly became a daily favorite next to Wordle and Connections. Each puzzle is a themed word search: a 6×8 board of letters hides a set of theme words, and your job is to find them all.",
      "The twist is the spangram — a single word that touches two opposite sides of the board and sums up the theme. Find it and the rest of the puzzle usually falls into place.",
    ],
  },
  strategy: {
    heading: "How to Solve Strands",
    body: [
      "Start with the theme clue and brainstorm related words before you touch the board. Strands rewards thinking about the topic, not just hunting letters.",
      "Look for the spangram early — it spans the whole grid, so it's long and often anchors a corner. Once you have it, the theme is confirmed and the shorter words are easier to spot.",
      "Stuck? Finding any valid non-theme word in the app earns a hint, but our step-by-step reveals give you exactly the nudge you want without the guesswork.",
    ],
  },
  vsOthers: {
    heading: "Strands vs Wordle vs Connections",
    body: [
      "The New York Times now runs three flagship daily word games. Many players do all three — and we cover each with spoiler-safe hints.",
    ],
    comparison: {
      headers: ["", "Strands", "Wordle", "Connections"],
      rows: [
        ["The task", "Find themed words in a grid", "Guess a 5-letter word", "Sort 16 words into 4 groups"],
        ["Special twist", "The spangram", "Color tiles", "Tricky overlaps"],
        ["Our daily help", "This page", "Wordle hint", "Connections hint"],
      ],
    },
  },
};

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "What is today's Strands spangram?",
    answer:
      "Today's spangram is on this page, hidden behind a reveal so you won't see it by accident. Reveal a first-letter clue first, then the full spangram when you're ready.",
  },
  {
    number: "02",
    question: "What is the spangram in Strands?",
    answer:
      "The spangram is a special theme word that stretches from one side of the board to the opposite side and describes the puzzle's theme. It's highlighted yellow in the game when found.",
  },
  {
    number: "03",
    question: "How is Strands different from Wordle and Connections?",
    answer:
      "Strands is a themed word search on a 6×8 grid, Wordle is a five-letter guessing game, and Connections is a sorting puzzle. They're three separate daily NYT games.",
  },
  {
    number: "04",
    question: "When does a new Strands puzzle come out?",
    answer:
      "A new Strands puzzle goes live every day at midnight in your local timezone, following The New York Times' daily rollover. This page updates automatically.",
  },
  {
    number: "05",
    question: "How do hints work in the Strands game itself?",
    answer:
      "In the app you earn a hint for every three valid non-theme words you find; a hint then highlights the letters of one theme word. Our page lets you get that help directly, one step at a time.",
  },
  {
    number: "06",
    question: "How many theme words are in a Strands puzzle?",
    answer:
      "It varies by puzzle, usually around five to eight theme words plus the spangram. Every letter on the board is used by exactly one theme word or the spangram.",
  },
  {
    number: "07",
    question: "Can I get a hint without seeing the answer?",
    answer:
      "Yes. Each theme word shows only its first letter and length until you choose to reveal the full word, and the spangram works the same way.",
  },
  {
    number: "08",
    question: "Can I play more daily word games here?",
    answer:
      "Yes — we also cover the daily Wordle with progressive hints, Connections, a Wordle solver, and unlimited Wordle practice.",
  },
];
