import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-k (contains K).
 * K peaks in the 4th slot (33%) — the -CK ending — then 1st (24%). Rare in slot
 * two (7%). The -CK ending is the hook.
 */
export const content: LetterContent = {
  letter: "K",
  path: "/5-letter-words/with-k",
  lastUpdated: "2026-07-11",
  topOpener: "CREAK",
  heroSubhead:
    "Every five-letter word that contains K, sorted for Wordle — the common answer words first, mapped by where the K sits, with past answers flagged and the best words to pin down a yellow K.",
  introExtra:
    "K is dominated by one cluster: the -CK ending. The data below shows it peaking in the fourth slot (about 33%) — almost all BLACK, STICK, TRUCK-style -CK words — then the first slot (24%) and the last (18%, the -NK and bare -K endings). It barely ever sits second (around 7%). So a yellow K is really asking whether you are looking at a -CK word, an -NK ending, or a front K.",
  openersIntro:
    "K sits at the back of most words, so the best K openers put it in the fourth or last slot. The picks below use five distinct, high-frequency letters.",
  openers: [
    { word: "CREAK", tests: "C · R · E · A · K", why: "Ends in -AK, testing a last-slot K alongside C, R, E and A — five distinct, high-frequency letters.", best: true },
    { word: "CLOAK", tests: "C · L · O · A · K", why: "Another last-slot K covering C, L, O and A — good vowel coverage with a K ending." },
    { word: "ANKLE", tests: "A · N · K · L · E", why: "Places the K in the third slot inside an -NK- run with A, N, L and E." },
    { word: "CRANK", tests: "C · R · A · N · K", why: "Ends in -NK, probing a last-slot K with C, R, A and N." },
    { word: "CROAK", tests: "C · R · O · A · K", why: "An O-vowel variant of CREAK — five distinct letters ending in a last-slot K." },
  ],
  strategyParagraphs: [
    "Think -CK first. The single biggest K pattern is the -CK ending, which puts the K in the fourth slot: BLACK, BRICK, CLOCK, STICK, TRUCK. If a middle guess turned your K yellow and you have a C available, a slot-four -CK is the highest-value test.",
    "Then check the -NK and bare -K endings. Beyond -CK, K closes words as -NK (BLANK, DRINK, PRANK) and a plain -K (CREAK, CLOAK, SPEAK). If you have an N near the back, an -NK is likely; otherwise a vowel-plus-K ending is the fallback.",
    "For a front K, remember it is rare and often silent. Front K's are uncommon and frequently sit in the silent KN- cluster (KNEEL, KNIFE, KNOWN, KNELT). K almost never lands in the second slot, so if your K is yellow, the front and the -CK/-NK back are where to look.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter K?", answer: "There are {N} valid five-letter words with a K in the Wordle dictionary, and {COMMON} of them are common answer-pool words. K is a less common consonant, most often appearing in a -CK ending." },
    { question: "What is the best Wordle word with K in it?", answer: "CREAK and CLOAK are the strongest — both end in a K while testing four other frequent letters. ANKLE and CRANK are good for probing -NK, and any -CK opener helps if you suspect that ending." },
    { question: "Where does the letter K usually go in a 5-letter word?", answer: "The fourth slot, most often — about 33% of five-letter words with a K put it there, almost all -CK endings (BLACK, STICK). The first slot (24%) and last (18%) follow, while barely 7% put K second. So a yellow K points to a -CK, -NK or front K." },
    { question: "How many words with K have been Wordle answers?", answer: "{ANSWERED} five-letter words containing K have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in -CK?", answer: "Loads — BLACK, BRICK, CLOCK, KNOCK, QUICK, STICK, TRUCK. The -CK ending is the single most common home for a K, placing it in the fourth slot before a final K." },
    { question: "What 5-letter words start with a silent K?", answer: "The KN- cluster: KNEEL, KNIFE, KNOWN, KNELT, KNACK. The K is silent but still counts, so a front K that does not fit a hard start may be one of these." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
