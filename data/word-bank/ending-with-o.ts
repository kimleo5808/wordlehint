import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-o.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "O",
  path: "/5-letter-words/ending-with-o",
  lastUpdated: "2026-06-24",
  topOpener: "RATIO",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in O — common answer-pool words first, with the strongest O-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in O are a reasonable, vowel-rich ending, but be honest about their nature: a large share are loanwords and borrowings, and the Wordle answer pool for -O words is modest. The penultimate letter clusters into a few families — _ _ _ I O (AUDIO, RADIO, RATIO), _ _ _ R O (METRO, MICRO, RETRO), _ _ _ T O (PHOTO, PESTO, MOTTO) and _ _ _ G O (BINGO, CARGO, TANGO). Once you have locked a green O in the last slot, the 4th letter is the real puzzle, and RATIO maps three vowels at once.",
  openersIntro:
    "O endings are reasonable openers because they are vowel-rich — a word like RATIO maps three vowels in one guess. The picks below are the distinct-letter standouts worth playing.",
  openers: [
    { word: "RATIO", tests: "R · A · T · I · O", why: "Tests R and T plus three vowels — A, I and O — in a single guess, mapping most of the vowel skeleton with no repeats; a genuinely useful opener that ends in O.", best: true },
    { word: "PIANO", tests: "P · I · A · N · O", why: "Five distinct letters bringing P and N around the vowels I, A and O — broad vowel coverage in one guess." },
    { word: "METRO", tests: "M · E · T · R · O", why: "Tests M, T and R with the vowels E and O — a clean -RO opener with no repeats." },
    { word: "BRAVO", tests: "B · R · A · V · O", why: "Covers B, R and V around the vowels A and O — a solid probe that also tests the harder-to-place V." },
    { word: "SALVO", tests: "S · A · L · V · O", why: "Brings S, L and V with the vowels A and O — useful for checking V and L early." },
    { word: "TANGO", tests: "T · A · N · G · O", why: "Tests T, N and G with the vowels A and O — a clean -GO opener with no repeats." },
  ],
  strategyParagraphs: [
    "Once the O is green, the 4th letter is the whole game. O sits at the end after a vowel or consonant, so the penultimate slot — and which family it puts you in — is what actually narrows the field. Decide whether you are looking at an -IO, -RO, -TO or -GO word and most of the list falls away.",
    "Walk the dense families in order. -IO is heavily vowel-loaded: AUDIO, FOLIO, PATIO, RADIO, RATIO and CURIO. Then -RO: HYDRO, INTRO, MACRO, METRO, MICRO and RETRO. The -TO set covers DITTO, GUSTO, MOTTO, PESTO, PHOTO and PINTO, and -GO gives you BINGO, CARGO, DINGO, FORGO, MANGO and TANGO. Smaller groups add the -LO/-NO/-VO words (CELLO, HELLO, PIANO, RHINO, BRAVO, SALVO) and the -MBO cluster (GUMBO, JUMBO, MAMBO, LIMBO).",
    "Mind the loanwords — and the thin answer pool. Many O-enders are borrowings (PESTO, GUSTO, BRAVO, TANGO), so they look plausible but are less likely to be everyday answers. The Wordle answer pool for -O words is genuinely modest, so once the O is locked, do not over-trust the long valid-guess list; the real solution is usually one of the more common, English-rooted forms.",
  ],
  faq: [
    { question: "How many 5-letter words end in O?", answer: "There are {N} five-letter words ending in O in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — a modest share, because many O-enders are loanwords and borrowings rather than everyday English." },
    { question: "What is the best Wordle word ending in O?", answer: "RATIO is the strongest O-ending pick: it tests R and T plus three vowels — A, I and O — in a single guess, with no repeats, mapping most of the vowel skeleton at once. PIANO and METRO are close behind. O endings are reasonable, vowel-rich openers." },
    { question: "Which 5-letter words ending in O have been Wordle answers?", answer: "{ANSWERED} O-ending words have already appeared as official Wordle answers in the puzzles we track, including CELLO, GIZMO, GUMBO, JUMBO and LIMBO. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -IO, -RO or -TO?", answer: "These families cover most common O-enders. -IO includes AUDIO, RADIO and RATIO; -RO includes METRO, MICRO and RETRO; -TO includes PHOTO, PESTO and MOTTO; and -GO adds BINGO, CARGO and TANGO. Spotting which family fits is the fastest way to solve an O-ending puzzle." },
    { question: "Are 5-letter words ending in O good Wordle starters?", answer: "They can be, because they are vowel-rich — RATIO maps three vowels at once. Be honest, though: many O-enders are loanwords, so they are better as vowel-mapping probes than as safe answer guesses. O endings are reasonable openers but a modest answer pool." },
    { question: "What are 5-letter words ending in O with lots of vowels?", answer: "AUDIO, RATIO, RADIO, CAMEO, CACAO, PATIO, PIANO and FOLIO each carry several vowels while ending in O. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
