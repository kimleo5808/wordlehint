import type { LetterContent } from "@/components/word-bank/LetterListPage";

/**
 * Wordle-first editorial content for /5-letter-words/starting-with-b.
 * {N}/{COMMON}/{ANSWERED} are filled at render from lib/word-bank.
 */
export const content: LetterContent = {
  letter: "B",
  path: "/5-letter-words/starting-with-b",
  lastUpdated: "2026-06-17",
  topOpener: "BEARD",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with B — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "B is not one of the top opening letters in Wordle, so most players reach this list after locking a green B in position one. When that happens, the fastest path to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "If you want to lead with a B-word, the best picks balance two common vowels with a high-frequency consonant. These give you the most board coverage on a single guess.",
  openers: [
    { word: "BEARD", tests: "B · E · A · R · D", why: "Tests the two most common vowels (E, A) plus the high-value R — the strongest all-round B opener.", best: true },
    { word: "BRACE", tests: "B · R · A · C · E", why: "Pairs R and C consonants with two top vowels; a balanced, reliable guess." },
    { word: "BLAME", tests: "B · L · A · M · E", why: "Covers the frequent L and M consonants alongside A and E." },
    { word: "BLADE", tests: "B · L · A · D · E", why: "Similar to BLAME but swaps in D — handy as a second guess." },
    { word: "BRINE", tests: "B · R · I · N · E", why: "Tests I and E plus R and N when you need a different vowel pair." },
    { word: "BORNE", tests: "B · O · R · N · E", why: "Good for probing O and N while still covering R and E." },
    { word: "BAYOU", tests: "B · A · Y · O · U", why: "Vowel-heavy: tests A, O and U in one guess to map the vowels fast." },
  ],
  strategyParagraphs: [
    "Because B rarely makes the best opener, you will usually land here with a confirmed green B. Spend your next guess on the vowel — most five-letter B words carry their first vowel in position two.",
    "Watch the B blends. BL and BR are dense families, but B is also followed directly by every vowel — BA, BE, BI, BO and BU all have plenty of words. A gray second letter rules out a whole branch at once.",
    "Keep double letters in mind. B-words like BLOOD, BROOD and BERRY repeat a later letter, and the B _ _ _ E and B _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with B?", answer: "There are {N} five-letter words starting with B in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with B?", answer: "BEARD is the strongest B opener: it tests B, E, A, R and D, covering two top vowels and the high-value R. BRACE and BLAME are close alternatives. Note that A- or S-words are statistically stronger as a very first guess — B-words shine once you have confirmed the first letter." },
    { question: "Which 5-letter words starting with B have been Wordle answers?", answer: "{ANSWERED} B-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter B words with lots of vowels?", answer: "BAYOU, BEACH, BORNE and BROIL each pack two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with B and end with E?", answer: "Common ones include BLADE, BRACE, BRINE, BLAME, BADGE and BOOZE. The B _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter B words that work well in hard mode?", answer: "Yes. Consonant-rich words like BLURT, BLUNT, BRISK and BLIMP help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
