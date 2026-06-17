import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "W",
  path: "/5-letter-words/starting-with-w",
  lastUpdated: "2026-06-17",
  topOpener: "WASTE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with W — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "W is an uncommon opening letter in Wordle, so most players reach this list after locking a green W in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "If you want to lead with a W-word, the best picks pair two common vowels with high-frequency consonants like S, T and R. These give you the most board coverage on a single guess.",
  openers: [
    { word: "WASTE", tests: "W · A · S · T · E", why: "Tests A and E with the high-value S and T — the strongest all-round W opener.", best: true },
    { word: "WATER", tests: "W · A · T · E · R", why: "Covers A and E plus the frequent T and R consonants." },
    { word: "WHEAT", tests: "W · H · E · A · T", why: "Tests E and A with the common H and T (and the WH blend)." },
    { word: "WORLD", tests: "W · O · R · L · D", why: "Probes O with the high-value R, L and D." },
    { word: "WOUND", tests: "W · O · U · N · D", why: "Covers O and U with the common N and D." },
    { word: "WHALE", tests: "W · H · A · L · E", why: "Tests A and E with H and L." },
    { word: "WRIST", tests: "W · R · I · S · T", why: "Loads up on R, I, S and T — strong consonant coverage." },
  ],
  strategyParagraphs: [
    "Because W rarely makes the best opener, you will usually land here with a confirmed green W. Spend your next guess on the vowel — most W-words carry their first vowel in position two.",
    "Watch the W blends. WH and WR are common families (WHEAT, WHERE, WRITE, WRONG), and W is also followed directly by vowels (WA, WE, WI, WO). A gray second letter rules out a branch at once.",
    "Keep endings in mind. The W _ _ _ E and W _ _ _ Y patterns are common shapes among Wordle answers, and words like WOOLY and WHEEL carry a repeated letter.",
  ],
  faq: [
    { question: "How many 5-letter words start with W?", answer: "There are {N} five-letter words starting with W in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with W?", answer: "WASTE is the strongest W opener: it tests W, A, S, T and E, covering two top vowels and two high-value consonants. WATER and WHEAT are excellent alternatives. Note that A- or S-words are statistically stronger as a very first guess — W-words shine once you have confirmed the first letter." },
    { question: "Which 5-letter words starting with W have been Wordle answers?", answer: "{ANSWERED} W-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter W words with lots of vowels?", answer: "WAIST, WHEAT, WOUND and WEARY each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with W and end with E?", answer: "Common ones include WASTE, WHALE, WHILE, WHITE, WROTE and WEAVE. The W _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter W words that work well in hard mode?", answer: "Yes. Consonant-rich words like WRIST, WORLD, WRUNG and WHISK help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
