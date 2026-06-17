import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "J",
  path: "/5-letter-words/starting-with-j",
  lastUpdated: "2026-06-17",
  topOpener: "JOINT",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with J — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "J is one of the rarest opening letters in Wordle, so you will almost always reach this list after locking a green J in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "There are not many J-words, so if you want to lead with one, pick the options that test the most common vowels and consonants in a single guess.",
  openers: [
    { word: "JOINT", tests: "J · O · I · N · T", why: "Tests the O/I vowel pair plus the frequent N and T — the strongest all-round J opener.", best: true },
    { word: "JOIST", tests: "J · O · I · S · T", why: "Swaps N for the high-value S; equally strong coverage." },
    { word: "JAUNT", tests: "J · A · U · N · T", why: "Covers A and U with the common N and T consonants." },
    { word: "JUICE", tests: "J · U · I · C · E", why: "Three vowels (U, I, E) to map the vowel skeleton early." },
    { word: "JUDGE", tests: "J · U · D · G · E", why: "Tests U and E plus the D and G consonants." },
    { word: "JOKER", tests: "J · O · K · E · R", why: "Probes O, E and the high-value R together with K." },
    { word: "JUMPY", tests: "J · U · M · P · Y", why: "Useful for testing the U vowel plus M, P and Y." },
  ],
  strategyParagraphs: [
    "Because J is so rare as a first letter, you will nearly always arrive here with a confirmed green J. Spend your next guess on the vowel — every five-letter J word carries its first vowel in position two.",
    "J is followed directly by a vowel in almost every word (JA, JE, JO, JU), so nailing that second letter splits the small field of J-words almost immediately.",
    "There are only a few dozen common J-words, so once you confirm the vowel you are usually one good guess from the answer. Watch for the J _ _ _ Y ending (JAZZY, JOLLY, JERKY).",
  ],
  faq: [
    { question: "How many 5-letter words start with J?", answer: "There are {N} five-letter words starting with J in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with J?", answer: "JOINT is the strongest J opener: it tests J, O, I, N and T, covering two vowels and two frequent consonants. JOIST and JAUNT are close alternatives. Because J is so rare, A- or S-words are far stronger as a first guess — J-words only make sense once the first letter is confirmed." },
    { question: "Which 5-letter words starting with J have been Wordle answers?", answer: "{ANSWERED} J-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter J words with lots of vowels?", answer: "JUICE and JOUST each carry multiple vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with J and end with E?", answer: "Common ones include JUDGE and JUICE. J-words ending in E are uncommon, so these stand out when you know the answer fits the J _ _ _ E pattern." },
    { question: "Are there 5-letter J words that work well in hard mode?", answer: "Yes. Words like JOIST, JAUNT and JUMPY help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
