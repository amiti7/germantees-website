import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Fabrics — GERMANTEES",
  description: "Learn about the fabrics we use — defined, tested, and inspected.",
};

const FABRICS = [
  {
    name: "Biowash Cotton 180 GSM",
    use: "Kids T-Shirts, Casual Wear",
    properties: ["Combed & biowashed for softness", "180 GSM for durability", "Pre-shrunk treatment", "Breathable knit", "Colour-fast dyes"],
    status: "Testing in progress",
  },
  {
    name: "Premium Ring-Spun 200 GSM",
    use: "Men & Women T-Shirts",
    properties: ["Ring-spun cotton for strength", "200 GSM for structure", "Reinforced collar & seams", "Biowash finish", "Smooth surface for printing"],
    status: "Testing in progress",
  },
  {
    name: "Organic Cotton Blend 160 GSM",
    use: "Baby & Infant Range",
    properties: ["Organic cotton blend", "Extra-soft 160 GSM", "Gentle on sensitive skin", "No harsh chemicals", "GOTS certification (in progress)"],
    status: "Specification under review",
  },
];

export default function FabricsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-navy text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Our Fabrics</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold leading-tight mb-6">
            The fabric is the <span className="text-gold italic">product.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every fabric choice is defined by a specification, not a preference. We test, we document, we improve.
          </p>
        </div>
      </section>

      {/* Fabric cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {FABRICS.map((fabric) => (
            <div key={fabric.name} className="bg-white rounded-xl border border-border p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-navy">{fabric.name}</h2>
                  <p className="text-sm text-warm-grey">{fabric.use}</p>
                </div>
                <span className="text-xs bg-gold/10 text-gold font-semibold px-3 py-1 rounded-lg shrink-0 ml-4">
                  {fabric.status}
                </span>
              </div>
              <ul className="space-y-2">
                {fabric.properties.map((prop) => (
                  <li key={prop} className="flex items-center gap-2 text-sm text-navy/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                    {prop}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency note */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-grey mb-6">
            Test results will be published here as they become available.
            We believe in transparency: if we don&apos;t know a number yet, we won&apos;t claim it.
          </p>
          <Link
            href="/germantees-standard"
            className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors group"
          >
            See Our Quality Framework
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
