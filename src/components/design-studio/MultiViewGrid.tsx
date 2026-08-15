"use client";

import { useState } from "react";
import { TSHIRT_COLORS } from "@/lib/constants";
import { X } from "lucide-react";

function getAvatarImage(category: string, color: string, side: string): string {
  const colorLower = color.toLowerCase();
  if (category === "boy") {
    return `/images/avatar/boy_2_5_${colorLower}_${side}.png`;
  }
  if (category === "girl") {
    return `/images/avatar/girl_2_5_${colorLower}_${side}.png`;
  }
  const genderPrefix = category === "women" ? "women" : "men";
  return `/images/avatar/${genderPrefix}_${colorLower}_${side}.png`;
}

function getFallbackImage(category: string, color: string, side: string): string {
  const colorLower = color.toLowerCase();
  if (category === "boy") {
    return `/images/avatar/men_${colorLower}_${side}.png`;
  }
  if (category === "girl") {
    return `/images/avatar/women_${colorLower}_${side}.png`;
  }
  return `/images/avatar/men_${colorLower}_${side}.png`;
}

interface DesignText {
  id: string;
  text: string;
  subtext: string;
  font: string;
  color: string;
  fontSize: number;
  subtextFontSize: number;
  x: number;
  y: number;
  side: "front" | "back";
}

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
  side: "front" | "back";
}

interface MultiViewGridProps {
  graphics: DesignGraphic[];
  texts?: DesignText[];
  sizeCategory: "boy" | "girl" | "men" | "women";
  side: "front" | "back";
}

export function MultiViewGrid({
  graphics,
  texts = [],
  sizeCategory,
  side,
}: MultiViewGridProps) {
  const [previewColor, setPreviewColor] = useState<{ name: string; hex: string } | null>(null);
  const [localSide, setLocalSide] = useState<"front" | "back">(side);

  const sideGraphic = graphics.filter((g) => g.side === localSide)[0] || null;
  const sideTexts = texts.filter((t) => t.side === localSide);

  const sizeLabel =
    sizeCategory === "boy"
      ? "Boy"
      : sizeCategory === "girl"
      ? "Girl"
      : sizeCategory === "men"
      ? "Men"
      : "Women";

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-navy">
          Multi-View Preview
        </h3>
        <div className="flex items-center gap-1 bg-ivory rounded-lg p-1">
          <button
            onClick={() => setLocalSide("front")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              localSide === "front"
                ? "bg-navy text-white"
                : "text-warm-grey hover:text-navy"
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setLocalSide("back")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              localSide === "back"
                ? "bg-navy text-white"
                : "text-warm-grey hover:text-navy"
            }`}
          >
            Back
          </button>
        </div>
      </div>
      <p className="text-xs text-warm-grey mb-6">
        See your design across all available colours — {sizeLabel} sizing.
        Click any colour to enlarge.
      </p>

      {/* Large preview when a color is selected */}
      {previewColor && (
        <div className="mb-6 rounded-xl border border-border overflow-hidden relative" style={{ backgroundColor: "#ffffff" }}>
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
                src={getAvatarImage(sizeCategory, previewColor.name, localSide)}
                alt={`Model wearing ${previewColor.name} t-shirt`}
                className="w-full h-full object-contain max-w-md"
                draggable={false}
                onError={(e) => {
                  const fallback = getFallbackImage(sizeCategory, previewColor.name, localSide);
                  if ((e.target as HTMLImageElement).src !== fallback) {
                    (e.target as HTMLImageElement).src = fallback;
                  }
                }}
              />
              {/* Text overlays */}
              {sideTexts.map((t) => (
                <div
                  key={t.id}
                  className="absolute pointer-events-none text-center"
                  style={{
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    transform: "translate(-50%, -50%)",
                    maxWidth: "60%",
                  }}
                >
                  {t.text && (
                    <div
                      style={{
                        fontFamily: t.font,
                        fontSize: `${t.fontSize}px`,
                        color: t.color,
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        textShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      {t.text}
                    </div>
                  )}
                  {t.subtext && (
                    <div
                      style={{
                        fontFamily: t.font,
                        fontSize: `${t.subtextFontSize}px`,
                        color: t.color,
                        lineHeight: 1.3,
                        marginTop: "2px",
                        textShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      {t.subtext}
                    </div>
                  )}
                </div>
              ))}
              {/* Graphic overlay on chest */}
              {sideGraphic && (
                <div
                  className="absolute"
                  style={{
                    top: `${sideGraphic.y}%`,
                    left: `${sideGraphic.x}%`,
                    transform: `translate(-50%, -50%) scale(${sideGraphic.scale}) rotate(${sideGraphic.rotation}deg)`,
                    maxWidth: "35%",
                    maxHeight: "40%",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sideGraphic.src}
                    alt={sideGraphic.name}
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
          const imageSrc = getAvatarImage(sizeCategory, color.name, localSide);

          return (
            <div
              key={color.name}
              onClick={() => setPreviewColor(isSelected ? null : color)}
              className={`rounded-xl border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                isSelected
                  ? "border-navy ring-2 ring-navy/20 shadow-md"
                  : "border-border hover:border-navy/30"
              }`}
            >
              <div className="aspect-square relative overflow-hidden p-2" style={{ backgroundColor: "#ffffff" }}>
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={`${color.name} t-shirt`}
                    className="w-full h-full object-contain"
                    draggable={false}
                    onError={(e) => {
                      const fallback = getFallbackImage(sizeCategory, color.name, localSide);
                      if ((e.target as HTMLImageElement).src !== fallback) {
                        (e.target as HTMLImageElement).src = fallback;
                      }
                    }}
                  />
                  {/* Text overlays */}
                  {sideTexts.map((t) => (
                    <div
                      key={t.id}
                      className="absolute pointer-events-none text-center"
                      style={{
                        left: `${t.x}%`,
                        top: `${t.y}%`,
                        transform: "translate(-50%, -50%)",
                        maxWidth: "60%",
                      }}
                    >
                      {t.text && (
                        <div
                          style={{
                            fontFamily: t.font,
                            fontSize: `${t.fontSize * 0.4}px`,
                            color: t.color,
                            fontWeight: "bold",
                            lineHeight: 1.2,
                          }}
                        >
                          {t.text}
                        </div>
                      )}
                      {t.subtext && (
                        <div
                          style={{
                            fontFamily: t.font,
                            fontSize: `${t.subtextFontSize * 0.4}px`,
                            color: t.color,
                            lineHeight: 1.3,
                            marginTop: "1px",
                          }}
                        >
                          {t.subtext}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Graphic overlay on chest */}
                  {sideGraphic && (
                    <div
                      className="absolute"
                      style={{
                        top: `${sideGraphic.y}%`,
                        left: `${sideGraphic.x}%`,
                        transform: `translate(-50%, -50%) scale(${sideGraphic.scale}) rotate(${sideGraphic.rotation}deg)`,
                        maxWidth: "35%",
                        maxHeight: "40%",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sideGraphic.src}
                        alt={sideGraphic.name}
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

      {!sideGraphic && sideTexts.length === 0 && (
        <div className="text-center py-12 text-warm-grey">
          <p className="text-sm">Upload a design or add text to see it on every colour</p>
        </div>
      )}
    </div>
  );
}
