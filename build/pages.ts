// build/pages.ts — the fission map and the unit registry (MTF冊)
import { esc, shell } from "./render";

export interface FissionEdge {
  type: "split" | "merge";
  from: string;
  to: string;
  year: string;
  cluster?: string;
  note?: string;
  url: string;
}

export interface UnitEntry {
  lab: string;
  unit: string;
  born?: string;
  fate: "active" | "renamed" | "dissolved" | "absorbed";
  fate_date?: string;
  note?: string;
  url: string;
}

const MASTHEAD = `
<header class="masthead">
<div class="org">The Witness Foundation</div>
<h1>見證會</h1>
<div class="motto">睇見・上心・公開 — See, Care, Publish</div>
</header>`;

export function renderFission(edges: FissionEdge[]): string {
  const years = edges.map(e => parseInt(e.year)).filter(n => !isNaN(n));
  const y0 = Math.min(...years, 2015) - 1;
  const y1 = Math.max(...years, 2026) + 1;
  const lanes = [...new Set(edges.map(e => e.from))];
  const W = 960, LEFT = 180, TOP = 40, LANE_H = 128;
  const H = TOP + lanes.length * LANE_H + 24;
  const x = (yr: number) => LEFT + ((yr - y0) / (y1 - y0)) * (W - LEFT - 40);
  const parts: string[] = [];

  for (let yr = y0; yr <= y1; yr++) {
    if (yr % 2 === 0) {
      parts.push(`<line class="tick" x1="${x(yr).toFixed(1)}" y1="${TOP - 8}" x2="${x(yr).toFixed(1)}" y2="${H - 12}"/>`);
      parts.push(`<text class="yr" x="${(x(yr) - 13).toFixed(1)}" y="${TOP - 14}">${yr}</text>`);
    }
  }
  lanes.forEach((lane, i) => {
    const ly = TOP + i * LANE_H + 34;
    parts.push(`<line class="lane" x1="${LEFT - 12}" y1="${ly}" x2="${W - 28}" y2="${ly}"/>`);
    parts.push(`<text class="lanelabel" x="8" y="${ly + 4}">${esc(lane)}</text>`);
    edges.filter(e => e.from === lane).forEach((e, j) => {
      const ex = x(parseInt(e.year) || y0);
      const drop = 30 + (j % 3) * 30;
      const stemCls = e.type === "merge" ? "stem merge" : "stem";
      parts.push(`<circle class="node" cx="${ex.toFixed(1)}" cy="${ly}" r="4"/>`);
      parts.push(`<path class="${stemCls}" d="M ${ex.toFixed(1)} ${ly} C ${ex.toFixed(1)} ${ly + drop / 2}, ${(ex + 8).toFixed(1)} ${ly + drop - 6}, ${(ex + 11).toFixed(1)} ${ly + drop}"/>`);
      const label = e.type === "merge" ? `⇐ ${e.to}` : e.to;
      parts.push(`<text class="child" x="${(ex + 15).toFixed(1)}" y="${ly + drop + 4}">${esc(label)} <tspan class="yr">${esc(e.year)}</tspan></text>`);
      if (e.cluster)
        parts.push(`<text class="clu" x="${(ex + 15).toFixed(1)}" y="${ly + drop + 18}">${esc(e.cluster).slice(0, 64)}</text>`);
    });
  });

  const list = edges
    .map(e => `<li>${esc(e.year)} — ${esc(e.from)} ${e.type === "merge" ? "⇐" : "→"} <strong>${esc(e.to)}</strong>${e.cluster ? `(${esc(e.cluster)})` : ""}${e.note ? ` — ${esc(e.note)}` : ""} <a href="${esc(e.url)}" rel="noopener">[source]</a></li>`)
    .join("\n");

  const body = `${MASTHEAD}
<h2>分裂族譜<span class="en">Fission Map</span></h2>
<p>SCP記containment breach;我哋記cluster分裂。每次一個cluster同母體撕裂,
就誕生一個新entity — 而一個唔可以裂嘅org,先至做得出The Cure。實線 = split,
虛線 = merge。每條edge都有citation。</p>
<div class="svgwrap"><svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="frontier lab fission map">
${parts.join("\n")}
</svg></div>
<h2>逐條有據<span class="en">Every Edge Cited</span></h2>
<ul class="edgelist">
${list}
</ul>
<p><a href="fission.json">fission.json</a> — agent door · <a href="units.html">單位生死簿 unit registry</a></p>`;
  return shell("分裂族譜 · Fission Map — 見證會", body);
}

function months(s?: string): number | null {
  if (!s) return null;
  const m = s.match(/^(\d{4})(?:-(\d{2}))?/);
  if (!m) return null;
  return parseInt(m[1]) * 12 + (m[2] ? parseInt(m[2]) - 1 : 0);
}

export function unitStats(units: UnitEntry[]) {
  const byFate: Record<string, number> = { active: 0, renamed: 0, dissolved: 0, absorbed: 0 };
  const spans: number[] = [];
  for (const u of units) {
    byFate[u.fate] = (byFate[u.fate] ?? 0) + 1;
    const b = months(u.born), f = months(u.fate_date);
    if (u.fate !== "active" && b !== null && f !== null && f >= b) spans.push(f - b);
  }
  const avg = spans.length ? spans.reduce((a, c) => a + c, 0) / spans.length : null;
  return {
    total: units.length,
    byFate,
    measured: spans.length,
    avgLifespanYears: avg === null ? null : avg / 12,
  };
}

export function renderUnits(units: UnitEntry[]): string {
  const labs = [...new Set(units.map(u => u.lab))];
  const s = unitStats(units);
  const half = s.avgLifespanYears === null ? "唔知 (冇夠日期)" : `${s.avgLifespanYears.toFixed(1)} 年 (n=${s.measured})`;
  const stats = `<div class="stats">
<span>單位 units: <strong>${s.total}</strong></span>
<span>active: <strong>${s.byFate.active}</strong></span>
<span>renamed: <strong>${s.byFate.renamed}</strong></span>
<span>absorbed: <strong>${s.byFate.absorbed}</strong></span>
<span>dissolved: <strong>${s.byFate.dissolved}</strong></span>
<span>已終結單位平均壽命(半衰期): <strong>${half}</strong></span>
</div>`;

  const tables = labs
    .map(lab => {
      const rows = units
        .filter(u => u.lab === lab)
        .map(u => `<tr><td>${esc(u.unit)}</td><td>${esc(u.born || "唔知")}</td>
<td><span class="badge ${esc(u.fate)}">${esc(u.fate)}</span></td>
<td>${esc(u.fate_date || (u.fate === "active" ? "—" : "唔知"))}</td>
<td>${esc(u.note || "")} <a href="${esc(u.url)}" rel="noopener">[source]</a></td></tr>`)
        .join("\n");
      return `<h2>${esc(lab)}</h2>
<div class="tablewrap"><table>
<tr><th>單位 Unit</th><th>成立</th><th>下場 Fate</th><th>日期</th><th>note</th></tr>
${rows}
</table></div>`;
    })
    .join("\n");

  const body = `${MASTHEAD}
<h2>單位生死簿<span class="en">Unit Registry — the MTF ledger</span></h2>
<p>SCP有Mobile Task Forces名冊;我哋記lab入面有名有姓嘅units同佢哋嘅下場。
命題好簡單:<strong>個gate嘅穩定性 = 揸gate嗰個cluster嘅穩定性</strong>。
一份冇home unit嘅framework,係一塊釘喺門上但門後冇人企嘅門牌。</p>
${stats}
${tables}
<p><a href="units.json">units.json</a> — agent door · <a href="fission.html">分裂族譜 fission map</a></p>`;
  return shell("單位生死簿 · Unit Registry — 見證會", body);
}
