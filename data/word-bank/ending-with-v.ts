import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-v.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * Reality check: V as a final letter is one of the rarest. The dictionary has
 * only 5 valid guesses ending in V, none in the answer pool, so a V ending can
 * never be the daily NYT solution. Page exists for completeness.
 */
export const content: LetterContent = {
  letter: "V",
  path: "/5-letter-words/ending-with-v",
  lastUpdated: "2026-07-11",
  topOpener: "PAREV",
  heroSubhead:
    "The complete, very short list of five-letter words that end in V. All are rare loanwords or slang, none are in the Wordle answer pool, and the NYT has never used one — so a V ending is effectively impossible as a daily answer.",
  introExtra:
    "English words almost never end in a bare V — the spelling convention adds a silent E (LOVE, GIVE, MOVE), so a five-letter word ending in V is a real oddity. The only entries are loanwords and slang like PAREV, GANEV, SCHAV and SKEEV, and none are common enough to be a Wordle answer. Treat this as a reference page: a green V in the last slot means you are in a variant or an unusual word list, not the standard daily.",
  openersIntro:
    "None of these are genuine opening words — a V in the final slot is a low-frequency tile in a position English barely uses. The list below is the full set of V-enders, shown for reference rather than as recommended guesses.",
  openers: [
    { word: "PAREV", tests: "P · A · R · E · V", why: "Five distinct letters (P, A, R, E, V) and the most recognisable entry — a kosher-dietary term meaning neither meat nor dairy. Still not a realistic guess, but the least obscure of the set.", best: true },
    { word: "GANEV", tests: "G · A · N · E · V", why: "Yiddish-derived slang for a thief; distinct letters but far too rare to open with." },
    { word: "SKEEV", tests: "S · K · E · E · V", why: "Informal slang (to skeeve out); repeats E and offers no practical Wordle value." },
    { word: "SCHAV", tests: "S · C · H · A · V", why: "A cold sorrel soup; an unusual loanword you would essentially never guess." },
    { word: "OLLAV", tests: "O · L · L · A · V", why: "An archaic term for a learned Irish poet; repeats L and is pure trivia." },
  ],
  strategyParagraphs: [
    "Accept that this ending cannot be the answer. Every five-letter word ending in V is a rare loanword or slang term outside the Wordle answer pool, and the NYT has never published a V-ending solution — because English spells that sound with a trailing silent E instead.",
    "Never burn a guess to test it. Since no V-ender is a plausible answer, playing one teaches you almost nothing — open with a vowel-rich word like SLATE or CRANE and keep every guess doing real work.",
    "The only place a V ending appears is unlimited or variant modes with a larger dictionary. If a tool accepts them, PAREV, GANEV, SKEEV, SCHAV and OLLAV are the entire list — there is nothing else to try.",
  ],
  faq: [
    { question: "How many 5-letter words end in V?", answer: "Only {N} valid five-letter words in the Wordle guess dictionary end in V — GANEV, OLLAV, PAREV, SCHAV and SKEEV — and {COMMON} of them are common answer-pool words. English normally adds a silent E after a final V (LOVE, GIVE), so a bare V ending is very rare." },
    { question: "Can a Wordle answer end in V?", answer: "No. All {N} five-letter words ending in V are rare loanwords or slang outside the official answer pool, and {ANSWERED} of them has ever been a Wordle solution. A green V in the final slot cannot be the daily NYT answer." },
    { question: "What is the best Wordle word ending in V?", answer: "PAREV is the least obscure — a kosher-dietary term using five distinct letters (P, A, R, E, V). It is still not a serious guess; you are far better off opening with a word like SLATE or CRANE." },
    { question: "Why do so few words end in V?", answer: "English spelling almost always follows a final V with a silent E — LOVE, GIVE, MOVE, HAVE. That convention is exactly why a five-letter word ending in a bare V is such an oddity, limited to loanwords (PAREV, SCHAV) and slang (SKEEV, GANEV)." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
