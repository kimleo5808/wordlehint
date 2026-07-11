import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-m (contains M).
 * M leans first (39%) and third (24%). Front M starts and the -MP/-MB clusters
 * plus -M endings. The front-or-cluster split is the hook.
 */
export const content: LetterContent = {
  letter: "M",
  path: "/5-letter-words/with-m",
  lastUpdated: "2026-07-11",
  topOpener: "CREAM",
  heroSubhead:
    "Every five-letter word that contains M, sorted for Wordle — the common answer words first, mapped by where the M sits, with past answers flagged and the best words to pin down a yellow M.",
  introExtra:
    "M is a moderately front-loaded consonant. The data below shows it opening about 39% of the time and sitting in the third slot another 24%. Front M's are hard-M starts (MONEY, MUSIC), while interior and final M's tend to appear in clusters — MP and MB (CLAMP, CLIMB) — or as a plain -M ending (CREAM, DREAM-style cores). So a yellow M usually resolves to either a front start or a cluster near the end.",
  openersIntro:
    "M pairs cleanly with vowels and shows up in useful endings. The picks below use five distinct, high-frequency letters across the front and the back clusters.",
  openers: [
    { word: "CREAM", tests: "C · R · E · A · M", why: "Ends in -M, testing a last-slot M alongside C, R, E and A — five distinct, high-frequency letters.", best: true },
    { word: "CLAIM", tests: "C · L · A · I · M", why: "Another -M ender covering C, L, A and I — good for probing a final M with a wide vowel spread." },
    { word: "MACRO", tests: "M · A · C · R · O", why: "Leads with a front M while testing A, C, R and O — a clean front-M read." },
    { word: "CAMEO", tests: "C · A · M · E · O", why: "Places the M in the third slot with three vowels plus C — strong vowel coverage." },
    { word: "LEMON", tests: "L · E · M · O · N", why: "A middle-M word testing L, E, O and N — five distinct letters." },
  ],
  strategyParagraphs: [
    "Check the front first, then the end. M opens the word about 39% of the time, so a yellow M often just needs moving to slot one. If a front M does not fit your placed letters, the back of the word is the next most likely home.",
    "Read the MP and MB clusters. Interior and final M's love a partner consonant: MP (CAMP-style CLAMP, CRIMP, STOMP) and the silent -MB (CLIMB, THUMB, CRUMB). If you have a P or B near the back, the M very likely sits just before it.",
    "Watch the -M endings and double M. Plenty of answers end in a plain M (CREAM, DREAM, BROOM, STEAM), and a handful double it (COMMA, GAMMA, MAMBO). A single yellow M never rules a repeat out, so keep it in mind when a middle gap resists your early guesses.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter M?", answer: "There are {N} valid five-letter words with an M in the Wordle dictionary, and {COMMON} of them are common answer-pool words. M is a mid-frequency consonant in the answer pool." },
    { question: "What is the best Wordle word with M in it?", answer: "CREAM and CLAIM are the strongest — both end in M while testing four other frequent letters. MACRO leads with a front M, and CAMEO covers three vowels around a central M." },
    { question: "Where does the letter M usually go in a 5-letter word?", answer: "The first slot most often (about 39%), then the third (24%). Front M's are hard starts, while interior and final M's appear in MP/MB clusters or plain -M endings. So a yellow M points to the front or the back, rarely the second slot." },
    { question: "How many words with M have been Wordle answers?", answer: "{ANSWERED} five-letter words containing M have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in M?", answer: "Many — CREAM, DREAM, STEAM, BROOM, BLOOM (-M), plus the silent -MB in CLIMB, THUMB and CRUMB. If your M is yellow and not at the front, a final M or -MB is the likely home." },
    { question: "What 5-letter words have two M's?", answer: "COMMA, GAMMA, MAMBO, MUMMY and DUMMY among them. A single yellow M never rules out a second M, so a repeat is worth testing when a middle gap resists." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
