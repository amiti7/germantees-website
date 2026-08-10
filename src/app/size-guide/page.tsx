import type { Metadata } from "next";
import { SIZE_CHART } from "@/lib/constants";
import { Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Size Guide — GERMANTEES",
  description: "Find the perfect fit with our detailed size chart for kids, men, and women.",
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Ruler size={32} className="mx-auto text-gold mb-4" />
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold mb-4">
            Size Guide
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Find the perfect fit. All measurements are in centimetres.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {(["kids", "men", "women"] as const).map((category) => (
            <div key={category}>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-4 capitalize">{category}</h2>
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-ivory border-b border-border">
                        <th className="text-left px-4 py-3 font-semibold text-navy">Size</th>
                        <th className="text-left px-4 py-3 font-semibold text-navy">Chest (cm)</th>
                        <th className="text-left px-4 py-3 font-semibold text-navy">Length (cm)</th>
                        {category === "kids" && <th className="text-left px-4 py-3 font-semibold text-navy">Age</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_CHART[category].map((size, i) => (
                        <tr key={size.label} className={i % 2 === 0 ? "" : "bg-ivory/50"}>
                          <td className="px-4 py-3 font-medium text-navy">{size.label}</td>
                          <td className="px-4 py-3 text-warm-grey">{size.chest}</td>
                          <td className="px-4 py-3 text-warm-grey">{size.length}</td>
                          {category === "kids" && <td className="px-4 py-3 text-warm-grey">{size.label}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}

          {/* Tips */}
          <div className="bg-navy text-white rounded-xl p-6 sm:p-8">
            <h3 className="font-semibold mb-3">Measuring Tips</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Measure over undergarments for accuracy</li>
              <li>• For chest — measure the fullest part with arms relaxed</li>
              <li>• For length — measure from highest point of shoulder to hem</li>
              <li>• If between sizes, size up for a relaxed fit</li>
              <li>• Our garments are pre-shrunk, but we recommend cold wash</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
