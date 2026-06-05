export type ConnectionsLevel = 0 | 1 | 2 | 3; // 0 yellow … 3 purple

export interface ConnectionsGroup {
  level: ConnectionsLevel;
  name: string; // category title, e.g. "BIT OF CEREAL"
  words: string[]; // 4 uppercase words
}

export interface ConnectionsPuzzle {
  date: string; // YYYY-MM-DD
  id: number; // displayed puzzle number (days since 2023-06-12, +1)
  editor: string;
  groups: ConnectionsGroup[]; // ordered by level 0→3
}

export interface ConnectionsDataFile {
  lastUpdated: string;
  puzzles: ConnectionsPuzzle[];
}
