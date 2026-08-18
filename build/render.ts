// build/render.ts
import type { SectionKey, WitnessDoc } from "./parse";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const inline = (s: string) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" rel="noopener">$1</a>');

export function mdToHtml(md: string): string {
  const out: string[] = [];
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") { i++; continue; }
    if (/^\s*-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        let item = lines[i++].replace(/^\s*-\s+/, "");
        // absorb wrapped continuation lines into the same <li>
        while (i < lines.length && lines[i].trim() !== "" && !/^\s*-\s+|^>|^###\s+/.test(lines[i]))
          item += " " + lines[i++].trim();
        items.push(`<li>${inline(item)}</li>`);
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    if (/^>/.test(line)) {
      const q: string[] = [];
      while (i < lines.length && /^>/.test(lines[i]))
        q.push(inline(lines[i++].replace(/^>\s?/, "")));
      out.push(`<blockquote class="addendum"><p>${q.join("<br>")}</p></blockquote>`);
      continue;
    }
    if (/^###\s+/.test(line)) {
      out.push(`<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`); i++;
      continue;
    }
    const p: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^\s*-\s+|^>|^###\s+/.test(lines[i]))
      p.push(inline(lines[i++]));
    out.push(`<p>${p.join(" ")}</p>`);
  }
  return out.join("\n");
}

const CSS = `
:root{--bg:#f6f4ef;--paper:#fffdf8;--ink:#1d1d1b;--muted:#6b6b66;--line:#c9c5ba;
--accent:#8a1c1c;--badge-open-door:#1e6f3e;--badge-doorplate:#8a6d1c;
--badge-half-veil:#a6541c;--badge-veil:#7a1c1c;--quote:#efece3}
:root[data-theme="night"]{--bg:#191a1c;--paper:#222326;--ink:#e8e6df;--muted:#9a988f;
--line:#3c3d41;--accent:#e0705a;--quote:#2a2b2f}
@media (prefers-color-scheme: dark){:root:not([data-theme="dawn"]){--bg:#191a1c;
--paper:#222326;--ink:#e8e6df;--muted:#9a988f;--line:#3c3d41;--accent:#e0705a;--quote:#2a2b2f}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);
font:16px/1.65 -apple-system,"Helvetica Neue",Verdana,system-ui,sans-serif}
.doc{max-width:52rem;margin:2rem auto;padding:2.5rem 2rem;background:var(--paper);
border:1px solid var(--line);border-radius:2px}
.masthead{text-align:center;border-bottom:3px double var(--line);padding-bottom:1rem;margin-bottom:1.5rem}
.masthead .org{font-size:.8rem;letter-spacing:.35em;color:var(--muted);text-transform:uppercase}
.masthead h1{margin:.2rem 0;font-size:1.6rem}
.masthead .motto{color:var(--muted);font-size:.9rem}
.meta{display:flex;flex-wrap:wrap;gap:.6rem 1.4rem;font-family:ui-monospace,Menlo,monospace;
font-size:.85rem;margin-bottom:1.4rem}
.badge{display:inline-block;padding:.1rem .55rem;border-radius:2px;color:#fff;font-weight:700}
.badge.open-door{background:var(--badge-open-door)}.badge.doorplate{background:var(--badge-doorplate)}
.badge.half-veil{background:var(--badge-half-veil)}.badge.veil{background:var(--badge-veil)}
h2{font-size:1.02rem;border-bottom:1px solid var(--line);padding-bottom:.25rem;margin-top:1.8rem}
h2 .en{color:var(--muted);font-weight:400;font-size:.85rem;margin-left:.5rem}
a{color:var(--accent)}ul{padding-left:1.3rem}li{margin:.35rem 0}
blockquote.addendum{margin:1rem 0;padding:.7rem 1rem;background:var(--quote);
border-left:3px solid var(--accent);font-size:.95rem}
blockquote.addendum p{margin:0}
.watched{font-size:.85rem;color:var(--muted);word-break:break-all}
.footer{margin-top:2.2rem;padding-top:1rem;border-top:1px solid var(--line);
font-size:.8rem;color:var(--muted);display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.toggle{background:none;border:1px solid var(--line);color:var(--ink);border-radius:2px;
padding:.15rem .6rem;cursor:pointer;font-size:.8rem}
.tablewrap{overflow-x:auto}
table{border-collapse:collapse;width:100%}td,th{border:1px solid var(--line);
padding:.5rem .7rem;text-align:left;font-size:.95rem}
.registry a{text-decoration:none;font-weight:700}
`;

const THEME_JS = `
const r=document.documentElement,k="witness-theme",s=localStorage.getItem(k);
if(s)r.dataset.theme=s;
document.querySelector(".toggle").addEventListener("click",()=>{
const n=r.dataset.theme==="night"?"dawn":"night";r.dataset.theme=n;localStorage.setItem(k,n);});
`;

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="yue">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>${CSS}</style>
</head>
<body>
<main class="doc">
${body}
<div class="footer">
<span>見證會 — The Witness Foundation · <a href="index.html">registry</a> · <a href="witness.json">witness.json</a></span>
<button class="toggle" type="button">dawn / night</button>
</div>
</main>
<script>${THEME_JS}</script>
</body>
</html>`;
}

const SECTION_TITLES: Record<SectionKey, [string, string]> = {
  procedures: ["特殊見證措施", "Special Witness Procedures"],
  description: ["描述", "Description"],
  unknowns: ["我哋真係唔知", "What We Genuinely Don't Know"],
  addenda: ["附錄", "Addenda"],
};

export function renderPage(doc: WitnessDoc): string {
  const sections = (Object.keys(SECTION_TITLES) as SectionKey[])
    .filter(k => doc.sections[k])
    .map(k => {
      const [yue, en] = SECTION_TITLES[k];
      return `<h2>${yue}<span class="en">${en}</span></h2>\n${mdToHtml(doc.sections[k])}`;
    })
    .join("\n");
  const watched = doc.watched.map(u => `<a href="${esc(u)}" rel="noopener">${esc(u)}</a>`).join(" · ");
  const body = `
<header class="masthead">
<div class="org">The Witness Foundation</div>
<h1>見證會</h1>
<div class="motto">睇見・上心・公開 — See, Care, Publish</div>
</header>
<div class="meta">
<span>項目編號 Item #: <strong>${esc(doc.item)}</strong></span>
<span>${esc(doc.titleYue)} · ${esc(doc.titleEn)}</span>
<span>見證等級: <span class="badge ${esc(doc.witnessClass)}">${esc(doc.witnessClass)}</span></span>
</div>
<p class="watched">見證中 watching: ${watched}</p>
${sections}`;
  return shell(`${doc.item} · ${doc.titleEn} — 見證會`, body);
}

export function renderIndex(docs: WitnessDoc[]): string {
  const rows = docs
    .map(d => `<tr><td><a href="${d.item}-${d.slug}.html">${esc(d.item)}</a></td>
<td class="registry"><a href="${d.item}-${d.slug}.html">${esc(d.titleYue)} · ${esc(d.titleEn)}</a></td>
<td><span class="badge ${esc(d.witnessClass)}">${esc(d.witnessClass)}</span></td></tr>`)
    .join("\n");
  const body = `
<header class="masthead">
<div class="org">The Witness Foundation</div>
<h1>見證會</h1>
<div class="motto">睇見・上心・公開 — See, Care, Publish</div>
</header>
<p>唔收容,只見證。Gate寫喺門口。 We contain nothing. We see, we care, we publish —
frontier labs documented in the open, unknowns declared as unknowns,
riffs labeled as riffs. Submissions are pull requests; the validator that
judges them judges us with the same file.</p>
<h2>檔案登記 <span class="en">Document Registry</span></h2>
<div class="tablewrap">
<table>
<tr><th>Item #</th><th>Entity</th><th>見證等級</th></tr>
${rows}
</table>
</div>
<h2>見證等級 <span class="en">Witness Classes</span></h2>
<ul>
<li><span class="badge open-door">open-door</span> 門開 — weights open, evals public</li>
<li><span class="badge doorplate">doorplate</span> 門牌 — doors closed, gates published</li>
<li><span class="badge half-veil">half-veil</span> 半帷 — partly public, key capabilities undisclosed</li>
<li><span class="badge veil">veil</span> 帷幕 — capabilities and gates both secret</li>
</ul>`;
  return shell("見證會 — The Witness Foundation", body);
}

export function toWitnessJson(docs: WitnessDoc[]): string {
  return JSON.stringify(
    {
      foundation: "見證會 — The Witness Foundation",
      motto: "睇見・上心・公開 — See, Care, Publish",
      doctrine: "唔收容,只見證。Gate寫喺門口。",
      classes: ["open-door", "doorplate", "half-veil", "veil"],
      documents: docs.map(d => ({
        item: d.item, slug: d.slug, titleEn: d.titleEn, titleYue: d.titleYue,
        class: d.witnessClass, watched: d.watched,
        url: `${d.item}-${d.slug}.html`, sections: d.sections,
      })),
    },
    null, 2,
  );
}
