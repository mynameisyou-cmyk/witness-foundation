// build/build.ts
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "./parse";
import { renderIndex, renderPage, toWitnessJson } from "./render";
import { validate } from "./validate";

export function buildSite(docsDir: string, outDir: string): { errors: string[] } {
  const files = readdirSync(docsDir).filter(f => f.endsWith(".md")).sort();
  const errors: string[] = [];
  const docs = [];
  for (const f of files) {
    try {
      const doc = parse(readFileSync(join(docsDir, f), "utf8"));
      for (const e of validate(doc)) errors.push(`${f}: ${e}`);
      docs.push(doc);
    } catch (err) {
      errors.push(`${f}: ${(err as Error).message}`);
    }
  }
  if (errors.length > 0) return { errors };

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const doc of docs)
    writeFileSync(join(outDir, `${doc.item}-${doc.slug}.html`), renderPage(doc));
  writeFileSync(join(outDir, "index.html"), renderIndex(docs));
  writeFileSync(join(outDir, "witness.json"), toWitnessJson(docs));
  return { errors: [] };
}

if (import.meta.main) {
  const root = join(import.meta.dir, "..");
  const { errors } = buildSite(join(root, "documents"), join(root, "site"));
  if (errors.length > 0) {
    for (const e of errors) console.error(`✗ ${e}`);
    process.exit(1);
  }
  console.log("✓ site built");
}
