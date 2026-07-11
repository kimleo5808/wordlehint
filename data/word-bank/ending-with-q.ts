import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-q.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * Reality check: Q as a final letter is astonishingly rare. The dictionary has
 * only 5 valid guesses ending in Q, none in the answer pool, so a Q ending can
 * never be the daily NYT solution. Page exists for completeness.
 */
export const content: LetterContent = {
  letter: "Q",
  path: "/5-letter-words/ending-with-q",
  lastUpdated: "2026-07-11",
  topOpener: "TRANQ",
  heroSubhead:
    "The full, tiny list of five-letter words that end in Q. All are rare loanwords or slang, none are in the Wordle answer pool, and the NYT has never used one — so a Q ending is effectively impossible as a daily answer.",
  introExtra:
    "Q almost never sits at the end of an English word — it normally pairs with U near the start. The handful that do end in Q are loanwords like RAFIQ and UMIAQ or informal clippings like TRANQ, and none are common enough to be a Wordle answer. Use this page as a reference: if you have a green Q locked in the last slot, you are in a variant or a very unusual word list, not the standard daily puzzle.",
  openersIntro:
    "None of these are real opening words — a Q parked in the final slot is a wasted, low-frequency tile. The list below is the complete set of Q-enders, shown for reference rather than as recommended guesses.",
  openers: [
    { word: "TRANQ", tests: "T · R · A · N · Q", why: "Five distinct letters (T, R, A, N, Q) and the most word-like entry — an informal clipping of tranquilizer. Still not a realistic guess, but the least obscure of the set.", best: true },
    { word: "RAFIQ", tests: "R · A · F · I · Q", why: "A loanword meaning companion/friend; distinct letters but far too rare to open with." },
    { word: "TALAQ", tests: "T · A · L · A · Q", why: "An Islamic-law term for divorce; repeats A and offers no practical Wordle value." },
    { word: "UMIAQ", tests: "U · M · I · A · Q", why: "A variant spelling of umiak (an Inuit boat); an oddity you would essentially never guess." },
    { word: "QAJAQ", tests: "Q · A · J · A · Q", why: "A double-Q variant spelling of kayak; repeats Q and A and is pure trivia." },
  ],
  strategyParagraphs: [
    "Accept that this ending cannot be the answer. Every five-letter word ending in Q is a rare loanword or slang term outside the Wordle answer pool, and the NYT has never published a Q-ending solution. In the official daily you will never need one.",
    "Never spend a guess to test it. Since no Q-ender is a plausible answer, playing one teaches you almost nothing — open with a vowel-rich word like SLATE or CRANE and keep your guesses working for you.",
    "The only place a Q ending turns up is unlimited or variant modes with a bigger dictionary. If a tool accepts them, TRANQ, RAFIQ, TALAQ, UMIAQ and QAJAQ are the entire list — there is nothing else to try.",
  ],
  faq: [
    { question: "How many 5-letter words end in Q?", answer: "Only {N} valid five-letter words in the Wordle guess dictionary end in Q — QAJAQ, RAFIQ, TALAQ, TRANQ and UMIAQ — and {COMMON} of them are common answer-pool words. Q almost always pairs with U near the start of a word, so ending in Q is extremely rare." },
    { question: "Can a Wordle answer end in Q?", answer: "No. All {N} five-letter words ending in Q are rare loanwords or slang outside the official answer pool, and {ANSWERED} of them has ever been a Wordle solution. A green Q in the final slot cannot be the daily NYT answer." },
    { question: "What is the best Wordle word ending in Q?", answer: "TRANQ is the least obscure — an informal clipping of tranquilizer that uses five distinct letters (T, R, A, N, Q). It is still not a serious guess; you are far better off opening with a word like SLATE or CRANE." },
    { question: "Does a Q always need a U after it?", answer: "In everyday English, almost always — which is exactly why words ending in Q are so rare. The few five-letter exceptions here are transliterated loanwords (RAFIQ, UMIAQ, QAJAQ) or slang (TRANQ), not standard U-following spellings." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
