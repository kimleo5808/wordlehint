import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-b (contains B).
 * B is strongly first-slot (54%) and rarely second (6%) or last (4%).
 * "B almost always opens the word" is the hook.
 */
export const content: LetterContent = {
  letter: "B",
  path: "/5-letter-words/with-b",
  lastUpdated: "2026-07-11",
  topOpener: "BEAST",
  heroSubhead:
    "Every five-letter word that contains B, sorted for Wordle — the common answer words first, mapped by where the B sits, with past answers flagged and the best words to pin down a yellow B.",
  introExtra:
    "B is one of the most front-loaded letters in Wordle. The data below shows it opening the word about 54% of the time — more than every other slot combined — and almost never landing in the second slot (around 6%) or last (4%). So a yellow B is unusually easy to place: if it did not come from your first guess's opening letter, the front of the word is overwhelmingly its home. The main exceptions are the BL and BR blends and a small set of -MB endings (CLIMB, THUMB).",
  openersIntro:
    "B pairs cleanly with vowels and the L/R blends. The picks below use five distinct, high-frequency letters, most of them leading with the B where it likes to be.",
  openers: [
    { word: "BEAST", tests: "B · E · A · S · T", why: "Leads with a first-slot B while testing E, A, S and T — five distinct, high-frequency letters and a strong opener.", best: true },
    { word: "BATON", tests: "B · A · T · O · N", why: "Another front-B opener covering A, T, O and N — a clean board read." },
    { word: "BLADE", tests: "B · L · A · D · E", why: "Opens on a BL- blend testing B, L, A, D and E — useful for a front-B-plus-blend read." },
    { word: "BRACE", tests: "B · R · A · C · E", why: "A BR- opening blend with B, R, A, C and E — five distinct letters and good coverage." },
    { word: "ABODE", tests: "A · B · O · D · E", why: "Places the B in the second slot with three vowels plus D — handy if the B is not first." },
  ],
  strategyParagraphs: [
    "Try the first slot before anything else. B opens the word more than half the time, so a yellow B that came from a middle or end guess is very often just displaced from position one. Slide it to the front and look for a hard-B or B-blend start.",
    "Check the BL and BR blends. When B is not standing alone at the front, it usually blends: BL (BLACK, BLAME, BLOND) and BR (BRAVE, BREAD, BROWN). A green first consonant is unlikely to pair with B, but a green vowel in slot two after a yellow B strongly suggests one of these openings.",
    "Remember the rare -MB endings and double B. A handful of answers end in a silent -MB (CLIMB, THUMB, CRUMB), and a few double the B (ABBEY, BOBBY, HOBBY). Both are easy to overlook because B so rarely sits at the back — but a single yellow B never quite rules them out.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter B?", answer: "There are {N} valid five-letter words with a B in the Wordle dictionary, and {COMMON} of them are common answer-pool words. B is a less common consonant, which keeps the list shorter than the vowels." },
    { question: "What is the best Wordle word with B in it?", answer: "BEAST and BATON are the strongest — both lead with a front B while testing four other frequent letters. BLADE and BRACE are excellent if you want to probe a B blend." },
    { question: "Where does the letter B usually go in a 5-letter word?", answer: "The first slot, overwhelmingly — about 54% of five-letter words with a B start with it, while barely 6% put it second and 4% last. So when a B comes back yellow from a middle guess, test the first position first." },
    { question: "How many words with B have been Wordle answers?", answer: "{ANSWERED} five-letter words containing B have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in B?", answer: "Very few — mostly the silent -MB endings CLIMB, THUMB, CRUMB, PLUMB and BLURB. Because B almost never ends a word, a yellow B at the back is a strong signal you are looking at one of these rare -MB patterns." },
    { question: "What 5-letter words have two B's?", answer: "ABBEY, BOBBY, HOBBY, HUBBY and BRIBE-style cores among them. A single yellow B never rules out a second B, though double-B answers are uncommon." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
