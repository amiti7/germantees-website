import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Philosophy — GERMANTEES",
  description: "Inspired by German precision. Made for Indian life.",
};

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-navy text-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Inspired by German precision.<br />
            <span className="text-gold italic">Made for Indian life.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We believe every child deserves apparel that is defined, tested, and inspected — not just labelled &ldquo;premium.&rdquo;
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-4">Why We Exist</h2>
            <p className="text-warm-grey leading-relaxed">
              Parents deserve to know exactly what they&apos;re putting on their children. Not vague claims. Not marketing superlatives.
              Real specifications. Real testing. Real inspection. We started Germantees because we couldn&apos;t find a brand that would
              show — not just tell — what &ldquo;quality&rdquo; actually means.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-4">Our Approach</h2>
            <p className="text-warm-grey leading-relaxed mb-4">
              We follow a systematic quality framework inspired by the precision of German engineering:
            </p>
            <p className="text-navy font-semibold text-lg mb-4">DEFINE. TEST. INSPECT. IMPROVE. REPEAT.</p>
            <p className="text-warm-grey leading-relaxed">
              Every product has defined specifications. Every specification is tested. Every garment is inspected.
              And when results don&apos;t meet our standards, we improve the process — not just the marketing.
            </p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-4">The Sacred Brand Rule</h2>
            <div className="bg-navy text-white rounded-xl p-8 text-center">
              <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-2">
                &ldquo;If we don&apos;t know, we don&apos;t claim.&rdquo;
              </p>
              <p className="text-white/60 text-sm">
                We will never present unverified claims as facts. Where a specification is still under validation,
                we will say so clearly.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-4">What We&apos;re Not</h2>
            <ul className="space-y-2 text-warm-grey">
              <li>- We are not &ldquo;German made&rdquo; or &ldquo;German certified&rdquo;</li>
              <li>- We don&apos;t make fake promises about delivery timelines</li>
              <li>- We don&apos;t compare against competitors without evidence</li>
              <li>- We don&apos;t claim certifications we don&apos;t hold</li>
            </ul>
          </div>

          <div className="text-center pt-8 border-t border-border">
            <Link
              href="/germantees-standard"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors group"
            >
              See the Germantees Standard
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
