import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-h (contains H).
 * H is unusual: 30% second slot, 27% first, 21% last. The second-slot peak is
 * the digraph — CH, SH, TH, WH, PH. Digraphs are the hook.
 */
export const content: LetterContent = {
  letter: "H",
  path: "/5-letter-words/with-h",
  lastUpdated: "2026-07-11",
  topOpener: "CHASE",
  heroSubhead:
    "Every five-letter word that contains H, sorted for Wordle — the common answer words first, mapped by where the H sits, with past answers flagged and the best words to pin down a yellow H.",
  introExtra:
    "H behaves unlike any other consonant because it lives in digraphs. The data below shows it peaking in the second slot (about 30%) and the first (27%), with a solid tail in the last slot (21%). That second-slot spike is almost entirely CH, SH, TH, WH and PH — H hardly ever stands on its own. So the trick with a yellow H is to find its partner consonant: place a C, S, T, W or P and the H usually slots in right after it.",
  openersIntro:
    "H is only useful next to the right partner, so the best H openers lead with a digraph. The picks below use five distinct, high-frequency letters.",
  openers: [
    { word: "CHASE", tests: "C · H · A · S · E", why: "Opens on a CH- digraph while testing C, A, S and E — five distinct, high-frequency letters and a strong opener.", best: true },
    { word: "SHALE", tests: "S · H · A · L · E", why: "An SH- digraph opener covering S, A, L and E — clean coverage with the H in slot two." },
    { word: "CHART", tests: "C · H · A · R · T", why: "Another CH- opener testing C, A, R and T — good for a front-digraph read." },
    { word: "THREW", tests: "T · H · R · E · W", why: "A TH- digraph with T, R, E and W — five distinct letters, useful if you suspect a TH start." },
    { word: "ASHEN", tests: "A · S · H · E · N", why: "Places the H in the third slot inside a -SH- cluster with A, S, E and N." },
  ],
  strategyParagraphs: [
    "Find the H's partner. H almost never appears alone — it forms CH, SH, TH, WH or PH. So when an H turns yellow, the real question is which consonant it pairs with. If you have already placed a C, S, T, W or P, the H very likely sits right beside it.",
    "Lean on the second slot for opening digraphs. About 30% of H-words put the H second, nearly all as a consonant-H opening (CHAIR, SHINE, THUMB, WHALE, PHONE). A green first consonant plus a yellow H is a near-lock for a slot-two H.",
    "Don't forget the -SH and -TH endings, and double H. Words like BRUSH, CRASH, MARSH and BIRTH, TOOTH, WIDTH end in an H digraph, putting the H last. True double-H words are almost nonexistent, but the -SH-/-TH- clusters can bury an H mid-word (HARSH, HUTCH) — worth checking when a middle gap resists.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter H?", answer: "There are {N} valid five-letter words with an H in the Wordle dictionary, and {COMMON} of them are common answer-pool words. Most of them use H inside a digraph rather than alone." },
    { question: "What is the best Wordle word with H in it?", answer: "CHASE and SHALE are the strongest — both open on a digraph (CH, SH) while testing four other frequent letters. CHART and THREW are good alternatives for a front CH- or TH-." },
    { question: "Where does the letter H usually go in a 5-letter word?", answer: "The second slot most often (about 30%), then the first (27%) and last (21%). The second-slot peak is almost all opening digraphs — CH, SH, TH, WH, PH — so a yellow H usually sits right after a C, S, T, W or P." },
    { question: "How many words with H have been Wordle answers?", answer: "{ANSWERED} five-letter words containing H have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What digraphs use the letter H in Wordle?", answer: "Five carry the load: CH (CHAIR, BEACH), SH (SHINE, BRUSH), TH (THUMB, BIRTH), WH (WHALE, WHICH) and PH (PHONE, MORPH). Since H almost never stands alone, finding which partner it takes is the fastest way to place it." },
    { question: "What 5-letter words end in H?", answer: "Plenty of digraph endings — BRUSH, CRASH, MARSH (-SH); BIRTH, TOOTH, WIDTH (-TH); BEACH, COUCH (-CH); MORPH, GRAPH (-PH). If your H is yellow and not near the front, one of these endings is likely." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
