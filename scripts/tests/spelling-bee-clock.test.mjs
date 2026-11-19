import assert from "node:assert/strict";
import test from "node:test";
import { getSpellingBeeTodayDateString } from "../../lib/spelling-bee-clock.mjs";

test("the active hive changes at 03:00 New York time across DST and year boundaries", () => {
  const cases = [
    ["2026-03-08T06:59:59Z", "2026-03-07"],
    ["2026-03-08T07:00:00Z", "2026-03-08"],
    ["2026-11-01T07:59:59Z", "2026-10-31"],
    ["2026-11-01T08:00:00Z", "2026-11-01"],
    ["2026-01-01T06:00:00Z", "2025-12-31"],
  ];
  for (const [instant, activeDate] of cases) {
    assert.equal(getSpellingBeeTodayDateString(new Date(instant)), activeDate, instant);
  }
});
