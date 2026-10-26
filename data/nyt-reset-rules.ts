import type { ResetRule } from "@/lib/reset-times";

/**
 * When each NYT game puts out a new puzzle, with the exact wording of the
 * source and the date we last checked it. Eastern times follow New York's
 * clock (daylight saving included); NYT's help pages write "EST" all year.
 * Read by /nyt-games-reset-times and the countdown on /wordle-hint-today.
 */

export const RESET_RULES_VERIFIED = "2026-10-26";

const HELP = "https://help.nytimes.com/360011158491-New-York-Times-Games";

/** Crossword, Midi, Sudoku: Tue–Sat puzzles at 10 p.m. the previous day,
 *  Sun and Mon puzzles at 6 p.m. the previous day (index = weekday of the
 *  evening, 0 = Sunday). */
const CROSSWORD_EVENINGS = [18, 22, 22, 22, 22, 22, 18];
/** The Mini per NYT's help page: Mon–Sat puzzles at 10 p.m. the previous
 *  day, Sunday's at 6 p.m. on Saturday. */
const MINI_EVENINGS = [22, 22, 22, 22, 22, 22, 18];

export interface NytResetGame {
  /** Anchor on the reset-times page. */
  id: string;
  name: string;
  rule: ResetRule;
  /** The rule in words, independent of the reader's time zone. */
  summary: string;
  source: { name: string; url: string; quote: string };
  verified: string;
  /** Our page for today's puzzle, if we have one. */
  todayHref?: string;
}

export const NYT_RESET_GAMES: NytResetGame[] = [
  {
    id: "wordle",
    name: "Wordle",
    rule: { kind: "local-midnight" },
    summary: "Midnight, your local time",
    source: { name: "NYT Help: Wordle", url: `${HELP}/24611727334932-Wordle`, quote: "The daily Wordle game releases at midnight in your timezone." },
    verified: RESET_RULES_VERIFIED,
    todayHref: "/wordle-hint-today",
  },
  {
    id: "connections",
    name: "Connections",
    rule: { kind: "local-midnight" },
    summary: "Midnight, your local time",
    source: { name: "NYT Help: Connections", url: `${HELP}/28525912587924-Connections`, quote: "The daily Connections game is released daily at midnight in your timezone." },
    verified: RESET_RULES_VERIFIED,
    todayHref: "/connections-hint-today",
  },
  {
    id: "strands",
    name: "Strands",
    rule: { kind: "local-midnight" },
    summary: "Midnight, your local time",
    source: { name: "NYT Help: Strands", url: `${HELP}/28214352967700-Strands`, quote: "The daily Strands puzzle releases at midnight in your timezone." },
    verified: RESET_RULES_VERIFIED,
    todayHref: "/strands-hint-today",
  },
  {
    id: "pips",
    name: "Pips",
    rule: { kind: "local-midnight" },
    summary: "Midnight, your local time (all three difficulties)",
    source: { name: "NYT Help: Pips", url: `${HELP}/pips`, quote: "New puzzles are published every day at midnight, local to the player's time zone." },
    verified: RESET_RULES_VERIFIED,
    todayHref: "/pips-hint-today",
  },
  {
    id: "sports-connections",
    name: "Connections: Sports Edition",
    rule: { kind: "local-midnight" },
    summary: "Midnight, your local time",
    source: {
      name: "MediaPost, launch report (Jan 2025)",
      url: "https://www.mediapost.com/publications/article/402976/the-athletic-extends-the-connections-game-to-spo.html",
      quote: "New challenges will be posted every day at midnight local time.",
    },
    verified: RESET_RULES_VERIFIED,
  },
  {
    id: "spelling-bee",
    name: "Spelling Bee",
    rule: { kind: "et-daily", hour: 3 },
    summary: "3 a.m. Eastern, every day",
    source: { name: "NYT Help: Spelling Bee", url: `${HELP}/23675493312404-Spelling-Bee`, quote: "New Spelling Bee puzzles are released at 3 a.m. EST every day of the week." },
    verified: RESET_RULES_VERIFIED,
    todayHref: "/spelling-bee-hints-today",
  },
  {
    id: "letter-boxed",
    name: "Letter Boxed",
    rule: { kind: "et-daily", hour: 3 },
    summary: "3 a.m. Eastern, every day",
    source: { name: "NYT Help: Letter Boxed", url: `${HELP}/28527193547028-Letter-Boxed`, quote: "Letter Boxed puzzles are released at 3 a.m EST every day of the week." },
    verified: RESET_RULES_VERIFIED,
  },
  {
    id: "tiles",
    name: "Tiles",
    rule: { kind: "et-daily", hour: 0 },
    summary: "Midnight Eastern, every day",
    source: { name: "NYT Help: Tiles", url: `${HELP}/360029050872-Tiles`, quote: "The tile set rotates daily at 12 a.m EST." },
    verified: RESET_RULES_VERIFIED,
  },
  {
    id: "crossword",
    name: "The Crossword",
    rule: { kind: "et-evening", hours: CROSSWORD_EVENINGS },
    summary: "The evening before: 10 p.m. Eastern (6 p.m. for Sunday and Monday puzzles)",
    source: {
      name: "NYT Help: The Crossword",
      url: `${HELP}/360052406391-The-New-York-Times-Crossword-Puzzle`,
      quote: "Tuesday - Saturday puzzles are available at 10 p.m. EST the previous day. Sunday and Monday puzzles are available at 6 p.m. EST the previous day.",
    },
    verified: RESET_RULES_VERIFIED,
  },
  {
    id: "midi",
    name: "The Midi",
    rule: { kind: "et-evening", hours: CROSSWORD_EVENINGS },
    summary: "The evening before: 10 p.m. Eastern (6 p.m. for Sunday and Monday puzzles)",
    source: {
      name: "NYT Help: The Midi",
      url: `${HELP}/the-midi-crossword`,
      quote: "Tuesday through Saturday puzzles are available at 10 p.m. E.T. the previous day. Sunday and Monday puzzles are available at 6 p.m. E.T. the previous day.",
    },
    verified: RESET_RULES_VERIFIED,
  },
  {
    id: "mini",
    name: "The Mini",
    rule: { kind: "et-evening", hours: MINI_EVENINGS },
    summary: "The evening before: 10 p.m. Eastern (6 p.m. Saturday for the Sunday puzzle)",
    source: {
      name: "NYT Help: The Mini",
      url: `${HELP}/360025912452-The-Mini-Crossword`,
      quote: "Weekday and Saturday puzzles are available at 10 p.m. EST the previous day. Sunday puzzles are available at 6 p.m. EST on Saturday.",
    },
    verified: RESET_RULES_VERIFIED,
  },
  {
    id: "sudoku",
    name: "Sudoku",
    rule: { kind: "et-evening", hours: CROSSWORD_EVENINGS },
    summary: "The evening before: 10 p.m. Eastern (6 p.m. for Sunday and Monday puzzles)",
    source: {
      name: "NYT Help: Sudoku",
      url: `${HELP}/30467696592148-Sudoku`,
      quote: "Sudoku puzzles are released Tuesday - Saturday at 10 p.m. EST; Sunday-Monday at 6 p.m. EST.",
    },
    verified: RESET_RULES_VERIFIED,
  },
  {
    id: "bonus-puzzles",
    name: "Bonus Puzzles",
    rule: { kind: "local-weekly", weekday: 3 },
    summary: "Wednesdays at midnight, your local time",
    source: { name: "NYT Help: Bonus Puzzles", url: `${HELP}/bonus-puzzles`, quote: "Bonus puzzles are released weekly on Wednesdays at midnight in your time zone." },
    verified: RESET_RULES_VERIFIED,
  },
];

export const VERTEX_NOTE = {
  url: `${HELP}/28624146433300-Vertex`,
  quote: "We’ve made the difficult decision to discontinue Vertex. The last puzzle was published on August 29th, 2024.",
};
