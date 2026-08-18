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
