/**
 * Copy for the Pips pages. Rule wording follows NYT's own in-game text
 * (help.nytimes.com/360011158491-New-York-Times-Games/pips).
 */

export const NYT_PIPS_HELP =
  "https://help.nytimes.com/360011158491-New-York-Times-Games/pips";

export const PIPS_RULES: { symbol: string; name: string; rule: string }[] = [
  { symbol: "5", name: "Number", rule: "Dots in this region sum to 5." },
  { symbol: "=", name: "Equal", rule: "Dots in this region must all be the same number." },
  { symbol: "≠", name: "Not equal", rule: "Dots in this region must all be different numbers." },
  { symbol: "<4", name: "Less than", rule: "Dots must sum to less than 4 — the whole region's total, not each square." },
  { symbol: ">8", name: "Greater than", rule: "Dots must sum to more than 8 — again the region's total." },
  { symbol: "", name: "Empty", rule: "No conditions apply." },
];

export const PIPS_TODAY_FAQ: { question: string; answer: string }[] = [
  {
    question: "What is NYT Pips?",
    answer:
      "Pips is a daily domino logic puzzle from The New York Times, launched on August 18, 2025. You place every domino on the board so that each coloured region meets its condition — a sum, all equal, all different, or a total above or below a number.",
  },
  {
    question: "When does a new Pips puzzle come out?",
    answer:
      "Every day at midnight in your own time zone, with Easy, Medium and Hard released together. This page switches to the new puzzle just after midnight Eastern Time.",
  },
  {
    question: "How do these Pips hints work?",
    answer:
      "Each difficulty has four steps. Step 1 shows a square the rules alone decide — usually a one-square region whose number is its pip count. Step 2 places the domino on it, step 3 places half the board, starting with the most tightly constrained regions, and step 4 shows the full official solution.",
  },
  {
    question: "Can a Pips puzzle have more than one solution?",
    answer:
      "Occasionally, on harder boards. Our hints follow the solution NYT published, and step 1 is always a fact the rules force no matter which solution you find.",
  },
  {
    question: "Do less-than and greater-than apply to each square?",
    answer:
      "No. They compare the region's total: a region marked <4 needs all its dots to add up to 3 or fewer.",
  },
];
