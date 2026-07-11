import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/with-c (contains C).
 * C is strongly first-slot (43%) and lives in CH/CL/CR blends and -CK/-CH/-CT
 * clusters. The front-loaded C and its clusters are the hook.
 */
export const content: LetterContent = {
  letter: "C",
  path: "/5-letter-words/with-c",
  lastUpdated: "2026-07-11",
  topOpener: "TRACE",
  heroSubhead:
    "Every five-letter word that contains C, sorted for Wordle — the common answer words first, mapped by where the C sits, with past answers flagged and the best words to pin down a yellow C.",
  introExtra:
    "C is a front-loaded consonant. The data below shows it opening the word about 43% of the time — more than any other slot combined in most neighbourhoods — because so many words start with a hard C or a C blend (CANDY, CHAIR, CLOUD, CRANE). After the first slot, C mostly turns up in clusters: CH and CK (BEACH, TRUCK), and the endings -CT and -CE. So a yellow C from a non-first guess is a strong hint that the C belongs right at the front.",
  openersIntro:
    "C anchors several of the best opening words in Wordle. The picks below use five distinct, high-frequency letters, most of them putting the C exactly where it likes to be — the front.",
  openers: [
    { word: "TRACE", tests: "T · R · A · C · E", why: "Tests T, R, A and E around a fourth-slot C — five distinct letters and one of the strongest openers in the game.", best: true },
    { word: "CRANE", tests: "C · R · A · N · E", why: "Leads with a CR- blend, testing a first-slot C alongside R, A, N and E." },
    { word: "CLEAT", tests: "C · L · E · A · T", why: "A CL- opening blend covering C, L, E, A and T — great for a front-C read." },
    { word: "SCANT", tests: "S · C · A · N · T", why: "Places the C in the second slot inside an SC- cluster with S, A, N and T." },
    { word: "CATER", tests: "C · A · T · E · R", why: "Another front-C opener testing A, T, E and R — five distinct, high-value letters." },
  ],
  strategyParagraphs: [
    "Try the first slot before anything else. C opens the word about 43% of the time, so a yellow C that came from the middle or end is very often just misplaced from position one. Slide it to the front and look for a hard-C or C-blend start.",
    "Read the C clusters. When C is not first, it usually appears in a pair: CH (BEACH, CHESS, LUNCH), CK (STICK, TRUCK) or the endings -CT and -CE (ELECT, DANCE, VOICE). If you already have a partner letter placed, the C is almost certainly beside it.",
    "Don't force a C where a K would go, and watch double C. C and K compete for the same hard sound, so confirm the C rather than assuming it. True double-C words are rare but real (CACAO, YUCCA), and clusters like -TCH (CATCH, WITCH) hide the C mid-word — a single yellow C never rules those out.",
  ],
  faq: [
    { question: "How many 5-letter words contain the letter C?", answer: "There are {N} valid five-letter words with a C in the Wordle dictionary, and {COMMON} of them are common answer-pool words. C is a moderately common consonant in the answer pool." },
    { question: "What is the best Wordle word with C in it?", answer: "TRACE and CRANE are the strongest — both test five distinct, high-frequency letters, with CRANE leading on a CR- blend. CLEAT and CATER are excellent alternatives that put the C at the front." },
    { question: "Where does the letter C usually go in a 5-letter word?", answer: "The first slot, by a wide margin — about 43% of five-letter words with a C start with it (CANDY, CHAIR, CRANE). So when a C comes back yellow from a middle guess, test the first position first." },
    { question: "How many words with C have been Wordle answers?", answer: "{ANSWERED} five-letter words containing C have appeared as official Wordle answers in the puzzles we track. Because the NYT rarely repeats a solution, those specific words are lower-probability picks for today." },
    { question: "What 5-letter words have the CH or CK cluster?", answer: "CH is everywhere — BEACH, CHAIR, LUNCH, WHICH — and CK closes many words: STICK, TRUCK, BLOCK, QUICK. If your C is yellow and not at the front, one of these clusters is the likely home." },
    { question: "What 5-letter words have two C's?", answer: "Only a few — CACAO, YUCCA and clocking cores — plus the -TCH cluster in CATCH, HITCH and WITCH that buries a C mid-word. A single yellow C never rules out a second C." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
