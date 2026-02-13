"use client";

import { useState } from "react";
import type { HintLevel } from "@/lib/wordle-hints";
import { Eye, Lock } from "lucide-react";

const LEVEL_COLORS = [
  "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
];

export default function DailyHintCard({ hints }: { hints: HintLevel[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const revealHint = (level: number) => {
    setRevealed((prev) => new Set(prev).add(level));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Progressive Hints
        </h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {revealed.size}/{hints.length} revealed
        </span>
      </div>

      <div className="space-y-2">
        {hints.map((hint, idx) => {
          const isRevealed = revealed.has(hint.level);
          const colorClass = LEVEL_COLORS[idx] || LEVEL_COLORS[0];

          return (
            <div
              key={hint.level}
              className={`rounded-xl border transition-all ${
                isRevealed ? colorClass : "border-border bg-card"
              }`}
            >
              {isRevealed ? (
                <div className="flex items-start gap-3 px-4 py-3">
                  <span className="mt-0.5 text-lg" role="img" aria-hidden>
                    {hint.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
                      Hint {hint.level} — {hint.label}
                    </div>
                    <p className="mt-1 text-sm font-medium leading-relaxed">
                      {hint.hint}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => revealHint(hint.level)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
                >
                  <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-foreground">
                      Hint {hint.level} — {hint.label}
                    </span>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Click to reveal
                    </p>
                  </div>
                  <Eye className="h-4 w-4 shrink-0 text-primary/60" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
