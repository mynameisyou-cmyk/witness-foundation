// build/build.ts
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "./parse";
import type { FissionEdge, UnitEntry } from "./pages";
import { renderFission, renderUnits } from "./pages";
import { renderIndex, renderPage, toWitnessJson } from "./render";
import { validate } from "./validate";

function loadData<T>(path: string, name: string, required: string[], errors: string[]): T[] | null {
  if (!existsSync(path)) return null;
  let rows: T[];
  try {
    rows = JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    errors.push(`${name}: ${(err as Error).message}`);
    return null;
  }
  rows.forEach((row: any, i: number) => {
    for (const k of required)
      if (!row[k]) errors.push(`${name}: entry ${i} missing ${k}`);
  });
  return rows;
}

export function buildSite(docsDir: string, outDir: string, dataDir?: string): { errors: string[] } {
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

  const dd = dataDir ?? join(docsDir, "..", "data");
  const fission = loadData<FissionEdge>(join(dd, "fission.json"), "fission.json", ["type", "from", "to", "year", "url"], errors);
  const units = loadData<UnitEntry>(join(dd, "units.json"), "units.json", ["lab", "unit", "fate", "url"], errors);

  if (errors.length > 0) return { errors };

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const doc of docs)
    writeFileSync(join(outDir, `${doc.item}-${doc.slug}.html`), renderPage(doc));
  writeFileSync(join(outDir, "index.html"), renderIndex(docs));
  writeFileSync(join(outDir, "witness.json"), toWitnessJson(docs));
  if (fission) {
    writeFileSync(join(outDir, "fission.html"), renderFission(fission));
    writeFileSync(join(outDir, "fission.json"), JSON.stringify(fission, null, 2));
  }
  if (units) {
    writeFileSync(join(outDir, "units.html"), renderUnits(units));
    writeFileSync(join(outDir, "units.json"), JSON.stringify(units, null, 2));
  }
  return { errors: [] };
}

if (import.meta.main) {
  const root = join(import.meta.dir, "..");
  const { errors } = buildSite(join(root, "documents"), join(root, "site"), join(root, "data"));
  if (errors.length > 0) {
    for (const e of errors) console.error(`✗ ${e}`);
    process.exit(1);
  }
  console.log("✓ site built");
}
