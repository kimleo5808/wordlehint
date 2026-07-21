/**
 * H2-4 对比数据：Spelling Bee Unlimited vs NYT 官方每日版
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
    nyt: "One, resets at 3 a.m. ET",
  },
  {
    dimension: "Puzzle source",
    unlimited: "900+ real archived hives",
    nyt: "Today's editor-made hive",
  },
  {
    dimension: "Free word limit",
    unlimited: "Full word list, every puzzle",
    nyt: "Free tier cuts off mid-list; subscription to finish",
  },
  {
    dimension: "Past-puzzle archive",
    unlimited: "Included, free",
    nyt: "Games subscription required",
  },
  {
    dimension: "Hints",
    unlimited: "Missing-word grid + two-letter list, free",
    nyt: "Spelling Bee Buddy, subscription required",
  },
  {
    dimension: "Scoring & ranks",
    unlimited: "Identical: 1pt/4-letter, pangram +7, Genius 70%",
    nyt: "The original system",
  },
  {
    dimension: "Progress saving",
    unlimited: "Automatic, in your browser's localStorage",
    nyt: "Tied to your NYT account",
  },
  {
    dimension: "Account needed",
    unlimited: "No",
    nyt: "Yes, plus subscription for full play",
  },
  {
    dimension: "Best used for",
    unlimited: "Practice, binges, Queen Bee chases",
    nyt: "The daily ritual and friend leaderboards",
  },
];
