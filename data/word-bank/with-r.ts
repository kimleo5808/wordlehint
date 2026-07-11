import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-r (contains R).
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * R is the most evenly distributed common letter — it appears in every slot at
 * roughly similar rates (3rd slot slightly ahead), which makes a yellow R
 * genuinely ambiguous. The page's angle: use blends and -ER endings to place it.
 */
export const content: LetterContent = {
  letter: "R",
  path: "/5-letter-words/with-r",
  lastUpdated: "2026-07-11",
  topOpener: "CRANE",
  heroSubhead:
    "Every five-letter word that contains R, sorted for Wordle — the common answer words first, mapped by where the R sits, with past answers flagged and the best words to pin down a yellow R.",
  introExtra:
    "R is one of the most useful consonants in Wordle and one of the trickiest to place. Unlike most letters it spreads almost evenly across the word: the data below shows the third slot slightly ahead (about 29%) but every position from first to last landing in double digits. That even spread means a yellow R tells you little about position on its own — you have to lean on the letters around it. The good news is R loves company: it forms the opening blends BR, CR, DR, FR, GR, PR and TR, and the ending -ER (BAKER, TIGER, LOVER), so the R's neighbours usually give it away.",
  openersIntro:
    "R combines with almost everything, so strong openers are plentiful. The picks below use five distinct, high-frequency letters and place the R in different slots and blends, so you can test R and read the board at once.",
  openers: [
    { word: "CRANE", tests: "C · R · A · N · E", why: "Puts the R in a second-slot CR- blend while testing C, A, N and E — a perennial best-opener pick, and it contains R.", best: true },
    { word: "TRACE", tests: "T · R · A · C · E", why: "A TR- opening blend with A, C and E — five distinct letters and a very strong first guess." },
    { word: "AROSE", tests: "A · R · O · S · E", why: "Covers three vowels plus R and S with the R in the second slot — one of the best openers in the game." },
    { word: "ALTER", tests: "A · L · T · E · R", why: "Ends in -ER, immediately testing the common last-slot R alongside A, L, T and E." },
    { word: "CATER", tests: "C · A · T · E · R", why: "Another -ER ender covering C, A, T and E — useful once you suspect a final R." },
  ],
  strategyParagraphs: [
    "Accept that a yellow R is ambiguous and use its neighbours. R is the rare letter that shows up almost equally in every slot, so unlike a yellow O or A it does not point you to one position. Instead, ask what letters you have already placed — R almost always sits next to a vowel or inside a blend, and those anchors do the locating.",
    "Check the opening blends. A large share of R-words start with a consonant-plus-R blend: BR, CR, DR, FR, GR, PR, TR. If you have a green consonant in slot one and a yellow R, the second slot is a strong bet (BREAD, CRIMP, DRAWN, PROBE).",
    "Then check the -ER ending. The other big R cluster is the final -ER: BAKER, TIGER, LOVER, TIMER, ROVER. If your first-slot R came back yellow and a blend does not fit, slide it to the last slot and look for an -ER word. And watch for double R — ARRAY, BERRY, CARRY, MERRY — which a single yellow R never rules out.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter R?", answer: "There are {N} valid five-letter words with an R in the Wordle dictionary, and {COMMON} of them are common answer-pool words. R is one of the most frequent consonants in the answer pool." },
    { question: "What is the best Wordle word with R in it?", answer: "CRANE and TRACE are the strongest — both open with a consonant-R blend and test five distinct, high-frequency letters. AROSE is another top pick, while ALTER and CATER are ideal for probing a final -ER." },
    { question: "Where does the letter R usually go in a 5-letter word?", answer: "R is unusually evenly spread — the third slot is slightly ahead (about 29%), but every position lands in double digits. That is why a yellow R is ambiguous: use the surrounding letters, opening blends (BR, CR, TR) and -ER endings to place it rather than relying on position alone." },
    { question: "How many words with R have been Wordle answers?", answer: "{ANSWERED} five-letter words containing R have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two R's?", answer: "ARRAY, ARROW, BERRY, CARRY, MERRY, SORRY and TERROR-style cores like ERROR among them. A single yellow R never rules out a second R, so a repeated R is worth testing when a middle gap resists." },
    { question: "What 5-letter words start with a consonant and R blend?", answer: "The BR, CR, DR, FR, GR, PR and TR blends are everywhere: BREAD, CRIMP, DRAWN, FROWN, GRAPE, PROBE, TRACE. If you have a green first consonant and a yellow R, the second slot is the high-value place to test it." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
