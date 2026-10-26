import { CONN_COLORS } from "@/components/connections/colors";

const ORDER = [CONN_COLORS.yellow, CONN_COLORS.green, CONN_COLORS.blue, CONN_COLORS.purple];
const NAMES = ["yellow", "green", "blue", "purple"];

/**
 * A word's colour fingerprint: one segment per colour, sized by how many
 * times it appeared there. `scale` (the largest total in the list) makes
 * bars comparable down a table; without it the bar fills its box.
 */
export default function ColourBar({
  counts,
  scale,
  className = "h-2.5",
}: {
  counts: [number, number, number, number];
  scale?: number;
  className?: string;
}) {
  const total = counts[0] + counts[1] + counts[2] + counts[3];
  const width = scale ? `${Math.max(4, (total / scale) * 100)}%` : "100%";
  return (
    <div
      className={`flex overflow-hidden rounded-full bg-muted ${className}`}
      style={{ width }}
      role="img"
      aria-label={counts.map((n, i) => `${n} ${NAMES[i]}`).join(", ")}
    >
      {counts.map((n, i) =>
        n > 0 ? <span key={i} style={{ width: `${(n / Math.max(1, total)) * 100}%`, backgroundColor: ORDER[i].bg }} /> : null
      )}
    </div>
  );
}
