/**
 * H2-8 相关游戏 4 卡片
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
    title: "Connections Hint Today",
    description:
      "Stuck on today's official grid? Progressive nudges that never spoil more than you ask for.",
    href: "/connections-hint-today",
  },
  {
    label: "Archive",
    title: "Connections Answers",
    description:
      "Every past puzzle by date, with full category breakdowns and all four groups revealed.",
    href: "/connections-answers",
  },
  {
    label: "Unlimited",
    title: "Wordle Unlimited",
    description:
      "Endless Wordle rounds from 4 to 11 letters. Same no-limit idea, different puzzle.",
    href: "/wordle-unlimited",
  },
  {
    label: "Daily helper",
    title: "Strands Hint Today",
    description:
      "Theme clues and spangram help for today's NYT Strands board, one reveal at a time.",
    href: "/strands-hint-today",
  },
];
