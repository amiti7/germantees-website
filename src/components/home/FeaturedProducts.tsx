import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedProducts() {
  const products = await fetchProducts();
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Featured
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-navy">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/kids"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/kids"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
          >
            View All Products
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
