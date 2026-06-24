import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-h.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "H",
  path: "/5-letter-words/ending-with-h",
  lastUpdated: "2026-06-24",
  topOpener: "EARTH",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in H — common answer-pool words first, with the strongest H-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in H are dominated by three digraphs: _ _ _ C H, _ _ _ T H and _ _ _ S H together cover about 90% of common H-enders, with small _ _ _ G H and _ _ _ P H tails. So once you have locked a green H in the last slot, the word is almost certainly a -CH, -TH or -SH word, and the digraph plus the 3rd letter decide it. EARTH, NORTH and SOUTH pack top letters, but most H-enders are weak openers because the digraph eats the 4th slot.",
  openersIntro:
    "A few H-enders make genuinely strong openers because they pack high-value letters; most do not, because the -CH or -SH digraph fixes two of the last letters. The picks below are the distinct-letter exceptions worth playing.",
  openers: [
    { word: "EARTH", tests: "E · A · R · T · H", why: "Tests four of the most frequent letters in Wordle answers (E, A, R, T) plus H, with no repeats — a genuinely strong opener that happens to end in H.", best: true },
    { word: "NORTH", tests: "N · O · R · T · H", why: "Five distinct letters bringing N and the vowel O around R, T and H." },
    { word: "SOUTH", tests: "S · O · U · T · H", why: "Brings S and the vowels O and U — a good way to probe U early." },
    { word: "TEACH", tests: "T · E · A · C · H", why: "Tests the useful C with T, E and A — a strong -CH opener with no repeats." },
    { word: "CLOTH", tests: "C · L · O · T · H", why: "Covers C, L and the vowel O with T and H for broad early coverage." },
    { word: "BRUSH", tests: "B · R · U · S · H", why: "Tests B, R, U and S — a -SH option that also probes the vowel U." },
  ],
  strategyParagraphs: [
    "It's almost always CH, TH or SH. Once H is locked, decide which of the three digraphs fits your letters, then solve the 3rd letter — that single choice eliminates most of the list. About 90% of common H-enders fall into these three families.",
    "Sub-split the -CH family, which is the largest. -TCH words (BATCH, CATCH, PITCH, WITCH), -NCH words (BENCH, BUNCH, LUNCH, PUNCH) and the vowel forms -ACH/-OACH/-EACH (BEACH, COACH, REACH) behave differently, so spotting the cluster narrows the field fast.",
    "Mind the silent G and the rare -PH. DOUGH, ROUGH, TOUGH, LAUGH and WEIGH hide a silent G before the H, and GRAPH, GLYPH and NYMPH are the small -PH set worth remembering when the more common digraphs don't fit.",
  ],
  faq: [
    { question: "How many 5-letter words end in H?", answer: "There are {N} five-letter words ending in H in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — a high share, because the -CH, -TH and -SH families are large." },
    { question: "What is the best Wordle word ending in H?", answer: "EARTH is the strongest H-ending pick: it tests E, A, R and T — four of the most frequent letters in Wordle answers — plus H, with no repeats. NORTH and SOUTH are close behind. Note that most other H-enders make weaker openers." },
    { question: "Which 5-letter words ending in H have been Wordle answers?", answer: "{ANSWERED} H-ending words have already appeared as official Wordle answers in the puzzles we track, including MOUTH, DOUGH, NOTCH, WEIGH and BATCH. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -CH, -TH or -SH?", answer: "These three digraphs cover about 90% of common H-enders. -CH includes BEACH, CATCH and COACH; -TH includes EARTH, TRUTH and MOUTH; -SH includes BRUSH, FRESH and CRASH. Spotting which family fits is the fastest way to solve an H-ending puzzle." },
    { question: "Are 5-letter words ending in H good Wordle starters?", answer: "EARTH, NORTH and SOUTH are, because they pack frequent letters. Most H-enders are not, though — the -CH or -SH digraph fixes the last two letters and limits coverage. H endings are better to know than to open with, so save them for once the H is green." },
    { question: "What are 5-letter words ending in H with lots of vowels?", answer: "AWASH, BEACH, COACH, ROACH, YOUTH and SOUTH each carry two vowels while ending in H. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
