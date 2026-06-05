/**
 * Static copy for /connections-hint-today.
 * Daily values (date, puzzle number, editor, the words themselves) come from
 * lib/connections-daily.ts — keep this file free of puzzle-specific data.
 */

export const PAGE_META = {
  titleBase: "Connections Hint Today",
  descriptionBase:
    "Today's NYT Connections hints and answer, revealed step by step so you stay spoiler-free. A clue for each color group, then the categories, then the grid.",
  keywords: [
    "connections hint today",
    "nyt connections hints",
    "connections answer today",
    "connections today",
    "connections clue today",
    "nyt connections answer",
    "connections hints",
  ],
};

/** Quotable, <50-word definition block (GEO target for LLM citations). */
export const CONNECTIONS_DEFINITION =
  "NYT Connections is a daily word game from The New York Times. You're given a grid of 16 words and must sort them into four hidden groups of four that share a connection. The groups are colour-coded by difficulty: yellow is easiest and purple is the trickiest.";

export const SECTIONS = {
  howToUse: {
    heading: "How to Use These Connections Hints",
    steps: [
      {
        name: "Start with a first-letter clue",
        text: "Each color group shows the first letter of its four words — a gentle nudge that won't give the theme away.",
      },
      {
        name: "Reveal the category name",
        text: "Still stuck? Reveal the group's category — the idea that links its four words — while the words stay hidden.",
      },
      {
        name: "Reveal the four words",
        text: "When you're ready, reveal the four words in any group, or use 'Reveal all answers' to see the full solved grid.",
      },
    ],
  },
  todaysAnswer: {
    heading: "Today's Connections Answer",
    intro:
      "Want the full solved grid? It's hidden below until you choose to reveal it, so you won't get spoiled by accident.",
  },
  whatIs: {
    heading: "What Is NYT Connections?",
    body: [
      "Connections launched in June 2023 and quickly became one of the New York Times' most popular daily puzzles, alongside Wordle. Each day brings a fresh grid of 16 words, and your job is to find the four groups of four that belong together — using only four mistakes before the game ends.",
      "The catch is the overlap: many words look like they fit several groups, and the puzzle is built to bait you toward the wrong one. That's what makes a hint so useful — a little push in the right direction without spoiling the solve.",
    ],
  },
  colors: {
    heading: "The Connections Colors Explained",
    intro:
      "Each group has a difficulty color. Solving from yellow up to purple is usually the safest order.",
  },
  strategy: {
    heading: "How to Solve Connections",
    body: [
      "Start with the group you're most sure of, but don't submit it immediately — scan the other words first to check none of them fit your group better. Connections almost always plants a decoy.",
      "Watch for words with more than one meaning; those are usually the trap. And save the purple group for last — it's typically wordplay, like words that start or end the same way, rather than a straightforward theme.",
      "If two groups share a likely word, solve the other groups first. Whatever's left over often reveals where the tricky word really belongs.",
    ],
  },
  vsWordle: {
    heading: "Connections vs Wordle — Pair Your Daily Puzzles",
    body: [
      "Most NYT puzzle fans play both. Wordle is a focused five-letter guess; Connections is a wider sorting challenge. Many players warm up with Wordle, then move to Connections.",
    ],
    comparison: {
      headers: ["", "Connections", "Wordle"],
      rows: [
        ["The task", "Sort 16 words into 4 groups", "Guess a 5-letter word"],
        ["Guesses", "4 mistakes allowed", "6 attempts"],
        ["Difficulty cue", "Color of each group", "Tile colors per letter"],
        ["Our daily help", "This page", "Today's Wordle hint"],
      ],
    },
  },
};

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

/** {{...}} tokens are replaced from live data by the page before rendering. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "What is today's Connections answer?",
    answer:
      "Today's answer is on this page, hidden behind a reveal so you won't see it by accident. Use the step-by-step hints for a nudge, or 'Reveal all answers' for the full grid.",
  },
  {
    number: "02",
    question: "What are the four Connections colors?",
    answer:
      "Yellow is the easiest group, then green, then blue, and purple is the trickiest — usually a wordplay twist. The colors show each group's difficulty.",
  },
  {
    number: "03",
    question: "How is Connections different from Wordle?",
    answer:
      "Wordle asks you to guess one five-letter word in six tries. Connections gives you 16 words to sort into four groups with only four mistakes allowed. Many players do both daily.",
  },
  {
    number: "04",
    question: "When does a new Connections puzzle come out?",
    answer:
      "A new Connections puzzle goes live every day at midnight in your local timezone, following The New York Times' daily rollover. This page updates automatically each day.",
  },
  {
    number: "05",
    question: "Who creates NYT Connections?",
    answer:
      "Connections is edited by Wyna Liu for The New York Times. She is known for the puzzle's tricky overlaps and the wordplay that usually hides in the purple group.",
  },
  {
    number: "06",
    question: "What is the hardest Connections group?",
    answer:
      "The purple group is almost always the hardest. It tends to rely on wordplay — like words that share a hidden prefix or suffix — rather than a simple shared theme.",
  },
  {
    number: "07",
    question: "How do I get a hint without seeing the answer?",
    answer:
      "Use the first-letter clue for each group first, then reveal the category name only if you need it. The four words stay hidden until you specifically choose to reveal them.",
  },
  {
    number: "08",
    question: "Can I play more daily word games here?",
    answer:
      "Yes — alongside Connections help, we cover the daily Wordle with progressive hints, a Wordle solver, and unlimited Wordle practice from 4 to 11 letters.",
  },
];
