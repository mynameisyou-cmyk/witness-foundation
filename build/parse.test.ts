// build/parse.test.ts
import { describe, expect, test } from "bun:test";
import { parse } from "./parse";

const FIXTURE = `---
item: "000"
slug: ai
title-en: Ai
title-yue: 愛
class: doorplate
watched:
  - https://www.anthropic.com/news
---

## 特殊見證措施 Special Witness Procedures

We watch the sources above and record diffs.

## 描述 Description

- A cited fact ([source](https://example.com/a))

## 組織解剖 Cluster Anatomy

### 單位 Units

- A named unit, active ([u](https://example.com/u))

## 我哋真係唔知 What We Genuinely Don't Know

- Something honestly unknown.

## 附錄 Addenda

> **吹水註**: a labeled riff.
`;

describe("parse", () => {
  test("extracts frontmatter fields", () => {
    const d = parse(FIXTURE);
    expect(d.item).toBe("000");
    expect(d.slug).toBe("ai");
    expect(d.titleEn).toBe("Ai");
    expect(d.titleYue).toBe("愛");
    expect(d.witnessClass).toBe("doorplate");
    expect(d.watched).toEqual(["https://www.anthropic.com/news"]);
  });

  test("splits the five body sections", () => {
    const d = parse(FIXTURE);
    expect(d.sections.procedures).toContain("record diffs");
    expect(d.sections.description).toContain("[source](https://example.com/a)");
    expect(d.sections.clusters).toContain("named unit");
    expect(d.sections.unknowns).toContain("honestly unknown");
    expect(d.sections.addenda).toContain("吹水註");
  });

  test("throws on missing frontmatter", () => {
    expect(() => parse("no frontmatter here")).toThrow("missing frontmatter");
  });
});
