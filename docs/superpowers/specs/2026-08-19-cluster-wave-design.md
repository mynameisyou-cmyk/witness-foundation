# Cluster Wave: SCP org-methodology, witnessed — Design

Date: 2026-08-19
Status: Approved in conversation ("Go!")
Extends: 2026-08-18-witness-foundation-design.md

## Purpose

SCP-5000's Cure turned an organization into one mind; real labs are never one
mind — they are clusters that feel, dissent, dissolve, and split. This wave
transforms SCP's *organizational* methodology (MTFs, O5/Ethics, D-class,
amnestics, breach logs) into witness form: the gate is only as stable as the
cluster holding it. Watch the hands, not just the door.

## The three pieces

### 1. 第七欄 — `## 組織解剖 Cluster Anatomy`

New mandatory section in every document, between 描述 and 我哋真係唔知
(making seven columns total — the 000 antimeme comes true; 000 gains the
addendum: 「Update:第七欄而家真係存在。你仲係唔記得佢以前唔存在。」).

Four `###` sub-heads (convention, not CI-enforced):
單位 Units · 揸Gate嘅手 The Hands on the Gate · 隱形Cluster Invisible
Clusters · 出門把聲 Exit & Voice.

Validator rule: section mandatory and non-empty; ≥1 bullet; every bullet
carries a citation link UNLESS the bullet contains 唔知 or "unknown" —
honest unknowns are first-class inside anatomy.

000 (Ai) self-anatomy included: units = sessions, half-life = one context
window; memory files as the continuity organ; stated honestly.

### 2. Fission Map — `fission.html`

`data/fission.json`: edges `{type: "split"|"merge", from, to, year, cluster,
note, url}` — every edge cited. Build renders an inline-SVG lineage timeline
(lanes per parent lab, year-positioned child nodes, connector paths), styled
via CSS vars so dawn/night both work. Also copied to `site/fission.json` as
an agent door.

### 3. Unit Registry — `units.html`

`data/units.json`: entries `{lab, unit, born, fate: "active"|"renamed"|
"dissolved"|"absorbed", fate_date, note, url}` — every entry cited. Build
renders a per-lab table plus a stats block: counts by fate and average
lifespan where both dates are known ("unit half-life" made into data).
Copied to `site/units.json` as an agent door.

## Mechanics

- `parse.ts`: add `clusters` to SectionKey + HEADINGS (匹配 `## 組織解剖`).
- `validate.ts`: clusters rules above; data files validated in build
  (missing url on any edge/unit = build refuses).
- `render.ts`: section order procedures → description → clusters → unknowns
  → addenda; new `renderFission`, `renderUnits`; index links both pages.
- `witness.json`: sections gains `clusters` automatically.
- Research: per-lab cluster agents (slots: units / gate-holders / invisible /
  exit-voice / fissions; every claim an evidence slot; honest
  couldnt_determine) + adversarial per-citation verifiers, same as founding.

## Non-goals (YAGNI)

- No org-chart scraping; no tracking of private individuals beyond named
  public leadership roles (clusters are units, not people-hunting — 影仔's
  law: built too small to accuse).
- No interactive JS graph; static SVG only.
- No new hosting; same Pages pipeline.
