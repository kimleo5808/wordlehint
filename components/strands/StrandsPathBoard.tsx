"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

const SPANGRAM = "#eab308"; // in-game spangram yellow
const THEME = "#3b82f6"; // in-game theme-word blue
const COLS = 6;
const CELL = 48;
const PAD = 8;
const COOKIE_PREFIX = "strands_path";

export interface PathWord {
  word: string;
  isSpangram: boolean;
  /** Cell indices (row * 6 + col) in the order the word is spelled. */
  path: number[];
}

// Per-word stage: 0 = hidden, 1 = hint (first letter + length), 2 = solved.
type Stage = 0 | 1 | 2;

const center = (cell: number) => ({
  x: PAD + (cell % COLS) * CELL + CELL / 2,
  y: PAD + Math.floor(cell / COLS) * CELL + CELL / 2,
});

/**
 * Strands board with every answer traced on it. Each word can be hidden,
 * hinted (first letter + length), or solved — solving draws its path the
 * way the game highlights it. Date pages open fully solved so the answers
 * are in the HTML; "hint mode" hides them again.
 */
export default function StrandsPathBoard({
  board,
  words,
  date,
}: {
  board: string[];
  words: PathWord[];
  date: string;
}) {
  const [stages, setStages] = useState<Stage[]>(() => words.map(() => 2));
  const [mounted, setMounted] = useState(false);
  const cookieKey = `${COOKIE_PREFIX}_${date}`;

  useEffect(() => {
    setMounted(true);
    const saved = Cookies.get(cookieKey);
    if (!saved) return;
    try {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr) && arr.length === words.length) setStages(arr);
    } catch {
      /* ignore malformed cookie */
    }
  }, [cookieKey, words.length]);

  function persist(next: Stage[]) {
    setStages(next);
    Cookies.set(cookieKey, JSON.stringify(next), { expires: 2, sameSite: "lax" });
  }

  const advance = (i: number) =>
    persist(stages.map((s, j) => (j === i ? (Math.min(s + 1, 2) as Stage) : s)));
  const allSolved = stages.every((s) => s === 2);

  const letters = board.join("").split("");
  const owner = new Map<number, number>(); // cell → index of solved word
  words.forEach((w, i) => {
    if (stages[i] === 2) w.path.forEach((cell) => owner.set(cell, i));
  });

  const width = COLS * CELL + PAD * 2;
  const height = (letters.length / COLS) * CELL + PAD * 2;

  return (
    <div>
      <style>{`
        @keyframes strands-draw { to { stroke-dashoffset: 0; } }
        .strands-path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: strands-draw 600ms ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .strands-path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          Tap a word to hint it, tap again to trace it.
        </p>
        <button
          type="button"
          disabled={!mounted}
          onClick={() =>
            persist(words.map(() => (allSolved ? 0 : 2)) as Stage[])
          }
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          {allSolved ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
          {allSolved ? "Hide answers (hint mode)" : "Reveal all answers"}
        </button>
      </div>

      <div className="grid items-start gap-6 sm:grid-cols-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto w-full max-w-[320px]"
          role="img"
          aria-label="Strands board with the solved word paths"
        >
          {words.map((w, i) => {
            if (stages[i] !== 2 || w.path.length < 2) return null;
            const points = w.path
              .map((cell) => {
                const p = center(cell);
                return `${p.x},${p.y}`;
              })
              .join(" ");
            return (
              <polyline
                key={w.word}
                points={points}
                pathLength={1}
                className="strands-path"
                style={{ animationDelay: `${i * 120}ms` }}
                fill="none"
                stroke={w.isSpangram ? SPANGRAM : THEME}
                strokeWidth={14}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.55}
              />
            );
          })}
          {letters.map((ch, cell) => {
            const p = center(cell);
            const wi = owner.get(cell);
            const solved = wi !== undefined;
            const fill = solved
              ? words[wi].isSpangram
                ? SPANGRAM
                : THEME
              : "transparent";
            return (
              <g key={cell}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={18}
                  fill={fill}
                  className={solved ? "" : "stroke-border"}
                  strokeWidth={solved ? 0 : 1}
                />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={
                    solved
                      ? words[wi].isSpangram
                        ? "#1a1505"
                        : "#ffffff"
                      : undefined
                  }
                  className={solved ? undefined : "fill-foreground"}
                  style={{
                    font: "700 17px var(--font-mono-code), ui-monospace, monospace",
                  }}
                >
                  {ch.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        <ul className="space-y-2">
          {words.map((w, i) => {
            const stage = stages[i];
            const color = w.isSpangram ? SPANGRAM : THEME;
            return (
              <li key={w.word}>
                <button
                  type="button"
                  disabled={!mounted || stage === 2}
                  onClick={() => advance(i)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition-colors enabled:hover:bg-muted"
                  style={{
                    borderColor: stage === 2 ? color : undefined,
                    backgroundColor: stage === 2 ? `${color}1f` : undefined,
                  }}
                >
                  <span className="font-mono text-sm font-bold tracking-wide text-foreground">
                    {stage === 2
                      ? w.word
                      : stage === 1
                        ? `${w.word[0]}${"·".repeat(w.word.length - 1)}`
                        : "□".repeat(Math.min(w.word.length, 12))}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {w.isSpangram ? "spangram · " : ""}
                    {w.word.length} letters
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
