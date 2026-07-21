/**
 * H2-5 对比数据：Connections Unlimited vs NYT 官方每日版
 */

export type ComparisonRow = {
  dimension: string;
  unlimited: string;
  nyt: string;
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Puzzles per day",
    unlimited: "As many as you want",
    nyt: "One, resets at midnight",
  },
  {
    dimension: "Puzzle source",
    unlimited: "1,100+ real archived boards",
    nyt: "Today's editor-made board",
  },
  {
    dimension: "Hints",
    unlimited: "3-stage progressive hints, built in",
    nyt: "None on the board",
  },
  {
    dimension: "Mistakes allowed",
    unlimited: "Four",
    nyt: "Four",
  },
  {
    dimension: "Repeat-guess penalty",
    unlimited: "None, repeats are flagged free",
    nyt: "None, repeats are flagged free",
  },
  {
    dimension: "Spoiler risk",
    unlimited: "Zero, recent 14 days excluded",
    nyt: "It IS the puzzle everyone spoils",
  },
  {
    dimension: "Account needed",
    unlimited: "No",
    nyt: "Free account for streaks",
  },
  {
    dimension: "Best used for",
    unlimited: "Practice, binges, warm-ups",
    nyt: "The daily ritual with friends",
  },
];
