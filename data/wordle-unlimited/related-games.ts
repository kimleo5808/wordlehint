/**
 * H2-10 Related Games / Keep Playing 数据
 * 4 张卡片网格，引导到站内其他核心页面
 */

export type RelatedGame = {
  label: string; // small caps 标签
  title: string;
  description: string;
  href: string;
};

export const RELATED_GAMES: RelatedGame[] = [
  {
    label: "DAILY",
    title: "Today's Wordle Hint",
    description:
      "Progressive clues for the official NYT puzzle. Refreshes at midnight UTC.",
    href: "/wordle-hint-today",
  },
  {
    label: "TOOL",
    title: "Wordle Solver",
    description:
      "Stuck mid-round? Paste your tile colors and get a short list of likely answers.",
    href: "/wordle-solver",
  },
  {
    label: "PRACTICE",
    title: "5-Letter Wordle",
    description:
      "Dedicated single-length practice room. Same engine, no length switching.",
    href: "/5-letters",
  },
  {
    label: "GUIDE",
    title: "How to Play Wordle",
    description:
      "The full rule set, color logic, and beginner-friendly walkthrough.",
    href: "/how-to-play-wordle",
  },
];
