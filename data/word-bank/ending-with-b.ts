import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-b.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "B",
  path: "/5-letter-words/ending-with-b",
  lastUpdated: "2026-06-24",
  topOpener: "CLIMB",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in B — the common answer-pool words first, with past Wordle answers flagged and honest advice on the few B-enders worth playing.",
  introExtra:
    "B is one of the rarest final letters in Wordle: only about 11 common, recognisable words end in B. That makes it great to know — a green B in the last slot narrows the field to a tiny, scannable set. The big trap is the silent B in the -MB words: CLIMB, CRUMB, PLUMB and THUMB all end in a B you never hear, so it is easy to overlook. B-enders also make poor openers, because B is a low-frequency letter that wastes the fixed final slot.",
  openersIntro:
    "Be honest — most words ending in B are poor openers, and you should usually only play one once the final B is already green. The picks below are the few distinct-letter exceptions that still test useful letters.",
  openers: [
    { word: "CLIMB", tests: "C · L · I · M · B", why: "Tests the vowel I plus C, L and M with no repeats — the strongest B-ending opener, and a useful reminder of the silent-B trap.", best: true },
    { word: "CRUMB", tests: "C · R · U · M · B", why: "Five distinct letters covering C, R and the vowel U around M and B — a good way to probe U early." },
    { word: "SCRUB", tests: "S · C · R · U · B", why: "Brings the frequent S, C and R together with the vowel U — strong consonant coverage with no repeats." },
    { word: "SHRUB", tests: "S · H · R · U · B", why: "Tests S, H, R and the vowel U — a solid -UB option for broad early coverage." },
  ],
  strategyParagraphs: [
    "When the last tile is a green B, you are in luck: only a small set of common words end in B, so this is one of the shortest hunts in Wordle. Rather than brute-forcing letters, scan the handful of families below and you will usually spot the answer almost immediately.",
    "Work the families, and mind the silent B. The biggest group is -MB, where the B is silent (CLIMB, CRUMB, PLUMB, THUMB) — easy to forget, so check it first. After that come the -UB words (SCRUB, SHRUB, SQUIB), a lone -OB (THROB), the -AB pair (KEBAB, REHAB) and a single -RB (BLURB). That is nearly the entire common set.",
    "Be honest about openers. B is a low-frequency letter and parking it in the fixed final slot wastes it, so most B-enders are better to know than to open with. CLIMB and SCRUB are the usable exceptions; for everything else, open with a word like SLATE or CRANE and save the B-enders for once the final B is green.",
  ],
  faq: [
    { question: "How many 5-letter words end in B?", answer: "There are {N} valid five-letter words ending in B in the Wordle dictionary, but only {COMMON} are common answer-pool words — B is one of the rarest final letters in Wordle answers, with no large family to draw on." },
    { question: "What is the best Wordle word ending in B?", answer: "CLIMB is the strongest B-ending pick: it tests the vowel I plus C, L and M with no repeats, and it is a handy reminder of the silent-B trap. That said, B-ending words are generally weak openers, so CLIMB and SCRUB are best played once you have already locked a green B in the last slot." },
    { question: "Which 5-letter words ending in B have been Wordle answers?", answer: "Only {ANSWERED} B-ending word has appeared as an official Wordle answer in the puzzles we track — THUMB. That tiny number reflects how rare a B ending is, and since the NYT almost never repeats a solution, it is a lower-probability pick for today." },
    { question: "What 5-letter words end in -MB with a silent B?", answer: "The -MB words hide a silent B you never pronounce: CLIMB, CRUMB, PLUMB and THUMB. They are the biggest family of B-enders and the easiest to overlook, so check them first when a green B locks in the last slot." },
    { question: "Are 5-letter words ending in B good Wordle starters?", answer: "Mostly no. B is a low-frequency letter, and putting it in a fixed final slot wastes the slot. CLIMB and SCRUB are the usable exceptions, but you are better off opening with a word like SLATE or CRANE and saving B-enders for once the final B is green." },
    { question: "What are 5-letter words ending in B with lots of vowels?", answer: "REHAB, KEBAB and SQUIB each carry two vowels while ending in B. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
