"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Package,
  Heart,
  Palette,
  MapPin,
  User,
  Bell,
  HelpCircle,
  ChevronRight,
  Sparkles,
  LogIn,
} from "lucide-react";

type AccountTab = "orders" | "wishlist" | "designs" | "addresses" | "profile" | "notifications" | "support";

const TABS: { key: AccountTab; label: string; icon: React.ElementType }[] = [
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "designs", label: "Saved Designs", icon: Palette },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "profile", label: "Profile", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "support", label: "Help & Support", icon: HelpCircle },
];

const MOCK_ORDERS = [
  { id: "GT-20240815-001", date: "Aug 15, 2024", status: "Delivered", statusColor: "text-success", total: 699, product: "Birthday Boy Tee", color: "White", size: "4-5Y" },
  { id: "GT-20240801-002", date: "Aug 1, 2024", status: "In Production", statusColor: "text-gold", total: 1999, product: "Family Vacation Combo", color: "Navy", size: "Family Pack" },
  { id: "GT-20240720-003", date: "Jul 20, 2024", status: "Shipped", statusColor: "text-blue-500", total: 1299, product: "Mom & Son Duo", color: "White", size: "Duo Pack" },
];

export function AccountClient() {
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-ivory border border-border flex items-center justify-center mx-auto mb-6">
            <LogIn size={32} className="text-gold" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-3">
            Welcome to Germantees
          </h1>
          <p className="text-warm-grey mb-8">
            Sign in to view your orders, manage saved designs, and track deliveries.
          </p>
          <div className="space-y-3">
            <button className="w-full bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
              Sign In
            </button>
            <button className="w-full border border-border text-navy py-3 rounded-lg text-sm font-medium hover:bg-ivory transition-colors">
              Create Account
            </button>
          </div>
          <p className="text-xs text-warm-grey mt-6">
            Or continue shopping as a guest — <Link href="/" className="text-gold font-medium">explore collection</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-navy mb-8">
          My Account
        </h1>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                  activeTab === tab.key
                    ? "bg-navy text-white"
                    : "text-warm-grey hover:text-navy hover:bg-white"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div>
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-navy">Your Orders</h2>
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl border border-border p-5 hover:border-navy/20 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-navy">{order.product}</p>
                        <p className="text-xs text-warm-grey">{order.color} · {order.size}</p>
                      </div>
                      <span className={cn("text-xs font-semibold", order.statusColor)}>{order.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-warm-grey">
                      <span>Order {order.id}</span>
                      <span>{order.date}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-sm font-bold text-navy">₹{order.total}</span>
                      <Link href={`/track-order?id=${order.id}`} className="text-xs text-gold font-semibold flex items-center gap-1 hover:text-gold/80">
                        Track Order <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl border border-border p-12 text-center">
                <Heart size={32} className="mx-auto text-gold/40 mb-4" />
                <h2 className="text-lg font-semibold text-navy mb-2">Your wishlist is empty</h2>
                <p className="text-sm text-warm-grey mb-6">Save items you love and come back to them later.</p>
                <Link href="/kids" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                  Browse Collection
                </Link>
              </div>
            )}

            {activeTab === "designs" && (
              <div className="bg-white rounded-xl border border-border p-12 text-center">
                <Palette size={32} className="mx-auto text-gold/40 mb-4" />
                <h2 className="text-lg font-semibold text-navy mb-2">No saved designs yet</h2>
                <p className="text-sm text-warm-grey mb-6">Create a custom design and save it to order later.</p>
                <Link href="/design-studio" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                  <Sparkles size={16} /> Open Design Studio
                </Link>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy">Saved Addresses</h2>
                  <button className="text-sm text-gold font-semibold hover:text-gold/80">+ Add Address</button>
                </div>
                <div className="bg-white rounded-xl border border-border p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-navy mb-1">Home</p>
                      <p className="text-sm text-warm-grey">123 Example Street, Apt 4B</p>
                      <p className="text-sm text-warm-grey">Mumbai, Maharashtra — 400001</p>
                      <p className="text-sm text-warm-grey mt-1">+91 99999 99999</p>
                    </div>
                    <span className="text-xs bg-gold/10 text-gold font-semibold px-2 py-1 rounded">Default</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-xl border border-border p-6 space-y-4 max-w-lg">
                <h2 className="text-lg font-semibold text-navy">Profile</h2>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Name</label>
                  <input defaultValue="Priya Sharma" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Email</label>
                  <input defaultValue="priya@example.com" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy mb-1 block">Phone</label>
                  <input defaultValue="+91 99999 99999" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                </div>
                <button className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl border border-border p-12 text-center">
                <Bell size={32} className="mx-auto text-gold/40 mb-4" />
                <h2 className="text-lg font-semibold text-navy mb-2">No notifications</h2>
                <p className="text-sm text-warm-grey">Order updates and offers will appear here.</p>
              </div>
            )}

            {activeTab === "support" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-navy">Help & Support</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-border p-5 hover:border-navy/20 transition-colors">
                    <HelpCircle size={20} className="text-gold mb-2" />
                    <p className="text-sm font-semibold text-navy">WhatsApp Support</p>
                    <p className="text-xs text-warm-grey">Chat with us directly</p>
                  </a>
                  <Link href="/contact" className="bg-white rounded-xl border border-border p-5 hover:border-navy/20 transition-colors">
                    <HelpCircle size={20} className="text-gold mb-2" />
                    <p className="text-sm font-semibold text-navy">Contact Us</p>
                    <p className="text-xs text-warm-grey">Email or phone</p>
                  </Link>
                  <Link href="/size-guide" className="bg-white rounded-xl border border-border p-5 hover:border-navy/20 transition-colors">
                    <HelpCircle size={20} className="text-gold mb-2" />
                    <p className="text-sm font-semibold text-navy">Size Guide</p>
                    <p className="text-xs text-warm-grey">Find your perfect fit</p>
                  </Link>
                  <Link href="/care-guide" className="bg-white rounded-xl border border-border p-5 hover:border-navy/20 transition-colors">
                    <HelpCircle size={20} className="text-gold mb-2" />
                    <p className="text-sm font-semibold text-navy">Care Guide</p>
                    <p className="text-xs text-warm-grey">Keep your tees looking great</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
