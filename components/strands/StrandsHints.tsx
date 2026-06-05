"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Eye, Lightbulb } from "lucide-react";

const COOKIE_PREFIX = "strands_stage";
const SPANGRAM = "#eab308"; // yellow — spangram in-game
const THEME = "#3b82f6"; // blue — theme words in-game

export interface StrandsHintsProps {
  clue: string;
  spangram: string;
  themeWords: string[];
  date: string;
}

export default function StrandsHints({
  clue,
  spangram,
  themeWords,
  date,
}: StrandsHintsProps) {
  // spangram stage: 0 hidden, 1 clue, 2 word. words: set of revealed indices.
  const [spStage, setSpStage] = useState(0);
  const [words, setWords] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const cookieKey = `${COOKIE_PREFIX}_${date}`;

  useEffect(() => {
    setMounted(true);
    const saved = Cookies.get(cookieKey);
    if (saved) {
      try {
        const o = JSON.parse(saved);
        if (typeof o.sp === "number") setSpStage(o.sp);
        if (Array.isArray(o.w)) setWords(o.w);
      } catch {
        /* ignore */
      }
    }
  }, [cookieKey]);

  function persist(sp: number, w: number[]) {
    setSpStage(sp);
    setWords(w);
    Cookies.set(cookieKey, JSON.stringify({ sp, w }), {
      expires: 2,
      sameSite: "lax",
    });
  }

  const revealSpangram = (stage: number) =>
    persist(Math.max(spStage, stage), words);
  const revealWord = (i: number) =>
    persist(spStage, words.includes(i) ? words : [...words, i]);
  const revealAll = () =>
    persist(2, themeWords.map((_, i) => i));

  const allRevealed = spStage >= 2 && words.length === themeWords.length;

  return (
    <div>
      {/* Theme clue — shown openly (it's the in-game clue) */}
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-cta" />
        <div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Today&apos;s theme clue
          </span>
          <p className="font-heading text-lg font-bold text-foreground">
            &ldquo;{clue}&rdquo;
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          {themeWords.length} theme words + 1 spangram
        </p>
        <button
          type="button"
          onClick={revealAll}
          disabled={!mounted || allRevealed}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          <Eye className="h-3.5 w-3.5" />
          {allRevealed ? "All revealed" : "Reveal everything"}
        </button>
      </div>

      {/* Spangram */}
      <div
        className="mt-4 overflow-hidden rounded-2xl border border-border bg-card"
        style={{ borderLeft: `6px solid ${SPANGRAM}` }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ backgroundColor: "rgba(234,179,8,0.14)" }}
        >
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: SPANGRAM }}
          />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
            Spangram
          </span>
        </div>
        <div className="space-y-2 p-4">
          <Tier
            label="Clue"
            open={spStage >= 1}
            onReveal={() => revealSpangram(1)}
            disabled={!mounted}
          >
            <span className="font-mono text-sm font-semibold text-foreground">
              Starts with {spangram[0]} · {spangram.length} letters
            </span>
          </Tier>
          <Tier
            label="Spangram"
            open={spStage >= 2}
            onReveal={() => revealSpangram(2)}
            disabled={!mounted}
          >
            <span
              className="rounded px-2 py-1 font-mono text-sm font-bold text-white"
              style={{ backgroundColor: SPANGRAM }}
            >
              {spangram}
            </span>
          </Tier>
        </div>
      </div>

      {/* Theme words */}
      <div
        className="mt-3 overflow-hidden rounded-2xl border border-border bg-card"
        style={{ borderLeft: `6px solid ${THEME}` }}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: "rgba(59,130,246,0.14)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: THEME }}
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              Theme words
            </span>
          </div>
          <button
            type="button"
            onClick={() => persist(spStage, themeWords.map((_, i) => i))}
            disabled={!mounted || words.length === themeWords.length}
            className="font-mono text-[11px] font-semibold text-cta disabled:opacity-50"
          >
            Reveal all words
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
          {themeWords.map((w, i) => {
            const open = words.includes(i);
            return open ? (
              <span
                key={i}
                className="rounded-lg px-2.5 py-2 text-center font-mono text-sm font-bold text-white"
                style={{ backgroundColor: THEME }}
              >
                {w}
              </span>
            ) : (
              <button
                key={i}
                type="button"
                onClick={() => revealWord(i)}
                disabled={!mounted}
                className="rounded-lg border border-dashed border-border px-2.5 py-2 text-center font-mono text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                {w[0]} · {w.length}
              </button>
            );
          })}
        </div>
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
      <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
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
