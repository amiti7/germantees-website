"use client";

import { useState } from "react";
import { Package, Search, CheckCircle2, Truck, Factory, ClipboardCheck } from "lucide-react";

const MOCK_STAGES = [
  { label: "Order Placed", date: "Aug 15, 2024", done: true, icon: ClipboardCheck },
  { label: "In Production", date: "Aug 16, 2024", done: true, icon: Factory },
  { label: "Quality Inspected", date: "Aug 18, 2024", done: true, icon: CheckCircle2 },
  { label: "Shipped", date: "Aug 19, 2024", done: false, icon: Truck },
  { label: "Delivered", date: "—", done: false, icon: Package },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <Package size={32} className="mx-auto text-gold mb-4" />
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-navy mb-3">
            Track Your Order
          </h1>
          <p className="text-warm-grey">Enter your order ID to see the current status.</p>
        </div>

        <div className="flex gap-2 mb-10">
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. GT-20240815-001"
            className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
          />
          <button
            onClick={() => orderId && setShowResult(true)}
            className="bg-navy text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors flex items-center gap-2"
          >
            <Search size={16} /> Track
          </button>
        </div>

        {showResult && (
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold text-navy">Order {orderId || "GT-20240815-001"}</p>
                <p className="text-xs text-warm-grey">Birthday Boy Tee · White · 4-5Y</p>
              </div>
              <span className="text-xs bg-gold/10 text-gold font-semibold px-3 py-1 rounded-lg">In Transit</span>
            </div>

            <div className="space-y-0">
              {MOCK_STAGES.map((stage, i) => (
                <div key={stage.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stage.done ? "bg-success text-white" : "bg-border text-warm-grey"}`}>
                      <stage.icon size={14} />
                    </div>
                    {i < MOCK_STAGES.length - 1 && (
                      <div className={`w-0.5 h-12 ${stage.done ? "bg-success" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={`text-sm font-medium ${stage.done ? "text-navy" : "text-warm-grey"}`}>{stage.label}</p>
                    <p className="text-xs text-warm-grey">{stage.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
