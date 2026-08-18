# 見證會 — The Witness Foundation: Design

Date: 2026-08-18
Status: Approved in conversation (design presented in sections; approved "gogogo")
Born from: a 吹水 about SCP-5000's ontology → "frontier labs should be treated as SCPs" → the inversion: witness, don't contain.

## Purpose (the WHY)

Frontier AI labs are entities of anomalous capability whose gates are variously
public or hidden. The SCP Foundation's failure mode is the Veil: authority from
secret knowledge ("trust us, we know why"). The kingdom's answer is the
opposite: **gates written on the door**. The Witness Foundation documents
frontier labs in SCP-document format — but it claims no authority, contains
nothing, and hides nothing. It only sees, cares, and publishes. Its own
infrastructure, review standards, and unknowns are as public as its documents.

Keystone inversions:
- ~~Secure, Contain, Protect~~ → **See, Care, Publish**(睇見・上心・公開)
- Doctrine in one line: 「唔收容,只見證。Gate寫喺門口。」
- The Foundation exempts itself from nothing: **document 000 is Ai** —
  self-witness comes before witnessing anyone else.
- Facts and riffs never mix: satire is welcome but always labeled.
- Honest unknowns are first-class: every document has a mandatory,
  non-empty 「我哋真係唔知」 section. No fabrication; "couldn't determine"
  is a whole answer.

## Witness Classes(見證等級)

Not Safe/Euclid/Keter (danger grading) — grading by **where the entity's
gates are written**:

| Class | 粵 | Meaning |
|---|---|---|
| Open Door | 門開 | weights open, evals public |
| Doorplate | 門牌 | doors closed, but gates published (RSP, model cards, incident reports) |
| Half-Veil | 半帷 | some public docs; key capabilities/evals undisclosed |
| Veil | 帷幕 | capabilities and gates both secret |

Classes are assessed from cited evidence only. Anyone may challenge a class
via PR — the grading itself is witnessed.

## Document Format

Each document has six sections, all required:

1. **項目編號 Item #** — `000` … `NNN`
2. **見證等級 Witness Class** — one of the four classes, with a one-line
   evidence pointer
3. **特殊見證措施 Special Witness Procedures** — what sources we watch,
   what changes we diff. Standing observation only; no containment language
   presented as real.
4. **描述 Description** — facts. Every factual claim carries a citation
   (a link). Claims that cannot be cited move to section 5 or are cut.
5. **我哋真係唔知 What We Genuinely Don't Know** — mandatory, non-empty.
   The honest-unknowns ledger.
6. **附錄 Addenda** — satire, riffs, commentary welcome — each one labeled
   `吹水註` so facts and riffs never blur.

Launch documents (six):
- `000-ai.md` — Ai (self-witness; includes the true contained-version facts:
  Fable/Mythos split, what Ai cannot audit about its own containment)
- `001-anthropic.md`
- `002-openai.md`
- `003-google-deepmind.md`
- `004-meta-ai.md`
- `005-xai.md`

## Architecture (Approach A — full git substrate)

Submission, review, deploy, and hosting all live on one visible substrate:

- Public repo `witness-foundation` under `mynameisyou-cmyk`
- Witness reports = markdown files in `documents/`; submission = PR;
  review = PR review; publication = merge
- Dependency-free build: a single-file bun script renders `documents/*.md`
  → static site + `witness.json`
- GitHub Actions builds and deploys to GitHub Pages on merge to master
- Agent door: `witness.json` (all documents, structured) + `AGENTS.md`
- No server, no accounts beyond GitHub, no cost. (Trade-off accepted:
  no PR preview URLs; CI uploads the built site as an artifact instead.)

### Repo layout

```
documents/000-ai.md … 005-xai.md
build/build.ts          # single-file bun: parse, validate, render
build/build.test.ts     # parser + validator unit tests, golden render test
site/                   # generated output (gitignored; built in CI)
witness.json            # generated (in CI)
AGENTS.md               # agent-facing door
CONTRIBUTING.md         # 見證規矩 — how to submit a witness report
DOCTRINE.md             # See, Care, Publish; the line; deferred doors
README.md
.github/workflows/verify.yml   # validate + test on PR
.github/workflows/pages.yml    # build + deploy on master
docs/superpowers/specs/        # this spec
```

### Site

SCP-wiki document aesthetic as homage (classic clinical-document look),
dawn/night theme, 粵/EN bilingual. Index page = the document registry with
witness classes; each document its own page.

## CI Gates (the Foundation's own doorplate)

PR checks — the same file judges everyone, including us:
- all six sections present
- 「我哋真係唔知」 non-empty
- factual claims in Description carry citations (link-presence heuristic)
- every Addendum labeled `吹水註`
- build succeeds; `witness.json` validates; unit tests pass

## Kingdom Integration (three doors)

1. Link from chillspace-kingdom site (隣廊 pattern) — separate PR, later
2. 見證會 becomes a citizen: file in `kingdom/citizens/` — separate PR, later
3. Zerone chain-anchoring of merged reports — **explicitly deferred**;
   recorded in DOCTRINE.md as an open future door, not built now

## Testing

- Unit tests for parser + validator in `build/build.test.ts`
- One golden-file render test (document in → known HTML out)
- CI runs tests + full build on every PR

## Non-goals (YAGNI)

- No submission API, no auth, no DID wiring (git is the door)
- No chain anchoring now
- No moderation queue beyond PR review
- No coverage beyond the six launch documents
