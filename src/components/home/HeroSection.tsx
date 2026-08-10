import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Small brand line */}
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            GERMANTEES — NO COMPROMISE
          </p>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            Beautiful memories deserve better than{" "}
            <span className="text-gold italic">good enough.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mb-10">
            Premium personalized apparel for little ones, families and the
            moments you&apos;ll remember.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/kids"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-ivory transition-colors group"
            >
              Explore the Collection
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/customize"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <Sparkles size={16} />
              Create Your T-Shirt
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative w-80 h-80 xl:w-96 xl:h-96">
            <div className="absolute inset-0 border border-gold/20 rounded-full" />
            <div className="absolute inset-8 border border-gold/10 rounded-full" />
            <div className="absolute inset-16 border border-gold/5 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={48} className="text-gold/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
