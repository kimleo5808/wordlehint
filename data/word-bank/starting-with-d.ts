import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/starting-with-d.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "D",
  path: "/5-letter-words/starting-with-d",
  lastUpdated: "2026-06-17",
  topOpener: "DEALT",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with D — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "D is not one of the top opening letters in Wordle, so most players reach this list after locking a green D in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "If you want to lead with a D-word, the best picks combine two common vowels with high-frequency consonants like R, L and T. These give you the most board coverage on a single guess.",
  openers: [
    { word: "DEALT", tests: "D · E · A · L · T", why: "Tests the two most common vowels (E, A) plus the frequent L and T — the strongest all-round D opener.", best: true },
    { word: "DRAIN", tests: "D · R · A · I · N", why: "Pairs the high-value R with the A/I vowels and N; excellent coverage." },
    { word: "DARES", tests: "D · A · R · E · S", why: "Combines A and E with two of the most useful consonants, R and S." },
    { word: "DANCE", tests: "D · A · N · C · E", why: "Probes the common N and C consonants alongside A and E." },
    { word: "DRONE", tests: "D · R · O · N · E", why: "Good for testing O and N while still covering R and E." },
    { word: "DOUSE", tests: "D · O · U · S · E", why: "Vowel-heavy: tests O, U and E in one guess to map the vowels fast." },
    { word: "DAIRY", tests: "D · A · I · R · Y", why: "Useful follow-up that probes the A/I vowels with R and Y." },
  ],
  strategyParagraphs: [
    "Because D rarely makes the best opener, you will usually land here with a confirmed green D. Spend your next guess on the vowel — most five-letter D words carry their first vowel in position two.",
    "Watch the D blends. DR is by far the most common, but D is also followed directly by every vowel — DA, DE, DI, DO and DU all have plenty of words. A gray second letter rules out a whole branch at once.",
    "Keep double letters and endings in mind. Words like DADDY and DODGY repeat a later letter, and the D _ _ _ E and D _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with D?", answer: "There are {N} five-letter words starting with D in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with D?", answer: "DEALT is the strongest D opener: it tests D, E, A, L and T, covering two top vowels and two frequent consonants. DRAIN and DARES are close alternatives. Note that A- or S-words are statistically stronger as a very first guess — D-words shine once you have confirmed the first letter." },
    { question: "Which 5-letter words starting with D have been Wordle answers?", answer: "{ANSWERED} D-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter D words with lots of vowels?", answer: "DOUSE, DAUNT, DIODE and DEUCE each pack two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with D and end with E?", answer: "Common ones include DANCE, DRONE, DODGE, DRIVE, DOUSE and DELVE. The D _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter D words that work well in hard mode?", answer: "Yes. Consonant-rich words like DWELT, DRIFT, DRUNK and DROLL help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
