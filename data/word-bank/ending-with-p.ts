import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-p.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "P",
  path: "/5-letter-words/ending-with-p",
  lastUpdated: "2026-06-24",
  topOpener: "STRAP",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in P — common answer-pool words first, with the strongest P-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in P are a solid group, and one family runs the show: the _ _ _ M P shape (CHAMP, CLAMP, PLUMP, STAMP, SWAMP) is by far the densest, with smaller -OP, -EP and -AP clusters filling in behind it. Once you have a green P in the last slot, ask whether an M sits in front of it first — that single guess clears most of the list — then let the vowel and 3rd letter finish the job. STRAP and SCALP are the standout openers because they pack strong, distinct letters.",
  openersIntro:
    "P is a fine ending to open from, and a handful of P-enders pack genuinely strong letters. The picks below are the distinct-letter exceptions worth playing when you want a P on the board early.",
  openers: [
    { word: "STRAP", tests: "S · T · R · A · P", why: "Five distinct, high-frequency letters — S, T, R and A are among the most common in Wordle answers, making this a genuinely strong opener that happens to end in P.", best: true },
    { word: "SCALP", tests: "S · C · A · L · P", why: "Tests S, C, L and the vowel A with no repeats — broad early coverage from a P-ender." },
    { word: "CHEAP", tests: "C · H · E · A · P", why: "Brings C and H around the frequent vowels E and A for a strong vowel-mapping start." },
    { word: "GROUP", tests: "G · R · O · U · P", why: "Covers G and R plus the vowels O and U — a good way to probe U early." },
    { word: "CRIMP", tests: "C · R · I · M · P", why: "Tests C, R and the vowel I alongside the common M before the P." },
    { word: "PLUMP", tests: "P · L · U · M · P", why: "Maps L, U and M quickly, though the repeated P costs a little coverage." },
  ],
  strategyParagraphs: [
    "The family is the puzzle. P-enders cluster tightly, and the _ _ _ M P shape is the dominant one — once P is green, check for an M in the 4th slot before anything else, because that one question splits the list in half. The remaining endings (-OP, -EP, -AP, plus small -IP, -RP and -SP tails) divide the rest cleanly.",
    "Walk the families in order of size. -MP is huge (CHAMP, CHUMP, CLAMP, CLUMP, CRAMP, CRIMP, PLUMP, STAMP, STOMP, STUMP, SWAMP, THUMP, TRAMP, TRUMP); -OP gathers the double-O words (DROOP, SCOOP, SLOOP, SNOOP, STOOP, SWOOP, TROOP, WHOOP); -EP holds the double-E set (BLEEP, CREEP, SHEEP, SLEEP, STEEP, SWEEP); and -AP is small (RECAP, SCRAP, STRAP). Spotting the cluster narrows the field fast.",
    "Mind the small-family traps. The -IP set (EQUIP, STRIP, TULIP, UNZIP), the -RP set (CHIRP, SHARP, SLURP, USURP) and the -SP set (CLASP, CRISP, GRASP) are each tiny, so if your letters rule out -MP and the double-vowel families, these outliers are where the answer hides — EQUIP and USURP in particular are easy to overlook.",
  ],
  faq: [
    { question: "How many 5-letter words end in P?", answer: "There are {N} five-letter words ending in P in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — a healthy share, carried mostly by the large -MP family." },
    { question: "What is the best Wordle word ending in P?", answer: "STRAP is the strongest P-ending pick: it tests S, T, R and A — four of the most frequent letters in Wordle answers — plus P, with no repeats. SCALP and CHEAP are close behind. P is a genuinely fine ending to open from." },
    { question: "Which 5-letter words ending in P have been Wordle answers?", answer: "{ANSWERED} P-ending words have already appeared as official Wordle answers in the puzzles we track, including CHUMP, CLAMP, CLASP, PLUMP, SHEEP, SWAMP, SWOOP and TULIP. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -MP?", answer: "The -MP digraph is the dominant P-ending family, covering CHAMP, CHUMP, CLAMP, CLUMP, CRAMP, CRIMP, PLUMP, STAMP, STOMP, STUMP, SWAMP, THUMP, TRAMP and TRUMP. Once P is green, checking for an M in the 4th slot is the single fastest way to solve a P-ending puzzle." },
    { question: "Are 5-letter words ending in P good Wordle starters?", answer: "Several are — STRAP, SCALP and CHEAP pack frequent, distinct letters, so P is a reasonable ending to open from. The main thing to watch is repeated letters in the -MP words like PLUMP, which give up a little coverage. Save those for once the P is green." },
    { question: "What are 5-letter words ending in P with lots of vowels?", answer: "CHEAP, GROUP, CROUP, SCOOP, STOOP and TROOP each carry two vowels while ending in P. They are handy for mapping the puzzle's vowel skeleton — especially the U-bearing ones — once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
