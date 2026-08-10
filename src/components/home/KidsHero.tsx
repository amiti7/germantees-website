import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export function KidsHero() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Shield size={14} />
              Flagship Category
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
              Made for Little Ones. Held to a{" "}
              <span className="text-gold italic">Higher Standard.</span>
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed mb-8 max-w-lg">
              Children are our flagship category. Their comfort, safety and
              durability deserve our most demanding product standards.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Fabric specification defined for every product",
                "Safety parameters tested against defined requirements",
                "Every garment inspected before shipping",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  </div>
                  <span className="text-sm text-navy/80">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/kids"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors group"
            >
              Explore Germantees Kids
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right: Visual placeholder */}
          <div className="relative">
            <div className="aspect-square bg-ivory rounded-2xl border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Shield size={40} className="text-gold" />
                </div>
                <p className="text-sm text-warm-grey">Kids Collection</p>
                <p className="text-xs text-warm-grey/60 mt-1">Lifestyle photo placeholder</p>
              </div>
            </div>
            {/* Floating quality badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl border border-border p-4 shadow-sm">
              <p className="text-xs font-semibold tracking-wider uppercase text-gold mb-1">
                Germantees Standard
              </p>
              <p className="text-xs text-warm-grey">Defined. Tested. Inspected.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
