import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/ending-with-k.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "K",
  path: "/5-letter-words/ending-with-k",
  lastUpdated: "2026-06-24",
  topOpener: "STEAK",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that end in K — common answer-pool words first, with the strongest K-ending openers and past Wordle answers flagged.",
  introExtra:
    "Five-letter words ending in K are an opener-friendly ending built around a handful of dense clusters. The biggest by far is the _ _ _ C K digraph (BLACK, BLOCK, BRICK, QUICK, TRUCK), followed by _ _ _ N K (BLANK, DRINK, THINK), the vowel-rich _ _ _ A K (BREAK, CLOAK, SNEAK, STEAK) and _ _ _ R K (CLERK, SHARK, SPARK). Once you have locked a green K in the last slot, the 4th letter — usually C, N, A or R — is the real puzzle, and STEAK packs five of the most frequent letters.",
  openersIntro:
    "K is a surprisingly opener-friendly ending: several K-enders pack high-value letters, especially the -AK words that map a vowel before the K. The picks below are the distinct-letter standouts worth playing.",
  openers: [
    { word: "STEAK", tests: "S · T · E · A · K", why: "Tests five of the most frequent letters in Wordle answers (S, T, E, A, K) with no repeats — a genuinely strong opener that happens to end in K.", best: true },
    { word: "SNEAK", tests: "S · N · E · A · K", why: "Five distinct letters bringing S and N around the vowels E and A — broad early coverage in the -AK family." },
    { word: "CLOAK", tests: "C · L · O · A · K", why: "Tests C and L with the vowels O and A — a strong -AK opener that probes two vowels at once." },
    { word: "STALK", tests: "S · T · A · L · K", why: "Covers S, T, L and the vowel A — a clean -LK option with no repeats." },
    { word: "SHARK", tests: "S · H · A · R · K", why: "Brings S, H, A and R together — a solid consonant-heavy probe that lands the vowel A and R." },
    { word: "BRISK", tests: "B · R · I · S · K", why: "Tests B, R, I and S — a -SK option that also probes the vowel I early." },
  ],
  strategyParagraphs: [
    "Once the K is green, the 4th letter is the whole game. K sits after a small set of letters, so the penultimate slot — and which cluster it puts you in — is what actually narrows the field. Decide whether you are looking at a -CK, -NK, -AK or -RK word and most of the list falls away.",
    "Walk the dense families in order, and start with the -CK digraph — it is the biggest by a wide margin: BLACK, BLOCK, BRICK, CHECK, CLICK, CLOCK, CRACK, QUICK, STICK, STOCK, TRACK, TRICK and TRUCK. Then -NK: BLANK, BLINK, DRINK, PLANK, PRANK, SKUNK, STINK, THANK, THINK and TRUNK. The vowel-rich -AK set covers BLEAK, BREAK, CLOAK, CREAK, CROAK, FREAK, SNEAK, SPEAK, STEAK and TWEAK, and -RK adds CLERK, QUARK, QUIRK, SHARK, SPARK, STARK and STORK.",
    "Watch the thin -LK and -SK tails. After the four big clusters, the remaining K-enders are sparse: CHALK and STALK are about all of -LK, while -SK gives you BRISK, FLASK, FRISK, KIOSK and WHISK. If your letters force an -LK or -SK ending, the candidate pool is small, so lean on those few rather than hunting for options that mostly do not exist.",
  ],
  faq: [
    { question: "How many 5-letter words end in K?", answer: "There are {N} five-letter words ending in K in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — a solid share, because the -CK, -NK, -AK and -RK families are all well-stocked." },
    { question: "What is the best Wordle word ending in K?", answer: "STEAK is the strongest K-ending pick: it tests S, T, E, A and K — five of the most frequent letters in Wordle answers — with no repeats. SNEAK and CLOAK are close behind. K is one of the more opener-friendly endings." },
    { question: "Which 5-letter words ending in K have been Wordle answers?", answer: "{ANSWERED} K-ending words have already appeared as official Wordle answers in the puzzles we track, including BREAK, CLOCK, FREAK, TRUCK and QUARK. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What 5-letter words end in -CK, -NK or -AK?", answer: "These families cover most common K-enders. -CK is the biggest digraph, with BLACK, QUICK and TRUCK; -NK includes DRINK, THANK and THINK; -AK includes BREAK, SNEAK and STEAK; and -RK adds CLERK, SHARK and SPARK. Spotting which family fits is the fastest way to solve a K-ending puzzle." },
    { question: "Are 5-letter words ending in K good Wordle starters?", answer: "Yes — more than you might expect. STEAK, SNEAK and CLOAK all pack frequent letters and make genuinely strong openers, especially the -AK words that map a vowel before the K. Knowing the K-enders early is both a good opener and a good close." },
    { question: "What are 5-letter words ending in K with lots of vowels?", answer: "CLOAK, CREAK, CROAK, SNEAK, SPEAK, STEAK and TWEAK each carry two vowels while ending in K. They are handy for mapping the puzzle's vowel skeleton once the last letter is locked." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
