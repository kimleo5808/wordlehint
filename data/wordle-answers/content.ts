/**
 * Static copy for /wordle-answers (the Past Wordle Answers archive).
 *
 * Numbers that change daily (total answers, top letters, etc.) are injected
 * at render time from lib/wordle-answers.ts — keep this file free of
 * hardcoded counts so the page never goes stale or over-claims.
 */

export const PAGE_META = {
  title: "Past Wordle Answers: Every Answer + Definitions",
  description:
    "Browse every past Wordle answer with definitions, dates, and puzzle numbers. Search any word, see letter stats, and stay spoiler-free. Updated daily.",
  h1: "Past Wordle Answers — Every Answer With Definitions",
  keywords: [
    "past wordle answers",
    "all wordle answers",
    "wordle answers list",
    "wordle answer archive",
    "every wordle answer",
    "previous wordle answers",
    "wordle answer history",
  ],
  ogImage: "/og.png",
};

/** Quotable, <50-word definition block (GEO target for LLM citations). */
export const OFFICIAL_ANSWER_DEFINITION =
  "A Wordle answer is the official five-letter solution chosen by The New York Times for a given day's puzzle. Each answer has a puzzle number counted from Wordle's launch on June 19, 2021, and the solution is the same for every player worldwide that day.";

/** Section intros — H2 copy. {{total}} etc. are filled at render time. */
export const SECTIONS = {
  whyUseful: {
    heading: "Why a Wordle Answer Archive Is Useful",
    body: [
      "A complete answer archive does three jobs at once. It lets you check whether a word has already been used so you don't waste a guess on a recent solution. It turns every past puzzle into a vocabulary lesson, because each answer here ships with its dictionary definition. And it gives strategy-minded players the raw material to spot patterns — which letters open answers most often, which endings repeat, and how many vowels a typical solution hides.",
      "Unlike answer lists that dump a wall of words, every entry below links straight to that day's full progressive hints, so you can replay any puzzle from a nudge instead of a spoiler.",
    ],
  },
  whatCounts: {
    heading: "What Counts as an Official Wordle Answer?",
    body: [
      "Every answer in this archive comes directly from The New York Times' official Wordle data feed — the same source that powers the live game — so the words and puzzle numbers match what players saw on the day.",
    ],
  },
  stats: {
    heading: "Wordle Answer Statistics & Patterns",
    intro:
      "These charts are computed from the real answers we track — not estimates. They update automatically as new puzzles are added.",
  },
  howTo: {
    heading: "How to Use This Archive in 4 Steps",
    steps: [
      {
        name: "Search for a word or puzzle number",
        text: "Type any five-letter word or a Wordle number into the search box. If the word has been an answer, its date and definition appear instantly; if not, you'll see that it has never been used.",
      },
      {
        name: "Switch how the list is sorted",
        text: "Toggle between newest-first by date, by puzzle number, or alphabetically (A–Z) to browse the archive the way that suits your question.",
      },
      {
        name: "Open a day's full hints",
        text: "Select 'View hints' on any answer to jump to that day's page with five progressive clues — useful if you'd rather be nudged than told.",
      },
      {
        name: "Browse safely with spoiler protection",
        text: "Today's answer stays hidden behind blank tiles until you choose to reveal it, so you can explore the archive without spoiling the current puzzle.",
      },
    ],
  },
  hintsVsAnswers: {
    heading: "Wordle Answers vs Wordle Hints — Which Do You Want?",
    body: [
      "Not everyone who lands here wants the answer spelled out. If you're mid-puzzle and just need a push, today's progressive hints reveal the solution one clue at a time — letter count, vowels, first letter, and more — so you can keep your streak honestly.",
    ],
    comparison: {
      headers: ["", "Wordle Answer", "Wordle Hint"],
      rows: [
        ["Tells you the word", "Yes, immediately", "Only at the final clue"],
        ["Keeps the challenge", "No", "Yes"],
        ["Best for", "Checking or studying past words", "Solving today without spoiling it"],
        ["Where", "This archive", "Today's hint page"],
      ],
    },
  },
};

export interface FaqItem {
  number: string;
  question: string;
  /** Plain-text answer used for FAQPage schema. */
  answer: string;
}

/**
 * FAQ copy. Answers that reference live data use {{...}} tokens that the
 * page replaces before rendering (and before building the schema), so the
 * on-page text and the structured data always agree.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "What was the first-ever Wordle answer?",
    answer:
      "The first official Wordle answer was CIGAR, played on June 19, 2021 as puzzle #0. Wordle was created by Josh Wardle and later acquired by The New York Times.",
  },
  {
    number: "02",
    question: "Can I check if a specific word has already been a Wordle answer?",
    answer:
      "Yes. Type the word into the search box at the top of this page. If it has been used, you'll see the exact date and puzzle number; if it hasn't appeared in the answers we track, the search will tell you so.",
  },
  {
    number: "03",
    question: "Where do these answers come from? Are they accurate?",
    answer:
      "Every answer is pulled from The New York Times' official Wordle feed — the same data that runs the live game — and the archive updates automatically every day, so the words and puzzle numbers stay correct.",
  },
  {
    number: "04",
    question: "How do I see an answer without spoiling today's puzzle?",
    answer:
      "Today's answer is hidden behind blank tiles until you click to reveal it, and your choice is remembered. If you only want a nudge, use today's progressive hints instead of the answer.",
  },
  {
    number: "05",
    question: "What's the difference between a Wordle hint and a Wordle answer?",
    answer:
      "An answer is the full solution word. A hint reveals the solution gradually — letter count, vowels, first and last letters, and pattern — so you can solve the puzzle yourself without losing the challenge.",
  },
  {
    number: "06",
    question: "What's the most common starting letter in Wordle answers?",
    answer:
      "{{topFirstLetterFact}} You can see the full A–Z breakdown in the statistics section above.",
  },
  {
    number: "07",
    question: "Has any Wordle answer been used twice?",
    answer:
      "{{duplicateFact}} The New York Times generally avoids reusing recent solutions, which is one reason checking the archive before you guess can help.",
  },
  {
    number: "08",
    question: "How often is this archive updated?",
    answer:
      "Daily. A new answer is added automatically after each puzzle goes live, so the latest solution and its definition appear here every day.",
  },
];

export const HOWTO_SCHEMA_NAME = "How to Use the Past Wordle Answers Archive";
export const HOWTO_SCHEMA_DESCRIPTION =
  "Search, sort, and browse every past Wordle answer with definitions while keeping today's puzzle spoiler-free.";

export interface RelatedTool {
  title: string;
  description: string;
  href: string;
}

export const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Today's Wordle Hint",
    description: "Five progressive clues for today's puzzle — solve it without spoilers.",
    href: "/wordle-hint-today",
  },
  {
    title: "Wordle Solver",
    description: "Enter the letters you know and find every matching five-letter word.",
    href: "/wordle-solver",
  },
  {
    title: "Wordle Unlimited",
    description: "Play endless Wordle games from 4 to 11 letters, no daily limit.",
    href: "/wordle-unlimited",
  },
  {
    title: "Wordle Hint Archive",
    description: "Progressive hints for every past puzzle, organized by month.",
    href: "/wordle-hint",
  },
  {
    title: "Spelling Bee Answers",
    description:
      "Today's NYT Spelling Bee word list, pangram, and Genius score cutoff.",
    href: "/spelling-bee-answers",
  },
];
