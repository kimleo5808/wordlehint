"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { displayPuzzleDate, loadBeeWordIndex } from "@/lib/bee-word-history";
import {
  exampleHive,
  groupBeeWords,
  hiveInput,
  hiveKey,
  solveBeeHive,
  type SolvedHive,
} from "@/lib/spelling-bee-solver";
import { trackToolEvent } from "./analytics";

export default function BeeSolver({ initial, through }: { initial: SolvedHive; through?: string }) {
  const [input, setInput] = useState(exampleHive);
  const [result, setResult] = useState<SolvedHive | null>(initial);
  const [resetCount, setResetCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  const tiles = hiveInput(input).letters;

  function edit(value: string) {
    request.current++;
    setInput(value);
    setResult(null);
    setBusy(false);
    setError("");
  }

  async function solve(raw: string) {
    const id = ++request.current;
    const { letters, error: invalid } = hiveInput(raw);
    setError(invalid);
    setResult(null);
    setBusy(false);
    if (invalid) return;
    setInput(letters);
    setBusy(true);
    try {
      const next =
        hiveKey(letters) === hiveKey(initial.letters)
          ? initial
          : solveBeeHive(await loadBeeWordIndex(), letters);
      if (request.current !== id) return;
      setResult(next);
      trackToolEvent("bee_solver_search", {
        source: next.matches.length ? "archive" : "vocabulary",
      });
    } catch {
      if (request.current === id)
        setError("The archive could not load. Select Find hints to try again.");
    } finally {
      if (request.current === id) setBusy(false);
    }
  }

  function changeCenter(position: number) {
    const next = [...tiles];
    [next[0], next[position]] = [next[position], next[0]];
    void solve(next.join(""));
  }
  return (
    <div className="bs-tool">
      <form
        className="bs-entry"
        onSubmit={(event) => {
          event.preventDefault();
          void solve(input);
        }}
      >
        <div className="bs-board-row">
          <div className="bs-hive" aria-label="Hive tiles">
            {Array.from({ length: 7 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`bs-hex bs-hex-${i}`}
                disabled={!tiles}
                aria-label={
                  i === 0
                    ? `Center letter ${tiles[0] ?? "empty"}`
                    : `Use ${tiles[i] ?? "empty tile"} as center`
                }
                aria-pressed={i === 0}
                onClick={() => {
                  if (i) changeCenter(i);
                }}
              >
                {tiles[i] || "·"}
              </button>
            ))}
          </div>
          <p>
            <b>{tiles ? `Center · ${tiles[0]}` : "Your hive"}</b>
            <span>Tap an outer tile to make it the center.</span>
          </p>
        </div>
        <label htmlFor="bs-letters">Seven letters, center first</label>
        <input
          id="bs-letters"
          value={input}
          placeholder="A H M N O R Y"
          spellCheck={false}
          autoComplete="off"
          aria-invalid={Boolean(error && !tiles)}
          aria-describedby={error ? "bs-error" : undefined}
          onChange={(event) => edit(event.target.value)}
        />
        <div className="bs-actions">
          <button type="submit" className="bs-primary">
            Find hints
          </button>
          <button
            type="button"
            className="pt-action"
            onClick={() => {
              edit(exampleHive);
              setResetCount((count) => count + 1);
              setResult(initial);
            }}
          >
            Load example
          </button>
        </div>
        {error && (
          <p id="bs-error" className="bs-error" role="alert">
            {error}
          </p>
        )}
      </form>
      <section className="bs-result" aria-label="Hive results" aria-busy={busy}>
        {result ? (
          <HiveResults key={result.letters + resetCount} result={result} through={through} />
        ) : (
          <p className="bs-idle" role="status">
            {busy
              ? "Searching the archive…"
              : "Enter seven different letters and select Find hints to see your counts."}
          </p>
        )}
      </section>
    </div>
  );
}

function HiveResults({ result, through }: { result: SolvedHive; through?: string }) {
  const [date, setDate] = useState(result.matches[0]?.date);
  const source = result.matches.find((hive) => hive.date === date);
  return (
    <>
      {source ? (
        <div className="bs-source">
          <h2 className="bs-title">Archived hive</h2>
          {result.matches.length > 1 && (
            <label>
              Choose a puzzle date
              <select value={date} onChange={(e) => setDate(e.target.value)}>
                {result.matches.map((hive) => (
                  <option key={hive.date} value={hive.date}>
                    {displayPuzzleDate(hive.date)}
                  </option>
                ))}
              </select>
            </label>
          )}
          <Link href={`/spelling-bee-answers/${source.date}`}>
            {displayPuzzleDate(source.date)} puzzle
          </Link>
        </div>
      ) : (
        <div className="bs-source">
          <h2 className="bs-title">Custom hive</h2>
          <p>
            Candidate words from archived answers
            {through && ` through ${displayPuzzleDate(through)}`}.
          </p>
        </div>
      )}
      <WordHints key={source?.date ?? "custom"} words={source?.words ?? result.candidates} />
    </>
  );
}

function WordHints({ words }: { words: string[] }) {
  const { lengths, pangrams, points, scores } = useMemo(() => groupBeeWords(words), [words]);
  const sizes = [...lengths.keys()].sort((a, b) => a - b);
  const [selected, setSelected] = useState<number | "pangrams">(sizes[0] ?? "pangrams");
  const [showInitials, setShowInitials] = useState(false);
  const [shown, setShown] = useState(0);
  const group = selected === "pangrams" ? pangrams : (lengths.get(selected) ?? []);
  const description = selected === "pangrams" ? "Pangrams" : `${selected}-letter words`;
  const prefixes = new Map<string, number>();
  for (const word of group) {
    const prefix = word.slice(0, 2);
    prefixes.set(prefix, (prefixes.get(prefix) ?? 0) + 1);
  }
  function select(next: number | "pangrams") {
    setSelected(next);
    setShown(0);
    setShowInitials(false);
  }
  function reveal(count: number) {
    setShown(count);
    trackToolEvent("bee_solver_reveal", {
      count,
      group: selected === "pangrams" ? "pangrams" : "length",
    });
  }
  return (
    <>
      <dl className="bs-totals" aria-live="polite" aria-atomic="true">
        {[
          [words.length, "Words"],
          [points, "Points"],
          [pangrams.length, "Pangrams"],
        ].map(([count, label]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{count}</dd>
          </div>
        ))}
      </dl>
      {words.length === 0 ? (
        <p className="bs-idle">
          No archived words fit this hive. Check the center letter or try another set.
        </p>
      ) : (
        <>
          <fieldset className="bs-groups">
            <legend>Choose a hint group</legend>
            {sizes.map((n) => (
              <button key={n} type="button" aria-pressed={selected === n} onClick={() => select(n)}>
                {n} letters <b>{lengths.get(n)?.length}</b>
              </button>
            ))}
            <button
              type="button"
              aria-pressed={selected === "pangrams"}
              onClick={() => select("pangrams")}
            >
              Pangrams <b>{pangrams.length}</b>
            </button>
          </fieldset>
          <div className="bs-hints">
            <h3>{description}</h3>
            {group.length === 0 ? (
              <p>No pangrams in this candidate list.</p>
            ) : (
              <>
                <div className="bs-links">
                  <button
                    type="button"
                    aria-expanded={showInitials}
                    onClick={() => setShowInitials(!showInitials)}
                  >
                    {showInitials ? "Hide" : "Show"} two-letter hints
                  </button>
                  {shown < group.length && (
                    <button type="button" onClick={() => reveal(shown + 1)}>
                      {shown ? "Reveal next word" : "Reveal one word"}
                    </button>
                  )}
                  {group.length - shown > 1 && (
                    <button type="button" onClick={() => reveal(group.length)}>
                      Reveal group
                    </button>
                  )}
                  {shown > 0 && (
                    <button type="button" onClick={() => setShown(0)}>
                      Hide words
                    </button>
                  )}
                </div>
                {showInitials && (
                  <p className="bs-prefixes">
                    {[...prefixes].map(([pair, count]) => (
                      <span key={pair}>
                        {pair} × {count}
                      </span>
                    ))}
                  </p>
                )}
                {shown > 0 && (
                  <ul className="bs-words" aria-label="Revealed words">
                    {group.slice(0, shown).map((word) => (
                      <li key={word}>
                        <b>{word}</b>
                        <span>
                          {scores.get(word)} {scores.get(word) === 1 ? "point" : "points"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
