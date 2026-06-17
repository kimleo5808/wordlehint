import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "U",
  path: "/5-letter-words/starting-with-u",
  lastUpdated: "2026-06-17",
  topOpener: "UNTIE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with U — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "U is a vowel but an uncommon first letter, so you will usually reach this list after locking a green U in position one. When that happens, the quickest route to the answer is pinning the second vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "There are not many U-words, so if you want to lead with one, pick the options that test the most vowels and common consonants in a single guess.",
  openers: [
    { word: "UNTIE", tests: "U · N · T · I · E", why: "Three vowels (U, I, E) plus the common N and T — the strongest all-round U opener.", best: true },
    { word: "UNDER", tests: "U · N · D · E · R", why: "Tests U and E with the high-value N, D and R." },
    { word: "ULTRA", tests: "U · L · T · R · A", why: "Covers U and A plus the frequent L, T and R consonants." },
    { word: "USHER", tests: "U · S · H · E · R", why: "Tests U and E with the high-value S, H and R." },
    { word: "URINE", tests: "U · R · I · N · E", why: "Three vowels (U, I, E) with R and N for balance." },
    { word: "UNITE", tests: "U · N · I · T · E", why: "Another three-vowel opener (U, I, E) testing N and T." },
    { word: "UNCLE", tests: "U · N · C · L · E", why: "Tests U and E with the common N, C and L." },
  ],
  strategyParagraphs: [
    "Because U is an uncommon first letter, you will usually arrive here with a confirmed green U. Spend your next guess on the second vowel — many U-words carry one in position two or three.",
    "U is often followed by N, R, S, L or P, or by another vowel (UI, UO). Testing that second letter quickly narrows the small field of U-words.",
    "There are only a couple hundred U-words and few are common answers, so once you confirm the second vowel you are usually close. Watch the UN- prefix family (UNDER, UNTIE, UNITE, UNZIP).",
  ],
  faq: [
    { question: "How many 5-letter words start with U?", answer: "There are {N} five-letter words starting with U in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with U?", answer: "UNTIE is the strongest U opener: it tests three vowels (U, I, E) plus the common N and T. UNDER and UNITE are close alternatives. Because U is uncommon as a first letter, A- or S-words are stronger as a very first guess." },
    { question: "Which 5-letter words starting with U have been Wordle answers?", answer: "{ANSWERED} U-words have already appeared as official Wordle answers in the puzzles we track — past ones include ULTRA, UNDER and USHER. Since the NYT almost never repeats a solution, those are lower-probability picks for today." },
    { question: "What are the best 5-letter U words with lots of vowels?", answer: "UNTIE, UNITE, URINE and USAGE each carry three vowels, which makes them the most efficient way to map the puzzle early in a Wordle game." },
    { question: "What 5-letter words start with U and end with E?", answer: "Common ones include UNTIE, UNITE, USAGE, UNDUE and URINE. The U _ _ _ E pattern is worth knowing because U-words are few enough that the ending narrows the answer fast." },
    { question: "Are there 5-letter U words that work well in hard mode?", answer: "Yes. Words like ULCER, UNZIP, USURP and UNLIT help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
