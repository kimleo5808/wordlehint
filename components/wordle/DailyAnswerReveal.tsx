"use client";

import { useState } from "react";
import { AlertTriangle, Eye } from "lucide-react";

const TILE_COLOR = "bg-wordle-correct text-white";

export default function DailyAnswerReveal({ answer }: { answer: string }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        Today&apos;s Answer
      </h3>

      {showAnswer ? (
        <div className="mt-4">
          <div className="flex justify-center gap-1.5">
            {answer.split("").map((letter, i) => (
              <div
                key={i}
                className={`flex h-14 w-14 items-center justify-center rounded-lg ${TILE_COLOR} font-heading text-2xl font-bold shadow-md sm:h-16 sm:w-16 sm:text-3xl`}
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            The answer is <strong className="text-foreground">{answer}</strong>
          </p>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            Spoiler warning! Only reveal if you&apos;re sure.
          </p>
          <button
            onClick={() => setShowAnswer(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-500/20 dark:text-amber-300"
          >
            <Eye className="h-4 w-4" />
            Reveal Answer
          </button>
        </div>
      )}
    </div>
  );
}
