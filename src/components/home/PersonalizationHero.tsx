import Link from "next/link";
import { Upload, Type, Palette, Eye, ArrowRight } from "lucide-react";

export function PersonalizationHero() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square bg-ivory rounded-2xl border border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-48 h-60 bg-white rounded-lg border border-border mx-auto flex items-center justify-center relative">
                  <div className="absolute top-2 left-2 right-2 h-1 bg-gold/20 rounded" />
                  <div className="text-center">
                    <p className="text-xs text-warm-grey mb-1">Your design here</p>
                    <div className="w-20 h-20 bg-ivory rounded border border-dashed border-gold/30 flex items-center justify-center mx-auto">
                      <Upload size={20} className="text-gold/40" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-warm-grey">Live preview updates instantly</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Personalization
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
              Make it{" "}
              <span className="text-gold italic">yours.</span>
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed mb-8 max-w-lg">
              Upload a photo. Add a name. Choose the colour. Create something
              nobody else has.
            </p>

            {/* Steps */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Upload, label: "Upload Photo", desc: "JPG, PNG, WebP" },
                { icon: Type, label: "Add Text", desc: "Choose fonts & colours" },
                { icon: Palette, label: "Pick Colour", desc: "Multiple options" },
                { icon: Eye, label: "Live Preview", desc: "See it instantly" },
              ].map((step) => (
                <div
                  key={step.label}
                  className="bg-ivory rounded-xl p-4 border border-border"
                >
                  <step.icon size={20} className="text-gold mb-2" />
                  <p className="text-sm font-semibold text-navy">{step.label}</p>
                  <p className="text-xs text-warm-grey">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/customize"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors group"
              >
                Design Your T-Shirt
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/design-studio"
                className="inline-flex items-center justify-center gap-2 border border-navy text-navy px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
              >
                Open Design Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
