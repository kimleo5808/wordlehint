import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-d (contains D).
 * D is bimodal: 32% at the end (-ND/-RD/-LD and past-tense-style -DE) and 27%
 * at the front, but only ~4% in slot two. The "ends, not slot two" split is the hook.
 */
export const content: LetterContent = {
  letter: "D",
  path: "/5-letter-words/with-d",
  lastUpdated: "2026-07-11",
  topOpener: "DANCE",
  heroSubhead:
    "Every five-letter word that contains D, sorted for Wordle — the common answer words first, mapped by where the D sits, with past answers flagged and the best words to pin down a yellow D.",
  introExtra:
    "D has a split personality. The data below shows it clustering at the two ends of the word — about 32% in the last slot and 27% in the first — while the second slot almost never holds a D (around 4%). The final-D words are mostly -ND, -RD and -LD endings (BLAND, BOARD, WORLD) plus consonant-D-E cores (ABIDE, SNIDE); the front-D words start with a hard D (DANCE, DRINK, DWELL). So a yellow D is really asking one question: front or back?",
  openersIntro:
    "D pairs cleanly with vowels and the R/W blends, so openers are solid. The picks below use five distinct, high-frequency letters and place the D at the front or back where it actually lives.",
  openers: [
    { word: "DANCE", tests: "D · A · N · C · E", why: "Leads with a hard first-slot D while testing A, N, C and E — five distinct, high-frequency letters.", best: true },
    { word: "ADORE", tests: "A · D · O · R · E", why: "Three vowels plus D and R, with the D in the second slot — a strong vowel-mapping opener." },
    { word: "CEDAR", tests: "C · E · D · A · R", why: "Places the D in the third slot with C, E, A and R — a distinct-letter alternative." },
    { word: "DRAKE", tests: "D · R · A · K · E", why: "Opens on a DR- blend testing D, R, A, K and E — a front-D read with good coverage." },
    { word: "SALAD", tests: "S · A · L · A · D", why: "Ends in -D, probing the common final slot, though it repeats A." },
  ],
  strategyParagraphs: [
    "Ask front or back — and skip slot two. D is a bimodal letter: it sits at the last slot about 32% of the time and the first about 27%, but only around 4% in position two. So a yellow D almost never belongs in the second slot — start at the ends and work inward.",
    "Read the final-D clusters. Most back-of-word D's land in -ND (BLAND, ROUND), -RD (BOARD, GUARD), -LD (WORLD, YIELD) or a consonant-D-E core (ABIDE, SNIDE, RUDE-style). If you have a partner consonant placed near the end, the D is usually right beside it.",
    "For a front D, look for the blends and double D. Front D's start hard (DANCE, DELAY) or blend as DR- and DW- (DRINK, DWELL). And a batch of words double the D — ADDER, BUDDY, DADDY, MUDDY, TEDDY — which a single yellow D never rules out, so keep it in mind when a middle gap resists.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter D?", answer: "There are {N} valid five-letter words with a D in the Wordle dictionary, and {COMMON} of them are common answer-pool words. D is a moderately common consonant in the answer pool." },
    { question: "What is the best Wordle word with D in it?", answer: "DANCE and ADORE are the strongest — DANCE leads with a front D while testing four other frequent letters, and ADORE covers three vowels plus D and R. DRAKE and CEDAR are good alternatives." },
    { question: "Where does the letter D usually go in a 5-letter word?", answer: "At the ends — about 32% of five-letter words with a D place it last and 27% first, while barely 4% put it in the second slot. So a yellow D almost always belongs at the front or the back; test the ends first." },
    { question: "How many words with D have been Wordle answers?", answer: "{ANSWERED} five-letter words containing D have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in D?", answer: "Loads — the -ND (BLAND, ROUND), -RD (BOARD, GUARD) and -LD (WORLD, YIELD) endings, plus consonant-D-E cores like ABIDE and SNIDE. If your D is yellow and not at the front, the last slot is the high-value place to test it." },
    { question: "What 5-letter words have two D's?", answer: "ADDER, BUDDY, DADDY, MUDDY, PADDY and TEDDY among them. A single yellow D never rules out a second D, so a repeat is worth testing when a middle gap resists your early guesses." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
