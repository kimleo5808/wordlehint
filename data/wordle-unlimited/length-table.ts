/**
 * H2-3 Choose Your Word Length 数据表
 *
 * 8 行数据：4-letter 到 11-letter
 * 每行包含字典规模、难度（ASCII 方块数 0-8）、推荐起手词、内链路径
 */

export type LengthRow = {
  length: number;
  label: string; // "4-letter" / "5-letter" / ...
  dictionarySize: string; // "~4,000"
  difficultyBars: number; // 1-8（用于 ASCII 视觉条）
  difficultyLabel: string; // "Warm-up" / "Standard" / etc
  starterWord: string; // 推荐起手词
  starterReason: string; // 起手词理由（一句话）
  slug: string; // 内链目标
  averageSolveGuesses: string; // 平均所需猜测数
};

export const LENGTH_TABLE: LengthRow[] = [
  {
    length: 4,
    label: "4-letter",
    dictionarySize: "~4,000",
    difficultyBars: 1,
    difficultyLabel: "Warm-up",
    starterWord: "LANE",
    starterReason: "Covers two top-frequency consonants plus the most common vowel.",
    slug: "/4-letters",
    averageSolveGuesses: "2-3",
  },
  {
    length: 5,
    label: "5-letter",
    dictionarySize: "~13,000",
    difficultyBars: 3,
    difficultyLabel: "Standard",
    starterWord: "CRANE",
    starterReason: "Three of the five most common Wordle letters in one guess.",
    slug: "/5-letters",
    averageSolveGuesses: "3-4",
  },
  {
    length: 6,
    label: "6-letter",
    dictionarySize: "~22,000",
    difficultyBars: 4,
    difficultyLabel: "Stretch",
    starterWord: "CLERIC",
    starterReason: "Hits the C, L, E, R, I cluster that dominates six-letter English.",
    slug: "/6-letters",
    averageSolveGuesses: "4-5",
  },
  {
    length: 7,
    label: "7-letter",
    dictionarySize: "~28,000",
    difficultyBars: 5,
    difficultyLabel: "Challenging",
    starterWord: "STRANGE",
    starterReason: "Burns the S-T-R prefix and three vowels in one shot.",
    slug: "/7-letters",
    averageSolveGuesses: "5-6",
  },
  {
    length: 8,
    label: "8-letter",
    dictionarySize: "~25,000",
    difficultyBars: 6,
    difficultyLabel: "Tough",
    starterWord: "STRAINER",
    starterReason: "Eight letters of high-frequency, low-overlap territory.",
    slug: "/8-letters",
    averageSolveGuesses: "5-6",
  },
  {
    length: 9,
    label: "9-letter",
    dictionarySize: "~18,000",
    difficultyBars: 7,
    difficultyLabel: "Hard",
    starterWord: "IMPORTANT",
    starterReason: "Mixes M, P, R, T with three different vowels.",
    slug: "/9-letters",
    averageSolveGuesses: "6+",
  },
  {
    length: 10,
    label: "10-letter",
    dictionarySize: "~12,000",
    difficultyBars: 7,
    difficultyLabel: "Hard",
    starterWord: "UNIVERSITY",
    starterReason: "Covers four vowels and the productive -ITY ending.",
    slug: "/10-letters",
    averageSolveGuesses: "6+",
  },
  {
    length: 11,
    label: "11-letter",
    dictionarySize: "~6,500",
    difficultyBars: 8,
    difficultyLabel: "Expert",
    starterWord: "IMPORTANTLY",
    starterReason: "Most expert players need every one of the six guesses here.",
    slug: "/11-letters",
    averageSolveGuesses: "6+",
  },
];
