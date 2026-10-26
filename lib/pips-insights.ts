import { cache } from "react";
import { hasPipsDatePage } from "@/lib/date-pages";
import { getAllPips, getArchivePips } from "@/lib/pips-daily";
import { cellValues, describeCell, getBoardSize } from "@/lib/pips-hints";
import { regionColours } from "@/lib/pips-palette";
import type { PipsBoard, PipsCell, PipsDifficulty, PipsPuzzle, PipsRegion } from "@/types/pips";

/**
 * Per-puzzle Pips text and comparisons, all computed from the data: the
 * answer region by region, how a board compares with every earlier board of
 * the same difficulty, rare-board highlights, and the hub's record tables.
 * Comparisons only look at boards *before* the puzzle's date, so a
 * published page never changes.
 */

export const PIPS_LEVELS: PipsDifficulty[] = ["easy", "medium", "hard"];
export const PIPS_LABEL: Record<PipsDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const key = ([r, c]: PipsCell) => `${r},${c}`;
const readingOrder = (a: PipsCell, b: PipsCell) => a[0] - b[0] || a[1] - b[1];
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const dominoes = (n: number) => `${n} domino${n === 1 ? "" : "es"}`;

export function pct(x: number): string {
  if (x > 0 && x < 0.01) return "under 1%";
  return `${Math.round(x * 100)}%`;
}

function ordinal(n: number): string {
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${s}`;
}

const isOneSquareSum = (r: PipsRegion) => r.type === "sum" && r.indices.length === 1;

/** Every region is a single numbered square — the board is a number grid. */
export function isAllSingleSquares(board: PipsBoard): boolean {
  return board.regions.every(isOneSquareSum);
}

// ---------------------------------------------------------------------------
// The answer, region by region

export interface PipsRegionAnswer {
  colour: string;
  fill: string;
  /** The badge as drawn on the board: "10", "=", "≠", "<4", ">8", "" (empty). */
  badge: string;
  rule: string;
  start: string;
  size: number;
  answer: string;
}

function badgeOf(r: PipsRegion): string {
  switch (r.type) {
    case "sum": return String(r.target);
    case "equals": return "=";
    case "unequal": return "≠";
    case "less": return `<${r.target}`;
    case "greater": return `>${r.target}`;
    default: return "";
  }
}

function ruleOf(r: PipsRegion): string {
  switch (r.type) {
    case "sum": return r.indices.length === 1 ? `shows ${r.target}` : `adds up to ${r.target}`;
    case "equals": return "all the same";
    case "unequal": return "all different";
    case "less": return `total under ${r.target}`;
    case "greater": return `total over ${r.target}`;
    default: return "no condition";
  }
}

/** Each region with the numbers NYT's solution puts in it, in reading order
 *  of the region's first square (where its badge sits). */
export function getRegionAnswers(board: PipsBoard): PipsRegionAnswer[] {
  const values = cellValues(board);
  const colours = regionColours(board);
  return board.regions
    .map((r, i) => {
      const cells = [...r.indices].sort(readingOrder);
      const vals = cells.map((c) => values.get(key(c)) ?? 0);
      const total = vals.reduce((a, b) => a + b, 0);
      let answer: string;
      if (vals.length === 1) answer = String(vals[0]);
      else if (r.type === "sum" || r.type === "less" || r.type === "greater") answer = `${vals.join(" + ")} = ${total}`;
      else answer = vals.join(", ");
      return {
        first: cells[0],
        colour: colours[i].name,
        fill: colours[i].fill,
        badge: badgeOf(r),
        rule: ruleOf(r),
        start: describeCell(cells[0]),
        size: cells.length,
        answer,
      };
    })
    .sort((a, b) => readingOrder(a.first, b.first))
    .map(({ first: _first, ...rest }) => rest);
}

/** For an all-single-square board: the numbers row by row (null = no square). */
export function singleSquareGrid(board: PipsBoard): (number | null)[][] | null {
  if (!isAllSingleSquares(board)) return null;
  const values = cellValues(board);
  const { rows, cols } = getBoardSize(board);
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => values.get(`${r},${c}`) ?? null)
  );
}

/** "6 sums · 2 equal · 1 not equal · 3 empty". */
export function regionMixText(board: PipsBoard): string {
  const n = (t: PipsRegion["type"]) => board.regions.filter((r) => r.type === t).length;
  const parts = [
    [n("sum"), n("sum") === 1 ? "sum" : "sums"],
    [n("equals"), "equal"],
    [n("unequal"), "not equal"],
    [n("less") + n("greater"), "less / greater"],
    [n("empty"), "empty"],
  ] as const;
  return parts.filter(([count]) => count > 0).map(([count, label]) => `${count} ${label}`).join(" · ");
}

/** "Easy by Ian Livengood; Medium and Hard by Rodolfo Kurchan". */
export function creditLine(puzzle: PipsPuzzle): string {
  const groups = new Map<string, string[]>();
  for (const l of PIPS_LEVELS) {
    const name = puzzle[l].constructors || "NYT";
    groups.set(name, [...(groups.get(name) ?? []), PIPS_LABEL[l]]);
  }
  if (groups.size === 1) return `all three boards by ${[...groups.keys()][0]}`;
  return [...groups.entries()]
    .map(([name, levels]) => `${levels.join(" and ")} by ${name}`)
    .join("; ");
}

// ---------------------------------------------------------------------------
// How a board compares with earlier boards of the same difficulty

interface BoardMetrics {
  dominoes: number;
  oneSquare: number;
  compare: number;
  doubles: number;
  straddle: number;
  largestRegion: number;
}

function metrics(b: PipsBoard): BoardMetrics {
  const regionOf = new Map<string, number>();
  b.regions.forEach((r, i) => r.indices.forEach((c) => regionOf.set(key(c), i)));
  const straddling = b.solution.filter(([a, c]) => regionOf.get(key(a)) !== regionOf.get(key(c))).length;
  return {
    dominoes: b.dominoes.length,
    oneSquare: b.regions.filter(isOneSquareSum).length,
    compare: b.regions.filter((r) => r.type === "less" || r.type === "greater").length,
    doubles: b.dominoes.filter(([x, y]) => x === y).length,
    straddle: straddling / Math.max(1, b.dominoes.length),
    largestRegion: Math.max(...b.regions.map((r) => r.indices.length)),
  };
}

const earlierMetrics = cache((date: string, level: PipsDifficulty): BoardMetrics[] =>
  getAllPips()
    .filter((p) => p.date < date)
    .map((p) => metrics(p[level]))
);

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);

export interface PipsComparisonRow {
  value: string;
  average: string;
}

export interface PipsComparison {
  level: PipsDifficulty;
  pool: number;
  rows: {
    dominoes: PipsComparisonRow;
    oneSquare: PipsComparisonRow;
    compare: PipsComparisonRow;
    doubles: PipsComparisonRow;
    straddle: PipsComparisonRow;
  };
  /** One factual sentence: size percentile + where it stands on start squares. */
  sentence: string;
}

export function comparePipsBoard(puzzle: PipsPuzzle, level: PipsDifficulty): PipsComparison {
  const m = metrics(puzzle[level]);
  const pool = earlierMetrics(puzzle.date, level);
  const label = PIPS_LABEL[level];
  const avg = (f: (x: BoardMetrics) => number) => mean(pool.map(f));

  let size = "";
  if (pool.length) {
    const counts = new Map<number, number>();
    for (const p of pool) counts.set(p.dominoes, (counts.get(p.dominoes) ?? 0) + 1);
    const mode = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const below = pool.filter((p) => p.dominoes < m.dominoes).length / pool.length;
    const above = pool.filter((p) => p.dominoes > m.dominoes).length / pool.length;
    if (m.dominoes === mode) {
      size = `the most common ${label} size (${pct((counts.get(mode) ?? 0) / pool.length)} of earlier ${label} boards)`;
    } else if (below >= above) {
      size = `more than ${pct(below)} of the ${pool.length} ${label} boards before it`;
    } else {
      size = `fewer than ${pct(above)} of the ${pool.length} ${label} boards before it`;
    }
  }

  const noStart = pool.filter((p) => p.oneSquare === 0).length / Math.max(1, pool.length);
  const start =
    m.oneSquare === 0
      ? `It has no one-square region, so there's no free starting square — true of ${pct(noStart)} of earlier ${label} boards.`
      : `It has ${plural(m.oneSquare, "one-square region")} to start from (average ${avg((x) => x.oneSquare).toFixed(1)}).`;

  return {
    level,
    pool: pool.length,
    rows: {
      dominoes: { value: String(m.dominoes), average: avg((x) => x.dominoes).toFixed(1) },
      oneSquare: { value: String(m.oneSquare), average: avg((x) => x.oneSquare).toFixed(1) },
      compare: { value: String(m.compare), average: avg((x) => x.compare).toFixed(1) },
      doubles: { value: String(m.doubles), average: avg((x) => x.doubles).toFixed(1) },
      straddle: { value: pct(m.straddle), average: pct(avg((x) => x.straddle)) },
    },
    sentence: `${label}: ${dominoes(m.dominoes)}${size ? ` — ${size}` : ""}. ${start}`,
  };
}

// ---------------------------------------------------------------------------
// Highlights: what's unusual about a puzzle (rare features only)

export interface PipsHighlight {
  level: PipsDifficulty;
  /** Short chip text. */
  short: string;
  /** Full sentence. */
  text: string;
}

const allSingleDates = cache((): { date: string; level: PipsDifficulty }[] =>
  getAllPips().flatMap((p) =>
    PIPS_LEVELS.filter((l) => isAllSingleSquares(p[l])).map((level) => ({ date: p.date, level }))
  )
);

export function getPipsHighlights(puzzle: PipsPuzzle): PipsHighlight[] {
  const out: PipsHighlight[] = [];
  for (const level of [...PIPS_LEVELS].reverse()) {
    const label = PIPS_LABEL[level];
    const board = puzzle[level];
    const m = metrics(board);
    const pool = earlierMetrics(puzzle.date, level);
    if (!pool.length) continue;

    if (isAllSingleSquares(board)) {
      const n = allSingleDates().findIndex((x) => x.date === puzzle.date && x.level === level) + 1;
      out.push({
        level,
        short: `${label}: every square is its own region`,
        text: `${label} is a pure number grid: all ${board.regions.length} regions are single squares, the ${ordinal(n)} board like this since Pips launched.`,
      });
    }

    const max = Math.max(...pool.map((p) => p.dominoes));
    const min = Math.min(...pool.map((p) => p.dominoes));
    if (m.dominoes > max) {
      out.push({ level, short: `${label}: most dominoes yet`, text: `${label} has ${m.dominoes} dominoes, more than any earlier ${label} board (the old record was ${max}).` });
    } else if (m.dominoes < min) {
      out.push({ level, short: `${label}: smallest board yet`, text: `${label} has only ${m.dominoes} dominoes, fewer than any earlier ${label} board.` });
    } else {
      const atLeast = pool.filter((p) => p.dominoes >= m.dominoes).length / pool.length;
      const atMost = pool.filter((p) => p.dominoes <= m.dominoes).length / pool.length;
      if (atLeast <= 0.05) out.push({ level, short: `${label}: unusually big`, text: `${label} has ${m.dominoes} dominoes; only ${pct(atLeast)} of earlier ${label} boards are this big.` });
      else if (atMost <= 0.05) out.push({ level, short: `${label}: unusually small`, text: `${label} has just ${m.dominoes} dominoes; only ${pct(atMost)} of earlier ${label} boards are this small.` });
    }

    const biggest = Math.max(...pool.map((p) => p.largestRegion));
    if (m.largestRegion > biggest) {
      out.push({ level, short: `${label}: largest region yet`, text: `One ${label} region covers ${m.largestRegion} squares — larger than any region on an earlier ${label} board.` });
    }

    if (level === "hard") {
      const noDoubles = pool.filter((p) => p.doubles === 0).length / pool.length;
      if (m.doubles === 0 && noDoubles <= 0.1) {
        out.push({ level, short: "Hard: no doubles", text: `The Hard board has no doubles at all, which only ${pct(noDoubles)} of earlier Hard boards can say.` });
      }
      const noStart = pool.filter((p) => p.oneSquare === 0).length / pool.length;
      if (m.oneSquare === 0 && !isAllSingleSquares(board) && noStart <= 0.2) {
        out.push({ level, short: "Hard: no free starting square", text: `The Hard board has no one-square region to start from; only ${pct(noStart)} of earlier Hard boards are built that way.` });
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Hub tables (archive = every puzzle before today)

export interface PipsRecordEntry {
  date: string;
  id: number;
  level: PipsDifficulty;
}

export interface PipsRecord {
  title: string;
  value: string;
  note: string;
  entries: PipsRecordEntry[];
  /** How many more boards share the record. */
  more: number;
}

function record(
  title: string,
  note: (v: number) => string,
  levels: PipsDifficulty[],
  measure: (b: PipsBoard) => number,
  pick: "max" | "min",
  format: (v: number) => string = String
): PipsRecord {
  const rows = getArchivePips()
    .slice()
    .reverse()
    .flatMap((p) => levels.map((level) => ({ date: p.date, id: p.id, level, v: measure(p[level]) })));
  const best = pick === "max" ? Math.max(...rows.map((r) => r.v)) : Math.min(...rows.map((r) => r.v));
  const hits = rows.filter((r) => r.v === best);
  return {
    title,
    value: format(best),
    note: note(best),
    entries: hits.slice(0, 3).map(({ date, id, level }) => ({ date, id, level })),
    more: Math.max(0, hits.length - 3),
  };
}

export const getPipsRecords = cache((): PipsRecord[] => {
  const archive = getArchivePips();
  const sizes = (l: PipsDifficulty) => archive.map((p) => p[l].dominoes.length).sort((a, b) => a - b);
  const usual = (l: PipsDifficulty) => {
    const xs = sizes(l);
    const counts = new Map<number, number>();
    for (const x of xs) counts.set(x, (counts.get(x) ?? 0) + 1);
    const [mode, n] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [0, 0];
    return `${pct(n / Math.max(1, xs.length))} of ${PIPS_LABEL[l]} boards have ${mode}`;
  };
  const hard = sizes("hard");
  const quartiles = `${hard[Math.floor(hard.length / 4)]}–${hard[Math.floor((hard.length * 3) / 4)]}`;
  const singles = getArchivePips()
    .slice()
    .reverse()
    .flatMap((p) => PIPS_LEVELS.filter((l) => isAllSingleSquares(p[l])).map((level) => ({ date: p.date, id: p.id, level })));
  return [
    record("Most dominoes on Easy", (v) => `${dominoes(v)}, while ${usual("easy")}.`, ["easy"], (b) => b.dominoes.length, "max"),
    record("Most dominoes on Medium", (v) => `${dominoes(v)}, while ${usual("medium")}.`, ["medium"], (b) => b.dominoes.length, "max"),
    record("Smallest Hard board", (v) => `Only ${dominoes(v)}; the middle half of Hard boards have ${quartiles}.`, ["hard"], (b) => b.dominoes.length, "min"),
    {
      title: "Every square its own region",
      value: String(singles.length),
      note: "Boards where every region is one numbered square, so the whole puzzle is a number grid to tile.",
      entries: singles.slice(-3).reverse(),
      more: Math.max(0, singles.length - 3),
    },
    record("Most doubles on one board", (v) => `${v} doubles such as 3–3 or 5–5 on a single board.`, PIPS_LEVELS, (b) => b.dominoes.filter(([x, y]) => x === y).length, "max"),
    record("Largest single region", (v) => `One region covering ${v} squares.`, PIPS_LEVELS, (b) => Math.max(...b.regions.map((r) => r.indices.length)), "max"),
  ];
});

export interface PipsMonthRow {
  month: string;
  puzzles: number;
  avg: Record<PipsDifficulty, number>;
}

export const getPipsByMonth = cache((): PipsMonthRow[] => {
  const byMonth = new Map<string, PipsPuzzle[]>();
  for (const p of getArchivePips()) {
    const m = p.date.slice(0, 7);
    byMonth.set(m, [...(byMonth.get(m) ?? []), p]);
  }
  return [...byMonth.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, ps]) => ({
      month,
      puzzles: ps.length,
      avg: Object.fromEntries(
        PIPS_LEVELS.map((l) => [l, mean(ps.map((p) => p[l].dominoes.length))])
      ) as Record<PipsDifficulty, number>,
    }));
});

export interface PipsConstructorRow {
  name: string;
  counts: Record<PipsDifficulty, number>;
  total: number;
  first: string;
}

export const getPipsConstructors = cache((): PipsConstructorRow[] => {
  const rows = new Map<string, PipsConstructorRow>();
  for (const p of getArchivePips().slice().reverse()) {
    for (const level of PIPS_LEVELS) {
      for (const name of p[level].constructors.split(/\s*(?:,|&|\band\b)\s*/).filter(Boolean)) {
        const row = rows.get(name) ?? { name, counts: { easy: 0, medium: 0, hard: 0 }, total: 0, first: p.date };
        row.counts[level]++;
        row.total++;
        rows.set(name, row);
      }
    }
  }
  return [...rows.values()].sort((a, b) => b.total - a.total);
});

/** The newest n puzzles (today included — the table shows sizes only),
 *  linked to their date page, or to the archive explorer on the hub
 *  (`#d=YYYY-MM-DD`, a plain fragment so the browser fires hashchange). */
export function getRecentPipsLinks(n: number): { date: string; id: number; href: string; archived: boolean }[] {
  return getAllPips()
    .slice(-n)
    .reverse()
    .map((p) => ({
      date: p.date,
      id: p.id,
      href: hasPipsDatePage(p.date) ? `/pips-answers/${p.date}` : `#d=${p.date}`,
      archived: !hasPipsDatePage(p.date),
    }));
}

export interface PipsWeekdayRow {
  day: string;
  puzzles: number;
  avg: Record<PipsDifficulty, number>;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Average board size by day of the week, Monday first. */
export const getPipsByWeekday = cache((): PipsWeekdayRow[] => {
  const groups = WEEKDAYS.map(() => [] as PipsPuzzle[]);
  for (const p of getArchivePips()) groups[new Date(`${p.date}T12:00:00Z`).getUTCDay()].push(p);
  return [1, 2, 3, 4, 5, 6, 0].map((d) => ({
    day: WEEKDAYS[d],
    puzzles: groups[d].length,
    avg: Object.fromEntries(
      PIPS_LEVELS.map((l) => [l, mean(groups[d].map((p) => p[l].dominoes.length))])
    ) as Record<PipsDifficulty, number>,
  }));
});

/** Targets of multi-square sum regions across every board, most common first. */
export const getPipsSumTargets = cache((): { target: number; count: number; share: number }[] => {
  const counts = new Map<number, number>();
  let total = 0;
  for (const p of getArchivePips()) {
    for (const l of PIPS_LEVELS) {
      for (const r of p[l].regions) {
        if (r.type !== "sum" || r.indices.length < 2 || r.target === undefined) continue;
        counts.set(r.target, (counts.get(r.target) ?? 0) + 1);
        total++;
      }
    }
  }
  return [...counts.entries()]
    .map(([target, count]) => ({ target, count, share: count / Math.max(1, total) }))
    .sort((a, b) => b.count - a.count || a.target - b.target);
});

export interface PipsIntegrity {
  boards: number;
  valid: number;
  regions: number;
  squares: number;
}

/** Re-checks every archived solution at build time: each square covered
 *  exactly once, the regions tiling the board, every region rule met. */
export const getPipsIntegrity = cache((): PipsIntegrity => {
  let boards = 0;
  let valid = 0;
  let regions = 0;
  let squares = 0;
  for (const p of getArchivePips()) {
    for (const l of PIPS_LEVELS) {
      const b = p[l];
      boards++;
      regions += b.regions.length;
      const cells = b.solution.flat().map(key);
      squares += cells.length;
      const covered = new Set(cells);
      const regionCells = b.regions.flatMap((r) => r.indices.map(key));
      const values = cellValues(b);
      const tiled =
        covered.size === cells.length &&
        regionCells.length === cells.length &&
        regionCells.every((c) => covered.has(c));
      const rulesMet = b.regions.every((r) => {
        const v = r.indices.map((c) => values.get(key(c)) ?? -1);
        const sum = v.reduce((a, x) => a + x, 0);
        switch (r.type) {
          case "sum": return sum === r.target;
          case "equals": return v.every((x) => x === v[0]);
          case "unequal": return new Set(v).size === v.length;
          case "less": return sum < (r.target ?? 0);
          case "greater": return sum > (r.target ?? 0);
          default: return true;
        }
      });
      if (tiled && rulesMet) valid++;
    }
  }
  return { boards, valid, regions, squares };
});
