import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-f (contains F).
 * F is strongly first-slot (52%), with FL/FR blends and -FT/-FF endings.
 */
export const content: LetterContent = {
  letter: "F",
  path: "/5-letter-words/with-f",
  lastUpdated: "2026-07-11",
  topOpener: "FALSE",
  heroSubhead:
    "Every five-letter word that contains F, sorted for Wordle — the common answer words first, mapped by where the F sits, with past answers flagged and the best words to pin down a yellow F.",
  introExtra:
    "F is a front-loaded consonant. The data below shows it opening the word about 52% of the time through hard-F starts (FANCY, FORGE) and the FL and FR blends (FLAME, FROWN), while almost never landing in the second slot (around 3%). When F is not at the front it usually appears in the -FT ending (CRAFT, DRIFT) or a double -FF (BLUFF, SCOFF). So a yellow F points strongly to the first slot, with those two clusters accounting for most of the rest.",
  openersIntro:
    "F blends with L and R and pairs cleanly with vowels. The picks below use five distinct, high-frequency letters, most leading with the F.",
  openers: [
    { word: "FALSE", tests: "F · A · L · S · E", why: "Leads with a first-slot F while testing A, L, S and E — five distinct, high-frequency letters and a strong opener.", best: true },
    { word: "FAINT", tests: "F · A · I · N · T", why: "Another front-F opener covering A, I, N and T — good vowel-plus-consonant coverage." },
    { word: "FLARE", tests: "F · L · A · R · E", why: "Opens on an FL- blend testing F, L, A, R and E — useful for a front-F-plus-blend read." },
    { word: "CRAFT", tests: "C · R · A · F · T", why: "Ends in -FT, probing a fourth-slot F with C, R, A and T." },
    { word: "AFTER", tests: "A · F · T · E · R", why: "Places the F in the second slot with A, T, E and R — handy if the F is not first." },
  ],
  strategyParagraphs: [
    "Try the first slot first. F opens the word about 52% of the time, so a yellow F that came from a middle guess is very often just displaced from position one. Slide it to the front and look for a hard-F start or an FL/FR blend.",
    "Read the FL and FR blends. When F is not standing alone at the front, it usually blends: FL (FLAME, FLINT, FLOOD) and FR (FRAME, FRESH, FROWN). A green vowel in slot two after a yellow F strongly suggests one of these openings.",
    "Check the -FT and -FF clusters. The main back-of-word F patterns are -FT (CRAFT, DRIFT, SHIFT) and the double -FF (BLUFF, SCOFF, STIFF, SNIFF). Both are easy to overlook because F so rarely sits second, and a single yellow F never rules a double out.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter F?", answer: "There are {N} valid five-letter words with an F in the Wordle dictionary, and {COMMON} of them are common answer-pool words. F is a less common consonant, which keeps the list short." },
    { question: "What is the best Wordle word with F in it?", answer: "FALSE and FAINT are the strongest — both lead with a front F while testing four other frequent letters. FLARE is great for probing an FL- blend, and CRAFT for a final -FT." },
    { question: "Where does the letter F usually go in a 5-letter word?", answer: "The first slot, by a wide margin — about 52% of five-letter words with an F start with it (FANCY, FLAME, FROWN), while barely 3% put it second. So when an F comes back yellow from a middle guess, test the first position first." },
    { question: "How many words with F have been Wordle answers?", answer: "{ANSWERED} five-letter words containing F have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words end in F or FF?", answer: "The -FT ending is common (CRAFT, DRIFT, SHIFT, ALOFT), and a set of words end in a double -FF: BLUFF, SCOFF, STIFF, SNIFF, GRUFF. If your F is yellow and not at the front, one of these clusters is likely." },
    { question: "What 5-letter words start with an F blend?", answer: "The FL and FR blends are everywhere: FLAME, FLINT, FLOOD, FLUTE (FL) and FRAME, FRESH, FROWN, FRUIT (FR). If you have a green vowel after a yellow F, a second-slot F inside one of these blends is a high-value test." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
