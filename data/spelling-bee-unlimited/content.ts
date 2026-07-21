/**
 * /spelling-bee-unlimited 页面内容数据
 *
 * 写作守则（对齐 connections-unlimited）：
 *  - 核心关键词 "Spelling Bee Unlimited" 密度 1-3%，全文目标 ~20 次
 *  - 全文 em dash (—) 总数 ≤ 4
 *  - Furthermore / Moreover / Additionally 合计 ≤ 2 次
 *  - 每个 H2 至少 1 个具体数字
 *  - 第一人称（we / our）≥ 2 处
 *  - 卖点：900+ 真实历史谜题、免费渐进提示（缺词矩阵 + 双字母提示）、
 *    NYT 原版计分完整复刻、无每日限制/无注册/localStorage 存档
 */

export const PAGE_META = {
  title: "Spelling Bee Unlimited: Free Hive Puzzles, No Limit",
  description:
    "Spelling Bee Unlimited serves 900+ real archived hive puzzles with NYT-accurate scoring, free hint grids, and no daily cap, no account, no paywall.",
  h1: "Spelling Bee Unlimited: Endless Seven-Letter Hive Puzzles",
  ogImage: "/og/spelling-bee-unlimited.png",
};

/**
 * Intro 段（紧跟 H1，~115 词）
 * 关键词出现：2 次
 */
export const INTRO = `Spelling Bee Unlimited takes the seven-letter honeycomb puzzle and removes the once-a-day ceiling. Each round gives you a hive of seven letters with one mandatory center letter; your job is to build as many words of four letters or more as the hidden list allows. The difference from every clone you have tried: our boards are drawn from more than 900 real archived puzzles, with the original curated word lists, not random letter soup scored by a loose dictionary. We kept the official scoring intact too, from the 1-point four-letter words up to the pangram bonus, Genius at 70%, and Queen Bee at every last word. The game sits above this text; rules, ranks, and strategy follow below.`;

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "pullquote"; text: string; cite?: string }
  | { type: "stathighlight"; number: string; label: string; cite?: string }
  | { type: "rank-table" } // H2-3 段位表
  | { type: "comparison-cards" } // H2-4 双栏对比
  | { type: "faq" } // H2-7 FAQ accordion
  | { type: "related-games" }; // H2-8 4 卡片网格

export type ContentSection = {
  id: string;
  number: string; // "01" ~ "08"
  h2: string;
  blocks: ContentBlock[];
  dropCap?: boolean; // 仅 H2-1 用
};

/**
 * H2-3 段位表数据（rank-table 块渲染用）
 * 阈值为 NYT 官方口径：占该谜题总分的百分比，向下取整为所需分数
 */
export type RankTier = {
  rank: string;
  percent: number; // 占总分百分比
  note: string;
};

export const RANK_TIERS: RankTier[] = [
  { rank: "Beginner", percent: 0, note: "Where every hive starts" },
  { rank: "Good Start", percent: 2, note: "Usually one or two words in" },
  { rank: "Moving Up", percent: 5, note: "The four-letter warm-up is working" },
  { rank: "Good", percent: 8, note: "A handful of solid finds" },
  { rank: "Solid", percent: 15, note: "Most casual sessions end here" },
  { rank: "Nice", percent: 25, note: "You have probably found a 6-letter word" },
  { rank: "Great", percent: 40, note: "Prefix and suffix hunting pays off" },
  { rank: "Amazing", percent: 50, note: "Half the total score, often pangram territory" },
  { rank: "Genius", percent: 70, note: "The unofficial finish line for most players" },
  { rank: "Queen Bee", percent: 100, note: "Every single word on the list, no exceptions" },
];

export const SECTIONS: ContentSection[] = [
  // ─────────────────────────────────────────────────────────────
  // H2-1 — ~230 词，关键词 3 次，首字下沉 + 定义 pullquote + 数据高亮
  // ─────────────────────────────────────────────────────────────
  {
    id: "what-is",
    number: "01",
    h2: "What Is Spelling Bee Unlimited?",
    dropCap: true,
    blocks: [
      {
        type: "paragraph",
        text: "Spelling Bee Unlimited is a free browser version of the NYT-style honeycomb word game that you can replay as many times as you like. The rules are the classic set: seven letters arranged in a hive, every word must be at least 4 letters long, every word must use the center letter, and letters can repeat as often as you want. Find a pangram, a word that uses all seven letters, and the board lights up.",
      },
      {
        type: "pullquote",
        text: "Spelling Bee Unlimited is the same hive, the same rules, and the same scoring as the daily original, without the 24-hour wait between rounds.",
      },
      {
        type: "paragraph",
        text: "The part that separates this page from the average unlimited clone is where the puzzles come from. Most copies generate a random seven-letter combination and check your guesses against whatever open dictionary they downloaded, which is why they accept nonsense one round and reject common words the next. Every hive you play here is a curated archive puzzle with its original answer list, so the word count on screen is a real target set by a human editor, not a guess.",
      },
      {
        type: "stathighlight",
        number: "900+",
        label: "real archived hive puzzles in the rotation, curated word lists included",
      },
      {
        type: "paragraph",
        text: "We built Spelling Bee Unlimited for two players: the one who hits Genius before breakfast and wants a second hive, and the one who wants low-stakes reps before facing the official puzzle in front of friends.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-2 — ~300 词，关键词 3 次，h3 步骤（供 HowTo schema）
  // ─────────────────────────────────────────────────────────────
  {
    id: "how-to-play",
    number: "02",
    h2: "How to Play Spelling Bee Unlimited",
    blocks: [
      {
        type: "paragraph",
        text: "If you have played the daily hive, Spelling Bee Unlimited will feel like muscle memory. If you are new, the whole loop takes about 60 seconds to learn and a lifetime to master.",
      },
      { type: "h3", text: "Step 1: Read the hive" },
      {
        type: "paragraph",
        text: "You get 7 letters: six around the outside and one in the center. The center letter is mandatory in every answer, so start by sounding out what it pairs with. A center R or S opens far more doors than a center J.",
      },
      { type: "h3", text: "Step 2: Type or tap a word of 4+ letters" },
      {
        type: "paragraph",
        text: "Build words by tapping the hive cells or typing on your keyboard. Letters may be reused within a word, so NOON is legal from a hive containing N and O. Words under four letters are rejected automatically, no penalty attached.",
      },
      { type: "h3", text: "Step 3: Submit and watch the score" },
      {
        type: "paragraph",
        text: "Press Enter. A valid word slides into your found list and its points land on your rank bar. An invalid word shakes and disappears; there is no guess limit and no cost for trying, which is exactly how the official game works.",
      },
      { type: "h3", text: "Step 4: Climb to Genius, then deal a new hive" },
      {
        type: "paragraph",
        text: "Your rank climbs from Beginner toward Genius at 70% of the puzzle's total points. Stop whenever satisfaction hits, or chase Queen Bee. Then tap New Puzzle and Spelling Bee Unlimited deals the next archived hive immediately, no midnight required.",
      },
      {
        type: "paragraph",
        text: "When you stall, the hint panel helps without spoiling everything at once. It opens with the classic missing-word grid, a table showing how many undiscovered words start with each letter at each length, and a second stage lists the two-letter openings of every remaining word. Both hint layers are free, and your results card notes whether you used them, so an unassisted Genius still means something.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-3 — ~270 词，关键词 2 次，计分规则 + rank-table
  // ─────────────────────────────────────────────────────────────
  {
    id: "scoring-ranks",
    number: "03",
    h2: "Scoring and Ranks: The Exact NYT System",
    blocks: [
      {
        type: "paragraph",
        text: "Plenty of clones invent their own point system, which makes their Genius meaningless. Spelling Bee Unlimited replicates the official scoring rules digit for digit, so a rank earned here translates directly to the daily puzzle.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "A 4-letter word is worth exactly 1 point, no matter how clever it felt.",
          "Words of 5 letters or more score their full letter count: 5 points for a 5-letter word, 8 points for an 8-letter word.",
          "A pangram, any word using all seven hive letters, scores its letter count plus a 7-point bonus. A seven-letter pangram is worth 14 points in one swing.",
          "Every puzzle has at least one pangram, and finding it is usually the single largest score jump of the round.",
        ],
      },
      {
        type: "paragraph",
        text: "Ranks are percentages of that puzzle's maximum possible score, which is why the Genius threshold changes from hive to hive. On a board worth 200 points, Genius requires 140; on a lean 89-point board, it takes 62. The full ladder:",
      },
      { type: "rank-table" },
      {
        type: "paragraph",
        text: "A worked example makes the math concrete. Say a hive's full list holds 42 words totaling 180 points. TIED earns 1 point, DITTIES earns 7, and the pangram EDITION earns 7 plus the 7-point bonus for 14. Genius on that board requires 126 points, which most players reach with roughly 30 of the 42 words.",
      },
      {
        type: "paragraph",
        text: "Two things worth internalizing. Genius sits at 70% because the last 30% of any word list is obscure by design; the editors consider Genius a completed game. And Queen Bee, at a full 100%, is deliberately brutal: on a typical 45-word list, missing one four-pointer is the difference. In Spelling Bee Unlimited the missing-word grid exists precisely so that Queen Bee chases end in triumph instead of a shrug.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-4 — ~210 词，关键词 2 次，对比卡片
  // ─────────────────────────────────────────────────────────────
  {
    id: "vs-nyt",
    number: "04",
    h2: "Spelling Bee Unlimited vs the NYT Daily Puzzle",
    blocks: [
      {
        type: "paragraph",
        text: "We play the official hive most mornings, and nothing here is meant to replace that ritual. The honest difference is access. The official free tier stops accepting your words partway through the list and asks for a Games subscription to continue; the archive of past puzzles sits behind the same paywall, and the popular Spelling Bee Buddy hint tool requires a subscription as well. Third-party unlimited clones go the other direction and lock their hints behind 30-second reward ads.",
      },
      { type: "comparison-cards" },
      {
        type: "paragraph",
        text: "Spelling Bee Unlimited takes neither deal. All 900+ archived hives, both hint layers, and full scoring are free, with no account and no ad gate in front of help. One honest limitation in return: our rotation deliberately excludes the most recent 14 days of puzzles, so nothing you play here can spoil a daily hive you have not opened yet.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-5 — ~230 词，关键词 2 次，daily 页内链
  // ─────────────────────────────────────────────────────────────
  {
    id: "daily-and-unlimited",
    number: "05",
    h2: "How Daily and Unlimited Play Fit Together",
    blocks: [
      {
        type: "paragraph",
        text: "The two modes reward different muscles, and the players who improve fastest use both. The daily hive is a single, shared, high-stakes list: one shot, one leaderboard of friends, 24 hours of bragging rights. Unlimited play is the batting cage, where volume builds the pattern library that the daily puzzle then tests.",
      },
      {
        type: "paragraph",
        text: "A rhythm that works: warm up with one or two hives in Spelling Bee Unlimited, then open the official puzzle while your prefix-and-suffix instincts are hot. If today's board defeats you, our Spelling Bee hints page at /spelling-bee-hints-today walks through the current hive with progressive nudges, from word counts down to two-letter openings, without dumping the full list on you.",
      },
      {
        type: "paragraph",
        text: "And when the day is over, the answers archive at /spelling-bee-answers lists every past puzzle by date with the complete word list and pangrams marked, which turns yesterday's frustration into tomorrow's vocabulary. Play here, get help there, review afterward: three pages, one habit. After 20 or 30 archived hives, you will notice the same suffix families, the same sneaky compound words, and the same pangram shapes repeating, because the editors' habits repeat too.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-6 — ~330 词，关键词 3 次，5 条策略
  // ─────────────────────────────────────────────────────────────
  {
    id: "strategy",
    number: "06",
    h2: "Strategy: How to Score Higher in Spelling Bee Unlimited",
    blocks: [
      {
        type: "paragraph",
        text: "Spelling Bee rewards systematic search, not vocabulary flexing, and Spelling Bee Unlimited gives you 10 hives of practice in the time the official game gives you one. These five habits carry most players from Solid to Genius.",
      },
      { type: "h3", text: "Hunt the pangram first" },
      {
        type: "paragraph",
        text: "The pangram is worth at least 14 points and, more importantly, it reveals how the seven letters want to combine. Stare at the full letter set and look for word skeletons: a Q demands a U, an -ING or -TION ending soaks up common letters fast. Landing the pangram early often unlocks a cascade of its sub-words.",
      },
      { type: "h3", text: "Run the ending drill" },
      {
        type: "paragraph",
        text: "Take every word you have found and try appending -S, -ED, -ER, and -ING wherever the hive allows. Then reverse it: strip endings off longer finds to expose the root. This one mechanical habit is routinely worth 20% of a puzzle's total score.",
      },
      { type: "h3", text: "Pair the center letter with every neighbor" },
      {
        type: "paragraph",
        text: "Work through all 6 outer letters as partners for the center letter, in both orders: center-first pairs like RE- and RA-, then letter-center pairs like -AR and -OR. Most of a hive's word list clusters around three or four of these pairs, and the drill tells you which ones."
      },
      { type: "h3", text: "Exploit letter repetition" },
      {
        type: "paragraph",
        text: "Doubled letters are legal and clone builders forget it, but curated lists love them. Think NOON, LLAMA, COCOON, TITTLE. Whenever a hive holds L, O, or T, test the doubled forms before moving on.",
      },
      { type: "h3", text: "Read the hint grid like a map, not an answer key" },
      {
        type: "paragraph",
        text: "The missing-word grid tells you, say, that two 6-letter words starting with C remain. That is a search warrant, not a spoiler: you now dig through C-pairs at exactly that length instead of wandering. Players who treat the grid this way in Spelling Bee Unlimited reach Queen Bee without ever feeling like they cheated.",
      },
      {
        type: "paragraph",
        text: "One last habit that only unlimited play makes possible: when a hive ends, skim the words you missed before dealing the next one. Ten seconds of review per board compounds fast, because the same 200 or so workhorse words account for a huge share of every curated list.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-7 — FAQ（数据在 faq.ts）
  // ─────────────────────────────────────────────────────────────
  {
    id: "faq",
    number: "07",
    h2: "Spelling Bee Unlimited FAQ",
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
