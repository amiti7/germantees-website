"use client";

import Link from "next/link";
import { Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TSHIRT_COLORS } from "@/lib/constants";
import type { Product } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group block bg-white rounded-xl border border-border overflow-hidden",
        "transition-all duration-250 ease-out hover:border-navy/20 hover:shadow-sm",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-ivory overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-warm-grey/40">
          <div className="text-center">
            <Sparkles size={40} className="mx-auto mb-2 opacity-30" />
            <p className="text-xs uppercase tracking-wider">{product.category}</p>
          </div>
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-navy text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {discount}% off
          </div>
        )}

        {/* Personalization indicator */}
        {product.personalizationEnabled && (
          <div className="absolute top-3 right-3 bg-gold/10 text-gold text-xs font-medium px-2 py-1 rounded-md border border-gold/20">
            Personalizable
          </div>
        )}

        {/* Quick customize on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-navy/90 text-white text-center py-2.5 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-250 ease-out">
          Customize Now
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-navy leading-snug mb-0.5">
          {product.name}
        </h3>
        <p className="text-xs text-warm-grey mb-2">{product.qualityTag}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="text-base font-bold text-navy">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-warm-grey line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2.5">
          <Star size={12} className="fill-gold text-gold" />
          <span className="text-xs font-medium text-navy">{product.rating}</span>
          <span className="text-xs text-warm-grey">({product.reviewCount})</span>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {product.colors.slice(0, 3).map((colorName) => {
            const color = TSHIRT_COLORS.find((c) => c.name === colorName);
            return (
              <span
                key={colorName}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color?.hex || "#ccc" }}
                title={colorName}
              />
            );
          })}
          {product.colors.length > 3 && (
            <span className="text-xs text-warm-grey">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
