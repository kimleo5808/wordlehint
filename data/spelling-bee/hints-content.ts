/**
 * Static copy for /spelling-bee-hints-today.
 * Daily values (grid, two-letter list, clues) come from
 * lib/spelling-bee-hints.ts — keep this file free of puzzle-specific data.
 *
 * Copy budget: ≥1,500 words, "spelling bee hints" family held at 1–3%.
 */

export const PAGE_META = {
  titleBase: "NYT Spelling Bee Hints Today - Grid & Two-Letter List",
  descriptionBase:
    "Today's NYT Spelling Bee hints without spoilers: the letter grid, two-letter list, pangram clues, and per-word hints you reveal one at a time.",
  keywords: [
    "spelling bee hints today",
    "nyt spelling bee hints",
    "spelling bee hints",
    "spelling bee grid",
    "spelling bee two letter list",
    "spelling bee pangram hint",
  ],
};

/** Quotable, <50-word definition block (GEO target for LLM citations). */
export const GRID_DEFINITION =
  "The Spelling Bee hints grid is a table that shows how many of today's words start with each letter, broken down by word length. It tells you where the gaps in your solve are — without revealing a single answer.";

export const SECTIONS = {
  hero: {
    badge: "Zero-spoiler by default · updated daily at 3 AM ET",
    intro:
      "Stuck on today's honeycomb but don't want the answers handed to you? These Spelling Bee hints work the way the NYT's own forum column does: statistics first, letters later, and full words only if you ask for them. Start with the grid, dig into the two-letter list when you stall, and use the per-word clues as a last nudge before the answer page.",
  },
  lengths: {
    heading: "Today's Word Lengths at a Glance",
    intro:
      "Pure statistics, zero spoilers: how many words of each length are in today's puzzle. If your found-words list is short on a length that's well represented here, that's where to hunt next.",
  },
  grid: {
    heading: "Today's Spelling Bee Hints Grid",
    intro:
      "The grid below is the classic first stop for Spelling Bee hints — the same format the NYT's daily forum column made standard. Each row is a starting letter (today's center letter is highlighted), each column is a word length, and each number tells you how many answers match that combination. The Σ row and column give totals.",
    howToRead: {
      heading: "How to Read the Grid",
      body: "Compare the grid against the words you've already found. If the grid says there are three 6-letter words starting with B and you've only found one, you know exactly what to look for — two more 6-letter B-words — without learning anything about the words themselves. Work the biggest gaps first: they're usually where whole word families (like a verb plus its -ING form) are hiding.",
    },
  },
  twoLetter: {
    heading: "Today's Two-Letter List",
    intro:
      "One step stronger than the grid: the two-letter list counts today's answers by their first two letters, grouped one line per starting letter. It narrows 'a 6-letter B-word' down to 'a 6-letter word starting with BA' — often all the push you need.",
    note: "This list is folded away by default because it's a meaningfully bigger clue than the grid. Open it when the grid alone stops helping.",
  },
  pangram: {
    heading: "Pangram Hints — Revealed One Step at a Time",
    intro:
      "The pangram uses all seven letters and is worth its length plus a seven-point bonus, so we treat it with extra care. Instead of printing it outright, the box below reveals it in four escalating steps: word length, then the first two letters, then a meaning clue, and only then — if you insist — the word itself.",
  },
  wordClues: {
    heading: "Per-Word Hints for Every Answer",
    intro:
      "This is the layer you won't find on other Spelling Bee hints sites: an individual clue for every word in today's puzzle. Each card shows the first letter, the length as a letter mask, and a short dictionary-style meaning clue — enough to jog the word loose without giving it away. Click a card only when you want that one answer confirmed.",
    note: "A few very obscure words may show the mask alone when no spoiler-safe meaning clue exists for them.",
  },
  ladder: {
    heading: "The Hint Ladder — Which Layer Should You Use?",
    intro:
      "Every section on this page is one rung on a ladder from zero spoilers to full answers. Knowing which rung matches your situation is what makes Spelling Bee hints feel like help instead of cheating. Here's how to pick:",
    rungs: [
      {
        heading: "Rung 1: The Numbers (start here)",
        body: "Word count, total points, the Genius cutoff, and the length distribution tell you the shape of the day without touching a single letter. If you're at 15 of 25 words and the distribution shows nine 4-letter words while you've found three, you already have a direction — and you haven't been spoiled at all.",
      },
      {
        heading: "Rung 2: The Grid (the workhorse)",
        body: "The letter-by-length grid is where most solvers should live. It converts 'I'm stuck' into 'I need two more 6-letter words starting with B' — a completely different mental state. Veteran players from the NYT forum community solve entire puzzles with nothing but this table, and it's why we keep it visible by default instead of hiding it behind a click.",
      },
      {
        heading: "Rung 3: The Two-Letter List (when the grid runs dry)",
        body: "Knowing a word starts with FL rather than just F cuts the search space dramatically — often to a handful of candidates you can brute-force in your head. This is the last layer that still leaves the actual finding to you, which is why it's folded behind a click.",
      },
      {
        heading: "Rung 4: Pangram and Word Clues (surgical strikes)",
        body: "When one specific word is the wall between you and Genius, take a targeted clue for that word alone — its mask and meaning hint — rather than opening the whole answer list. You give up one word, not the puzzle. The staged pangram box works the same way: each click buys the minimum information you need.",
      },
      {
        heading: "Rung 5: The Answer Page (finish the day)",
        body: "Streak on the line, obscure word refusing to come? Head to the full answers page, close out the puzzle, and read what beat you. Tomorrow's honeycomb doesn't care how today ended — but a broken streak does sting more than a looked-up word.",
      },
    ],
  },
  strategy: {
    heading: "How to Use Spelling Bee Hints Without Ruining the Solve",
    intro:
      "There's a real skill to taking hints well. The players who reach Genius daily aren't the ones who never peek — they're the ones who peek at the lightest layer that unblocks them, then go back to the board.",
    tips: [
      {
        heading: "Exhaust the Grid Before Anything Else",
        body: "Nine times out of ten, knowing 'two more 5-letter F-words exist' is enough. Your brain does the rest — it just needed to know the search wasn't finished. Treat the two-letter list, pangram clues, and word cards as escalation steps, not a starting point, and your streaks will still feel earned.",
      },
      {
        heading: "Use Hints to Find Word Families, Not Words",
        body: "When the grid shows a cluster — say, seven FI-words — you're almost certainly looking at a family: a base word plus its plural-free variants, -ING and -ED forms, or compounds. Finding the base cracks the whole cluster. That's a far better return on one hint than revealing a single word.",
      },
      {
        heading: "Know When to Switch to the Answer Page",
        body: "If you're one or two words from Queen Bee and they're the obscure ones (Spelling Bee always keeps a couple in stock), there's no shame in finishing on the answer page. A completed puzzle beats an abandoned one — and reading why a weird word counts is how you recognize it next time it appears.",
      },
    ],
  },
  whatIs: {
    heading: "Why Hints Beat Answers for Most Players",
    body: [
      "The whole appeal of Spelling Bee is the slow-burn satisfaction of pulling one more word out of seven letters. Jumping straight to the full solution ends the game; a well-chosen hint extends it. That's why the NYT publishes a daily hints column with a letter grid and two-letter list rather than just printing the words — and why serious players treat those two tools as the canonical way to get unstuck.",
      "Our page follows that same discipline, then goes further than the forum column can: staged pangram clues and per-word meaning hints fill the gap between 'the grid stopped helping' and 'just show me everything'. Each layer is a deliberate choice, so an accidental scroll never costs you the solve.",
    ],
  },
};

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What time are new Spelling Bee hints available?",
    answer:
      "The NYT releases each new puzzle at 3:00 AM Eastern Time, and this page regenerates automatically right after — grid, two-letter list, pangram clues, and word cards all update together. If the date above looks like yesterday, refresh in a few minutes.",
  },
  {
    question: "How do I read the Spelling Bee hints grid?",
    answer:
      "Rows are starting letters, columns are word lengths, and each number is how many answers match both. A '3' in row B, column 6 means three 6-letter words start with B. Compare it against your found list to see exactly which combinations you're missing.",
  },
  {
    question: "What is the two-letter list?",
    answer:
      "It's a count of today's answers by their first two letters — for example, 'FA × 4' means four answers start with FA. It's the standard second-level hint from the NYT's own forum column, one notch stronger than the grid.",
  },
  {
    question: "Do these hints spoil the pangram?",
    answer:
      "Not unless you ask. The pangram box starts at zero information and reveals one level per click: length, first two letters, a meaning clue, and only then the word. Everything above it — grid and two-letter list — never identifies the pangram at all.",
  },
  {
    question: "Where can I see the full answer list?",
    answer:
      "On our Spelling Bee answers page, which has every word with point values, the pangram highlighted, today's Genius cutoff, and a browsable archive of past puzzles. This page is for staying unspoiled; that one is for finishing.",
  },
  {
    question: "Why do some word cards have no meaning clue?",
    answer:
      "Spelling Bee occasionally includes words too obscure for a spoiler-safe dictionary clue — or the dictionary definition would give the word away outright. Those cards show the letter mask alone, which still tells you the first letter and length.",
  },
  {
    question: "Are these hints the same as the NYT forum column?",
    answer:
      "The grid and two-letter list follow the exact same conventions, so everything you know from the forum applies here. On top of that we add layers the column doesn't have: staged pangram clues, per-word meaning hints, and a difficulty read on the day's board.",
  },
];
