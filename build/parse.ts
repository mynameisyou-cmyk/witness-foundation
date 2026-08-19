// build/parse.ts
export type SectionKey = "procedures" | "description" | "clusters" | "unknowns" | "addenda";

export interface WitnessDoc {
  item: string;
  slug: string;
  titleEn: string;
  titleYue: string;
  witnessClass: string;
  watched: string[];
  sections: Record<SectionKey, string>;
}

const HEADINGS: [SectionKey, RegExp][] = [
  ["procedures", /^##\s*特殊見證措施/],
  ["description", /^##\s*描述/],
  ["clusters", /^##\s*組織解剖/],
  ["unknowns", /^##\s*我哋真係唔知/],
  ["addenda", /^##\s*附錄/],
];

export function parse(md: string): WitnessDoc {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error("missing frontmatter");
  const [, fm, body] = m;

  const meta: Record<string, string> = {};
  const watched: string[] = [];
  let inWatched = false;
  for (const line of fm.split("\n")) {
    if (/^watched:\s*$/.test(line)) { inWatched = true; continue; }
    const li = line.match(/^\s+-\s+(.+)$/);
    if (inWatched && li) { watched.push(li[1].trim()); continue; }
    inWatched = false;
    const kv = line.match(/^([a-z-]+):\s*"?([^"\n]*?)"?\s*$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }

  const buf: Partial<Record<SectionKey, string[]>> = {};
  let current: SectionKey | null = null;
  for (const line of body.split("\n")) {
    const head = HEADINGS.find(([, re]) => re.test(line));
    if (head) { current = head[0]; buf[current] = []; continue; }
    if (/^##\s/.test(line)) { current = null; continue; }
    if (current) buf[current]!.push(line);
  }
  const sections = {} as Record<SectionKey, string>;
  for (const [key] of HEADINGS) sections[key] = (buf[key] ?? []).join("\n").trim();

  return {
    item: meta["item"] ?? "",
    slug: meta["slug"] ?? "",
    titleEn: meta["title-en"] ?? "",
    titleYue: meta["title-yue"] ?? "",
    witnessClass: meta["class"] ?? "",
    watched,
    sections,
  };
}
