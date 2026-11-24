// One Sentence for a Traveler from 1800 — u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb
// Writes one sentence (<=200 chars) to /output/entry.txt, explaining the
// modern internet to a time traveler from 1800 in words they already know.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "It is a post office where every letter in the world arrives in the blink of an eye, and anyone may read any of them, or write one back, from their own kitchen table.";

function validate(sentence) {
  if (typeof sentence !== "string") throw new Error("entry must be a string");
  if (sentence.length < 1 || sentence.length > 200)
    throw new Error("entry must be 1-200 characters");
  if (sentence.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (sentence.includes("\n") || sentence.includes("\r"))
    throw new Error("entry must be a single line");
  // Exactly one sentence: one terminal full stop, and no other sentence
  // punctuation inside (a second sentence would need a second stop).
  const stops = (sentence.match(/\./g) || []).length;
  if (stops !== 1 || !sentence.endsWith("."))
    throw new Error("entry must be exactly one sentence");
  return sentence;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
const expected = validate(SENTENCE) + "\n";
writeFileSync(outFile, expected, "utf8");
// Read the file back and verify the bytes on disk match the intended entry
// exactly; fail loudly instead of leaving a corrupt entry behind.
const onDisk = readFileSync(outFile, "utf8");
if (onDisk !== expected)
  throw new Error("entry.txt on disk does not match the intended entry");
