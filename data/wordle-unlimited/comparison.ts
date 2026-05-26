/**
 * H2-5 Wordle Unlimited vs NYT Wordle 对比数据
 * 8 维度对比，用于 <ComparisonCards> 组件
 */

export type ComparisonRow = {
  dimension: string;
  unlimited: string;
  nyt: string;
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Plays per day",
    unlimited: "Unlimited",
    nyt: "1",
  },
  {
    dimension: "Word length",
    unlimited: "4–11 letters",
    nyt: "5 only",
  },
  {
    dimension: "Hard mode",
    unlimited: "Yes",
    nyt: "Yes",
  },
  {
    dimension: "Stats storage",
    unlimited: "Local browser",
    nyt: "NYT account",
  },
  {
    dimension: "Hint system",
    unlimited: "Built-in (today's hint)",
    nyt: "Third-party only",
  },
  {
    dimension: "Cost",
    unlimited: "Free",
    nyt: "Free (with limits)",
  },
  {
    dimension: "Account required",
    unlimited: "No",
    nyt: "Optional",
  },
  {
    dimension: "Color-blind mode",
    unlimited: "Yes",
    nyt: "Yes",
  },
];
