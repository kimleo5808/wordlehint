"use client";

import { CONN_COLORS, type ConnColor } from "@/components/connections/colors";
import { Link as I18nLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { ConnectionsLevel, ConnectionsPuzzle } from "@/types/connections";
import { useEffect, useReducer, useState } from "react";
import {
  createInitialState,
  currentHintTarget,
  gameReducer,
  type GameState,
} from "./gameReducer";

const LEVEL_COLOR: ConnColor[] = ["yellow", "green", "blue", "purple"];
const LEVEL_LABEL = ["Easiest", "Easy", "Hard", "Trickiest"];
const LEVEL_EMOJI = ["🟨", "🟩", "🟦", "🟪"];

export const SAVE_KEY = "connections-unlimited:state";

/**
 * ConnectionsGame — the playable 16-word grouping board.
 *
 * Pure client component driven by gameReducer. Persists the in-progress
 * round to localStorage so a reload resumes the same board, and clears the
 * save once the round ends. Styling follows the editorial-newsprint shell
 * with the official four difficulty colours applied via inline style
 * (CONN_COLORS) so Tailwind's JIT purge never drops them.
 */
export default function ConnectionsGame({
  puzzle,
  savedState,
  onGameEnd,
  onNewPuzzle,
}: {
  puzzle: ConnectionsPuzzle;
  savedState?: GameState;
  onGameEnd: (won: boolean, puzzleId: number) => void;
  onNewPuzzle: () => void;
}) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    () => savedState ?? createInitialState(puzzle)
  );
  const [copied, setCopied] = useState(false);

  // Persist in-progress rounds; clear the save when the round ends.
  useEffect(() => {
    try {
      if (state.status === "playing") {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      } else {
        localStorage.removeItem(SAVE_KEY);
      }
    } catch {
      // Storage unavailable (private mode) — play on without persistence.
    }
  }, [state]);

  // Report the result exactly once per finished round.
  useEffect(() => {
    if (state.status !== "playing") {
      onGameEnd(state.status === "won", state.puzzle.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  // Transient feedback auto-clears.
  useEffect(() => {
    if (!state.feedback) return;
    const t = setTimeout(() => dispatch({ type: "CLEAR_FEEDBACK" }), 2200);
    return () => clearTimeout(t);
  }, [state.feedback]);

  const hintTarget = currentHintTarget(state);
  const finished = state.status !== "playing";

  const handleShare = async () => {
    const rows = state.guessHistory
      .map((levels) => levels.map((l) => LEVEL_EMOJI[l]).join(""))
      .join("\n");
    const text = `Connections Unlimited · Puzzle #${state.puzzle.id}\n${rows}\nwordlehint.info/connections-unlimited`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently ignore.
    }
  };

  return (
    <div className="w-full">
      {/* Local keyframes for the wrong-guess shake, scoped by class name. */}
      <style>{`
        @keyframes conn-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .conn-shake-selected[aria-pressed="true"] {
          animation: conn-shake 0.45s ease-in-out;
        }
      `}</style>

      {/* Solved group banners, in the order they were cleared */}
      {state.solvedGroups.length > 0 && (
        <div className="mb-2 space-y-1.5">
          {state.solvedGroups.map((group) => {
            const c = CONN_COLORS[LEVEL_COLOR[group.level]];
            return (
              <div
                key={group.level}
                className="flex flex-col items-center justify-center rounded-sm px-3 py-2.5 text-center"
                style={{ backgroundColor: c.bg, color: c.text }}
              >
                <div className="font-plex-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                  {LEVEL_LABEL[group.level]}
                </div>
                <div className="font-fraunces text-sm font-bold uppercase sm:text-base">
                  {group.name}
                </div>
                <div className="font-plex-sans text-[11px] font-medium uppercase tracking-wide sm:text-xs">
                  {group.words.join(", ")}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* The 4-column word grid */}
      {state.gridWords.length > 0 && (
        <div
          key={state.shakeSeed}
          className="grid grid-cols-4 gap-1.5 sm:gap-2"
          role="group"
          aria-label="Word grid: select four words that share a category"
        >
          {state.gridWords.map((word) => {
            const isSelected = state.selected.includes(word);
            const isHinted = state.hintWord === word;
            const isFull = state.selected.length >= 4 && !isSelected;
            return (
              <button
                key={word}
                type="button"
                aria-pressed={isSelected}
                disabled={finished}
                onClick={() => dispatch({ type: "TOGGLE_WORD", word })}
                className={cn(
                  "conn-shake-selected flex min-h-[52px] items-center justify-center rounded-sm border px-1 py-2 text-center font-plex-sans font-semibold uppercase transition-all sm:min-h-[60px]",
                  wordSizeClass(word),
                  isSelected
                    ? "scale-[0.97] border-brand-ink bg-brand-ink text-brand-cream dark:border-brand-dark-ink dark:bg-brand-dark-ink dark:text-brand-dark-bg"
                    : "border-brand-midInk/40 bg-brand-paper text-brand-ink hover:border-brand-ink dark:border-brand-dark-ink/30 dark:bg-brand-dark-paper dark:text-brand-dark-ink",
                  isFull && !isSelected && "opacity-60",
                  isHinted &&
                    !isSelected &&
                    "border-brand-signal ring-2 ring-brand-signal ring-offset-1"
                )}
              >
                <span className="break-words leading-tight">{word}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Mistakes + transient feedback */}
      <div className="mt-3 flex items-center justify-between">
        <div
          className="flex items-center gap-2"
          aria-live="polite"
          aria-label={`${state.mistakesLeft} mistakes remaining`}
        >
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.16em] text-brand-subtle">
            Mistakes
          </span>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                i < state.mistakesLeft
                  ? "bg-brand-ink dark:bg-brand-dark-ink"
                  : "bg-brand-tan dark:bg-brand-dark-ink/20"
              )}
            />
          ))}
        </div>
        <div
          aria-live="polite"
          className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-brand-signal"
        >
          {state.feedback?.kind === "one-away" && "One away!"}
          {state.feedback?.kind === "wrong" && "Not a group"}
          {state.feedback?.kind === "duplicate" && "Already guessed"}
          {state.feedback?.kind === "correct" &&
            `${LEVEL_LABEL[state.feedback.level]} solved`}
        </div>
      </div>

      {/* Hint readout */}
      {!finished && state.hintTier > 0 && hintTarget && (
        <div className="mt-3 border-l-2 border-brand-signal bg-brand-paper px-3 py-2 dark:bg-brand-dark-paper">
          <div className="font-plex-mono text-[10px] uppercase tracking-[0.16em] text-brand-subtle">
            Hint · {LEVEL_LABEL[hintTarget.level]} group
          </div>
          <div className="font-newsreader text-[14px] text-brand-ink dark:text-brand-dark-ink">
            {state.hintTier >= 1 && (
              <span>
                First letters:{" "}
                <span className="font-plex-mono font-semibold">
                  {hintTarget.words.map((w) => w[0]).join(" · ")}
                </span>
              </span>
            )}
            {state.hintTier >= 2 && (
              <span>
                {" — category: "}
                <span className="font-semibold uppercase">{hintTarget.name}</span>
              </span>
            )}
            {state.hintTier >= 3 && <span>. One member is highlighted above.</span>}
          </div>
        </div>
      )}

      {/* Controls */}
      {!finished && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <GhostButton
            onClick={() => dispatch({ type: "SHUFFLE" })}
            label="Shuffle"
          />
          <GhostButton
            onClick={() => dispatch({ type: "DESELECT_ALL" })}
            label="Deselect all"
            disabled={state.selected.length === 0}
          />
          <GhostButton
            onClick={() => dispatch({ type: "USE_HINT" })}
            label={state.hintTier >= 3 ? "No more hints" : `Hint (${state.hintTier}/3)`}
            disabled={state.hintTier >= 3}
          />
          <button
            type="button"
            onClick={() => dispatch({ type: "SUBMIT" })}
            disabled={state.selected.length !== 4}
            className={cn(
              "rounded-none px-5 py-2 font-fraunces text-sm font-medium transition-all",
              state.selected.length === 4
                ? "bg-brand-ink text-brand-cream hover:-translate-y-0.5 hover:bg-brand-signal dark:bg-brand-dark-ink dark:text-brand-dark-bg dark:hover:bg-brand-signal dark:hover:text-brand-cream"
                : "cursor-not-allowed bg-brand-tan/60 text-brand-subtle dark:bg-brand-dark-ink/20"
            )}
          >
            Submit
          </button>
        </div>
      )}

      {/* Results card */}
      {finished && (
        <div className="mt-4 border border-brand-midInk/50 bg-brand-paper px-4 py-5 text-center dark:border-brand-dark-ink/30 dark:bg-brand-dark-paper">
          <div className="font-fraunces text-xl font-bold text-brand-ink dark:text-brand-dark-ink">
            {state.status === "won" ? "Solved it!" : "Next one's yours"}
          </div>
          <div className="mt-1 font-newsreader text-[14px] text-brand-ink/75 dark:text-brand-dark-ink/75">
            {state.status === "won"
              ? `Cleared with ${state.mistakesLeft} mistake${
                  state.mistakesLeft === 1 ? "" : "s"
                } to spare${
                  state.hintsUsed > 0
                    ? ` and ${state.hintsUsed} hint${state.hintsUsed === 1 ? "" : "s"}`
                    : ", no hints"
                }.`
              : "All four groups are revealed above. Every board teaches a trap."}
          </div>

          {/* Guess history share graphic */}
          <div
            className="mx-auto mt-3 inline-flex flex-col gap-1"
            aria-label="Your guess history"
          >
            {state.guessHistory.map((levels, i) => (
              <div key={i} className="flex gap-1">
                {levels.map((level, j) => (
                  <span
                    key={j}
                    className="h-4 w-4 rounded-[3px]"
                    style={{ backgroundColor: CONN_COLORS[LEVEL_COLOR[level]].bg }}
                  />
                ))}
              </div>
            ))}
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
            Playing today&apos;s official grid next?{" "}
            <I18nLink
              href="/connections-hint-today"
              className="underline decoration-brand-signal underline-offset-2 hover:text-brand-signal"
            >
              Get today&apos;s Connections hint
            </I18nLink>
          </div>
        </div>
      )}
    </div>
  );
}

/** Word-length-adaptive type size so long entries stay on their tile. */
function wordSizeClass(word: string): string {
  if (word.length > 10) return "text-[9px] sm:text-[11px]";
  if (word.length > 7) return "text-[10px] sm:text-xs";
  return "text-[11px] sm:text-sm";
}

function GhostButton({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-none border px-4 py-2 font-plex-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
        disabled
          ? "cursor-not-allowed border-brand-tan text-brand-subtle/60 dark:border-brand-dark-ink/20"
          : "border-brand-midInk/50 text-brand-ink hover:border-brand-ink hover:bg-brand-cream/60 dark:border-brand-dark-ink/40 dark:text-brand-dark-ink dark:hover:bg-brand-dark-paper"
      )}
    >
      {label}
    </button>
  );
}
