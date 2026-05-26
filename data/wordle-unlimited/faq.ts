/**
 * H2-9 FAQ 14 题数据
 *
 * 写作守则：
 *  - 题目句式多样化（避免 14 题全是 Can I... / Is...）
 *  - 答案长度刻意不均（20-100 词）
 *  - 至少 60% 含具体数字/品牌名/词例
 *  - 不全部 "Yes," 开头
 *  - 关键词 "Wordle Unlimited" 自然分布约 19 次
 */

export type FaqItem = {
  number: string; // "01" ~ "14"
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: "01",
    question: "Is Wordle Unlimited free to play?",
    answer:
      "Free. No ads, no signup, no in-game purchases, and we don't ask for your email.",
  },
  {
    number: "02",
    question: "Is Wordle Unlimited the same as the official NYT Wordle?",
    answer:
      "No. The New York Times owns the original Wordle and ships one puzzle per day. Wordle Unlimited is an independent build that reuses the same six-guess color-feedback mechanic but runs its own dictionary and lets you play continuously. The two are not affiliated.",
  },
  {
    number: "03",
    question: "Can I play Wordle Unlimited at school or work?",
    answer:
      "In most cases yes. Wordle Unlimited runs entirely in the browser, requires no signup, and uses no Flash or other blocked technology. The page weighs roughly 80KB on first load, which gets through almost every school and corporate firewall that allows general web traffic. Some networks block the wordlehint.info domain at the category level, but if you can read this paragraph, you can play.",
  },
  {
    number: "04",
    question: "How many guesses do I get in each round?",
    answer:
      "Six. Wordle Unlimited shows the answer on row seven if you miss, then offers another round.",
  },
  {
    number: "05",
    question: "What word lengths can I play?",
    answer:
      "Four through eleven letters, eight modes total. Use the chip row above the keyboard to switch lengths inside Wordle Unlimited, or open the dedicated practice pages at /4-letters through /11-letters for a single-length deep dive.",
  },
  {
    number: "06",
    question: "Does Wordle Unlimited have hard mode?",
    answer:
      "Yes. Toggle it from the mode pill row above the keyboard. Hard Mode requires every confirmed letter from a prior guess to appear in your next guess. Same rule the official Wordle uses.",
  },
  {
    number: "07",
    question: "Where do the answers come from?",
    answer:
      "Our 5-letter pool starts from the Scrabble TWL list, then we strip plurals ending in -S that have a base form in the same pool, past tenses ending in -ED that already exist in their base form, and proper nouns or brand names. The 4-letter and 6-through-11-letter pools follow the same logic with length-appropriate caps. The Wordle Unlimited dictionary does not use the NYT solution list.",
  },
  {
    number: "08",
    question: "Does Wordle Unlimited save my stats?",
    answer:
      "Your streak, win rate, and average guess count are stored in your browser's localStorage. Clearing your cache, switching to incognito, or moving to a new device will reset them. We don't sync stats server-side because that would require an account, which Wordle Unlimited deliberately avoids.",
  },
  {
    number: "09",
    question: "Can I share my Wordle Unlimited results?",
    answer:
      "Yes. The clipboard icon next to the puzzle number copies a Wordle-style color grid plus the date and your guess count. Paste it into any text field. The format is identical to the official Wordle share string, so your friends will read it the same way.",
  },
  {
    number: "10",
    question: "Is it safe for kids?",
    answer:
      "Content is all-ages. The dictionary excludes profanity and brand names. We recommend ages 8 and up for the 5-letter mode and ages 6 and up for the 4-letter mode. There are no ads, no chat, and no third-party tracking inside Wordle Unlimited.",
  },
  {
    number: "11",
    question: "Does it work on mobile?",
    answer:
      "Yes. The board scales to your screen, the on-screen keyboard handles input, and Wordle Unlimited weighs in at roughly 80KB on first paint. Tested on iOS Safari, Chrome Android, and Samsung Internet.",
  },
  {
    number: "12",
    question: "What's the difference between Wordle Unlimited and infinite Wordle?",
    answer:
      "They are usually the same thing. Different sites use different labels for the same idea: a Wordle clone without the once-per-day limit. We use Wordle Unlimited because that's the search term most players type.",
  },
  {
    number: "13",
    question: "Why did my streak reset?",
    answer:
      "Browser localStorage got cleared. Common causes: incognito mode, manually clearing cookies, switching devices, or a browser extension that scrubs site data on close. Wordle Unlimited can't recover the streak because we never store it server-side. Trade-off for not requiring an account.",
  },
  {
    number: "14",
    question: "Can I use the Wordle Hint Today page with this?",
    answer:
      "That is the design. Practice unlimited rounds here, then open /wordle-hint-today for the daily NYT puzzle's progressive hints. Most regulars play two or three Wordle Unlimited rounds first, read the first hint, then attempt the official puzzle. The two pages are designed to live in adjacent tabs.",
  },
];
