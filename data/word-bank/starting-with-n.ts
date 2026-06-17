import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "N",
  path: "/5-letter-words/starting-with-n",
  lastUpdated: "2026-06-17",
  topOpener: "NOISE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with N — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "N is one of the most common consonants in English, so an N-word makes a solid opener or second guess. Whether you are choosing a first word or have locked a green N, the list below is sorted to get you to the answer fast.",
  openersIntro:
    "The best N openers stack two or three vowels with the frequent N and another strong consonant. These give you the most board coverage on a single guess.",
  openers: [
    { word: "NOISE", tests: "N · O · I · S · E", why: "Three vowels (O, I, E) plus the high-value S — the strongest all-round N opener.", best: true },
    { word: "NAIVE", tests: "N · A · I · V · E", why: "Another three-vowel opener (A, I, E) that also tests the rarer V." },
    { word: "NURSE", tests: "N · U · R · S · E", why: "Covers U and E with the high-value R and S." },
    { word: "NOBLE", tests: "N · O · B · L · E", why: "Tests O and E plus the B and L consonants." },
    { word: "NADIR", tests: "N · A · D · I · R", why: "Probes A and I with the frequent D and R." },
    { word: "NIGHT", tests: "N · I · G · H · T", why: "Tests I plus the common G, H and T consonants." },
    { word: "NOMAD", tests: "N · O · M · A · D", why: "Useful for testing O, A, M and D in one guess." },
  ],
  strategyParagraphs: [
    "N is a strong consonant, so an N-word works as an opener — but if you have already locked a green N, switch focus to the vowel and the consonant cluster around it.",
    "N is followed directly by a vowel in almost every word (NA, NE, NI, NO, NU), so nailing that second letter splits the field quickly. Watch for a second N later in words like NANNY and NINNY.",
    "Keep double letters and endings in mind. The N _ _ _ E and N _ _ _ Y patterns are both common shapes among Wordle answers, and words like NEEDY and NIECE carry a repeated vowel.",
  ],
  faq: [
    { question: "How many 5-letter words start with N?", answer: "There are {N} five-letter words starting with N in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with N?", answer: "NOISE is the strongest N opener: it tests three vowels (O, I, E) plus the high-value S. NAIVE and NURSE are excellent alternatives." },
    { question: "Which 5-letter words starting with N have been Wordle answers?", answer: "{ANSWERED} N-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter N words with lots of vowels?", answer: "NOISE, NAIVE, NIECE and NOOSE each carry two or more vowels — NOISE and NAIVE pack three, making them efficient for mapping the puzzle early in a Wordle game." },
    { question: "What 5-letter words start with N and end with E?", answer: "Common ones include NOISE, NURSE, NOBLE, NICHE, NUDGE and NERVE. The N _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter N words that work well in hard mode?", answer: "Yes. Consonant-rich words like NYMPH, NIGHT, NORTH and NASTY help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
