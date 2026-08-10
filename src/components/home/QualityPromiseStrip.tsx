import { Ruler, FlaskConical, SearchCheck, HeartHandshake } from "lucide-react";
import { QUALITY_PROMISE } from "@/lib/constants";

const iconMap = {
  ruler: Ruler,
  "flask-conical": FlaskConical,
  "search-check": SearchCheck,
  "heart-handshake": HeartHandshake,
} as const;

export function QualityPromiseStrip() {
  return (
    <section className="bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {QUALITY_PROMISE.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 justify-center"
              >
                <Icon size={20} className="text-gold shrink-0" />
                <span className="text-xs font-semibold tracking-widest uppercase text-navy">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
