import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { RelatedTool } from "@/data/wordle-answers/content";

export default function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-cta/40 hover:bg-muted/40"
        >
          <div>
            <h3 className="font-heading text-base font-bold text-foreground group-hover:text-cta">
              {tool.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {tool.description}
            </p>
          </div>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:text-cta"
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  );
}
