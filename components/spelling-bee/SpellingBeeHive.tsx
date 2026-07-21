const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/**
 * The day's seven letters as a CSS honeycomb — one gold center cell with six
 * neighbours. Pure markup (no images, no JS), so it renders in the
 * server-side hero at zero cost.
 */
export default function SpellingBeeHive({
  centerLetter,
  outerLetters,
  className,
}: {
  centerLetter: string;
  outerLetters: string[];
  className?: string;
}) {
  const cells = [
    { letter: centerLetter, center: true, dx: 0, dy: 0 },
    ...outerLetters.map((letter, i) => {
      const angle = ((i * 60 - 90) * Math.PI) / 180;
      return {
        letter,
        center: false,
        dx: Math.cos(angle) * 82,
        dy: Math.sin(angle) * 82,
      };
    }),
  ];

  return (
    <div
      className={`relative mx-auto h-64 w-64 select-none ${className ?? ""}`}
      role="img"
      aria-label={`Today's letters: ${centerLetter.toUpperCase()} (center), ${outerLetters
        .map((l) => l.toUpperCase())
        .join(", ")}`}
    >
      {cells.map((cell) => (
        <div
          key={cell.letter}
          className={`absolute left-1/2 top-1/2 flex h-[88px] w-[78px] items-center justify-center font-heading text-3xl font-bold uppercase transition-transform hover:scale-105 ${
            cell.center
              ? "bg-wordle-present text-slate-900"
              : "bg-muted text-foreground"
          }`}
          style={{
            clipPath: HEX_CLIP,
            transform: `translate(calc(-50% + ${cell.dx}px), calc(-50% + ${cell.dy}px))`,
          }}
        >
          {cell.letter}
        </div>
      ))}
    </div>
  );
}
