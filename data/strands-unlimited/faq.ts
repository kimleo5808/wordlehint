/**
 * H2-7 FAQ 8 题数据（strands-unlimited）
 * 关键词 "Strands Unlimited" 自然分布 ~6 次。
 */

export type FaqItem = {
  number: string; // "01" ~ "08"
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "Is Strands Unlimited free?",
    answer:
      "Free, with no account, no email, and nothing to install. Open the page, read the clue, start tracing. Your progress and board count live in your own browser, not on our servers.",
  },
  {
    number: "02",
    question: "Is this the official NYT Strands?",
    answer:
      "No. The New York Times owns Strands and publishes one new board per day. Strands Unlimited is an independent practice build that uses the same 6-by-8, clue-and-spangram format with archived puzzle data. The two are not affiliated.",
  },
  {
    number: "03",
    question: "How do the hints work?",
    answer:
      "You get 3 hints per board. Each one outlines the cells of one theme word you have not found yet, without revealing the letters' order. Hints never end your game, and your results card notes how many you used.",
  },
  {
    number: "04",
    question: "What exactly is a spangram?",
    answer:
      "The one answer that describes the theme itself and touches two opposite sides of the board. It locks in yellow instead of blue, usually runs 8 to 12 letters, and is often a two-word phrase written without a space. Finding it early makes the rest of the board far easier.",
  },
  {
    number: "05",
    question: "Can I play today's puzzle here?",
    answer:
      "Deliberately not. Strands Unlimited excludes the most recent 14 days of boards so it can never spoil a daily puzzle you have not opened. For today's board, our Strands hint page reveals help one step at a time.",
  },
  {
    number: "06",
    question: "Where do the boards come from?",
    answer:
      "From our archive of real past puzzles, updated automatically every day. Each board keeps its original clue, letter layout, spangram, and editor credit, so the difficulty curve matches the genuine daily experience.",
  },
  {
    number: "07",
    question: "Is there a penalty for wrong guesses?",
    answer:
      "None. Unlike Wordle's six guesses or Connections' four mistakes, Strands has no fail state. A trace that isn't a theme word simply clears, and you try again. The only currencies are your time and your 3 hints.",
  },
  {
    number: "08",
    question: "Does Strands Unlimited work well on a phone?",
    answer:
      "Yes, arguably better than on desktop. The board is drag-first: slide your finger across letters to trace a word and release to submit, or tap letters one at a time. It works in Safari, Chrome, and every modern mobile browser.",
  },
];
