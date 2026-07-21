"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import type { GameState, PlayableStrandsPuzzle } from "./gameReducer";
import StatsBadgeBar from "./StatsBadgeBar";
import StrandsGame, { SAVE_KEY } from "./StrandsGame";

const PLAYED_KEY = "strands-unlimited:played";
const STATS_KEY = "strands-unlimited:stats";

type LocalStats = { played: number };

/**
 * UnlimitedStrandsShell — the fold-1 game container.
 *
 * Same pattern as the Connections shell: server passes the build-time pool,
 * all randomness happens client-side, saved rounds resume from localStorage,
 * and "New puzzle" remounts StrandsGame via a cycling key. Strands has no
 * fail state, so local stats track boards cleared rather than a win rate.
 */
export default function UnlimitedStrandsShell({
  pool,
}: {
  pool: PlayableStrandsPuzzle[];
}) {
  const [puzzle, setPuzzle] = useState<PlayableStrandsPuzzle | null>(null);
  const [savedState, setSavedState] = useState<GameState | undefined>(undefined);
  const [gameSeed, setGameSeed] = useState(0);
  const [stats, setStats] = useState<LocalStats>({ played: 0 });

  const pickPuzzle = useCallback((): PlayableStrandsPuzzle => {
    let playedIds: number[] = [];
    try {
      playedIds = JSON.parse(localStorage.getItem(PLAYED_KEY) ?? "[]");
    } catch {}
    let candidates = pool.filter((p) => !playedIds.includes(p.id));
    if (candidates.length === 0) {
      try {
        localStorage.removeItem(PLAYED_KEY);
      } catch {}
      candidates = pool;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, [pool]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as GameState;
        if (saved?.status === "playing" && saved.puzzle?.paths) {
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

  const handleGameEnd = useCallback((puzzleId: number) => {
    try {
      const playedIds: number[] = JSON.parse(
        localStorage.getItem(PLAYED_KEY) ?? "[]"
      );
      if (!playedIds.includes(puzzleId)) {
        playedIds.push(puzzleId);
        localStorage.setItem(PLAYED_KEY, JSON.stringify(playedIds));
      }
      setStats((prev) => {
        const next = { played: prev.played + 1 };
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

  return (
    <>
      <StatsBadgeBar />

      {/* Visible page title above the board */}
      <div className="px-4 pt-6 text-center sm:pt-8">
        <h1 className="font-fraunces text-3xl font-bold text-brand-ink sm:text-4xl dark:text-brand-dark-ink">
          Strands Unlimited
        </h1>
        <p className="mt-2 font-plex-mono text-[11px] uppercase tracking-[0.18em] text-brand-subtle">
          Endless theme-word boards · Free · No daily limit
        </p>
      </div>

      <section
        aria-label="Strands Unlimited game"
        className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 pt-5 pb-6 sm:gap-6 sm:px-6"
      >
        <div className="relative w-full">
          <div className="border border-brand-midInk/60 bg-brand-paper px-3 py-4 dark:border-brand-dark-ink/40 dark:bg-brand-dark-paper sm:px-6 sm:py-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
                {puzzle ? `Puzzle № ${String(puzzle.id).padStart(4, "0")}` : "Dealing…"}
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
                {stats.played === 0
                  ? "First board"
                  : `${stats.played} board${stats.played === 1 ? "" : "s"} cleared`}
              </span>
            </div>

            {puzzle ? (
              <StrandsGame
                key={`${puzzle.id}-${gameSeed}`}
                puzzle={puzzle}
                savedState={savedState}
                onGameEnd={handleGameEnd}
                onNewPuzzle={handleNewPuzzle}
              />
            ) : (
              <div aria-hidden="true" className="mx-auto aspect-[6/8] w-full max-w-[336px]">
                <div className="grid h-full w-full grid-cols-6 grid-rows-8">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <span className="h-[70%] w-[70%] animate-pulse rounded-full bg-brand-cream/80 dark:bg-brand-dark-bg/60" />
                    </div>
                  ))}
                </div>
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
