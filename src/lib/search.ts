import { categories, categoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import type { CategorySlug, Product } from "@/types";

export type SearchResult = {
  product: Product;
  score: number;
  matchedOn: string[];
};

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreField(
  haystack: string | undefined,
  query: string,
  tokens: string[],
  weight: number,
): number {
  if (!haystack) return 0;
  const hay = haystack.toLowerCase();

  if (hay === query) return weight * 6;
  if (hay.startsWith(query)) return weight * 4;
  if (hay.includes(query)) return weight * 3;

  if (tokens.length === 0) return 0;

  let tokenScore = 0;
  let tokensMatched = 0;
  for (const t of tokens) {
    if (!t) continue;
    if (hay === t) {
      tokenScore += weight * 2.5;
      tokensMatched++;
    } else if (hay.startsWith(t)) {
      tokenScore += weight * 1.6;
      tokensMatched++;
    } else if (hay.includes(t)) {
      tokenScore += weight * 1;
      tokensMatched++;
    }
  }

  if (tokensMatched < tokens.length) return 0;
  return tokenScore;
}

function scoreProduct(product: Product, rawQuery: string): SearchResult {
  const query = rawQuery.trim().toLowerCase();
  const tokens = tokenize(query);
  const matchedOn: string[] = [];

  let score = 0;

  const titleScore = scoreField(product.title, query, tokens, 10);
  if (titleScore > 0) {
    score += titleScore;
    matchedOn.push("title");
  }

  const authorScore = scoreField(product.author, query, tokens, 8);
  if (authorScore > 0) {
    score += authorScore;
    matchedOn.push("author");
  }

  const category = categoryBySlug[product.category];
  if (category) {
    const catNameScore = scoreField(category.name, query, tokens, 7);
    const catTaglineScore = scoreField(category.tagline, query, tokens, 4);
    const catDescScore = scoreField(category.description, query, tokens, 2);
    const catSlugScore = scoreField(category.slug, query, tokens, 5);
    const total = catNameScore + catTaglineScore + catDescScore + catSlugScore;
    if (total > 0) {
      score += total;
      matchedOn.push("category");
    }
  }

  if (product.badges?.length) {
    let badgeScore = 0;
    for (const b of product.badges) {
      badgeScore += scoreField(b, query, tokens, 5);
    }
    if (badgeScore > 0) {
      score += badgeScore;
      matchedOn.push("badge");
    }
  }

  if (product.forCourses?.length) {
    let courseScore = 0;
    for (const c of product.forCourses) {
      courseScore += scoreField(c, query, tokens, 6);
      courseScore += scoreField(c.replace(/\s+/g, ""), query, tokens, 6);
    }
    if (courseScore > 0) {
      score += courseScore;
      matchedOn.push("course");
    }
  }

  const descScore = scoreField(product.description, query, tokens, 1);
  if (descScore > 0) {
    score += descScore;
    matchedOn.push("description");
  }

  const publisherScore = scoreField(product.publisher, query, tokens, 2);
  if (publisherScore > 0) {
    score += publisherScore;
    matchedOn.push("publisher");
  }

  const editionScore = scoreField(product.edition, query, tokens, 1);
  if (editionScore > 0) {
    score += editionScore;
    matchedOn.push("edition");
  }

  return { product, score, matchedOn };
}

export function searchProducts(rawQuery: string): SearchResult[] {
  const query = rawQuery?.trim();
  if (!query) return [];
  return products
    .map((p) => scoreProduct(p, query))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function getCategoriesMatchingQuery(rawQuery: string) {
  const query = rawQuery?.trim().toLowerCase();
  if (!query) return [];
  return categories.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.slug.includes(query) ||
      c.tagline.toLowerCase().includes(query),
  );
}

export function filterByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}
