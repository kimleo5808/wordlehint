import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/starting-with-c.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "C",
  path: "/5-letter-words/starting-with-c",
  lastUpdated: "2026-06-17",
  topOpener: "CRANE",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with C — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "C is one of the best opening letters in Wordle: CRANE and CRATE are routinely rated among the strongest first guesses in the game. Whether you are choosing an opener or have already locked a green C, the words below are sorted to get you to the answer fast.",
  openersIntro:
    "C-words make outstanding openers because they pair the common C and R consonants with top vowels. The picks below test the highest-frequency letters for maximum board coverage on guess one.",
  openers: [
    { word: "CRANE", tests: "C · R · A · N · E", why: "Rated by WordleBot as one of the single best opening words — tests C, R, A, N and E, five high-frequency letters.", best: true },
    { word: "CRATE", tests: "C · R · A · T · E", why: "Nearly as strong as CRANE, swapping N for the very common T." },
    { word: "CARES", tests: "C · A · R · E · S", why: "Combines two top vowels with R and S, three of the most useful consonants." },
    { word: "CANOE", tests: "C · A · N · O · E", why: "Vowel-heavy: tests A, O and E in one guess to map the vowel skeleton early." },
    { word: "CHAIR", tests: "C · H · A · I · R", why: "Probes H and the A/I vowel pair alongside R." },
    { word: "COAST", tests: "C · O · A · S · T", why: "Covers O and A with the high-value S and T consonants." },
    { word: "CLOUD", tests: "C · L · O · U · D", why: "Useful follow-up that tests the L, O, U and D letters together." },
  ],
  strategyParagraphs: [
    "Because C is such a strong opening letter, you will often arrive here with a green C already locked from CRANE or CRATE. Spend your next guess on the vowel and the second consonant.",
    "Watch the C blends. CH, CL and CR are all dense families, and C is also followed directly by vowels (CA, CO, CU). A gray second letter eliminates a whole branch of words at once.",
    "Remember that C can be soft (CEDAR, CIVIC) or hard (CABLE, COACH), and double letters appear in words like COCOA and CHEEK. The C _ _ _ E ending is one of the most common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with C?", answer: "There are {N} five-letter words starting with C in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with C?", answer: "CRANE is the strongest C opener and one of the best opening words in all of Wordle — the NYT's WordleBot consistently rates it at the top. It tests C, R, A, N and E. CRATE and CARES are excellent alternatives." },
    { question: "Which 5-letter words starting with C have been Wordle answers?", answer: "{ANSWERED} C-words have already appeared as official Wordle answers in the puzzles we track — recent ones include CRANE, CINCH, CROAK and CRAVE. Since the NYT almost never repeats a solution, those are lower-probability picks for today." },
    { question: "What are good 5-letter C words with lots of vowels?", answer: "CANOE tests three vowels (A, O, E), while CAUSE, COMET and COUPE each carry two. These vowel-rich words help you pin the vowel positions quickly in a Wordle game." },
    { question: "What 5-letter words start with C and end with E?", answer: "Common ones include CRANE, CRATE, CLOSE, CHASE, CURVE and CAUSE. The C _ _ _ E pattern is one of the most frequent shapes among Wordle answers, so it is worth memorising." },
    { question: "Are there 5-letter C words that work well in hard mode?", answer: "Yes. Consonant-rich words like CRYPT, CLUNK, CHOMP and CRISP help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
