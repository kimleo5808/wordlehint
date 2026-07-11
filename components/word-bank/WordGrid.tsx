"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TileWord } from "./tiles";

/** Serializable shape passed from the server page (no lib import in client). */
export interface GridWord {
  word: string;
  common: boolean;
  wasAnswer: boolean;
  definition: string | null;
  partOfSpeech: string | null;
}

export function WordGrid({
  words,
  highlightLast = false,
  highlightLetter,
}: {
  words: GridWord[];
  /** Green the last tile of each word (for ending-letter pages). */
  highlightLast?: boolean;
  /** Yellow every tile matching this letter (for contains-letter pages). */
  highlightLetter?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Common (answer-pool) words render as Wordle tiles; the long tail of
  // obscure guess-only words render as lightweight mono text to keep the DOM
  // (and page weight) reasonable across 1,000+ entries.
  const commonWords = words.filter((w) => w.common);
  const rareWords = words.filter((w) => !w.common);

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {commonWords.map((w) => {
        const hasDef = !!w.definition;
        const isOpen = open === w.word;
        const inner = (
          <span className="relative inline-flex items-center">
            <TileWord
              word={w.word}
              size="xs"
              highlightFirst={!highlightLast && !highlightLetter}
              highlightLast={highlightLast}
              highlightLetter={highlightLetter}
            />
            {w.wasAnswer && (
              <span
                aria-hidden
                title="Past Wordle answer"
                className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-wordle-present ring-2 ring-card"
              />
            )}
          </span>
        );

        if (!hasDef) {
          return (
            <span
              key={w.word}
              className="flex items-center rounded-lg border border-transparent px-1.5 py-1"
            >
              {inner}
            </span>
          );
        }

        return (
          <div key={w.word} className="relative">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={`${w.word} — show definition`}
              onClick={() => setOpen(isOpen ? null : w.word)}
              className={cn(
                "flex w-full items-center rounded-lg border px-1.5 py-1 text-left transition-colors",
                isOpen
                  ? "border-wordle-correct bg-wordle-correct/5"
                  : "border-transparent hover:border-border hover:bg-muted"
              )}
            >
              {inner}
            </button>
            {isOpen && (
              <div
                role="dialog"
                className="absolute left-0 top-full z-20 mt-1 w-60 rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-lg"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-heading text-sm font-bold">
                    {w.word}
                  </span>
                  {w.partOfSpeech && (
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      {w.partOfSpeech}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {w.definition}
                </p>
                {w.wasAnswer && (
                  <p className="mt-2 text-[11px] font-medium text-wordle-present">
                    ● Has been a past Wordle answer
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
      </div>

      {rareWords.length > 0 && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            More valid guesses ({rareWords.length})
          </p>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            {rareWords.map((w, i) => (
              <span key={w.word}>
                {w.word}
                {i < rareWords.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
