import { MOCK_PRODUCTS } from "@/lib/constants";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
