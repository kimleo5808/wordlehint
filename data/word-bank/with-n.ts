import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-n (contains N).
 * N leans to the 3rd (32%) and 4th (25%) slots and lives in clusters:
 * ND, NG, NK, NT and the -EN/-ON endings. Clusters are the hook.
 */
export const content: LetterContent = {
  letter: "N",
  path: "/5-letter-words/with-n",
  lastUpdated: "2026-07-11",
  topOpener: "CRANE",
  heroSubhead:
    "Every five-letter word that contains N, sorted for Wordle — the common answer words first, mapped by where the N sits, with past answers flagged and the best words to pin down a yellow N.",
  introExtra:
    "N is a common consonant that leans toward the back half of the word. The data below shows it in the third slot about 32% of the time and the fourth another 25%, with the front positions trailing. The reason is clusters: N loves to pair up as ND, NG, NK and NT (BLAND, THING, BLANK, PAINT), and it anchors the endings -EN and -ON (TOKEN, BACON). So a yellow N usually belongs in slot three or four, right before a hard consonant.",
  openersIntro:
    "N combines freely with vowels and consonants, so openers are plentiful. The picks below use five distinct, high-frequency letters and place the N across its common back-half slots.",
  openers: [
    { word: "CRANE", tests: "C · R · A · N · E", why: "Puts the N in the common fourth slot while testing C, R, A and E — a perennial best-opener pick that contains N.", best: true },
    { word: "ATONE", tests: "A · T · O · N · E", why: "Covers three vowels plus T and N, with the N in the fourth slot — a strong, balanced opener." },
    { word: "ALIEN", tests: "A · L · I · E · N", why: "Three vowels plus L and N, testing a last-slot N alongside a wide vowel spread." },
    { word: "CLEAN", tests: "C · L · E · A · N", why: "Ends in -N, probing the final slot with C, L, E and A." },
    { word: "ANTIC", tests: "A · N · T · I · C", why: "Places the N in the second slot with A, T, I and C — useful for an earlier-N read." },
  ],
  strategyParagraphs: [
    "Aim for the back half. N sits in the third or fourth slot more than half the time, so when it turns yellow, start there rather than at the front. A green vowel in slot two plus a yellow N very often means an N in slot three or four.",
    "Read the clusters. Most N words bury the N in a two-consonant cluster: ND (BLAND, ROUND), NG (THING, BEING), NK (BLANK, DRINK) and NT (PAINT, MINToid cores). If you already have one of those partner consonants placed, the N usually sits right beside it.",
    "Check the -EN and -ON endings, and double N. Loads of answers end in -EN (TOKEN, OFTEN, RAVEN) or -ON (BACON, MELON, WAGON). And a cluster of words double the N — ANNOY, BUNNY, CANNY, FUNNY, SUNNY — which a single yellow N never rules out, so keep it in mind when a middle gap resists.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter N?", answer: "There are {N} valid five-letter words with an N in the Wordle dictionary, and {COMMON} of them are common answer-pool words. N is one of the most frequent consonants in the answer pool." },
    { question: "What is the best Wordle word with N in it?", answer: "CRANE and ATONE are the strongest — both test three or more vowels plus common consonants and place the N in its likely fourth slot. ALIEN and CLEAN are good alternatives for probing a final N." },
    { question: "Where does the letter N usually go in a 5-letter word?", answer: "The back half — the third slot holds about 32% and the fourth another 25%, because N so often anchors a cluster (ND, NG, NK, NT) or an -EN/-ON ending. So when an N comes back yellow, test slots three and four first." },
    { question: "How many words with N have been Wordle answers?", answer: "{ANSWERED} five-letter words containing N have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two N's?", answer: "ANNOY, BUNNY, CANNY, FUNNY, PENNY and SUNNY among them, plus ANNEX and ANNUL. A single yellow N never rules out a second N, so a repeat is worth testing when a middle gap resists." },
    { question: "What 5-letter words end in -EN or -ON?", answer: "Many answers end this way: TOKEN, OFTEN, RAVEN, LINEN (-EN) and BACON, MELON, WAGON, NYLON (-ON). If your N is yellow and a cluster does not fit, a back-of-word -EN or -ON pattern is worth testing." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
