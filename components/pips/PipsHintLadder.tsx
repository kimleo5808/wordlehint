"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { describePlacement, type PipsHintStep } from "@/lib/pips-hints";
import type { PipsBoard, PipsDifficulty } from "@/types/pips";
import PipsBoardSvg from "./PipsBoardSvg";

export interface PipsLadderBoard {
  difficulty: PipsDifficulty;
  board: PipsBoard;
  steps: PipsHintStep[];
}

const LABEL: Record<PipsDifficulty, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };
const COOKIE_PREFIX = "pips_stage";

/** Step text for the full solution: every domino as words (also the
 *  accessible version of the drawn board). */
function placements(board: PipsBoard): string[] {
  return board.solution.map((_, i) => describePlacement(board, i));
}

/**
 * Easy / Medium / Hard tabs, each with its own hint ladder: stage 0 shows
 * the empty board, stages 1–4 reveal the steps from lib/pips-hints.ts.
 * Today's page starts at 0; date pages start at 4 (full solution in the
 * HTML) with a switch back to hint mode.
 */
export default function PipsHintLadder({
  boards,
  date,
  initialStage,
  defaultDifficulty = "hard",
}: {
  boards: PipsLadderBoard[];
  date: string;
  initialStage: number;
  defaultDifficulty?: PipsDifficulty;
}) {
  const [active, setActive] = useState<PipsDifficulty>(defaultDifficulty);
  const [stages, setStages] = useState<Record<string, number>>(() =>
    Object.fromEntries(boards.map((b) => [b.difficulty, initialStage]))
  );
  const [mounted, setMounted] = useState(false);
  const cookieKey = `${COOKIE_PREFIX}_${date}`;

  useEffect(() => {
    setMounted(true);
    const saved = Cookies.get(cookieKey);
    if (!saved) return;
    try {
      const obj = JSON.parse(saved);
      if (obj && typeof obj === "object") setStages((s) => ({ ...s, ...obj }));
    } catch {
      /* ignore malformed cookie */
    }
  }, [cookieKey]);

  function setStage(d: PipsDifficulty, n: number) {
    const next = { ...stages, [d]: n };
    setStages(next);
    Cookies.set(cookieKey, JSON.stringify(next), { expires: 2, sameSite: "lax" });
  }

  const current = boards.find((b) => b.difficulty === active) ?? boards[0];
  const stage = stages[current.difficulty] ?? 0;
  const step = stage > 0 ? current.steps[stage - 1] : null;
  const done = stage >= current.steps.length;

  return (
    <div>
      <div role="tablist" aria-label="Difficulty" className="inline-flex rounded-xl border border-border bg-muted/40 p-1">
        {boards.map((b) => (
          <button
            key={b.difficulty}
            role="tab"
            type="button"
            aria-selected={b.difficulty === active}
            onClick={() => setActive(b.difficulty)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
              b.difficulty === active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {LABEL[b.difficulty]}
            <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">{b.board.dominoes.length}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid items-start gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-3 sm:p-4">
          <div className="mx-auto max-w-[420px]">
            <PipsBoardSvg
              board={current.board}
              placed={step?.dominoes ?? []}
              highlight={step?.cells ?? []}
              label={`NYT Pips ${LABEL[current.difficulty]} board, ${step?.dominoes.length ?? 0} of ${current.board.dominoes.length} dominoes placed`}
            />
          </div>
          <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {current.board.dominoes.length} dominoes · by {current.board.constructors || "NYT"}
          </p>
        </div>

        <div>
          <ol className="space-y-3">
            {current.steps.map((s, i) => {
              const open = i < stage;
              const isNext = i === stage;
              return (
                <li
                  key={s.kind}
                  className={`rounded-xl border px-4 py-3 ${open ? "border-border bg-card" : "border-dashed border-border"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Step {i + 1} · {s.title}
                    </span>
                    {isNext && (
                      <button
                        type="button"
                        disabled={!mounted}
                        onClick={() => setStage(current.difficulty, i + 1)}
                        className="rounded-lg bg-cta px-3 py-1 text-xs font-bold text-cta-foreground disabled:opacity-60"
                      >
                        Reveal
                      </button>
                    )}
                  </div>
                  {open && <p className="mt-1.5 text-sm leading-relaxed text-foreground">{s.text}</p>}
                  {open && s.kind === "full" && (
                    <details className="mt-2 text-xs text-muted-foreground">
                      <summary className="cursor-pointer font-semibold">Solution as text</summary>
                      <ul className="mt-1.5 space-y-0.5 font-mono">
                        {placements(current.board).map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            disabled={!mounted}
            onClick={() => setStage(current.difficulty, done ? 0 : current.steps.length)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            {done ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {done ? "Hide the solution (hint mode)" : `Show the full ${LABEL[current.difficulty]} solution`}
          </button>
        </div>
      </div>
    </div>
  );
}
