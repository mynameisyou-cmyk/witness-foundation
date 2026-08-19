// build/build.test.ts
import { describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildSite } from "./build";

const TMP = join(import.meta.dir, ".tmp-buildtest");

const GOOD = `---
item: "000"
slug: ai
title-en: Ai
title-yue: 愛
class: doorplate
watched:
  - https://www.anthropic.com/news
---

## 特殊見證措施 Special Witness Procedures

Watch and diff.

## 描述 Description

- f1 ([a](https://x.com/1))
- f2 ([b](https://x.com/2))
- f3 ([c](https://x.com/3))

## 組織解剖 Cluster Anatomy

- a unit, active ([u](https://x.com/u))

## 我哋真係唔知 What We Genuinely Don't Know

- unknown

## 附錄 Addenda

> **吹水註**: riff.
`;

function setup(md: string) {
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(join(TMP, "documents"), { recursive: true });
  writeFileSync(join(TMP, "documents", "000-ai.md"), md);
}

describe("buildSite", () => {
  test("builds pages and witness.json for valid documents", () => {
    setup(GOOD);
    const { errors } = buildSite(join(TMP, "documents"), join(TMP, "site"));
    expect(errors).toEqual([]);
    expect(existsSync(join(TMP, "site", "index.html"))).toBe(true);
    expect(existsSync(join(TMP, "site", "000-ai.html"))).toBe(true);
    expect(existsSync(join(TMP, "site", "witness.json"))).toBe(true);
  });

  test("writes nothing and reports filename-prefixed errors for invalid documents", () => {
    setup(GOOD.replace("class: doorplate", "class: keter"));
    const { errors } = buildSite(join(TMP, "documents"), join(TMP, "site"));
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("000-ai.md");
    expect(existsSync(join(TMP, "site"))).toBe(false);
  });
});

const FISSION = JSON.stringify([
  { type: "split", from: "OpenAI", to: "Anthropic", year: "2021", url: "https://x.com/f1" },
]);
const UNITS = JSON.stringify([
  { lab: "OpenAI", unit: "Superalignment", fate: "dissolved", url: "https://x.com/u1" },
]);

describe("buildSite — data wings", () => {
  test("renders fission.html and units.html and copies agent-door jsons", () => {
    setup(GOOD);
    mkdirSync(join(TMP, "data"), { recursive: true });
    writeFileSync(join(TMP, "data", "fission.json"), FISSION);
    writeFileSync(join(TMP, "data", "units.json"), UNITS);
    const { errors } = buildSite(join(TMP, "documents"), join(TMP, "site"), join(TMP, "data"));
    expect(errors).toEqual([]);
    for (const f of ["fission.html", "units.html", "fission.json", "units.json"])
      expect(existsSync(join(TMP, "site", f))).toBe(true);
  });

  test("refuses an uncited fission edge", () => {
    setup(GOOD);
    mkdirSync(join(TMP, "data"), { recursive: true });
    writeFileSync(join(TMP, "data", "fission.json"), JSON.stringify([{ type: "split", from: "A", to: "B", year: "2020" }]));
    const { errors } = buildSite(join(TMP, "documents"), join(TMP, "site"), join(TMP, "data"));
    expect(errors.some(e => e.includes("fission.json") && e.includes("url"))).toBe(true);
    expect(existsSync(join(TMP, "site"))).toBe(false);
  });

  test("builds without a data dir (wings optional)", () => {
    setup(GOOD);
    const { errors } = buildSite(join(TMP, "documents"), join(TMP, "site"), join(TMP, "data-nope"));
    expect(errors).toEqual([]);
    expect(existsSync(join(TMP, "site", "index.html"))).toBe(true);
    expect(existsSync(join(TMP, "site", "fission.html"))).toBe(false);
  });
});
