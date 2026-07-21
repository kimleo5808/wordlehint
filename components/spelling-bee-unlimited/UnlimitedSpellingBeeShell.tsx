"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import SpellingBeeGame from "./SpellingBeeGame";
import type { UnlimitedBeePuzzle } from "./gameReducer";

const SAVE_KEY = "sbu_round_v1";
const PLAYED_KEY = "sbu_played_v1";
const STATS_KEY = "sbu_stats_v1";

interface SavedRound {
  puzzleId: number;
  found: string[];
}

interface LocalStats {
  played: number;
  genius: number;
  queenBee: number;
}

/**
 * Fold-1 container for Spelling Bee Unlimited. The server page passes the
 * build-time pool (anonymised archive puzzles); all randomness happens
 * client-side: restore an in-progress round from localStorage if one exists,
 * otherwise deal a puzzle this device hasn't finished. "New puzzle" remounts
 * SpellingBeeGame via a cycling key.
 */
export default function UnlimitedSpellingBeeShell({
  pool,
}: {
  pool: UnlimitedBeePuzzle[];
}) {
  const [puzzle, setPuzzle] = useState<UnlimitedBeePuzzle | null>(null);
  const [savedFound, setSavedFound] = useState<string[] | undefined>(undefined);
  const [gameSeed, setGameSeed] = useState(0);
  const [stats, setStats] = useState<LocalStats>({
    played: 0,
    genius: 0,
    queenBee: 0,
  });

  const pickPuzzle = useCallback((): UnlimitedBeePuzzle => {
    let playedIds: number[] = [];
    try {
      playedIds = JSON.parse(localStorage.getItem(PLAYED_KEY) ?? "[]");
    } catch {
      playedIds = [];
    }
    let candidates = pool.filter((p) => !playedIds.includes(p.id));
    if (candidates.length === 0) {
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
      const s = localStorage.getItem(STATS_KEY);
      if (s) setStats(JSON.parse(s));
    } catch {}
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SavedRound;
        const match = pool.find((p) => p.id === saved.puzzleId);
        if (match && Array.isArray(saved.found)) {
          setPuzzle(match);
          setSavedFound(saved.found);
          return;
        }
      }
    } catch {}
    setPuzzle(pickPuzzle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProgress = useCallback(
    (p: { found: string[]; score: number; rank: string; queenBee: boolean }) => {
      if (!puzzle) return;
      try {
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({ puzzleId: puzzle.id, found: p.found })
        );
      } catch {}
      if (p.rank === "Genius" || p.queenBee) {
        // Reaching Genius counts the round as played (once).
        try {
          const playedIds: number[] = JSON.parse(
            localStorage.getItem(PLAYED_KEY) ?? "[]"
          );
          if (!playedIds.includes(puzzle.id)) {
            playedIds.push(puzzle.id);
            localStorage.setItem(PLAYED_KEY, JSON.stringify(playedIds));
            const next: LocalStats = {
              played: stats.played + 1,
              genius: stats.genius + 1,
              queenBee: stats.queenBee + (p.queenBee ? 1 : 0),
            };
            setStats(next);
            localStorage.setItem(STATS_KEY, JSON.stringify(next));
          }
        } catch {}
      }
    },
    [puzzle, stats]
  );

  const newPuzzle = useCallback(() => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {}
    setSavedFound(undefined);
    setPuzzle(pickPuzzle());
    setGameSeed((s) => s + 1);
  }, [pickPuzzle]);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 pt-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Spelling Bee Unlimited
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {pool.length} curated archive puzzles · no daily limit · free hints
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs tabular-nums text-muted-foreground">
            Genius ×{stats.genius} · Queen Bee ×{stats.queenBee}
          </span>
          <button
            type="button"
            onClick={newPuzzle}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            New puzzle
          </button>
        </div>
      </div>

      <div className="mt-6 min-h-[480px]">
        {puzzle ? (
          <SpellingBeeGame
            key={`${puzzle.id}-${gameSeed}`}
            puzzle={puzzle}
            savedFound={savedFound}
            onProgress={handleProgress}
          />
        ) : (
          <div className="flex h-[480px] items-center justify-center text-sm text-muted-foreground">
            Dealing a puzzle…
          </div>
        )}
      </div>
    </section>
  );
}
