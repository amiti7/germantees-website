import Link from "next/link";
import Image from "next/image";
import { Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <Image
          src="/images/Germantees_Logo_Assets/03_emblem_only.png"
          alt="Germantees"
          width={64}
          height={64}
          className="mx-auto mb-6 opacity-30"
        />
        <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          Page Not Found
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-6xl font-bold text-navy mb-4">
          404
        </h1>
        <p className="text-warm-grey mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-navy text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/design-studio"
            className="inline-flex items-center justify-center gap-2 border border-gold text-gold px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gold hover:text-white transition-colors"
          >
            <Sparkles size={16} />
            Create a Tee
          </Link>
        </div>
      </div>
    </div>
  );
}
