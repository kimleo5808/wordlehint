"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Delete, Lightbulb, Shuffle } from "lucide-react";
import { rankThresholds } from "@/lib/spelling-bee-scoring";
import {
  currentRank,
  gameReducer,
  geniusScore,
  initialState,
  maxScore,
  type GameState,
  type UnlimitedBeePuzzle,
} from "./gameReducer";

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const FEEDBACK_LABEL: Record<string, string> = {
  "too-short": "Too short — words need at least 4 letters",
  "missing-center": "Must use the center letter",
  "bad-letter": "Uses a letter that isn't in the hive",
  "not-in-list": "Not in this puzzle's word list",
  "already-found": "Already found",
  good: "Good!",
  great: "Great!",
  amazing: "Amazing!",
  pangram: "PANGRAM!",
};

export default function SpellingBeeGame({
  puzzle,
  savedFound,
  onProgress,
}: {
  puzzle: UnlimitedBeePuzzle;
  savedFound?: string[];
  onProgress: (state: {
    found: string[];
    score: number;
    rank: string;
    queenBee: boolean;
  }) => void;
}) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    (): GameState => initialState(puzzle, { found: savedFound })
  );
  const [showHints, setShowHints] = useState(false);

  const total = useMemo(() => maxScore(puzzle), [puzzle]);
  const genius = useMemo(() => geniusScore(puzzle), [puzzle]);
  const rank = currentRank(state);

  // Persist progress upward whenever found-words change.
  useEffect(() => {
    onProgress({
      found: state.found,
      score: state.score,
      rank,
      queenBee: state.queenBee,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.found.length]);

  // Physical keyboard input.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter") dispatch({ type: "submit" });
      else if (e.key === "Backspace") dispatch({ type: "delete" });
      else if (/^[a-zA-Z]$/.test(e.key))
        dispatch({ type: "type", letter: e.key });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-clear success feedback after a moment.
  useEffect(() => {
    if (!state.feedback) return;
    const t = setTimeout(() => dispatch({ type: "clear-feedback" }), 1800);
    return () => clearTimeout(t);
  }, [state.feedback]);

  const shuffle = useCallback(() => {
    const order = [...state.letterOrder];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    dispatch({ type: "shuffle", order });
  }, [state.letterOrder]);

  const cells = useMemo(() => {
    return [
      { letter: puzzle.centerLetter, center: true, dx: 0, dy: 0 },
      ...state.letterOrder.map((letter, i) => {
        const angle = ((i * 60 - 90) * Math.PI) / 180;
        return {
          letter,
          center: false,
          dx: Math.cos(angle) * 68,
          dy: Math.sin(angle) * 68,
        };
      }),
    ];
  }, [puzzle.centerLetter, state.letterOrder]);

  const isSuccess =
    state.feedback &&
    ["good", "great", "amazing", "pangram"].includes(state.feedback.kind);

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6 md:grid-cols-[1fr_260px]">
      <div className="flex flex-col items-center">
        {/* Rank progress */}
        <div className="w-full">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-heading font-bold text-foreground">
              {rank}
              {state.queenBee && " 👑"}
            </span>
            <span className="tabular-nums text-muted-foreground">
              {state.score} / {total} pts · Genius {genius}
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-wordle-present transition-all duration-500"
              style={{ width: `${Math.min(100, (state.score / total) * 100)}%` }}
            />
          </div>
        </div>

        {/* Input line */}
        <div className="mt-5 flex h-10 items-center font-heading text-2xl font-bold tracking-widest text-foreground">
          {state.input ? (
            <span>
              {[...state.input].map((c, i) => (
                <span
                  key={i}
                  className={
                    c === puzzle.centerLetter
                      ? "text-wordle-present"
                      : undefined
                  }
                >
                  {c.toUpperCase()}
                </span>
              ))}
            </span>
          ) : (
            <span className="text-muted-foreground/40">Type or tap…</span>
          )}
          <span className="ml-0.5 inline-block h-7 w-0.5 animate-pulse bg-wordle-present" />
        </div>

        {/* Feedback */}
        <div className="mt-1 h-6 text-sm font-semibold" aria-live="polite">
          {state.feedback && (
            <span
              className={
                isSuccess ? "text-wordle-present" : "text-muted-foreground"
              }
            >
              {FEEDBACK_LABEL[state.feedback.kind]}
              {"points" in state.feedback ? ` +${state.feedback.points}` : ""}
            </span>
          )}
        </div>

        {/* Hive */}
        <div className="relative mt-4 h-56 w-56 select-none">
          {cells.map((cell) => (
            <button
              key={`${cell.letter}-${cell.center}`}
              type="button"
              onClick={() => dispatch({ type: "type", letter: cell.letter })}
              className={`absolute left-1/2 top-1/2 flex h-[74px] w-[66px] items-center justify-center font-heading text-2xl font-bold uppercase transition-transform active:scale-90 ${
                cell.center
                  ? "bg-wordle-present text-slate-900"
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
              style={{
                clipPath: HEX_CLIP,
                transform: `translate(calc(-50% + ${cell.dx}px), calc(-50% + ${cell.dy}px))`,
              }}
              aria-label={`Letter ${cell.letter.toUpperCase()}${cell.center ? " (center, required)" : ""}`}
            >
              {cell.letter}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch({ type: "delete" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Delete className="h-4 w-4" />
            Delete
          </button>
          <button
            type="button"
            onClick={shuffle}
            aria-label="Shuffle letters"
            className="inline-flex items-center justify-center rounded-full border border-border p-2.5 text-foreground transition-colors hover:bg-muted"
          >
            <Shuffle className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "submit" })}
            className="rounded-full bg-cta px-6 py-2 text-sm font-bold text-cta-foreground transition-colors hover:bg-cta/90"
          >
            Enter
          </button>
        </div>

        {/* Free hints — the anti-paywall differentiator */}
        <button
          type="button"
          onClick={() => {
            setShowHints((v) => !v);
            if (!showHints) dispatch({ type: "use-hint" });
          }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cta hover:underline"
        >
          <Lightbulb className="h-4 w-4" />
          {showHints ? "Hide hints" : "Free hints (no spoilers)"}
        </button>
        {showHints && <HintGrid state={state} />}
      </div>

      {/* Found words */}
      <FoundWords state={state} />
    </div>
  );
}

/** Buddy-style remaining-words grid: first letter × length, minus found. */
function HintGrid({ state }: { state: GameState }) {
  const remaining = state.puzzle.answers.filter(
    (w) => !state.found.includes(w)
  );
  const letters = [...new Set(remaining.map((w) => w[0]))].sort();
  const lengths = [...new Set(remaining.map((w) => w.length))].sort(
    (a, b) => a - b
  );
  const cell = (l: string, n: number) =>
    remaining.filter((w) => w[0] === l && w.length === n).length || null;
  const pangramsLeft = state.puzzle.pangrams.filter(
    (p) => !state.found.includes(p)
  ).length;

  if (remaining.length === 0) return null;

  return (
    <div className="mt-3 w-full overflow-x-auto rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">
        {remaining.length} words left
        {pangramsLeft > 0 ? ` · ${pangramsLeft} pangram${pangramsLeft > 1 ? "s" : ""} still hiding` : ""}
        . Rows are first letters, columns are word lengths.
      </p>
      <table className="mt-2 w-full font-mono text-xs tabular-nums">
        <thead>
          <tr>
            <th />
            {lengths.map((n) => (
              <th key={n} className="px-1.5 py-1 text-center font-semibold text-foreground">
                {n}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {letters.map((l) => (
            <tr key={l}>
              <td
                className={`px-1.5 py-1 font-bold uppercase ${
                  l === state.puzzle.centerLetter
                    ? "text-wordle-present"
                    : "text-foreground"
                }`}
              >
                {l}
              </td>
              {lengths.map((n) => (
                <td key={n} className="px-1.5 py-1 text-center text-muted-foreground">
                  {cell(l, n) ?? "·"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FoundWords({ state }: { state: GameState }) {
  const pg = new Set(state.puzzle.pangrams);
  const sorted = [...state.found].sort();
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="font-heading text-sm font-semibold text-foreground">
        Found {state.found.length} / {state.puzzle.answers.length}
      </h3>
      {sorted.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Your words appear here.
        </p>
      ) : (
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm md:block md:columns-1">
          {sorted.map((w) => (
            <li
              key={w}
              className={
                pg.has(w)
                  ? "font-bold text-wordle-present"
                  : "text-muted-foreground"
              }
            >
              {w.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
