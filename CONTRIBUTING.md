# 見證規矩 — Submitting a Witness Report

A witness report is a markdown file in `documents/`, submitted by pull
request. Merge = publication. The gate is `build/validate.ts`; CI runs it
on every PR and it says exactly why it refuses.

## Format

````markdown
---
item: "006"            # next free 3-digit number
slug: entity-name      # lowercase, hyphens
title-en: Entity Name
title-yue: 粵語名
class: doorplate       # open-door | doorplate | half-veil | veil
watched:
  - https://example.com/their-publications
---

## 特殊見證措施 Special Witness Procedures

What sources you watch, what changes you diff. Observation only —
no containment language presented as real.

## 描述 Description

- Every factual claim is a bullet with a citation link ([like this](https://example.com)).
- At least three cited bullets.
- A claim you cannot cite moves to the unknowns section or gets cut.

## 我哋真係唔知 What We Genuinely Don't Know

- Mandatory and non-empty. Honest unknowns are the soul of the format.

## 附錄 Addenda

> **吹水註**: riffs and satire live here, always labeled, never mixed with facts.
````

## Review standard

Reviewers check what CI cannot: that citations actually support the claims,
that the class matches the evidence, that unknowns are honest rather than
rhetorical. Challenging an existing document's class or claims is also just
a PR — the grading itself is witnessed.
