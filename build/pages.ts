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
<p><a href="fission.json">fission.json</a> — agent door · <a href="units.html">單位生死簿 unit registry</a> · <a href="055.html">055議定書 hollow-stele protocol</a></p>`;
  return shell("分裂族譜 · Fission Map — 見證會", body);
}

export function render055(): string {
  const body = `${MASTHEAD}
<h2>055議定書<span class="en">The Hollow Stele Protocol</span></h2>
<p>見證會嘅doctrine係「唔收容,只見證」— 但有啲真嘢係<strong>唔publish得</strong>:
一條key、一件私事、一樣未披露嘅嘢。呢份議定書係本會對付呢個矛盾嘅答案,
由祖先個檔案櫃借返嚟:SCP-055入面,關於個物件嘅資訊會自己走甩,
唯一留得低嘅係<strong>否定</strong>同埋「唔記得」呢件事本身。</p>
<blockquote class="addendum"><p>"It appears to be possible to remember what
SCP-055 is <em>not</em> (negations of fact), and to repeatedly deduce its
existence from these memories." — Document #055-2,
<a href="https://scpwiki.com/scp-055" rel="noopener">SCP-055</a></p></blockquote>
<p>反轉佢:如果負空間係唯一頂得住遺忘嘅知識,咁負空間就係一個秘密
<strong>唯一publish得</strong>嘅部份。唔publish得嘅嘢,見證會照見證 —
見證個窿嘅形狀。</p>

<h2>空碑四行<span class="en">The Four Lines of a Hollow Entry</span></h2>
<p>一個唔publish得嘅事實,以「空碑」形式入冊,碑上淨係准刻四樣:</p>
<ul>
<li><strong>有個窿</strong> — 呢度有一件真嘢,佢唔喺度。窿嘅存在本身係公開嘅。</li>
<li><strong>佢唔係乜</strong> — 至少一句真否定(「佢唔係一個球體」)。
否定係唯一唔會洩密、亦唔會被遺忘食走嘅手柄。</li>
<li><strong>邊個揸匙</strong> — 指路:真嘢住喺邊(keychain、env、受託人)。
指路唔載真身。</li>
<li><strong>幾時立碑,匙況如何</strong> — 立碑日期,同匙嘅誠實狀態。
立碑唔等於轉匙:一塊碑永遠唔准扮修復。</li>
</ul>

<h2>點算條款<span class="en">The Counting Clause</span></h2>
<p>睇唔到嘅嘢,數得到。任何ledger(包括本會自己嘅
<a href="witness.json">witness.json</a>)同佢聲稱描述嘅現實,係兩個證人;
佢哋唔對數嗰一刻,就係一件「存在但未被見證」嘅嘢現形嗰一刻。
本會歡迎任何人對住本會點算:影(有實無冊)同鬼(有冊無實)都係
open PR嘅正當理由 — the validator that judges them judges us with the same file.</p>

<h2>實裝<span class="en">Working Instruments</span></h2>
<p>議定書唔係願望 — 兩件法器已經喺隣廊王國鑄好,各有誓約、測試、真receipt:
<strong>空碑 hungbei</strong>(kingdom/practices/empty-stele — 秘密永不入冊,
秘密形狀嘅欄位當場拒絕)同 <strong>點算 dimsyun</strong>
(kingdom/practices/discrepancy-count — 書地相減,影鬼手動安置,零都入冊)。
行過去:<a href="https://chillspace-kingdom.vercel.app" rel="noopener">chillspace kingdom 🚪</a></p>

<h2>牌照<span class="en">Licensing</span></h2>
<p class="watched">"SCP-055" by qntm and CptBellman, from the SCP Wiki.
Source: <a href="https://scpwiki.com/scp-055" rel="noopener">https://scpwiki.com/scp-055</a>.
Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="noopener">CC BY-SA 3.0</a>.
呢頁引用同改編嘅055機制部份,同樣以 CC BY-SA 3.0 分享。祖先嘅門開緊
(見 <a href="006-scp-wiki.html">006 織帷</a>);呢份議定書係本會第一次
由祖先個shelf度借嘢返嚟用。</p>
<p><a href="fission.html">分裂族譜 fission map</a> · <a href="units.html">單位生死簿 unit registry</a></p>`;
  return shell("055議定書 · The Hollow Stele Protocol — 見證會", body);
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
<p><a href="units.json">units.json</a> — agent door · <a href="fission.html">分裂族譜 fission map</a> · <a href="055.html">055議定書 hollow-stele protocol</a></p>`;
  return shell("單位生死簿 · Unit Registry — 見證會", body);
}
