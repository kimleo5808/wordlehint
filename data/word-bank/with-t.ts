import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-t (contains T).
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * T is a versatile consonant that leans slightly to the 4th slot (28%) and 1st
 * (24%), with strong ST/TR blends and -GHT clusters. The page's angle: use the
 * blend to place a yellow T rather than guessing position blindly.
 */
export const content: LetterContent = {
  letter: "T",
  path: "/5-letter-words/with-t",
  lastUpdated: "2026-07-11",
  topOpener: "CRATE",
  heroSubhead:
    "Every five-letter word that contains T, sorted for Wordle — the common answer words first, mapped by where the T sits, with past answers flagged and the best words to pin down a yellow T.",
  introExtra:
    "T is one of the most common consonants in Wordle and a flexible one. The data below shows it favouring the fourth slot (about 28%) and the first slot (24%), with the middle positions close behind — a fairly even spread that makes a yellow T moderately, but not strongly, positional. What really places a T is the company it keeps: it drives the opening blends ST and TR, the endings -ST and -GHT (NIGHT, LIGHT), and clusters like -CT and -PT. Read those patterns and the T usually falls into place.",
  openersIntro:
    "T combines with vowels and other consonants freely, so openers are plentiful. The picks below use five distinct, high-frequency letters and place the T in different slots and blends so you can test it and map the board together.",
  openers: [
    { word: "CRATE", tests: "C · R · A · T · E", why: "Puts the T in the common fourth slot while testing C, R, A and E — a top-tier opener that contains T.", best: true },
    { word: "SLATE", tests: "S · L · A · T · E", why: "Another fourth-slot T with S, L, A and E — five distinct letters and a very strong first guess." },
    { word: "TRACE", tests: "T · R · A · C · E", why: "Leads with a TR- blend, testing a first-slot T alongside R, A, C and E." },
    { word: "ROAST", tests: "R · O · A · S · T", why: "Ends in -ST, probing a last-slot T with R, O, A and S." },
    { word: "ANTIC", tests: "A · N · T · I · C", why: "Places the T in the middle with A, N, I and C — useful for a third-slot T read." },
  ],
  strategyParagraphs: [
    "Use the blend to place a yellow T. T is spread fairly evenly across the word, so position alone will not pin it down — but T rarely stands alone. Look at your placed letters: a T almost always attaches to a vowel or joins a cluster, and that neighbour is what locates it.",
    "Check the front and the back. Two big families dominate: the opening ST-/TR- blends (STORM, STAIR, TRACE, TRAIL) and the endings -ST and -GHT (TWIST, ROAST, NIGHT, LIGHT). If a first-slot T came back yellow, try the fourth or last slot inside one of those patterns before the middle.",
    "Then watch for double T and -TCH. ATTIC, BATTY, JETTY, KITTY and PETTY double the T, while CATCH, MATCH and WITCH bury it in a -TCH cluster. A single yellow T never rules either out, so keep them in mind when a middle gap resists your first guesses.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter T?", answer: "There are {N} valid five-letter words with a T in the Wordle dictionary, and {COMMON} of them are common answer-pool words. T is one of the most frequent consonants in the answer pool." },
    { question: "What is the best Wordle word with T in it?", answer: "CRATE and SLATE are the strongest — both place the T in the common fourth slot and test five distinct, high-frequency letters. TRACE is ideal for probing a first-slot T, and ROAST for a final -ST." },
    { question: "Where does the letter T usually go in a 5-letter word?", answer: "T leans toward the fourth slot (about 28%) and the first slot (24%), with the middle positions close behind — a fairly even spread. Because of that, use the T's blend (ST, TR) or ending (-ST, -GHT) to place it rather than position alone." },
    { question: "How many words with T have been Wordle answers?", answer: "{ANSWERED} five-letter words containing T have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two T's?", answer: "ATTIC, BATTY, JETTY, KITTY, PETTY and TOTAL-style cores among them, plus the -TCH cluster in CATCH, MATCH and WITCH. A single yellow T never rules out a second T." },
    { question: "What 5-letter words start with ST or TR?", answer: "Loads: STORM, STAIR, STEAM, STONE, STUDY and TRACE, TRAIL, TREAT, TRICK, TRUCK. If you have a green S or a yellow T early, an ST-/TR- opening blend is a high-value pattern to test." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
