import type { ConnectionsGroup, ConnectionsLevel, ConnectionsPuzzle } from "@/types/connections";

/** Transient feedback surfaced under the grid for ~2s after an action. */
export type Feedback =
  | { kind: "one-away" }
  | { kind: "wrong" }
  | { kind: "duplicate" }
  | { kind: "correct"; level: ConnectionsLevel }
  | null;

export type GameStatus = "playing" | "won" | "lost";

export type GameState = {
  puzzle: ConnectionsPuzzle;
  /** Words still on the grid, in display order. */
  gridWords: string[];
  selected: string[];
  /** Solved groups in the order the player cleared them. */
  solvedGroups: ConnectionsGroup[];
  mistakesLeft: number;
  /** Sorted-word signature of every submitted guess, for repeat detection. */
  previousGuesses: string[];
  /** Per-guess levels of the 4 chosen words, for the share graphic. */
  guessHistory: ConnectionsLevel[][];
  status: GameStatus;
  /** 0 = no hint used for the current target group; 1-3 = stages revealed. */
  hintTier: number;
  hintsUsed: number;
  /** Word highlighted by hint tier 3, if any. */
  hintWord: string | null;
  feedback: Feedback;
  /** Bumped on every wrong guess so the UI can retrigger the shake. */
  shakeSeed: number;
};

export type GameAction =
  | { type: "TOGGLE_WORD"; word: string }
  | { type: "DESELECT_ALL" }
  | { type: "SHUFFLE" }
  | { type: "SUBMIT" }
  | { type: "USE_HINT" }
  | { type: "CLEAR_FEEDBACK" }
  | { type: "RESTORE"; state: GameState };

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function guessSignature(words: string[]): string {
  return [...words].sort().join("|");
}

export function createInitialState(puzzle: ConnectionsPuzzle): GameState {
  return {
    puzzle,
    gridWords: shuffle(puzzle.groups.flatMap((g) => g.words)),
    selected: [],
    solvedGroups: [],
    mistakesLeft: 4,
    previousGuesses: [],
    guessHistory: [],
    status: "playing",
    hintTier: 0,
    hintsUsed: 0,
    hintWord: null,
    feedback: null,
    shakeSeed: 0,
  };
}

function levelOf(puzzle: ConnectionsPuzzle, word: string): ConnectionsLevel {
  const group = puzzle.groups.find((g) => g.words.includes(word));
  return (group?.level ?? 0) as ConnectionsLevel;
}

/** Easiest group (lowest level) the player has not solved yet. */
export function currentHintTarget(state: GameState): ConnectionsGroup | undefined {
  const solvedLevels = new Set(state.solvedGroups.map((g) => g.level));
  return [...state.puzzle.groups]
    .sort((a, b) => a.level - b.level)
    .find((g) => !solvedLevels.has(g.level));
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "RESTORE":
      return action.state;

    case "TOGGLE_WORD": {
      if (state.status !== "playing") return state;
      if (state.selected.includes(action.word)) {
        return {
          ...state,
          selected: state.selected.filter((w) => w !== action.word),
        };
      }
      if (state.selected.length >= 4) return state;
      return { ...state, selected: [...state.selected, action.word] };
    }

    case "DESELECT_ALL":
      return { ...state, selected: [] };

    case "SHUFFLE":
      return { ...state, gridWords: shuffle(state.gridWords) };

    case "CLEAR_FEEDBACK":
      return { ...state, feedback: null };

    case "USE_HINT": {
      if (state.status !== "playing" || state.hintTier >= 3) return state;
      const target = currentHintTarget(state);
      if (!target) return state;
      const nextTier = state.hintTier + 1;
      return {
        ...state,
        hintTier: nextTier,
        hintsUsed: state.hintsUsed + 1,
        hintWord: nextTier === 3 ? target.words[0] : state.hintWord,
      };
    }

    case "SUBMIT": {
      if (state.status !== "playing" || state.selected.length !== 4) return state;

      const signature = guessSignature(state.selected);
      if (state.previousGuesses.includes(signature)) {
        return { ...state, feedback: { kind: "duplicate" } };
      }

      const guessLevels = state.selected.map((w) =>
        levelOf(state.puzzle, w)
      ) as ConnectionsLevel[];
      const matched = state.puzzle.groups.find((g) =>
        state.selected.every((w) => g.words.includes(w))
      );

      if (matched) {
        const solvedGroups = [...state.solvedGroups, matched];
        const won = solvedGroups.length === 4;
        return {
          ...state,
          gridWords: state.gridWords.filter((w) => !matched.words.includes(w)),
          selected: [],
          solvedGroups,
          previousGuesses: [...state.previousGuesses, signature],
          guessHistory: [...state.guessHistory, guessLevels],
          status: won ? "won" : "playing",
          // Reset hint progression for the next target group.
          hintTier: 0,
          hintWord: null,
          feedback: { kind: "correct", level: matched.level as ConnectionsLevel },
        };
      }

      // Wrong guess. "One away" when exactly 3 words share a group.
      const oneAway = state.puzzle.groups.some(
        (g) => state.selected.filter((w) => g.words.includes(w)).length === 3
      );
      const mistakesLeft = state.mistakesLeft - 1;
      const lost = mistakesLeft === 0;

      if (lost) {
        // Reveal remaining groups in level order (yellow → purple).
        const solvedLevels = new Set(state.solvedGroups.map((g) => g.level));
        const remaining = [...state.puzzle.groups]
          .sort((a, b) => a.level - b.level)
          .filter((g) => !solvedLevels.has(g.level));
        return {
          ...state,
          gridWords: [],
          selected: [],
          solvedGroups: [...state.solvedGroups, ...remaining],
          previousGuesses: [...state.previousGuesses, signature],
          guessHistory: [...state.guessHistory, guessLevels],
          mistakesLeft: 0,
          status: "lost",
          feedback: null,
          shakeSeed: state.shakeSeed + 1,
        };
      }

      return {
        ...state,
        previousGuesses: [...state.previousGuesses, signature],
        guessHistory: [...state.guessHistory, guessLevels],
        mistakesLeft,
        feedback: { kind: oneAway ? "one-away" : "wrong" },
        shakeSeed: state.shakeSeed + 1,
      };
    }

    default:
      return state;
  }
}
