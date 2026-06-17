import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "E",
  path: "/5-letter-words/starting-with-e",
  lastUpdated: "2026-06-17",
  topOpener: "EARTH",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with E — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "E is the most common letter in English, but it usually lands mid-word rather than first — so most players reach this list after locking a green E in position one. The words below are sorted to help you pin the rest of the answer fast.",
  openersIntro:
    "The best E openers pair the common E and A vowels with high-frequency consonants like R, T and N. These give you the most board coverage on a single guess.",
  openers: [
    { word: "EARTH", tests: "E · A · R · T · H", why: "Tests E and A with the high-value R and T — the strongest all-round E opener.", best: true },
    { word: "ENACT", tests: "E · N · A · C · T", why: "Covers the frequent N, C and T consonants alongside two top vowels." },
    { word: "ENTRY", tests: "E · N · T · R · Y", why: "Loads up on common consonants (N, T, R) while testing E and Y." },
    { word: "ELDER", tests: "E · L · D · R", why: "Probes L, D and R; useful when you suspect a second E later in the word." },
    { word: "ETHOS", tests: "E · T · H · O · S", why: "Tests O and S plus the common TH pairing." },
    { word: "EBONY", tests: "E · B · O · N · Y", why: "Good for probing B, O, N and Y together." },
    { word: "ENVOY", tests: "E · N · V · O · Y", why: "Useful follow-up that checks the rarer V alongside O, N and Y." },
  ],
  strategyParagraphs: [
    "Because E sits first less often than it appears mid-word, you will usually arrive here with a green E already locked. Aim your next guess at the second vowel and the consonant cluster.",
    "Watch the openings EA, EN, ER, ES and EX — these are the densest E families. A gray second letter eliminates a large branch of words at once.",
    "Remember that E very often repeats: words like EERIE, ELDER and EAGER carry a second E later on, which is a frequent blind spot when the first tile is already green.",
  ],
  faq: [
    { question: "How many 5-letter words start with E?", answer: "There are {N} five-letter words starting with E in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with E?", answer: "EARTH is the strongest E opener: it tests E, A, R, T and H, covering two top vowels and two frequent consonants. ENACT and ENTRY are close alternatives." },
    { question: "Which 5-letter words starting with E have been Wordle answers?", answer: "{ANSWERED} E-words have already appeared as official Wordle answers in the puzzles we track — past ones include ENACT, ENDOW, ENJOY and ENSUE. Since the NYT almost never repeats a solution, those are lower-probability picks for today." },
    { question: "What are good 5-letter E words with lots of vowels?", answer: "EQUAL, ENSUE, EVADE and ERODE each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with E and end with E?", answer: "Common ones include ERASE, ELATE, EVADE, ELOPE, ERODE and EVOKE. The E _ _ _ E pattern is a frequent shape among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter E words that work well in hard mode?", answer: "Yes. Consonant-rich words like ELECT, EXPEL, EQUIP and EXTOL help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
