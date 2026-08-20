"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TSHIRT_COLORS } from "@/lib/constants";
import type { Product } from "@/lib/api";
import {
  Star,
  Heart,
  ShoppingCart,
  Sparkles,
  Truck,
  Shield,
  CheckCircle2,
  Share2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>("quality");

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const colorObj = TSHIRT_COLORS.find((c) => c.name === selectedColor);

  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-warm-grey mb-6">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/kids" className="hover:text-navy capitalize">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-border aspect-square flex items-center justify-center relative overflow-hidden">
              {/* Product placeholder */}
              <div className="text-center">
                <div className="w-48 h-56 mx-auto relative">
                  <svg viewBox="0 0 400 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100,60 L60,80 L20,130 L60,150 L80,120 L80,440 L320,440 L320,120 L340,150 L380,130 L340,80 L300,60 L270,80 C250,95 150,95 130,80 Z"
                      fill={colorObj?.hex || "#FFFFFF"}
                      stroke="#E5E2D9"
                      strokeWidth="1.5"
                    />
                    <path d="M130,80 C150,95 250,95 270,80" fill="none" stroke="#E5E2D9" strokeWidth="1.5" />
                    <text x="200" y="260" textAnchor="middle" fill="rgba(0,0,0,0.1)" fontSize="14" letterSpacing="2">
                      {product.name}
                    </text>
                  </svg>
                </div>
                <p className="text-xs text-warm-grey/60 mt-2">Product image placeholder</p>
              </div>

              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-navy text-white text-xs font-semibold px-3 py-1 rounded-lg">
                  {discount}% off
                </div>
              )}

              {/* Wishlist */}
              <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-lg border border-border hover:bg-white transition-colors">
                <Heart size={18} className="text-navy" />
              </button>
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-20 h-20 rounded-lg border bg-white flex items-center justify-center text-xs text-warm-grey/40",
                    i === 1 ? "border-navy" : "border-border"
                  )}
                >
                  {i === 1 ? "Main" : `View ${i}`}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div className="space-y-6">
            {/* Name + Rating */}
            <div>
              <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-navy mb-2">
                {product.name}
              </h1>
              <p className="text-warm-grey text-sm mb-3">{product.description}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-gold text-gold" />
                  <span className="text-sm font-semibold text-navy">{product.rating}</span>
                  <span className="text-sm text-warm-grey">({product.reviewCount} reviews)</span>
                </div>
                <button className="text-warm-grey hover:text-navy">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-navy">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-warm-grey line-through">₹{product.originalPrice}</span>
                  <span className="text-sm font-semibold text-success bg-success/10 px-2 py-0.5 rounded">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Colour */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-navy mb-2 block">
                Colour — {selectedColor}
              </label>
              <div className="flex gap-2">
                {product.colors.map((colorName) => {
                  const c = TSHIRT_COLORS.find((tc) => tc.name === colorName);
                  return (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={cn(
                        "w-10 h-10 rounded-lg border-2 transition-all",
                        selectedColor === colorName
                          ? "border-navy scale-110 shadow-sm"
                          : "border-border hover:border-navy/30"
                      )}
                      style={{ backgroundColor: c?.hex || "#ccc" }}
                      title={colorName}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-navy mb-2 block">
                Size — {selectedSize}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
                      selectedSize === size
                        ? "border-navy bg-navy text-white"
                        : "border-border text-warm-grey hover:border-navy/30"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <Link href="/size-guide" className="text-xs text-gold font-medium mt-2 inline-block hover:text-gold/80">
                Size Guide
              </Link>
            </div>

            {/* Personalization */}
            {product.personalizationEnabled && (
              <div className="bg-ivory rounded-xl border border-border p-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 flex items-center gap-2">
                  <Sparkles size={14} />
                  Personalize
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-navy font-medium mb-1 block">Child&apos;s Name</label>
                    <input
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Aarav"
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-navy font-medium mb-1 block">Age</label>
                    <input
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="e.g. 3"
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Delivery */}
            <div className="flex items-center gap-3 bg-ivory rounded-xl border border-border p-3">
              <Truck size={18} className="text-gold" />
              <div>
                <p className="text-sm font-medium text-navy">Order today. Estimated delivery: 5–7 days</p>
                <p className="text-xs text-warm-grey">Free shipping on orders above ₹999</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-2 bg-navy text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <Link
                href="/design-studio"
                className="flex-1 inline-flex items-center justify-center gap-2 border border-gold text-gold py-3.5 rounded-lg text-sm font-semibold hover:bg-gold hover:text-white transition-colors"
              >
                <Sparkles size={16} />
                Customize
              </Link>
            </div>

            {/* WhatsApp order */}
            <a
              href={`https://wa.me/919999999999?text=Hi, I'd like to order: ${product.name} - ${selectedColor} - ${selectedSize}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-3 rounded-lg text-sm font-semibold hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle size={16} />
              Order on WhatsApp
            </a>

            {/* Accordions */}
            <div className="space-y-2">
              {/* Germantees Standard */}
              <div className="border border-border rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "quality" ? null : "quality")}
                  className="w-full flex items-center justify-between p-4"
                >
                  <span className="text-sm font-semibold text-navy flex items-center gap-2">
                    <Shield size={16} className="text-gold" />
                    Germantees Standard
                  </span>
                  <ChevronDown size={16} className={cn("text-warm-grey transition-transform", openAccordion === "quality" && "rotate-180")} />
                </button>
                {openAccordion === "quality" && (
                  <div className="px-4 pb-4 space-y-2">
                    {["Fabric specification defined", "Construction inspected", "Print inspected", "Final QC"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-success" />
                        <span className="text-sm text-navy/80">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fabric */}
              <div className="border border-border rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "fabric" ? null : "fabric")}
                  className="w-full flex items-center justify-between p-4"
                >
                  <span className="text-sm font-semibold text-navy">Fabric Information</span>
                  <ChevronDown size={16} className={cn("text-warm-grey transition-transform", openAccordion === "fabric" && "rotate-180")} />
                </button>
                {openAccordion === "fabric" && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-warm-grey">{product.fabricSpec}</p>
                    <Link href="/fabrics" className="text-xs text-gold font-medium mt-2 inline-block">
                      Learn about our fabrics →
                    </Link>
                  </div>
                )}
              </div>

              {/* Care */}
              <div className="border border-border rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "care" ? null : "care")}
                  className="w-full flex items-center justify-between p-4"
                >
                  <span className="text-sm font-semibold text-navy">Care Instructions</span>
                  <ChevronDown size={16} className={cn("text-warm-grey transition-transform", openAccordion === "care" && "rotate-180")} />
                </button>
                {openAccordion === "care" && (
                  <div className="px-4 pb-4 space-y-1">
                    {[
                      "Machine wash cold, inside out",
                      "Do not bleach",
                      "Tumble dry low",
                      "Iron on low heat, avoid print area",
                    ].map((item) => (
                      <p key={item} className="text-sm text-warm-grey">• {item}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-3 lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-lg font-bold text-navy">₹{product.price}</span>
            <p className="text-xs text-warm-grey">{selectedColor} · {selectedSize}</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
