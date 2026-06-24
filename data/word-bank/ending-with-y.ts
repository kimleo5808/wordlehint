import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-y.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "Y",
  path: "/5-letter-words/ending-with-y",
  lastUpdated: "2026-06-24",
  topOpener: "EARLY",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in Y — common answer-pool words first, with the strongest Y-ending openers and past Wordle answers flagged.",
  introExtra:
    "Y is one of the most common final letters in five-letter Wordle answers — it closes a huge family of adjectives like _ _ _ L Y, _ _ _ T Y and _ _ _ D Y. But Y is rare anywhere else in a word, which makes a Y ending a position you want to know rather than guess. Whether you have locked a green Y in the last slot or just want a high-coverage first guess, this page lists every valid option and flags the ones worth playing.",
  openersIntro:
    "Words ending in Y can open well when they avoid repeated letters and pair Y with high-value letters like E, A, R, L, S and T. The picks below stick to distinct-letter words — several are anagrams of strong openers in the game.",
  openers: [
    { word: "EARLY", tests: "E · A · R · L · Y", why: "Tests four of the most frequent letters in Wordle answers (E, A, R, L) plus Y — an anagram of RELAY and LAYER, so it doubles as a genuinely strong opener that ends in Y.", best: true },
    { word: "STRAY", tests: "S · T · R · A · Y", why: "Five distinct letters bringing the high-value S, T and R around A; great coverage with no repeats." },
    { word: "ENTRY", tests: "E · N · T · R · Y", why: "E, N, T and R are all top-frequency letters — strong probing power with no wasted tiles." },
    { word: "STORY", tests: "S · T · O · R · Y", why: "Swaps O in for players who want to test that vowel alongside S, T and R." },
    { word: "DECAY", tests: "D · E · C · A · Y", why: "Tests the useful C and two vowels (E, A) — a solid change-up opener." },
    { word: "DAIRY", tests: "D · A · I · R · Y", why: "Brings the vowel I together with A and R; an efficient way to map vowels early." },
  ],
  strategyParagraphs: [
    "When the last tile is a green Y, your real puzzle is the 4th letter — the consonant sitting right before it. Lock that down and the word usually collapses to one recognisable rhyme group.",
    "Lean on the dense families. The most common shapes ending in Y are the _ _ _ L Y (APPLY, REPLY, BADLY, EARLY, MANLY), _ _ _ T Y (PARTY, NASTY, TASTY, EMPTY, FIFTY), _ _ _ D Y (CANDY, HANDY, READY, STUDY, ROWDY), _ _ _ R Y (ANGRY, BERRY, STORY, WORRY, GLORY), _ _ _ K Y (LUCKY, ROCKY, RISKY, PESKY, MURKY) and _ _ _ N Y (FUNNY, SUNNY, PENNY, IRONY, HONEY) patterns — work through them in roughly that order.",
    "Watch the double-letter trap: Y endings hide more repeated letters than any other final letter — BELLY, JOLLY, PUPPY, FIZZY, MUDDY, FUNNY, SORRY and HOBBY all double a consonant before the family vowel. If your single-letter guesses keep fizzling, test for a doubled letter before guessing again.",
  ],
  faq: [
    { question: "How many 5-letter words end in Y?", answer: "There are {N} five-letter words ending in Y in the full Wordle dictionary of valid guesses — the largest of any ending letter. Of those, {COMMON} are common, everyday words from the official Wordle answer pool, the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle word ending in Y?", answer: "EARLY is the strongest Y-ending pick: it tests E, A, R, L and Y, four of the most frequent letters in Wordle answers, and it is an anagram of RELAY and LAYER. That makes it a strong opener that just happens to end in Y. STRAY and ENTRY are close behind." },
    { question: "Which 5-letter words ending in Y have been Wordle answers?", answer: "{ANSWERED} Y-ending words have already appeared as official Wordle answers in the puzzles we track, including ENTRY, GRAVY, IVORY, HASTY and FLAKY. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -LY, -TY or -DY?", answer: "These are the densest endings before Y. -LY includes BADLY, APPLY and EARLY; -TY includes PARTY, NASTY and EMPTY; -DY includes CANDY, READY and STUDY. Memorising these rhyme families makes Y-ending puzzles much faster." },
    { question: "Are 5-letter words ending in Y good Wordle starters?", answer: "Some are. A distinct-letter Y-ender like EARLY, ENTRY or STRAY makes a solid opener, but most Y-ending words fall into rhyming families with repeated letters (BELLY, FUNNY, PUPPY), which waste guesses. Stick to the no-repeat picks, and test fresh letters on guess two." },
    { question: "What are 5-letter words ending in Y with lots of vowels?", answer: "ARRAY, ALLOY, ANNOY, ASSAY, DECAY, DAIRY, ESSAY and ENJOY each pack two or more vowels while ending in Y. They are an efficient way to map the puzzle's vowel skeleton early when the last letter is already locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
