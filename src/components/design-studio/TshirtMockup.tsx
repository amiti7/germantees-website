"use client";

import { useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

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
}

interface SizeData {
  label: string;
  chest: number;
  length: number;
}

interface TshirtMockupProps {
  color: string;
  colorName: string;
  graphic: DesignGraphic | null;
  side: "front" | "back";
  sizeCategory: "boy" | "girl" | "men" | "women";
  texts?: DesignText[];
  onGraphicMove: (x: number, y: number) => void;
  onTextMove?: (id: string, x: number, y: number) => void;
  sizeData?: SizeData | null;
}

export function TshirtMockup({
  colorName,
  graphic,
  side,
  sizeCategory,
  texts = [],
  onGraphicMove,
  onTextMove,
}: TshirtMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragTarget, setDragTarget] = useState<{ type: "graphic" | "text"; id?: string } | null>(null);

  const imageSrc = getAvatarImage(sizeCategory, colorName, side);

  const handleGraphicPointerDown = useCallback(() => {
    setDragTarget({ type: "graphic" });
  }, []);

  const handleTextPointerDown = useCallback((id: string) => {
    setDragTarget({ type: "text", id });
  }, []);

  const handlePointerUp = useCallback(() => {
    setDragTarget(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragTarget || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100));
      if (dragTarget.type === "graphic" && graphic) {
        onGraphicMove(x, y);
      } else if (dragTarget.type === "text" && dragTarget.id && onTextMove) {
        onTextMove(dragTarget.id, x, y);
      }
    },
    [dragTarget, graphic, onGraphicMove, onTextMove]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Model photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={`Model wearing ${colorName} t-shirt - ${side}`}
        className="w-full h-full object-contain max-w-md"
        draggable={false}
        onError={(e) => {
          const fallback = getFallbackImage(sizeCategory, colorName, side);
          if ((e.target as HTMLImageElement).src !== fallback) {
            (e.target as HTMLImageElement).src = fallback;
          }
        }}
      />

      {/* Side label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <span className="text-[10px] uppercase tracking-[3px] text-warm-grey/40 font-medium">
          {side}
        </span>
      </div>

      {/* Text overlays */}
      {texts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "absolute text-center cursor-grab",
            dragTarget?.type === "text" && dragTarget.id === t.id && "cursor-grabbing"
          )}
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
            transform: "translate(-50%, -50%)",
            maxWidth: "60%",
          }}
          onPointerDown={(e) => { e.stopPropagation(); handleTextPointerDown(t.id); }}
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
      {graphic && (
        <div
          className={cn(
            "absolute cursor-grab",
            dragTarget?.type === "graphic" && "cursor-grabbing"
          )}
          style={{
            left: `${graphic.x}%`,
            top: `${graphic.y}%`,
            transform: `translate(-50%, -50%) scale(${graphic.scale}) rotate(${graphic.rotation}deg)`,
            maxWidth: "35%",
            maxHeight: "40%",
          }}
          onPointerDown={handleGraphicPointerDown}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={graphic.src}
            alt={graphic.name}
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
          {/* Selection border */}
          <div className="absolute inset-0 border-2 border-dashed border-gold/40 rounded pointer-events-none" />
        </div>
      )}
    </div>
  );
}
