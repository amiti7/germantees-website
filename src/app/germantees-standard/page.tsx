import type { Metadata } from "next";
import Link from "next/link";
import { QUALITY_PILLARS } from "@/lib/constants";
import { Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "The Germantees Standard — GERMANTEES",
  description: "Specifications + Testing + Inspection + Traceability + Continuous Improvement",
};

export default function StandardPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-navy text-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield size={40} className="mx-auto text-gold mb-6" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">The Germantees Standard</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Premium isn&apos;t a word.<br />
            <span className="text-gold italic">It&apos;s a process.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Specifications + Testing + Inspection + Traceability + Continuous Improvement
          </p>
        </div>
      </section>

      {/* Five Pillars */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy text-center mb-12">
            Five Pillars of Quality
          </h2>
          <div className="space-y-6">
            {QUALITY_PILLARS.map((pillar) => (
              <div key={pillar.number} className="bg-white rounded-xl border border-border p-6 sm:p-8">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <span className="text-gold font-bold text-sm">{pillar.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-2">{pillar.title}</h3>
                    <p className="text-warm-grey leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What this means */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-6">What This Means For You</h2>
          <div className="space-y-3">
            {[
              "Every product has a defined specification — not just a marketing claim",
              "Fabric is tested against defined parameters before production",
              "Every garment is inspected individually before shipping",
              "Full traceability from fabric to finished product",
              "Continuous improvement based on real data, not assumptions",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
                <span className="text-navy/80">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/fabrics"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors group"
            >
              Explore Our Fabrics
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
