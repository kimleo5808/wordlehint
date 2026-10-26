"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { nextRelease } from "@/lib/reset-times";

/** Seconds until the next Wordle, which NYT releases at midnight in the
 *  player's own time zone (not New York's). */
function secondsUntilNextWordle(): number {
  let timeZone = "America/New_York";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || timeZone;
  } catch {
    /* keep New York */
  }
  const now = Date.now();
  return Math.max(0, Math.floor((nextRelease({ kind: "local-midnight" }, now, timeZone).at - now) / 1000));
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function DailyCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    setLeft(secondsUntilNextWordle());
    const timer = setInterval(() => setLeft(secondsUntilNextWordle()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (left === null) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
        <Clock className="h-4 w-4" />
        Next Wordle in
      </div>
      <div className="mt-2 font-heading text-3xl font-bold tracking-wider text-foreground tabular-nums">
        {pad(Math.floor(left / 3600))}:{pad(Math.floor((left % 3600) / 60))}:{pad(left % 60)}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Resets at midnight your time ·{" "}
        <Link href="/nyt-games-reset-times" className="font-semibold text-primary hover:text-primary/80">
          every NYT reset time
        </Link>
      </p>
    </div>
  );
}
