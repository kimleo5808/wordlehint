import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "G",
  path: "/5-letter-words/starting-with-g",
  lastUpdated: "2026-06-17",
  topOpener: "GRACE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with G — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "G is an uncommon opening letter in Wordle, so most players reach this list after locking a green G in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "If you want to lead with a G-word, the best picks combine two common vowels with high-frequency consonants like R and C. These give you the most board coverage on a single guess.",
  openers: [
    { word: "GRACE", tests: "G · R · A · C · E", why: "Tests the high-value R and C with two top vowels (A, E) — the strongest all-round G opener.", best: true },
    { word: "GRADE", tests: "G · R · A · D · E", why: "Swaps C for D; equally strong coverage of A, R and E." },
    { word: "GUIDE", tests: "G · U · I · D · E", why: "Tests three vowels (U, I, E) to map the vowel skeleton early." },
    { word: "GROAN", tests: "G · R · O · A · N", why: "Covers O and A plus the frequent R and N consonants." },
    { word: "GLARE", tests: "G · L · A · R · E", why: "Probes L and R alongside A and E." },
    { word: "GIANT", tests: "G · I · A · N · T", why: "Tests the I/A vowel pair with the common N and T." },
    { word: "GUARD", tests: "G · U · A · R · D", why: "Good for testing U, A, R and D together." },
  ],
  strategyParagraphs: [
    "Because G rarely makes the best opener, you will usually land here with a confirmed green G. Spend your next guess on the vowel — most five-letter G words carry their first vowel in position two.",
    "Watch the G blends. GL and GR are the dense families, but G is also followed directly by vowels (GA, GE, GI, GO, GU). A gray second letter rules out a whole branch at once.",
    "Keep double letters and endings in mind. Words like GIDDY, GUPPY and GLASS repeat a later letter, and the G _ _ _ E and G _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with G?", answer: "There are {N} five-letter words starting with G in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with G?", answer: "GRACE is the strongest G opener: it tests G, R, A, C and E, covering two top vowels and two frequent consonants. GRADE and GUIDE are close alternatives. Note that A- or S-words are statistically stronger as a very first guess — G-words shine once you have confirmed the first letter." },
    { question: "Which 5-letter words starting with G have been Wordle answers?", answer: "{ANSWERED} G-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter G words with lots of vowels?", answer: "GAUZE, GUIDE, GUISE and GOUGE each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with G and end with E?", answer: "Common ones include GRACE, GRADE, GLOVE, GUIDE, GORGE and GRIME. The G _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter G words that work well in hard mode?", answer: "Yes. Consonant-rich words like GRUNT, GLYPH, GRAFT and GRIND help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
