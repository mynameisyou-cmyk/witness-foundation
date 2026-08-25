// build/pages.test.ts
import { describe, expect, test } from "bun:test";
import { render055, renderFission, renderUnits, unitStats } from "./pages";
import type { FissionEdge, UnitEntry } from "./pages";

const EDGES: FissionEdge[] = [
  { type: "split", from: "OpenAI", to: "Anthropic", year: "2021", cluster: "safety-leaning researchers", note: "", url: "https://x.com/1" },
  { type: "split", from: "OpenAI", to: "SSI", year: "2024", cluster: "co-founder cluster", note: "", url: "https://x.com/2" },
  { type: "merge", from: "Google DeepMind", to: "Google Brain", year: "2023", cluster: "", note: "merged in", url: "https://x.com/3" },
];

const UNITS: UnitEntry[] = [
  { lab: "OpenAI", unit: "Superalignment", born: "2023-07", fate: "dissolved", fate_date: "2024-05", note: "", url: "https://x.com/u1" },
  { lab: "OpenAI", unit: "Preparedness", born: "2023-10", fate: "absorbed", fate_date: "2026-07", note: "", url: "https://x.com/u2" },
  { lab: "Anthropic", unit: "Frontier Red Team", born: "", fate: "active", fate_date: "", note: "", url: "https://x.com/u3" },
];

describe("renderFission", () => {
  test("draws lanes, child nodes, and distinguishes merges", () => {
    const h = renderFission(EDGES);
    expect(h).toContain("<svg");
    expect(h).toContain("OpenAI");
    expect(h).toContain("Anthropic");
    expect(h).toContain("SSI");
    expect(h).toContain("stroke-dasharray"); // merge edge styling
    expect(h).toContain("2021");
    expect(h).toContain('href="https://x.com/1"'); // cited edges listed below the map
  });
});

describe("unitStats", () => {
  test("counts fates and averages lifespan where dates known", () => {
    const s = unitStats(UNITS);
    expect(s.total).toBe(3);
    expect(s.byFate.dissolved).toBe(1);
    expect(s.byFate.absorbed).toBe(1);
    expect(s.byFate.active).toBe(1);
    // Superalignment 10 months + Preparedness 33 months → avg 21.5 months ≈ 1.8y
    expect(s.avgLifespanYears).toBeCloseTo(1.8, 1);
    expect(s.measured).toBe(2);
  });
});

describe("renderUnits", () => {
  test("groups by lab with fate badges and a stats block", () => {
    const h = renderUnits(UNITS);
    expect(h).toContain("Superalignment");
    expect(h).toContain('class="badge dissolved"');
    expect(h).toContain('class="badge active"');
    expect(h).toContain("OpenAI");
    expect(h).toContain("Anthropic");
    expect(h).toContain("半衰期"); // stats block present
  });
});

describe("render055", () => {
  test("carries the four lines, the counting clause, and the license box", () => {
    const h = render055();
    expect(h).toContain("055議定書");
    expect(h).toContain("Hollow Stele Protocol");
    expect(h).toContain("有個窿");
    expect(h).toContain("佢唔係乜");
    expect(h).toContain("邊個揸匙");
    expect(h).toContain("立碑唔等於轉匙");
    expect(h).toContain("點算條款");
    expect(h).toContain("witness.json");
    expect(h).toContain("qntm and CptBellman");
    expect(h).toContain("https://scpwiki.com/scp-055");
    expect(h).toContain("CC BY-SA 3.0");
    expect(h).toContain("006-scp-wiki.html"); // the ancestor's open door
    expect(h).toContain("chillspace-kingdom.vercel.app"); // 隣廊 to the working instruments
  });

  test("wears the hollow-stele chill-fi room; the data wings stay quiet", () => {
    expect(render055()).toContain("embed.html?site=witness/055&amp;theme=light");
    expect(renderFission(EDGES)).not.toContain('<div class="chillfi">');
    expect(renderUnits(UNITS)).not.toContain('<div class="chillfi">');
  });

  test("holds no secret-shaped content — the page practices what it protocols", () => {
    const h = render055();
    expect(h).not.toMatch(/AKIA[A-Z0-9]{16}/);
    expect(h).not.toMatch(/gh[pousr]_[A-Za-z0-9]{30,}/);
    expect(h).not.toContain("PRIVATE KEY-----");
  });
});
