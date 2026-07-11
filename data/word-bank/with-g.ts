import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-g (contains G).
 * G leans first (37%) and to the 4th slot (26%) — front G blends (GL/GR) and the
 * huge -NG ending family. The -NG ending is the hook.
 */
export const content: LetterContent = {
  letter: "G",
  path: "/5-letter-words/with-g",
  lastUpdated: "2026-07-11",
  topOpener: "ANGER",
  heroSubhead:
    "Every five-letter word that contains G, sorted for Wordle — the common answer words first, mapped by where the G sits, with past answers flagged and the best words to pin down a yellow G.",
  introExtra:
    "G splits between the front of the word and a very specific back-of-word cluster. The data below shows it opening about 37% of the time and landing in the fourth slot another 26% — and that fourth-slot spike is almost entirely the -NG ending (BRING, CLING, THING). Front G's are hard-G starts (GAMES, GRAPE) or GL/GR blends. So a yellow G points two ways: a front start, or the fourth slot of an -ING/-NG word.",
  openersIntro:
    "G blends cleanly with L and R and pairs with N at the back. The picks below use five distinct, high-frequency letters across the front and the -NG family.",
  openers: [
    { word: "ANGER", tests: "A · N · G · E · R", why: "Tests A, N, E and R around a third-slot G — five distinct, high-frequency letters and a strong opener.", best: true },
    { word: "ANGLE", tests: "A · N · G · L · E", why: "Covers A, N, L and E with the G in the middle — a clean, high-coverage opener." },
    { word: "GRACE", tests: "G · R · A · C · E", why: "Opens on a GR- blend testing G, R, A, C and E — good for a front-G read." },
    { word: "GLADE", tests: "G · L · A · D · E", why: "A GL- opening blend with G, L, A, D and E — five distinct letters." },
    { word: "BEING", tests: "B · E · I · N · G", why: "Ends in -NG, testing the common fourth-slot G with B, E, I and N." },
  ],
  strategyParagraphs: [
    "Split your thinking front or -NG. G is a bimodal letter: it either opens the word or sits in the fourth slot of an -NG ending. When a G turns yellow, ask which pattern fits your other letters before guessing a random position.",
    "Watch for the -NG family. A large share of G-answers end in -NG: BRING, CLING, FLING, SLING, THING, YOUNG. If you have an N placed near the back or a yellow N alongside your G, an -NG ending is very likely, putting the G in slot four.",
    "For front G's, check the GL and GR blends, and mind the silent GH. Front G's start hard (GAMER, GUSTO) or blend as GL (GLAZE, GLOOM) and GR (GRAPE, GRIND). A few words hide a silent GH (NIGHT, LAUGH, DOUGH), where the G is not sounded — easy to miss, and a single yellow G never rules it out.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter G?", answer: "There are {N} valid five-letter words with a G in the Wordle dictionary, and {COMMON} of them are common answer-pool words. G is a less common consonant, so the list runs shorter than the vowels." },
    { question: "What is the best Wordle word with G in it?", answer: "ANGER and ANGLE are the strongest — both test five distinct, high-frequency letters with the G in a central slot. GRACE and GLADE are excellent if you want to probe a front G blend." },
    { question: "Where does the letter G usually go in a 5-letter word?", answer: "The first slot (about 37%) and the fourth (26%). The fourth-slot spike is almost all the -NG ending (BRING, THING), while front G's are hard starts or GL/GR blends. So a yellow G points to either the front or a slot-four -NG." },
    { question: "How many words with G have been Wordle answers?", answer: "{ANSWERED} five-letter words containing G have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in -NG?", answer: "Loads — BRING, CLING, FLING, SLING, STING, THING, YOUNG. If you have a G that is not at the front, a slot-four -NG ending is the single most likely home for it." },
    { question: "What 5-letter words have two G's or a silent GH?", answer: "Double-G words include BAGGY, BUGGY, FOGGY, GORGE and GAUGE, while NIGHT, LAUGH, DOUGH and BOUGH hide a silent GH. Both are easy to miss, and a single yellow G never rules them out." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
