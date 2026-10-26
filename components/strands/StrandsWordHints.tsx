import type { StrandsWordNote } from "@/lib/strands-notes";

/**
 * One collapsed hint per answer, server-rendered: length and first letter
 * on the summary, where the word starts and ends on the board inside, and
 * the word itself behind a second click.
 */
export default function StrandsWordHints({
  words,
  direction,
}: {
  words: StrandsWordNote[];
  direction: string;
}) {
  let theme = 0;
  return (
    <div className="divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
      {words.map((w) => {
        const name = w.isSpangram ? "Spangram" : `Theme word ${++theme}`;
        return (
          <details key={w.word} className="group px-5 py-3.5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="text-sm font-semibold text-foreground">
                {name}
                <span className="ml-2 font-mono text-xs font-normal text-muted-foreground">
                  {w.word.length} letters · starts with {w.word[0]}
                </span>
              </span>
              <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Its first letter, {w.word[0]}, is at row {w.start.row}, column {w.start.col}; it ends
              on the {w.word[w.word.length - 1]} at row {w.end.row}, column {w.end.col}.
              {w.isSpangram ? ` As the spangram, it runs ${direction} and names the theme.` : ""}
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-semibold text-primary">Show the word</summary>
              <p className="mt-1.5 font-mono text-base font-bold tracking-wider text-foreground">{w.word}</p>
            </details>
          </details>
        );
      })}
    </div>
  );
}
