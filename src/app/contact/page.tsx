"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Have a question about our products, a custom order, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Form */}
            <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-navy mb-6">Send us a message</h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-navy mb-1 block">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy mb-1 block">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Subject</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What is this about?" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Tell us more..." className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold resize-none" />
                </div>
                <button type="submit" className="w-full bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2">
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-border p-5 flex items-start gap-3 hover:border-navy/20 transition-colors">
                <MessageCircle size={20} className="text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy">WhatsApp</p>
                  <p className="text-sm text-warm-grey">+91 99999 99999</p>
                  <p className="text-xs text-warm-grey mt-1">Quick responses, Mon–Sat 10am–7pm</p>
                </div>
              </a>

              <div className="bg-white rounded-xl border border-border p-5 flex items-start gap-3">
                <Mail size={20} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy">Email</p>
                  <p className="text-sm text-warm-grey">hello@germantees.com</p>
                  <p className="text-xs text-warm-grey mt-1">We reply within 24 hours</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border p-5 flex items-start gap-3">
                <Phone size={20} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy">Phone</p>
                  <p className="text-sm text-warm-grey">+91 99999 99999</p>
                  <p className="text-xs text-warm-grey mt-1">Mon–Sat 10am–7pm IST</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border p-5 flex items-start gap-3">
                <MapPin size={20} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy">Office</p>
                  <p className="text-sm text-warm-grey">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
