"use client";

import { useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

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
  graphic: DesignGraphic | null;
  side: "front" | "back";
  onGraphicMove: (x: number, y: number) => void;
  sizeData?: SizeData | null;
}

export function TshirtMockup({
  color,
  graphic,
  side,
  onGraphicMove,
  sizeData,
}: TshirtMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const isLight =
    color === "#FFFFFF" || color === "#FACC15" || color === "#F472B6";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* T-shirt shape SVG */}
      <svg
        viewBox="0 0 400 480"
        className="w-full h-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* T-shirt body */}
        <path
          d="M100,60 L60,80 L20,130 L60,150 L80,120 L80,440 L320,440 L320,120 L340,150 L380,130 L340,80 L300,60 L270,80 C250,95 150,95 130,80 Z"
          fill={color}
          stroke={isLight ? "#E5E2D9" : "rgba(255,255,255,0.1)"}
          strokeWidth="1.5"
        />

        {/* Collar */}
        <path
          d="M130,80 C150,95 250,95 270,80"
          fill="none"
          stroke={isLight ? "#E5E2D9" : "rgba(255,255,255,0.15)"}
          strokeWidth="1.5"
        />

        {/* Print area boundary (dashed) */}
        <rect
          x="120"
          y="120"
          width="160"
          height="200"
          fill="none"
          stroke={isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}
          strokeWidth="1"
          strokeDasharray="4 4"
          rx="4"
        />

        {/* Side label */}
        <text
          x="200"
          y="425"
          textAnchor="middle"
          className="text-xs uppercase"
          fill={isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"}
          fontSize="10"
          letterSpacing="3"
        >
          {side}
        </text>

        {/* Size dimension annotations */}
        {sizeData && (
          <>
            {/* Chest width line */}
            <line x1="80" y1="135" x2="320" y2="135" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" strokeDasharray="3 2" />
            <line x1="80" y1="130" x2="80" y2="140" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
            <line x1="320" y1="130" x2="320" y2="140" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
            <rect x="160" y="125" width="80" height="18" rx="4" fill={isLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)"} />
            <text x="200" y="138" textAnchor="middle" fill={isLight ? "#111827" : "#FFFFFF"} fontSize="10" fontWeight="600">
              {sizeData.chest}&quot; chest
            </text>

            {/* Length line */}
            <line x1="335" y1="80" x2="335" y2="440" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" strokeDasharray="3 2" />
            <line x1="330" y1="80" x2="340" y2="80" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
            <line x1="330" y1="440" x2="340" y2="440" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
            <rect x="340" y="250" width="55" height="18" rx="4" fill={isLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)"} />
            <text x="367" y="263" textAnchor="middle" fill={isLight ? "#111827" : "#FFFFFF"} fontSize="10" fontWeight="600">
              {sizeData.length}&quot; long
            </text>
          </>
        )}
      </svg>

      {/* Graphic overlay inside print area */}
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
