import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "T",
  path: "/5-letter-words/starting-with-t",
  lastUpdated: "2026-06-17",
  topOpener: "TRACE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with T — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "T is one of the most common consonants in English, and TRACE is rated among the mathematically optimal Wordle openers — right alongside CRANE and SLATE. Whether you are choosing a first word or have locked a green T, the list below is sorted to get you to the answer fast.",
  openersIntro:
    "The best T openers pair the high-value T and R with two top vowels. These cover the most common letters in Wordle answers for maximum board coverage on guess one.",
  openers: [
    { word: "TRACE", tests: "T · R · A · C · E", why: "One of the mathematically best openers in Wordle — tests T, R, A, C and E, five high-frequency letters.", best: true },
    { word: "TRAIN", tests: "T · R · A · I · N", why: "Covers A and I with the high-value T, R and N." },
    { word: "TREAD", tests: "T · R · E · A · D", why: "Tests E and A plus the frequent T, R and D." },
    { word: "TENOR", tests: "T · E · N · O · R", why: "Covers E and O with the common N and R." },
    { word: "TRADE", tests: "T · R · A · D · E", why: "Tests A and E with T, R and D." },
    { word: "TOWER", tests: "T · O · W · E · R", why: "Probes O, E and the high-value R together with W." },
    { word: "TRIAL", tests: "T · R · I · A · L", why: "Tests the I/A vowels with T, R and L." },
  ],
  strategyParagraphs: [
    "T is a top-tier consonant, so a T-word is a genuinely strong opener — TRACE is statistically among the best first guesses. If you have already locked a green T, switch focus to the vowel that follows.",
    "Watch the T blends. TR, TH and TW are all dense families, and T is also followed directly by vowels (TA, TE, TI, TO, TU). A gray second letter rules out a whole branch at once.",
    "Keep double letters and endings in mind. Words like TEPEE, TOTAL and TUMMY repeat a later letter, and the T _ _ _ E and T _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with T?", answer: "There are {N} five-letter words starting with T in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with T?", answer: "TRACE is the strongest T opener and one of the best opening words in all of Wordle — it is rated alongside CRANE and SLATE as mathematically optimal. It tests T, R, A, C and E. TRAIN and TREAD are excellent alternatives." },
    { question: "Which 5-letter words starting with T have been Wordle answers?", answer: "{ANSWERED} T-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter T words with lots of vowels?", answer: "TIARA, TAUPE, TOAST and TEPEE each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with T and end with E?", answer: "Common ones include TRACE, TRADE, THOSE, THEME, TASTE and TWICE. The T _ _ _ E pattern is one of the most frequent shapes among Wordle answers, so it is worth memorising." },
    { question: "Are there 5-letter T words that work well in hard mode?", answer: "Yes. Consonant-rich words like TRUMP, THUMP, TWIRL and TRUST help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
