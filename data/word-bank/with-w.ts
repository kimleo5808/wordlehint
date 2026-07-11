import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-w (contains W).
 * W leans first (39%) and third (27%). Front W and the WH/WR/SW/TW clusters plus
 * -OW/-EW endings. Front-or-cluster is the hook.
 */
export const content: LetterContent = {
  letter: "W",
  path: "/5-letter-words/with-w",
  lastUpdated: "2026-07-11",
  topOpener: "CROWN",
  heroSubhead:
    "Every five-letter word that contains W, sorted for Wordle — the common answer words first, mapped by where the W sits, with past answers flagged and the best words to pin down a yellow W.",
  introExtra:
    "W splits between the front of the word and a cluster of vowel pairs. The data below shows it opening about 39% of the time — hard-W starts (WATER, WORLD) and the WH, WR, SW and TW clusters (WHALE, WRING, SWEAR, TWICE) — and landing in the third slot another 27%, usually as part of an -OW or -EW pairing (CROWN, POWER, JEWEL). It almost never ends the word (around 6%). So a yellow W points to a front start or a mid-word vowel pair.",
  openersIntro:
    "W blends with H, R, S and T and forms the -OW/-EW vowel pairs. The picks below use five distinct, high-frequency letters.",
  openers: [
    { word: "CROWN", tests: "C · R · O · W · N", why: "Places the W in the fourth slot inside an -OW- run while testing C, R, O and N — five distinct, high-frequency letters.", best: true },
    { word: "OWNER", tests: "O · W · N · E · R", why: "Puts the W in the second slot with O, N, E and R — strong coverage if the W is early." },
    { word: "CRAWL", tests: "C · R · A · W · L", why: "Another fourth-slot W covering C, R, A and L — a clean board read." },
    { word: "SWEAR", tests: "S · W · E · A · R", why: "Opens on an SW- blend testing S, W, E, A and R — good for a front-W cluster." },
    { word: "LOWER", tests: "L · O · W · E · R", why: "A mid-word -OW- pattern with L, O, E and R — five distinct letters." },
  ],
  strategyParagraphs: [
    "Check the front, then the -OW/-EW pairs. W opens the word about 39% of the time, so start there when a W turns yellow. If a front start does not fit, the third-slot -OW and -EW pairings (CROWN, POWER, FEWER, JEWEL) are the next most likely.",
    "Read the front clusters. Front W's blend as WH (WHALE, WHICH, WHEAT), WR (WRING, WRECK, WROTE), SW (SWEAR, SWEPT, SWORD) and TW (TWICE, TWIST, TWINE). If you have a placed H, R, S or T at the front, the W is very likely beside it.",
    "Remember W rarely ends a word. Only about 6% of W-words end in W, and those are the -OW endings (ARROW, BELOW, ELBOW). So a yellow W almost never belongs in the last slot unless it caps an -OW — steer it toward the front or the mid-word vowel pair instead.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter W?", answer: "There are {N} valid five-letter words with a W in the Wordle dictionary, and {COMMON} of them are common answer-pool words. W is a less common consonant in the answer pool." },
    { question: "What is the best Wordle word with W in it?", answer: "CROWN and CRAWL are the strongest — both test five distinct, high-frequency letters with the W in a mid-word slot. OWNER and SWEAR are excellent for probing an early or front-cluster W." },
    { question: "Where does the letter W usually go in a 5-letter word?", answer: "The first slot (about 39%) and the third (27%). Front W's are hard starts or WH/WR/SW/TW clusters, while third-slot W's sit in -OW/-EW pairs. It rarely ends the word, so a yellow W points to the front or a mid-word vowel pair." },
    { question: "How many words with W have been Wordle answers?", answer: "{ANSWERED} five-letter words containing W have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in W?", answer: "Almost all are -OW endings: ARROW, BELOW, ELBOW, THROW, WIDOW. Since barely 6% of W-words end in W, a yellow W at the back is a strong hint you are looking at one of these -OW words." },
    { question: "What 5-letter words start with a W cluster?", answer: "WH (WHALE, WHICH, WHEAT), WR (WRING, WRECK, WROTE), SW (SWEAR, SWORD, SWEPT) and TW (TWICE, TWIST). If you have a green H, R, S or T at the front and a yellow W, one of these clusters is the likely fit." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
