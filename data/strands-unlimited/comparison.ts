/**
 * H2-5 对比数据：Strands Unlimited vs NYT 官方每日版
 */

export type ComparisonRow = {
  dimension: string;
  unlimited: string;
  nyt: string;
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Boards per day",
    unlimited: "As many as you want",
    nyt: "One, resets at midnight",
  },
  {
    dimension: "Puzzle source",
    unlimited: "Real archived boards",
    nyt: "Today's editor-made board",
  },
  {
    dimension: "Hints",
    unlimited: "3 per board, outline a word's cells",
    nyt: "Earned by finding non-theme words",
  },
  {
    dimension: "Fail state",
    unlimited: "None, trace until it's solved",
    nyt: "None either",
  },
  {
    dimension: "Spangram",
    unlimited: "Yes, original from each board",
    nyt: "Yes, one per board",
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
