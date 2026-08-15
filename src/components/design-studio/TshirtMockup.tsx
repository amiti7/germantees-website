"use client";

import { useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

function getAvatarImage(gender: string, color: string, side: string): string {
  const genderPrefix = gender === "women" ? "women" : "men";
  const colorLower = color.toLowerCase();
  return `/images/avatar/${genderPrefix}_${colorLower}_${side}.png`;
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
  sizeCategory: "kids" | "men" | "women";
  onGraphicMove: (x: number, y: number) => void;
  sizeData?: SizeData | null;
}

export function TshirtMockup({
  colorName,
  graphic,
  side,
  sizeCategory,
  onGraphicMove,
}: TshirtMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const imageSrc = getAvatarImage(sizeCategory, colorName, side);

  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !containerRef.current || !graphic) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onGraphicMove(
        Math.max(10, Math.min(90, x)),
        Math.max(10, Math.min(90, y))
      );
    },
    [isDragging, graphic, onGraphicMove]
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
      />

      {/* Side label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <span className="text-[10px] uppercase tracking-[3px] text-warm-grey/40 font-medium">
          {side}
        </span>
      </div>

      {/* Graphic overlay on chest */}
      {graphic && (
        <div
          className={cn(
            "absolute cursor-grab",
            isDragging && "cursor-grabbing"
          )}
          style={{
            left: `${graphic.x}%`,
            top: `${graphic.y}%`,
            transform: `translate(-50%, -50%) scale(${graphic.scale}) rotate(${graphic.rotation}deg)`,
            maxWidth: "35%",
            maxHeight: "40%",
          }}
          onPointerDown={handlePointerDown}
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
