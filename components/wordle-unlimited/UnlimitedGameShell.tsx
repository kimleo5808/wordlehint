"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import WordleGameLoader from "@/components/wordle/WordleGameLoader";
import LengthChips from "./LengthChips";
import ModePills, { type GameModeId } from "./ModePills";
import StatsBadgeBar from "./StatsBadgeBar";

/**
 * UnlimitedGameShell — the fold-1 game container.
 *
 * Wraps the existing WordleGame engine with the editorial-newsprint shell:
 *   - top StatsBadgeBar (signal-red strip)
 *   - bordered game panel with puzzle number tag
 *   - mode pills + length chips + New Round CTA stacked beneath
 *
 * Switching length or hitting "Start a new round" remounts WordleGame by
 * cycling the React key, which is the cleanest way to reset its internal
 * state without touching the engine.
 *
 * Mode pills are visual-only today. Wiring Hard / Color-blind into the
 * shared engine is tracked separately and does not block this page shipping.
 */
export default function UnlimitedGameShell() {
  const [wordLength, setWordLength] = useState(5);
  const [mode, setMode] = useState<GameModeId>("standard");
  const [gameSeed, setGameSeed] = useState(0);

  const handleLengthChange = (length: number) => {
    setWordLength(length);
    setGameSeed((s) => s + 1);
  };

  const handleNewRound = () => {
    setGameSeed((s) => s + 1);
  };

  // Puzzle number is a per-session counter for visual flair, not a real ID.
  const displayNumber = String(gameSeed + 1).padStart(4, "0");

  return (
    <>
      <StatsBadgeBar wordLength={wordLength} />

      <section
        aria-label="Wordle Unlimited game"
        className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 pt-5 pb-6 sm:gap-6 sm:px-6"
      >
        {/* Bordered game panel — frames the engine in newsprint feel */}
        <div className="relative w-full">
          <div className="border border-brand-midInk/60 bg-brand-paper px-3 py-4 dark:border-brand-dark-ink/40 dark:bg-brand-dark-paper sm:px-6 sm:py-5">
            {/* Top-left puzzle number tag */}
            <div className="mb-2 flex items-center justify-between">
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
                Puzzle № {displayNumber}
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.18em] text-brand-subtle">
                {mode === "standard" ? "Standard" : mode.replace("-", " ")}
              </span>
            </div>

            {/* The actual game engine — remounts on length / new-round */}
            <div className="flex justify-center">
              <WordleGameLoader
                key={`${wordLength}-${gameSeed}`}
                wordLength={wordLength}
                hideControls
              />
            </div>
          </div>
        </div>

        <ModePills active={mode} onChange={setMode} />

        <LengthChips active={wordLength} onChange={handleLengthChange} />

        <button
          type="button"
          onClick={handleNewRound}
          className={cn(
            "group inline-flex items-center gap-2 rounded-none bg-brand-ink px-6 py-3 font-fraunces text-base font-medium text-brand-cream",
            "transition-all hover:-translate-y-0.5 hover:bg-brand-signal",
            "dark:bg-brand-dark-ink dark:text-brand-dark-bg dark:hover:bg-brand-signal dark:hover:text-brand-cream"
          )}
        >
          Start a new round
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </section>
    </>
  );
}
