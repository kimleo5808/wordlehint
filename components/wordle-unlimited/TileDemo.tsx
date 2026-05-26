/**
 * TileDemo — three sample tiles inline with the "Reading Tile Colors" H3.
 * Shows correct / present / absent states using the canonical Wordle palette
 * (preserved exactly even though the surrounding shell is newsprint-themed).
 */
const TILES = [
  { letter: "C", status: "correct", label: "Correct slot" },
  { letter: "R", status: "present", label: "Wrong slot" },
  { letter: "Z", status: "absent", label: "Not in word" },
] as const;

const STATUS_BG: Record<(typeof TILES)[number]["status"], string> = {
  correct: "bg-[#6AAA64]",
  present: "bg-[#C9B458]",
  absent: "bg-[#787C7E]",
};

export default function TileDemo() {
  return (
    <div className="my-5 flex items-end justify-center gap-4 sm:gap-6">
      {TILES.map((t) => (
        <div key={t.letter} className="flex flex-col items-center gap-2">
          <div
            className={`flex h-14 w-14 items-center justify-center font-fraunces text-2xl font-bold text-white sm:h-16 sm:w-16 sm:text-3xl ${STATUS_BG[t.status]}`}
          >
            {t.letter}
          </div>
          <div className="font-plex-mono text-[10px] uppercase tracking-[0.14em] text-brand-subtle">
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}
