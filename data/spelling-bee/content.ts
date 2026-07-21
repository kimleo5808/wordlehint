/**
 * Static copy for /spelling-bee-answers.
 * Daily values (words, pangrams, scores, ranks) come from
 * lib/spelling-bee-daily.ts — keep this file free of puzzle-specific data.
 *
 * Copy budget: ≥1,500 words of body content, "spelling bee answers" family
 * held at 1–3% density, spread across H2/H3/H4 sections.
 */

import type { RelatedTool } from "@/data/wordle-answers/content";

export const PAGE_META = {
  titleBase: "NYT Spelling Bee Answers Today - Pangram & All Words",
  descriptionBase:
    "Today's NYT Spelling Bee answers, updated daily at 3 AM ET: every word, the pangram, total points, and the Genius score cutoff. Spoiler-safe reveal.",
  keywords: [
    "spelling bee answers today",
    "nyt spelling bee answers",
    "spelling bee answers",
    "spelling bee pangram today",
    "spelling bee genius score",
    "todays spelling bee",
    "spelling bee solutions",
  ],
};

/** Quotable, <50-word definition block (GEO target for LLM citations). */
export const SPELLING_BEE_DEFINITION =
  "NYT Spelling Bee is a daily word game from The New York Times. You build words from seven letters arranged in a honeycomb; every word must be at least four letters long and include the center letter. Finding every word earns the Queen Bee title.";

export const PANGRAM_DEFINITION =
  "A pangram is a Spelling Bee word that uses all seven of the day's letters at least once. Every puzzle has at least one, and it's worth its letter count plus a seven-point bonus — always the most valuable find of the day.";

export const SECTIONS = {
  hero: {
    badge: "Spoiler-safe · updated daily at 3 AM ET",
    intro:
      "Looking for today's Spelling Bee answers? You're in the right place. Below you'll find the complete word list for today's NYT Spelling Bee, the pangram, the full point breakdown, and exactly how many points you need to reach Genius. Everything stays blurred until you choose to reveal it, so you can peek at just the numbers without spoiling your solve.",
  },
  pangram: {
    heading: "Today's Spelling Bee Pangram",
    intro:
      "The pangram is the key that unlocks a big score — it uses every one of today's seven letters and carries a seven-point bonus on top of its length. If you only want one nudge before going back to the honeycomb, make it this one. Reveal it below when you're ready.",
  },
  answers: {
    heading: "All Spelling Bee Answers for Today",
    intro:
      "Here is the complete list of Spelling Bee answers for today's puzzle, grouped by word length with the longest words first. Each card shows the word's point value, and pangrams are highlighted in gold. Reveal one length group at a time if you just need a hint, or open everything at once if you're finishing your grid.",
  },
  genius: {
    heading: "Today's Genius Score & Rank Table",
    subQuestion: "How Many Points Do You Need for Genius Today?",
    subAnswer:
      "Genius always sits at 70 percent of the day's maximum score, so the exact number changes with every puzzle. Today's cutoff is calculated from the full answer list below — hit that score and the game hands you the Genius rank, no pangram required (though it's very hard to get there without one).",
    tableHeading: "Full Rank Table (Beginner → Queen Bee)",
    tableIntro:
      "Every rank in Spelling Bee is a fixed percentage of the puzzle's total available points. Because today's total is unique to today's word list, here is the exact score you need for each rank right now:",
  },
  yesterday: {
    heading: "Yesterday's Spelling Bee Answers",
    intro:
      "Missed a day or want to check what that impossible word was? Here are yesterday's Spelling Bee answers in full — no spoiler curtain needed, since that puzzle is closed.",
  },
  scoring: {
    heading: "How Spelling Bee Scoring Works",
    body: [
      "Spelling Bee's scoring system is simple on the surface and sneaky in practice. Four-letter words — the minimum length — are worth exactly one point each, no matter how clever they feel. From five letters up, a word is worth its full letter count: five points for a five-letter word, six for six, and so on. That means one eight-letter find outscores an entire run of four-letter words, which is why strong players chase length instead of volume.",
      "The pangram changes the math completely. Because it uses all seven letters, it earns its letter count plus a seven-point bonus — a seven-letter pangram banks fourteen points in one move. On days with more than one pangram, each one carries its own bonus, and finding them all is usually the difference between stalling at Amazing and cruising past the Genius line.",
    ],
    lengthTable: {
      heading: "Word Length & Point Values",
      headers: ["Word length", "Points"],
      rows: [
        ["4 letters", "1 point"],
        ["5 letters", "5 points"],
        ["6 letters", "6 points"],
        ["7 letters", "7 points"],
        ["8+ letters", "1 point per letter"],
        ["Pangram", "Letter count + 7 bonus"],
      ],
    },
    pangramHeading: "What Is a Pangram?",
    bingoHeading: "What Counts as Bingo?",
    bingoBody:
      "Bingo is an unofficial badge tracked by dedicated players: a puzzle is a 'bingo' when every one of the seven letters starts at least one word in the answer list. It doesn't earn extra points, but it tells you something useful mid-solve — on a bingo day, if a letter hasn't started any of your words yet, you know you're still missing something.",
  },
  strategy: {
    heading: "How to Get Better at Spelling Bee",
    intro:
      "Checking the Spelling Bee answers after a tough day is how most players improve — you start to see the patterns the puzzle leans on. Here are the habits that consistently push scores toward Genius.",
    tips: [
      {
        heading: "Start With Common Prefixes and Suffixes",
        body: "The fastest way to stretch one found word into four is to work its edges. Found 'tool'? Try 'toolin', 'tooling', 'retool'. Endings like -ING, -ED, -ER, -ION and openers like RE-, UN-, OUT- are the workhorses of high scores. Whenever the day's letters include I, N and G together, systematically re-check every verb you've already entered — the -ING form is usually valid and worth three more points than the base word.",
      },
      {
        heading: "Hunt the Pangram First",
        body: "Instead of grinding four-letter words early, spend your first minutes staring at all seven letters and trying to feel out the pangram. It's the single biggest score in the puzzle, and finding it early has a second benefit: pangrams are usually everyday words, and their fragments often point you toward a whole family of shorter answers you'd otherwise miss.",
      },
      {
        heading: "Letters You'll Never See",
        body: "The honeycomb is curated, and knowing what the editor excludes is genuinely useful mid-solve.",
        sub: [
          {
            heading: 'Why There\'s No Letter "S" in Spelling Bee',
            body: "The letter S never appears in the honeycomb. The reason is scoring inflation: with an S available, nearly every word could be pluralized for easy extra points, and the puzzle would become a chore of typing the same words twice. No S also means you can stop trying plurals entirely — if your instinct says add an S, redirect that energy to -ED or -ING instead.",
          },
          {
            heading: "Words the Dictionary Allows but NYT Rejects",
            body: "Spelling Bee uses its own curated word list, not a full dictionary. Obscure crossword staples, most proper nouns, hyphenated terms, and words the editor judges too specialized are quietly excluded — which is why a word your dictionary swears by sometimes bounces. If a rejected word feels unfair, check our answer list for the day; if it's not there, it was never in the puzzle's list to begin with.",
          },
        ],
      },
    ],
  },
  whatIs: {
    heading: "What Is NYT Spelling Bee?",
    body: [
      "Spelling Bee has been the New York Times' slow-burn daily obsession since it moved online in 2018 — older than Wordle, and for many players even harder to put down. Each day at 3 AM Eastern, a new honeycomb of seven letters appears: one center letter surrounded by six others. Every valid word must be at least four letters long, must use the center letter, and can repeat letters as often as it likes.",
      "What makes the game compulsive is that it never tells you when you're done. The word list runs from obvious four-letter starters to obscure gems, and the rank ladder — Beginner up through Genius and the elusive Queen Bee — keeps score of how deep you've dug. That's also why a daily answer page earns its keep: some days the last few words are simply unfindable without help, and checking the Spelling Bee solutions beats abandoning a streak.",
      "It also pairs naturally with the rest of the NYT daily lineup. Plenty of players run the same morning circuit — Wordle first, then Connections, then the honeycomb — and the skills feed each other: letter-frequency instincts from one game sharpen your eye in the next. If you're building that habit, our daily hint pages for each puzzle are designed to rescue a stuck run without ruining the fun of finishing it yourself.",
    ],
  },
};

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What time do new Spelling Bee answers come out?",
    answer:
      "The NYT releases each new Spelling Bee puzzle at 3:00 AM Eastern Time, and our answer list updates automatically right after. If you're seeing yesterday's words, the new puzzle likely just rolled over — refresh in a few minutes.",
  },
  {
    question: "How many points do you need for Genius?",
    answer:
      "Genius is always 70% of the day's maximum possible score, so it changes daily. Today's exact Genius cutoff is shown in the rank table above, calculated from the full answer list.",
  },
  {
    question: "What is today's pangram?",
    answer:
      "Today's pangram is listed at the top of this page behind a spoiler curtain — jump to the pangram section and tap reveal. Every Spelling Bee puzzle has at least one pangram, and some days have two or more.",
  },
  {
    question: "Is this site affiliated with the New York Times?",
    answer:
      "No. WordleHint is an independent fan-made resource and is not affiliated with, endorsed by, or connected to The New York Times. We publish daily solutions and hints for NYT word games, including Wordle, Connections, Strands, and Spelling Bee.",
  },
  {
    question: "Can I see past Spelling Bee answers?",
    answer:
      "Yes — our archive keeps the complete Spelling Bee answers for every previous puzzle, including each day's pangram and point totals. Follow the recent answers links on this page to browse by date.",
  },
  {
    question: "Why doesn't Spelling Bee accept my word?",
    answer:
      "Spelling Bee uses a curated word list rather than a complete dictionary. Proper nouns, hyphenated words, and terms the editors consider too obscure are excluded — so a legitimate dictionary word can still be rejected. If a word isn't in our daily list, it isn't in the puzzle's list either.",
  },
  {
    question: "What does Queen Bee mean?",
    answer:
      "Queen Bee is the hidden rank above Genius, awarded for finding every single word in the day's puzzle — a perfect score. The game only shows ranks up to Genius; Queen Bee is the completionist's badge, and our full word list is the reliable way to close out those last few words.",
  },
  {
    question: "Does Spelling Bee ever use the letter S?",
    answer:
      "No — the letter S never appears in Spelling Bee's honeycomb. The editors exclude it to prevent easy plural points, which would inflate every score. The letters X, Z, J and Q are rare but do appear occasionally.",
  },
];

export const RELATED_GAMES: RelatedTool[] = [
  {
    title: "Today's Wordle Hint",
    description:
      "Five progressive clues for today's Wordle — solve it without spoilers.",
    href: "/wordle-hint-today",
  },
  {
    title: "Connections Hint Today",
    description:
      "Step-by-step help for today's NYT Connections, one color group at a time.",
    href: "/connections-hint-today",
  },
  {
    title: "Strands Hint Today",
    description:
      "Theme clue, spangram help, and full answers for today's NYT Strands.",
    href: "/strands-hint-today",
  },
  {
    title: "Wordle Unlimited",
    description: "Play endless Wordle games from 4 to 11 letters, no daily limit.",
    href: "/wordle-unlimited",
  },
];
