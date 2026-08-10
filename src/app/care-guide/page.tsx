import type { Metadata } from "next";
import { Droplets, ThermometerSun, Wind, Ban, Shirt } from "lucide-react";

export const metadata: Metadata = {
  title: "Care Guide — GERMANTEES",
  description: "Keep your Germantees looking great wash after wash.",
};

const CARE_STEPS = [
  { icon: Droplets, title: "Wash", instructions: ["Machine wash cold (30°C)", "Turn inside out before washing", "Wash with similar colours", "Use mild detergent"] },
  { icon: Ban, title: "Don't", instructions: ["Do not bleach", "Do not use fabric softener on prints", "Do not soak for extended periods", "Do not wring"] },
  { icon: Wind, title: "Dry", instructions: ["Tumble dry low heat", "Or line dry in shade", "Remove promptly from dryer", "Do not dry in direct sunlight"] },
  { icon: ThermometerSun, title: "Iron", instructions: ["Iron on low heat", "Avoid ironing directly on print", "Use a pressing cloth over print areas", "Steam iron is safe for fabric"] },
];

export default function CareGuidePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shirt size={32} className="mx-auto text-gold mb-4" />
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold mb-4">
            Care Guide
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Follow these simple steps to keep your Germantees looking premium, wash after wash.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {CARE_STEPS.map((step) => (
              <div key={step.title} className="bg-white rounded-xl border border-border p-6">
                <step.icon size={24} className="text-gold mb-3" />
                <h2 className="text-lg font-semibold text-navy mb-3">{step.title}</h2>
                <ul className="space-y-2">
                  {step.instructions.map((inst) => (
                    <li key={inst} className="flex items-start gap-2 text-sm text-warm-grey">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0 mt-1.5" />
                      {inst}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gold/10 border border-gold/20 rounded-xl p-6 text-center">
            <p className="text-sm text-navy font-medium">
              Following these instructions will help maintain fabric integrity, print quality, and colour brightness for 50+ washes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
