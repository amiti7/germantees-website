"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, Sparkles, Truck, Shield } from "lucide-react";

export function CartClient() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-navy mb-8">
          Your Cart
        </h1>

        {/* Empty cart state */}
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-ivory border border-border flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gold" />
          </div>
          <h2 className="text-xl font-semibold text-navy mb-2">
            Your cart is waiting to be filled.
          </h2>
          <p className="text-warm-grey mb-8 max-w-md mx-auto">
            Find something you love — personalized just for you — and add it here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/kids"
              className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors group"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/customize"
              className="inline-flex items-center justify-center gap-2 border border-gold text-gold px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gold hover:text-white transition-colors"
            >
              <Sparkles size={16} />
              Create Your Own
            </Link>
          </div>
        </div>

        {/* Trust signals */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
            <Truck size={20} className="text-gold shrink-0" />
            <div>
              <p className="text-sm font-medium text-navy">Free Shipping</p>
              <p className="text-xs text-warm-grey">On orders above ₹999</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
            <Shield size={20} className="text-gold shrink-0" />
            <div>
              <p className="text-sm font-medium text-navy">Germantees Standard</p>
              <p className="text-xs text-warm-grey">Every garment inspected</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
            <Sparkles size={20} className="text-gold shrink-0" />
            <div>
              <p className="text-sm font-medium text-navy">Personalized</p>
              <p className="text-xs text-warm-grey">Made uniquely for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
