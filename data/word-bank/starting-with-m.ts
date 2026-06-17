import type { LetterContent } from "@/components/word-bank/LetterListPage";

export const content: LetterContent = {
  letter: "M",
  path: "/5-letter-words/starting-with-m",
  lastUpdated: "2026-06-17",
  topOpener: "MOIST",
  heroSubhead:
    "A complete, Wordle-ready list of five-letter words that start with M — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged.",
  introExtra:
    "M is a moderately common opening letter, and a well-chosen M-word makes a respectable opener or second guess. Whether you are choosing a first word or have locked a green M, the list below is sorted to get you to the answer fast.",
  openersIntro:
    "The best M openers pair M with two or three vowels and high-frequency consonants like S and T. These give you the most board coverage on a single guess.",
  openers: [
    { word: "MOIST", tests: "M · O · I · S · T", why: "Tests the O/I vowels plus the high-value S and T — the strongest all-round M opener.", best: true },
    { word: "MOUNT", tests: "M · O · U · N · T", why: "Covers O and U with the frequent N and T consonants." },
    { word: "MEDIA", tests: "M · E · D · I · A", why: "Three vowels (E, I, A) to map the vowel skeleton early." },
    { word: "MANOR", tests: "M · A · N · O · R", why: "Tests A and O with the high-value N and R." },
    { word: "METRO", tests: "M · E · T · R · O", why: "Covers E and O plus the frequent T and R." },
    { word: "MAYOR", tests: "M · A · Y · O · R", why: "Probes A, O, R and Y together." },
    { word: "MOURN", tests: "M · O · U · R · N", why: "Useful for testing O, U, R and N in one guess." },
  ],
  strategyParagraphs: [
    "M is a solid consonant, so an M-word works as an opener — but if you have already locked a green M, switch focus to the vowel and the consonant cluster around it.",
    "M is followed directly by a vowel in nearly every word (MA, ME, MI, MO, MU), so nailing that second letter splits the field quickly. Watch for a second M later in words like MAMMA and MUMMY.",
    "Keep double letters and endings in mind. The M _ _ _ E and M _ _ _ Y patterns are both common shapes among Wordle answers, and words like MOTTO and MERRY repeat a later letter.",
  ],
  faq: [
    { question: "How many 5-letter words start with M?", answer: "There are {N} five-letter words starting with M in the full Wordle dictionary of valid guesses. Of those, {COMMON} are common, everyday words from the official Wordle answer pool — the ones most likely to be a daily puzzle." },
    { question: "What is the best Wordle starting word beginning with M?", answer: "MOIST is the strongest M opener: it tests M, O, I, S and T, covering two vowels and two high-value consonants. MOUNT and MEDIA are excellent alternatives." },
    { question: "Which 5-letter words starting with M have been Wordle answers?", answer: "{ANSWERED} M-words have already appeared as official Wordle answers in the puzzles we track. Since the NYT almost never repeats a solution, those are lower-probability picks for today — see the full list in our answer archive." },
    { question: "What are good 5-letter M words with lots of vowels?", answer: "MEDIA, MOVIE, MAIZE and MOUSE each carry two or more vowels, which makes them efficient for narrowing the vowel positions early in a Wordle game." },
    { question: "What 5-letter words start with M and end with E?", answer: "Common ones include MOUSE, MAPLE, MOVIE, MERGE, MANGE and MAUVE. The M _ _ _ E pattern is one of the more frequent shapes among Wordle answers, so it is worth keeping in mind." },
    { question: "Are there 5-letter M words that work well in hard mode?", answer: "Yes. Consonant-rich words like MIRTH, MUSTY, MARSH and MULCH help you confirm awkward letters without wasting a guess, which matters more under hard-mode rules." },
    { question: "Where can I get today's Wordle hint?", answer: "Head to our Wordle hint today page for progressive clues that reveal as little or as much as you want, plus the confirmed answer once you are ready." },
  ],
};
