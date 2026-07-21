"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Eye } from "lucide-react";
import type { PangramHint } from "@/lib/spelling-bee-hints";

const STAGES = ["Word length", "First two letters", "Meaning clue", "The word"];

/**
 * Staged pangram reveal — length → first two letters → definition clue →
 * full word. Each click unlocks one more level, mirroring the site's
 * progressive-hint philosophy. The full word stays a deliberate last resort,
 * with the answers page offered first.
 */
export default function PangramHints({ hints }: { hints: PangramHint[] }) {
  const [stage, setStage] = useState(0);

  return (
    <div className="rounded-xl border border-wordle-present/40 bg-wordle-present/5 p-5">
      <div className="flex flex-wrap items-center gap-2">
        {STAGES.map((label, i) => (
          <span
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              i < stage
                ? "bg-wordle-present text-slate-900"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {hints.map((h, idx) => (
          <div key={h.firstTwo + h.length} className="font-mono text-sm">
            <span className="font-semibold text-foreground">
              Pangram{hints.length > 1 ? ` ${idx + 1}` : ""}:
            </span>{" "}
            {stage >= 1 && (
              <span className="text-foreground">{h.length} letters</span>
            )}
            {stage >= 2 && (
              <span className="text-foreground">
                {" "}
                · starts with{" "}
                <strong className="text-wordle-present">{h.firstTwo}</strong>
              </span>
            )}
            {stage >= 3 && h.clue && (
              <span className="block mt-1 font-sans text-muted-foreground">
                {h.clue}
              </span>
            )}
            {stage >= 4 && (
              <span className="mt-1 block text-base font-bold tracking-widest text-wordle-present">
                {h.word}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        {stage < STAGES.length && (
          <button
            type="button"
            onClick={() => setStage((s) => s + 1)}
            className="inline-flex items-center gap-2 rounded-lg bg-cta px-4 py-2 text-sm font-bold text-cta-foreground transition-colors hover:bg-cta/90"
          >
            <Eye className="h-4 w-4" />
            {stage === STAGES.length - 1
              ? "Reveal the pangram"
              : `Reveal hint ${stage + 1}: ${STAGES[stage].toLowerCase()}`}
          </button>
        )}
        <Link
          href="/spelling-bee-answers"
          className="inline-flex items-center gap-1 text-sm font-semibold text-cta hover:underline"
        >
          Just show me all the answers
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
