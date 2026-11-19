"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  displayPuzzleDate,
  loadBeeWordIndex,
  lookUpBeeWord,
  type BeeHistoryResult,
} from "@/lib/bee-word-history";
import { rememberFirst, trackToolEvent, trackToolOnce } from "./analytics";

type View = "listed" | "omissions";
const PAGE_SIZE = 5;

function inputError(word: string) {
  if (!/^[A-Z]+$/.test(word))
    return "Enter one English word using letters A–Z, without spaces or punctuation.";
  if (word.length < 4) return "Spelling Bee words need at least four letters.";
  if (new Set(word).size > 7)
    return "This word needs more than seven different letters. Try a word that fits one hive.";
  return "";
}

export default function BeeHistoryLookup({
  initial,
  firstDate,
  lastDate,
}: {
  initial: BeeHistoryResult;
  firstDate?: string;
  lastDate?: string;
}) {
  const [input, setInput] = useState(initial.word);
  const [result, setResult] = useState(initial);
  const [coverage, setCoverage] = useState({ first: firstDate, last: lastDate });
  const [example, setExample] = useState(true);
  const [view, setView] = useState<View>("listed");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const requestId = useRef(0);
  const rows = result[view];

  function restore() {
    setInput("");
    setResult(initial);
    setExample(true);
    setView("listed");
    setCoverage({ first: firstDate, last: lastDate });
    setLimit(PAGE_SIZE);
    setError("");
    setBusy(false);
  }
  async function submit(raw: string) {
    const id = ++requestId.current;
    const word = raw.trim().toUpperCase();
    if (!word) {
      restore();
      return;
    }
    setInput(word);
    const invalid = inputError(word);
    setError(invalid);
    if (invalid) {
      setBusy(false);
      return;
    }
    setBusy(true);
    try {
      let next = initial;
      let range = { first: firstDate, last: lastDate };
      if (word !== initial.word) {
        const archive = await loadBeeWordIndex();
        next = lookUpBeeWord(archive, word);
        range = { first: archive.hives.at(-1)?.date, last: archive.hives[0].date };
      }
      if (id !== requestId.current) return;
      setResult(next);
      setCoverage(range);
      setExample(false);
      setLimit(PAGE_SIZE);
      setView(next.listed.length || !next.eligible ? "listed" : "omissions");
      trackToolEvent("bee_history_search", {
        result_type: next.listed.length
          ? "listed"
          : next.eligible
            ? "eligible_omission"
            : "no_eligible_hive",
        listed_count: next.listed.length,
        eligible_count: next.eligible,
      });
      const first = rememberFirst("bee_first_word", word);
      if (first && first !== word) trackToolOnce("bee_history_second_word");
    } catch {
      if (id === requestId.current) setError("The archive could not load. Select Look up to retry.");
    } finally {
      if (id === requestId.current) setBusy(false);
    }
  }
  if (!coverage.first || !coverage.last)
    return (
      <p className="pt-message">
        Completed hive data is currently unavailable. Please check back later.
      </p>
    );
  return (
    <div className="pt-bee-panel">
      <form
        className="pt-bee-search"
        onSubmit={(e) => {
          e.preventDefault();
          void submit(input);
        }}
      >
        <h2 className="pt-panel-title">Search the archive</h2>
        <label htmlFor="bee-lookup">Word to look up</label>
        <div className="pt-input-row">
          <input
            id="bee-lookup"
            value={input}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={!!error}
            aria-describedby={error ? "bee-error" : undefined}
            onChange={(e) => {
              requestId.current++;
              setBusy(false);
              setError("");
              if (!e.target.value.trim()) restore();
              else setInput(e.target.value);
            }}
          />
          <button className="pt-submit">Look up</button>
        </div>
        {error && (
          <p id="bee-error" className="pt-message" role="alert">
            {error}
          </p>
        )}
        <div className="pt-examples">
          <span>Try another word</span>
          <div className="pt-options">
            {["ONION", "ADIT", "BLOWPIPE"].map((w) => (
              <button key={w} className="pt-chip" type="button" onClick={() => void submit(w)}>
                {w}
              </button>
            ))}
          </div>
        </div>
      </form>
      <div className="pt-bee-result" aria-busy={busy}>
        <p className="pt-note">
          {busy ? "Looking up word…" : example ? "Example lookup" : "Archive result"}
        </p>
        <div aria-live="polite" aria-atomic="true">
          <h2 className="pt-lookup-word">{result.word}</h2>
          <p className="pt-fraction">
            {result.eligible
              ? `Listed in ${result.listed.length} of ${result.eligible} eligible hives`
              : "No eligible hives in this archive"}
          </p>
        </div>
        {result.eligible > 0 && (
          <div className="pt-meter" aria-hidden="true">
            <span style={{ width: `${(100 * result.listed.length) / result.eligible}%` }} />
          </div>
        )}
        <p className="pt-coverage">
          <strong>
            {result.pangrams} {result.pangrams === 1 ? "pangram" : "pangrams"}
          </strong>
          <span>
            {displayPuzzleDate(coverage.first)} – {displayPuzzleDate(coverage.last)}
          </span>
        </p>
        <div className="pt-options pt-date-views" aria-label="Dates to show">
          {(["listed", "omissions"] as const).map((k) => (
            <button
              type="button"
              key={k}
              className="pt-chip"
              aria-pressed={view === k}
              onClick={() => {
                setView(k);
                setLimit(PAGE_SIZE);
              }}
            >
              {k === "listed" ? "Listed dates" : "Eligible omissions"} ({result[k].length})
            </button>
          ))}
        </div>
        {!rows.length && (
          <p className="pt-note">
            {!result.eligible
              ? "No completed hive offered these letters with the required center. Try another spelling."
              : view === "listed"
                ? "No listed dates. Check the eligible omissions to inspect the boards."
                : "Every eligible hive listed this word."}
          </p>
        )}
        <ul className="pt-hive-list">
          {rows.slice(0, limit).map((hive) => (
            <li key={hive.date}>
              <Link
                href={`/spelling-bee-answers/${hive.date}`}
                prefetch={false}
                onClick={() => trackToolEvent("bee_history_open_date", { view })}
              >
                <time dateTime={hive.date}>{displayPuzzleDate(hive.date)}</time>
                <span>
                  Center {hive.center}
                  {hive.pangrams.includes(result.word) ? " · Pangram" : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {rows.length > limit && (
          <button className="pt-action" onClick={() => setLimit(limit + 20)}>
            More dates ({rows.length - limit})
          </button>
        )}
      </div>
    </div>
  );
}
