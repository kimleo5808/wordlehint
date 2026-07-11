import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-p (contains P).
 * P is strongly first-slot (46%), with PL/PR blends, the PH digraph and -MP
 * endings. Front P plus its clusters is the hook.
 */
export const content: LetterContent = {
  letter: "P",
  path: "/5-letter-words/with-p",
  lastUpdated: "2026-07-11",
  topOpener: "APRON",
  heroSubhead:
    "Every five-letter word that contains P, sorted for Wordle — the common answer words first, mapped by where the P sits, with past answers flagged and the best words to pin down a yellow P.",
  introExtra:
    "P is a front-loaded consonant with a few distinctive clusters. The data below shows it opening about 46% of the time — nearly half — through hard-P starts (PAPER, PILOT) and the PL and PR blends (PLANT, PRICE). When P is not at the front it usually appears in the PH digraph (GRAPH, MORPH) or the -MP ending (CLAMP, CRISP-style -SP too). So a yellow P most often wants the first slot, with clusters accounting for the rest.",
  openersIntro:
    "P blends cleanly with L and R and pairs with H. The picks below use five distinct, high-frequency letters across the front and the P clusters.",
  openers: [
    { word: "APRON", tests: "A · P · R · O · N", why: "Places the P in the second slot inside a -PR- run while testing A, R, O and N — five distinct, high-frequency letters.", best: true },
    { word: "PRICE", tests: "P · R · I · C · E", why: "Opens on a PR- blend testing P, R, I, C and E — a strong front-P read." },
    { word: "PLATE", tests: "P · L · A · T · E", why: "A PL- opening blend covering P, L, A, T and E — clean coverage with a front P." },
    { word: "OPERA", tests: "O · P · E · R · A", why: "Puts the P in the second slot with three vowels plus R — good for a not-first P." },
    { word: "CRIMP", tests: "C · R · I · M · P", why: "Ends in -MP, probing a last-slot P with C, R, I and M." },
  ],
  strategyParagraphs: [
    "Try the first slot first. P opens the word about 46% of the time, so a yellow P that came from a middle guess is very often just displaced from position one. Slide it to the front and look for a hard-P start or a PL/PR blend.",
    "Read the PL, PR and PH clusters. Front P's blend as PL (PLANK, PLUMB) and PR (PROBE, PRUNE), while a mid- or end-word P often sits in the PH digraph (GRAPH, MORPH, DEPTH-style clusters). Match the P to a placed L, R or H to locate it fast.",
    "Check the -MP ending and double P. A batch of answers end in -MP (CLAMP, CRIMP, STOMP, PLUMP) or -SP (CRISP, GRASP, WISP-style cores), putting the P at the back. And a few double the P — APPLE, HAPPY, HIPPO, PUPPY — which a single yellow P never rules out.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter P?", answer: "There are {N} valid five-letter words with a P in the Wordle dictionary, and {COMMON} of them are common answer-pool words. P is a mid-frequency consonant in the answer pool." },
    { question: "What is the best Wordle word with P in it?", answer: "APRON and PRICE are the strongest — APRON tests five distinct letters with the P mid-word, and PRICE opens on a PR- blend. PLATE and OPERA are excellent alternatives." },
    { question: "Where does the letter P usually go in a 5-letter word?", answer: "The first slot, by a wide margin — about 46% of five-letter words with a P start with it (PAPER, PLANT, PRICE). So when a P comes back yellow from a middle guess, test the first position first." },
    { question: "How many words with P have been Wordle answers?", answer: "{ANSWERED} five-letter words containing P have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in P?", answer: "The -MP and -SP endings: CLAMP, CRIMP, STOMP, PLUMP (-MP) and CRISP, GRASP, WASP-style cores (-SP). If your P is yellow and not at the front, one of these endings is the likely home." },
    { question: "What 5-letter words have two P's?", answer: "APPLE, APPLY, HAPPY, HIPPO, PUPPY and GUPPY among them. A single yellow P never rules out a second P, so a repeat is worth testing when a middle gap resists." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
