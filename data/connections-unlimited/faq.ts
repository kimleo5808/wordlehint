/**
 * H2-7 FAQ 8 题数据
 *
 * 覆盖六个原型问题：免费/注册、与 NYT 关系、错误机制、提升方法、
 * 玩完去哪、数据来源。关键词 "Connections Unlimited" 自然分布 ~7 次。
 */

export type FaqItem = {
  number: string; // "01" ~ "08"
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "Is Connections Unlimited free?",
    answer:
      "Free, with no account, no email, and no download. Open the page, tap four words, play. Your stats live in your own browser, not on our servers.",
  },
  {
    number: "02",
    question: "Is this the official NYT Connections?",
    answer:
      "No. The New York Times owns Connections and publishes one new puzzle per day. Connections Unlimited is an independent practice build that uses the same 16-word, four-group format with archived puzzle data. The two are not affiliated.",
  },
  {
    number: "03",
    question: "What happens when I make a wrong guess?",
    answer:
      "You lose one of four mistakes, shown as dots under the grid. If exactly three of your four words belonged together, the board says you were one away, which is a strong clue in itself. Repeating a combination you already tried costs nothing.",
  },
  {
    number: "04",
    question: "How do the hints work?",
    answer:
      "The hint button reveals information about the easiest unsolved group in three stages: first letters of its four words, then the category name, then one highlighted member. Hints never cost a mistake, but your results card notes how many you used.",
  },
  {
    number: "05",
    question: "Can I play today's puzzle here?",
    answer:
      "Deliberately not. Connections Unlimited excludes the most recent 14 days of puzzles so it can never spoil a daily grid you have not played. For today's board, our Connections hint page walks you through it one nudge at a time.",
  },
  {
    number: "06",
    question: "Where do the puzzles come from?",
    answer:
      "From our archive of more than 1,100 real past puzzles dating back to June 12, 2023, the very first Connections grid. Each rotation serves 120 of them, resampled every day, and skips boards you have already cleared on this device.",
  },
  {
    number: "07",
    question: "How do I get better at Connections Unlimited?",
    answer:
      "Volume plus one habit: before your first guess, find the trap words that fit two categories. Most boards are built around two or three of them. The strategy section above breaks down five habits, and twenty practice boards here teach more than a month of daily play.",
  },
  {
    number: "08",
    question: "Does Connections Unlimited work on my phone?",
    answer:
      "Yes. The grid is touch-first: 4 columns at every screen size with tap targets around 56 pixels tall. It plays the same in Safari, Chrome, and every other modern mobile browser, no app required.",
  },
];
