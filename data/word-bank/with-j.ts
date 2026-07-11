import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-j (contains J).
 * J is the most front-locked letter: 66% first slot (JU-, JO-, JA-). Only ~27
 * common words. "A yellow J almost always opens the word" is the hook.
 */
export const content: LetterContent = {
  letter: "J",
  path: "/5-letter-words/with-j",
  lastUpdated: "2026-07-11",
  topOpener: "JOKER",
  heroSubhead:
    "Every five-letter word that contains J, sorted for Wordle — the common answer words first, mapped by where the J sits, with past answers flagged and the best words to pin down a yellow J.",
  introExtra:
    "J is the most front-locked letter in Wordle. The data below shows it opening the word about 66% of the time — two in three — through the JU-, JO- and JA- starts (JUICE, JOKER, JAUNT). When it is not first it usually sits in the second or third slot of a compact word (BANJO, ENJOY, MAJOR), and it essentially never ends a five-letter word. So a yellow J is one of the most decisive clues you can get: the first slot is overwhelmingly its home.",
  openersIntro:
    "There are only a handful of J-words, and almost all start with J. The picks below are the distinct-letter options that test the J at the front.",
  openers: [
    { word: "JOKER", tests: "J · O · K · E · R", why: "Leads with a first-slot J while testing O, K, E and R — five distinct, high-frequency letters and the best J opener.", best: true },
    { word: "JUICE", tests: "J · U · I · C · E", why: "A front-J start covering three vowels plus C — strong vowel coverage in a JU- word." },
    { word: "JAUNT", tests: "J · A · U · N · T", why: "Another front J with A, U, N and T — good spread for a JA- start." },
    { word: "MAJOR", tests: "M · A · J · O · R", why: "Places the J in the third slot with M, A, O and R — a rare non-initial J read." },
    { word: "ENJOY", tests: "E · N · J · O · Y", why: "Puts the J in the third slot with E, N, O and Y — useful if the J is not first." },
  ],
  strategyParagraphs: [
    "Play the first slot almost automatically. J opens the word about 66% of the time, so a yellow J that came from a middle guess is very nearly a green J waiting to happen. Test it in position one first and look for a JU-, JO- or JA- start.",
    "Match the vowel that follows. Every front J is followed by a vowel — usually U (JUICE, JUMBO), O (JOKER, JOINT) or A (JAUNT, JELLY-style JE-). If you have one of those vowels available, pairing it with a first-slot J usually cracks the word fast.",
    "Know the short non-initial set. The few J-words that do not start with J bury it in the middle: BANJO, ENJOY, MAJOR, RAJAH. There are no common words that end in J and none that double it, so once your J is yellow, the front — and failing that, the middle — is all you need to check.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter J?", answer: "There are {N} valid five-letter words with a J in the Wordle dictionary, but only {COMMON} are common answer-pool words — J is one of the rarest letters, so the everyday list is very short." },
    { question: "What is the best Wordle word with J in it?", answer: "JOKER is the strongest — it tests five distinct, high-frequency letters with the J at the front. JUICE and JAUNT are excellent alternatives, and MAJOR covers the rarer mid-word J." },
    { question: "Where does the letter J usually go in a 5-letter word?", answer: "The first slot, overwhelmingly — about 66% of five-letter words with a J start with it (JUICE, JOKER, JAUNT), and it essentially never ends the word. So when a J comes back yellow, test the first position first." },
    { question: "How many words with J have been Wordle answers?", answer: "Only {ANSWERED} five-letter words containing J have appeared as official Wordle answers in the puzzles we track — a tiny number that reflects how rare J is. Because the NYT rarely repeats a solution, they are low-probability picks for today." },
    { question: "What 5-letter words start with J?", answer: "Most J-words do: JUICE, JUMBO, JOKER, JOINT, JOLLY, JAUNT, JELLY, JEWEL. The J is almost always followed by U, O or A, so a first-slot J plus one of those vowels is the fastest read." },
    { question: "What 5-letter words have J in the middle?", answer: "A short list buries the J mid-word: BANJO, ENJOY, MAJOR, RAJAH. There are no common five-letter words that end in J, so if the J is not first, one of these middle-J words is your target." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
