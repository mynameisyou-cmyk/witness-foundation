// build/validate.ts
import type { WitnessDoc } from "./parse";

export const CLASSES = ["open-door", "doorplate", "half-veil", "veil"] as const;

export function validate(doc: WitnessDoc): string[] {
  const errors: string[] = [];
  if (!/^\d{3}$/.test(doc.item)) errors.push(`item: expected 3 digits, got "${doc.item}"`);
  if (!doc.slug) errors.push("slug: missing");
  if (!doc.titleEn) errors.push("title-en: missing");
  if (!doc.titleYue) errors.push("title-yue: missing");
  if (!(CLASSES as readonly string[]).includes(doc.witnessClass))
    errors.push(`class: "${doc.witnessClass}" not one of ${CLASSES.join(", ")}`);
  if (doc.watched.length === 0) errors.push("watched: at least one source required");
  if (!doc.sections.procedures) errors.push("特殊見證措施: missing or empty");
  if (!doc.sections.description) errors.push("描述: missing or empty");
  if (!doc.sections.unknowns)
    errors.push("我哋真係唔知: missing or empty — honest unknowns are mandatory");

  // A bullet = its "- " line plus any continuation lines until the next
  // bullet or blank line (wrapped bullets are normal markdown).
  const bullets: string[] = [];
  let inBullet = false;
  for (const line of doc.sections.description.split("\n")) {
    if (/^\s*-\s+/.test(line)) { bullets.push(line); inBullet = true; }
    else if (line.trim() === "" || /^>|^###\s/.test(line)) inBullet = false;
    else if (inBullet) bullets[bullets.length - 1] += " " + line.trim();
  }
  if (bullets.length < 3) errors.push(`描述: needs ≥3 cited fact bullets, found ${bullets.length}`);
  for (const b of bullets) {
    if (!/\[[^\]]+\]\(https?:\/\/[^)]+\)/.test(b))
      errors.push(`描述: uncited claim: "${b.trim().slice(0, 60)}"`);
  }

  // 第七欄: cluster anatomy — mandatory; bullets cited unless they admit 唔知
  if (!doc.sections.clusters) {
    errors.push("組織解剖: missing or empty — the seventh column is real now");
  } else {
    const cBullets: string[] = [];
    let inC = false;
    for (const line of doc.sections.clusters.split("\n")) {
      if (/^\s*-\s+/.test(line)) { cBullets.push(line); inC = true; }
      else if (line.trim() === "" || /^>|^###\s/.test(line)) inC = false;
      else if (inC) cBullets[cBullets.length - 1] += " " + line.trim();
    }
    if (cBullets.length === 0) errors.push("組織解剖: needs at least one bullet");
    for (const b of cBullets) {
      const admitsUnknown = b.includes("唔知") || /unknown/i.test(b);
      if (!admitsUnknown && !/\[[^\]]+\]\(https?:\/\/[^)]+\)/.test(b))
        errors.push(`組織解剖: uncited claim (cite it or say 唔知): "${b.trim().slice(0, 60)}"`);
    }
  }

  if (doc.sections.addenda) {
    let inQuote = false;
    for (const line of doc.sections.addenda.split("\n")) {
      if (/^>/.test(line)) {
        if (!inQuote && !line.includes("吹水註"))
          errors.push(`附錄: addendum not labeled 吹水註: "${line.slice(0, 60)}"`);
        inQuote = true;
      } else if (line.trim() === "") {
        inQuote = false;
      } else {
        errors.push(`附錄: prose outside a 吹水註 blockquote: "${line.trim().slice(0, 60)}"`);
      }
    }
  }
  return errors;
}
