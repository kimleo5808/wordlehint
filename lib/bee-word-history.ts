export interface HistoryHive {
  date: string;
  center: string;
  letters: string;
  pangrams: string[];
}

export interface BeeWordIndex {
  hives: HistoryHive[];
  appearances: Record<string, number[]>;
}

let pendingIndex: Promise<BeeWordIndex> | undefined;

/** Requested only after a visitor runs a custom lookup in either Bee tool. */
export function loadBeeWordIndex() {
  pendingIndex ??= fetch("/puzzle-data/spelling-bee-history.json")
    .then(async (response) => {
      if (!response.ok) throw Error("Archive unavailable");
      const index: BeeWordIndex = await response.json();
      if (!index.hives.length) throw Error("Empty archive");
      return index;
    })
    .catch((error) => {
      pendingIndex = undefined;
      throw error;
    });
  return pendingIndex;
}

export function lookUpBeeWord(index: BeeWordIndex, word: string) {
  const listedIds = new Set(index.appearances[word]);
  const letters = [...new Set(word)];
  const listed: HistoryHive[] = [];
  const omissions: HistoryHive[] = [];
  let pangrams = 0;
  index.hives.forEach((hive, position) => {
    if (listedIds.has(position)) {
      listed.push(hive);
      if (hive.pangrams.includes(word)) pangrams++;
    } else if (word.includes(hive.center) && letters.every((l) => hive.letters.includes(l))) {
      omissions.push(hive);
    }
  });
  return { word, listed, omissions, pangrams, eligible: listed.length + omissions.length };
}

export type BeeHistoryResult = ReturnType<typeof lookUpBeeWord>;

const shortDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function displayPuzzleDate(iso: string) {
  return shortDate.format(new Date(iso + "T12:00:00Z"));
}
