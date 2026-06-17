import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "X",
  path: "/5-letter-words/starting-with-x",
  lastUpdated: "2026-06-17",
  topOpener: "XENON",
  heroSubhead:
    "Every five-letter word that starts with X — a very short list — with Wordle notes on why X is almost never the first letter of an answer.",
  introExtra:
    "X is by far the rarest opening letter: only a handful of five-letter words begin with it, and none of them are in the official Wordle answer pool. In practice the daily answer will never start with X, so this page is mainly useful as a reference or for valid extra guesses.",
  openersIntro:
    "These are essentially all of the five-letter words that begin with X. None is a strong Wordle opener — they are listed for completeness and as legal guesses.",
  openers: [
    { word: "XENON", tests: "X · E · N · O · N", why: "A noble gas — the most recognisable X-word, testing E, N and O.", best: true },
    { word: "XYLEM", tests: "X · Y · L · E · M", why: "Plant tissue; tests Y, L, E and M." },
    { word: "XERIC", tests: "X · E · R · I · C", why: "Means very dry; tests E, R, I and C." },
    { word: "XEBEC", tests: "X · E · B · E · C", why: "A small Mediterranean sailing ship (note the repeated E)." },
    { word: "XEROX", tests: "X · E · R · O · X", why: "A genericised brand name; tests E, R and O." },
    { word: "XENIA", tests: "X · E · N · I · A", why: "Tests three vowels (E, I, A) with N." },
    { word: "XYLAN", tests: "X · Y · L · A · N", why: "A plant compound; tests Y, L, A and N." },
  ],
  strategyParagraphs: [
    "There is no real opening strategy for X, because the daily Wordle answer essentially never begins with it. If you have somehow locked a green X in position one, the field is tiny — usually just XENON, XYLEM or XEROX.",
    "Most X-words start with XE or XY, so testing E or Y as the second letter resolves almost the entire list.",
    "If you simply need a valid guess that contains an X, you do not have to start with one — words like AXIOM, TOXIC and PIXEL place the X mid-word and test far more useful letters.",
  ],
  faq: [
    { question: "How many 5-letter words start with X?", answer: "There are {N} five-letter words starting with X in the full Wordle dictionary of valid guesses — one of the smallest groups of any letter. None of them are in the official Wordle answer pool, so the daily answer will not start with X." },
    { question: "Can a Wordle answer start with X?", answer: "In practice, no. The official Wordle answer list contains no five-letter words that begin with X, so you can safely rule out an X in position one. X does appear inside answers (think TOXIC or PROXY), just never at the start." },
    { question: "What is the most useful 5-letter word starting with X?", answer: "XENON is the most recognisable, followed by XYLEM and XEROX. They are fine as legal guesses but weak as openers — a vowel-rich word like AROSE or IRATE will tell you far more on guess one." },
    { question: "What 5-letter words start with X and contain common letters?", answer: "XENON, XENIA and XERIC mix X with the common letters E, N, I and R, so they are the closest thing to a useful X-word if you ever need one." },
    { question: "Are there 5-letter X words for hard mode?", answer: "If hard-mode rules force you to keep an X, XENON, XYLEM and XEROX are your main legal options. Otherwise, placing the X mid-word (AXIOM, IXNAY) keeps more useful letters in play." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
