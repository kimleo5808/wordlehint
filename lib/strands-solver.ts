import type { StrandsPuzzle } from "@/types/strands";

/**
 * strands-solver — derives the canonical letter paths for a Strands board.
 *
 * The daily JSON stores only the 8×6 board plus the word list; the game
 * needs each word's cell path so found words can snap-highlight the
 * official layout. Strands boards tile perfectly: spangram + theme words
 * use all 48 cells exactly once, which makes a backtracking search over
 * disjoint 8-adjacent paths well constrained and fast (<10ms per board).
 *
 * Returns word → path (flat cell indices, row * 6 + col), or null when no
 * perfect tiling exists (malformed data) — callers drop that puzzle.
 */

export const COLS = 6;
export const ROWS = 8;

export type SolvedPaths = Record<string, number[]>;

export function solveStrands(puzzle: StrandsPuzzle): SolvedPaths | null {
  const letters = puzzle.board.join("");
  if (letters.length !== COLS * ROWS) return null;

  const words = [puzzle.spangram, ...puzzle.themeWords];
  const totalLen = words.reduce((n, w) => n + w.length, 0);
  if (totalLen !== COLS * ROWS) return null;

  // Longest first — tighter early constraints, faster backtracking.
  const order = [...words].sort((a, b) => b.length - a.length);

  const used = new Array<boolean>(COLS * ROWS).fill(false);
  const result: SolvedPaths = {};

  const neighbors = (cell: number): number[] => {
    const r = Math.floor(cell / COLS);
    const c = cell % COLS;
    const out: number[] = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push(nr * COLS + nc);
      }
    }
    return out;
  };

  const findPath = (word: string, pos: number, cell: number, path: number[]): boolean => {
    path.push(cell);
    used[cell] = true;
    if (pos === word.length - 1) {
      result[word] = [...path];
      if (placeWord(order.indexOf(word) + 1)) return true;
      delete result[word];
    } else {
      for (const next of neighbors(cell)) {
        if (!used[next] && letters[next] === word[pos + 1]) {
          if (findPath(word, pos + 1, next, path)) return true;
        }
      }
    }
    used[cell] = false;
    path.pop();
    return false;
  };

  const placeWord = (wordIdx: number): boolean => {
    if (wordIdx === order.length) return true;
    const word = order[wordIdx];
    for (let cell = 0; cell < COLS * ROWS; cell++) {
      if (!used[cell] && letters[cell] === word[0]) {
        if (findPath(word, 0, cell, [])) return true;
      }
    }
    return false;
  };

  return placeWord(0) ? result : null;
}
