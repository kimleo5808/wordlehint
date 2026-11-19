"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { trainerPath, trapFromReview } from "@/lib/wordle-traps";
import { reviewWordle, type ReviewedTurn } from "@/lib/wordle-analyzer";
import { trackToolEvent } from "./analytics";

type ArchiveEntry = { date: string; answer: string };
type Props = { archive: ArchiveEntry[]; pool: string[]; version: string };
const exampleDate = "2025-12-31";
const exampleWords = "SHEEP, SANER, SIREN";
const tileNames: Record<string, string> = {
  G: "Green, right place",
  Y: "Yellow, other place",
  B: "Gray, no copy left",
};
const tileMarks: Record<string, string> = { G: "✓", Y: "↔", B: "–" };
const format = (count: number) => count.toLocaleString("en-US");

function subscribeToHash(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

export default function WordleAnalyzer(props: Props) {
  const fragment = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
  const [requested, setRequested] = useState<ArchiveEntry>();
  const linkedPuzzle = props.archive.find((p) => "#" + p.date === fragment);
  // Article anchors share the fragment with puzzle links. Reading a section keeps the board.
  if (linkedPuzzle && linkedPuzzle.date !== requested?.date) setRequested(linkedPuzzle);
  return <ReviewForm key={requested?.date ?? "default"} {...props} requested={requested} />;
}

function ReviewForm({ archive, pool, version, requested }: Props & { requested?: ArchiveEntry }) {
  const [source, setSource] = useState<"manual" | "archive">(requested ? "archive" : "manual");
  const [date, setDate] = useState(requested?.date ?? exampleDate);
  const [typedAnswer, setTypedAnswer] = useState(requested ? "" : "SIREN");
  const [words, setWords] = useState(requested ? "" : exampleWords);
  const [error, setError] = useState("");
  const [isExample, setIsExample] = useState(!requested);
  const started = useRef(false);
  const [turns, setTurns] = useState<ReviewedTurn[]>(() =>
    requested ? [] : reviewWordle("SIREN", exampleWords.split(", "), pool),
  );
  const entry = archive.find((p) => p.date === date);
  const answer = source === "archive" ? (entry?.answer ?? "") : typedAnswer.trim().toUpperCase();

  function edit() {
    if (!started.current) {
      trackToolEvent("wordle_analyzer_start");
      started.current = true;
    }
    setIsExample(false);
    setError("");
    setTurns([]);
  }

  function selectSource(next: "manual" | "archive") {
    if (next === source) return;
    edit();
    setSource(next);
    setTypedAnswer("");
    setDate(requested?.date ?? archive.at(-1)?.date ?? "");
    setWords("");
  }

  function loadExample() {
    started.current = false;
    setSource("manual");
    setTypedAnswer("SIREN");
    setDate(exampleDate);
    setWords(exampleWords);
    setError("");
    setIsExample(true);
    setTurns(reviewWordle("SIREN", exampleWords.split(", "), pool));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (source === "archive" && !entry) {
      setError("Choose a finished puzzle date from the available archive.");
      return;
    }
    if (!/^[A-Z]{5}$/.test(answer)) {
      setError("Enter the five letters of the known answer.");
      return;
    }
    const guesses = words
      .toUpperCase()
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean);
    if (!guesses.length || guesses.length > 6) {
      setError("Enter one to six guesses in the order you played them.");
      return;
    }
    const invalid = guesses.findIndex((g) => !/^[A-Z]{5}$/.test(g));
    if (invalid !== -1) {
      setError(`Guess ${invalid + 1} needs five letters A–Z. Enter the word shown on your board.`);
      return;
    }
    const winningTurn = guesses.indexOf(answer);
    if (winningTurn !== -1 && winningTurn !== guesses.length - 1) {
      setError(`Guess ${winningTurn + 1} solved the board. Remove the guesses after it.`);
      return;
    }
    setError("");
    setTurns(reviewWordle(answer, guesses, pool));
    if (started.current) {
      trackToolEvent("wordle_analyzer_complete", {
        turns: guesses.length,
        source,
        solved: Number(winningTurn !== -1),
      });
      started.current = false;
    }
  }

  const drops = turns.map((turn) => turn.before - turn.after);
  const largest = Math.max(0, ...drops);
  const largestRows = turns.flatMap((_, i) => (drops[i] === largest ? [i + 1] : []));
  const trap = trapFromReview(turns);
  return (
    <div className="wa-workspace">
      <form className="wa-form" onSubmit={submit} noValidate>
        <fieldset className="wa-sources">
          <legend>Answer source</legend>
          <button
            type="button"
            aria-pressed={source === "manual"}
            onClick={() => selectSource("manual")}
          >
            Known answer
          </button>
          <button
            type="button"
            aria-pressed={source === "archive"}
            onClick={() => selectSource("archive")}
          >
            Past puzzle
          </button>
        </fieldset>
        {source === "manual" ? (
          <label>
            Finished game answer
            <input
              value={typedAnswer}
              autoComplete="off"
              spellCheck={false}
              placeholder="e.g. SIREN"
              onChange={(event) => {
                edit();
                setTypedAnswer(event.target.value);
              }}
            />
          </label>
        ) : (
          <label>
            Puzzle date
            <input
              type="date"
              value={date}
              min={archive[0]?.date}
              max={archive.at(-1)?.date}
              onChange={(event) => {
                edit();
                setDate(event.target.value);
                setWords("");
              }}
            />
            {entry && <span className="wa-date-answer">Archived answer · {entry.answer}</span>}
          </label>
        )}
        <label>
          Your guesses in order
          <textarea
            rows={2}
            value={words}
            autoComplete="off"
            spellCheck={false}
            placeholder="One word per line, or separate with commas"
            onChange={(event) => {
              edit();
              setWords(event.target.value);
            }}
          />
        </label>
        <div className="wa-actions">
          <button className="wa-submit" type="submit">
            Review guesses
          </button>
          <button className="pt-action" type="button" onClick={loadExample}>
            Load example
          </button>
        </div>
        {error && (
          <p className="wa-error" role="alert">
            {error}
          </p>
        )}
      </form>
      <section className="wa-review" aria-label="Review results">
        <div className="wa-review-header">
          <h2>{isExample ? "Example replay" : "Your replay"}</h2>
          {turns.length > 0 && <span>{answer}</span>}
        </div>
        <p className="wa-meta">
          Reference pool · {format(pool.length)} words · {version}
        </p>
        <div aria-live="polite" className="sr-only">
          {turns.length ? `Review ready for ${answer}, ${turns.length} turns.` : ""}
        </div>
        {turns.length === 0 ? (
          <p className="wa-empty">
            Enter your guesses and select Review guesses to see the colors and candidate counts.
          </p>
        ) : (
          <>
            <div className="wa-cols" aria-hidden="true">
              <span>Turn</span>
              <span>Feedback</span>
              <span>Candidates</span>
            </div>
            {turns.map((turn, i) => (
              <details className="wa-turn" key={i + "-" + turn.guess}>
                <summary>
                  <span aria-label={`Turn ${i + 1}`}>{i + 1}</span>
                  <span
                    className="wa-tiles"
                    role="img"
                    aria-label={
                      turn.guess +
                      ". " +
                      [...turn.pattern].map((v, j) => turn.guess[j] + " " + tileNames[v]).join(". ")
                    }
                  >
                    {[...turn.pattern].map((v, j) => (
                      <span aria-hidden="true" key={j} data-tile={v}>
                        {turn.guess[j]}
                        <small>{tileMarks[v]}</small>
                      </span>
                    ))}
                  </span>
                  <span
                    className="wa-count"
                    aria-label={`${turn.before} before, ${turn.after} after`}
                  >
                    {format(turn.before)} → <b>{format(turn.after)}</b>
                  </span>
                </summary>
                <div className="wa-detail">
                  <p>
                    <b>Still possible{turn.after > turn.remaining.length ? " (first 10)" : ""}</b> ·{" "}
                    {turn.remaining.join(", ") || "None in this pool"}
                  </p>
                  <p>
                    <b>
                      Ruled out on this turn
                      {turn.before - turn.after > turn.removed.length ? " (first 6)" : ""}
                    </b>{" "}
                    · {turn.removed.join(", ") || "None"}
                  </p>
                </div>
              </details>
            ))}
            <p className="wa-summary">
              {largest
                ? `Largest drop on ${largestRows.length === 1 ? "turn" : "turns"} ${largestRows.join(", ")} · ${format(largest)} ruled out.`
                : "All turns preserved the previous candidate count."}
            </p>
            <p className="wa-meta">
              Open a turn to see the words. ✓ Right place · ↔ Other place · – No copy left
            </p>
            <Link className="pt-action underline" href={trap ? `${trainerPath}#trap-${trap.id}` : trainerPath}
              onClick={() => trackToolEvent("analyzer_trap_practice", { family: trap?.id ?? "general" })}>
              {trap ? `Practice the ${trap.pattern} endgame` : "Practice a four-green endgame"}
            </Link>
            {!pool.includes(answer) && (
              <p className="wa-notice">
                This answer is outside the reference pool. The tiles use your answer, and the counts
                include only reference words.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
