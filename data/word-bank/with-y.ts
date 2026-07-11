import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-y (contains Y).
 * Y is the most end-locked letter: 64% in the last slot (-LY, -RY, -TY, -PY).
 * "A yellow Y is almost always the last letter" is the hook.
 */
export const content: LetterContent = {
  letter: "Y",
  path: "/5-letter-words/with-y",
  lastUpdated: "2026-07-11",
  topOpener: "EARLY",
  heroSubhead:
    "Every five-letter word that contains Y, sorted for Wordle — the common answer words first, mapped by where the Y sits, with past answers flagged and the best words to pin down a yellow Y.",
  introExtra:
    "Y is the most position-locked letter in Wordle. The data below shows it in the last slot about 64% of the time — nearly two in three — because Y is the classic word-ending vowel: -LY (EARLY, DAILY), -RY (BERRY, ENTRY), -TY (DUSTY, PARTY) and -PY (HAPPY, PUPPY). So a yellow Y is one of the most informative yellows you can get: unless it is already green somewhere else, the fifth slot is almost certainly its home, and a wrong-spot Y elsewhere basically confirms it belongs at the end.",
  openersIntro:
    "Because Y so often ends the word, the best Y openers put it in the last slot to test that position directly. The picks below use five distinct, high-frequency letters.",
  openers: [
    { word: "EARLY", tests: "E · A · R · L · Y", why: "Ends in -LY, testing the common last-slot Y alongside E, A, R and L — five distinct, high-frequency letters.", best: true },
    { word: "ENTRY", tests: "E · N · T · R · Y", why: "Another -RY ender covering E, N, T and R with the Y in its likely final slot." },
    { word: "NASTY", tests: "N · A · S · T · Y", why: "A -TY ending testing N, A, S and T — five distinct letters and a clean board read." },
    { word: "IRONY", tests: "I · R · O · N · Y", why: "Covers two vowels plus R and N with the Y last — good for probing a final Y and the vowels together." },
    { word: "LYRIC", tests: "L · Y · R · I · C", why: "The rarer case: Y as a middle vowel in slot two. Useful once a last-slot Y has been ruled out." },
  ],
  strategyParagraphs: [
    "Assume the last slot first. Y ends the word about 64% of the time, so a yellow Y is very nearly a green Y in the making — just in the wrong spot. Before anything else, test it in position five and look for a -LY, -RY, -TY, -PY, -GY or -KY ending.",
    "Match the ending to your other letters. If you already have an L, R, T or P placed near the back, the Y almost certainly follows it (-LY, -RY, -TY, -PY). This pairing makes Y one of the easiest letters to lock once it appears.",
    "Know the middle-Y exceptions. A smaller set uses Y as an interior vowel — GYPSY, LYRIC, NYMPH, CRYPT, HYMN-style cores — and a few double it (GYPSY, again, plus the -LY openers). If a last-slot Y comes back gray but the Y is still in the word, one of these middle-Y words is your target.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter Y?", answer: "There are {N} valid five-letter words with a Y in the Wordle dictionary, and {COMMON} of them are common answer-pool words. Most of them use Y as the final letter." },
    { question: "What is the best Wordle word with Y in it?", answer: "EARLY and ENTRY are the strongest — both end in a common -LY or -RY while testing four other frequent letters. NASTY is another excellent last-slot-Y opener, and LYRIC covers the rarer middle-Y case." },
    { question: "Where does the letter Y usually go in a 5-letter word?", answer: "The last slot, overwhelmingly — about 64% of five-letter words with a Y end in it (-LY, -RY, -TY, -PY). So when a Y comes back yellow, test the fifth position first; it will be right roughly two times out of three." },
    { question: "How many words with Y have been Wordle answers?", answer: "{ANSWERED} five-letter words containing Y have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in Y?", answer: "A huge share of Y-words: EARLY, DAILY (-LY); BERRY, ENTRY (-RY); DUSTY, PARTY (-TY); HAPPY, PUPPY (-PY). A yellow Y almost always belongs to one of these endings, so the last slot is the first place to test it." },
    { question: "What 5-letter words have Y in the middle?", answer: "The exceptions are worth knowing: GYPSY, LYRIC, NYMPH, CRYPT and TRYST use Y as an interior vowel. If a last-slot Y is ruled out but the Y stays in the word, one of these middle-Y words is your answer." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
