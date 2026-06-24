import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-l.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "L",
  path: "/5-letter-words/ending-with-l",
  lastUpdated: "2026-06-24",
  topOpener: "STEAL",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in L — common answer-pool words first, with the strongest L-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in L are one of the friendlier endings to work with: the penultimate letter spreads across several useful families, and a few L-enders are genuinely strong openers. The densest groups are _ _ _ A L (FATAL, CANAL, LEGAL), _ _ _ E L (ANGEL, CAMEL, HOTEL), the double _ _ _ L L (CHILL, DRILL, SKILL) and _ _ _ I L (ANVIL, CIVIL, SNAIL). Once you have locked a green L in the last slot, the 4th letter — the family you are in — is the real puzzle, and STEAL, an anagram of SLATE, is one of the best openers on the whole site.",
  openersIntro:
    "L is an opener-friendly ending: because the last letter sits cleanly after a vowel or consonant without forcing a digraph, several L-enders pack high-value letters. The picks below are the distinct-letter standouts worth playing.",
  openers: [
    { word: "STEAL", tests: "S · T · E · A · L", why: "Tests five of the most frequent letters in Wordle answers (S, T, E, A, L) with no repeats — an anagram of SLATE and STALE, and one of the strongest openers anywhere on the site.", best: true },
    { word: "TRIAL", tests: "T · R · I · A · L", why: "Five distinct letters bringing T and R alongside the vowels I and A — broad early coverage that ends in L." },
    { word: "CORAL", tests: "C · O · R · A · L", why: "Tests the useful C with R and the vowels O and A — a solid -AL opener with no repeats." },
    { word: "PANEL", tests: "P · A · N · E · L", why: "Covers P and N around the vowels A and E — a clean -EL opener that probes two common vowels." },
    { word: "SNARL", tests: "S · N · A · R · L", why: "Brings S, N, A and R together — a strong consonant-heavy probe that lands the vowel A." },
    { word: "CRAWL", tests: "C · R · A · W · L", why: "Tests C, R, W and the vowel A — useful for checking the harder-to-place W early." },
  ],
  strategyParagraphs: [
    "Once the L is green, the 4th letter is the whole game. Unlike harsh consonant endings, L sits after almost anything, so the penultimate letter — and which family it puts you in — is what actually narrows the field. Decide whether you are looking at an -AL, -EL, -LL or -IL word and most of the list falls away.",
    "Walk the dense families in order. -AL is the largest: FATAL, CANAL, LEGAL, MORAL, VITAL, TOTAL, ROYAL, EQUAL, IDEAL and RURAL. Then -EL: ANGEL, CAMEL, HOTEL, LABEL, LEVEL, MODEL, NOVEL, PANEL, TOWEL and VOWEL. The double -LL set is tight and tricky — CHILL, DRILL, SKILL, SMALL, SMELL, SPELL, STILL, SWELL, TROLL and QUELL — and -IL covers ANVIL, BASIL, CIVIL, DEVIL, EMAIL, PERIL, PUPIL, SNAIL, TRAIL and QUAIL.",
    "Watch the thin -OL and -UL tail. After the four big families, the remaining L-enders are sparse: GHOUL, MOGUL and AWFUL are about all you will reach for. If your letters force an -OL or -UL ending, the candidate pool is small, so lean on those few rather than hunting for options that mostly do not exist.",
  ],
  faq: [
    { question: "How many 5-letter words end in L?", answer: "There are {N} five-letter words ending in L in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — a healthy share, because the -AL, -EL, -LL and -IL families are all well-stocked." },
    { question: "What is the best Wordle word ending in L?", answer: "STEAL is the strongest L-ending pick: it tests S, T, E, A and L — five of the most frequent letters in Wordle answers — with no repeats, and it is an anagram of SLATE and STALE. TRIAL and CORAL are close behind. L is one of the more opener-friendly endings." },
    { question: "Which 5-letter words ending in L have been Wordle answers?", answer: "{ANSWERED} L-ending words have already appeared as official Wordle answers in the puzzles we track, including TRIAL, IDEAL, RURAL, VOWEL and SMELL. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -AL, -EL or -LL?", answer: "These families cover most common L-enders. -AL includes FATAL, LEGAL and ROYAL; -EL includes ANGEL, HOTEL and MODEL; -LL includes CHILL, SPELL and SWELL; and -IL adds CIVIL, SNAIL and TRAIL. Spotting which family fits is the fastest way to solve an L-ending puzzle." },
    { question: "Are 5-letter words ending in L good Wordle starters?", answer: "Yes — more than most endings. STEAL, TRIAL and CORAL all pack frequent letters and make genuinely strong openers because L sits cleanly at the end without forcing a digraph. Knowing the L-enders early is both a good opener and a good close." },
    { question: "What are 5-letter words ending in L with lots of vowels?", answer: "AVAIL, EMAIL, EQUAL, IDEAL, AXIAL and USUAL each carry several vowels while ending in L. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
