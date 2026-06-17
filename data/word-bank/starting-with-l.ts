import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "L",
  path: "/5-letter-words/starting-with-l",
  lastUpdated: "2026-06-17",
  topOpener: "LEARN",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with L — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "L is one of the most common consonants in English, so an L-word can be a useful opener — and an even better second guess. Whether you are choosing a first word or have locked a green L, the list below is sorted to get you to the answer fast.",
  openersIntro:
    "The best L openers pair the common L with top vowels and other frequent consonants like R, N, S and T. These give you the most board coverage on a single guess.",
  openers: [
    { word: "LEARN", tests: "L · E · A · R · N", why: "Tests E and A with the high-value R and N — the strongest all-round L opener.", best: true },
    { word: "LANCE", tests: "L · A · N · C · E", why: "Covers A and E plus the frequent N and C consonants." },
    { word: "LATER", tests: "L · A · T · E · R", why: "Loads up on common consonants (T, R) with two top vowels." },
    { word: "LASER", tests: "L · A · S · E · R", why: "Swaps T for the high-value S; equally strong coverage." },
    { word: "LOUSE", tests: "L · O · U · S · E", why: "Three vowels (O, U, E) to map the vowel skeleton early." },
    { word: "LIGHT", tests: "L · I · G · H · T", why: "Tests I plus the common G, H and T consonants." },
    { word: "LOWER", tests: "L · O · W · E · R", why: "Useful follow-up that probes O, W, E and R." },
  ],
  strategyParagraphs: [
    "L is a strong consonant, so an L-word works as an opener — but if you have already locked a green L, switch focus to the vowel and the consonant cluster around it.",
    "L is followed directly by a vowel in most words (LA, LE, LI, LO, LU), so nailing that second letter splits the field quickly. The main blends to watch are LL later in the word.",
    "Keep double letters and endings in mind. Words like LLANO, LOLLY and LILAC repeat a letter, and the L _ _ _ E and L _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with L?", answer: "There are {N} five-letter words starting with L in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with L?", answer: "LEARN is the strongest L opener: it tests L, E, A, R and N, covering two top vowels and two frequent consonants. LANCE and LATER are excellent alternatives." },
    { question: "Which 5-letter words starting with L have been Wordle answers?", answer: "{ANSWERED} L-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter L words with lots of vowels?", answer: "LOUSE, LOUIE, LIEGE and LEAVE each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with L and end with E?", answer: "Common ones include LANCE, LOOSE, LATTE, LARGE, LEAVE and LODGE. The L _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter L words that work well in hard mode?", answer: "Yes. Consonant-rich words like LYMPH, LIGHT, LUNGE and LOFTY help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
