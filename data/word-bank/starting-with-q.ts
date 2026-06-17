import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "Q",
  path: "/5-letter-words/starting-with-q",
  lastUpdated: "2026-06-17",
  topOpener: "QUIET",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with Q — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "Q is the rarest opening letter in Wordle, and nearly every Q-word is followed by U. You will almost always reach this list after locking a green Q, so the real job is finding the vowel that comes after QU.",
  openersIntro:
    "Because almost all Q-words begin with QU, the best openers spend their remaining three letters on common vowels and consonants to map the rest of the word fast.",
  openers: [
    { word: "QUIET", tests: "Q · U · I · E · T", why: "Three vowels (U, I, E) plus the common T — the strongest all-round Q opener.", best: true },
    { word: "QUITE", tests: "Q · U · I · T · E", why: "Same letters as QUIET in a different order; equally strong vowel coverage." },
    { word: "QUOTA", tests: "Q · U · O · T · A", why: "Three vowels (U, O, A) with the frequent T." },
    { word: "QUERY", tests: "Q · U · E · R · Y", why: "Tests U and E plus the high-value R and Y." },
    { word: "QUILT", tests: "Q · U · I · L · T", why: "Covers U and I with the common L and T consonants." },
    { word: "QUACK", tests: "Q · U · A · C · K", why: "Tests U and A with C and K." },
    { word: "QUASH", tests: "Q · U · A · S · H", why: "Probes U and A with the high-value S and H." },
  ],
  strategyParagraphs: [
    "Q is the least common first letter in Wordle, so you will nearly always arrive here with a confirmed green Q. The key fact: almost every five-letter Q-word is QU—, so U is your safest second guess.",
    "Once QU is locked, the puzzle is really a three-letter problem. Focus your next guess on the third-position vowel — QUIET, QUOTA and QUACK each test a different one (I, O, A).",
    "There are only a couple dozen common Q-words, so confirming the vowel after QU usually leaves just a handful of candidates. Watch the QUI- and QUA- families especially.",
  ],
  faq: [
    { question: "How many 5-letter words start with Q?", answer: "There are {N} five-letter words starting with Q in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with Q?", answer: "QUIET is the strongest Q opener: it tests Q, U, I, E and T — three vowels plus a frequent consonant. QUITE and QUOTA are close alternatives. Because Q is so rare, A- or S-words are far stronger as a first guess." },
    { question: "Do all 5-letter words starting with Q have a U second?", answer: "Almost all of them do. The vast majority of five-letter Q-words are QU— words, so once you have a green Q you can play U with very high confidence and spend the rest of your guesses on the vowel that follows." },
    { question: "Which 5-letter words starting with Q have been Wordle answers?", answer: "{ANSWERED} Q-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words start with Q and end with E?", answer: "Common ones include QUITE, QUOTE, QUEUE and QUAKE. The Q _ _ _ E pattern is worth knowing because Q-words are so few that the ending narrows the answer fast." },
    { question: "Are there 5-letter Q words that work well in hard mode?", answer: "Yes. Words like QUIRK, QUASH and QUELL help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
