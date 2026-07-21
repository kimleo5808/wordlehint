/**
 * /strands-unlimited 页面内容数据
 *
 * 写作守则（对齐 connections-unlimited）：
 *  - 核心关键词 "Strands Unlimited" 密度 1-3%，全文目标 ~22 次
 *  - 全文 em dash (—) 总数 ≤ 4
 *  - Furthermore / Moreover / Additionally 合计 ≤ 2 次
 *  - 每个 H2 至少 1 个具体数字
 *  - 第一人称（we / our）≥ 2 处
 *  - 谜题示例取自 data/strands-daily.json 真实往期数据（2026-04-23 DOMAIN 期）
 */

export const PAGE_META = {
  title: "Strands Unlimited: Play Free with No Daily Limit",
  description:
    "Play Strands Unlimited free: real NYT-style theme boards with spangrams, drag-to-trace gameplay, 3 hints per puzzle, and no once-a-day cap. No sign-up.",
  h1: "Strands Unlimited: Endless Theme-Word Boards",
  ogImage: "/og/strands-unlimited.png",
};

/**
 * Intro 段（紧跟 H1，~110 词）
 * 关键词出现：2 次
 */
export const INTRO = `Strands Unlimited takes the newest of the NYT word games and removes its one-board-per-day ceiling. Each round is a 6-by-8 grid of 48 letters hiding a handful of theme words plus one spangram that touches both sides of the board. The catch that makes this page different from most clones: every board here is a real past puzzle from our archive, with the original clue, the original spangram, and the original letter layout. We built Strands Unlimited for players who clear the official board before their coffee cools and want another. The game sits above this text; rules, spangram theory, and strategy follow below.`;

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "pullquote"; text: string; cite?: string }
  | { type: "stathighlight"; number: string; label: string; cite?: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: "comparison-cards" }
  | { type: "faq" }
  | { type: "related-games" };

export type ContentSection = {
  id: string;
  number: string; // "01" ~ "08"
  h2: string;
  blocks: ContentBlock[];
  dropCap?: boolean;
};

export const SECTIONS: ContentSection[] = [
  // ─────────────────────────────────────────────────────────────
  // H2-1 — ~210 字，关键词 3 次
  // ─────────────────────────────────────────────────────────────
  {
    id: "what-is",
    number: "01",
    h2: "What Is Strands Unlimited?",
    dropCap: true,
    blocks: [
      {
        type: "paragraph",
        text: "Strands Unlimited is a free browser version of the NYT-style word search where every word on the board belongs to one hidden theme. You get a clue, 48 letters, and a simple goal: trace every theme word and the spangram until all 48 cells are used exactly once. There is no fail state and no timer, only the puzzle and your patience.",
      },
      {
        type: "pullquote",
        text: "Strands Unlimited is the same clue-driven, board-filling word hunt as the daily original, minus the 24-hour wait between boards.",
      },
      {
        type: "paragraph",
        text: "What separates this build from a generic word search generator is the source material. Every board is a genuine archived puzzle with its original editor-written clue and letter layout, so the themes have the wit the daily version is known for. When a clue like Provinces of the pantheon makes you grin at the answer, that is a human editor's work, not a script's.",
      },
      {
        type: "stathighlight",
        number: "80+",
        label: "real archived boards in rotation, growing every day",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-2 — ~290 字，关键词 4 次，4 步教程 + 配图 1
  // ─────────────────────────────────────────────────────────────
  {
    id: "how-to-play",
    number: "02",
    h2: "How to Play Strands Unlimited",
    blocks: [
      {
        type: "paragraph",
        text: "If you know the daily version, Strands Unlimited plays exactly the way your thumbs expect. If you are new, four steps cover the whole loop.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Read the clue first. It names the theme that every word on the board shares. Spend 20 seconds guessing what kinds of words might fit before you touch a letter.",
          "Trace words by dragging across adjacent letters, or tap them one at a time. Letters connect in any of 8 directions, and a word can zigzag freely. Release the drag, tap the last letter again, or press Submit to lock in a guess of 4 or more letters.",
          "Found theme words turn blue and stay on the board. The spangram turns yellow: it is the one word that describes the theme itself and touches two opposite sides of the grid.",
          "Fill the board. Every one of the 48 letters belongs to exactly one answer, so each word you find shrinks the haystack for the rest. Then hit New Puzzle and Strands Unlimited deals the next board from the archive.",
        ],
      },
      {
        type: "image",
        src: "/images/strands-unlimited/how-to-play.png",
        alt: "How to play Strands Unlimited in three steps: read the theme clue, trace adjacent letters to form a word, watch found words lock in blue and the spangram in yellow",
        width: 1200,
        height: 520,
        caption: "The core loop: read the clue, trace a word, fill the board.",
      },
      {
        type: "paragraph",
        text: "Stuck? The hint button outlines the cells of one unfound theme word, and you get 3 hints per board. Hints never end your run; Strands Unlimited has no mistake counter, so a wrong trace costs you nothing but time.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-3 — ~260 字，关键词 2 次，spangram 深讲 + 配图 2
  // ─────────────────────────────────────────────────────────────
  {
    id: "spangram",
    number: "03",
    h2: "What Is a Spangram? The Word That Unlocks the Board",
    blocks: [
      {
        type: "paragraph",
        text: "The spangram is the puzzle's spine: a single word or phrase that sums up the theme and physically spans the board, touching two opposite edges. It is the only answer that turns yellow, and finding it early is worth more than any hint.",
      },
      {
        type: "paragraph",
        text: "A real example from the April 23, 2026 board in our archive. The clue read Provinces of the pantheon, and the theme words were HARVEST, LOVE, MARRIAGE, THUNDER, UNDERWORLD, and WISDOM: the domains of Greek gods. The spangram tying them together was DOMAIN, snaking from one edge of the grid to the other. Solve DOMAIN first and the remaining six words practically declare themselves.",
      },
      {
        type: "image",
        src: "/images/strands-unlimited/spangram.png",
        alt: "A Strands spangram explained: the word DOMAIN crossing the full board in yellow, with blue theme words like THUNDER and WISDOM filling the rest",
        width: 1200,
        height: 640,
        caption: "The real April 23, 2026 board: DOMAIN spans the grid, six god-domains fill the rest.",
      },
      {
        type: "paragraph",
        text: "In Strands Unlimited the spangram follows the official rules: it can start anywhere, it usually runs 8 to 12 letters, and about half the time it is a two-word phrase written without a space. If a long trace touches both sides of the board and fits the clue, submit it.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-4 — ~330 字，关键词 3 次，5 条策略 + 配图 3
  // ─────────────────────────────────────────────────────────────
  {
    id: "strategy",
    number: "04",
    h2: "Strategy: How to Solve Strands Unlimited Faster",
    blocks: [
      {
        type: "paragraph",
        text: "Strands rewards a different muscle than Wordle or Connections: spatial scanning plus theme prediction. Playing 10 boards of Strands Unlimited back to back trains that muscle faster than 10 days of the daily ever could. Five habits make the biggest difference.",
      },
      { type: "h3", text: "Predict before you scan" },
      {
        type: "paragraph",
        text: "Read the clue and list three or four candidate words in your head before looking at letters. Scanning for a specific word you expect is roughly twice as fast as hoping a word jumps out of 48 letters.",
      },
      { type: "h3", text: "Start from the corners" },
      {
        type: "paragraph",
        text: "Corner letters have only 3 neighbors, so words that use them have far fewer possible routes. If a corner letter is a Q, J, or X, the word passing through it is often obvious within seconds.",
      },
      { type: "h3", text: "Hunt the spangram early" },
      {
        type: "paragraph",
        text: "The spangram both confirms the theme and cuts the board in two. After it locks in yellow, the remaining words are trapped in smaller regions with fewer routes, and long words become dramatically easier to spot.",
      },
      { type: "h3", text: "Trust the leftovers" },
      {
        type: "paragraph",
        text: "Because every cell is used exactly once, the unused letters ARE the remaining words. When only a dozen cells remain, stop scanning for meaning and just look at what those letters can spell.",
      },
      { type: "h3", text: "Spend hints on position, not vocabulary" },
      {
        type: "paragraph",
        text: "A hint outlines where a word lives, which matters more than what it means. The best moment for one of your 3 hints is when two regions of the board refuse to resolve, not when you are one word from finishing.",
      },
      {
        type: "image",
        src: "/images/strands-unlimited/strategy.png",
        alt: "Strands strategy diagram: start from corner letters with fewer routes and find the spangram early to split the board into smaller regions",
        width: 1200,
        height: 640,
        caption: "Corners have 3 neighbors instead of 8, and a found spangram splits the hunt in two.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-5 — ~180 字，关键词 3 次，对比卡片
  // ─────────────────────────────────────────────────────────────
  {
    id: "vs-nyt",
    number: "05",
    h2: "Strands Unlimited vs the NYT Daily Puzzle",
    blocks: [
      {
        type: "paragraph",
        text: "Same rules, different rhythm. We still play the official board every morning; the daily ritual and its shared clue are the point. Strands Unlimited covers everything around that ritual: warming up beforehand, practicing spangram-spotting, and the other 23 hours when the official site has nothing new for you.",
      },
      { type: "comparison-cards" },
      {
        type: "paragraph",
        text: "One honest limitation: the rotation excludes the most recent 14 days of puzzles, so Strands Unlimited can never spoil a daily board you have not opened yet. That is deliberate, and it is why today's grid will never appear here.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-6 — ~200 字，关键词 2 次，存档内链
  // ─────────────────────────────────────────────────────────────
  {
    id: "past-puzzles",
    number: "06",
    h2: "Practice with Real Past Puzzles",
    blocks: [
      {
        type: "paragraph",
        text: "Every Strands Unlimited board is a genuine archived puzzle, complete with its original clue and editor credit. The pool refreshes daily as our archive grows, and boards you have already cleared on this device are skipped, so consecutive rounds stay fresh. The archive is younger than Wordle's or Connections', which is exactly why practice matters: with 80-plus boards available, a dedicated week here covers more spangram patterns than three months of daily play.",
      },
      {
        type: "paragraph",
        text: "Want to study rather than play? Our Strands answers archive lists every past puzzle by date with the full word list and spangram, and the daily hint page walks you through today's board one nudge at a time. Play here, look up there; the two pages cover both halves of the habit.",
      },
      {
        type: "paragraph",
        text: "Practice transfers because the editors' habits repeat. Spangrams favor certain shapes: they enter from a long edge far more often than a corner, two-word phrases outnumber single words on harder boards, and theme words tend to cluster by length. None of this is written down anywhere official; it is the kind of pattern sense you only absorb by clearing board after board, which is precisely what an unlimited format is for. After a dozen rounds you will catch yourself predicting the spangram's shape before tracing a single letter.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-7 — FAQ（数据在 faq.ts）
  // ─────────────────────────────────────────────────────────────
  {
    id: "faq",
    number: "07",
    h2: "Strands Unlimited FAQ",
    blocks: [{ type: "faq" }],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-8 — 相关游戏
  // ─────────────────────────────────────────────────────────────
  {
    id: "more-games",
    number: "08",
    h2: "More Word Games to Keep Playing",
    blocks: [{ type: "related-games" }],
  },
];
