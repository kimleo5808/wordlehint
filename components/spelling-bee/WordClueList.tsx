"use client";

import { useState } from "react";
import { Crown, Eye } from "lucide-react";
import type { WordClue } from "@/lib/spelling-bee-hints";

/**
 * Per-word clue cards — the layer no competitor offers. Each card shows the
 * letter mask (first letter + blanks) and a spoiler-safe dictionary clue;
 * the full word appears only when that card is clicked.
 */
export default function WordClueList({ clues }: { clues: WordClue[] }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const lengths = [...new Set(clues.map((c) => c.length))];

  const reveal = (word: string) =>
    setRevealed((prev) => new Set(prev).add(word));

  return (
    <div className="space-y-8">
      {lengths.map((len) => (
        <div key={len}>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {len}-Letter Words{" "}
            <span className="font-normal text-muted-foreground">
              ({clues.filter((c) => c.length === len).length})
            </span>
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {clues
              .filter((c) => c.length === len)
              .map((c) => {
                const open = revealed.has(c.word);
                return (
                  <li
                    key={c.word}
                    className={`relative rounded-lg border p-3 ${
                      c.isPangram
                        ? "border-wordle-present/70 bg-wordle-present/10"
                        : "border-border bg-card"
                    }`}
                  >
                    {c.isPangram && (
                      <Crown
                        className="absolute -top-2 -right-2 h-4 w-4 text-wordle-present"
                        aria-label="Pangram"
                      />
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm font-bold tracking-wider text-foreground">
                        {open ? c.word : c.mask}
                      </span>
                      {!open && (
                        <button
                          type="button"
                          onClick={() => reveal(c.word)}
                          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-wordle-present hover:text-slate-900"
                        >
                          <Eye className="h-3 w-3" />
                          Reveal
                        </button>
                      )}
                    </div>
                    {c.clue && (
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {c.clue}
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
