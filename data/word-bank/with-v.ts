import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-v (contains V).
 * V splits between slot one (35%) and slot three (35%) and essentially never
 * ends the word (1%) — English adds a silent E. The "never last" fact is the hook.
 */
export const content: LetterContent = {
  letter: "V",
  path: "/5-letter-words/with-v",
  lastUpdated: "2026-07-11",
  topOpener: "CRAVE",
  heroSubhead:
    "Every five-letter word that contains V, sorted for Wordle — the common answer words first, mapped by where the V sits, with past answers flagged and the best words to pin down a yellow V.",
  introExtra:
    "V has one iron rule: it almost never ends a word. The data below shows it splitting between the first slot (about 35%) and the third (35%), while the last slot is essentially empty (around 1%) — because English spelling always follows a final V with a silent E (BRAVE, DRIVE, MOVE). Front V's are hard-V starts (VIGOR, VOTER), and third-slot V's sit in a consonant-V-E core (CARVE, PROVE, CLOVE). So a yellow V belongs at the front or the middle, never the end.",
  openersIntro:
    "V pairs cleanly with vowels and a trailing E. The picks below use five distinct, high-frequency letters across the front and the consonant-V-E core.",
  openers: [
    { word: "CRAVE", tests: "C · R · A · V · E", why: "Places the V in the fourth slot of a -VE core while testing C, R, A and E — five distinct, high-frequency letters.", best: true },
    { word: "CARVE", tests: "C · A · R · V · E", why: "Another -VE core covering C, A, R and E — clean coverage with the V near the end." },
    { word: "COVER", tests: "C · O · V · E · R", why: "Puts the V in the third slot with C, O, E and R — a strong mid-V read." },
    { word: "VITAL", tests: "V · I · T · A · L", why: "Leads with a front V while testing I, T, A and L — good for a hard-V start." },
    { word: "OLIVE", tests: "O · L · I · V · E", why: "Three vowels plus L and V in a -VE core — strong vowel coverage." },
  ],
  strategyParagraphs: [
    "Rule out the last slot immediately. Barely 1% of five-letter words end in V, because the spelling convention adds a silent E (BRAVE, DRIVE, MOVE-style cores). So a yellow V essentially never belongs in position five — that alone removes a slot most letters cannot.",
    "Split front or middle. V lands in the first slot about 35% of the time and the third about 35%. Front V's are hard starts (VIGOR, VOTER, VAULT); third-slot V's sit in a consonant-V-E core (CARVE, PROVE, CLOVE, SERVE). Match the V to your placed letters to pick between the two.",
    "Expect a trailing E. Almost every non-initial V is followed by an E: -VE (BRAVE, GLOVE, SHOVE) or -VE- with the E just after. If you have a yellow V in the fourth slot and an E available, a -VE ending is nearly certain. True double-V words do not exist in the common pool, so a V never repeats.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter V?", answer: "There are {N} valid five-letter words with a V in the Wordle dictionary, and {COMMON} of them are common answer-pool words. V is one of the least common consonants in the answer pool." },
    { question: "What is the best Wordle word with V in it?", answer: "CRAVE and CARVE are the strongest — both test five distinct, high-frequency letters with the V in a -VE core. COVER is great for a third-slot V, and VITAL for a hard front V." },
    { question: "Where does the letter V usually go in a 5-letter word?", answer: "The first slot (about 35%) and the third (35%), and essentially never the last (around 1%). Because English follows a final V with a silent E, a yellow V belongs at the front or middle — never the end." },
    { question: "How many words with V have been Wordle answers?", answer: "{ANSWERED} five-letter words containing V have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "Do any 5-letter words end in V?", answer: "Almost none — barely 1%, and they are rare loanwords. English spelling adds a silent E after a final V (BRAVE, DRIVE, MOVE), so a yellow V should be tested at the front or in a mid-word -VE core, not the last slot." },
    { question: "What 5-letter words have V in a -VE ending?", answer: "Plenty: BRAVE, CARVE, CLOVE, DRIVE, GLOVE, PROVE, SERVE, SHOVE. If your V is yellow in the fourth slot and you have an E, a -VE ending is nearly certain." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
