import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-o (contains O).
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * O is strongly second-slot (46%) — the classic C-O-consonant vowel core
 * (HORSE, MOUTH, ROBOT). The page's angle: a yellow O almost always wants
 * position two, and OO pairs are the common trap.
 */
export const content: LetterContent = {
  letter: "O",
  path: "/5-letter-words/with-o",
  lastUpdated: "2026-07-11",
  topOpener: "ATONE",
  heroSubhead:
    "Every five-letter word that contains O, sorted for Wordle — the common answer words first, mapped by where the O sits, with past answers flagged and the best words to pin down a yellow O.",
  introExtra:
    "O is a heavily positional vowel, and that makes a yellow O unusually informative. The data below shows O landing in the second slot about 46% of the time — nearly half — because so many five-letter words are built on a consonant-O-consonant core (HORSE, MOUTH, ROBOT, WORLD). After that the third slot is a distant second. So the moment an O comes back yellow, the second position is overwhelmingly the place to test it, and you can often solve the vowel skeleton in a single follow-up.",
  openersIntro:
    "O pairs cleanly with common consonants, so you have solid openers. The picks below use five distinct, high-frequency letters and place the O in different slots so you can test it while covering the board.",
  openers: [
    { word: "ATONE", tests: "A · T · O · N · E", why: "Covers three vowels (A, O, E) plus T and N with the O in the middle — a strong, well-rounded opener that contains O.", best: true },
    { word: "AROSE", tests: "A · R · O · S · E", why: "Three vowels plus R and S, with the O in the third slot — one of the best openers in the game." },
    { word: "STORE", tests: "S · T · O · R · E", why: "Places the O in the common second slot inside a classic C-O-C core, while testing S, T, R and E." },
    { word: "CLONE", tests: "C · L · O · N · E", why: "Another second-slot O with C, L, N and E — five distinct letters and a clean board read." },
    { word: "MOUTH", tests: "M · O · U · T · H", why: "Tests O and U together with M, T and H — useful for probing an O-U vowel pair early." },
  ],
  strategyParagraphs: [
    "Play the second slot almost reflexively. O is the most position-locked of the common vowels: about 46% of five-letter words with an O put it second, dwarfing every other slot. If a first-slot guess turns your O yellow, move it straight to position two before considering anything else — you will be right far more often than not.",
    "Read the consonant-O-consonant frame. Most second-slot O words follow a C-O-C skeleton: HORSE, MONEY, ROBOT, WORLD, TOWEL. Once the O is placed, the surrounding consonants usually collapse the answer to a small set, so spend your next guess testing fresh consonants around a fixed O.",
    "Watch for the OO pair. AFOOT, BLOOD, BLOOM, BOOST, MOODY, PROOF and SPOOL all double the O, and a single yellow O never rules that out. When your greens leave two adjacent vowel-shaped gaps, a double O is a frequently missed answer.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter O?", answer: "There are {N} valid five-letter words with an O in the Wordle dictionary, and {COMMON} of them are common answer-pool words. O is one of the most frequent vowels in the answer pool." },
    { question: "What is the best Wordle word with O in it?", answer: "ATONE and AROSE are the strongest — each tests three vowels plus two common consonants. STORE and CLONE are excellent if you want to probe the very common second-slot O directly." },
    { question: "Where does the letter O usually go in a 5-letter word?", answer: "The second slot, overwhelmingly — about 46% of five-letter words with an O place it there, inside a consonant-O-consonant core like HORSE or ROBOT. So when an O comes back yellow, test position two first; you will be right nearly half the time straight away." },
    { question: "How many words with O have been Wordle answers?", answer: "{ANSWERED} five-letter words containing O have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two O's?", answer: "AFOOT, BLOOD, BLOOM, BOOST, MOODY, PROOF and SPOOL among them. A single yellow O never rules out a second O, so a double O is worth testing when two adjacent gaps look vowel-shaped." },
    { question: "What are good 5-letter words with O and another vowel?", answer: "MOUTH, ADIEU-style AUDIO, HOUSE, NOISE and ROUSE combine O with a second vowel, helping you map the answer's vowel skeleton early once you suspect the second-slot O." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
