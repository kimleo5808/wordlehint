import type { PipsBoard, PipsCell, PipsRegion } from "@/types/pips";

/**
 * Deterministic Pips hint ladder, derived from the board's rules and NYT's
 * official solution (no guessing, no generated prose):
 *   1. a starting square the rules alone pin down (a one-square sum region,
 *      or an all-0 / all-6 region), falling back to the tightest region;
 *   2. the domino that covers it;
 *   3. half of the dominoes, most tightly constrained regions first;
 *   4. the full official solution.
 * Pure functions — usable at build time and in client components.
 */

export interface PipsHintStep {
  kind: "anchor" | "domino" | "half" | "full";
  title: string;
  text: string;
  /** Cells to highlight on the board for this step. */
  cells: PipsCell[];
  /** Domino indices placed on the board after this step (cumulative). */
  dominoes: number[];
}

export interface PipsBoardFacts {
  dominoes: number;
  regions: number;
  constrainedRegions: number;
  oneSquareSums: number;
  doubles: number;
  regionTypes: Record<string, number>;
}

const key = ([r, c]: PipsCell) => `${r},${c}`;

/** Human position, 1-based: "row 2, column 3". */
export function describeCell([r, c]: PipsCell): string {
  return `row ${r + 1}, column ${c + 1}`;
}

function describeDomino([a, b]: [PipsCell, PipsCell]): string {
  if (a[0] === b[0]) {
    const [c1, c2] = [a[1], b[1]].sort((x, y) => x - y);
    return `row ${a[0] + 1}, columns ${c1 + 1}–${c2 + 1}`;
  }
  const [r1, r2] = [a[0], b[0]].sort((x, y) => x - y);
  return `column ${a[1] + 1}, rows ${r1 + 1}–${r2 + 1}`;
}

/** Lower = more constraining; used to pick the start and reveal order. */
function regionRank(r: PipsRegion): number {
  if (r.type === "sum" && r.indices.length === 1) return 0;
  if (r.type === "sum" && (r.target === 0 || r.target === 6 * r.indices.length)) return 1;
  if (r.type === "sum") return 2;
  if (r.type === "equals" || r.type === "unequal") return 3;
  if (r.type === "less" || r.type === "greater") return 4;
  return 5;
}

function readingOrder(a: PipsCell, b: PipsCell): number {
  return a[0] - b[0] || a[1] - b[1];
}

/** Pip count on every covered square, keyed "row,col". */
export function cellValues(board: PipsBoard): Map<string, number> {
  const values = new Map<string, number>();
  board.solution.forEach(([a, b], i) => {
    values.set(key(a), board.dominoes[i][0]);
    values.set(key(b), board.dominoes[i][1]);
  });
  return values;
}

/** Domino i's numbers in board order (top to bottom, or left to right). */
function orderedPips(board: PipsBoard, i: number): [number, number] {
  const [a, b] = board.solution[i];
  const [p, q] = board.dominoes[i];
  return readingOrder(a, b) <= 0 ? [p, q] : [q, p];
}

/** Domino i in words, numbers read top to bottom or left to right:
 *  "0–2: column 1, rows 1–2" puts the 0 in row 1. */
export function describePlacement(board: PipsBoard, i: number): string {
  const [first, second] = orderedPips(board, i);
  return `${first}–${second}: ${describeDomino(board.solution[i])}`;
}

function pips(n: number): string {
  return `${n} pip${n === 1 ? "" : "s"}`;
}

export function getPipsHints(board: PipsBoard): PipsHintStep[] {
  const regionOf = new Map<string, PipsRegion>();
  for (const r of board.regions) for (const c of r.indices) regionOf.set(key(c), r);
  const dominoAt = new Map<string, number>();
  board.solution.forEach(([a, b], i) => {
    dominoAt.set(key(a), i);
    dominoAt.set(key(b), i);
  });

  // 1. Starting square.
  const byRank = [...board.regions].sort(
    (a, b) =>
      regionRank(a) - regionRank(b) ||
      (regionRank(a) === 3 ? b.indices.length - a.indices.length : a.indices.length - b.indices.length) ||
      readingOrder([...a.indices].sort(readingOrder)[0], [...b.indices].sort(readingOrder)[0])
  );
  const start = byRank[0];
  const startCells = [...start.indices].sort(readingOrder);
  const anchorCell = startCells[0];
  let anchorText: string;
  if (regionRank(start) === 0) {
    anchorText = `The square at ${describeCell(anchorCell)} is a region on its own marked ${start.target}, so it must show ${pips(start.target!)}.`;
  } else if (regionRank(start) === 1) {
    anchorText =
      start.target === 0
        ? `The ${start.indices.length} highlighted squares must add up to 0, so every one of them is blank.`
        : `The ${start.indices.length} highlighted squares must add up to ${start.target}, the most possible, so every one of them shows 6 pips.`;
  } else if (start.type === "equals") {
    anchorText = `All ${start.indices.length} highlighted squares must show the same number. Find a number you have enough dominoes for.`;
  } else if (start.type === "unequal") {
    anchorText = `The ${start.indices.length} highlighted squares must all show different numbers.`;
  } else if (start.type === "sum") {
    anchorText = `The ${start.indices.length} highlighted squares must add up to exactly ${start.target}.`;
  } else {
    anchorText = `Start with the highlighted region: its total must be ${start.type === "less" ? "less" : "more"} than ${start.target}.`;
  }

  // 2. The domino covering the starting square.
  const anchorDomino = dominoAt.get(key(anchorCell))!;
  const [p1, p2] = orderedPips(board, anchorDomino);
  const anchorValue = cellValues(board).get(key(anchorCell))!;
  const dominoText =
    p1 === p2
      ? `The ${p1}–${p2} domino covers that square: place it on ${describeDomino(board.solution[anchorDomino])}.`
      : `The ${p1}–${p2} domino covers that square, with its ${anchorValue} on it: place it on ${describeDomino(board.solution[anchorDomino])}.`;

  // 3. Half the dominoes, most constrained first (the anchor domino leads).
  const dominoRank = (i: number) =>
    Math.min(...board.solution[i].map((c) => {
      const r = regionOf.get(key(c));
      return r ? regionRank(r) * 100 + r.indices.length : 999;
    }));
  const order = board.dominoes
    .map((_, i) => i)
    .filter((i) => i !== anchorDomino)
    .sort((a, b) => dominoRank(a) - dominoRank(b) || a - b);
  const half = [anchorDomino, ...order].slice(0, Math.ceil(board.dominoes.length / 2));
  const all = board.dominoes.map((_, i) => i);

  return [
    { kind: "anchor", title: "Where to start", text: anchorText, cells: startCells, dominoes: [] },
    { kind: "domino", title: "The first domino", text: dominoText, cells: board.solution[anchorDomino], dominoes: [anchorDomino] },
    {
      kind: "half",
      title: "Half the board",
      text: `Here are ${half.length} of the ${board.dominoes.length} dominoes, starting with the most tightly constrained regions. Try to place the rest yourself.`,
      cells: [],
      dominoes: half,
    },
    {
      kind: "full",
      title: "Full solution",
      text: "The complete official solution. Harder boards can occasionally be solved more than one way; this is the arrangement NYT published.",
      cells: [],
      dominoes: all,
    },
  ];
}

export function getPipsBoardFacts(board: PipsBoard): PipsBoardFacts {
  const regionTypes: Record<string, number> = {};
  for (const r of board.regions) regionTypes[r.type] = (regionTypes[r.type] ?? 0) + 1;
  return {
    dominoes: board.dominoes.length,
    regions: board.regions.length,
    constrainedRegions: board.regions.filter((r) => r.type !== "empty").length,
    oneSquareSums: board.regions.filter((r) => r.type === "sum" && r.indices.length === 1).length,
    doubles: board.dominoes.filter(([a, b]) => a === b).length,
    regionTypes,
  };
}

/** Rows × columns spanned by the board's squares. */
export function getBoardSize(board: PipsBoard): { rows: number; cols: number } {
  const cells = board.solution.flat();
  return {
    rows: Math.max(...cells.map((c) => c[0])) + 1,
    cols: Math.max(...cells.map((c) => c[1])) + 1,
  };
}
