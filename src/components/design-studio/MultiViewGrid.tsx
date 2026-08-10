"use client";

import { TSHIRT_COLORS } from "@/lib/constants";

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
}

export function MultiViewGrid({
  selectedGraphic,
  sizeCategory,
}: MultiViewGridProps) {
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
        See your design across all available colours — {sizeLabel} sizing
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {TSHIRT_COLORS.map((color) => {
          const isLight =
            color.hex === "#FFFFFF" ||
            color.hex === "#FACC15" ||
            color.hex === "#F472B6";

          return (
            <div
              key={color.name}
              className="rounded-xl border border-border overflow-hidden bg-ivory"
            >
              <div className="aspect-square relative flex items-center justify-center p-4">
                {/* Mini T-shirt SVG */}
                <svg
                  viewBox="0 0 400 480"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100,60 L60,80 L20,130 L60,150 L80,120 L80,440 L320,440 L320,120 L340,150 L380,130 L340,80 L300,60 L270,80 C250,95 150,95 130,80 Z"
                    fill={color.hex}
                    stroke={
                      isLight
                        ? "#E5E2D9"
                        : "rgba(255,255,255,0.1)"
                    }
                    strokeWidth="1.5"
                  />
                  <path
                    d="M130,80 C150,95 250,95 270,80"
                    fill="none"
                    stroke={
                      isLight
                        ? "#E5E2D9"
                        : "rgba(255,255,255,0.15)"
                    }
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Graphic overlay */}
                {selectedGraphic && (
                  <div
                    className="absolute"
                    style={{
                      left: `${selectedGraphic.x}%`,
                      top: `${selectedGraphic.y}%`,
                      transform: `translate(-50%, -50%) scale(${selectedGraphic.scale * 0.6})`,
                      maxWidth: "30%",
                      maxHeight: "35%",
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
