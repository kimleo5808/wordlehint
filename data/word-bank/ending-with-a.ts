import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-a.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "A",
  path: "/5-letter-words/ending-with-a",
  lastUpdated: "2026-06-24",
  topOpener: "DELTA",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in A — the common answer-pool words first, with past Wordle answers flagged and honest advice on the (few) A-enders worth playing.",
  introExtra:
    "A is one of the rarest final letters in Wordle answers: of the hundreds of valid words ending in A, only a small set are common, recognisable words, and most of those are loanwords — DRAMA, PIZZA, OPERA, ARENA, ZEBRA, PASTA. That is good news and bad news. The good news: a green A in the last slot narrows the field to a tiny, scannable list. The bad news: A-ending words make weak openers, because parking the most common vowel in a fixed final slot wastes it.",
  openersIntro:
    "Be honest with yourself here — most words ending in A are poor openers, and you should usually only play one once the final A is already green. The picks below are the few distinct-letter exceptions that still test useful letters.",
  openers: [
    { word: "DELTA", tests: "D · E · L · T · A", why: "Five distinct letters including the frequent E, L, T and A — the strongest A-ending opener, roughly on par with a solid mid-tier opener.", best: true },
    { word: "OPERA", tests: "O · P · E · R · A", why: "Vowel-rich (O, E, A) plus P and R — a good way to map vowels when you want broad coverage." },
    { word: "EXTRA", tests: "E · X · T · R · A", why: "Tests the frequent E, T, R and A; the X is low-value, but the rest of the word is strong." },
    { word: "ULTRA", tests: "U · L · T · R · A", why: "Brings the vowel U together with L, T and R — useful for probing U early." },
    { word: "COBRA", tests: "C · O · B · R · A", why: "Distinct letters covering the vowels O and A plus the consonants C, B and R." },
    { word: "ZEBRA", tests: "Z · E · B · R · A", why: "Distinct letters testing E and A, though the Z is rare — a change-up rather than a first choice." },
  ],
  strategyParagraphs: [
    "When the last tile is a green A, you are in luck: only a small set of common words end in A, so this is a short hunt. Rather than brute-forcing letters, scan the loanword families and you will usually spot the answer quickly.",
    "Work the families. The most common shapes ending in A are the _ _ _ M A (AROMA, DRAMA, KARMA, MAGMA, SIGMA, COMMA), _ _ _ R A (COBRA, EXTRA, OPERA, ULTRA, ZEBRA, TIARA) and _ _ _ T A (DELTA, PASTA, QUOTA, VISTA, JUNTA) patterns, followed by _ _ _ N A (ARENA, CHINA, FAUNA), _ _ _ L A (KOALA, VILLA, VIOLA) and _ _ _ I A (MAFIA, MEDIA, SEPIA).",
    "Mind the doubled letters and loanwords. COMMA, MAMMA, GAMMA, KAPPA, PIZZA and MECCA all double a letter, and many A-enders are borrowed words you might not think to guess — JUNTA, RUMBA, VODKA, POLKA and NINJA among them.",
  ],
  faq: [
    { question: "How many 5-letter words end in A?", answer: "There are {N} valid five-letter words ending in A in the Wordle dictionary, but only {COMMON} are common answer-pool words — A is one of the rarest final letters in Wordle answers. Most A-enders are obscure or loanwords." },
    { question: "What is the best Wordle word ending in A?", answer: "DELTA is the strongest A-ending pick: it tests five distinct, frequent letters (D, E, L, T, A). That said, A-ending words are generally weak openers, so DELTA and OPERA are best played once you have already locked a green A in the last slot." },
    { question: "Which 5-letter words ending in A have been Wordle answers?", answer: "Only {ANSWERED} A-ending words have appeared as official Wordle answers in the puzzles we track — DRAMA, GUAVA, HYDRA, MAFIA, PARKA, SEPIA and UMBRA. That small number reflects how rare an A ending is, and since the NYT almost never repeats a solution, these are lower-probability picks for today." },
    { question: "What 5-letter words end in -MA, -RA or -TA?", answer: "These are the densest endings before A, and most are loanwords. -MA includes AROMA, DRAMA and KARMA; -RA includes COBRA, EXTRA and OPERA; -TA includes DELTA, PASTA and QUOTA. Scanning these families is the fastest way to solve an A-ending puzzle." },
    { question: "Are 5-letter words ending in A good Wordle starters?", answer: "Mostly no. Putting A — the most common vowel — in a fixed final slot wastes it, and few A-enders use other frequent letters. DELTA and OPERA are the usable exceptions, but you are better off opening with a word like SLATE or CRANE and saving A-enders for once the final A is green." },
    { question: "What are 5-letter words ending in A with lots of vowels?", answer: "APNEA, AORTA, COCOA, GUAVA, MEDIA, OPERA, VIOLA and AROMA each carry multiple vowels while ending in A. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
