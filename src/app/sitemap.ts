import type { MetadataRoute } from "next";
import { MOCK_PRODUCTS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://germantees.com";

  const staticPages = [
    "",
    "/design-studio",
    "/cart",
    "/our-philosophy",
    "/germantees-standard",
    "/fabrics",
    "/size-guide",
    "/care-guide",
    "/contact",
    "/track-order",
    "/account",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...productPages];
}
