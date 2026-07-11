import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-l (contains L).
 * L is fairly even (3rd slot 26% top) and lives in blends BL/CL/FL/GL/PL/SL and
 * -LE/-LL endings, with a very high double-L rate. Blends + double-L are the hook.
 */
export const content: LetterContent = {
  letter: "L",
  path: "/5-letter-words/with-l",
  lastUpdated: "2026-07-11",
  topOpener: "ALERT",
  heroSubhead:
    "Every five-letter word that contains L, sorted for Wordle — the common answer words first, mapped by where the L sits, with past answers flagged and the best words to pin down a yellow L.",
  introExtra:
    "L is a friendly, flexible consonant that spreads fairly evenly across the word — the third slot leads at about 26%, but every position lands in double digits. What actually places an L is its habit of pairing up: it forms the opening blends BL, CL, FL, GL, PL and SL (BLACK, CLOUD, FLAME, GLIDE, PLANT, SLATE) and the endings -LE and -LL (APPLE, SMALL). L also doubles more readily than most letters, so a single yellow L never quite settles the question.",
  openersIntro:
    "L combines with almost everything, so strong openers are easy to find. The picks below use five distinct, high-frequency letters and place the L in different blends and slots.",
  openers: [
    { word: "ALERT", tests: "A · L · E · R · T", why: "Puts the L in the second slot while testing A, E, R and T — five distinct, high-frequency letters and a top-tier opener.", best: true },
    { word: "CLEAN", tests: "C · L · E · A · N", why: "Opens with a CL- blend, testing C, E, A and N around a second-slot L." },
    { word: "AISLE", tests: "A · I · S · L · E", why: "Three vowels plus S and L, with the L in the fourth slot — a strong vowel-mapping opener." },
    { word: "SLATE", tests: "S · L · A · T · E", why: "An SL- opening blend testing S, A, T and E — one of the best first guesses in the game." },
    { word: "CAROL", tests: "C · A · R · O · L", why: "Ends in -L, probing the final slot with C, A, R and O." },
  ],
  strategyParagraphs: [
    "Use the blend, not the position. Because L is spread so evenly, its slot alone won't pin it down — but L rarely stands alone at the front. If you have a green first consonant, an opening BL/CL/FL/GL/PL/SL blend puts the L in slot two more often than not.",
    "Check the -LE and -LL endings. The other big L family sits at the back: -LE (APPLE, EAGLE, TABLE) and -LL (SMALL, SKILL, TROLL). If a front-slot L came back yellow and no blend fits, slide it toward the end and look for one of these patterns.",
    "Expect a double L. L doubles more than almost any consonant — ALLEY, BELLY, HELLO, JELLY, SKILL, TROLL — so a single yellow L is often hiding a second one. When your greens leave two adjacent gaps near the middle or end, testing a double L is a commonly missed move.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter L?", answer: "There are {N} valid five-letter words with an L in the Wordle dictionary, and {COMMON} of them are common answer-pool words. L is one of the more frequent consonants in the answer pool." },
    { question: "What is the best Wordle word with L in it?", answer: "ALERT and SLATE are the strongest — both test five distinct, high-frequency letters, with ALERT placing the L in the second slot and SLATE opening on an SL- blend. AISLE and CLEAN are excellent alternatives." },
    { question: "Where does the letter L usually go in a 5-letter word?", answer: "It is fairly even — the third slot leads at about 26%, but every position lands in double digits. Because of that, use the L's blend (BL, CL, SL) or ending (-LE, -LL) to place it rather than position alone." },
    { question: "How many words with L have been Wordle answers?", answer: "{ANSWERED} five-letter words containing L have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two L's?", answer: "Lots — ALLEY, BELLY, HELLO, JELLY, SKILL, SMALL and TROLL among them. L doubles more than most consonants, so a single yellow L often hides a second one; it is worth testing when gaps cluster near the end." },
    { question: "What 5-letter words start with an L blend?", answer: "The BL, CL, FL, GL, PL and SL blends are everywhere: BLACK, CLOUD, FLAME, GLIDE, PLANT, SLATE. If you have a green first consonant and a yellow L, a second-slot L inside one of these blends is a high-value test." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
