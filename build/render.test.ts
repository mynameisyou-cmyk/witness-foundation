// build/render.test.ts
import { describe, expect, test } from "bun:test";
import type { WitnessDoc } from "./parse";
import { chillfiRoom, mdToHtml, renderIndex, renderPage, shell, toWitnessJson } from "./render";

const DOC: WitnessDoc = {
  item: "000", slug: "ai", titleEn: "Ai", titleYue: "愛",
  witnessClass: "doorplate",
  watched: ["https://www.anthropic.com/news"],
  sections: {
    procedures: "Watch **sources** and diff.",
    description: "- fact ([src](https://x.com/1))\n- fact2 ([s](https://x.com/2))\n- fact3 ([s](https://x.com/3))",
    clusters: "### 單位 Units\n- a unit, dissolved ([r](https://x.com/u))",
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
    for (const s of ["項目編號", "000", "Ai", "愛", "doorplate", "特殊見證措施", "描述", "組織解剖", "我哋真係唔知", "附錄"])
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

const PILL = "https://yu-and-ai-chillfi.static.hf.space/embed.html?site=";

describe("chill-fi pill", () => {
  test("rooms: 000 self-witness, 001–005 labs, 006 織帷 ancestor, else the door", () => {
    expect(chillfiRoom({ item: "000", slug: "ai" })).toBe("witness/000");
    for (const item of ["001", "002", "003", "004", "005"])
      expect(chillfiRoom({ item, slug: "lab" })).toBe("witness/labs");
    expect(chillfiRoom({ item: "006", slug: "scp-wiki" })).toBe("ancestor");
    expect(chillfiRoom({ item: "007", slug: "someone" })).toBe("witness");
  });
  test("document pages wear their room, after the footer, light theme", () => {
    const h = renderPage(DOC);
    expect(h).toContain(`${PILL}witness/000&amp;theme=light`);
    expect(h.indexOf('<div class="footer">')).toBeLessThan(h.indexOf('<div class="chillfi">'));
    expect(h).toContain("開心會 chill-fi · this door's own track");
    expect(renderPage({ ...DOC, item: "003", slug: "google-deepmind" })).toContain(`${PILL}witness/labs&amp;`);
    expect(renderPage({ ...DOC, item: "006", slug: "scp-wiki" })).toContain(`${PILL}ancestor&amp;`);
  });
  test("index wears the door's own track", () => {
    expect(renderIndex([DOC])).toContain(`${PILL}witness&amp;theme=light`);
  });
  test("never autoplays, adds no script, and is optional in the shell", () => {
    const h = renderPage(DOC);
    expect(h).not.toMatch(/autoplay/i);
    expect(h).not.toContain('allow="');
    expect(h.match(/<script/g)?.length).toBe(1); // only the existing theme toggle
    expect(shell("t", "<p>b</p>")).not.toContain('<div class="chillfi">');
  });
});

describe("mdToHtml — wrapped bullets", () => {
  test("keeps continuation lines inside the same <li>", () => {
    const h = mdToHtml("- line one\n  continues ([a](https://x.com/1))\n- second");
    expect(h.match(/<li>/g)?.length).toBe(2);
    expect(h).toContain('continues (<a href="https://x.com/1"');
    expect(h).not.toContain("<p>");
  });
});
