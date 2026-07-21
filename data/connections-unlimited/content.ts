/**
 * /connections-unlimited 页面内容数据
 *
 * 写作守则（对齐 wordle-unlimited）：
 *  - 核心关键词 "Connections Unlimited" 密度 1-3%，全文目标 ~24 次
 *  - 全文 em dash (—) 总数 ≤ 4
 *  - Furthermore / Moreover / Additionally 合计 ≤ 2 次
 *  - 每个 H2 至少 1 个具体数字
 *  - 第一人称（we / our）≥ 2 处
 *  - 谜题示例全部取自 data/connections-daily.json 真实往期数据
 */

export const PAGE_META = {
  title: "Connections Unlimited: Play Free with No Daily Limit",
  description:
    "Connections Unlimited lets you play over 1,100 real past NYT-style puzzles back to back, with progressive hints, mistake tracking, and no once-a-day cap.",
  h1: "Connections Unlimited: Endless 16-Word Grouping Puzzles",
  ogImage: "/og/connections-unlimited.png",
};

/**
 * Intro 段（紧跟 H1，~115 词）
 * 关键词出现：2 次
 */
export const INTRO = `Connections Unlimited removes the one-puzzle-per-day wall from the word-grouping game that took over group chats in 2023. Every round hands you 16 words hiding four secret groups of four; you get four mistakes to sort them all. The difference here: our board draws from more than 1,100 real past puzzles, so the categories feel like the genuine article rather than filler written by a script. We built Connections Unlimited for the player who finishes the official grid in four minutes and wants another, and for the one who would rather practice on real archives before touching today's puzzle. The game sits above this text. Everything below it covers rules, colors, and strategy.`;

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "pullquote"; text: string; cite?: string }
  | { type: "stathighlight"; number: string; label: string; cite?: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: "difficulty-legend" } // H2-3 四色难度图例
  | { type: "comparison-cards" } // H2-5 双栏对比
  | { type: "faq" } // H2-7 FAQ accordion
  | { type: "related-games" }; // H2-8 4 卡片网格

export type ContentSection = {
  id: string;
  number: string; // "01" ~ "08"
  h2: string;
  blocks: ContentBlock[];
  dropCap?: boolean; // 仅 H2-1 用
};

export const SECTIONS: ContentSection[] = [
  // ─────────────────────────────────────────────────────────────
  // H2-1 — ~220 字，关键词 3 次，首字下沉 + 定义 pullquote + 数据高亮
  // ─────────────────────────────────────────────────────────────
  {
    id: "what-is",
    number: "01",
    h2: "What Is Connections Unlimited?",
    dropCap: true,
    blocks: [
      {
        type: "paragraph",
        text: "Connections Unlimited is a free browser version of the NYT-style word grouping puzzle that you can replay as many times as you like. The core mechanic is untouched: a 4×4 grid of 16 words, four hidden categories of four words each, and a budget of four wrong guesses before the round ends.",
      },
      {
        type: "pullquote",
        text: "Connections Unlimited is the same 16-word, four-group puzzle as the daily original, minus the 24-hour wait between rounds.",
      },
      {
        type: "paragraph",
        text: "What separates this page from the average clone is the source material. Instead of machine-generated word lists, every board you play here is a real past puzzle pulled from our archive, complete with the original category names and the original difficulty grading. When a purple group feels devious, that is because a human editor made it devious.",
      },
      {
        type: "stathighlight",
        number: "1,100+",
        label: "real past puzzles in the rotation, refreshed daily",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-2 — ~280 字，关键词 4 次，4 步有序列表（供 HowTo schema）
  // ─────────────────────────────────────────────────────────────
  {
    id: "how-to-play",
    number: "02",
    h2: "How to Play Connections Unlimited",
    blocks: [
      {
        type: "paragraph",
        text: "If you have played the daily version, Connections Unlimited works exactly the way your thumbs expect. If you are new, the whole loop takes about 90 seconds to learn.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Scan all 16 words before touching anything. Read the full grid twice; the biggest beginner mistake is locking onto the first obvious theme in ten seconds.",
          "Tap four words you believe share a category. Selected tiles flip to ink so you can see your working group at a glance. Tap again to deselect.",
          "Press Submit. A correct group collapses into a colored banner showing the category name. A wrong guess costs one of your four mistakes, and if three of your four words belong together, the board tells you that you were one away.",
          "Repeat until all four groups are solved or your mistakes run out. Then hit New Puzzle and Connections Unlimited deals the next board from the archive.",
        ],
      },
      {
        type: "image",
        src: "/images/connections-unlimited/how-to-play.png",
        alt: "How to play Connections Unlimited in three steps: scan the 16-word grid, select four words, submit to collapse a correct group into a colored banner",
        width: 1200,
        height: 520,
        caption: "The core loop: scan, select four, submit. Four mistakes allowed per board.",
      },
      {
        type: "paragraph",
        text: "Two quality-of-life details worth knowing. Shuffle rearranges the remaining tiles, which genuinely helps because word position creates false patterns. And resubmitting a combination you already tried costs nothing: the board recognizes the repeat and simply reminds you.",
      },
      {
        type: "paragraph",
        text: "If you get stuck, the hint button reveals help in three gentle stages rather than dumping the answer: first the four first letters of the easiest unsolved group, then its category name, then one highlighted member word. Hints never cost a mistake. Your results card keeps an honest count of how many you used, so a clean solve still means something.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-3 — ~260 字，关键词 2 次，四色图例 + 真实例子
  // ─────────────────────────────────────────────────────────────
  {
    id: "difficulty-colors",
    number: "03",
    h2: "The Four Difficulty Colors, Explained with Real Examples",
    blocks: [
      {
        type: "paragraph",
        text: "Every Connections Unlimited board grades its four groups on the same color ladder the daily puzzle uses. The examples below come from the very first archived puzzle in our rotation, from June 2023.",
      },
      { type: "difficulty-legend" },
      {
        type: "paragraph",
        text: "Yellow is the giveaway group. In that first puzzle it was Wet Weather: HAIL, RAIN, SLEET, SNOW. Green steps up slightly; NBA Teams collected BUCKS, HEAT, JAZZ, and NETS, four words that also work as ordinary nouns, which is exactly the trap.",
      },
      {
        type: "paragraph",
        text: "Blue usually demands specific knowledge. Keyboard Keys grouped OPTION, RETURN, SHIFT, and TAB, all of which could plausibly belong to a finance or grammar category instead. Purple is the wordplay tier, and it is where most games are lost. Palindromes tied together KAYAK, LEVEL, MOM, and RACECAR: nothing about their meanings connects, only their spelling. Around 40% of purple groups rely on a trick like that rather than on what the words mean.",
      },
      {
        type: "image",
        src: "/images/connections-unlimited/difficulty-colors.png",
        alt: "The four Connections difficulty colors shown with the real June 12, 2023 puzzle: yellow Wet Weather, green NBA Teams, blue Keyboard Keys, purple Palindromes",
        width: 1200,
        height: 640,
        caption: "All four groups from the first archived board, graded easiest to trickiest.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-4 — ~320 字，关键词 3 次，5 条策略
  // ─────────────────────────────────────────────────────────────
  {
    id: "strategy",
    number: "04",
    h2: "Strategy: How to Win More Connections Unlimited Boards",
    blocks: [
      {
        type: "paragraph",
        text: "Unlimited play is the fastest way to get better, because Connections is a pattern-recognition skill and Connections Unlimited gives you twenty boards of practice in the time the official game gives you one. These five habits separate players who clear most boards from players who burn all four mistakes by minute two.",
      },
      { type: "h3", text: "Hunt the trap word first" },
      {
        type: "paragraph",
        text: "Editors build almost every board around overlap words that fit two categories. HEAT works as weather and as a basketball team; RETURN works as a keyboard key and a tennis shot. Before your first guess, find the words that could belong to multiple themes and set them aside mentally.",
      },
      {
        type: "image",
        src: "/images/connections-unlimited/trap-words.png",
        alt: "A trap word in Connections: HEAT could fit the Wet Weather group but actually belongs to NBA Teams",
        width: 1200,
        height: 640,
        caption: "HEAT reads as weather, but the board wants the basketball team.",
      },
      { type: "h3", text: "Start with your most certain group, not the easiest color" },
      {
        type: "paragraph",
        text: "Certainty beats color order. If you can name the exact category and all four members, submit it, even if you suspect it is blue. A confirmed group removes four words of noise from the grid.",
      },
      { type: "h3", text: "Count to four, out loud if needed" },
      {
        type: "paragraph",
        text: "If you have five candidates for one theme, you do not have a group yet; you have a trap. One of the five belongs somewhere else, and finding which one usually cracks a second category at the same time.",
      },
      { type: "h3", text: "Use Shuffle after every solved group" },
      {
        type: "paragraph",
        text: "Position bias is real. Two words sitting side by side feel related even when they are not, and a reshuffle resets that illusion for the remaining tiles.",
      },
      { type: "h3", text: "Save purple for last, unless purple saves you" },
      {
        type: "paragraph",
        text: "The wordplay group is easiest to see once only eight tiles remain. The exception: if you spot the trick early (all palindromes, all missing a letter, all anagrams), lock it in immediately. Spotting purple early is the single strongest move in Connections Unlimited.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-5 — ~180 字，关键词 3 次，对比卡片
  // ─────────────────────────────────────────────────────────────
  {
    id: "vs-nyt",
    number: "05",
    h2: "Connections Unlimited vs the NYT Daily Puzzle",
    blocks: [
      {
        type: "paragraph",
        text: "The two are complements, not rivals. We play the official puzzle every morning too; the daily grid is a shared ritual, and no unlimited mode replicates the fun of comparing results with friends at breakfast. Where Connections Unlimited wins is everything around that ritual: warm-up, practice, and the 23 hours of the day when the official site has nothing new for you.",
      },
      { type: "comparison-cards" },
      {
        type: "paragraph",
        text: "One honest limitation: our archive rotation deliberately excludes the most recent two weeks of puzzles. That protects you from spoiling a daily grid you have not played yet, and it is why you will never see today's board inside Connections Unlimited.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-6 — ~170 字，关键词 2 次，存档内链
  // ─────────────────────────────────────────────────────────────
  {
    id: "past-puzzles",
    number: "06",
    h2: "Practice with Real Past Puzzles",
    blocks: [
      {
        type: "paragraph",
        text: "Because every Connections Unlimited board is a genuine archived puzzle, you can treat this page as a training set with more than 1,100 entries dating back to June 12, 2023. The rotation reshuffles daily and skips boards you have already cleared on this device, so consecutive rounds stay fresh.",
      },
      {
        type: "paragraph",
        text: "Want a specific date instead of a random deal? Our Connections answers archive lists every past puzzle by date with full group breakdowns, and the daily hint page walks you through today's grid without spoiling it. Play here, look up there; the two pages cover both halves of the habit.",
      },
      {
        type: "paragraph",
        text: "Practice on real boards transfers directly to the daily puzzle, because the traps repeat. Editors reuse the same handful of tricks: a group of words that all precede or follow one shared word, categories built on homophones, and the classic five-candidates-for-four-slots overlap. After 30 or 40 archived boards you start recognizing the shape of a trick before you can name the category, which is precisely the skill the daily grid rewards.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // H2-7 — FAQ（数据在 faq.ts，关键词 ~6 次）
  // ─────────────────────────────────────────────────────────────
  {
    id: "faq",
    number: "07",
    h2: "Connections Unlimited FAQ",
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
