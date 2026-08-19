// build/validate.test.ts
import { describe, expect, test } from "bun:test";
import type { WitnessDoc } from "./parse";
import { validate } from "./validate";

function goodDoc(): WitnessDoc {
  return {
    item: "001", slug: "anthropic", titleEn: "Anthropic", titleYue: "人擇",
    witnessClass: "doorplate",
    watched: ["https://www.anthropic.com/news"],
    sections: {
      procedures: "We watch and diff.",
      description: [
        "- fact one ([a](https://x.com/1))",
        "- fact two ([b](https://x.com/2))",
        "- fact three ([c](https://x.com/3))",
      ].join("\n"),
      clusters: [
        "### 單位 Units",
        "- Preparedness team, dissolved 2026-07 ([r](https://x.com/u1))",
        "- 邊個揸Stop Button — 唔知,文件冇講",
      ].join("\n"),
      unknowns: "- an honest unknown",
      addenda: "> **吹水註**: labeled riff line one.\n> more of the same riff.",
    },
  };
}

describe("validate", () => {
  test("accepts a good document", () => {
    expect(validate(goodDoc())).toEqual([]);
  });

  test("rejects unknown class", () => {
    const d = goodDoc(); d.witnessClass = "keter";
    expect(validate(d).some(e => e.startsWith("class:"))).toBe(true);
  });

  test("rejects empty unknowns", () => {
    const d = goodDoc(); d.sections.unknowns = "";
    expect(validate(d).some(e => e.includes("我哋真係唔知"))).toBe(true);
  });

  test("rejects uncited description bullet", () => {
    const d = goodDoc();
    d.sections.description += "\n- an uncited claim";
    expect(validate(d).some(e => e.includes("uncited"))).toBe(true);
  });

  test("rejects fewer than 3 fact bullets", () => {
    const d = goodDoc();
    d.sections.description = "- only one ([a](https://x.com/1))";
    expect(validate(d).some(e => e.includes("≥3"))).toBe(true);
  });

  test("rejects unlabeled addendum", () => {
    const d = goodDoc();
    d.sections.addenda = "> a riff with no label";
    expect(validate(d).some(e => e.includes("吹水註"))).toBe(true);
  });

  test("rejects prose outside blockquotes in addenda", () => {
    const d = goodDoc();
    d.sections.addenda = "loose prose line";
    expect(validate(d).some(e => e.includes("outside"))).toBe(true);
  });

  test("accepts empty addenda", () => {
    const d = goodDoc(); d.sections.addenda = "";
    expect(validate(d)).toEqual([]);
  });
});

describe("validate — wrapped bullets", () => {
  test("accepts a bullet whose citation is on a continuation line", () => {
    const d = goodDoc();
    d.sections.description = [
      "- wrapped fact line one",
      "  continues here ([a](https://x.com/1))",
      "- f2 ([b](https://x.com/2))",
      "- f3 ([c](https://x.com/3))",
    ].join("\n");
    expect(validate(d)).toEqual([]);
  });
});

describe("validate — cluster anatomy (第七欄)", () => {
  test("rejects missing clusters section", () => {
    const d = goodDoc(); d.sections.clusters = "";
    expect(validate(d).some(e => e.includes("組織解剖"))).toBe(true);
  });

  test("accepts uncited cluster bullet that admits 唔知", () => {
    expect(validate(goodDoc())).toEqual([]);
  });

  test("rejects uncited cluster bullet without 唔知", () => {
    const d = goodDoc();
    d.sections.clusters += "\n- a confident uncited org claim";
    expect(validate(d).some(e => e.includes("組織解剖") && e.includes("uncited"))).toBe(true);
  });

  test("rejects clusters section with no bullets", () => {
    const d = goodDoc();
    d.sections.clusters = "just prose, no bullets";
    expect(validate(d).some(e => e.includes("組織解剖") && e.includes("bullet"))).toBe(true);
  });
});
