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
