import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-t.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "T",
  path: "/5-letter-words/ending-with-t",
  lastUpdated: "2026-06-24",
  topOpener: "LEAST",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in T — common answer-pool words first, with the strongest T-ending openers and past Wordle answers flagged.",
  introExtra:
    "T is one of the most common final letters in five-letter Wordle answers, and several elite openers happen to end in it. LEAST is an anagram of SLATE and STALE, and REACT is an anagram of TRACE and CRATE — so a strong T-ending guess can double as a top-tier opener. Whether you have locked a green T in the last slot or just want a high-coverage first guess, this page lists every valid option and flags the ones worth playing.",
  openersIntro:
    "Words ending in T make excellent openers because they pair the frequent T with high-value letters like S, A, R, E, L and N. The picks below balance vowel coverage with the consonants that show up most often in real answers — several are anagrams of the best openers in the game.",
  openers: [
    { word: "LEAST", tests: "L · E · A · S · T", why: "Tests five of the most frequent letters in Wordle answers (L, E, A, S, T) — an anagram of SLATE and STALE, so it is essentially the best opener in the game that ends in T.", best: true },
    { word: "ROAST", tests: "R · O · A · S · T", why: "Five distinct high-value letters that bring O and R coverage; a great alternative when you want to test those vowels and consonants early." },
    { word: "REACT", tests: "R · E · A · C · T", why: "An anagram of TRACE and CRATE that probes the useful C while keeping R, E and A — strong average performance." },
    { word: "SAINT", tests: "S · A · I · N · T", why: "Brings the vowel I together with the frequent N; ideal when you want to map I and N fast." },
    { word: "PAINT", tests: "P · A · I · N · T", why: "Same I and N probe as SAINT with P swapped in for players who have already ruled out S." },
    { word: "COAST", tests: "C · O · A · S · T", why: "Covers O and C around A, S and T — a solid opener once you have set L and R aside." },
  ],
  strategyParagraphs: [
    "When the last tile is a green T, your real puzzle is the 4th letter — the consonant or vowel sitting right before it. Lock that down and the word usually collapses to a short list.",
    "Lean on the dense families. The most common shapes ending in T are the _ _ _ N T (GIANT, PLANT, COUNT, FRONT, POINT), _ _ _ S T (BEAST, FROST, GHOST, TWIST, TRUST), _ _ _ E T (ASSET, SWEET, GREET, COMET, QUIET), _ _ _ I T (ADMIT, AUDIT, HABIT, MERIT, ORBIT) and _ _ _ R T (ALERT, CHART, HEART, SHORT, START) patterns — work through them in roughly that order.",
    "Watch the consonant clusters and silent shapes: blends like _ N T, _ S T, _ L T and _ R T do most of the work, while words such as YACHT, CRYPT, TRYST and DROIT hide unusual 4th letters. If a common family is not landing, try one of those outliers before guessing.",
  ],
  faq: [
    { question: "How many 5-letter words end in T?", answer: "There are {N} five-letter words ending in T in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle word ending in T?", answer: "LEAST is the strongest T-ending pick: it tests L, E, A, S and T, five of the most frequent letters in Wordle answers, and it is an anagram of SLATE and STALE. That makes it a top-tier opener that just happens to end in T. REACT and ROAST are close behind." },
    { question: "Which 5-letter words ending in T have been Wordle answers?", answer: "{ANSWERED} T-ending words have already appeared as official Wordle answers in the puzzles we track, including SHORT, FRUIT, EIGHT, BLAST and COMET. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -NT, -ST or -ET?", answer: "These are the densest endings before T. -NT includes GIANT, PLANT and COUNT; -ST includes BEAST, FROST and TWIST; -ET includes ASSET, SWEET and COMET. Memorising these families makes T-ending puzzles much faster." },
    { question: "Are 5-letter words ending in T good Wordle starters?", answer: "Yes. Because the SLATE anagram family ends in T and pairs it with high-frequency letters, words like LEAST, REACT and ROAST double as high-coverage openers. Just make sure your follow-up guess tests fresh letters you have not tried yet." },
    { question: "What are 5-letter words ending in T with lots of vowels?", answer: "ABOUT, AUDIT, ADOPT, IDIOT, INPUT, OUGHT and QUIET each pack two or more vowels while ending in T. They are an efficient way to map the puzzle's vowel skeleton early when the last letter is already locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
