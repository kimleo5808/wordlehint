"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import { CONN_COLORS, type ConnColor } from "./colors";

export interface HintGroup {
  level: number;
  color: ConnColor;
  label: string;
  name: string;
  words: string[];
  firstLetters: string;
}

const COOKIE_PREFIX = "conn_stage";
// Reveal stages: 0 = nothing, 1 = first-letter clue, 2 = category, 3 = words.

export default function StagedHints({
  groups,
  date,
}: {
  groups: HintGroup[];
  date: string;
}) {
  const [stages, setStages] = useState<number[]>(() => groups.map(() => 0));
  const [mounted, setMounted] = useState(false);
  const cookieKey = `${COOKIE_PREFIX}_${date}`;

  useEffect(() => {
    setMounted(true);
    const saved = Cookies.get(cookieKey);
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr.length === groups.length) setStages(arr);
      } catch {
        /* ignore malformed cookie */
      }
    }
  }, [cookieKey, groups.length]);

  function persist(next: number[]) {
    setStages(next);
    Cookies.set(cookieKey, JSON.stringify(next), { expires: 2, sameSite: "lax" });
  }

  function reveal(index: number, stage: number) {
    persist(stages.map((s, i) => (i === index ? Math.max(s, stage) : s)));
  }

  function revealAll() {
    persist(groups.map(() => 3));
  }

  const allRevealed = stages.every((s) => s >= 3);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          Reveal each step only when you need it.
        </p>
        <button
          type="button"
          onClick={revealAll}
          disabled={!mounted || allRevealed}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          <Eye className="h-3.5 w-3.5" />
          {allRevealed ? "All revealed" : "Reveal all answers"}
        </button>
      </div>

      <div className="space-y-3">
        {groups.map((g, i) => {
          const c = CONN_COLORS[g.color];
          const stage = stages[i];
          return (
            <div
              key={g.level}
              className="overflow-hidden rounded-2xl border border-border bg-card"
              style={{ borderLeft: `6px solid ${c.bg}` }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ backgroundColor: c.soft }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ backgroundColor: c.bg }}
                  />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                    {g.color}
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {g.label}
                </span>
              </div>

              {/* Tiers */}
              <div className="space-y-2 p-4">
                {/* Tier 1: first letters */}
                <Tier
                  label="Clue"
                  open={stage >= 1}
                  onReveal={() => reveal(i, 1)}
                  disabled={!mounted}
                >
                  <span className="font-mono text-sm font-bold tracking-widest text-foreground">
                    {g.firstLetters}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    (first letters)
                  </span>
                </Tier>

                {/* Tier 2: category */}
                <Tier
                  label="Category"
                  open={stage >= 2}
                  onReveal={() => reveal(i, 2)}
                  disabled={!mounted}
                >
                  <span className="font-heading text-sm font-bold text-foreground">
                    {g.name}
                  </span>
                </Tier>

                {/* Tier 3: words */}
                <Tier
                  label="Words"
                  open={stage >= 3}
                  onReveal={() => reveal(i, 3)}
                  disabled={!mounted}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {g.words.map((w) => (
                      <span
                        key={w}
                        className="rounded px-2 py-1 font-mono text-xs font-bold"
                        style={{ backgroundColor: c.bg, color: c.text }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </Tier>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tier({
  label,
  open,
  onReveal,
  disabled,
  children,
}: {
  label: string;
  open: boolean;
  onReveal: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {open ? (
        <div className="min-w-0 flex-1 animate-fade-in-up">{children}</div>
      ) : (
        <button
          type="button"
          onClick={onReveal}
          disabled={disabled}
          className="flex-1 rounded-lg border border-dashed border-border py-1.5 text-left text-xs font-semibold text-cta transition-colors hover:bg-muted disabled:opacity-50"
        >
          <span className="px-2">Reveal {label.toLowerCase()}</span>
        </button>
      )}
    </div>
  );
}
