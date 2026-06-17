import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "R",
  path: "/5-letter-words/starting-with-r",
  lastUpdated: "2026-06-17",
  topOpener: "RAISE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with R — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "R is one of the most common consonants in English, so an R-word makes an excellent opener — RAISE is among the strongest first guesses in the entire game. Whether you are choosing a first word or have locked a green R, the list below is sorted to get you to the answer fast.",
  openersIntro:
    "The best R openers stack three vowels with the high-value R and S. These cover the most common letters in Wordle answers for maximum board coverage on guess one.",
  openers: [
    { word: "RAISE", tests: "R · A · I · S · E", why: "Three vowels (A, I, E) plus the two most common consonants (R, S) — one of the best openers in all of Wordle.", best: true },
    { word: "ROAST", tests: "R · O · A · S · T", why: "Tests O and A with the high-frequency R, S and T — superb elimination power." },
    { word: "ROUSE", tests: "R · O · U · S · E", why: "Three vowels (O, U, E) with R and S to map the vowels early." },
    { word: "RADIO", tests: "R · A · D · I · O", why: "Three different vowels (A, I, O) to learn as much as possible on guess one." },
    { word: "RATIO", tests: "R · A · T · I · O", why: "Three vowels (A, I, O) plus the frequent T." },
    { word: "ROUTE", tests: "R · O · U · T · E", why: "Three vowels (O, U, E) with the common T." },
    { word: "REACT", tests: "R · E · A · C · T", why: "Tests E and A with the high-value C and T." },
  ],
  strategyParagraphs: [
    "R is a top-tier consonant, so an R-word is a genuinely strong opener — RAISE and ROAST are statistically among the best first guesses. If you have already locked a green R, switch focus to the vowel that follows.",
    "R is followed directly by a vowel in most words (RA, RE, RI, RO, RU), so nailing that second letter splits the field quickly. The RH- start (RHINO, RHYME) is the rare exception.",
    "Keep double letters and endings in mind. Words like RIVER and ROBOT place a repeated letter, and the R _ _ _ E and R _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with R?", answer: "There are {N} five-letter words starting with R in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with R?", answer: "RAISE is the strongest R opener and one of the best opening words in all of Wordle — it tests three vowels (A, I, E) plus the two most common consonants, R and S. ROAST and ROUSE are excellent alternatives." },
    { question: "Which 5-letter words starting with R have been Wordle answers?", answer: "{ANSWERED} R-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are the best 5-letter R words with lots of vowels?", answer: "RAISE, ROUSE, RADIO, RATIO and ROUTE each carry three vowels, which makes them the most efficient way to map the puzzle early in a Wordle game." },
    { question: "What 5-letter words start with R and end with E?", answer: "Common ones include RAISE, ROUSE, ROUTE, RANGE, RINSE and ROGUE. The R _ _ _ E pattern is one of the most frequent shapes among Wordle answers, so it is worth memorising." },
    { question: "Are there 5-letter R words that work well in hard mode?", answer: "Yes. Consonant-rich words like RUSTY, ROBIN, RUGBY and RIGHT help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
