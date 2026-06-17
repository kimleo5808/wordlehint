import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "H",
  path: "/5-letter-words/starting-with-h",
  lastUpdated: "2026-06-17",
  topOpener: "HEART",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with H — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "H is an uncommon opening letter in Wordle, so most players reach this list after locking a green H in position one. When that happens, the quickest route to the answer is pinning the vowel — and the words below are sorted to help you do exactly that.",
  openersIntro:
    "If you want to lead with an H-word, the best picks combine two common vowels with high-frequency consonants like R and T. These give you the most board coverage on a single guess.",
  openers: [
    { word: "HEART", tests: "H · E · A · R · T", why: "Tests E and A with the high-value R and T — the strongest all-round H opener.", best: true },
    { word: "HEARD", tests: "H · E · A · R · D", why: "Swaps T for D; equally strong coverage of E, A and R." },
    { word: "HOUSE", tests: "H · O · U · S · E", why: "Tests three vowels (O, U, E) plus the high-value S." },
    { word: "HOIST", tests: "H · O · I · S · T", why: "Covers the O/I vowel pair with the common S and T." },
    { word: "HARDY", tests: "H · A · R · D · Y", why: "Probes A, R, D and Y together." },
    { word: "HONEY", tests: "H · O · N · E · Y", why: "Tests O, N, E and Y — a useful mix." },
    { word: "HAUNT", tests: "H · A · U · N · T", why: "Good for testing A, U, N and T in one guess." },
  ],
  strategyParagraphs: [
    "Because H rarely makes the best opener, you will usually land here with a confirmed green H. Spend your next guess on the vowel — almost every five-letter H word carries its first vowel in position two.",
    "H is followed directly by a vowel in the vast majority of words (HA, HE, HI, HO, HU), so nailing that second letter splits the field quickly. The main exception is the HY- family (HYMN, HYENA).",
    "Keep double letters and endings in mind. Words like HAPPY, HOBBY and HELLO repeat a later letter, and the H _ _ _ E and H _ _ _ Y patterns are both common shapes among Wordle answers.",
  ],
  faq: [
    { question: "How many 5-letter words start with H?", answer: "There are {N} five-letter words starting with H in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with H?", answer: "HEART is the strongest H opener: it tests H, E, A, R and T, covering two top vowels and two frequent consonants. HEARD and HOUSE are close alternatives. Note that A- or S-words are statistically stronger as a very first guess — H-words shine once you have confirmed the first letter." },
    { question: "Which 5-letter words starting with H have been Wordle answers?", answer: "{ANSWERED} H-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter H words with lots of vowels?", answer: "HOUSE, HOIST, HOUND and HEAVE each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with H and end with E?", answer: "Common ones include HORSE, HOUSE, HINGE, HEDGE, HOVEL and HAUTE. The H _ _ _ E pattern is a frequent shape among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter H words that work well in hard mode?", answer: "Yes. Consonant-rich words like HURRY, HUTCH, HYMNS and HUNCH help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
