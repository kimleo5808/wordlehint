import {
  rankForScore,
  rankThresholds,
  scoreWord,
  totalPoints,
} from "@/lib/spelling-bee-scoring";

/** Anonymised puzzle served to the client — no dates or NYT ids. */
export interface UnlimitedBeePuzzle {
  id: number; // pool index, stable per build
  centerLetter: string; // lowercase
  outerLetters: string[]; // 6 lowercase letters
  pangrams: string[];
  answers: string[]; // full curated word list, lowercase
}

export type Feedback =
  | { kind: "too-short" }
  | { kind: "missing-center" }
  | { kind: "bad-letter" }
  | { kind: "not-in-list" }
  | { kind: "already-found" }
  | { kind: "good"; word: string; points: number }
  | { kind: "great"; word: string; points: number }
  | { kind: "amazing"; word: string; points: number }
  | { kind: "pangram"; word: string; points: number }
  | null;

export interface GameState {
  puzzle: UnlimitedBeePuzzle;
  /** Outer letters in current display order (shuffle rearranges). */
  letterOrder: string[];
  input: string;
  found: string[]; // in the order found
  score: number;
  feedback: Feedback;
  /** Number of two-letter hints the player has opened this round. */
  hintsUsed: number;
  queenBee: boolean;
}

export type GameAction =
  | { type: "type"; letter: string }
  | { type: "delete" }
  | { type: "shuffle"; order: string[] }
  | { type: "submit" }
  | { type: "clear-feedback" }
  | { type: "use-hint" };

export function initialState(
  puzzle: UnlimitedBeePuzzle,
  saved?: Partial<Pick<GameState, "found" | "hintsUsed">>
): GameState {
  const found = (saved?.found ?? []).filter((w) => puzzle.answers.includes(w));
  const pg = new Set(puzzle.pangrams);
  const score = found.reduce((s, w) => s + scoreWord(w, pg.has(w)), 0);
  return {
    puzzle,
    letterOrder: [...puzzle.outerLetters],
    input: "",
    found,
    score,
    feedback: null,
    hintsUsed: saved?.hintsUsed ?? 0,
    queenBee: found.length === puzzle.answers.length,
  };
}

export function maxScore(puzzle: UnlimitedBeePuzzle): number {
  return totalPoints(puzzle.answers, puzzle.pangrams);
}

export function currentRank(state: GameState): string {
  return rankForScore(state.score, maxScore(state.puzzle));
}

export function geniusScore(puzzle: UnlimitedBeePuzzle): number {
  return rankThresholds(maxScore(puzzle)).find((r) => r.name === "Genius")!
    .minScore;
}

function classify(word: string, points: number, isPangram: boolean): Feedback {
  if (isPangram) return { kind: "pangram", word, points };
  if (word.length >= 7) return { kind: "amazing", word, points };
  if (word.length >= 5) return { kind: "great", word, points };
  return { kind: "good", word, points };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "type": {
      const letter = action.letter.toLowerCase();
      const legal = [state.puzzle.centerLetter, ...state.puzzle.outerLetters];
      if (!/^[a-z]$/.test(letter)) return state;
      if (state.input.length >= 19) return state;
      // Illegal letters are allowed into the input (NYT behaviour) so the
      // player sees what they typed; submit rejects them with a reason.
      void legal;
      return { ...state, input: state.input + letter, feedback: null };
    }
    case "delete":
      return { ...state, input: state.input.slice(0, -1), feedback: null };
    case "shuffle":
      return { ...state, letterOrder: action.order };
    case "clear-feedback":
      return { ...state, feedback: null };
    case "use-hint":
      return { ...state, hintsUsed: state.hintsUsed + 1 };
    case "submit": {
      const word = state.input;
      const reset = { ...state, input: "" };
      if (word.length < 4) return { ...reset, feedback: { kind: "too-short" } };
      if (!word.includes(state.puzzle.centerLetter))
        return { ...reset, feedback: { kind: "missing-center" } };
      const legal = new Set([
        state.puzzle.centerLetter,
        ...state.puzzle.outerLetters,
      ]);
      if ([...word].some((c) => !legal.has(c)))
        return { ...reset, feedback: { kind: "bad-letter" } };
      if (state.found.includes(word))
        return { ...reset, feedback: { kind: "already-found" } };
      if (!state.puzzle.answers.includes(word))
        return { ...reset, feedback: { kind: "not-in-list" } };

      const isPangram = state.puzzle.pangrams.includes(word);
      const points = scoreWord(word, isPangram);
      const found = [...state.found, word];
      return {
        ...reset,
        found,
        score: state.score + points,
        feedback: classify(word, points, isPangram),
        queenBee: found.length === state.puzzle.answers.length,
      };
    }
  }
}
