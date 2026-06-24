import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-s.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "S",
  path: "/5-letter-words/ending-with-s",
  lastUpdated: "2026-06-24",
  topOpener: "ETHOS",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in S — common answer-pool words first, with the strongest S-ending openers and past Wordle answers flagged.",
  introExtra:
    "Here is the honest truth no other list states: the NYT Wordle answer pool deliberately excludes plurals and most verb forms ending in S, so even though there are thousands of valid S-ending guesses, only a small set are ever answers. Almost all real S-ending answers are doubled _ _ _ S S words (CROSS, GLASS, DRESS) or Latin _ _ _ U S words (FOCUS, VIRUS, BONUS). A true S-ending answer is genuinely rare — so if you have locked an S in the last slot, look at the -SS and -US families first, not the long tail of plurals.",
  openersIntro:
    "Most S-enders are plurals that the answer pool rejects, so the openers worth playing are the singular words that pack high-value letters. The picks below are the distinct-letter exceptions that earn a spot.",
  openers: [
    { word: "ETHOS", tests: "E · T · H · O · S", why: "Tests the frequent E, T, O and S with H and no repeats — a genuinely strong opener that happens to end in S.", best: true },
    { word: "BONUS", tests: "B · O · N · U · S", why: "Brings B, N and the vowels O and U around S — five distinct letters and a real -US answer." },
    { word: "MINUS", tests: "M · I · N · U · S", why: "Covers M, N and the vowels I and U, probing two vowels at once." },
    { word: "FOCUS", tests: "F · O · C · U · S", why: "Tests F, C and the vowels O and U — a strong -US word with broad coverage." },
    { word: "CHAOS", tests: "C · H · A · O · S", why: "Packs C, H and the vowels A and O — a rare -OS option that maps two vowels." },
    { word: "VIRUS", tests: "V · I · R · U · S", why: "Brings V, R and the vowels I and U — a useful -US opener that probes U early." },
  ],
  strategyParagraphs: [
    "Wordle hides almost no plural answers. The NYT answer pool deliberately excludes plurals and most -S verb forms, so the thousands of S-ending guesses collapse to a tiny pool of real answers. When you lock an S in the last slot, mentally cross off the plurals — the solution is far more likely to be a doubled -SS word or a Latin -US word.",
    "Check -SS first. The doubled-S family is the largest source of real S-ending answers: ABYSS, BLESS, BLISS, BRASS, CHESS, CLASS, CROSS, DRESS, FLOSS, GLASS, GLOSS, GRASS, GROSS, GUESS, PRESS and TRUSS. Once H is ruled out, fix the vowel and the two leading consonants and the -SS set narrows fast.",
    "Then sweep the -US words. BONUS, FETUS, FICUS, FOCUS, HUMUS, LOCUS, LUPUS, MINUS, MUCUS, REBUS, TORUS and VIRUS make up the second real family, with a few one-off tails like CHAOS and ETHOS (-OS) and BASIS (-IS). Between -SS and -US you have covered nearly every legitimate S-ending answer.",
  ],
  faq: [
    { question: "How many 5-letter words end in S?", answer: "There are {N} five-letter words ending in S in the full Wordle dictionary of valid guesses. Of those, only {COMMON} are common, everyday words from the official Wordle answer pool — a low share, because the answer pool deliberately excludes plurals and most verb forms ending in S." },
    { question: "What is the best Wordle word ending in S?", answer: "ETHOS is the strongest S-ending pick: it tests E, T, O and S — all frequent in Wordle answers — plus H, with no repeats. BONUS, MINUS and FOCUS are close behind. Note that most other S-enders are plurals that can never be the answer." },
    { question: "Which 5-letter words ending in S have been Wordle answers?", answer: "{ANSWERED} S-ending words have already appeared as official Wordle answers in the puzzles we track, including BASIS, GLOSS, GRASS, GROSS and GUESS. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "Why are 5-letter words ending in S so rarely Wordle answers?", answer: "The NYT answer pool deliberately excludes plurals and most -S verb forms, so a real S-ending answer is rare. Almost all are doubled -SS words like CROSS, GLASS and DRESS, or Latin -US words like FOCUS, VIRUS and BONUS. If you have locked an S, look at -SS and -US first." },
    { question: "Are 5-letter words ending in S good Wordle starters?", answer: "ETHOS, BONUS and MINUS are, because they pack frequent letters and are real singular words. Most S-enders are not, though — they are plurals the answer pool never uses, so they waste a guess confirming a letter that probably is not in the slot." },
    { question: "What are 5-letter words ending in S with lots of vowels?", answer: "CHAOS, ETHOS, BONUS, MINUS, FOCUS and VIRUS each carry two vowels while ending in S. They are handy for mapping the puzzle's vowel skeleton while still being legitimate answer candidates." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
