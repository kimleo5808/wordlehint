import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-w.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "W",
  path: "/5-letter-words/ending-with-w",
  lastUpdated: "2026-06-24",
  topOpener: "STRAW",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in W — the common answer-pool words first, with past Wordle answers flagged and honest advice on the few W-enders worth playing.",
  introExtra:
    "W is a rare final letter in Wordle: only about 17 common, recognisable words end in W, and almost all of them are -OW or -EW words. That makes it good to know — a green W in the last slot narrows the field to a tiny, scannable list you can almost read off by heart. But it also makes W-enders weak openers: STRAW and THROW pack a few useful letters, yet most W-ending words bury the vowel in the middle and waste the fixed final slot on a low-frequency letter.",
  openersIntro:
    "Be honest — most words ending in W are poor openers, and you should usually only play one once the final W is already green. The picks below are the few distinct-letter exceptions that still test useful letters.",
  openers: [
    { word: "STRAW", tests: "S · T · R · A · W", why: "Tests the frequent S, T, R and A with no repeats — easily the strongest W-ending opener, on par with a solid mid-tier guess.", best: true },
    { word: "THROW", tests: "T · H · R · O · W", why: "Five distinct letters covering T, H, R and the vowel O — a good way to probe O early." },
    { word: "ELBOW", tests: "E · L · B · O · W", why: "Distinct letters testing the vowels E and O plus L and B for broad early coverage." },
    { word: "SCREW", tests: "S · C · R · E · W", why: "Brings S, C, R and the vowel E together — a useful -EW option with no repeats." },
    { word: "BELOW", tests: "B · E · L · O · W", why: "Covers the vowels E and O with B and L — handy for mapping vowels when the W is already locked." },
  ],
  strategyParagraphs: [
    "When the last tile is a green W, you are in luck: only a small set of common words end in W, so this is a very short hunt. Rather than brute-forcing letters, scan the two big families — -OW and -EW — and you will usually spot the answer in seconds.",
    "Work the families. The -OW group dominates (AGLOW, ALLOW, ARROW, BELOW, ELBOW, ENDOW, WIDOW, THROW), followed by the -EW group (ASKEW, RENEW, SCREW, SHREW, SINEW, THREW). A small -AW tail (BYLAW, MACAW, STRAW) rounds out almost the entire common set, so deciding between -OW, -EW and -AW eliminates most of the list immediately.",
    "Be honest about openers. W is a low-frequency letter and parking it in the fixed final slot wastes the slot, so most W-enders are better to know than to open with. STRAW and THROW are the usable exceptions; for everything else, open with a word like SLATE or CRANE and save the W-enders for once the final W is green.",
  ],
  faq: [
    { question: "How many 5-letter words end in W?", answer: "There are {N} valid five-letter words ending in W in the Wordle dictionary, but only {COMMON} are common answer-pool words — W is one of the rarest final letters in Wordle answers, and almost every common W-ender is an -OW or -EW word." },
    { question: "What is the best Wordle word ending in W?", answer: "STRAW is the strongest W-ending pick: it tests four frequent letters (S, T, R, A) with no repeats. THROW is close behind. That said, W-ending words are generally weak openers, so STRAW and THROW are best played once you have already locked a green W in the last slot." },
    { question: "Which 5-letter words ending in W have been Wordle answers?", answer: "Only {ANSWERED} W-ending word has appeared as an official Wordle answer in the puzzles we track — BYLAW. That tiny number reflects how rare a W ending is, and since the NYT almost never repeats a solution, it is a lower-probability pick for today." },
    { question: "What 5-letter words end in -OW or -EW?", answer: "These two endings cover almost every common W-ender. -OW includes AGLOW, ARROW, BELOW, ELBOW, WIDOW and THROW; -EW includes ASKEW, RENEW, SCREW, SHREW and THREW. Deciding which family fits is the fastest way to solve a W-ending puzzle." },
    { question: "Are 5-letter words ending in W good Wordle starters?", answer: "Mostly no. W is a low-frequency letter, and putting it in a fixed final slot wastes the slot while the vowel hides in the middle. STRAW and THROW are the usable exceptions, but you are better off opening with a word like SLATE or CRANE and saving W-enders for once the final W is green." },
    { question: "What are 5-letter words ending in W with lots of vowels?", answer: "BELOW, ENDOW, RENEW and ELBOW each carry two vowels while ending in W. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
