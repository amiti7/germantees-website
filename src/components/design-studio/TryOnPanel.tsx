"use client";

import { Upload, Camera, Share2, Download } from "lucide-react";

interface DesignGraphic {
  id: string;
  src: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  quality: "excellent" | "good" | "low";
}

interface TryOnPanelProps {
  tryOnPhoto: string | null;
  onUpload: (file: File) => void;
  selectedColor: { name: string; hex: string };
  graphic: DesignGraphic | null;
}

export function TryOnPanel({
  tryOnPhoto,
  onUpload,
  selectedColor,
  graphic,
}: TryOnPanelProps) {
  if (!tryOnPhoto) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 sm:p-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-ivory border border-border flex items-center justify-center mx-auto mb-6">
            <Camera size={32} className="text-gold" />
          </div>
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy mb-3">
            Virtual Try-On
          </h3>
          <p className="text-warm-grey mb-6">
            Upload a photo of yourself or your child to see how the T-shirt with
            your design would look. All processing happens on your device — your
            photos stay private.
          </p>
          <label className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-navy/90 transition-colors">
            <Upload size={16} />
            Upload Photo
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onUpload(file);
              }}
            />
          </label>
          <p className="text-xs text-warm-grey/60 mt-4">
            Works best with an upper-body photo facing forward
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      {/* Try-on preview */}
      <div className="relative aspect-[3/4] max-h-[600px] mx-auto bg-ivory">
        {/* User photo as background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tryOnPhoto}
          alt="Your photo"
          className="w-full h-full object-contain"
        />

        {/* T-shirt overlay on torso area */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="relative"
            style={{ width: "50%", marginTop: "5%" }}
          >
            {/* Semi-transparent T-shirt overlay */}
            <svg
              viewBox="0 0 400 480"
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.85 }}
            >
              <path
                d="M100,60 L60,80 L20,130 L60,150 L80,120 L80,440 L320,440 L320,120 L340,150 L380,130 L340,80 L300,60 L270,80 C250,95 150,95 130,80 Z"
                fill={selectedColor.hex}
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="1"
              />
              <path
                d="M130,80 C150,95 250,95 270,80"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
              />
            </svg>

            {/* Graphic on the T-shirt */}
            {graphic && (
              <div
                className="absolute"
                style={{
                  left: `${graphic.x}%`,
                  top: `${graphic.y}%`,
                  transform: `translate(-50%, -50%) scale(${graphic.scale * 0.5})`,
                  maxWidth: "30%",
                  maxHeight: "35%",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={graphic.src}
                  alt={graphic.name}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Overlay info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-border flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-navy">
                Virtual Try-On Preview
              </p>
              <p className="text-xs text-warm-grey">
                Adjust the T-shirt position for a better fit
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-ivory border border-border text-navy" title="Share">
                <Share2 size={14} />
              </button>
              <button className="p-2 rounded-lg hover:bg-ivory border border-border text-navy" title="Download">
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-border bg-ivory/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-full border border-border"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span className="text-sm text-navy font-medium">
              {selectedColor.name}
            </span>
            {graphic && (
              <>
                <span className="text-warm-grey">·</span>
                <span className="text-xs text-warm-grey">{graphic.name}</span>
              </>
            )}
          </div>
          <label className="text-xs text-gold font-semibold cursor-pointer hover:text-gold/80">
            Change Photo
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onUpload(file);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
