"use client";

import { useState } from "react";
import { TSHIRT_COLORS } from "@/lib/constants";
import { X } from "lucide-react";

// Map color names to avatar image filenames
const COLOR_FRONT_MAP: Record<string, string> = {
  White: "/images/avatar/men_white_front.png",
  Black: "/images/avatar/men_black_front.png",
  Navy: "/images/avatar/men_navy_front.png",
  Red: "/images/avatar/men_red_front.png",
  Yellow: "/images/avatar/men_yellow_front.png",
  Pink: "/images/avatar/men_pink_front.png",
  Green: "/images/avatar/men_green_front.png",
  Blue: "/images/avatar/men_blue_front.png",
};

const COLOR_BACK_MAP: Record<string, string> = {
  White: "/images/avatar/men_white_back.png",
  Black: "/images/avatar/men_black_back.png",
  Navy: "/images/avatar/men_navy_back.png",
  Red: "/images/avatar/men_red_back.png",
  Yellow: "/images/avatar/men_yellow_back.png",
  Pink: "/images/avatar/men_pink_back.png",
  Green: "/images/avatar/men_green_back.png",
  Blue: "/images/avatar/men_blue_back.png",
};

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

interface MultiViewGridProps {
  graphics: DesignGraphic[];
  selectedGraphic: DesignGraphic | null;
  sizeCategory: "kids" | "men" | "women";
  side: "front" | "back";
}

export function MultiViewGrid({
  selectedGraphic,
  sizeCategory,
  side,
}: MultiViewGridProps) {
  const [previewColor, setPreviewColor] = useState<{ name: string; hex: string } | null>(null);

  const sizeLabel =
    sizeCategory === "kids"
      ? "Kids"
      : sizeCategory === "men"
      ? "Men"
      : "Women";

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-sm font-semibold text-navy mb-1">
        Multi-View Preview
      </h3>
      <p className="text-xs text-warm-grey mb-6">
        See your design across all available colours — {sizeLabel} sizing.
        Click any colour to enlarge.
      </p>

      {/* Large preview when a color is selected */}
      {previewColor && (
        <div className="mb-6 rounded-xl border border-border overflow-hidden bg-gray-100 relative">
          <button
            onClick={() => setPreviewColor(null)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-border flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <X size={16} className="text-navy" />
          </button>
          <div className="relative aspect-square max-h-[600px] mx-auto p-8">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={(side === "back" ? COLOR_BACK_MAP : COLOR_FRONT_MAP)[previewColor.name]}
                alt={`Model wearing ${previewColor.name} t-shirt`}
                className="w-full h-full object-contain max-w-md"
                draggable={false}
              />
              {/* Graphic overlay on chest */}
              {selectedGraphic && (
                <div
                  className="absolute"
                  style={{
                    top: `${selectedGraphic.y}%`,
                    left: `${selectedGraphic.x}%`,
                    transform: `translate(-50%, -50%) scale(${selectedGraphic.scale}) rotate(${selectedGraphic.rotation}deg)`,
                    maxWidth: "35%",
                    maxHeight: "40%",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedGraphic.src}
                    alt={selectedGraphic.name}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-3 border-t border-border bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: previewColor.hex }}
              />
              <span className="text-sm font-medium text-navy">{previewColor.name}</span>
            </div>
            <span className="text-xs text-warm-grey">{sizeLabel} sizing</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {TSHIRT_COLORS.map((color) => {
          const isSelected = previewColor?.hex === color.hex;
          const imageMap = side === "back" ? COLOR_BACK_MAP : COLOR_FRONT_MAP;
          const imageSrc = imageMap[color.name];

          return (
            <div
              key={color.name}
              onClick={() => setPreviewColor(isSelected ? null : color)}
              className={`rounded-xl border-2 overflow-hidden bg-gray-50 cursor-pointer transition-all hover:shadow-md ${
                isSelected
                  ? "border-navy ring-2 ring-navy/20 shadow-md"
                  : "border-border hover:border-navy/30"
              }`}
            >
              <div className="aspect-square relative overflow-hidden p-2">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={`${color.name} t-shirt`}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                  {/* Graphic overlay on chest */}
                  {selectedGraphic && (
                    <div
                      className="absolute"
                      style={{
                        top: `${selectedGraphic.y}%`,
                        left: `${selectedGraphic.x}%`,
                        transform: `translate(-50%, -50%) scale(${selectedGraphic.scale}) rotate(${selectedGraphic.rotation}deg)`,
                        maxWidth: "35%",
                        maxHeight: "40%",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedGraphic.src}
                        alt={selectedGraphic.name}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="px-3 py-2 border-t border-border bg-white">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-medium text-navy">
                    {color.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!selectedGraphic && (
        <div className="text-center py-12 text-warm-grey">
          <p className="text-sm">Upload a design to see it on every colour</p>
        </div>
      )}
    </div>
  );
}
