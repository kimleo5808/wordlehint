import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-a (contains A).
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 *
 * A is the most common letter to *contain* in five-letter Wordle words, so this
 * page leans into the "yellow A" case: A is almost always in the answer, the
 * only question is which slot — and the position data below is the real value.
 */
export const content: LetterContent = {
  letter: "A",
  path: "/5-letter-words/with-a",
  lastUpdated: "2026-07-11",
  topOpener: "AROSE",
  heroSubhead:
    "Every five-letter word that contains A, sorted for Wordle — the common answer words first, mapped by where the A sits, with past answers flagged and the best words to pin down a yellow A.",
  introExtra:
    "A is the single most common letter inside five-letter Wordle answers, which cuts both ways. It means a yellow A tells you less than most yellows — roughly two in five answer-pool words contain an A — but it also means nailing the A's position is often what wins the board. The data below shows A lands in the second slot far more than anywhere else (think SLATE, CRANE, BEACH), so when your A comes back yellow from a first-slot guess, the second position is the smart place to test it next.",
  openersIntro:
    "Because A is so frequent and pairs with every vowel and most consonants, you have genuinely strong options here. The picks below all use five distinct, high-frequency letters and place the A in different slots, so you can both test A and map the rest of the board in one guess.",
  openers: [
    { word: "AROSE", tests: "A · R · O · S · E", why: "Five distinct letters covering three vowels (A, O, E) plus the ultra-common R and S — one of the very best opening words in Wordle, and it leads with A.", best: true },
    { word: "ARISE", tests: "A · R · I · S · E", why: "The same elite letter set as AROSE with I instead of O — an equally strong opener that tests A, I and E at once." },
    { word: "SLATE", tests: "S · L · A · T · E", why: "A top-tier opener that parks the A in the second slot — useful for immediately confirming A's most likely position." },
    { word: "TRACE", tests: "T · R · A · C · E", why: "Puts A in the middle while testing T, R, C and E — a strong all-rounder if you want the A in slot three." },
    { word: "AUDIO", tests: "A · U · D · I · O", why: "Four vowels including A — a niche opener that rules vowels in or out fast, though it skips high-value consonants." },
  ],
  strategyParagraphs: [
    "Start by remembering that a yellow A is weak information on its own. A appears in roughly two of every five answer-pool words, so it rarely narrows the field the way a yellow J or V would. Don't over-value it — keep testing fresh consonants rather than burning a guess just to relocate the A.",
    "Then lean on position. The list below shows A sitting in the second slot about 38% of the time — more than the first, third, fourth and fifth slots combined in most letter neighbourhoods. If a first-slot A came back yellow, try it in position two before anywhere else; if that fails, the third and fourth slots are the next most likely.",
    "Finally, watch for double A. Words like ABACK, LLAMA, DRAMA and SALSA hide a second A, and a single yellow A never rules that out. When your greens and grays leave an odd gap, testing a repeated A is often the move most players miss.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter A?", answer: "There are {N} valid five-letter words with an A in the Wordle dictionary, and {COMMON} of them are common answer-pool words. A is the most frequently contained letter in five-letter words, which is why the list is so long." },
    { question: "What is the best Wordle word with A in it?", answer: "AROSE is the strongest — it tests five distinct, high-frequency letters (A, R, O, S, E) and leads with A. ARISE is an equally good alternative, and SLATE is the best pick if you want to confirm A in the common second slot." },
    { question: "Where does the letter A usually go in a 5-letter word?", answer: "A lands in the second position most often — about 38% of five-letter words with an A place it there (SLATE, CRANE, BOARD). The third and fourth slots are next, while a first- or last-letter A is comparatively rare. So when an A comes back yellow, test the second slot first." },
    { question: "How many words with A have been Wordle answers?", answer: "{ANSWERED} five-letter words containing A have appeared as official Wordle answers in the puzzles we track — by far the most of any letter, since A is so common. Because the NYT almost never repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have two A's?", answer: "Plenty — ABACK, ALARM, DRAMA, LLAMA, SALSA, PLAZA and AWARD among them. A single yellow A never rules out a second A, so if your other letters leave a gap, testing a double A is a commonly missed solving move." },
    { question: "What are good 5-letter words with A and lots of vowels?", answer: "AUDIO, AROSE, ADIEU and OUIJA each combine A with two or three other vowels, making them handy for mapping the answer's vowel skeleton early — though vowel-heavy words test fewer consonants." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
