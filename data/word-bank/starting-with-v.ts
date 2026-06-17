import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "V",
  path: "/5-letter-words/starting-with-v",
  lastUpdated: "2026-06-17",
  topOpener: "VOICE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with V — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "V is a rare opening letter in Wordle, so you will usually reach this list after locking a green V in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "There are not many V-words, so if you want to lead with one, pick the options that test the most vowels and common consonants in a single guess.",
  openers: [
    { word: "VOICE", tests: "V · O · I · C · E", why: "Three vowels (O, I, E) plus the common C — the strongest all-round V opener.", best: true },
    { word: "VALUE", tests: "V · A · L · U · E", why: "Three vowels (A, U, E) with the frequent L." },
    { word: "VAGUE", tests: "V · A · G · U · E", why: "Three vowels (A, U, E) testing G as well." },
    { word: "VAULT", tests: "V · A · U · L · T", why: "Covers A and U with the common L and T consonants." },
    { word: "VIDEO", tests: "V · I · D · E · O", why: "Three vowels (I, E, O) with D to map the vowels early." },
    { word: "VAPOR", tests: "V · A · P · O · R", why: "Tests A and O plus the high-value P and R." },
    { word: "VIXEN", tests: "V · I · X · E · N", why: "Useful for testing the rare X alongside I, E and N." },
  ],
  strategyParagraphs: [
    "Because V is rare as a first letter, you will usually arrive here with a confirmed green V. Spend your next guess on the vowel — almost every V-word carries one in position two.",
    "V is followed directly by a vowel in nearly every word (VA, VE, VI, VO), so nailing that second letter splits the small field of V-words almost immediately.",
    "There are only a couple hundred V-words, so once you confirm the vowel you are usually close. Watch the V _ _ _ E ending, which covers many common V-words (VOICE, VALUE, VERSE, VENUE).",
  ],
  faq: [
    { question: "How many 5-letter words start with V?", answer: "There are {N} five-letter words starting with V in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with V?", answer: "VOICE is the strongest V opener: it tests three vowels (O, I, E) plus the common C. VALUE and VAGUE are close alternatives, each packing three vowels. Because V is rare, A- or S-words are stronger as a very first guess." },
    { question: "Which 5-letter words starting with V have been Wordle answers?", answer: "{ANSWERED} V-words have already appeared as official Wordle answers in the puzzles we track — past ones include VOICE, VALUE and VIVID. Since the NYT almost never repeats a solution, those are lower-probability picks for today." },
    { question: "What are the best 5-letter V words with lots of vowels?", answer: "VOICE, VALUE, VAGUE and VIDEO each carry three vowels, which makes them the most efficient way to map the puzzle early in a Wordle game." },
    { question: "What 5-letter words start with V and end with E?", answer: "Common ones include VOICE, VALUE, VERSE, VENUE, VOGUE and VERVE. The V _ _ _ E pattern covers a large share of common V-words, so it is worth knowing." },
    { question: "Are there 5-letter V words that work well in hard mode?", answer: "Yes. Words like VINYL, VYING, VOMIT and VAULT help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
