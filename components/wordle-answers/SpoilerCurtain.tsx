"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const COOKIE_PREFIX = "wa_revealed";

/**
 * Spoiler curtain for the dedicated answer pages.
 *
 * The children (which name the answer) are always rendered in the DOM — so
 * crawlers and AI engines can read the answer — but are visually blurred and
 * non-interactive behind an opt-in overlay until the visitor clicks reveal.
 * This keeps the page spoiler-safe for accidental landings while staying
 * fully indexable. The choice is remembered for two days via a cookie.
 */
export default function SpoilerCurtain({
  date,
  label = "Reveal today's answer",
  className,
  children,
}: {
  date: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
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

  // Before hydration we render the curtain closed to match the spoiler-safe
  // default; this is also the server-rendered state.
  const open = mounted && revealed;

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "transition-all duration-300",
          open ? "" : "pointer-events-none select-none"
        )}
        style={{ filter: open ? "none" : "blur(10px)" }}
        aria-hidden={open ? undefined : true}
      >
        {children}
      </div>

      {!open && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={reveal}
            disabled={!mounted}
            className="inline-flex items-center gap-2 rounded-xl bg-cta px-6 py-3 text-sm font-bold text-cta-foreground shadow-lg transition-colors hover:bg-cta/90 disabled:opacity-60"
          >
            <Eye className="h-4 w-4" />
            {label}
          </button>
        </div>
      )}
    </div>
  );
}
