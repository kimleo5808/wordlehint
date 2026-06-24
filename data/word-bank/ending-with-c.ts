import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-c.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "C",
  path: "/5-letter-words/ending-with-c",
  lastUpdated: "2026-06-24",
  topOpener: "STOIC",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in C — common answer-pool words first, with the strongest C-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in C are almost always _ _ _ I C. The -IC family — a huge set of adjectives and nouns like BASIC, LOGIC, MAGIC, PANIC, TOPIC and TOXIC — overwhelmingly dominates the list, with only small _ _ A C and _ _ _ O C tails. So once you have locked a green C in the last slot, the word is very likely _ _ _ I C, which means the puzzle really comes down to the first three letters. STOIC is the standout opener.",
  openersIntro:
    "C-enders make better openers than you might expect, because several -IC words carry five distinct letters and two vowels. The picks below are the distinct-letter words worth playing first.",
  openers: [
    { word: "STOIC", tests: "S · T · O · I · C", why: "Five distinct letters including the vowels O and I, plus the frequent S and T — a genuinely strong opener that happens to end in C.", best: true },
    { word: "PANIC", tests: "P · A · N · I · C", why: "Brings P, N and the vowels A and I around C — five distinct letters and a real answer." },
    { word: "RELIC", tests: "R · E · L · I · C", why: "Tests R, L and the vowels E and I — broad early coverage with no repeats." },
    { word: "LYRIC", tests: "L · Y · R · I · C", why: "Probes the awkward Y alongside L, R and I — useful for mapping that tricky letter early." },
    { word: "HAVOC", tests: "H · A · V · O · C", why: "Covers H, V and the vowels A and O — a rare -OC option that maps two vowels." },
    { word: "MAGIC", tests: "M · A · G · I · C", why: "Tests M, G and the vowels A and I — a clean -IC opener with no repeats." },
  ],
  strategyParagraphs: [
    "When C is locked, assume -IC. The -IC family overwhelmingly dominates C-enders — ANTIC, BASIC, COMIC, CUBIC, ETHIC, IONIC, LOGIC, LYRIC, MAGIC, MANIC, MUSIC, PANIC, RELIC, SONIC, TONIC, TOPIC, TOXIC and STOIC all fit the pattern. The moment you see a green C in the last slot, pencil in _ _ _ I C and focus your remaining guesses on the first three letters.",
    "Watch the small non-IC tails. A handful of C-enders break the -IC mould: -AC words like ILIAC, LILAC and SUMAC, and the lone -OC word HAVOC. These are the exceptions to keep in mind when an I in the fourth slot has already been ruled out.",
    "Lead with vowels to crack the front. Because -IC fixes the back of the word, your job is the opening three letters — so prioritise vowel coverage there. STOIC, IONIC and ILIAC each pack two vowels and make strong probes, letting you settle the front of the word before committing.",
  ],
  faq: [
    { question: "How many 5-letter words end in C?", answer: "There are {N} five-letter words ending in C in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — most of them members of the large -IC family." },
    { question: "What is the best Wordle word ending in C?", answer: "STOIC is the strongest C-ending pick: it carries five distinct letters including the vowels O and I, plus the frequent S and T. PANIC and RELIC are close behind. Several -IC words make surprisingly good openers." },
    { question: "Which 5-letter words ending in C have been Wordle answers?", answer: "{ANSWERED} C-ending words have already appeared as official Wordle answers in the puzzles we track, including ATTIC, COLIC, CUBIC, MANIC and SUMAC. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -IC?", answer: "The -IC family overwhelmingly dominates C-enders and includes ANTIC, BASIC, COMIC, CUBIC, ETHIC, IONIC, LOGIC, LYRIC, MAGIC, MANIC, MUSIC, PANIC, RELIC, SONIC, TONIC, TOPIC, TOXIC and STOIC. Once C is locked, the word is very likely _ _ _ I C." },
    { question: "Are 5-letter words ending in C good Wordle starters?", answer: "Some are — STOIC, PANIC and RELIC pack frequent letters and distinct vowels, so they make solid openers. Because -IC fixes the last two letters, though, C-enders are best once you want to lean into the -IC family rather than as a blind first guess." },
    { question: "What are 5-letter words ending in C with lots of vowels?", answer: "STOIC, IONIC and ILIAC each carry two vowels while ending in C. They are handy for mapping the puzzle's vowel skeleton and cracking the front of the word once the -IC pattern is in view." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
