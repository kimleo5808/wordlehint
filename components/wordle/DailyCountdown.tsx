"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getTimeUntilMidnightET(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  // Get current time in ET
  const etString = now.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [h, m, s] = etString.split(":").map(Number);
  const totalSecondsLeft = (24 - h - 1) * 3600 + (59 - m) * 60 + (60 - s);

  return {
    hours: Math.floor(totalSecondsLeft / 3600),
    minutes: Math.floor((totalSecondsLeft % 3600) / 60),
    seconds: totalSecondsLeft % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function DailyCountdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeUntilMidnightET> | null>(null);

  useEffect(() => {
    setTime(getTimeUntilMidnightET());
    const timer = setInterval(() => {
      setTime(getTimeUntilMidnightET());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
        <Clock className="h-4 w-4" />
        Next Wordle in
      </div>
      <div className="mt-2 font-heading text-3xl font-bold tracking-wider text-foreground tabular-nums">
        {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Resets at midnight Eastern Time
      </p>
    </div>
  );
}
