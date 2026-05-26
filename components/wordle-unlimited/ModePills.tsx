"use client";

import { cn } from "@/lib/utils";

export type GameModeId = "standard" | "hard" | "dark" | "color-blind";

const MODES: { id: GameModeId; label: string }[] = [
  { id: "standard", label: "Standard" },
  { id: "hard", label: "Hard" },
  { id: "dark", label: "Dark" },
  { id: "color-blind", label: "A11y" },
];

/**
 * ModePills — 4 mode toggle pills above the keyboard.
 *
 * Active pill: signal-red background + cream text.
 * Inactive:    transparent + ink text + 1px signal-red outline on hover.
 *
 * Square corners (radius 2px) to fit the editorial-newsprint feel.
 *
 * Visual-only for now; wiring the actual Hard/Color-blind behavior into the
 * shared WordleGame component is a follow-up. The active state is held in
 * parent so layouts and persistence can be added later.
 */
export default function ModePills({
  active,
  onChange,
}: {
  active: GameModeId;
  onChange: (id: GameModeId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Game modes"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {MODES.map((mode) => {
        const isActive = active === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(mode.id)}
            className={cn(
              "rounded-sm border px-3 py-1 font-plex-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
              isActive
                ? "border-brand-signal bg-brand-signal text-brand-cream"
                : "border-brand-signal/40 bg-transparent text-brand-ink hover:bg-brand-signalLight hover:text-brand-signalDark dark:text-brand-dark-ink"
            )}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
