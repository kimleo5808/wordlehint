import { getDefinition } from "@/lib/wordle-definitions";
import { BookOpen } from "lucide-react";

export default function AnswerDefinition({ word }: { word: string }) {
  const def = getDefinition(word);
  if (!def) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-foreground">
        <BookOpen className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-base font-bold">
          What Does &ldquo;{word}&rdquo; Mean?
        </h3>
      </div>

      <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
        {def.meanings.map((m, i) => (
          <div key={i}>
            <span className="mr-1.5 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
              {m.partOfSpeech}
            </span>
            <span>{m.definition}</span>
            {m.example && (
              <p className="mt-1 border-l-2 border-primary/20 pl-3 italic text-muted-foreground/80">
                &ldquo;{m.example}&rdquo;
              </p>
            )}
          </div>
        ))}

        {def.origin && (
          <p className="mt-2 border-t border-border pt-2 text-xs text-muted-foreground/70">
            <strong className="text-muted-foreground">Origin:</strong>{" "}
            {def.origin}
          </p>
        )}
      </div>
    </div>
  );
}
