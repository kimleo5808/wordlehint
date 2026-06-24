import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-n.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "N",
  path: "/5-letter-words/ending-with-n",
  lastUpdated: "2026-06-24",
  topOpener: "LEARN",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in N — common answer-pool words first, with the strongest N-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in N divide into six fairly even families — _ _ _ E N, _ _ _ O N, _ _ _ I N, _ _ _ A N, _ _ _ W N and _ _ _ R N — so once you have locked a green N in the last slot, the 4th letter is the decisive clue. N is also opener-friendly: LEARN and TRAIN test five of the most frequent letters in the game, so a strong N-ending guess can double as a top-tier first word.",
  openersIntro:
    "Words ending in N make genuinely strong openers because common N-enders pair N with E, A, R and I. The picks below stick to distinct-letter words — several test five of the most frequent letters in the game.",
  openers: [
    { word: "LEARN", tests: "L · E · A · R · N", why: "Tests five of the most frequent letters in Wordle answers (L, E, A, R, N) with no repeats — the strongest N-ending opener, on par with the best in the game.", best: true },
    { word: "TRAIN", tests: "T · R · A · I · N", why: "Five distinct letters including the vowel I; excellent early coverage of T, R, A and N." },
    { word: "OCEAN", tests: "O · C · E · A · N", why: "Vowel-rich (O, E, A) plus C and N — a great way to map vowels in one guess." },
    { word: "STAIN", tests: "S · T · A · I · N", why: "Brings S and the vowel I together with T, A and N — strong, no repeats." },
    { word: "CLEAN", tests: "C · L · E · A · N", why: "Tests the useful C and L around E, A and N; solid coverage with no repeated letters." },
    { word: "BARON", tests: "B · A · R · O · N", why: "Distinct letters covering the vowel O; a change-up when you want to probe O instead of E or I." },
  ],
  strategyParagraphs: [
    "When the last tile is a green N, your first job is to spot the family. Four shapes cover most common N-enders: _ _ _ E N (EATEN, GIVEN, TAKEN, QUEEN, OFTEN), _ _ _ O N (BACON, BARON, LEMON, NYLON, WAGON), _ _ _ I N (ADMIN, BASIN, CABIN, ROBIN, SATIN) and _ _ _ A N (HUMAN, ORGAN, URBAN, VEGAN, WOMAN). Identify which one fits the letters you already have and the word usually falls.",
    "Don't forget the smaller families. Weather and shape words cluster in _ _ _ W N (BROWN, CROWN, DROWN, FROWN, GROWN, KNOWN), and a tight _ _ _ R N set (ACORN, CHURN, LEARN, SCORN, STERN, THORN) is easy to overlook once an N is locked.",
    "Watch the silent G and doubled vowels. ALIGN, DEIGN, FEIGN and REIGN hide a silent G before the N, while QUEEN, GREEN, PREEN and SHEEN double the E — both patterns trip up players who assume a single consonant before the final N.",
  ],
  faq: [
    { question: "How many 5-letter words end in N?", answer: "There are {N} five-letter words ending in N in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle word ending in N?", answer: "LEARN is the strongest N-ending pick: it tests L, E, A, R and N, five of the most frequent letters in Wordle answers, with no repeats. That makes it a top-tier opener that just happens to end in N. TRAIN and CLEAN are close behind." },
    { question: "Which 5-letter words ending in N have been Wordle answers?", answer: "{ANSWERED} N-ending words have already appeared as official Wordle answers in the puzzles we track, including TOKEN, BARON, SATIN, VEGAN and NYLON. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -EN, -ON or -IN?", answer: "These are three of the six families before N. -EN includes EATEN, GIVEN and QUEEN; -ON includes BACON, LEMON and NYLON; -IN includes ADMIN, ROBIN and SATIN. Knowing which family fits your letters is the fastest way to solve an N-ending puzzle." },
    { question: "Are 5-letter words ending in N good Wordle starters?", answer: "Yes. Common N-enders pair N with E, A, R and I, so LEARN, TRAIN and CLEAN are genuinely strong openers that test the game's most frequent letters. Just avoid repeated-letter N-enders like QUEEN, and test fresh letters on your second guess." },
    { question: "What are 5-letter words ending in N with lots of vowels?", answer: "OCEAN, AVIAN, ONION, UNION, AGAIN, ALIEN and BRAIN each carry two or more vowels while ending in N. They are an efficient way to map the puzzle's vowel skeleton early when the last letter is already locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
