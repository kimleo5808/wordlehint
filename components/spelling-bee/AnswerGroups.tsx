import type { ScoredWord } from "@/types/spelling-bee";
import SpoilerCurtain from "@/components/wordle-answers/SpoilerCurtain";
import WordCard from "./WordCard";

/**
 * The full answer list, grouped by word length (longest first). Each group
 * sits behind its own spoiler curtain so players can reveal exactly the
 * lengths they're missing — words stay in the DOM for crawlers either way.
 */
export default function AnswerGroups({
  byLength,
  date,
}: {
  byLength: [number, ScoredWord[]][];
  date: string;
}) {
  return (
    <div className="space-y-8">
      {byLength.map(([length, words]) => (
        <div key={length}>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {length}-Letter Words{" "}
            <span className="font-normal text-muted-foreground">
              ({words.length})
            </span>
          </h3>
          <SpoilerCurtain
            date={`${date}-bee-${length}`}
            label={`Show ${length}-letter words`}
            className="mt-3"
          >
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {words.map((w) => (
                <WordCard key={w.word} word={w} />
              ))}
            </ul>
          </SpoilerCurtain>
        </div>
      ))}
    </div>
  );
}
