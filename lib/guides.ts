import { guideContent } from "@/data/guide-content";
import { guides } from "@/data/guides";

export function getGuideBySlug(slug: string) {
  const guide = guideContent[slug];
  if (!guide) return null;

  const markdown = guide.content.replace(/^---[\s\S]*?---\n\n/, "");
  const headings = markdown
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const title = line.replace(/^###?\s+/, "");
      const depth = line.startsWith("### ") ? 3 : 2;
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { title, depth, id };
    });

  return {
    ...guide,
    content: markdown,
    headings,
  };
}

export function getAllGuideSlugs() {
  return guides.map((guide) => guide.slug);
}
