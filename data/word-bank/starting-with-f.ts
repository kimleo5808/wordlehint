import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "F",
  path: "/5-letter-words/starting-with-f",
  lastUpdated: "2026-06-17",
  topOpener: "FLAME",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with F — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "F is a fairly rare opening letter in Wordle, so most players reach this list after locking a green F in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "If you want to lead with an F-word, the best picks combine two common vowels with high-frequency consonants like L, R and T. These give you the most board coverage on a single guess.",
  openers: [
    { word: "FLAME", tests: "F · L · A · M · E", why: "Tests the two most common vowels (A, E) plus the frequent L and M — the strongest all-round F opener.", best: true },
    { word: "FRAME", tests: "F · R · A · M · E", why: "Swaps L for the high-value R; equally strong coverage." },
    { word: "FIELD", tests: "F · I · E · L · D", why: "Tests the I/E vowel pair alongside L and D." },
    { word: "FAULT", tests: "F · A · U · L · T", why: "Covers A and U plus the common L and T consonants." },
    { word: "FROWN", tests: "F · R · O · W · N", why: "Good for probing O, W and N together with R." },
    { word: "FAINT", tests: "F · A · I · N · T", why: "Tests A, I, N and T — strong consonant and vowel mix." },
    { word: "FJORD", tests: "F · J · O · R · D", why: "A handy way to test the rare J alongside O, R and D." },
  ],
  strategyParagraphs: [
    "Because F rarely makes the best opener, you will usually land here with a confirmed green F. Spend your next guess on the vowel — most five-letter F words carry their first vowel in position two.",
    "Watch the F blends. FL and FR are the dense families, but F is also followed directly by vowels (FA, FE, FI, FO, FU). A gray second letter rules out a whole branch at once.",
    "Keep double letters and endings in mind. Words like FUNNY, FERRY and FLOSS repeat a later letter, and the F _ _ _ E and F _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with F?", answer: "There are {N} five-letter words starting with F in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with F?", answer: "FLAME is the strongest F opener: it tests F, L, A, M and E, covering two top vowels and two frequent consonants. FRAME and FIELD are close alternatives. Note that A- or S-words are statistically stronger as a very first guess — F-words shine once you have confirmed the first letter." },
    { question: "Which 5-letter words starting with F have been Wordle answers?", answer: "{ANSWERED} F-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter F words with lots of vowels?", answer: "FLUID, FAINT, FOYER and FAUNA each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with F and end with E?", answer: "Common ones include FLAME, FRAME, FENCE, FORCE, FLUKE and FUDGE. The F _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter F words that work well in hard mode?", answer: "Yes. Consonant-rich words like FROST, FLINT, FLUNK and FRISK help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
