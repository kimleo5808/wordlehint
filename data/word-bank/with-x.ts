import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-x (contains X).
 * X is an interior/end letter: 45% third slot (EX-, TOXIC), 26% last (-AX/-EX/-IX/-OX),
 * barely ever first (6%). Only ~37 common words. Rarity is the hook.
 */
export const content: LetterContent = {
  letter: "X",
  path: "/5-letter-words/with-x",
  lastUpdated: "2026-07-11",
  topOpener: "EXTRA",
  heroSubhead:
    "Every five-letter word that contains X, sorted for Wordle — the common answer words first, mapped by where the X sits, with past answers flagged and the best words to pin down a yellow X.",
  introExtra:
    "X is one of the rarest letters in Wordle, and where it does appear is highly predictable. The data below shows it peaking in the third slot (about 45%) — almost all the EX- prefix (EXACT, EXALT, EXIST) and cores like TOXIC — and the last slot (26%), the tiny -AX/-EX/-IX/-OX families (RELAX, INDEX, HELIX, DETOX). It essentially never opens a word (around 6%). So a yellow X is a strong clue: it is nearly always the third or fifth letter, and the vowel beside it usually settles the word.",
  openersIntro:
    "There are only a handful of X-words, so openers are limited. The picks below are the distinct-letter exceptions that test the X in its likely third or last slot.",
  openers: [
    { word: "EXTRA", tests: "E · X · T · R · A", why: "Places the X in the second slot of an EX- start while testing E, T, R and A — five distinct, high-frequency letters and the best X opener.", best: true },
    { word: "RELAX", tests: "R · E · L · A · X", why: "Ends in -AX, testing a last-slot X with R, E, L and A — five distinct letters." },
    { word: "INDEX", tests: "I · N · D · E · X", why: "An -EX ender covering I, N, D and E — good for probing a final X." },
    { word: "TOXIC", tests: "T · O · X · I · C", why: "Puts the X in the third slot with T, O, I and C — a strong mid-X read." },
    { word: "AXIOM", tests: "A · X · I · O · M", why: "A rare second-slot X with three vowels plus M — useful vowel coverage." },
  ],
  strategyParagraphs: [
    "Appreciate how much a yellow X tells you. X is one of the very rarest letters in the answer pool, so its mere presence collapses the field fast. It nearly always sits in the third or last slot, so you can usually ignore the first, second and fourth positions entirely.",
    "Split the EX- prefix from the tiny end families. About 45% of X-words put the X third, dominated by the EX- start (EXACT, EXALT, EXIST, EXTRA) and cores like TOXIC and AXIOM. The last-slot X's belong to four small families — -AX (RELAX), -EX (INDEX), -IX (HELIX) and -OX (DETOX) — where the vowel before the X decides the word.",
    "Do not expect a repeat or a front X. No common word doubles the X, and barely 6% start with one. So once you have a yellow X, focus everything on the third and fifth slots and the vowel that pairs with it.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter X?", answer: "There are {N} valid five-letter words with an X in the Wordle dictionary, but only {COMMON} are common answer-pool words — X is one of the rarest letters, so the everyday list is very short." },
    { question: "What is the best Wordle word with X in it?", answer: "EXTRA is the strongest — it tests five distinct, high-frequency letters with the X in an EX- start. RELAX and INDEX are good for probing a final X, and TOXIC for a third-slot X." },
    { question: "Where does the letter X usually go in a 5-letter word?", answer: "The third slot most often (about 45%), driven by the EX- prefix (EXACT, EXIST) and cores like TOXIC, then the last slot (26%) in the -AX/-EX/-IX/-OX families. It barely ever opens a word, so a yellow X is almost always the third or fifth letter." },
    { question: "How many words with X have been Wordle answers?", answer: "Only {ANSWERED} five-letter words containing X have appeared as official Wordle answers in the puzzles we track — a tiny number that reflects how rare X is. Because the NYT rarely repeats a solution, they are low-probability picks for today." },
    { question: "What 5-letter words end in X?", answer: "Four small families cover them: -AX (BORAX, RELAX), -EX (ANNEX, INDEX), -IX (AFFIX, HELIX) and -OX (DETOX, INBOX). The vowel before the X is the decider once you have a last-slot X." },
    { question: "What 5-letter words start with EX?", answer: "The EX- prefix drives the common third-slot X: EXACT, EXALT, EXIST, EXPEL, EXTRA. If your X is yellow and not at the end, an EX- start is the most likely home." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
