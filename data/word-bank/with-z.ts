import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-z (contains Z).
 * Z leans to slots three (33%) and four (29%), often as a double -ZZ (FIZZY,
 * DIZZY). Only ~35 common words. The -ZZ cluster + rarity are the hook.
 */
export const content: LetterContent = {
  letter: "Z",
  path: "/5-letter-words/with-z",
  lastUpdated: "2026-07-11",
  topOpener: "BLAZE",
  heroSubhead:
    "Every five-letter word that contains Z, sorted for Wordle — the common answer words first, mapped by where the Z sits, with past answers flagged and the best words to pin down a yellow Z.",
  introExtra:
    "Z is one of the rarest letters in Wordle, and it clusters in the middle-to-back of the word. The data below shows it landing in the third slot about 33% of the time and the fourth another 29% — often as a double -ZZ (DIZZY, FIZZY, FUZZY) or a consonant-Z-E core (BLAZE, GRAZE, PRIZE). It rarely opens the word (about 24% do, but those are a short list like ZEBRA, ZONAL). So a yellow Z is a strong, narrowing clue: it usually sits in slot three or four, and a repeated Z is more likely than with almost any other letter.",
  openersIntro:
    "There are few Z-words, so openers are limited. The picks below are the distinct-letter options that place the Z in its likely middle slots.",
  openers: [
    { word: "BLAZE", tests: "B · L · A · Z · E", why: "Places the Z in the fourth slot of a -ZE core while testing B, L, A and E — five distinct, high-frequency letters and the best Z opener.", best: true },
    { word: "GRAZE", tests: "G · R · A · Z · E", why: "Another -ZE core covering G, R, A and E — clean coverage with the Z near the end." },
    { word: "DOZEN", tests: "D · O · Z · E · N", why: "Puts the Z in the third slot with D, O, E and N — a strong mid-Z read." },
    { word: "CRAZE", tests: "C · R · A · Z · E", why: "A -ZE core with C, R, A and E — five distinct letters testing a fourth-slot Z." },
    { word: "ZONAL", tests: "Z · O · N · A · L", why: "A rare front-Z option covering O, N, A and L — useful if you suspect a Z start." },
  ],
  strategyParagraphs: [
    "Treat a yellow Z as a big narrowing clue. Z is one of the rarest letters in the answer pool, so its presence collapses the field quickly. It sits in the third or fourth slot most of the time, so start there rather than guessing the ends.",
    "Watch for the double -ZZ. Z doubles more readily than almost any other consonant relative to how often it appears — DIZZY, FIZZY, FUZZY, JAZZY, PIZZA. A single yellow Z is more likely than usual to be hiding a second Z, so a -ZZ- cluster is well worth testing when a middle gap resists.",
    "Otherwise expect a consonant-Z-E core or a front Z. Most non-double Z's sit in a -ZE ending (BLAZE, GRAZE, PRIZE, SEIZE) or open the word in the short front-Z set (ZEBRA, ZONAL, ZESTY). Match the Z to a nearby E or the front to place it.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter Z?", answer: "There are {N} valid five-letter words with a Z in the Wordle dictionary, but only {COMMON} are common answer-pool words — Z is one of the rarest letters, so the everyday list is very short." },
    { question: "What is the best Wordle word with Z in it?", answer: "BLAZE is the strongest — it tests five distinct, high-frequency letters with the Z in a -ZE core. GRAZE and CRAZE are close alternatives, and DOZEN is good for a third-slot Z." },
    { question: "Where does the letter Z usually go in a 5-letter word?", answer: "The third slot (about 33%) and the fourth (29%), often as a double -ZZ or a -ZE ending. It opens the word less often, in a short front-Z set. So a yellow Z usually belongs in slot three or four." },
    { question: "How many words with Z have been Wordle answers?", answer: "Only {ANSWERED} five-letter words containing Z have appeared as official Wordle answers in the puzzles we track — a tiny number that reflects how rare Z is. Because the NYT rarely repeats a solution, they are low-probability picks for today." },
    { question: "What 5-letter words have two Z's?", answer: "DIZZY, FIZZY, FUZZY, JAZZY and PIZZA among them. Z doubles unusually often for how rarely it appears, so a single yellow Z is worth testing as a -ZZ- cluster when a middle gap resists." },
    { question: "What 5-letter words end in -ZE?", answer: "BLAZE, CRAZE, GRAZE, PRIZE, SEIZE and BOOZE among them. If your Z is yellow in the fourth slot and you have an E, a -ZE ending is very likely." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
