import Link from "next/link";
import { QUALITY_PILLARS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function GermanteesStandard() {
  return (
    <section className="bg-navy text-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            The Germantees Standard
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Premium isn&apos;t a word.{" "}
            <span className="text-gold italic">It&apos;s a process.</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Specifications + Testing + Inspection + Traceability + Continuous Improvement
          </p>
        </div>

        {/* Five pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {QUALITY_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <span className="text-gold text-xs font-bold tracking-wider">
                {pillar.number}
              </span>
              <div className="w-8 h-px bg-gold/30 my-3" />
              <h3 className="text-sm font-semibold mb-2">{pillar.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/germantees-standard"
            className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-gold hover:text-white transition-colors group"
          >
            Explore the Germantees Standard
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
