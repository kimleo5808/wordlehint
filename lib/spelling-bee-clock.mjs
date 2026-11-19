const easternDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const easternHour = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  hourCycle: "h23",
});

/** Each hive ends at 03:00 New York wall time, including on DST transitions. */
export function getSpellingBeeTodayDateString(now = new Date()) {
  const day = easternDay.format(now);
  if (Number(easternHour.format(now)) >= 3) return day;
  const previous = new Date(day + "T12:00:00Z");
  previous.setUTCDate(previous.getUTCDate() - 1);
  return previous.toISOString().slice(0, 10);
}
