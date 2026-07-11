import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-j.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * Reality check: J is the single rarest ending letter in five-letter Wordle.
 * The dictionary holds only 3 valid guesses ending in J and NONE are in the
 * answer pool, so this page is honest about the fact that a J ending can never
 * be the daily answer — it exists for completeness and for hard-mode curiosity.
 */
export const content: LetterContent = {
  letter: "J",
  path: "/5-letter-words/ending-with-j",
  lastUpdated: "2026-07-11",
  topOpener: "BASIJ",
  heroSubhead:
    "The complete (and very short) list of five-letter words that end in J. There are only a handful, all rare loanwords, and none belong to the Wordle answer pool — so a J ending is effectively impossible as a daily solution.",
  introExtra:
    "J is the rarest final letter in five-letter Wordle by a wide margin. English essentially never ends a word in J, so the only entries are transliterated loanwords like AFLAJ and FALAJ (Arabic irrigation channels) and BASIJ (a proper-noun militia). None are common enough to be a Wordle answer, and the NYT has never used one. Treat this page as a completeness reference, not a solving aid — if you are staring at a green J in the last slot, you are almost certainly in a variant, not the daily NYT puzzle.",
  openersIntro:
    "There is nothing worth opening with here — every J-ender is an obscure loanword that parks the low-value J in a fixed final slot. The list below is the full set, shown for reference rather than as recommended guesses.",
  openers: [
    { word: "BASIJ", tests: "B · A · S · I · J", why: "Five distinct letters (B, A, S, I, J) — the only J-ender that even tests a normal spread of letters, but it is a proper noun and not a realistic guess.", best: true },
    { word: "AFLAJ", tests: "A · F · L · A · J", why: "A plural of falaj (an Arabic irrigation channel); repeats A and is far too obscure to open with." },
    { word: "FALAJ", tests: "F · A · L · A · J", why: "The singular irrigation-channel loanword; repeats A and offers no practical Wordle value." },
  ],
  strategyParagraphs: [
    "Know that this ending cannot be the answer. Every five-letter word ending in J is a rare loanword outside the Wordle answer pool, and the NYT has never published a J-ending solution. If you are playing the official daily, you will never need one.",
    "Do not waste a guess chasing it. Because no J-ender is a plausible answer, there is no reason to play one even to test the letter J — you would learn almost nothing. Open with a strong, vowel-rich word like SLATE or CRANE instead.",
    "Where a J ending can appear is unlimited or variant modes with a larger word list. If a tool accepts AFLAJ, FALAJ or BASIJ, this is the whole set — there is nothing else to try.",
  ],
  faq: [
    { question: "How many 5-letter words end in J?", answer: "Only {N} valid five-letter words in the Wordle guess dictionary end in J — AFLAJ, BASIJ and FALAJ — and {COMMON} of them are common answer-pool words. English almost never ends a word in J, which is why the list is this short." },
    { question: "Can a Wordle answer end in J?", answer: "No. All {N} five-letter words ending in J are rare loanwords outside the official answer pool, and {ANSWERED} of them has ever been a Wordle solution. A J in the final slot cannot be the daily NYT answer." },
    { question: "What is the best Wordle word ending in J?", answer: "None are genuinely good, but BASIJ at least uses five distinct letters (B, A, S, I, J). It is a proper noun, so treat it as trivia rather than a real guess — you are far better off opening with SLATE or CRANE." },
    { question: "What do AFLAJ and FALAJ mean?", answer: "Both come from Arabic: a falaj is a traditional irrigation channel, and aflaj is its plural. They are accepted in some word lists as valid guesses but are not everyday English words, so they never appear as Wordle answers." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
