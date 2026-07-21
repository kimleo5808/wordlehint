import { COLS } from "@/lib/strands-solver";
import type { StrandsPuzzle } from "@/types/strands";

/** A puzzle enriched at build time with the solver's canonical paths. */
export interface PlayableStrandsPuzzle extends StrandsPuzzle {
  /** word → flat cell indices (row * 6 + col), spangram included. */
  paths: Record<string, number[]>;
}

export interface FoundWord {
  word: string;
  path: number[];
  spangram: boolean;
}

export type Feedback =
  | { kind: "theme"; word: string }
  | { kind: "spangram" }
  | { kind: "wrong"; word: string }
  | { kind: "already" }
  | { kind: "too-short" }
  | null;

export type GameStatus = "playing" | "won";

export type GameState = {
  puzzle: PlayableStrandsPuzzle;
  /** Current in-progress selection, flat cell indices in trace order. */
  path: number[];
  /** Solved words in the order the player found them. */
  found: FoundWord[];
  hintsLeft: number;
  /** Theme word currently outlined by a hint, until the player finds it. */
  hintWord: string | null;
  status: GameStatus;
  feedback: Feedback;
  shakeSeed: number;
};

export type GameAction =
  | { type: "TAP_CELL"; cell: number }
  | { type: "CLEAR_PATH" }
  | { type: "SUBMIT" }
  | { type: "USE_HINT" }
  | { type: "CLEAR_FEEDBACK" }
  | { type: "RESTORE"; state: GameState };

export function createInitialState(puzzle: PlayableStrandsPuzzle): GameState {
  return {
    puzzle,
    path: [],
    found: [],
    hintsLeft: 3,
    hintWord: null,
    status: "playing",
    feedback: null,
    shakeSeed: 0,
  };
}

function isAdjacent(a: number, b: number): boolean {
  const dr = Math.abs(Math.floor(a / COLS) - Math.floor(b / COLS));
  const dc = Math.abs((a % COLS) - (b % COLS));
  return dr <= 1 && dc <= 1 && dr + dc > 0;
}

export function lockedCells(state: GameState): Set<number> {
  const s = new Set<number>();
  for (const f of state.found) for (const c of f.path) s.add(c);
  return s;
}

function wordFromPath(state: GameState): string {
  const letters = state.puzzle.board.join("");
  return state.path.map((c) => letters[c]).join("");
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "RESTORE":
      return action.state;

    case "CLEAR_FEEDBACK":
      return { ...state, feedback: null };

    case "CLEAR_PATH":
      return { ...state, path: [] };

    case "TAP_CELL": {
      if (state.status !== "playing") return state;
      const cell = action.cell;
      if (lockedCells(state).has(cell)) return state;

      const idx = state.path.indexOf(cell);
      if (idx !== -1) {
        // Tapping a cell already in the path backtracks to it.
        return { ...state, path: state.path.slice(0, idx + 1) };
      }
      if (state.path.length === 0) {
        return { ...state, path: [cell] };
      }
      const last = state.path[state.path.length - 1];
      if (isAdjacent(last, cell)) {
        return { ...state, path: [...state.path, cell] };
      }
      // Non-adjacent tap starts a fresh selection from that cell.
      return { ...state, path: [cell] };
    }

    case "USE_HINT": {
      if (state.status !== "playing" || state.hintsLeft <= 0 || state.hintWord)
        return state;
      const foundWords = new Set(state.found.map((f) => f.word));
      const target = state.puzzle.themeWords.find((w) => !foundWords.has(w));
      if (!target) return state;
      return { ...state, hintsLeft: state.hintsLeft - 1, hintWord: target };
    }

    case "SUBMIT": {
      if (state.status !== "playing" || state.path.length === 0) return state;
      const word = wordFromPath(state);
      if (word.length < 4) {
        return { ...state, feedback: { kind: "too-short" } };
      }
      const rev = [...word].reverse().join("");
      const foundWords = new Set(state.found.map((f) => f.word));

      const matchTarget = (target: string) => target === word || target === rev;

      if (matchTarget(state.puzzle.spangram)) {
        if (foundWords.has(state.puzzle.spangram)) {
          return { ...state, path: [], feedback: { kind: "already" } };
        }
        const found = [
          ...state.found,
          {
            word: state.puzzle.spangram,
            path: state.puzzle.paths[state.puzzle.spangram],
            spangram: true,
          },
        ];
        const won = found.length === state.puzzle.themeWords.length + 1;
        return {
          ...state,
          path: [],
          found,
          status: won ? "won" : "playing",
          feedback: { kind: "spangram" },
        };
      }

      const theme = state.puzzle.themeWords.find(matchTarget);
      if (theme) {
        if (foundWords.has(theme)) {
          return { ...state, path: [], feedback: { kind: "already" } };
        }
        const found = [
          ...state.found,
          { word: theme, path: state.puzzle.paths[theme], spangram: false },
        ];
        const won = found.length === state.puzzle.themeWords.length + 1;
        return {
          ...state,
          path: [],
          found,
          status: won ? "won" : "playing",
          hintWord: state.hintWord === theme ? null : state.hintWord,
          feedback: { kind: "theme", word: theme },
        };
      }

      return {
        ...state,
        path: [],
        feedback: { kind: "wrong", word },
        shakeSeed: state.shakeSeed + 1,
      };
    }

    default:
      return state;
  }
}
