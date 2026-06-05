"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

const COOKIE_PREFIX = "wa_revealed";

const TILE = {
  md: "h-9 w-9 rounded-[4px] text-sm",
  lg: "h-14 w-14 rounded-lg text-2xl sm:h-16 sm:w-16 sm:text-3xl",
} as const;

/**
 * Spoiler-safe display of an answer.
 * Renders blank tiles until the user opts in; the choice is remembered for
 * two days via a cookie so a refresh doesn't re-hide the answer.
 */
export default function SpoilerReveal({
  word,
  date,
  size = "md",
  align = "start",
  className,
}: {
  word: string;
  date: string;
  size?: keyof typeof TILE;
  align?: "start" | "center";
  className?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cookieKey = `${COOKIE_PREFIX}_${date}`;

  useEffect(() => {
    setMounted(true);
    if (Cookies.get(cookieKey) === "1") setRevealed(true);
  }, [cookieKey]);

  function reveal() {
    setRevealed(true);
    Cookies.set(cookieKey, "1", { expires: 2, sameSite: "lax" });
  }

  const letters = word.toUpperCase().split("");
  const gap = size === "lg" ? "gap-1.5" : "gap-1";

  if (revealed) {
    return (
      <span
        className={cn("inline-flex", gap, className)}
        role="img"
        aria-label={`The Wordle answer is ${word.toUpperCase()}`}
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{ animationDelay: `${i * 90}ms` }}
            className={cn(
              "inline-flex animate-flip-digit items-center justify-center bg-wordle-correct font-mono font-bold uppercase leading-none text-white shadow-sm",
              TILE[size]
            )}
          >
            {ch}
          </span>
        ))}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={reveal}
      disabled={!mounted}
      aria-label="Reveal the Wordle answer"
      className={cn(
        "group inline-flex flex-col gap-2 disabled:opacity-60",
        align === "center" ? "items-center" : "items-start",
        className
      )}
    >
      <span className={cn("inline-flex", gap)} aria-hidden="true">
        {letters.map((_, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex items-center justify-center border-2 border-wordle-absent/50 bg-wordle-absent/15 font-mono font-bold leading-none text-muted-foreground transition-colors group-hover:border-cta",
              TILE[size]
            )}
          >
            ?
          </span>
        ))}
      </span>
      <span
        className={cn(
          "rounded-lg bg-cta font-bold text-cta-foreground shadow transition-colors group-hover:bg-cta/90",
          size === "lg" ? "px-5 py-2 text-sm" : "px-3 py-1 text-xs"
        )}
      >
        Reveal answer
      </span>
    </button>
  );
}
