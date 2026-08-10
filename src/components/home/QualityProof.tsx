import { FlaskConical, Ruler, RotateCcw, Palette, Printer, ClipboardCheck } from "lucide-react";

const proofCards = [
  { icon: FlaskConical, title: "Fabric Test", status: "Validation in progress" },
  { icon: Ruler, title: "Shrinkage Test", status: "Validation in progress" },
  { icon: RotateCcw, title: "Collar Recovery", status: "Validation in progress" },
  { icon: Palette, title: "Colour Fastness", status: "Validation in progress" },
  { icon: Printer, title: "Print Durability", status: "Validation in progress" },
  { icon: ClipboardCheck, title: "Final Inspection", status: "Validation in progress" },
];

export function QualityProof() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Quality Proof
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-navy mb-4">
            Show. Don&apos;t Just Tell.
          </h2>
          <p className="text-warm-grey max-w-xl mx-auto">
            We believe quality claims must be backed by evidence. Here&apos;s where we track ours.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proofCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl border border-border p-6 hover:border-navy/20 transition-colors"
            >
              <card.icon size={24} className="text-gold mb-4" />
              <h3 className="text-sm font-semibold text-navy mb-2">{card.title}</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                <p className="text-xs text-warm-grey">{card.status}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-warm-grey/60 mt-8">
          Test results will be published here as they become available. If we don&apos;t know, we don&apos;t claim.
        </p>
      </div>
    </section>
  );
}
