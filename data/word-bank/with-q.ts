import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-q (contains Q).
 * Q is the most predictable letter: 71% first slot and ALWAYS followed by U.
 * Only ~29 common words. The QU rule is the hook.
 */
export const content: LetterContent = {
  letter: "Q",
  path: "/5-letter-words/with-q",
  lastUpdated: "2026-07-11",
  topOpener: "QUIET",
  heroSubhead:
    "Every five-letter word that contains Q, sorted for Wordle — the common answer words first, mapped by where the Q sits, with past answers flagged and the best words to pin down a yellow Q.",
  introExtra:
    "Q is the most predictable letter in the whole game, thanks to one rule: every Q is followed by a U. The data below shows Q opening the word about 71% of the time (QUICK, QUOTE, QUEEN) with the rest in the second slot of an -QU- word (EQUAL, SQUAD). It never ends a word. So a yellow Q is almost a solved letter — find the QU pair, place it at the front, and the two remaining consonants usually finish the job.",
  openersIntro:
    "There are very few Q-words, and every one carries a QU. The picks below are the distinct-letter options that test the QU pair up front.",
  openers: [
    { word: "QUIET", tests: "Q · U · I · E · T", why: "Leads with the QU pair while testing I, E and T — five distinct letters covering two extra vowels, the best Q opener.", best: true },
    { word: "QUOTA", tests: "Q · U · O · T · A", why: "A front QU- start covering O, T and A — strong vowel coverage in a compact Q word." },
    { word: "QUERY", tests: "Q · U · E · R · Y", why: "Tests the QU pair plus E, R and Y — useful for probing an -RY ending too." },
    { word: "SQUAD", tests: "S · Q · U · A · D", why: "Places the Q in the second slot of an SQU- start with S, U, A and D." },
    { word: "EQUAL", tests: "E · Q · U · A · L", why: "A second-slot Q in an EQU- word covering E, U, A and L — five distinct letters." },
  ],
  strategyParagraphs: [
    "Treat the Q and its U as a single unit. The iron rule of Q is that a U always follows it. So the moment a Q turns yellow, you also know a U is in the word right after it — two letters for the price of one, which is why Q is the most decisive clue in the game.",
    "Play the first slot first. About 71% of Q-words open with QU (QUICK, QUOTE, QUEEN, QUILT), so start there. The main exceptions put the Q second in an -QU- start: EQUAL, SQUAD, SQUAT. If you have a placed S or E at the front, one of those is the fit.",
    "Narrow with the third letter. Once QU is placed at the front, only a handful of words remain, and the third letter — usually a vowel (QUIET, QUOTA) or a common consonant (QUICK, QUILT) — almost always decides it. No common word ends in Q or doubles it, so the front QU is all you need to chase.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter Q?", answer: "There are {N} valid five-letter words with a Q in the Wordle dictionary, but only {COMMON} are common answer-pool words — Q is the rarest letter, so the everyday list is the shortest of all." },
    { question: "What is the best Wordle word with Q in it?", answer: "QUIET is the strongest — it tests five distinct letters and covers two extra vowels while placing the QU pair up front. QUOTA and QUERY are close alternatives, and SQUAD probes a second-slot Q." },
    { question: "Does every Q need a U in Wordle?", answer: "Yes — every five-letter word with a Q is followed by a U (QUICK, QUOTE, EQUAL, SQUAD). That makes a yellow Q the most decisive clue in the game: you instantly know a U sits right after it." },
    { question: "Where does the letter Q usually go in a 5-letter word?", answer: "The first slot, by far — about 71% of five-letter words with a Q start with it (QUICK, QUEEN, QUOTE), with the rest in the second slot of an EQU-/SQU- start. It never ends a word, so a yellow Q points to the front." },
    { question: "How many words with Q have been Wordle answers?", answer: "Only {ANSWERED} five-letter words containing Q have appeared as official Wordle answers in the puzzles we track — the fewest of any letter. Because the NYT rarely repeats a solution, they are low-probability picks for today." },
    { question: "What 5-letter words have Q not at the start?", answer: "A short list puts the Q second in a QU cluster: EQUAL, SQUAD, SQUAT, TOQUE, ROQUE. If your Q is yellow and not first, one of these EQU-/SQU- words is the likely fit." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
