import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-m.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "M",
  path: "/5-letter-words/ending-with-m",
  lastUpdated: "2026-06-24",
  topOpener: "CREAM",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in M — common answer-pool words first, with the strongest M-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in M spread across more vowel families than most endings, which makes them friendlier than they look. The -AM, -IM, -OM, -UM and -RM families each hold a fair share, so once you have a green M in the last slot, the vowel one place in front of it does most of the deciding. CREAM, STEAM and DREAM are the standout openers because the -AM shape lets them pack frequent letters with no repeats.",
  openersIntro:
    "M is a reasonable ending to open from, and the -AM family in particular yields strong, distinct-letter openers. The picks below are the ones worth playing when you want an M on the board early.",
  openers: [
    { word: "CREAM", tests: "C · R · E · A · M", why: "Tests the frequent C, R, E and A with no repeats — a genuinely strong opener that happens to end in M.", best: true },
    { word: "STEAM", tests: "S · T · E · A · M", why: "Five distinct letters bringing S and T around the common vowels E and A." },
    { word: "CHARM", tests: "C · H · A · R · M", why: "Covers C, H and R plus the vowel A with no repeats for broad early coverage." },
    { word: "CLAIM", tests: "C · L · A · I · M", why: "Maps C and L plus two vowels, A and I, in a single guess." },
    { word: "STORM", tests: "S · T · O · R · M", why: "Tests S, T and R around the vowel O — a strong -RM option with no repeats." },
    { word: "DREAM", tests: "D · R · E · A · M", why: "Brings D and R around the frequent vowels E and A for a strong vowel-mapping start." },
  ],
  strategyParagraphs: [
    "The family is the puzzle. M-enders fall into a handful of vowel shapes, and the vowel sitting just before the M is the key — once M is green, settling whether it's -AM, -IM, -OM, -UM or an -RM consonant cluster clears most of the list in one decision.",
    "Walk the families with examples. -AM holds CREAM, DREAM, GLEAM, STEAM and MADAM; -IM has CLAIM, MAXIM, MINIM and DENIM; -OM gathers AXIOM, BOSOM, BUXOM, IDIOM and VENOM; -UM covers ALBUM, DATUM, FORUM, OPIUM, SERUM and SCRUM; and -RM brings the consonant cluster of ALARM, CHARM, STORM, SWARM and SPERM. Spotting the cluster narrows the field fast.",
    "Mind the small-family traps. The consonant-cluster endings -SM (CHASM, PRISM, SPASM), -LM (PSALM, QUALM, REALM) and -EM (GOLEM, MODEM, TOTEM, HAREM) are each tiny, so if the common vowel families don't fit your letters, these outliers are where the answer hides — QUALM and PSALM in particular are easy to miss.",
  ],
  faq: [
    { question: "How many 5-letter words end in M?", answer: "There are {N} five-letter words ending in M in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — a fair share, spread across the many vowel families that M endings support." },
    { question: "What is the best Wordle word ending in M?", answer: "CREAM is the strongest M-ending pick: it tests C, R, E and A — all frequent letters in Wordle answers — plus M, with no repeats. STEAM and DREAM are close behind. M is a reasonable ending to open from." },
    { question: "Which 5-letter words ending in M have been Wordle answers?", answer: "{ANSWERED} M-ending words have already appeared as official Wordle answers in the puzzles we track, including BLOOM, CAROM, CHASM, FORUM, PRISM and SPASM. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -AM, -UM or -RM?", answer: "These are three of the larger M-ending families. -AM includes CREAM, DREAM and STEAM; -UM includes ALBUM, FORUM and SERUM; -RM includes ALARM, CHARM and STORM. Spotting which family fits is the fastest way to solve an M-ending puzzle." },
    { question: "Are 5-letter words ending in M good Wordle starters?", answer: "Several are — CREAM, STEAM and DREAM pack frequent, distinct letters thanks to the -AM shape, so M is a reasonable ending to open from. CHARM and STORM are strong -RM options too. Save the rarer vowel families for once the M is green." },
    { question: "What are 5-letter words ending in M with lots of vowels?", answer: "AXIOM, IDIOM, OPIUM, CREAM, DREAM, STEAM and GLEAM each carry two vowels while ending in M. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
