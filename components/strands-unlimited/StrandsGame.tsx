"use client";

import { Link as I18nLink } from "@/i18n/routing";
import { COLS, ROWS } from "@/lib/strands-solver";
import { cn } from "@/lib/utils";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  createInitialState,
  gameReducer,
  lockedCells,
  type GameState,
  type PlayableStrandsPuzzle,
} from "./gameReducer";

// In-game colours, matching components/strands (StrandsHints/StrandsArchive).
const THEME = "#3b82f6"; // blue — theme words
const SPANGRAM = "#eab308"; // yellow — spangram

export const SAVE_KEY = "strands-unlimited:state";

/**
 * StrandsGame — the playable 6×8 trace board.
 *
 * Selection supports both tap-by-tap and drag: pointer moves are mapped to
 * cells geometrically (works for mouse and touch alike), a drag release
 * submits, and tapping the last cell again also submits. Found words snap
 * to the solver's canonical paths so the board always stays tileable.
 */
export default function StrandsGame({
  puzzle,
  savedState,
  onGameEnd,
  onNewPuzzle,
}: {
  puzzle: PlayableStrandsPuzzle;
  savedState?: GameState;
  onGameEnd: (puzzleId: number) => void;
  onNewPuzzle: () => void;
}) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    () => savedState ?? createInitialState(puzzle)
  );
  const [copied, setCopied] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ active: boolean; moved: boolean }>({
    active: false,
    moved: false,
  });

  // Persist in-progress rounds; clear the save once won.
  useEffect(() => {
    try {
      if (state.status === "playing") {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      } else {
        localStorage.removeItem(SAVE_KEY);
      }
    } catch {}
  }, [state]);

  useEffect(() => {
    if (state.status === "won") onGameEnd(state.puzzle.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  useEffect(() => {
    if (!state.feedback) return;
    const t = setTimeout(() => dispatch({ type: "CLEAR_FEEDBACK" }), 2000);
    return () => clearTimeout(t);
  }, [state.feedback]);

  const letters = state.puzzle.board.join("");
  const locked = lockedCells(state);
  const spangramCells = new Set(
    state.found.find((f) => f.spangram)?.path ?? []
  );
  const hintCells = new Set(
    state.hintWord ? state.puzzle.paths[state.hintWord] : []
  );
  const currentWord = state.path.map((c) => letters[c]).join("");
  const won = state.status === "won";

  const cellFromEvent = (e: React.PointerEvent): number | null => {
    const el = boardRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const c = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
    const r = Math.floor(((e.clientY - rect.top) / rect.height) * ROWS);
    if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return null;
    return r * COLS + c;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (won) return;
    const cell = cellFromEvent(e);
    if (cell === null) return;
    dragRef.current = { active: true, moved: false };
    const last = state.path[state.path.length - 1];
    if (cell === last && state.path.length >= 4) {
      // Tapping the trace's last cell again submits.
      dispatch({ type: "SUBMIT" });
      dragRef.current.active = false;
      return;
    }
    dispatch({ type: "TAP_CELL", cell });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active || won) return;
    const cell = cellFromEvent(e);
    if (cell === null) return;
    const last = state.path[state.path.length - 1];
    if (cell !== last) {
      dragRef.current.moved = true;
      dispatch({ type: "TAP_CELL", cell });
    }
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;
    const wasDrag = dragRef.current.moved;
    dragRef.current = { active: false, moved: false };
    // Releasing a multi-cell drag submits, like the original.
    if (wasDrag && state.path.length >= 4) dispatch({ type: "SUBMIT" });
  };

  const handleShare = async () => {
    const icons = state.found
      .map((f) => (f.spangram ? "🟡" : "🔵"))
      .join("");
    const hintsUsed = 3 - state.hintsLeft;
    const text = `Strands Unlimited · Puzzle #${state.puzzle.id}\n"${state.puzzle.clue}"\n${icons}${hintsUsed > 0 ? ` · 💡×${hintsUsed}` : " · no hints"}\nwordlehint.info/strands-unlimited`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  /** SVG polyline points for a path, in board units (cell = 1×1). */
  const linePoints = (path: number[]) =>
    path
      .map((c) => `${(c % COLS) + 0.5},${Math.floor(c / COLS) + 0.5}`)
      .join(" ");

  return (
    <div className="w-full">
      {/* Clue card */}
      <div className="mb-3 border-l-2 border-brand-signal bg-brand-cream/70 px-3 py-2 text-center dark:bg-brand-dark-bg/50">
        <div className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
          Today&apos;s theme
        </div>
        <div className="font-fraunces text-lg font-semibold text-brand-ink dark:text-brand-dark-ink">
          {state.puzzle.clue}
        </div>
      </div>

      {/* Current trace + feedback line */}
      <div
        className="flex h-8 items-center justify-center"
        aria-live="polite"
      >
        {state.feedback?.kind === "theme" && (
          <span className="font-plex-mono text-[12px] uppercase tracking-[0.14em]" style={{ color: THEME }}>
            {state.feedback.word} ✓
          </span>
        )}
        {state.feedback?.kind === "spangram" && (
          <span className="font-plex-mono text-[12px] uppercase tracking-[0.14em]" style={{ color: "#a16207" }}>
            Spangram!
          </span>
        )}
        {state.feedback?.kind === "wrong" && (
          <span className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-brand-signal">
            Not a theme word
          </span>
        )}
        {state.feedback?.kind === "already" && (
          <span className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-brand-subtle">
            Already found
          </span>
        )}
        {state.feedback?.kind === "too-short" && (
          <span className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-brand-subtle">
            Words need 4+ letters
          </span>
        )}
        {!state.feedback && currentWord && (
          <span className="font-plex-mono text-[15px] font-semibold uppercase tracking-[0.2em] text-brand-ink dark:text-brand-dark-ink">
            {currentWord}
          </span>
        )}
      </div>

      {/* Trace board */}
      <div
        ref={boardRef}
        className="relative mx-auto aspect-[6/8] w-full max-w-[336px] touch-none select-none sm:max-w-[360px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        role="application"
        aria-label={`Strands board, theme: ${state.puzzle.clue}. Trace adjacent letters to form theme words.`}
      >
        {/* Connection lines under the letters */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${COLS} ${ROWS}`}
          aria-hidden="true"
        >
          {state.found.map((f) => (
            <polyline
              key={f.word}
              points={linePoints(f.path)}
              fill="none"
              stroke={f.spangram ? SPANGRAM : THEME}
              strokeOpacity="0.35"
              strokeWidth="0.16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {state.path.length > 1 && (
            <polyline
              points={linePoints(state.path)}
              fill="none"
              stroke="#1A1814"
              strokeOpacity="0.4"
              strokeWidth="0.14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>

        {/* Letter cells */}
        <div className="grid h-full w-full grid-cols-6 grid-rows-8">
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const isLocked = locked.has(i);
            const isSpan = spangramCells.has(i);
            const inPath = state.path.includes(i);
            const isHinted = hintCells.has(i) && !isLocked;
            return (
              <div key={i} className="flex items-center justify-center">
                <span
                  className={cn(
                    "flex h-[85%] w-[85%] items-center justify-center rounded-full font-plex-sans text-base font-semibold transition-colors sm:text-lg",
                    !isLocked &&
                      !inPath &&
                      "text-brand-ink dark:text-brand-dark-ink",
                    inPath &&
                      !isLocked &&
                      "bg-brand-ink text-brand-cream dark:bg-brand-dark-ink dark:text-brand-dark-bg",
                    isHinted && "ring-2 ring-brand-signal ring-offset-1"
                  )}
                  style={
                    isLocked
                      ? {
                          backgroundColor: isSpan ? SPANGRAM : THEME,
                          color: isSpan ? "#1a1505" : "#f8fafc",
                        }
                      : undefined
                  }
                >
                  {letters[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress + controls */}
      <div className="mt-3 flex items-center justify-between">
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-brand-subtle">
          {state.found.length} of {state.puzzle.themeWords.length + 1} found
        </span>
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-brand-subtle">
          Hints {state.hintsLeft}/3
        </span>
      </div>

      {!won && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "CLEAR_PATH" })}
            disabled={state.path.length === 0}
            className={cn(
              "rounded-none border px-4 py-2 font-plex-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
              state.path.length === 0
                ? "cursor-not-allowed border-brand-tan text-brand-subtle/60 dark:border-brand-dark-ink/20"
                : "border-brand-midInk/50 text-brand-ink hover:border-brand-ink dark:border-brand-dark-ink/40 dark:text-brand-dark-ink"
            )}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "USE_HINT" })}
            disabled={state.hintsLeft <= 0 || !!state.hintWord}
            className={cn(
              "rounded-none border px-4 py-2 font-plex-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
              state.hintsLeft <= 0 || state.hintWord
                ? "cursor-not-allowed border-brand-tan text-brand-subtle/60 dark:border-brand-dark-ink/20"
                : "border-brand-midInk/50 text-brand-ink hover:border-brand-ink dark:border-brand-dark-ink/40 dark:text-brand-dark-ink"
            )}
          >
            {state.hintWord ? "Hint active" : `Hint (${state.hintsLeft} left)`}
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "SUBMIT" })}
            disabled={state.path.length < 4}
            className={cn(
              "rounded-none px-5 py-2 font-fraunces text-sm font-medium transition-all",
              state.path.length >= 4
                ? "bg-brand-ink text-brand-cream hover:-translate-y-0.5 hover:bg-brand-signal dark:bg-brand-dark-ink dark:text-brand-dark-bg"
                : "cursor-not-allowed bg-brand-tan/60 text-brand-subtle dark:bg-brand-dark-ink/20"
            )}
          >
            Submit
          </button>
        </div>
      )}

      {/* Results card */}
      {won && (
        <div className="mt-4 border border-brand-midInk/50 bg-brand-paper px-4 py-5 text-center dark:border-brand-dark-ink/30 dark:bg-brand-dark-paper">
          <div className="font-fraunces text-xl font-bold text-brand-ink dark:text-brand-dark-ink">
            Board cleared!
          </div>
          <div className="mt-1 font-newsreader text-[14px] text-brand-ink/75 dark:text-brand-dark-ink/75">
            {`All ${state.puzzle.themeWords.length + 1} words found${
              state.hintsLeft === 3
                ? ", no hints needed."
                : ` with ${3 - state.hintsLeft} hint${3 - state.hintsLeft === 1 ? "" : "s"}.`
            }`}
          </div>
          <div className="mt-3 text-lg tracking-wider" aria-label="Words in the order you found them">
            {state.found.map((f) => (f.spangram ? "🟡" : "🔵")).join(" ")}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="rounded-none border border-brand-ink px-4 py-2 font-plex-mono text-[11px] uppercase tracking-[0.14em] text-brand-ink transition-colors hover:bg-brand-ink hover:text-brand-cream dark:border-brand-dark-ink dark:text-brand-dark-ink dark:hover:bg-brand-dark-ink dark:hover:text-brand-dark-bg"
            >
              {copied ? "Copied!" : "Share result"}
            </button>
            <button
              type="button"
              onClick={onNewPuzzle}
              className="rounded-none bg-brand-ink px-5 py-2 font-fraunces text-sm font-medium text-brand-cream transition-all hover:-translate-y-0.5 hover:bg-brand-signal dark:bg-brand-dark-ink dark:text-brand-dark-bg dark:hover:bg-brand-signal dark:hover:text-brand-cream"
            >
              New puzzle →
            </button>
          </div>
          <div className="mt-3 font-newsreader text-[13px] text-brand-ink/60 dark:text-brand-dark-ink/60">
            Tackling today&apos;s official board next?{" "}
            <I18nLink
              href="/strands-hint-today"
              className="underline decoration-brand-signal underline-offset-2 hover:text-brand-signal"
            >
              Get today&apos;s Strands hint
            </I18nLink>
          </div>
        </div>
      )}
    </div>
  );
}
