import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-u.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "U",
  path: "/5-letter-words/ending-with-u",
  lastUpdated: "2026-06-24",
  topOpener: "ADIEU",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in U — with honest advice on why Wordle answers almost never end in U, and why ADIEU is famous as an opener rather than an answer.",
  introExtra:
    "U is the rarest ending of all in Wordle: official answers essentially never end in U. The single common answer-pool word that does is BAYOU, sitting in the tiny _ _ _ O U family. The reason most players look this page up is ADIEU — a famous opening word in the _ _ _ E U family that tests four vowels (A, I, E, U) at once. Be honest about what's here: there is almost nothing to 'solve' on a U ending; the value is understanding ADIEU as a vowel-probing opener and remembering BAYOU exists.",
  openersIntro:
    "There is no real 'solving' a U ending — so this page is mostly about ADIEU as an opener. The two distinct-letter picks below are the entire usable set; ADIEU is the famous one, valued for its vowels rather than for being a likely answer.",
  openers: [
    { word: "ADIEU", tests: "A · D · I · E · U", why: "A famous opening word that tests four vowels at once — A, I, E and U — making it a superb way to map the puzzle's vowel skeleton on move one. It is a guess, not a likely answer.", best: true },
    { word: "BAYOU", tests: "B · A · Y · O · U", why: "The one common answer-pool word ending in U — distinct letters testing the vowels A, O and U plus B and Y." },
  ],
  strategyParagraphs: [
    "First, accept the truth: Wordle answers essentially never end in U. This is the rarest ending of all, and a green U in the last slot is so unusual that there is barely a word to solve toward — the one common answer-pool candidate is BAYOU.",
    "Walk the two tiny families. -OU has BAYOU, the lone realistic answer. -EU has ADIEU, which you should think of as a guess rather than an answer — it is famous purely for testing four vowels at once, not for being a solution.",
    "Be honest about why you're here. The real value of U-enders is the opener ADIEU: playing it first reveals which of A, I, E and U are in the answer, which is brilliant for vowel-mapping. Don't expect to ever solve a word ending in U — just keep BAYOU in mind for the rare day it matters.",
  ],
  faq: [
    { question: "How many 5-letter words end in U?", answer: "U is the rarest final letter in Wordle: official answers essentially never end in U. There are {N} valid five-letter words ending in U in the dictionary, but only {COMMON} is a common answer-pool word — BAYOU, in the tiny -OU family. ADIEU is a valid guess, not a likely answer." },
    { question: "What is the best Wordle word ending in U?", answer: "ADIEU is the best-known U-ender, but as an opener rather than an answer: it tests four vowels at once (A, I, E, U), which makes it a superb vowel-mapping first guess. The only common word that actually ends in U as a possible answer is BAYOU." },
    { question: "Which 5-letter words ending in U have been Wordle answers?", answer: "{ANSWERED} U-ending words have appeared as official Wordle answers in the puzzles we track — none have, which reflects how Wordle answers essentially never end in U. BAYOU is the one common candidate, but it has not been used as a solution to date — see the full list in our answer archive." },
    { question: "What 5-letter words end in -OU or -EU?", answer: "These are the only relevant U endings. -OU has BAYOU, the one realistic answer-pool word. -EU has ADIEU, which is famous as a vowel-testing opener rather than as a solution. There is essentially nothing else common in this space." },
    { question: "Are 5-letter words ending in U good Wordle starters?", answer: "ADIEU is — but in an unusual way. It is a weak guess for finding consonants, yet a brilliant one for mapping vowels, since it tests A, I, E and U in a single move. Beyond ADIEU, there is little reason to open with a U-ender; pair ADIEU with a consonant-heavy second guess for the best results." },
    { question: "What are 5-letter words ending in U with lots of vowels?", answer: "ADIEU carries four vowels (A, I, E, U) and BAYOU carries three (A, O, U) — between them they cover every vowel except a doubled one, which is exactly why ADIEU is prized for mapping the puzzle's vowel skeleton on move one." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
