import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "P",
  path: "/5-letter-words/starting-with-p",
  lastUpdated: "2026-06-17",
  topOpener: "PLATE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with P — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "P is a moderately common opening letter, and a well-chosen P-word makes a respectable opener or second guess. Whether you are choosing a first word or have locked a green P, the list below is sorted to get you to the answer fast.",
  openersIntro:
    "The best P openers pair P with two common vowels and high-frequency consonants like L, R, T and N. These give you the most board coverage on a single guess.",
  openers: [
    { word: "PLATE", tests: "P · L · A · T · E", why: "Tests A and E with the frequent L and T — the strongest all-round P opener.", best: true },
    { word: "POINT", tests: "P · O · I · N · T", why: "Covers the O/I vowels plus the common N and T consonants." },
    { word: "PAINT", tests: "P · A · I · N · T", why: "Tests A and I with N and T; strong elimination power." },
    { word: "PEARL", tests: "P · E · A · R · L", why: "Covers E and A plus the high-value R and L." },
    { word: "PRIDE", tests: "P · R · I · D · E", why: "Probes R, I, D and E together." },
    { word: "PLANE", tests: "P · L · A · N · E", why: "Tests A and E with L and N for balance." },
    { word: "PROSE", tests: "P · R · O · S · E", why: "Loads up on R, O, S and E — a useful follow-up." },
  ],
  strategyParagraphs: [
    "P is a solid consonant, so a P-word works as an opener — but if you have already locked a green P, switch focus to the vowel and the consonant cluster around it.",
    "Watch the P blends. PL and PR are dense families, and P is also followed directly by vowels (PA, PE, PI, PO, PU). The PH- start (PHONE, PHOTO) is worth remembering too.",
    "Keep double letters and endings in mind. Words like PUPPY, PENNE and PIZZA repeat a later letter, and the P _ _ _ E and P _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with P?", answer: "There are {N} five-letter words starting with P in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with P?", answer: "PLATE is the strongest P opener: it tests P, L, A, T and E, covering two top vowels and two frequent consonants. POINT and PAINT are excellent alternatives." },
    { question: "Which 5-letter words starting with P have been Wordle answers?", answer: "{ANSWERED} P-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter P words with lots of vowels?", answer: "PAUSE, PIANO and POISE each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with P and end with E?", answer: "Common ones include PLATE, PLANE, PRIDE, PROSE, PURGE and PHASE. The P _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter P words that work well in hard mode?", answer: "Yes. Consonant-rich words like PLUMP, PRINT, PSYCH and PLUSH help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
