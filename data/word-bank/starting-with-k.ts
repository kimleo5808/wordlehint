import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "K",
  path: "/5-letter-words/starting-with-k",
  lastUpdated: "2026-06-17",
  topOpener: "KNIFE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with K — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "K is a rare opening letter in Wordle, so you will usually reach this list after locking a green K in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "There are not many K-words, so if you want to lead with one, pick the options that test the most common vowels and consonants in a single guess.",
  openers: [
    { word: "KNIFE", tests: "K · N · I · F · E", why: "Tests the I/E vowels plus the frequent N — the strongest all-round K opener.", best: true },
    { word: "KAPUT", tests: "K · A · P · U · T", why: "Covers A and U with the common P and T consonants." },
    { word: "KUDOS", tests: "K · U · D · O · S", why: "Tests the O/U vowel pair plus the high-value S." },
    { word: "KNEAD", tests: "K · N · E · A · D", why: "Probes E and A with N and D consonants." },
    { word: "KETCH", tests: "K · E · T · C · H", why: "Tests E plus the common T, C and H consonants." },
    { word: "KENDO", tests: "K · E · N · D · O", why: "Covers E and O with the frequent N and D." },
    { word: "KIOSK", tests: "K · I · O · S · K", why: "Good for testing the I/O vowels and S (note the repeated K)." },
  ],
  strategyParagraphs: [
    "Because K is so rare as a first letter, you will usually arrive here with a confirmed green K. Spend your next guess on the vowel and the second consonant.",
    "Watch the KN- family. Many common K-words start with a silent K (KNIFE, KNEEL, KNACK, KNOWN), so test N early. Otherwise K is followed directly by a vowel (KA, KE, KI, KO, KU).",
    "There are only a few dozen common K-words, so once you confirm the vowel you are usually one good guess from the answer. Watch for the K _ _ _ Y ending (KINKY, KITTY, KOOKY).",
  ],
  faq: [
    { question: "How many 5-letter words start with K?", answer: "There are {N} five-letter words starting with K in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with K?", answer: "KNIFE is the strongest K opener: it tests K, N, I, F and E, covering two vowels and a frequent consonant. KAPUT and KUDOS are good alternatives. Because K is rare, A- or S-words are far stronger as a first guess — K-words only make sense once the first letter is confirmed." },
    { question: "Which 5-letter words starting with K have been Wordle answers?", answer: "{ANSWERED} K-words have already appeared as official Wordle answers in the puzzles we track — past ones include KNEEL, KNACK and KAYAK. Since the NYT almost never repeats a solution, those are lower-probability picks for today." },
    { question: "What are good 5-letter K words with lots of vowels?", answer: "KUDOS, KAPUT and KOALA each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with K and end with E?", answer: "Common ones include KNIFE, KEDGE and KNAVE. K-words ending in E are uncommon, so these stand out when you know the answer fits the K _ _ _ E pattern." },
    { question: "Are there 5-letter K words that work well in hard mode?", answer: "Yes. Words like KNELT, KRILL and KIOSK help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
