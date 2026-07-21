#!/usr/bin/env node

/**
 * generate-strands-unlimited-images.mjs
 *
 * Renders the in-content illustration PNGs for /strands-unlimited from SVG
 * via sharp, into public/images/strands-unlimited/. The spangram figure
 * renders the REAL 2026-04-23 board (clue "Provinces of the pantheon")
 * with paths derived by the same backtracking used in lib/strands-solver.ts.
 *
 * Usage: node scripts/generate-strands-unlimited-images.mjs
 */

import sharp from "sharp";
import { mkdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images", "strands-unlimited");
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;

const CREAM = "#F5F1E8";
const PAPER = "#FBF8F0";
const INK = "#1A1814";
const MID = "#3A3631";
const SUBTLE = "#6B6660";
const SIGNAL = "#C2410C";
const THEME = "#3b82f6";
const SPANGRAM = "#eab308";
const FONT = "Arial, 'DejaVu Sans', 'Liberation Sans', sans-serif";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const label = (x, y, text, opts = {}) => {
  const { fill = SUBTLE, size = 16, anchor = "start", weight = 600 } = opts;
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" letter-spacing="2">${esc(text)}</text>`;
};

const frame = (title, height) => `
  <rect width="${W}" height="${height}" fill="${CREAM}"/>
  <rect x="24" y="24" width="${W - 48}" height="${height - 48}" fill="none" stroke="${MID}" stroke-opacity="0.35" stroke-width="1.5"/>
  ${label(48, 66, title.toUpperCase(), { fill: SIGNAL, size: 17 })}
  ${label(W - 48, 66, "STRANDS UNLIMITED · WORDLEHINT.INFO", { anchor: "end", size: 13 })}`;

// ── Mini solver (mirror of lib/strands-solver.ts) ──────────────
const COLS = 6;
const ROWS = 8;
function solve(board, spangram, themeWords) {
  const letters = board.join("");
  const words = [spangram, ...themeWords].sort((a, b) => b.length - a.length);
  const used = new Array(48).fill(false);
  const result = {};
  const neighbors = (cell) => {
    const r = Math.floor(cell / COLS), c = cell % COLS, out = [];
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push(nr * COLS + nc);
    }
    return out;
  };
  const findPath = (word, pos, cell, path) => {
    path.push(cell); used[cell] = true;
    if (pos === word.length - 1) {
      result[word] = [...path];
      if (place(words.indexOf(word) + 1)) return true;
      delete result[word];
    } else {
      for (const n of neighbors(cell))
        if (!used[n] && letters[n] === word[pos + 1] && findPath(word, pos + 1, n, path)) return true;
    }
    used[cell] = false; path.pop(); return false;
  };
  const place = (i) => {
    if (i === words.length) return true;
    const w = words[i];
    for (let cell = 0; cell < 48; cell++)
      if (!used[cell] && letters[cell] === w[0] && findPath(w, 0, cell, [])) return true;
    return false;
  };
  return place(0) ? result : null;
}

/** Render a full 6×8 board with coloured paths. cs = cell size. */
function boardSvg(x, y, cs, board, paths, spangram, opts = {}) {
  const { dimUnsolved = false } = opts;
  const letters = board.join("");
  const cellColor = new Array(48).fill(null);
  if (paths) {
    for (const [word, path] of Object.entries(paths)) {
      const color = word === spangram ? SPANGRAM : THEME;
      for (const c of path) cellColor[c] = color;
    }
  }
  let lines = "";
  if (paths) {
    for (const [word, path] of Object.entries(paths)) {
      const pts = path
        .map((c) => `${x + (c % COLS) * cs + cs / 2},${y + Math.floor(c / COLS) * cs + cs / 2}`)
        .join(" ");
      lines += `<polyline points="${pts}" fill="none" stroke="${word === spangram ? SPANGRAM : THEME}" stroke-opacity="0.4" stroke-width="${cs * 0.16}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  }
  let cells = "";
  for (let i = 0; i < 48; i++) {
    const cx = x + (i % COLS) * cs + cs / 2;
    const cy = y + Math.floor(i / COLS) * cs + cs / 2;
    const fill = cellColor[i] ?? (dimUnsolved ? "none" : PAPER);
    const tcol = cellColor[i] ? (cellColor[i] === SPANGRAM ? "#1a1505" : "#f8fafc") : INK;
    cells += `<circle cx="${cx}" cy="${cy}" r="${cs * 0.4}" fill="${fill === "none" ? PAPER : fill}" stroke="${MID}" stroke-opacity="${cellColor[i] ? 0 : 0.3}" stroke-width="1.2"/>`;
    cells += `<text x="${cx}" y="${cy}" font-family="${FONT}" font-weight="700" font-size="${cs * 0.4}" fill="${tcol}" text-anchor="middle" dominant-baseline="central">${letters[i]}</text>`;
  }
  return lines + cells;
}

// Real archived board — 2026-04-23, "Provinces of the pantheon".
const PUZZLE = JSON.parse(
  readFileSync(join(__dirname, "..", "data", "strands-daily.json"), "utf-8")
).puzzles.find((p) => p.date === "2026-04-23");
const PATHS = solve(PUZZLE.board, PUZZLE.spangram, PUZZLE.themeWords);
if (!PATHS) throw new Error("solver failed on the showcase board");

// ── 1) How to play — three panels ──────────────────────────────
function howToPlaySvg() {
  const H = 520;
  const panelW = 340;
  const gap = 32;
  const startX = (W - panelW * 3 - gap * 2) / 2;
  const topY = 130;
  const cs = 44;

  // Mini 3×3 crop of letters for panel 2 with a traced LOVE path.
  const mini = (px, withTrace) => {
    const rows = ["LOV", "AEN", "RTS"];
    let out = "";
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++) {
        const cx = px + c * cs + cs / 2;
        const cy = topY + 40 + r * cs + cs / 2;
        const onPath = withTrace && ((r === 0 && c <= 1) || (r === 1 && c === 1) || (r === 0 && c === 2));
        out += `<circle cx="${cx}" cy="${cy}" r="${cs * 0.4}" fill="${onPath ? INK : PAPER}" stroke="${MID}" stroke-opacity="0.3" stroke-width="1.2"/>`;
        out += `<text x="${cx}" y="${cy}" font-family="${FONT}" font-weight="700" font-size="18" fill="${onPath ? CREAM : INK}" text-anchor="middle" dominant-baseline="central">${rows[r][c]}</text>`;
      }
    if (withTrace) {
      const p = [[0, 0], [1, 0], [2, 0], [1, 1]]
        .map(([c, r]) => `${px + c * cs + cs / 2},${topY + 40 + r * cs + cs / 2}`)
        .join(" ");
      out += `<polyline points="${p}" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return out;
  };

  const p1 = startX, p2 = startX + panelW + gap, p3 = startX + (panelW + gap) * 2;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    ${frame("How to play", H)}
    ${label(p1 + panelW / 2, topY, "1 · READ THE CLUE", { anchor: "middle", fill: INK, size: 19 })}
    <rect x="${p1 + 30}" y="${topY + 40}" width="${panelW - 60}" height="110" fill="${PAPER}" stroke="${SIGNAL}" stroke-width="2"/>
    ${label(p1 + panelW / 2, topY + 82, "TODAY'S THEME", { anchor: "middle", size: 12 })}
    <text x="${p1 + panelW / 2}" y="${topY + 116}" font-family="${FONT}" font-weight="700" font-size="20" fill="${INK}" text-anchor="middle">"Provinces of the</text>
    <text x="${p1 + panelW / 2}" y="${topY + 140}" font-family="${FONT}" font-weight="700" font-size="20" fill="${INK}" text-anchor="middle">pantheon"</text>
    ${label(p1 + panelW / 2, topY + 200, "Guess the theme before scanning", { anchor: "middle", size: 15, weight: 400 })}

    ${label(p2 + panelW / 2, topY, "2 · TRACE A WORD", { anchor: "middle", fill: INK, size: 19 })}
    ${mini(p2 + (panelW - cs * 3) / 2, true)}
    ${label(p2 + panelW / 2, topY + 200, "Drag or tap adjacent letters: L-O-V-E", { anchor: "middle", size: 15, weight: 400 })}

    ${label(p3 + panelW / 2, topY, "3 · FILL THE BOARD", { anchor: "middle", fill: INK, size: 19 })}
    <rect x="${p3 + 40}" y="${topY + 46}" width="${panelW - 80}" height="40" rx="20" fill="${THEME}"/>
    <text x="${p3 + panelW / 2}" y="${topY + 66}" font-family="${FONT}" font-weight="800" font-size="18" fill="#f8fafc" text-anchor="middle" dominant-baseline="central">LOVE · WISDOM · …</text>
    <rect x="${p3 + 40}" y="${topY + 100}" width="${panelW - 80}" height="40" rx="20" fill="${SPANGRAM}"/>
    <text x="${p3 + panelW / 2}" y="${topY + 120}" font-family="${FONT}" font-weight="800" font-size="18" fill="#1a1505" text-anchor="middle" dominant-baseline="central">DOMAIN ★</text>
    ${label(p3 + panelW / 2, topY + 200, "Theme words lock blue, spangram yellow", { anchor: "middle", size: 15, weight: 400 })}

    <text x="${p1 + panelW + gap / 2}" y="${topY + 120}" font-family="${FONT}" font-size="30" fill="${SIGNAL}" text-anchor="middle">→</text>
    <text x="${p2 + panelW + gap / 2}" y="${topY + 120}" font-family="${FONT}" font-size="30" fill="${SIGNAL}" text-anchor="middle">→</text>

    ${label(W / 2, H - 56, "ALL 48 LETTERS USED EXACTLY ONCE · NO FAIL STATE · 3 HINTS PER BOARD", { anchor: "middle", size: 14 })}
  </svg>`;
}

// ── 2) Spangram — the real solved board ────────────────────────
function spangramSvg() {
  const H = 640;
  const cs = 62;
  const bx = 120;
  const by = 100;
  const spanOnly = { [PUZZLE.spangram]: PATHS[PUZZLE.spangram] };

  const listX = bx + COLS * cs + 120;
  const words = PUZZLE.themeWords;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    ${frame("The spangram", H)}
    ${boardSvg(bx, by, cs, PUZZLE.board, PATHS, PUZZLE.spangram)}
    ${label(bx + (COLS * cs) / 2, by + ROWS * cs + 36, `"${PUZZLE.clue.toUpperCase()}" · APRIL 23, 2026`, { anchor: "middle", size: 13 })}

    <rect x="${listX - 24}" y="${by + 6}" width="${W - listX - 60}" height="60" rx="30" fill="${SPANGRAM}"/>
    <text x="${listX + (W - listX - 108) / 2}" y="${by + 36}" font-family="${FONT}" font-weight="800" font-size="26" fill="#1a1505" text-anchor="middle" dominant-baseline="central">DOMAIN — spangram</text>
    ${label(listX - 4, by + 104, "TOUCHES BOTH EDGES OF THE BOARD", { size: 13 })}
    ${label(listX - 4, by + 126, "AND NAMES THE THEME ITSELF", { size: 13 })}
    ${words
      .map(
        (w, i) => `
      <circle cx="${listX + 10}" cy="${by + 170 + i * 44}" r="8" fill="${THEME}"/>
      <text x="${listX + 32}" y="${by + 170 + i * 44}" font-family="${FONT}" font-weight="700" font-size="21" fill="${INK}" dominant-baseline="central">${esc(w)}</text>`
      )
      .join("")}
  </svg>`;
}

// ── 3) Strategy — corners + spangram split ─────────────────────
function strategySvg() {
  const H = 640;
  const cs = 56;
  const bx = 140;
  const by = 120;
  const spanOnly = { [PUZZLE.spangram]: PATHS[PUZZLE.spangram] };

  // Highlight the four corner cells.
  const corners = [0, COLS - 1, (ROWS - 1) * COLS, ROWS * COLS - 1];
  const cornerMarks = corners
    .map((c) => {
      const cx = bx + (c % COLS) * cs + cs / 2;
      const cy = by + Math.floor(c / COLS) * cs + cs / 2;
      return `<circle cx="${cx}" cy="${cy}" r="${cs * 0.46}" fill="none" stroke="${SIGNAL}" stroke-width="3" stroke-dasharray="5 4"/>`;
    })
    .join("");

  const tx = bx + COLS * cs + 110;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    ${frame("Two habits that win boards", H)}
    ${boardSvg(bx, by, cs, PUZZLE.board, spanOnly, PUZZLE.spangram)}
    ${cornerMarks}

    ${label(tx, by + 30, "① CORNERS FIRST", { fill: INK, size: 20 })}
    <text x="${tx}" y="${by + 62}" font-family="${FONT}" font-size="17" fill="${MID}">Corner letters have only 3 neighbours,</text>
    <text x="${tx}" y="${by + 86}" font-family="${FONT}" font-size="17" fill="${MID}">so their words have far fewer routes.</text>

    ${label(tx, by + 150, "② SPANGRAM SPLITS THE HUNT", { fill: INK, size: 20 })}
    <text x="${tx}" y="${by + 182}" font-family="${FONT}" font-size="17" fill="${MID}">Once DOMAIN locks in yellow, the rest</text>
    <text x="${tx}" y="${by + 206}" font-family="${FONT}" font-size="17" fill="${MID}">of the words are trapped in smaller</text>
    <text x="${tx}" y="${by + 230}" font-family="${FONT}" font-size="17" fill="${MID}">regions with fewer possible paths.</text>

    ${label(tx, by + 300, "EVERY CELL IS USED EXACTLY ONCE:", { size: 14 })}
    ${label(tx, by + 324, "THE LEFTOVERS ARE THE ANSWERS", { size: 14 })}
  </svg>`;
}

const IMAGES = [
  { file: "how-to-play", svg: howToPlaySvg() },
  { file: "spangram", svg: spangramSvg() },
  { file: "strategy", svg: strategySvg() },
];

async function main() {
  for (const img of IMAGES) {
    await sharp(Buffer.from(img.svg)).png().toFile(join(OUT_DIR, `${img.file}.png`));
    console.log(`✅ images/strands-unlimited/${img.file}.png`);
  }
  console.log(`Done — ${IMAGES.length} images in public/images/strands-unlimited/`);
}

main().catch((err) => {
  console.error("❌ image generation failed:", err.message);
  process.exit(1);
});
