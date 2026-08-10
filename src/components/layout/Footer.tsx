"use client";

import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Germantees
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.brand.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Help
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow + Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Follow
            </h3>
            <ul className="space-y-2.5 mb-8">
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
              Newsletter
            </h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="bg-gold text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/images/Germantees_Logo_Assets/01_primary_full_logo.png"
            alt={`${BRAND.name} — ${BRAND.tagline}`}
            width={140}
            height={50}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Germantees. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
