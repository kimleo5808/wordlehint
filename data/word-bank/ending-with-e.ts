import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-e.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "E",
  path: "/5-letter-words/ending-with-e",
  lastUpdated: "2026-06-24",
  topOpener: "SLATE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in E — common answer-pool words first, with the strongest E-ending openers and past Wordle answers flagged.",
  introExtra:
    "E is the most common final letter in five-letter Wordle answers, which is exactly why so many elite opening words — SLATE, CRANE, TRACE, ARISE — happen to end in it. Whether you have locked a green E in the last slot or just want a high-coverage first guess, this page lists every valid option and flags the ones worth playing.",
  openersIntro:
    "Words ending in E make unusually strong openers because they pair the game's most frequent letter with high-value consonants like S, T, R, L and N. The picks below balance vowel coverage with the consonants that appear most often in real answers.",
  openers: [
    { word: "SLATE", tests: "S · L · A · T · E", why: "Tests five of the most frequent letters in Wordle answers (S, L, A, T, E) — consistently rated one of the best openers in the game.", best: true },
    { word: "CRANE", tests: "C · R · A · N · E", why: "A WordleBot favourite: probes the common C, R, N consonants around two top vowels (A, E)." },
    { word: "TRACE", tests: "T · R · A · C · E", why: "An anagram of CRATE that front-loads T and R while still ending in E — excellent average performance." },
    { word: "STARE", tests: "S · T · A · R · E", why: "Covers S, T, R together with A and E; a great alternative if you have already ruled out L." },
    { word: "ARISE", tests: "A · R · I · S · E", why: "Vowel-rich opener (A, I, E) that also tests R and S — ideal when you want to map vowels fast." },
    { word: "SNARE", tests: "S · N · A · R · E", why: "Swaps in N for players who want to test that frequent consonant early." },
    { word: "AROSE", tests: "A · R · O · S · E", why: "Three vowels (A, O, E) plus R and S — a strong opener that overlaps heavily with the answer pool." },
  ],
  strategyParagraphs: [
    "When the last tile is a green E, your real puzzle is the 4th letter — the consonant or vowel sitting right before it. Nail that and the word usually collapses to a handful of options.",
    "Lean on the dense families. The most common shapes ending in E are the _ _ _ S E (CHASE, CLOSE, RAISE), _ _ _ L E (TABLE, APPLE, AISLE), _ _ _ T E (ELITE, QUOTE, CRATE), _ _ _ R E (SCORE, SNARE, STORE) and _ _ _ N E (ALONE, CRANE, STONE) patterns — work through them in roughly that order.",
    "Watch for doubled letters and silent-E vowel shifts: words like EERIE, ELATE, ABODE and AMAZE are common answers, and a second E earlier in the word (THESE, SCENE, GEESE) is easy to overlook once you have one E locked at the end.",
  ],
  faq: [
    { question: "How many 5-letter words end in E?", answer: "There are {N} five-letter words ending in E in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle word ending in E?", answer: "SLATE is the strongest E-ending pick: it tests S, L, A, T and E, five of the most frequent letters in Wordle answers. CRANE and TRACE are nearly as good, which is why so many top openers happen to end in E." },
    { question: "Which 5-letter words ending in E have been Wordle answers?", answer: "{ANSWERED} E-ending words have already appeared as official Wordle answers in the puzzles we track, including SMILE, AMAZE, SNORE and PLUME. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -SE, -LE or -TE?", answer: "These are the densest endings. -SE includes CHASE, CLOSE and RAISE; -LE includes TABLE, APPLE and AISLE; -TE includes ELITE, QUOTE and CRATE. Memorising these families makes E-ending puzzles much faster." },
    { question: "Are 5-letter words ending in E good Wordle starters?", answer: "Yes. Because E is the most common letter in answers, E-ending words like SLATE, CRANE and ARISE double as high-coverage openers. Just make sure your follow-up guess tests fresh consonants you have not tried yet." },
    { question: "What are 5-letter words ending in E with lots of vowels?", answer: "ARISE, AROSE, ADOBE, ABODE, AZURE, ARGUE, AMAZE and OZONE each pack three or more vowels while ending in E. They are an efficient way to map the puzzle's vowel skeleton early." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
