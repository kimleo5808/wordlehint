import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "Z",
  path: "/5-letter-words/starting-with-z",
  lastUpdated: "2026-06-17",
  topOpener: "ZEBRA",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with Z — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "Z is one of the rarest opening letters in Wordle, so you will almost always reach this list after locking a green Z in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "There are only a few dozen Z-words, so if you want to lead with one, pick the options that test the most common vowels and consonants in a single guess.",
  openers: [
    { word: "ZEBRA", tests: "Z · E · B · R · A", why: "Tests E and A with the high-value R — the strongest all-round Z opener.", best: true },
    { word: "ZESTY", tests: "Z · E · S · T · Y", why: "Covers E with the high-value S, T and Y." },
    { word: "ZONAL", tests: "Z · O · N · A · L", why: "Tests O and A plus the common N and L." },
    { word: "ZILCH", tests: "Z · I · L · C · H", why: "Tests I with the common L, C and H consonants." },
    { word: "ZEROS", tests: "Z · E · R · O · S", why: "Covers E and O with the high-value R and S." },
    { word: "ZINGY", tests: "Z · I · N · G · Y", why: "Tests I with N, G and Y." },
    { word: "ZAYIN", tests: "Z · A · Y · I · N", why: "Useful for testing A, I, Y and N together." },
  ],
  strategyParagraphs: [
    "Because Z is so rare as a first letter, you will nearly always arrive here with a confirmed green Z. Spend your next guess on the vowel — every Z-word carries its first vowel in position two.",
    "Z is followed directly by a vowel in almost every word (ZA, ZE, ZI, ZO), so nailing that second letter splits the small field of Z-words almost immediately.",
    "There are only a few dozen common Z-words, so once you confirm the vowel you are usually one good guess from the answer. Watch the Z _ _ _ Y ending (ZESTY, ZIPPY, ZINGY).",
  ],
  faq: [
    { question: "How many 5-letter words start with Z?", answer: "There are {N} five-letter words starting with Z in the full Wordle dictionary of valid guesses — one of the smallest groups of any letter. Of those, {COMMON} are common, everyday words from the official Wordle answer pool." },
    { question: "What is the best Wordle starting word beginning with Z?", answer: "ZEBRA is the strongest Z opener: it tests Z, E, B, R and A, covering two top vowels and the high-value R. ZESTY and ZONAL are alternatives. Because Z is so rare, A- or S-words are far stronger as a first guess." },
    { question: "Which 5-letter words starting with Z have been Wordle answers?", answer: "{ANSWERED} Z-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter Z words with lots of vowels?", answer: "ZEBRA, ZONAL, ZAYIN and ZEROS each carry two vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with Z and end with E?", answer: "Five-letter Z-words ending in E are scarce — ZONAL and ZESTY (which end in L and Y) are far more typical. The Z _ _ _ E pattern is one of the least common shapes, so it rarely helps narrow the answer." },
    { question: "Are there 5-letter Z words that work well in hard mode?", answer: "Yes. Words like ZILCH, ZESTY, ZONAL and ZINGY help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
