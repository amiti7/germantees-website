import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GERMANTEES — Premium Personalized Apparel",
    template: "%s | GERMANTEES",
  },
  description:
    "Premium personalized apparel for kids, families, and the moments you'll remember. Inspired by German precision. Made for Indian life.",
  keywords: [
    "personalized t-shirts",
    "kids t-shirts",
    "family matching tees",
    "birthday t-shirts",
    "custom apparel",
    "premium kids clothing",
    "germantees",
  ],
  metadataBase: new URL("https://germantees.com"),
  openGraph: {
    title: "GERMANTEES — Premium Personalized Apparel",
    description: "Inspired by German precision. Made for Indian life.",
    url: "https://germantees.com",
    siteName: "GERMANTEES",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GERMANTEES — Premium Personalized Apparel",
    description: "Inspired by German precision. Made for Indian life.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/Germantees_Logo_Assets/favicon_32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/Germantees_Logo_Assets/favicon_16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/Germantees_Logo_Assets/favicon_256x256.png",
    other: [
      { rel: "icon", url: "/images/Germantees_Logo_Assets/favicon_48x48.png", sizes: "48x48" },
      { rel: "icon", url: "/images/Germantees_Logo_Assets/favicon_64x64.png", sizes: "64x64" },
      { rel: "icon", url: "/images/Germantees_Logo_Assets/favicon_128x128.png", sizes: "128x128" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
