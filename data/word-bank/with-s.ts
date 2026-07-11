import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-s (contains S).
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * The S "plural trap": 59% of five-letter words with S end in S (plurals), but
 * Wordle answers almost never end in S — so the guess-list distribution and the
 * answer distribution point in opposite directions. That gap is the page's hook.
 */
export const content: LetterContent = {
  letter: "S",
  path: "/5-letter-words/with-s",
  lastUpdated: "2026-07-11",
  topOpener: "AROSE",
  heroSubhead:
    "Every five-letter word that contains S, sorted for Wordle — the common answer words first, mapped by where the S sits, with past answers flagged and the best words to pin down a yellow S.",
  introExtra:
    "S comes with a trap. Across the whole guess dictionary, 59% of five-letter words with an S end in S — because that is where plurals live (CARDS, PLANS, TREES). But the NYT almost never picks a plural as the daily answer, so among real answer words the S is far more likely at the front than the back. That mismatch is the key insight: a yellow S you got from a last-slot guess is usually telling you the S belongs somewhere earlier, most often the first slot.",
  openersIntro:
    "A word of caution: opening with an S in the last slot mostly tests plurals the answer probably isn't. The picks below instead place the S at the front or middle, where it does real work — and all use five distinct, high-frequency letters.",
  openers: [
    { word: "AROSE", tests: "A · R · O · S · E", why: "Five distinct letters covering three vowels plus R and S, with the S in the fourth slot rather than a throwaway plural position — a top-tier opener.", best: true },
    { word: "ARISE", tests: "A · R · I · S · E", why: "The same elite set with I instead of O; tests the S mid-word alongside three vowels." },
    { word: "STARE", tests: "S · T · A · R · E", why: "Leads with S in the first slot — the position it most often occupies in real answers — while testing T, A, R and E." },
    { word: "SNORE", tests: "S · N · O · R · E", why: "Another strong first-slot-S opener covering N, O, R and E." },
    { word: "CLOSE", tests: "C · L · O · S · E", why: "Places the S in the fourth slot with C, L, O and E — useful, and avoids wasting the S on a plural ending." },
  ],
  strategyParagraphs: [
    "Fight the plural instinct. Your eye wants to put a yellow S at the end because that is where S sits in most words you know — but those are plurals, and the Wordle answer almost never is. Treat a last-slot yellow S as a strong signal to move it forward, not a near-miss on a plural.",
    "Test the first slot next. In real answer words the S most often opens the word (SNAKE, STORM, SHINE, SUGAR). If your yellow S came from anywhere else, the first position is the highest-value place to try it before the middle slots.",
    "Remember double S and the SS pairs. AMISS, BLISS, BRASS, GLASS, GLOSS and SASSY all carry two S's, often as a middle -SS- cluster rather than a plural. A single yellow S never rules that out, so a repeated S is worth a look when a middle gap resists.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter S?", answer: "There are {N} valid five-letter words with an S in the Wordle dictionary — the highest total of any letter — but only {COMMON} are common answer-pool words, because a huge share of S-words are plurals the NYT rarely uses as answers." },
    { question: "What is the best Wordle word with S in it?", answer: "AROSE and ARISE are the strongest, testing five distinct letters with the S working mid-word. If you specifically want to probe a front S, STARE and SNORE are excellent, since real answers put the S first far more often than last." },
    { question: "Do Wordle answers end in S?", answer: "Almost never. Although 59% of all five-letter words with an S end in S, those are mostly plurals, and the NYT deliberately avoids plural answers. So a yellow or green S at the end is a strong hint you are looking at a guess word, not the solution — move the S forward." },
    { question: "Where does S usually go in a Wordle answer?", answer: "In real answer words, the first slot — SNAKE, STORM, SHINE, SUGAR. The last-slot S that dominates the raw dictionary comes almost entirely from plurals, which the answer pool excludes, so treat a yellow S as pointing to the front of the word." },
    { question: "How many words with S have been Wordle answers?", answer: "{ANSWERED} five-letter words containing S have appeared as official Wordle answers in the puzzles we track. Note how modest that is relative to how many S-words exist — a direct result of plurals being off the table." },
    { question: "What 5-letter words have two S's?", answer: "AMISS, BLISS, BRASS, GLASS, GLOSS, SASSY and CHESS among them — often a middle -SS- cluster rather than a plural ending. A single yellow S never rules out a second S." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
