import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "O",
  path: "/5-letter-words/starting-with-o",
  lastUpdated: "2026-06-17",
  topOpener: "OCEAN",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with O — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "O is a vowel, so O-words double as useful openers that test several vowels at once. Whether you are choosing a first guess or have locked a green O in position one, the words below are sorted to get you to the answer fast.",
  openersIntro:
    "The best O openers stack two or three vowels with high-frequency consonants like N, R and S. These give you the most board coverage on a single guess.",
  openers: [
    { word: "OCEAN", tests: "O · C · E · A · N", why: "Three vowels (O, E, A) plus the common C and N — the strongest all-round O opener and a past answer.", best: true },
    { word: "ORATE", tests: "O · R · A · T · E", why: "Another three-vowel opener (O, A, E) that also tests the high-value R and T." },
    { word: "OTHER", tests: "O · T · H · E · R", why: "Covers O and E with the frequent T, H and R." },
    { word: "OPERA", tests: "O · P · E · R · A", why: "Three vowels (O, E, A) with P and R to map the vowels early." },
    { word: "ORGAN", tests: "O · R · G · A · N", why: "Tests O and A plus the high-value R, G and N." },
    { word: "OLIVE", tests: "O · L · I · V · E", why: "Probes O, I and E with L and the rarer V." },
    { word: "OUNCE", tests: "O · U · N · C · E", why: "Three vowels (O, U, E) with N and C for balance." },
  ],
  strategyParagraphs: [
    "Because O is a vowel, an O-word makes a reasonable opener — but if you have already locked a green O, switch focus to the second vowel and the consonant cluster around it.",
    "O is frequently followed by another vowel (OA, OI, OO, OU) or by N, R and V. Testing that second letter quickly tells you whether you are dealing with a vowel-vowel start.",
    "Watch for a repeated O later in the word (BLOOD-style patterns do not apply here, but ONION and OZONE place a second O), and the O _ _ _ E ending is a common Wordle answer shape.",
  ],
  faq: [
    { question: "How many 5-letter words start with O?", answer: "There are {N} five-letter words starting with O in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with O?", answer: "OCEAN is the strongest O opener: it tests three vowels (O, E, A) plus the common C and N, and has itself been a Wordle answer. ORATE and OPERA are excellent alternatives, each packing three vowels." },
    { question: "Which 5-letter words starting with O have been Wordle answers?", answer: "{ANSWERED} O-words have already appeared as official Wordle answers in the puzzles we track — past ones include OCEAN and OZONE. Since the NYT almost never repeats a solution, those are lower-probability picks for today." },
    { question: "What are the best 5-letter O words with lots of vowels?", answer: "OCEAN, ORATE, OPERA and OUIJA each carry three vowels, which makes them the most efficient way to map the puzzle early in a Wordle game." },
    { question: "What 5-letter words start with O and end with E?", answer: "Common ones include OLIVE, OUNCE, OZONE, OBESE, OXIDE and OPINE. The O _ _ _ E pattern is a frequent shape among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter O words that work well in hard mode?", answer: "Yes. Consonant-balanced words like ORBIT, OPTIC, OUGHT and OZONE help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
