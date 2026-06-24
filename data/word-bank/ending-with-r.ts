import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-r.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "R",
  path: "/5-letter-words/ending-with-r",
  lastUpdated: "2026-06-24",
  topOpener: "LATER",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in R — common answer-pool words first, with the strongest R-ending openers and past Wordle answers flagged.",
  introExtra:
    "About two-thirds of common five-letter words ending in R actually end in -ER — the huge family of agent nouns and comparatives like MAKER, RIVER, OTHER and NEWER. So once you have locked a green R in the last slot, your real puzzle is usually the 3rd letter. R is also one of the best ending letters for openers: LATER and CATER are anagrams of ALERT and TRACE, two of the strongest opening words in the game.",
  openersIntro:
    "Words ending in R make genuinely strong openers because the -ER family pairs R with E and high-value consonants. The picks below stick to distinct-letter words — several are anagrams of the best openers in the game.",
  openers: [
    { word: "LATER", tests: "L · A · T · E · R", why: "Tests five of the most frequent letters in Wordle answers (L, A, T, E, R) — an anagram of ALERT and ALTER, so it is essentially the best opener in the game that ends in R.", best: true },
    { word: "CATER", tests: "C · A · T · E · R", why: "An anagram of TRACE, CRATE and REACT; probes the useful C while keeping A, T, E and R." },
    { word: "SOLAR", tests: "S · O · L · A · R", why: "Five distinct high-value letters that bring S and O coverage around L, A and R." },
    { word: "SUPER", tests: "S · U · P · E · R", why: "Adds S, U and P; a strong alternative when you want to test the vowel U early." },
    { word: "TIGER", tests: "T · I · G · E · R", why: "Brings the vowel I and G together with T, E and R — good for mapping I." },
    { word: "OTHER", tests: "O · T · H · E · R", why: "Tests O and H alongside T, E and R; useful coverage with no repeated letters." },
  ],
  strategyParagraphs: [
    "Assume -ER first. With about two-thirds of common R-enders ending in -ER, your real job once R is locked is the 3rd letter: MAKER vs MOVER vs MISER, RIVER vs RIDER vs RULER. Nail that and the word usually collapses to a short list.",
    "Then work the smaller families. Agent and quality nouns end in -OR (ACTOR, HONOR, MAJOR, MOTOR, RAZOR, VAPOR); many adjectives end in -AR (SOLAR, LUNAR, POLAR, SUGAR, RADAR). The rarer -UR (FEMUR, INCUR, OCCUR) and -IR (CHAIR, CHOIR, STAIR, THEIR) shapes round out the list.",
    "Watch the repeated letters: ERROR, OTTER, UDDER, UPPER, UTTER and INNER all double a letter, which is easy to overlook once an R is locked at the end. If common single-letter guesses keep failing, test for a doubled letter before guessing again.",
  ],
  faq: [
    { question: "How many 5-letter words end in R?", answer: "There are {N} five-letter words ending in R in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle word ending in R?", answer: "LATER is the strongest R-ending pick: it tests L, A, T, E and R, five of the most frequent letters in Wordle answers, and it is an anagram of ALERT and ALTER. That makes it a top-tier opener that just happens to end in R. CATER and SOLAR are close behind." },
    { question: "Which 5-letter words ending in R have been Wordle answers?", answer: "{ANSWERED} R-ending words have already appeared as official Wordle answers in the puzzles we track, including MAKER, CIGAR, SOBER and WISER. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -ER, -OR or -AR?", answer: "These are the families before R, and -ER is by far the largest. -ER includes MAKER, RIVER and OTHER; -OR includes ACTOR, HONOR and MOTOR; -AR includes SOLAR, LUNAR and SUGAR. Knowing -ER covers about two-thirds of common R-enders makes these puzzles much faster." },
    { question: "Are 5-letter words ending in R good Wordle starters?", answer: "Yes, genuinely. The -ER family pairs R with E and top consonants, and LATER and CATER are anagrams of the game's best openers (ALERT, TRACE). Just avoid repeated-letter R-enders like ERROR, and test fresh letters on your second guess." },
    { question: "What are 5-letter words ending in R with lots of vowels?", answer: "ABHOR, EAGER, EATER, OUTER, MAYOR, MINOR and AUGUR each carry two or more vowels while ending in R. They are an efficient way to map the puzzle's vowel skeleton early when the last letter is already locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
