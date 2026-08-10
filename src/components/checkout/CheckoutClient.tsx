"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Lock,
  Truck,
  CreditCard,
  Shield,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";

type CheckoutStep = "contact" | "shipping" | "payment";

const STEPS: { key: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { key: "contact", label: "Contact", icon: User },
  { key: "shipping", label: "Shipping", icon: Truck },
  { key: "payment", label: "Payment", icon: CreditCard },
];

export function CheckoutClient() {
  const [step, setStep] = useState<CheckoutStep>("contact");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-navy">
            Checkout
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-success font-medium">
            <Lock size={14} />
            Secure Checkout
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-1 mb-8 bg-white rounded-xl border border-border p-2">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center flex-1">
              <button
                onClick={() => setStep(s.key)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium w-full px-3 py-2 rounded-lg transition-colors",
                  i <= stepIndex ? "text-navy" : "text-warm-grey"
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                    i < stepIndex
                      ? "bg-success text-white"
                      : i === stepIndex
                      ? "bg-navy text-white"
                      : "bg-border text-warm-grey"
                  )}
                >
                  {i < stepIndex ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <ChevronRight size={14} className="text-border mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* LEFT: Form */}
          <div className="space-y-4">
            {step === "contact" && (
              <div className="bg-white rounded-xl border border-border p-6 space-y-4">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
                  <Mail size={18} className="text-gold" />
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-navy mb-1 block">First Name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Priya" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy mb-1 block">Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Sharma" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+91 99999 99999" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                </div>
                <button onClick={() => setStep("shipping")} className="w-full bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2">
                  Continue to Shipping <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === "shipping" && (
              <div className="bg-white rounded-xl border border-border p-6 space-y-4">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
                  <MapPin size={18} className="text-gold" />
                  Shipping Address
                </h2>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Address</label>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="Street address, apartment, floor..." className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold resize-none" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-navy mb-1 block">City</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Mumbai" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy mb-1 block">State</label>
                    <input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Maharashtra" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy mb-1 block">Pincode</label>
                    <input value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="e.g. 400001" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                </div>
                <div className="bg-ivory rounded-lg p-3 flex items-center gap-3 border border-border">
                  <Truck size={18} className="text-gold shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-navy">Standard Delivery — 5–7 business days</p>
                    <p className="text-xs text-warm-grey">Free on orders above ₹999</p>
                  </div>
                </div>
                <button onClick={() => setStep("payment")} className="w-full bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2">
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white rounded-xl border border-border p-6 space-y-4">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
                  <CreditCard size={18} className="text-gold" />
                  Payment
                </h2>
                <div className="bg-ivory rounded-xl border border-border p-6 text-center">
                  <CreditCard size={32} className="mx-auto text-gold mb-3" />
                  <p className="text-sm font-medium text-navy mb-1">Razorpay Secure Payment</p>
                  <p className="text-xs text-warm-grey mb-4">UPI, Cards, Net Banking, Wallets</p>
                  <button className="w-full bg-navy text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2">
                    <Lock size={16} />
                    Pay ₹699
                  </button>
                </div>
                <div className="flex items-center gap-4 justify-center pt-2">
                  <div className="flex items-center gap-1 text-xs text-warm-grey">
                    <Lock size={12} /> 256-bit SSL
                  </div>
                  <div className="flex items-center gap-1 text-xs text-warm-grey">
                    <Shield size={12} /> Secure Payment
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-border p-5">
              <h3 className="text-sm font-semibold text-navy mb-4">Order Summary</h3>
              <div className="flex gap-3 pb-4 border-b border-border">
                <div className="w-16 h-16 bg-ivory rounded-lg border border-border flex items-center justify-center">
                  <span className="text-xs text-warm-grey/60">Tee</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy">Birthday Boy Tee</p>
                  <p className="text-xs text-warm-grey">White · 4-5Y · Personalized</p>
                  <p className="text-sm font-bold text-navy mt-1">₹699</p>
                </div>
              </div>
              <div className="pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-warm-grey">Subtotal</span>
                  <span className="text-navy">₹699</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-grey">Shipping</span>
                  <span className="text-success font-medium">Free</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="font-semibold text-navy">Total</span>
                  <span className="text-lg font-bold text-navy">₹699</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-4">
              <label className="text-xs font-medium text-navy mb-2 block">Have a coupon?</label>
              <div className="flex gap-2">
                <input placeholder="Enter code" className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
                <button className="bg-ivory border border-border text-navy px-4 py-2 rounded-lg text-sm font-medium hover:bg-border/50 transition-colors">Apply</button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-warm-grey">
              <div className="flex items-center gap-2"><Shield size={12} className="text-gold" /> Germantees Standard quality</div>
              <div className="flex items-center gap-2"><Truck size={12} className="text-gold" /> 5–7 day delivery</div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-gold" /> WhatsApp support available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
