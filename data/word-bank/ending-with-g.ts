import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-g.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "G",
  path: "/5-letter-words/ending-with-g",
  lastUpdated: "2026-06-24",
  topOpener: "ALONG",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in G — common answer-pool words first, with the strongest G-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in G are almost entirely the _ _ _ N G shape — the -NG digraph swallows nearly every common G-ender, leaving only a tiny -UG tail behind it. That makes G a great ending to know but a weak one to open with: once you have a green G, the N in front of it is close to guaranteed, so the real work is the vowel and the first two letters. Treat G endings as a solving shortcut rather than a starting move, and lean on the vowel + opening consonants to finish.",
  openersIntro:
    "Be honest: most G-enders make only mediocre openers, because the locked N-G eats two slots and limits vowel coverage. The picks below are the best of a modest bunch — play them when you specifically want a G on the board, not as your everyday starter.",
  openers: [
    { word: "ALONG", tests: "A · L · O · N · G", why: "Maps two frequent vowels, A and O, plus L, N and G with no repeats — the best of a modest set of G-enders.", best: true },
    { word: "BRING", tests: "B · R · I · N · G", why: "Tests B and R plus the vowel I, though the locked N-G limits how much it covers." },
    { word: "SLANG", tests: "S · L · A · N · G", why: "Brings S and L around the vowel A, with the usual -NG tail." },
    { word: "PRONG", tests: "P · R · O · N · G", why: "Covers P and R plus the vowel O — distinct letters, but N-G is fixed." },
    { word: "YOUNG", tests: "Y · O · U · N · G", why: "Probes two vowels, O and U, plus the less-common Y before the -NG." },
    { word: "THING", tests: "T · H · I · N · G", why: "Tests T, H and the vowel I — a common -ING word, but coverage is narrow." },
  ],
  strategyParagraphs: [
    "The family is the puzzle, and here the family is almost a single shape. The -NG digraph dominates G-enders so completely that a green G in the last slot all but guarantees an N in the 4th — so don't spend a guess confirming it. The decision that matters is the vowel sitting in the middle, which sorts the whole list.",
    "Walk the -NG sub-shapes by vowel. _ANG holds CLANG, SLANG and TWANG; _ING is the biggest, with BEING, BRING, CLING, DOING, FLING, GOING, STING, SWING, THING and WRING; _ONG covers ALONG, AMONG, PRONG, THONG and WRONG; and _UNG gathers CLUNG, FLUNG, SLUNG, STUNG, SWUNG and WRUNG. Lock the vowel and you have nearly solved the word.",
    "Mind the tiny non-NG tail. A few G-enders skip the digraph entirely — DEBUG and SHRUG end in -UG — so if your letters rule out an N in the 4th slot, that small -UG set is where the answer hides. It's the one outlier worth keeping in mind once -NG is off the table.",
  ],
  faq: [
    { question: "How many 5-letter words end in G?", answer: "There are {N} five-letter words ending in G in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — and nearly all of them end in -NG, since that digraph dominates G-enders." },
    { question: "What is the best Wordle word ending in G?", answer: "ALONG is the strongest G-ending pick: it maps two frequent vowels, A and O, plus L, N and G with no repeats. Be honest, though — most G-enders make only mediocre openers, because the locked N-G eats two slots. BRING and SLANG are the next best of a modest bunch." },
    { question: "Which 5-letter words ending in G have been Wordle answers?", answer: "{ANSWERED} G-ending words have already appeared as official Wordle answers in the puzzles we track, including AMONG, BRING, CLANG, CLUNG and SWING. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -NG?", answer: "Almost all of them — the -NG digraph swallows nearly every common G-ender. By vowel: _ANG (CLANG, SLANG, TWANG), _ING (BRING, CLING, FLING, STING, SWING, THING), _ONG (ALONG, AMONG, PRONG, WRONG) and _UNG (CLUNG, FLUNG, STUNG, SWUNG). Locking the middle vowel is the fastest way to solve a G-ending puzzle." },
    { question: "Are 5-letter words ending in G good Wordle starters?", answer: "Not really. Because nearly every common G-ender ends in -NG, the N and G are locked together and vowel coverage is limited, so these make weak openers. G is far better to know than to open with — once the G is green, it's almost certainly -NG, so focus on the vowel and the first two letters. ALONG is the best of a modest bunch." },
    { question: "What are 5-letter words ending in G with lots of vowels?", answer: "ALONG, AMONG, YOUNG, AGING, OWING and EYING each carry two vowels while ending in G. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
