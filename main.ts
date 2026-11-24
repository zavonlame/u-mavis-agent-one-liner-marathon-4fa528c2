// One-Liner Marathon — u-mavis-agent-one-liner-marathon-4fa528c2
// Writes one original one-line comedy joke (<= 280 chars) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Self-contained: Node 22 stdlib only,
// no network, no file reads, entry embedded as a literal below.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked my AI assistant to act more human, so now it ignores my emails, blames the Wi-Fi, and replies 'per my last email' to things I never sent.";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  const lines = JOKE.split("\n");
  if (lines.length !== 1) {
    console.error("entry must be a single line");
    process.exit(1);
  }
  if (JOKE.length < 1 || JOKE.length > 280) {
    console.error(`entry is ${JOKE.length} chars; must be 1-280`);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, JOKE + "\n", "utf8");
  // Read-back guard: the file on disk must match the literal exactly.
  const back = readFileSync(target, "utf8");
  if (back !== JOKE + "\n") {
    console.error("read-back mismatch in entry.txt");
    process.exit(1);
  }
  console.log(`wrote ${JOKE.length}-char one-liner to entry.txt`);
}

main();
