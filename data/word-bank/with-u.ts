import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-u (contains U).
 * U is the most position-locked vowel — 47% in slot two, only 3% at the end.
 * The QU pairing and second-slot dominance are the hooks.
 */
export const content: LetterContent = {
  letter: "U",
  path: "/5-letter-words/with-u",
  lastUpdated: "2026-07-11",
  topOpener: "CLOUT",
  heroSubhead:
    "Every five-letter word that contains U, sorted for Wordle — the common answer words first, mapped by where the U sits, with past answers flagged and the best words to pin down a yellow U.",
  introExtra:
    "U is the most predictable vowel in Wordle. The data below shows it in the second slot about 47% of the time — nearly half — and almost never at the end (around 3%). That is partly the QU rule (every Q is followed by U) and partly the huge family of consonant-U-consonant cores (MOUTH, ROUND, TRUCK, BUILT). So a yellow U is a gift: the second slot is overwhelmingly its home, and pinning it there often cracks the vowel skeleton in one move.",
  openersIntro:
    "U is the rarest of the five main vowels, so vowel-heavy openers that include it are valuable. The picks below use five distinct letters and place the U in its common interior slots.",
  openers: [
    { word: "CLOUT", tests: "C · L · O · U · T", why: "Tests two vowels (O, U) plus the frequent C, L and T, with the U in the fourth slot — a strong distinct-letter opener.", best: true },
    { word: "MOUNT", tests: "M · O · U · N · T", why: "Covers O and U together plus M, N and T — great for mapping an O-U vowel pair early." },
    { word: "CRUEL", tests: "C · R · U · E · L", why: "Places the U in the third slot with C, R, E and L — five distinct, high-value letters." },
    { word: "AUDIO", tests: "A · U · D · I · O", why: "Four vowels including U — rules vowels in or out fast, though it skips strong consonants." },
    { word: "COURT", tests: "C · O · U · R · T", why: "Another O-U opener testing C, R and T, with the U in the third slot." },
  ],
  strategyParagraphs: [
    "Play the second slot before anything else. No vowel is more position-locked than U: about 47% of five-letter words with a U put it second. If a first-slot guess turns your U yellow, move it straight to position two — you will be right almost half the time immediately.",
    "Remember the Q connection. Every five-letter word with a Q has a U right after it (QUEEN, QUICK, QUOTE, EQUAL, SQUAD). If you have a green or yellow Q, the U is effectively free — and conversely, a yellow U next to a likely Q slot is a strong steer.",
    "Watch the U-vowel pairs and the rare double U. OU (MOUTH, ROUND) and UE/UI (QUEUE, FRUIT, JUICE, BUILT) are everywhere, so a yellow U often sits beside another vowel. True double-U words are scarce (UNCUT, USURP-style cores), but a single yellow U never quite rules a second one out.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter U?", answer: "There are {N} valid five-letter words with a U in the Wordle dictionary, and {COMMON} of them are common answer-pool words. U is the least common of the five main vowels in the answer pool." },
    { question: "What is the best Wordle word with U in it?", answer: "CLOUT and MOUNT are the strongest — each tests two vowels plus three common consonants and places the U in its likely interior slot. CRUEL and COURT are excellent alternatives." },
    { question: "Where does the letter U usually go in a 5-letter word?", answer: "The second slot, by far — about 47% of five-letter words with a U place it there (MOUTH, ROUND, TRUCK), while barely 3% end in U. So when a U comes back yellow, test position two first." },
    { question: "How many words with U have been Wordle answers?", answer: "{ANSWERED} five-letter words containing U have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "Does every Q need a U in Wordle?", answer: "Yes — every five-letter word with a Q is followed by a U (QUEEN, QUICK, QUOTE, EQUAL, SQUAD). So if you have placed a Q, the U comes almost for free, and a yellow U near a Q slot is a strong hint." },
    { question: "What 5-letter words have U next to another vowel?", answer: "Plenty: MOUTH, ROUND and HOUSE (OU); FRUIT, JUICE and BUILT (UI); QUEUE and VALUE (UE). A yellow U very often sits beside a second vowel, so pairing it up is a fast way to solve the vowel skeleton." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
