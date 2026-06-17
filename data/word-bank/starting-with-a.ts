import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/starting-with-a.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "A",
  path: "/5-letter-words/starting-with-a",
  lastUpdated: "2026-06-17",
  topOpener: "AROSE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with A — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "A is the most common vowel in five-letter Wordle answers, so words starting with A double as some of the best openers in the game. Whether you have locked a green A in position one or just want a strong first guess, this page lists every valid option and flags the ones worth playing.",
  openersIntro:
    "Words starting with A shine as openers because they let you test multiple vowels at once. The best picks below balance vowel coverage with high-frequency consonants like R, S, T and N.",
  openers: [
    { word: "AROSE", tests: "A · R · O · S · E", why: "Tests A, O and E alongside the two most common consonants (R, S) — the strongest all-round A opener.", best: true },
    { word: "ADIEU", tests: "A · D · I · E · U", why: "Packs four of the five vowels (A, I, E, U) into one guess to map the vowel skeleton instantly." },
    { word: "AUDIO", tests: "A · U · D · I · O", why: "Another four-vowel opener (A, U, I, O); ideal when you want to rule vowels in or out fast." },
    { word: "ARISE", tests: "A · R · I · S · E", why: "An anagram of AROSE that swaps O for I — equally strong and a great second guess." },
    { word: "ALONE", tests: "A · L · O · N · E", why: "Tests the frequent L and N consonants while still covering three vowels." },
    { word: "ALTER", tests: "A · L · T · E · R", why: "Heavy on common consonants (L, T, R) for players who prefer consonant-first coverage." },
    { word: "ANGEL", tests: "A · N · G · E · L", why: "Useful follow-up that probes G and N together with two top vowels." },
  ],
  strategyParagraphs: [
    "When the first tile is a green A, your job is to nail the second vowel and the consonant cluster. Because A pairs with so many letters, lean on a vowel-heavy second guess to narrow things quickly.",
    "Watch the second letter closely — AB, AC, AL, AM, AN, AR and AS are all dense families. A gray tile in position two eliminates a huge slice of the remaining words at once.",
    "Many A-words double a vowel or place a second A later (AGATE, ALOHA, ABACK), and silent endings like the A _ _ _ E pattern (ABIDE, ARGUE, AMAZE) are extremely common — keep both in mind.",
  ],
  faq: [
    { question: "How many 5-letter words start with A?", answer: "There are {N} five-letter words starting with A in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with A?", answer: "AROSE is the strongest A opener: it tests A, R, O, S and E, five of the most frequent letters in Wordle answers. If you prefer maximum vowel coverage, ADIEU and AUDIO each test four vowels in a single guess." },
    { question: "Which 5-letter words starting with A have been Wordle answers?", answer: "{ANSWERED} A-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are the best 5-letter A words with lots of vowels?", answer: "ADIEU and AUDIO each contain four vowels, while AROSE, ARISE, ALONE and ABODE pack three. These vowel-rich words are the most efficient way to map the puzzle early in a Wordle game." },
    { question: "What 5-letter words start with A and end with E?", answer: "Common ones include ABIDE, ALONE, ARGUE, AMAZE, ABODE and AROSE. The A _ _ _ E pattern is one of the most frequent shapes among Wordle answers, so it is worth memorising." },
    { question: "Are there 5-letter A words that work well in hard mode?", answer: "Yes. Consonant-balanced words like ALERT, ALTER, ANGEL and AMBER help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
