import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "I",
  path: "/5-letter-words/starting-with-i",
  lastUpdated: "2026-06-17",
  topOpener: "IRATE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with I — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "I is a vowel, so I-words double as useful openers that test multiple vowels at once. Whether you are choosing a first guess or have locked a green I in position one, the words below are sorted to get you to the answer fast.",
  openersIntro:
    "The best I openers stack three vowels with a high-frequency consonant or two, letting you map the vowel skeleton of the answer in a single guess.",
  openers: [
    { word: "IRATE", tests: "I · R · A · T · E", why: "Three vowels (I, A, E) plus the high-value R and T — the strongest all-round I opener.", best: true },
    { word: "IDEAL", tests: "I · D · E · A · L", why: "Another three-vowel opener (I, E, A) that also tests D and L." },
    { word: "INERT", tests: "I · N · E · R · T", why: "Covers I and E with the frequent N, R and T consonants." },
    { word: "IVORY", tests: "I · V · O · R · Y", why: "Tests the rarer V alongside O, R and Y." },
    { word: "INDEX", tests: "I · N · D · E · X", why: "Good for probing N, D and the rare X together with two vowels." },
    { word: "IMAGE", tests: "I · M · A · G · E", why: "Tests I, A and E plus the M and G consonants." },
    { word: "ISLET", tests: "I · S · L · E · T", why: "Loads up on the high-value S, L and T with two vowels." },
  ],
  strategyParagraphs: [
    "Because I is a vowel, an I-word makes a reasonable opener — but if you have already locked a green I, switch focus to the second vowel and the consonant cluster around it.",
    "Watch the common openings IN, IM, IR and IS — these are the densest I families. A gray second letter eliminates a large branch of words at once.",
    "Many I-words carry a second vowel late (IGLOO, IONIC, IRATE) and the silent I _ _ _ E ending (IMAGE, INANE, ISSUE) is common — keep both shapes in mind when the first tile is green.",
  ],
  faq: [
    { question: "How many 5-letter words start with I?", answer: "There are {N} five-letter words starting with I in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with I?", answer: "IRATE is the strongest I opener: it tests three vowels (I, A, E) plus the high-value R and T. IDEAL is an excellent alternative, also packing three vowels." },
    { question: "Which 5-letter words starting with I have been Wordle answers?", answer: "{ANSWERED} I-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are the best 5-letter I words with lots of vowels?", answer: "IRATE, IDEAL and IGLOO each carry three vowels, while INANE and IONIC pack two. These vowel-rich words are the most efficient way to map the puzzle early in a Wordle game." },
    { question: "What 5-letter words start with I and end with E?", answer: "Common ones include IMAGE, INANE, ISSUE, IRATE and INDIE. The I _ _ _ E pattern is a frequent shape among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter I words that work well in hard mode?", answer: "Yes. Consonant-balanced words like INPUT, IMPLY, INFER and IVORY help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
