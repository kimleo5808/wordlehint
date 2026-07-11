import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-i (contains I).
 * I is an interior vowel — it almost never opens or ends a five-letter word
 * (4% / 9%) and clusters in slots 2–4. That "never at the ends" fact is the hook.
 */
export const content: LetterContent = {
  letter: "I",
  path: "/5-letter-words/with-i",
  lastUpdated: "2026-07-11",
  topOpener: "IRATE",
  heroSubhead:
    "Every five-letter word that contains I, sorted for Wordle — the common answer words first, mapped by where the I sits, with past answers flagged and the best words to pin down a yellow I.",
  introExtra:
    "I is an interior vowel, and that makes a yellow I more useful than most. It almost never opens or ends a five-letter word — only about 4% start with I and 9% end with it — so a yellow I is really telling you the letter lives in the middle three slots. The data below shows it favouring the second slot (about 36%), then the third and fourth. If your I came back yellow, ignore the first and last positions and test slot two first.",
  openersIntro:
    "I pairs with almost every consonant, so openers are easy. The picks below use five distinct, high-frequency letters and spread the I across the interior slots where it actually lives.",
  openers: [
    { word: "IRATE", tests: "I · R · A · T · E", why: "Five distinct letters covering three vowels (I, A, E) plus R and T, leading with the I — a strong, well-rounded opener.", best: true },
    { word: "ARISE", tests: "A · R · I · S · E", why: "Three vowels plus R and S with the I in the middle — one of the best openers in the game." },
    { word: "ALIEN", tests: "A · L · I · E · N", why: "Covers three vowels plus L and N, placing the I in the common third slot." },
    { word: "ANTIC", tests: "A · N · T · I · C", why: "Puts the I in the fourth slot while testing A, N, T and C — a useful interior-I read." },
    { word: "CAIRN", tests: "C · A · I · R · N", why: "Tests C, A, R and N around a third-slot I — a distinct-letter alternative." },
  ],
  strategyParagraphs: [
    "Rule out the ends immediately. Because barely 4% of five-letter words start with I and only about 9% end with one, a yellow I almost certainly belongs to the middle three slots. That alone removes two positions from consideration — more than most yellows manage.",
    "Test the second slot first. The list below shows I in position two about 36% of the time, ahead of the third and fourth slots. Many of these are consonant-I-consonant cores (FIRST, LIGHT, MIGHT, WHICH), so a green consonant in slot one plus a yellow I strongly points to position two.",
    "Keep double I and Y-swaps in mind. A handful of words carry two I's — SKIING is the classic, plus CIVIC, CIVIL and ICILY — and I often trades places with a final Y (PRIVY vs a middle I). A single yellow I never rules out a repeat, so it is worth a look when a middle gap resists.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter I?", answer: "There are {N} valid five-letter words with an I in the Wordle dictionary, and {COMMON} of them are common answer-pool words. I is one of the most frequent vowels in the answer pool." },
    { question: "What is the best Wordle word with I in it?", answer: "IRATE and ARISE are the strongest — each tests five distinct letters and covers three vowels. ALIEN and CAIRN are good alternatives that place the I in the common interior slots." },
    { question: "Where does the letter I usually go in a 5-letter word?", answer: "In the middle. Only about 4% of five-letter words start with I and 9% end with one, while the second slot alone holds roughly 36%. So a yellow I almost always belongs to slots two, three or four — test position two first." },
    { question: "How many words with I have been Wordle answers?", answer: "{ANSWERED} five-letter words containing I have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two I's?", answer: "SKIING is the famous one, along with CIVIC, CIVIL, ICILY, ILIAC and DIGIT-style cores. A single yellow I never rules out a second I, so a repeat is worth testing when two interior gaps look vowel-shaped." },
    { question: "Do many 5-letter words end in I?", answer: "Very few — about 9% — and most are loanwords or names (ALIBI, SALMI, SWAMI). If your I is not green at the end, it almost certainly belongs in the middle, so focus your guesses on slots two through four." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
