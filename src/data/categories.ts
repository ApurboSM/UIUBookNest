import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "textbooks",
    name: "Textbooks",
    tagline: "Curated for every UIU course",
    description:
      "Recommended textbooks across CSE, EEE, BBA, Pharmacy and more — sourced new and used at student-friendly prices.",
    icon: "book",
  },
  {
    slug: "stationery",
    name: "Stationery",
    tagline: "Everyday campus essentials",
    description:
      "A4 notebooks, premium pens, geometry boxes, and highlighter packs to keep your study desk stocked.",
    icon: "pencil",
  },
  {
    slug: "exam-supplies",
    name: "Exam Supplies",
    tagline: "Ready for trimester-end",
    description:
      "OMR sheets, exam pads, calculator pouches, and approved scientific calculators for finals week.",
    icon: "clipboard",
  },
  {
    slug: "uiu-merchandise",
    name: "UIU Merchandise",
    tagline: "Wear the campus pride",
    description:
      "Official-style UIU hoodies, mugs, tote bags, and lanyards — designed for students, by students.",
    icon: "shirt",
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c])
) as Record<Category["slug"], Category>;
