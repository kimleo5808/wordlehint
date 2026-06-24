import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-x.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "X",
  path: "/5-letter-words/ending-with-x",
  lastUpdated: "2026-06-24",
  topOpener: "RELAX",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in X — the common answer-pool words first, with past Wordle answers flagged and honest advice on the (very few) X-enders worth playing.",
  introExtra:
    "X is among the rarest final letters in Wordle: only about eight common, everyday words end in X, and they split neatly across four tiny families — _ _ _ I X (AFFIX, HELIX), _ _ _ E X (ANNEX, INDEX), _ _ _ A X (BORAX, RELAX) and _ _ _ O X (DETOX, INBOX). That is the whole list. So a green X in the last slot is a gift: it narrows the answer to a handful of words instantly, and the vowel before the X usually decides it. RELAX and INDEX are okay openers; the rest are not.",
  openersIntro:
    "Be honest with yourself here — most X-enders are poor openers, because the X is a low-frequency letter parked in a fixed final slot. The picks below are the distinct-letter exceptions, and only the first two are genuinely worth opening with.",
  openers: [
    { word: "RELAX", tests: "R · E · L · A · X", why: "Five distinct letters testing the frequent R, E, L and A — the strongest X-ending opener by a clear margin, roughly on par with a solid mid-tier opener.", best: true },
    { word: "INDEX", tests: "I · N · D · E · X", why: "Distinct letters covering the vowels I and E plus N and D — the second-best X-ender to open with." },
    { word: "HELIX", tests: "H · E · L · I · X", why: "Tests E, L, I and H around the X — a reasonable change-up but weaker than RELAX." },
    { word: "BORAX", tests: "B · O · R · A · X", why: "Distinct letters covering the vowels O and A plus B and R, though it is an uncommon word." },
    { word: "DETOX", tests: "D · E · T · O · X", why: "Tests D, E, T and the vowel O — distinct letters, but the X drags the coverage down." },
  ],
  strategyParagraphs: [
    "First, appreciate how rare this is. X is one of the very rarest endings in Wordle — only about eight common words end in X, so a green X in the last slot collapses the field to a tiny, scannable set almost immediately. You are not brute-forcing letters here; you are recognising one of a handful of words.",
    "Walk the four tiny families. Every common X-ender sits in one of them: -IX (AFFIX, HELIX), -EX (ANNEX, INDEX), -AX (BORAX, RELAX) and -OX (DETOX, INBOX). The vowel directly before the X is the decider — pin that down and you are almost certainly looking at one of just two words.",
    "Be honest about openers. RELAX and INDEX test enough frequent letters to be usable first guesses, but the rest are not — the low-value X in a fixed slot wastes a tile. X endings are far better to know than to open with, so save them for once the X is green.",
  ],
  faq: [
    { question: "How many 5-letter words end in X?", answer: "X is among the rarest final letters in Wordle: there are {N} valid five-letter words ending in X in the dictionary, but only {COMMON} are common answer-pool words, split across the tiny -IX, -EX, -AX and -OX families. A green X narrows the answer to a handful of words instantly." },
    { question: "What is the best Wordle word ending in X?", answer: "RELAX is the strongest X-ending pick: it tests five distinct, frequent letters (R, E, L, A, X). INDEX is the next best. Most other X-enders are weak openers, so RELAX and INDEX are best played once you have already locked a green X in the last slot." },
    { question: "Which 5-letter words ending in X have been Wordle answers?", answer: "Only {ANSWERED} X-ending word has appeared as an official Wordle answer in the puzzles we track — DETOX. That tiny number reflects how rare an X ending is, and since the NYT almost never repeats a solution, it is a lower-probability pick for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -IX, -EX, -AX or -OX?", answer: "These four endings cover every common X-ender. -IX includes AFFIX and HELIX; -EX includes ANNEX and INDEX; -AX includes BORAX and RELAX; -OX includes DETOX and INBOX. Spotting which family fits — by the vowel before the X — is the fastest way to solve an X-ending puzzle." },
    { question: "Are 5-letter words ending in X good Wordle starters?", answer: "Mostly no. Parking the low-frequency X in a fixed final slot wastes a tile, and few X-enders use other frequent letters. RELAX and INDEX are the usable exceptions, but you are better off opening with a word like SLATE or CRANE and saving X-enders for once the final X is green." },
    { question: "What are 5-letter words ending in X with lots of vowels?", answer: "DETOX, HELIX, INDEX and RELAX each carry two vowels while ending in X. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
