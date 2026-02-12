"use client";

import type { ConnectionsPuzzle } from "@/types/connections";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { PuzzleGridStatic } from "./PuzzleGrid";

const COLOR_LABELS = ["Yellow", "Green", "Blue", "Purple"];

interface AnswerRevealProps {
  puzzle: ConnectionsPuzzle;
}

export function AnswerReveal({ puzzle }: AnswerRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 p-8 text-center dark:border-purple-800/40 dark:bg-purple-950/10">
        <EyeOff className="mx-auto h-8 w-8 text-purple-400" />
        <h3 className="mt-3 font-heading text-lg font-bold text-foreground">
          Spoiler Warning
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The complete answers for today&apos;s Connections puzzle are hidden below.
        </p>
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-700"
        >
          <Eye className="h-4 w-4" />
          Reveal All Answers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-foreground">
          Complete Answers
        </h3>
        <button
          onClick={() => setRevealed(false)}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Hide answers
        </button>
      </div>
      <PuzzleGridStatic puzzle={puzzle} />
    </div>
  );
}
