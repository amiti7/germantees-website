/**
 * API client for the Germantees backend.
 *
 * DATA SOURCE SWITCHING:
 * A Firebase Remote Config flag ("use_backend") controls where data comes from.
 *
 *   use_backend = true  → fetch from Spring Boot backend (real database)
 *   use_backend = false → use MOCK_PRODUCTS from constants.ts (hardcoded)
 *
 * Server Components (which can't use Firebase SDK) check the env variable
 * USE_BACKEND instead. Set it in .env.local:
 *   USE_BACKEND=true   → backend
 *   USE_BACKEND=false  → mock (default)
 */

import { MOCK_PRODUCTS } from "@/lib/constants";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

/**
 * Server-side flag check.
 * Returns true if the USE_BACKEND env variable is set to "true".
 * This is used by Server Components that can't access Firebase Remote Config.
 */
function isBackendEnabled(): boolean {
  return process.env.USE_BACKEND === "true";
}

// ---------- Types (match the backend DTOs) ----------

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  colors: string[];
  sizes: string[];
  category: string;
  rating: number;
  reviewCount: number;
  personalizationEnabled: boolean;
  qualityTag: string;
  fabricSpec: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}

// ---------- Product API ----------

export async function fetchProducts(): Promise<Product[]> {
  if (!isBackendEnabled()) {
    return MOCK_PRODUCTS as unknown as Product[];
  }

  const res = await fetch(`${BACKEND_URL}/api/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isBackendEnabled()) {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return (product as unknown as Product) ?? null;
  }

  const res = await fetch(`${BACKEND_URL}/api/products/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch product: ${slug}`);
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  if (!isBackendEnabled()) {
    return MOCK_PRODUCTS.filter((p) => p.category === category) as unknown as Product[];
  }

  const res = await fetch(`${BACKEND_URL}/api/products/category/${category}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`);
  return res.json();
}

// ---------- Category API ----------

export async function fetchCategories(): Promise<Category[]> {
  if (!isBackendEnabled()) {
    return []; // No mock categories — return empty
  }

  const res = await fetch(`${BACKEND_URL}/api/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
