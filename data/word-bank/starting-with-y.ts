import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "Y",
  path: "/5-letter-words/starting-with-y",
  lastUpdated: "2026-06-17",
  topOpener: "YEARN",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with Y — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "Y is an uncommon opening letter in Wordle, so most players reach this list after locking a green Y in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "There are not many Y-words, so if you want to lead with one, pick the options that test the most common vowels and consonants in a single guess.",
  openers: [
    { word: "YEARN", tests: "Y · E · A · R · N", why: "Tests E and A with the high-value R and N — the strongest all-round Y opener.", best: true },
    { word: "YEAST", tests: "Y · E · A · S · T", why: "Covers E and A plus the high-value S and T." },
    { word: "YACHT", tests: "Y · A · C · H · T", why: "Tests A with the common C, H and T consonants." },
    { word: "YOUNG", tests: "Y · O · U · N · G", why: "Covers O and U with the frequent N and G." },
    { word: "YIELD", tests: "Y · I · E · L · D", why: "Tests the I/E vowels with L and D." },
    { word: "YOUTH", tests: "Y · O · U · T · H", why: "Covers O and U with the common T and H." },
    { word: "YODEL", tests: "Y · O · D · E · L", why: "Tests O and E with D and L." },
  ],
  strategyParagraphs: [
    "Because Y rarely makes the best opener, you will usually land here with a confirmed green Y. Spend your next guess on the vowel — most Y-words carry one in position two.",
    "Y is followed directly by a vowel in nearly every word (YA, YE, YI, YO, YU), so nailing that second letter splits the small field of Y-words quickly.",
    "Remember that Y also acts as a vowel later in the word — many five-letter answers end in Y (the _ _ _ _ Y shape is one of the most common). A leading Y plus a trailing Y is rare but possible.",
  ],
  faq: [
    { question: "How many 5-letter words start with Y?", answer: "There are {N} five-letter words starting with Y in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with Y?", answer: "YEARN is the strongest Y opener: it tests Y, E, A, R and N, covering two top vowels and two frequent consonants. YEAST and YIELD are close alternatives. Because Y is uncommon as a first letter, A- or S-words are stronger as a very first guess." },
    { question: "Which 5-letter words starting with Y have been Wordle answers?", answer: "{ANSWERED} Y-words have already appeared as official Wordle answers in the puzzles we track — past ones include YEARN, YACHT and YOUNG. Since the NYT almost never repeats a solution, those are lower-probability picks for today." },
    { question: "What are good 5-letter Y words with lots of vowels?", answer: "YEAST, YIELD, YOUTH and YOUNG each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with Y and end with E?", answer: "Five-letter words that both start with Y and end in E are very rare — there are almost none in common use. A far more useful pattern is words that simply end in Y, which is one of the most common shapes among Wordle answers." },
    { question: "Are there 5-letter Y words that work well in hard mode?", answer: "Yes. Words like YACHT, YIELD, YUCKY and YOLKS help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
