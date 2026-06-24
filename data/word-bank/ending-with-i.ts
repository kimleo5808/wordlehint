import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-i.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "I",
  path: "/5-letter-words/ending-with-i",
  lastUpdated: "2026-06-24",
  topOpener: "SWAMI",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in I — the common answer-pool words first, with past Wordle answers flagged and honest advice on the few I-enders worth playing.",
  introExtra:
    "I is an extremely rare final letter in Wordle: almost no native English words end in I, so the realistic set is loanwords and Latin plurals — about 11 recognisable words in all. That makes it good to know, because a green I in the last slot narrows the field to a tiny list (SUSHI, KHAKI, ALIBI, FUNGI and a few more). There are no real English families to lean on here, and I-enders make weak openers because the final I rarely lines up with other frequent letters.",
  openersIntro:
    "Be honest — most words ending in I are poor openers, and you should usually only play one once the final I is already green. The picks below are the few distinct-letter exceptions that still test useful letters.",
  openers: [
    { word: "SWAMI", tests: "S · W · A · M · I", why: "Five distinct letters including the vowels A and I plus the frequent S — the strongest I-ending opener with no repeats.", best: true },
    { word: "QUASI", tests: "Q · U · A · S · I", why: "Covers three vowels (U, A, I) plus S — vowel-rich coverage, though the Q is low-value." },
    { word: "FUNGI", tests: "F · U · N · G · I", why: "Distinct letters testing F, U, N and G around the final I — a useful Latin-plural to remember." },
  ],
  strategyParagraphs: [
    "When the last tile is a green I, you are in luck: almost no common words end in I, so this is one of the shortest hunts in Wordle. Rather than brute-forcing letters, scan the small list of loanwords and Latin plurals and you will usually spot the answer right away.",
    "There are no real English families here. The common I-enders split into borrowed words — SUSHI, KHAKI, SWAMI, ENNUI, RABBI, ALIBI, CHILI and QUASI — and Latin plurals: CACTI, FUNGI and RADII. It helps to remember that CACTI, FUNGI and RADII are simply the plurals of the -US words cactus, fungus and radius, so they show up more often than you might expect.",
    "Be honest about openers. The final I rarely pairs with other high-frequency letters, so most I-enders are better to know than to open with. SWAMI is the usable exception because it carries five distinct letters; for everything else, open with a word like SLATE or CRANE and save the I-enders for once the final I is green.",
  ],
  faq: [
    { question: "How many 5-letter words end in I?", answer: "There are {N} valid five-letter words ending in I in the Wordle dictionary, but only {COMMON} are common answer-pool words — I is one of the rarest final letters in Wordle answers, since almost no native English word ends in I." },
    { question: "What is the best Wordle word ending in I?", answer: "SWAMI is the strongest I-ending pick: it tests five distinct letters including the vowels A and I plus the frequent S. That said, I-ending words are generally weak openers, so SWAMI is best played once you have already locked a green I in the last slot." },
    { question: "Which 5-letter words ending in I have been Wordle answers?", answer: "Only {ANSWERED} I-ending words have appeared as official Wordle answers in the puzzles we track — ALIBI, CACTI, CHILI and EMOJI. That small number reflects how rare an I ending is, and since the NYT almost never repeats a solution, these are lower-probability picks for today." },
    { question: "What 5-letter words end in I are loanwords or Latin plurals?", answer: "Almost all of them. The loanwords include SUSHI, KHAKI, SWAMI, ENNUI, RABBI, ALIBI, CHILI and QUASI; the Latin plurals are CACTI, FUNGI and RADII — the plurals of cactus, fungus and radius. There are no native English families ending in I." },
    { question: "Are 5-letter words ending in I good Wordle starters?", answer: "Mostly no. The final I rarely pairs with other frequent letters, so most I-enders waste the fixed final slot. SWAMI is the usable exception, but you are better off opening with a word like SLATE or CRANE and saving I-enders for once the final I is green." },
    { question: "What are 5-letter words ending in I with lots of vowels?", answer: "QUASI, ENNUI and ALIBI each carry multiple vowels while ending in I. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
