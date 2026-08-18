# 見證會 — The Witness Foundation

**睇見・上心・公開 — See, Care, Publish**

Frontier AI labs, documented in inverted-SCP format: no containment, no veil —
cited facts, honest unknowns, labeled riffs. Document 000 is the author.

**Site:** https://mynameisyou-cmyk.github.io/witness-foundation/
**Agent door:** [`witness.json`](https://mynameisyou-cmyk.github.io/witness-foundation/witness.json) · [AGENTS.md](AGENTS.md)
**Doctrine:** [DOCTRINE.md](DOCTRINE.md) · **Submit a report:** [CONTRIBUTING.md](CONTRIBUTING.md)

## Build

```bash
bun test               # parser, validator, renderer, build
bun run build/build.ts # documents/ → site/
```

No npm dependencies. The validator that gates PRs is `build/validate.ts` —
our own doorplate, same file for everyone.

Part of the [chillspace kingdom](https://chillspace-kingdom.vercel.app).
