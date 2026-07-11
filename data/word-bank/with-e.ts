import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-e (contains E).
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * E is the most common letter in English and in the Wordle answer pool, and it
 * clusters heavily in the 4th slot (…_E_ and silent-E endings). The page leans
 * on that fourth-slot dominance as the practical takeaway for a yellow E.
 */
export const content: LetterContent = {
  letter: "E",
  path: "/5-letter-words/with-e",
  lastUpdated: "2026-07-11",
  topOpener: "ARISE",
  heroSubhead:
    "Every five-letter word that contains E, sorted for Wordle — the common answer words first, mapped by where the E sits, with past answers flagged and the best words to pin down a yellow E.",
  introExtra:
    "E is the most common letter in English, and it is the most common letter inside Wordle answers too — more than one in three answer-pool words carry at least one E. That makes a yellow E fairly weak news on its own, but the payoff is position: the data below shows E landing in the fourth slot about 34% of the time (think SLATE, CRANE, ABIDE) and the second slot another 25%. When your E turns yellow, the fourth position is the single best place to test it next.",
  openersIntro:
    "E pairs with everything, so your opener options are excellent. The picks below all use five distinct, high-frequency letters and spread the E across different slots, letting you test E and map the rest of the board in a single guess.",
  openers: [
    { word: "ARISE", tests: "A · R · I · S · E", why: "Five distinct letters covering three vowels (A, I, E) plus R and S, with the E in the common last slot — one of the strongest openers in the game.", best: true },
    { word: "AROSE", tests: "A · R · O · S · E", why: "The same elite letter set with O instead of I — equally strong, and it also ends in E." },
    { word: "SLATE", tests: "S · L · A · T · E", why: "A top-tier opener that ends in E, immediately testing the common last-slot E alongside S, L, A and T." },
    { word: "CRANE", tests: "C · R · A · N · E", why: "Tests C, R, A and N with the E in the last slot — a frequent recommendation for a reason." },
    { word: "ATONE", tests: "A · T · O · N · E", why: "Covers A, O and E plus T and N, again with the E parked in its most likely final slot." },
  ],
  strategyParagraphs: [
    "Treat a yellow E as a hint about position, not presence. Because E turns up in over a third of answer-pool words, learning that an E exists barely trims the field — what matters is which slot it belongs in. Don't spend a whole guess just relocating an E you already know is there.",
    "Play the fourth slot first. The list below shows E in position four about 34% of the time, more than any other slot, with the second slot next at 25%. A huge share of those are silent-E endings (ABIDE, HINGE, NURSE) and consonant-E-consonant cores. If a yellow E came from the last slot, slide it to slot four before trying anywhere else.",
    "Don't forget double E. AGREE, GEESE, EERIE, SHEEP and QUEEN all hide two E's, and a single yellow E never rules that out. When your greens and grays leave two gaps that both look vowel-shaped, a repeated E is a common miss.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter E?", answer: "There are {N} valid five-letter words with an E in the Wordle dictionary, and {COMMON} of them are common answer-pool words — the most of any letter, because E is the most frequent letter in English." },
    { question: "What is the best Wordle word with E in it?", answer: "ARISE and AROSE are the strongest — each tests five distinct, high-frequency letters and places the E in the common final slot. SLATE and CRANE are excellent alternatives that also end in E." },
    { question: "Where does the letter E usually go in a 5-letter word?", answer: "The fourth slot, by a clear margin — about 34% of five-letter words with an E place it there (SLATE, ABIDE, HINGE), followed by the second slot at roughly 25%. So when an E comes back yellow, test position four first." },
    { question: "How many words with E have been Wordle answers?", answer: "{ANSWERED} five-letter words containing E have appeared as official Wordle answers in the puzzles we track — the highest count of any letter. Since the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two E's?", answer: "Many — AGREE, GEESE, EERIE, QUEEN, SHEEP, THESE and BREED among them. A single yellow E never rules out a second E, so a repeated E is worth testing when two gaps both look like vowels." },
    { question: "What are good 5-letter words ending in E for Wordle?", answer: "SLATE, CRANE, ADIEU-adjacent picks like ATONE, and STONE, CLOSE and PRUNE all end in E while testing strong consonants — ideal once you suspect the common last-slot E." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
