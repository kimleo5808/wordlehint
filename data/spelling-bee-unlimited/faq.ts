/**
 * H2-7 FAQ 8 题数据
 *
 * 覆盖八个原型问题：免费/广告、题目来源、计分口径、词表口径、
 * 存档机制、与 NYT 关系、提示用法、每日局数。
 * 关键词 "Spelling Bee Unlimited" 自然分布 ~5 次。
 */

export type FaqItem = {
  number: string; // "01" ~ "08"
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "Is Spelling Bee Unlimited free? Are the hints behind ads?",
    answer:
      "Free, with no account, no email, and no download. Both hint layers, the missing-word grid and the two-letter list, are free too; nothing on this page is locked behind a reward video or a subscription.",
  },
  {
    number: "02",
    question: "Where do the puzzles come from?",
    answer:
      "From our archive of more than 900 real past hive puzzles, each with its original curated word list and pangrams. The rotation deliberately excludes the most recent 14 days, so a practice round here can never spoil a daily puzzle you have not opened yet.",
  },
  {
    number: "03",
    question: "Is the scoring the same as the official game?",
    answer:
      "Identical. Four-letter words score 1 point, longer words score their letter count, and a pangram adds a 7-point bonus on top. Ranks are percentages of each puzzle's maximum score, with Genius at 70% and Queen Bee at 100%, so the thresholds shift from hive to hive exactly as they do in the original.",
  },
  {
    number: "04",
    question: "Why was my word not accepted?",
    answer:
      "Each hive checks guesses against its original curated answer list, not a raw dictionary. The editors exclude proper nouns, hyphenated words, most obscenities, and plenty of technical obscurities, so a word can be in Scrabble dictionaries and still be off the list. The upside is consistency: the same word is judged the same way every round.",
  },
  {
    number: "05",
    question: "Does my progress save if I close the tab?",
    answer:
      "Yes. Your found words, current score, and stats are stored in your browser's localStorage, so you can leave a half-finished hive at Solid and come back to it hours later. Clearing site data or switching devices resets it, since nothing is kept on our servers.",
  },
  {
    number: "06",
    question: "Is this the official NYT Spelling Bee?",
    answer:
      "No. Spelling Bee is owned and published by The New York Times, one new puzzle per day. Spelling Bee Unlimited is an independent fan-made practice build that uses the same seven-letter format with archived puzzle data. The two are not affiliated in any way.",
  },
  {
    number: "07",
    question: "How do the hints work?",
    answer:
      "In two progressive stages. The first opens the missing-word grid: a table of how many undiscovered words start with each letter at each length. The second lists the two-letter openings of every remaining word. Neither stage reveals a full answer, and your results card simply notes whether you used them.",
  },
  {
    number: "08",
    question: "How many puzzles can I play per day?",
    answer:
      "As many as you want. Spelling Bee Unlimited has no daily cap, no cooldown, and no energy meter; when one hive ends, tap New Puzzle and the next of the 900+ archived boards deals instantly. The only limit is your appetite for pangrams.",
  },
];
