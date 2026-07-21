"use client";

import { cn } from "@/lib/utils";
import type { ConnectionsPuzzle } from "@/types/connections";
import { useCallback, useEffect, useState } from "react";
import ConnectionsGame, { SAVE_KEY } from "./ConnectionsGame";
import type { GameState } from "./gameReducer";
import StatsBadgeBar from "./StatsBadgeBar";

const PLAYED_KEY = "connections-unlimited:played";
const STATS_KEY = "connections-unlimited:stats";

type LocalStats = { played: number; won: number };

/**
 * UnlimitedConnectionsShell — the fold-1 game container.
 *
 * Receives the build-time puzzle pool from the server page, then does all
 * randomness client-side: restore an in-progress round from localStorage if
 * one exists, otherwise deal a random board the player hasn't cleared on
 * this device. "New puzzle" remounts ConnectionsGame via a cycling key.
 */
export default function UnlimitedConnectionsShell({
  pool,
}: {
  pool: ConnectionsPuzzle[];
}) {
  const [puzzle, setPuzzle] = useState<ConnectionsPuzzle | null>(null);
  const [savedState, setSavedState] = useState<GameState | undefined>(undefined);
  const [gameSeed, setGameSeed] = useState(0);
  const [stats, setStats] = useState<LocalStats>({ played: 0, won: 0 });

  const pickPuzzle = useCallback((): ConnectionsPuzzle => {
    let playedIds: number[] = [];
    try {
      playedIds = JSON.parse(localStorage.getItem(PLAYED_KEY) ?? "[]");
    } catch {
      playedIds = [];
    }
    let candidates = pool.filter((p) => !playedIds.includes(p.id));
    if (candidates.length === 0) {
      // Pool exhausted on this device — reset the played list and start over.
      try {
        localStorage.removeItem(PLAYED_KEY);
      } catch {}
      candidates = pool;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, [pool]);

  // Client-only setup: restore a saved round or deal a fresh one.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as GameState;
        if (saved?.status === "playing" && saved.puzzle?.groups?.length === 4) {
          setSavedState(saved);
          setPuzzle(saved.puzzle);
          return;
        }
      }
    } catch {}
    setPuzzle(pickPuzzle());
  }, [pickPuzzle]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (raw) setStats(JSON.parse(raw));
    } catch {}
  }, []);

  const handleGameEnd = useCallback((won: boolean, puzzleId: number) => {
    try {
      const playedIds: number[] = JSON.parse(
        localStorage.getItem(PLAYED_KEY) ?? "[]"
      );
      if (!playedIds.includes(puzzleId)) {
        playedIds.push(puzzleId);
        localStorage.setItem(PLAYED_KEY, JSON.stringify(playedIds));
      }
      setStats((prev) => {
        const next = { played: prev.played + 1, won: prev.won + (won ? 1 : 0) };
        localStorage.setItem(STATS_KEY, JSON.stringify(next));
        return next;
      });
    } catch {}
  }, []);

  const handleNewPuzzle = useCallback(() => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {}
    setSavedState(undefined);
    setPuzzle(pickPuzzle());
    setGameSeed((s) => s + 1);
  }, [pickPuzzle]);

  const winRate =
    stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : null;

  return (
    <>
      <StatsBadgeBar />

      {/* Visible page title above the board */}
      <div className="px-4 pt-6 text-center sm:pt-8">
        <h1 className="font-fraunces text-3xl font-bold text-brand-ink sm:text-4xl dark:text-brand-dark-ink">
          Connections Unlimited
        </h1>
        <p className="mt-2 font-plex-mono text-[11px] uppercase tracking-[0.18em] text-brand-subtle">
          Endless 16-word grouping puzzles · Free · No daily limit
        </p>
      </div>

      <section
        aria-label="Connections Unlimited game"
        className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 pt-5 pb-6 sm:gap-6 sm:px-6"
      >
        {/* Bordered game panel — frames the board in newsprint feel */}
        <div className="relative w-full">
          <div className="border border-brand-midInk/60 bg-brand-paper px-3 py-4 dark:border-brand-dark-ink/40 dark:bg-brand-dark-paper sm:px-6 sm:py-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
                {puzzle ? `Puzzle № ${String(puzzle.id).padStart(4, "0")}` : "Dealing…"}
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
                {winRate === null
                  ? "First board"
                  : `${stats.played} played · ${winRate}% won`}
              </span>
            </div>

            {puzzle ? (
              <ConnectionsGame
                key={`${puzzle.id}-${gameSeed}`}
                puzzle={puzzle}
                savedState={savedState}
                onGameEnd={handleGameEnd}
                onNewPuzzle={handleNewPuzzle}
              />
            ) : (
              // Pre-hydration skeleton keeps the fold height stable.
              <div
                aria-hidden="true"
                className="grid grid-cols-4 gap-1.5 sm:gap-2"
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="min-h-[52px] animate-pulse rounded-sm border border-brand-midInk/20 bg-brand-cream/60 sm:min-h-[60px] dark:border-brand-dark-ink/10 dark:bg-brand-dark-bg/60"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNewPuzzle}
          className={cn(
            "group inline-flex items-center gap-2 rounded-none bg-brand-ink px-6 py-3 font-fraunces text-base font-medium text-brand-cream",
            "transition-all hover:-translate-y-0.5 hover:bg-brand-signal",
            "dark:bg-brand-dark-ink dark:text-brand-dark-bg dark:hover:bg-brand-signal dark:hover:text-brand-cream"
          )}
        >
          Start a new puzzle
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </section>
    </>
  );
}
