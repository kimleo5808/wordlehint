import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/starting-with-s.
 * Word LISTS come from lib/word-bank; this file holds only the hand-written,
 * differentiated copy. {N}/{COMMON}/{ANSWERED} are filled at render.
 */
export const content: LetterContent = {
  letter: "S",
  path: "/5-letter-words/starting-with-s",
  lastUpdated: "2026-06-17",
  topOpener: "SLATE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with S — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "S is the single most common opening letter among Wordle answers, which makes a solid list of five-letter S words one of the handiest things to keep nearby. Whether you have opened with an S-word or worked out that the first tile is green, this page gives you every valid option — and flags the ones worth guessing.",
  openersIntro:
    "The best S openers test the highest-frequency letters so you confirm or eliminate as much of the board as possible on guess one. Here are the strongest picks and why they work.",
  openers: [
    { word: "SLATE", tests: "S · L · A · T · E", why: "Tests five of the ten most common letters in English answers — the strongest all-round S opener.", best: true },
    { word: "STARE", tests: "S · T · A · R · E", why: "Pairs the high-value R and T consonants with two top vowels; a classic opener." },
    { word: "STORE", tests: "S · T · O · R · E", why: "Swaps in O instead of A — useful as a second guess when A is already ruled out." },
    { word: "SAINT", tests: "S · A · I · N · T", why: "Covers two vowels (A, I) plus the frequent N and T consonants." },
    { word: "SAUCE", tests: "S · A · U · C · E", why: "Vowel-heavy: tests A, U and E in one guess to pin the vowel skeleton fast." },
    { word: "SHINE", tests: "S · H · I · N · E", why: "Good for probing H and N while still testing two vowels." },
    { word: "SNORE", tests: "S · N · O · R · E", why: "Strong consonant coverage (N, R) with O and E for balance." },
  ],
  strategyParagraphs: [
    "Once you know the first tile is a green S, the game becomes a hunt for the vowel and the second letter. Most five-letter S words place their first vowel in position two or three, so test those slots early.",
    "Watch for the common S blends — SH, SC, SL, SP and ST. If your second letter turns gray, you can eliminate a whole family of words at once.",
    "Don't forget that S can repeat. Words like SASSY, SWISS and SISSY hide a second S later in the word — a frequent blind spot.",
  ],
  faq: [
    { question: "How many 5-letter words start with S?", answer: "There are {N} five-letter words starting with S in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to actually be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with S?", answer: "SLATE is the strongest opener starting with S. It tests S, L, A, T and E — five of the most frequent letters in Wordle answers — so it eliminates or confirms a large share of the board on guess one. STARE and SAINT are excellent alternatives." },
    { question: "Which 5-letter words starting with S have been Wordle answers?", answer: "{ANSWERED} S-words have already appeared as official Wordle answers in the puzzles we track. Because the NYT almost never repeats a solution, those words are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter S words with lots of vowels?", answer: "SAUCE, SUAVE, SOLAR, SIREN and SUITE each pack two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with S and end with E?", answer: "Common ones include SLATE, STONE, SHINE, SPARE, SCORE and STAGE. Words fitting the S _ _ _ E pattern are some of the most frequent answers in Wordle, so they are worth memorising." },
    { question: "Are there 5-letter S words that work well in hard mode?", answer: "Yes. Consonant-rich words like SHIRT, SPLIT, STUNK and SWIRL help when you need to confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
