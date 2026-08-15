import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy rounded-2xl p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative">
            <Sparkles size={32} className="text-gold mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Beautiful memories shouldn&apos;t require{" "}
              <span className="text-gold italic">compromising on the product.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 text-lg">
              Create something personal. Something premium. Something your family will remember.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kids"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-ivory transition-colors group"
              >
                Explore Collection
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/design-studio"
                className="inline-flex items-center justify-center gap-2 border border-gold text-gold px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-gold hover:text-white transition-colors"
              >
                <Sparkles size={16} />
                Create Your T-Shirt
              </Link>
            </div>

            <p className="mt-10 text-xs tracking-[0.3em] uppercase text-gold/60">
              GERMANTEES — NO COMPROMISE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
