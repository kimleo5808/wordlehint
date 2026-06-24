import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-f.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "F",
  path: "/5-letter-words/ending-with-f",
  lastUpdated: "2026-06-24",
  topOpener: "SCARF",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in F — common answer-pool words first, with the strongest F-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in F split cleanly between two families: doubled _ _ _ F F words (CLIFF, STUFF, STAFF) and the small _ _ I E F set (BRIEF, CHIEF, GRIEF, THIEF), with handy _ _ R F and _ _ O F tails. So once you have locked a green F in the last slot, decide whether you are looking at a -FF double or one of the vowel-pattern endings, and the rest of the word usually follows. SCARF and BRIEF are both solid openers — F endings are a reasonably positive position to be in.",
  openersIntro:
    "F-enders make decent openers, especially the -RF and -IEF words that carry distinct, high-value letters. The picks below are the words worth playing before the F is confirmed.",
  openers: [
    { word: "SCARF", tests: "S · C · A · R · F", why: "Tests the frequent S, C, A and R plus F with no repeats — a genuinely strong opener that happens to end in F.", best: true },
    { word: "BRIEF", tests: "B · R · I · E · F", why: "Brings B, R and the vowels I and E around F — five distinct letters and a real answer." },
    { word: "CHIEF", tests: "C · H · I · E · F", why: "Covers C, H and the vowels I and E — broad early coverage with no repeats." },
    { word: "DWARF", tests: "D · W · A · R · F", why: "Probes the awkward W alongside D, A and R — useful for mapping that tricky letter early." },
    { word: "PROOF", tests: "P · R · O · O · F", why: "Tests P, R and the doubled vowel O — a clean -OF option that nails the O placement." },
    { word: "SHELF", tests: "S · H · E · L · F", why: "Brings S, H, E and L around F — five distinct letters and a useful -LF probe." },
  ],
  strategyParagraphs: [
    "Decide -FF or vowel-pattern first. F-enders fall into two camps: doubled -FF words and the vowel-led -IEF and -OF sets. The moment F is green, ask which camp fits your known letters — that single split removes most of the list in one step.",
    "Sweep the large -FF family. The doubled-F set is the biggest source of F-ending answers: BLUFF, CHAFF, CLIFF, FLUFF, GRUFF, SCOFF, SKIFF, SNIFF, SNUFF, STAFF, STIFF, STUFF and WHIFF. Fix the vowel and the leading consonant cluster and the -FF words narrow quickly.",
    "Then mind the smaller tails. The -IEF set (BRIEF, CHIEF, GRIEF, THIEF) and the -RF words (DWARF, SCARF, WHARF) and -OF words (ALOOF, PROOF, SPOOF) round out the list, with one-offs like SHELF (-LF), MOTIF and SERIF (-IF). Knowing these clusters means no F-ending answer can surprise you.",
  ],
  faq: [
    { question: "How many 5-letter words end in F?", answer: "There are {N} five-letter words ending in F in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — mostly the doubled -FF words and the small -IEF set." },
    { question: "What is the best Wordle word ending in F?", answer: "SCARF is the strongest F-ending pick: it tests S, C, A and R — four frequent letters in Wordle answers — plus F, with no repeats. BRIEF and CHIEF are close behind. F endings make reasonably good openers." },
    { question: "Which 5-letter words ending in F have been Wordle answers?", answer: "{ANSWERED} F-ending words have already appeared as official Wordle answers in the puzzles we track, including CLIFF, GRUFF, PROOF, SERIF, SPOOF, STUFF and WHARF. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -FF or -IEF?", answer: "The -FF family includes BLUFF, CLIFF, FLUFF, GRUFF, STAFF, STIFF, STUFF and WHIFF, while the -IEF set is just BRIEF, CHIEF, GRIEF and THIEF. Spotting which pattern fits is the fastest way to solve an F-ending puzzle." },
    { question: "Are 5-letter words ending in F good Wordle starters?", answer: "SCARF, BRIEF and CHIEF are, because they pack frequent letters and distinct vowels. F endings are a reasonably positive position overall — the two clear families make the word easy to pin down once the F is green." },
    { question: "What are 5-letter words ending in F with lots of vowels?", answer: "ALOOF, BRIEF, CHIEF, GRIEF, PROOF and SPOOF each carry two vowels while ending in F. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
