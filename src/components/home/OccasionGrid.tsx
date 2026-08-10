import Link from "next/link";
import { OCCASIONS } from "@/lib/constants";
import { ArrowRight, Gift, Heart, Users, Camera, PartyPopper, Sun } from "lucide-react";

const occasionIcons: Record<string, React.ReactNode> = {
  "first-birthday": <PartyPopper size={28} />,
  birthday: <Gift size={28} />,
  "mom-child": <Heart size={28} />,
  "dad-child": <Heart size={28} />,
  siblings: <Users size={28} />,
  "family-vacation": <Sun size={28} />,
  festivals: <PartyPopper size={28} />,
  photoshoots: <Camera size={28} />,
};

export function OccasionGrid() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Shop by Occasion
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-navy mb-4">
            Every moment deserves its own look.
          </h2>
          <p className="text-warm-grey max-w-xl mx-auto">
            From first birthdays to family vacations — find the perfect personalized apparel for your celebration.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {OCCASIONS.map((occasion) => (
            <Link
              key={occasion.slug}
              href={`/collections/${occasion.slug}`}
              className="group relative bg-white rounded-xl border border-border overflow-hidden hover:border-navy/20 transition-all duration-250"
            >
              <div className="aspect-[4/3] bg-ivory flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gold/60 mb-2 flex justify-center group-hover:text-gold transition-colors">
                    {occasionIcons[occasion.slug]}
                  </div>
                  <p className="text-xs text-warm-grey/60 uppercase tracking-wider">
                    Collection
                  </p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-navy">{occasion.title}</h3>
                <ArrowRight size={14} className="text-warm-grey group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
