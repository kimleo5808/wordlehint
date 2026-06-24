import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-z.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "Z",
  path: "/5-letter-words/ending-with-z",
  lastUpdated: "2026-06-24",
  topOpener: "WALTZ",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in Z — the common answer-pool words first, with past Wordle answers flagged and honest advice on the (handful of) Z-enders worth playing.",
  introExtra:
    "Z is essentially the rarest ending in Wordle: only four common, everyday words end in Z — BLITZ, FRITZ, TOPAZ and WALTZ — and three of them belong to the same _ _ _ T Z family, with TOPAZ the lone _ _ _ A Z word. That is the entire usable set. So if you have ever locked a green Z in the last slot, the answer is almost certainly one of these four. The Z is not a real opener letter at all; the value of knowing these words is pure recognition.",
  openersIntro:
    "Be honest with yourself here — Z is not an opener letter, and these words exist mainly to be recognised once the Z is green. The three distinct-letter picks below are the entire usable set; only WALTZ tests enough frequent letters to bother opening with.",
  openers: [
    { word: "WALTZ", tests: "W · A · L · T · Z", why: "Five distinct letters testing the frequent A, L and T plus W — the strongest Z-ending pick, and about the only one worth opening with.", best: true },
    { word: "BLITZ", tests: "B · L · I · T · Z", why: "Distinct letters covering the vowel I plus B, L and T — a reasonable change-up, weaker than WALTZ." },
    { word: "TOPAZ", tests: "T · O · P · A · Z", why: "Tests T, O, P and A around the Z — distinct letters, but the lone -AZ word and an uncommon guess." },
  ],
  strategyParagraphs: [
    "First, appreciate just how rare this is. Z is essentially the rarest final letter in Wordle — only four common words end in Z: BLITZ, FRITZ, TOPAZ and WALTZ. A green Z in the last slot doesn't narrow the field; it almost names the answer outright.",
    "Walk the tiny families. Three of the four are -TZ words (BLITZ, FRITZ, WALTZ), so if the second-to-last letter is T you are choosing between just those three. TOPAZ is the only -AZ word — the sole exception worth remembering.",
    "Be honest about openers. Z is not a starter letter, and only WALTZ packs enough frequent letters (A, L, T) to justify opening with it as a change-up. These words are purely 'know it' value — save them for once the Z is locked, and open with something like SLATE or CRANE instead.",
  ],
  faq: [
    { question: "How many 5-letter words end in Z?", answer: "Z is essentially the rarest final letter in Wordle: there are {N} valid five-letter words ending in Z in the dictionary, but only {COMMON} are common answer-pool words — BLITZ, FRITZ, TOPAZ and WALTZ, three of them in the -TZ family. A green Z almost names the answer outright." },
    { question: "What is the best Wordle word ending in Z?", answer: "WALTZ is the strongest Z-ending pick: it tests five distinct letters including the frequent A, L and T. It is about the only Z-ender worth opening with — BLITZ is a reasonable change-up, but Z-enders are best played once you have already locked a green Z in the last slot." },
    { question: "Which 5-letter words ending in Z have been Wordle answers?", answer: "Only {ANSWERED} Z-ending word has appeared as an official Wordle answer in the puzzles we track — FRITZ. That tiny number reflects how rare a Z ending is, and since the NYT almost never repeats a solution, it is a lower-probability pick for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -TZ or -AZ?", answer: "These two endings cover every common Z-ender. -TZ includes BLITZ, FRITZ and WALTZ — three of the four. -AZ has just TOPAZ. Checking whether the second-to-last letter is T or A is the fastest way to solve a Z-ending puzzle." },
    { question: "Are 5-letter words ending in Z good Wordle starters?", answer: "No, not really. Z is one of the lowest-frequency letters and there are only four common Z-enders, so opening with one wastes coverage. WALTZ is the single usable exception because of its A, L and T, but you are better off opening with a word like SLATE or CRANE and saving Z-enders for once the final Z is green." },
    { question: "What are 5-letter words ending in Z with lots of vowels?", answer: "TOPAZ carries two vowels (O and A) while ending in Z, and BLITZ and FRITZ each carry the vowel I. With only four common Z-enders, there is little vowel variety to map here." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
