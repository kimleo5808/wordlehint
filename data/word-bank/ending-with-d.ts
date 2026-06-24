import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-d.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "D",
  path: "/5-letter-words/ending-with-d",
  lastUpdated: "2026-06-24",
  topOpener: "TREAD",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in D — common answer-pool words first, with the strongest D-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in D split into six families — _ _ _ I D, _ _ _ E D, _ _ _ N D, _ _ _ R D, _ _ _ A D and _ _ _ L D. The two that trip players up are the large _ _ _ I D adjective group (RABID, VALID, VIVID) and the _ _ I E D past-tense set (CRIED, DRIED, TRIED). D is also opener-friendly: TREAD, STAND and BOARD test the game's most frequent letters, so a strong D-ending guess can double as a good first word.",
  openersIntro:
    "Words ending in D can open well when they avoid the predictable past-tense ending and pair D with high-value letters like T, R, E, A, S and N. The picks below stick to distinct-letter words.",
  openers: [
    { word: "TREAD", tests: "T · R · E · A · D", why: "Tests four of the most frequent letters in Wordle answers (T, R, E, A) plus D, with no repeats — the strongest D-ending opener.", best: true },
    { word: "STAND", tests: "S · T · A · N · D", why: "Five distinct letters bringing the high-value S and N around T, A and D." },
    { word: "BOARD", tests: "B · O · A · R · D", why: "Distinct letters covering the vowels O and A plus the consonants B and R." },
    { word: "BREAD", tests: "B · R · E · A · D", why: "Tests the frequent R, E and A with B and D — strong coverage and no repeats." },
    { word: "SOUND", tests: "S · O · U · N · D", why: "Brings S and the vowels O and U; a good way to probe U early." },
    { word: "BLAND", tests: "B · L · A · N · D", why: "Tests the useful L and N around B, A and D — a solid alternative opener." },
  ],
  strategyParagraphs: [
    "Check the -IED past tense first. A surprising share of D-enders are _ _ I E D past-tense verbs — CRIED, DRIED, FRIED, PRIED, SPIED and TRIED. If you already have an E in the 4th slot, test this shape early; it collapses to just the first one or two letters.",
    "Then work the -ID adjectives. The largest family ending in D is -ID: RABID, RAPID, VALID, VIVID, SOLID, LUCID, TIMID, HUMID and FLUID. Many share the _ _ I _ D skeleton, so the 2nd and 3rd letters are what decide it.",
    "Cover the remaining shapes. -ND (BLAND, BOUND, GRAND, ROUND, STAND), -RD (AWARD, BOARD, GUARD, HEARD, WORLD), -AD (AHEAD, BREAD, SALAD, SQUAD) and -LD (BUILD, CHILD, FIELD, YIELD) round out the list — and don't forget the modal forms COULD and WOULD.",
  ],
  faq: [
    { question: "How many 5-letter words end in D?", answer: "There are {N} five-letter words ending in D in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle word ending in D?", answer: "TREAD is the strongest D-ending pick: it tests T, R, E and A — four of the most frequent letters in Wordle answers — plus D, with no repeats. That makes it a strong opener that just happens to end in D. STAND and BOARD are close behind." },
    { question: "Which 5-letter words ending in D have been Wordle answers?", answer: "{ANSWERED} D-ending words have already appeared as official Wordle answers in the puzzles we track, including BEARD, AVOID, SQUAD, SPEED and STAND. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -ID, -ED or -ND?", answer: "These are three of the six families before D. -ID includes RABID, VALID and VIVID; -ED includes CRIED, SPEED and BREED; -ND includes BOUND, GRAND and STAND. Knowing which family fits your letters is the fastest way to solve a D-ending puzzle." },
    { question: "Are 5-letter words ending in D good Wordle starters?", answer: "Distinct-letter ones are. TREAD, STAND and BOARD test the game's most frequent letters and make strong openers. Avoid the -ED past-tense words like CRIED or AIMED, though — they waste a guess on the predictable E-D ending. Test fresh letters on your second guess." },
    { question: "What are 5-letter words ending in D with lots of vowels?", answer: "ALOUD, AVOID, CLOUD, OVOID, AHEAD and TRIAD each carry two or more vowels while ending in D. They are an efficient way to map the puzzle's vowel skeleton early when the last letter is already locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
