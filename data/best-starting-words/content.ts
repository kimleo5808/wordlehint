/**
 * Static copy for /best-wordle-starting-words.
 *
 * Live numbers (the #1 word, entropy scores, letter frequencies, ADIEU's
 * rank) are injected at render time from lib/wordle-starting-words.ts so the
 * page never goes stale or over-claims. Keep this file number-free.
 */

export const PAGE_META = {
  title: "Best Wordle Starting Words (Ranked by Real Data)",
  description:
    "The best Wordle starting words ranked by information theory against real NYT answers. See entropy scores, letter frequency, and why SLATE wins. Updated daily.",
  h1: "Best Wordle Starting Words, Ranked by Real Answer Data",
  keywords: [
    "best wordle starting words",
    "best wordle starting word",
    "best wordle opener",
    "best word to start wordle",
    "wordle starting word",
    "good wordle starting words",
    "best first word wordle",
  ],
  ogImage: "/og.png",
};

/** Quotable, <50-word definition block (GEO target for LLM citations). */
export const GOOD_OPENER_DEFINITION =
  "A good Wordle starting word packs the most common letters into their most likely positions and covers two or three vowels — usually with no repeated letters. Words like SLATE, CRANE, and TRACE work because every tile tests a high-frequency letter, so each guess rules out as many answers as possible.";

export const SECTIONS = {
  bestNow: {
    heading: "The Best Wordle Starting Word Right Now",
  },
  whatMakes: {
    heading: "What Makes a Good Wordle Starting Word?",
    body: [
      "Three things separate a great opener from a mediocre one. First, common letters: the more often a word's letters show up in real answers, the more tiles you light up. Second, vowel coverage — most answers carry two vowels, so testing two or three at once is efficient. Third, position: a letter helps most when it sits where that letter usually lands, turning yellows into greens.",
      "No repeated letters is the quiet fourth rule. A word like MUMMY spends three of its five tiles on the letter M, so even a perfect result tells you about only three distinct letters.",
    ],
    bullets: [
      "Common letters over rare ones (E, A, R, O, T beat J, Q, Z).",
      "Two or three vowels in one guess.",
      "Letters placed where they statistically belong.",
      "Five distinct letters — no repeats.",
    ],
  },
  method: {
    heading: "How We Ranked These Words (Information Theory + Real Answers)",
    body: [
      "Most starting-word lists quote the same generic numbers from the full Wordle dictionary. We do something different: we score every candidate against the real answers we actually track, and we recompute the table every day as new answers are added.",
      "For each opener, we play it against every tracked answer and record the color pattern it would produce. Words that split the answers into many small, evenly sized groups score high; words that lump answers together score low. We measure that split two ways — entropy, in bits (higher is better), and expected answers remaining (lower is better). Both point to the same winners.",
      "Because the numbers come from answers people have genuinely seen, they reflect how an opener performs on the puzzles you're likely to face — not a theoretical dictionary average.",
    ],
  },
  topTen: {
    heading: "Top 10 Starting Words, Explained",
  },
  frequency: {
    heading: "Wordle Answer Letter Frequency (From Real Data)",
    intro:
      "These counts come straight from the answers we track. The position grid shows where each letter tends to land — useful for turning yellows into greens on your second guess.",
  },
  avoid: {
    heading: "Wordle Starting Words to Avoid",
    body: [
      "Two kinds of words waste your first guess: those built on rare letters, and those that repeat a letter. The data is blunt about both — here's how some popular picks and obvious traps actually score against real answers.",
    ],
  },
  secondWord: {
    heading: "What to Play as Your Second Word",
    body: [
      "Your second guess should clean up what the first left open. If your opener returned mostly gray tiles, switch to a word built from fresh common letters you haven't tried yet — for example, follow SLATE with a word loaded with R, O, N, and D. If you already have a green or two, lock them in and test new consonants around them.",
      "The fastest way to find that second word is to feed your current tiles into a solver, which lists every answer still possible.",
    ],
  },
  sameWord: {
    heading: "Should You Use the Same Starting Word Every Day?",
    body: [
      "Yes, for most players. Sticking with one strong opener removes a decision and lets you build intuition for how that word interacts with answers. The gap between the top ten openers is small — a fraction of a guess on average — so consistency matters more than chasing the theoretical best.",
      "If you play on Hard Mode or enjoy the challenge, rotating between two or three top openers keeps the game fresh without hurting your average.",
    ],
  },
};

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

/**
 * FAQ copy. {{...}} tokens are replaced from live stats by the page before
 * rendering and before building the FAQ schema, so text + schema agree.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "What is the best Wordle starting word?",
    answer:
      "{{bestWordFact}} It packs five common letters into their most likely positions, so it rules out more answers than any other opener we tested.",
  },
  {
    number: "02",
    question: "Is SLATE or CRANE the better starting word?",
    answer:
      "{{slateVsCraneFact}} Both are excellent and within a fraction of a guess of each other, so either is a great daily opener.",
  },
  {
    number: "03",
    question: "Why is ADIEU not a good starting word?",
    answer:
      "{{adieuFact}} ADIEU loads up on vowels but spends only one tile on a consonant, and D is fairly rare — so it gains less information than balanced openers like SLATE or CRANE.",
  },
  {
    number: "04",
    question: "What is the best starting word with the most vowels?",
    answer:
      "AUDIO and OUIJA cram in four vowels, and ARISE or AROSE balance three vowels with strong consonants. High-vowel words help on vowel-heavy answers but test fewer consonants, so they rank below all-rounders like SLATE.",
  },
  {
    number: "05",
    question: "How are these rankings calculated?",
    answer:
      "We play each opener against every real answer we track, then measure how finely it splits the field using information theory — entropy in bits and expected answers remaining. The table recomputes daily as new answers are added.",
  },
  {
    number: "06",
    question: "Does the starting word really matter?",
    answer:
      "A little. Moving from a weak opener to a strong one saves real guesses, but the difference among the top ten words is tiny — under a tenth of a guess on average. Pick one good word and stick with it.",
  },
  {
    number: "07",
    question: "What letters are most common in Wordle answers?",
    answer:
      "{{topLettersFact}} You can see the full per-position breakdown in the letter-frequency section above.",
  },
  {
    number: "08",
    question: "What should my second Wordle guess be?",
    answer:
      "Use a word built from fresh common letters your opener didn't cover, keeping any greens in place. The quickest way is to enter your tiles into the Wordle Solver to see every answer still possible.",
  },
];

/** Per-word notes for the Top 10 cards. Page falls back to a generic line. */
export const OPENER_NOTES: Record<string, string> = {
  SLATE: "Tests S, L, A, T, E — five of the most common letters, each near its favorite slot. The all-around benchmark opener.",
  CRANE: "Hits C, R, N plus the two highest-frequency vowels A and E. A WordleBot favorite and easy to remember.",
  CRATE: "Same letters as CRANE with T swapped for N — strong on common consonants and answer-final E.",
  TRACE: "Front-loads T and R, covers A and E, and ends on the very common final E. Reliable and word-friendly.",
  SLANT: "Four common consonants around a single A — great when you want to confirm structure early.",
  STARE: "Doubles down on S, T, R with A and a trailing E. Excellent green rate.",
  SNARE: "Swaps T for N versus STARE; tests N, a top consonant, alongside the A/E vowel pair.",
  LEAST: "All five letters are high-frequency, and the trailing T is a common ending.",
  STALE: "A SLATE anagram — identical letter coverage, equally efficient.",
  IRATE: "Leads with I and R, covers A and E, ends in the common E. Strong vowel spread.",
  ARISE: "Opens on A, tests R and S, and packs in I and E — three vowels without wasting tiles.",
  RAISE: "Covers R, S and three vowels (A, I, E). One of the best high-vowel openers.",
  AROSE: "Three distinct vowels plus R and S — wide coverage in a single guess.",
  ROAST: "Tests R, S, T and the common vowels O and A; great consonant frame.",
  LEARN: "Covers L, R, N and the A/E vowels — strong on the most frequent consonants.",
  ALTER: "An anagram of ALERT and LATER; balanced common letters with a trailing R.",
  OCEAN: "Three vowels (O, E, A) plus C and N — useful for vowel-heavy answers.",
  ATONE: "Spreads A, O, E across the word with T and N. Good vowel coverage.",
  NOTES: "Tests N, T, S and the O/E vowels; ends on the very common S.",
  STORE: "S, T, R plus O and a trailing E — common consonants and a frequent ending.",
  TEARS: "All five letters rank highly, with the common S ending and A/E vowels.",
  RATES: "An anagram of TEARS/STARE — same efficient coverage, different order.",
  TRAIN: "Front-loads T and R, tests two vowels, and ends on the common N.",
};
