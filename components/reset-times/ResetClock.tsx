"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "nyt-reset-tz";

interface ResetClock {
  /** Viewer's time zone; null until mounted (server render shows no times). */
  timeZone: string | null;
  setTimeZone: (tz: string) => void;
  /** Current instant, ticking every second; null until mounted. */
  now: number | null;
  detected: string | null;
}

const Ctx = createContext<ResetClock>({ timeZone: null, setTimeZone: () => {}, now: null, detected: null });

/** One clock and one time zone for everything on the reset-times page. */
export function ResetClockProvider({ children }: { children: React.ReactNode }) {
  const [timeZone, setTz] = useState<string | null>(null);
  const [detected, setDetected] = useState<string | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let local = "America/New_York";
    try {
      local = Intl.DateTimeFormat().resolvedOptions().timeZone || local;
    } catch {
      /* keep New York */
    }
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked */
    }
    setDetected(local);
    setTz(saved || local);
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  function setTimeZone(tz: string) {
    setTz(tz);
    try {
      window.localStorage.setItem(STORAGE_KEY, tz);
    } catch {
      /* storage blocked */
    }
  }

  return <Ctx.Provider value={{ timeZone, setTimeZone, now, detected }}>{children}</Ctx.Provider>;
}

export const useResetClock = () => useContext(Ctx);
