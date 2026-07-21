/**
 * H2-8 相关游戏 4 卡片（strands-unlimited）
 */

export type RelatedGame = {
  label: string;
  title: string;
  description: string;
  href: string;
};

export const RELATED_GAMES: RelatedGame[] = [
  {
    label: "Daily helper",
    title: "Strands Hint Today",
    description:
      "Stuck on today's official board? Spangram and theme-word help, one reveal at a time.",
    href: "/strands-hint-today",
  },
  {
    label: "Archive",
    title: "Strands Answers",
    description:
      "Every past board by date, with the full word list, spangram, and editor credit.",
    href: "/strands-answers",
  },
  {
    label: "Unlimited",
    title: "Connections Unlimited",
    description:
      "1,100+ real grouping puzzles with progressive hints. Same no-limit idea, different game.",
    href: "/connections-unlimited",
  },
  {
    label: "Unlimited",
    title: "Wordle Unlimited",
    description:
      "Endless Wordle rounds from 4 to 11 letters, with hard mode and daily hint integration.",
    href: "/wordle-unlimited",
  },
];
