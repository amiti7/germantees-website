"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { TSHIRT_COLORS, SIZE_CHART } from "@/lib/constants";
import { TshirtMockup } from "./TshirtMockup";
import { GraphicUploader } from "./GraphicUploader";
import { TryOnPanel } from "./TryOnPanel";
import { MultiViewGrid } from "./MultiViewGrid";
import {
  Upload,
  Camera,
  Grid3x3,
  ShoppingCart,
  Download,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Shirt,
  User,
  Layers,
} from "lucide-react";

type SizeCategory = "kids" | "men" | "women";
type ViewMode = "single" | "multiview" | "tryon";
type TshirtSide = "front" | "back";

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

export function DesignStudioClient() {
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(TSHIRT_COLORS[0]);
  const [sizeCategory, setSizeCategory] = useState<SizeCategory>("kids");
  const [selectedSize, setSelectedSize] = useState<string>(SIZE_CHART.kids[0].label);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [side, setSide] = useState<TshirtSide>("front");
  const [graphics, setGraphics] = useState<DesignGraphic[]>([]);
  const [selectedGraphicId, setSelectedGraphicId] = useState<string | null>(null);
  const [tryOnPhoto, setTryOnPhoto] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedGraphic = graphics.find((g) => g.id === selectedGraphicId) || null;

  const handleGraphicUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const dpi = Math.max(img.width, img.height) / 10;
        let quality: "excellent" | "good" | "low" = "excellent";
        if (dpi < 150) quality = "low";
        else if (dpi < 300) quality = "good";

        const newGraphic: DesignGraphic = {
          id: Date.now().toString(),
          src: e.target?.result as string,
          name: file.name,
          width: img.width,
          height: img.height,
          x: 50,
          y: 50,
          scale: 1,
          rotation: 0,
          quality,
        };
        setGraphics((prev) => [...prev, newGraphic]);
        setSelectedGraphicId(newGraphic.id);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleTryOnUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setTryOnPhoto(e.target?.result as string);
      setViewMode("tryon");
    };
    reader.readAsDataURL(file);
  }, []);

  const updateGraphic = useCallback(
    (id: string, updates: Partial<DesignGraphic>) => {
      setGraphics((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
      );
    },
    []
  );

  const removeGraphic = useCallback(
    (id: string) => {
      setGraphics((prev) => prev.filter((g) => g.id !== id));
      if (selectedGraphicId === id) {
        setSelectedGraphicId(null);
      }
    },
    [selectedGraphicId]
  );

  const sizes = SIZE_CHART[sizeCategory];
  const selectedSizeData = sizes.find((s) => s.label === selectedSize);

  const price = sizeCategory === "kids" ? 699 : 899;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-navy">
                Design Studio
              </h1>
              <p className="text-sm text-warm-grey mt-1">
                Upload your designs. Preview on every colour and size. See it on you.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-2xl font-bold text-navy">₹{price}</span>
              <button className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* LEFT: Canvas area */}
          <div className="space-y-4">
            {/* View mode tabs */}
            <div className="flex items-center gap-2 bg-white rounded-xl border border-border p-1.5">
              <button
                onClick={() => setViewMode("single")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  viewMode === "single"
                    ? "bg-navy text-white"
                    : "text-warm-grey hover:text-navy hover:bg-ivory"
                )}
              >
                <Shirt size={16} />
                Single View
              </button>
              <button
                onClick={() => setViewMode("multiview")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  viewMode === "multiview"
                    ? "bg-navy text-white"
                    : "text-warm-grey hover:text-navy hover:bg-ivory"
                )}
              >
                <Grid3x3 size={16} />
                Multi-View
              </button>
              <button
                onClick={() => setViewMode("tryon")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  viewMode === "tryon"
                    ? "bg-navy text-white"
                    : "text-warm-grey hover:text-navy hover:bg-ivory"
                )}
              >
                <User size={16} />
                Virtual Try-On
              </button>
            </div>

            {/* Canvas */}
            {viewMode === "single" && (
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                {/* Front/Back toggle */}
                <div className="flex items-center justify-center gap-2 p-3 border-b border-border">
                  <button
                    onClick={() => setSide("front")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                      side === "front"
                        ? "bg-navy text-white"
                        : "text-warm-grey hover:text-navy"
                    )}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => setSide("back")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                      side === "back"
                        ? "bg-navy text-white"
                        : "text-warm-grey hover:text-navy"
                    )}
                  >
                    Back
                  </button>
                </div>

                {/* T-shirt mockup */}
                <div className="relative aspect-square max-h-[600px] mx-auto p-8">
                  <TshirtMockup
                    color={selectedColor.hex}
                    graphic={selectedGraphic}
                    side={side}
                    onGraphicMove={(x: number, y: number) =>
                      selectedGraphicId &&
                      updateGraphic(selectedGraphicId, { x, y })
                    }
                    sizeData={selectedSizeData}
                  />
                </div>

                {/* Canvas controls */}
                {selectedGraphic && (
                  <div className="flex items-center justify-center gap-3 p-3 border-t border-border bg-ivory/50">
                    <button
                      onClick={() =>
                        updateGraphic(selectedGraphic.id, {
                          scale: Math.min(selectedGraphic.scale + 0.1, 3),
                        })
                      }
                      className="p-2 rounded-lg hover:bg-white border border-border text-navy"
                      title="Zoom in"
                    >
                      <ZoomIn size={16} />
                    </button>
                    <button
                      onClick={() =>
                        updateGraphic(selectedGraphic.id, {
                          scale: Math.max(selectedGraphic.scale - 0.1, 0.2),
                        })
                      }
                      className="p-2 rounded-lg hover:bg-white border border-border text-navy"
                      title="Zoom out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <button
                      onClick={() =>
                        updateGraphic(selectedGraphic.id, {
                          rotation: (selectedGraphic.rotation - 15 + 360) % 360,
                        })
                      }
                      className="p-2 rounded-lg hover:bg-white border border-border text-navy"
                      title="Rotate anticlockwise"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={() =>
                        updateGraphic(selectedGraphic.id, {
                          rotation: (selectedGraphic.rotation + 15) % 360,
                        })
                      }
                      className="p-2 rounded-lg hover:bg-white border border-border text-navy"
                      title="Rotate clockwise"
                    >
                      <RotateCw size={16} />
                    </button>
                    <button
                      onClick={() =>
                        updateGraphic(selectedGraphic.id, {
                          x: 50,
                          y: 50,
                          scale: 1,
                          rotation: 0,
                        })
                      }
                      className="p-2 rounded-lg hover:bg-white border border-border text-navy"
                      title="Reset position"
                    >
                      <Move size={16} />
                    </button>
                    <div className="w-px h-6 bg-border" />
                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          selectedGraphic.quality === "excellent"
                            ? "bg-success"
                            : selectedGraphic.quality === "good"
                            ? "bg-gold"
                            : "bg-error"
                        )}
                      />
                      <span className="text-xs text-warm-grey capitalize">
                        {selectedGraphic.quality} quality
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {viewMode === "multiview" && (
              <MultiViewGrid
                graphics={graphics}
                selectedGraphic={selectedGraphic}
                sizeCategory={sizeCategory}
              />
            )}

            {viewMode === "tryon" && (
              <TryOnPanel
                tryOnPhoto={tryOnPhoto}
                onUpload={handleTryOnUpload}
                selectedColor={selectedColor}
                graphic={selectedGraphic}
              />
            )}
          </div>

          {/* RIGHT: Controls panel */}
          <div className="space-y-4">
            {/* Upload graphic */}
            <GraphicUploader onUpload={handleGraphicUpload} />

            {/* Uploaded graphics list */}
            {graphics.length > 0 && (
              <div className="bg-white rounded-xl border border-border p-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 flex items-center gap-2">
                  <Layers size={14} />
                  Your Designs
                </h3>
                <div className="space-y-2">
                  {graphics.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGraphicId(g.id)}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                        selectedGraphicId === g.id
                          ? "bg-navy/5 border border-navy/20"
                          : "hover:bg-ivory border border-transparent"
                      )}
                    >
                      <div className="w-10 h-10 bg-ivory rounded border border-border overflow-hidden flex-shrink-0">
                        <img
                          src={g.src}
                          alt={g.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-navy truncate">
                          {g.name}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              g.quality === "excellent"
                                ? "bg-success"
                                : g.quality === "good"
                                ? "bg-gold"
                                : "bg-error"
                            )}
                          />
                          <span className="text-xs text-warm-grey capitalize">
                            {g.quality}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGraphic(g.id);
                        }}
                        className="text-warm-grey hover:text-error text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* T-shirt colour */}
            <div className="bg-white rounded-xl border border-border p-4">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
                T-Shirt Colour
              </h3>
              <div className="flex flex-wrap gap-2">
                {TSHIRT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-9 h-9 rounded-lg border-2 transition-all",
                      selectedColor.name === color.name
                        ? "border-navy scale-110 shadow-sm"
                        : "border-border hover:border-navy/30"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-xs text-warm-grey mt-2">{selectedColor.name}</p>
            </div>

            {/* Size category */}
            <div className="bg-white rounded-xl border border-border p-4">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
                Size Category
              </h3>
              <div className="flex gap-2 mb-3">
                {(["kids", "men", "women"] as SizeCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSizeCategory(cat);
                      setSelectedSize(SIZE_CHART[cat][0].label);
                    }}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                      sizeCategory === cat
                        ? "bg-navy text-white"
                        : "bg-ivory text-warm-grey hover:text-navy"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s.label)}
                    className={cn(
                      "px-3 py-2 rounded-md text-xs font-medium border transition-colors flex flex-col items-center gap-0.5",
                      selectedSize === s.label
                        ? "border-navy bg-navy text-white"
                        : "border-border text-warm-grey hover:border-navy/30"
                    )}
                  >
                    <span>{s.label}</span>
                    <span className={cn("text-[10px]", selectedSize === s.label ? "text-white/70" : "text-warm-grey/60")}>
                      {s.chest}&times;{s.length}&quot;
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual try-on upload */}
            <div className="bg-white rounded-xl border border-border p-4">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 flex items-center gap-2">
                <Camera size={14} />
                Virtual Try-On
              </h3>
              <p className="text-xs text-warm-grey mb-3">
                Upload a photo to see how the T-shirt looks on you or your child.
              </p>
              <label className="flex items-center justify-center gap-2 bg-ivory border border-dashed border-border rounded-lg p-3 cursor-pointer hover:border-navy/30 transition-colors">
                <Upload size={16} className="text-warm-grey" />
                <span className="text-sm text-navy font-medium">Upload Photo</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleTryOnUpload(file);
                  }}
                />
              </label>
              {tryOnPhoto && (
                <p className="text-xs text-success mt-2">Photo uploaded — switch to Virtual Try-On tab</p>
              )}
            </div>

            {/* Download + Cart (actions) */}
            <div className="space-y-2">
              <button className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                <ShoppingCart size={16} />
                Add to Cart — ₹{price}
              </button>
              <button className="w-full inline-flex items-center justify-center gap-2 border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-ivory transition-colors">
                <Download size={16} />
                Download Mockup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-3 lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-lg font-bold text-navy">₹{price}</span>
            <p className="text-xs text-warm-grey">
              {selectedColor.name} · {selectedSize}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
