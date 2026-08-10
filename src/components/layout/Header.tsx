"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  User,
  Heart,
} from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      {/* Top announcement bar */}
      <div className="bg-navy text-white text-center py-2 px-4">
        <p className="text-xs tracking-widest uppercase">
          {BRAND.name} — {BRAND.tagline} Free shipping on orders above ₹999
        </p>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -ml-2 text-navy hover:bg-ivory rounded-lg transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Germantees_Logo_Assets/01_primary_full_logo.png"
              alt="Germantees — Precision in Quality. Comfort in Every Thread."
              width={160}
              height={60}
              className="hidden sm:block h-12 w-auto object-contain"
              priority
            />
            <Image
              src="/images/Germantees_Logo_Assets/03_emblem_only.png"
              alt="Germantees"
              width={40}
              height={40}
              className="sm:hidden h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium text-navy/70 hover:text-navy transition-colors rounded-lg hover:bg-ivory",
                  link.label === "Create Your Own" || link.label === "Design Studio"
                    ? "text-gold font-semibold hover:text-gold/80"
                    : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-navy/70 hover:text-navy hover:bg-ivory rounded-lg transition-colors hidden sm:flex">
              <Search size={20} />
            </button>
            <button className="p-2 text-navy/70 hover:text-navy hover:bg-ivory rounded-lg transition-colors hidden sm:flex">
              <Heart size={20} />
            </button>
            <Link
              href="/account"
              className="p-2 text-navy/70 hover:text-navy hover:bg-ivory rounded-lg transition-colors hidden sm:flex"
            >
              <User size={20} />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-navy/70 hover:text-navy hover:bg-ivory rounded-lg transition-colors relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out bg-white border-t border-border",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2.5 text-sm font-medium text-navy/70 hover:text-navy hover:bg-ivory rounded-lg transition-colors",
                link.label === "Create Your Own" || link.label === "Design Studio"
                  ? "text-gold font-semibold"
                  : ""
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border flex gap-4 px-3">
            <Link href="/account" className="text-sm text-navy/70 hover:text-navy">
              Account
            </Link>
            <Link href="/track-order" className="text-sm text-navy/70 hover:text-navy">
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
