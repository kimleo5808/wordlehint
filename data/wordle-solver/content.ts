/**
 * Static copy for the upgraded /wordle-solver page.
 * Live numbers (count of tracked answers) are injected by the page.
 */

export const PAGE_META = {
  title: "Wordle Solver — Word Finder With Real Answers",
  description:
    "Free Wordle solver: enter green, yellow, and gray letters to find every matching word — with real past Wordle answers highlighted and defined. 4 to 11 letters.",
  h1: "Wordle Solver & Word Finder",
  keywords: [
    "wordle solver",
    "wordle word finder",
    "wordle helper",
    "5 letter word finder",
    "wordle answer finder",
    "wordle cheat",
    "wordle clue solver",
    "word puzzle solver",
  ],
};

/** Quotable, <50-word definition block (GEO target for LLM citations). */
export const SOLVER_DEFINITION =
  "A Wordle solver is a tool that takes the letters you already know — greens in the right spot, yellows in the wrong spot, and grays that are ruled out — and instantly lists every word that still fits. It turns Wordle's color clues into a short list of possible answers.";

export const SECTIONS = {
  whatIs: {
    heading: "What Is a Wordle Solver?",
    body: [
      "A Wordle solver compares the clues you've gathered against a dictionary of valid words and removes anything that contradicts them. Instead of staring at the board, you enter what each tile told you and get back the handful of words that remain.",
      "Our solver goes one step further: when a possible word has actually been a real Wordle answer, we flag it and show the date it was used along with its definition — so you can tell genuine solutions from filler words at a glance.",
    ],
  },
  colors: {
    heading: "Green, Yellow, and Gray: What Each Color Means",
    items: [
      {
        color: "correct" as const,
        title: "Green — right letter, right spot",
        text: "The letter is in the word and in that exact position. Type it into the matching cell and set it green to lock the position.",
      },
      {
        color: "present" as const,
        title: "Yellow — right letter, wrong spot",
        text: "The letter is in the word but not where you placed it. The solver keeps words that contain it elsewhere and rules out that position.",
      },
      {
        color: "absent" as const,
        title: "Gray — not in the word",
        text: "The letter isn't in the answer at all. Mark it on the keyboard to remove every word that uses it.",
      },
    ],
    note: "Repeated letters are handled correctly: if a letter is green or yellow somewhere, the solver won't wrongly exclude it as gray.",
  },
  realAnswers: {
    heading: "How the Solver Flags Real Answers",
    body: [
      "Every match is checked against the real Wordle answers we track. When a candidate word has genuinely been the puzzle's solution, it gets a green “Past answer” badge, the date it appeared, and a short definition pulled from our archive.",
      "This matters because the New York Times rarely reuses a recent answer — so a word that showed up last week is less likely to be today's solution, even if it fits your clues. Sort by “Likely first” to bring these real answers to the top, or by “A–Z” for a plain list.",
    ],
  },
  vsHints: {
    heading: "Wordle Solver vs Hints vs Answers — Which Do You Need?",
    body: [
      "These three tools sit on a spectrum from least to most spoiler. Pick the one that matches how much help you actually want.",
    ],
    comparison: {
      headers: ["", "Solver", "Hints", "Answer"],
      rows: [
        ["How much it reveals", "A short list of possible words", "One clue at a time", "The full word"],
        ["Keeps the challenge", "Mostly", "Yes", "No"],
        ["Best when", "You're a few guesses in", "You want a nudge", "You've given up or are checking"],
        ["Where", "This page", "Today's hints", "Today's answer"],
      ],
    },
  },
  firstGuess: {
    heading: "What to Enter as Your First Guess",
    body: [
      "The solver shines once you have clues, but your very first guess sets up everything. A strong opener tests common letters in their most likely spots, so you walk into the solver with useful greens and yellows already in hand.",
      "We rank the best openers using information theory against real answers — SLATE, CRANE, and TRACE consistently come out on top.",
    ],
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
    question: "How does a Wordle solver work?",
    answer:
      "It matches the clues you enter — green, yellow, and gray letters — against a dictionary of valid words and removes any that don't fit, leaving only the words that are still possible.",
  },
  {
    number: "02",
    question: "Is using a Wordle solver cheating?",
    answer:
      "That's up to you. Many players use it only when truly stuck, or to learn new words. If you'd rather keep the challenge, use a single progressive hint instead of the full word list.",
  },
  {
    number: "03",
    question: "Does the solver only show real Wordle answers?",
    answer:
      "No — it shows every valid word that fits your clues. But words that have genuinely been Wordle answers are flagged with a badge, the date they were used, and a definition, so you can spot the likely solutions.",
  },
  {
    number: "04",
    question: "Can the solver handle 6, 7, or more letter words?",
    answer:
      "Yes. Use the length selector to switch between 4 and 11 letters. The grid and dictionary adjust automatically for longer word games.",
  },
  {
    number: "05",
    question: "How do I enter a yellow letter?",
    answer:
      "Type the letter into the position where you guessed it, then click that cell until it turns yellow. The solver keeps words that contain the letter somewhere else.",
  },
  {
    number: "06",
    question: "Why are no words showing up?",
    answer:
      "Usually a clue conflicts — for example, a letter marked gray that you also need as green or yellow. Clear the board and re-enter your tiles carefully, setting each color to match your Wordle result.",
  },
  {
    number: "07",
    question: "What's the best word to start Wordle with?",
    answer:
      "Strong openers like SLATE, CRANE, and TRACE test the most common letters. See our data-ranked list of the best Wordle starting words for the full breakdown.",
  },
  {
    number: "08",
    question: "Is the Wordle solver free?",
    answer:
      "Yes. It's completely free, runs in your browser, and needs no account or sign-up.",
  },
];
