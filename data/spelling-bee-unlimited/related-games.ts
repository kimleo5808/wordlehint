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
    title: "Spelling Bee Hints Today",
    description:
      "Progressive nudges for today's official hive, from word counts down to two-letter openings.",
    href: "/spelling-bee-hints-today",
  },
  {
    label: "Unlimited",
    title: "Wordle Unlimited",
    description:
      "Endless Wordle rounds from 4 to 11 letters. Same no-limit idea, different puzzle.",
    href: "/wordle-unlimited",
  },
  {
    label: "Unlimited",
    title: "Connections Unlimited",
    description:
      "Sort 16 words into four hidden groups, then deal the next board from 1,100+ real archives.",
    href: "/connections-unlimited",
  },
  {
    label: "Unlimited",
    title: "Strands Unlimited",
    description:
      "Trace theme words and the spangram across real past boards with no daily wait.",
    href: "/strands-unlimited",
  },
];
