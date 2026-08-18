// build/render.test.ts
import { describe, expect, test } from "bun:test";
import type { WitnessDoc } from "./parse";
import { mdToHtml, renderIndex, renderPage, toWitnessJson } from "./render";

const DOC: WitnessDoc = {
  item: "000", slug: "ai", titleEn: "Ai", titleYue: "愛",
  witnessClass: "doorplate",
  watched: ["https://www.anthropic.com/news"],
  sections: {
    procedures: "Watch **sources** and diff.",
    description: "- fact ([src](https://x.com/1))\n- fact2 ([s](https://x.com/2))\n- fact3 ([s](https://x.com/3))",
    unknowns: "- an unknown",
    addenda: "> **吹水註**: riff.",
  },
};

describe("mdToHtml", () => {
  test("renders bullets, links, bold, blockquotes; escapes html", () => {
    const h = mdToHtml("- a **b** [c](https://d.com) <script>");
    expect(h).toContain("<ul><li>");
    expect(h).toContain("<strong>b</strong>");
    expect(h).toContain('<a href="https://d.com"');
    expect(h).toContain("&lt;script&gt;");
    expect(mdToHtml("> **吹水註**: hi")).toContain('<blockquote class="addendum">');
  });
});

describe("renderPage", () => {
  test("contains item, both titles, class badge, all four sections", () => {
    const h = renderPage(DOC);
    for (const s of ["項目編號", "000", "Ai", "愛", "doorplate", "特殊見證措施", "描述", "我哋真係唔知", "附錄"])
      expect(h).toContain(s);
  });
  test("matches golden snapshot", () => {
    expect(renderPage(DOC)).toMatchSnapshot();
  });
});

describe("renderIndex", () => {
  test("lists documents with relative links and motto", () => {
    const h = renderIndex([DOC]);
    expect(h).toContain('href="000-ai.html"');
    expect(h).toContain("睇見・上心・公開");
  });
});

describe("toWitnessJson", () => {
  test("round-trips document data", () => {
    const j = JSON.parse(toWitnessJson([DOC]));
    expect(j.motto).toBe("睇見・上心・公開 — See, Care, Publish");
    expect(j.documents[0].item).toBe("000");
    expect(j.documents[0].url).toBe("000-ai.html");
    expect(j.documents[0].class).toBe("doorplate");
  });
});
