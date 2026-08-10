import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <Image
            src="/images/Germantees_Logo_Assets/03_emblem_only.png"
            alt="Loading"
            width={48}
            height={48}
            className="w-12 h-12 object-contain animate-pulse"
          />
        </div>
        <p className="text-xs text-warm-grey tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}
