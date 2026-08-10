"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { TSHIRT_COLORS, SIZE_CHART } from "@/lib/constants";
import {
  Shirt,
  Upload,
  Type,
  Eye,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  RotateCcw,
  RotateCw,
} from "lucide-react";

type Step = "garment" | "design" | "text" | "preview";
type SizeCategory = "kids" | "men" | "women";

const STEPS: { key: Step; label: string; icon: React.ElementType }[] = [
  { key: "garment", label: "Garment", icon: Shirt },
  { key: "design", label: "Design", icon: Upload },
  { key: "text", label: "Text", icon: Type },
  { key: "preview", label: "Preview", icon: Eye },
];

const FONT_OPTIONS = [
  "Inter",
  "Playfair Display",
  "Comic Sans MS",
  "Georgia",
  "Arial Black",
  "Courier New",
];

const TEXT_COLORS = [
  "#111827", "#FFFFFF", "#C9A45C", "#FF6B6B", "#16A34A", "#3B82F6", "#F472B6", "#FACC15",
];

export function CustomizerClient() {
  const [step, setStep] = useState<Step>("garment");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(TSHIRT_COLORS[0]);
  const [sizeCategory, setSizeCategory] = useState<SizeCategory>("kids");
  const [selectedSize, setSelectedSize] = useState<string>(SIZE_CHART.kids[0].label);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [frontScale, setFrontScale] = useState(1);
  const [backScale, setBackScale] = useState(1);
  const [frontPos, setFrontPos] = useState({ x: 50, y: 45 });
  const [backPos, setBackPos] = useState({ x: 50, y: 45 });
  const [frontRotation, setFrontRotation] = useState(0);
  const [backRotation, setBackRotation] = useState(0);
  const isDragging = useRef(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [textLine1, setTextLine1] = useState("");
  const [textLine2, setTextLine2] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [textColor, setTextColor] = useState(TEXT_COLORS[0]);
  const [side, setSide] = useState<"front" | "back">("front");

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const sizes = SIZE_CHART[sizeCategory];
  const price = sizeCategory === "kids" ? 699 : 899;
  const selectedSizeData = sizes.find((s) => s.label === selectedSize);

  const currentImage = side === "front" ? frontImage : backImage;
  const currentScale = side === "front" ? frontScale : backScale;
  const setCurrentImage = side === "front" ? setFrontImage : setBackImage;
  const setCurrentScale = side === "front" ? setFrontScale : setBackScale;
  const currentPos = side === "front" ? frontPos : backPos;
  const setCurrentPos = side === "front" ? setFrontPos : setBackPos;
  const currentRotation = side === "front" ? frontRotation : backRotation;
  const setCurrentRotation = side === "front" ? setFrontRotation : setBackRotation;

  // Print zone bounds (percentage of the preview container)
  const ZONE = { minX: 30, maxX: 70, minY: 25, maxY: 67 };

  const clampPos = (x: number, y: number) => ({
    x: Math.max(ZONE.minX, Math.min(ZONE.maxX, x)),
    y: Math.max(ZONE.minY, Math.min(ZONE.maxY, y)),
  });

  const getPointerPercent = (e: React.PointerEvent | PointerEvent) => {
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!currentImage) return;
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const pt = getPointerPercent(e);
    if (pt) setCurrentPos(clampPos(pt.x, pt.y));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (side === "front") setFrontImage(e.target?.result as string);
      else setBackImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [side]);

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1].key);
  };
  const goPrev = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1].key);
  };

  const isLight =
    selectedColor.hex === "#FFFFFF" ||
    selectedColor.hex === "#FACC15" ||
    selectedColor.hex === "#F472B6";

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-navy">
                Create Your T-Shirt
              </h1>
              <p className="text-xs text-warm-grey mt-0.5">
                Step {stepIndex + 1} of {STEPS.length}: {STEPS[stepIndex].label}
              </p>
            </div>
            <span className="text-xl font-bold text-navy">₹{price}</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-1 mt-4">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center flex-1">
                <button
                  onClick={() => setStep(s.key)}
                  className={cn(
                    "flex items-center gap-2 text-xs font-medium transition-colors",
                    i <= stepIndex ? "text-navy" : "text-warm-grey"
                  )}
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                      i < stepIndex
                        ? "bg-success text-white"
                        : i === stepIndex
                        ? "bg-navy text-white"
                        : "bg-border text-warm-grey"
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-2",
                      i < stepIndex ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* LEFT: Preview */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-center gap-2 p-3 border-b border-border">
              <button
                onClick={() => setSide("front")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  side === "front" ? "bg-navy text-white" : "text-warm-grey hover:text-navy"
                )}
              >
                Front
              </button>
              <button
                onClick={() => setSide("back")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  side === "back" ? "bg-navy text-white" : "text-warm-grey hover:text-navy"
                )}
              >
                Back
              </button>
            </div>

            <div
              ref={previewRef}
              className="aspect-square max-h-[550px] mx-auto p-8 relative flex items-center justify-center select-none"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <svg viewBox="0 0 400 480" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100,60 L60,80 L20,130 L60,150 L80,120 L80,440 L320,440 L320,120 L340,150 L380,130 L340,80 L300,60 L270,80 C250,95 150,95 130,80 Z"
                  fill={selectedColor.hex}
                  stroke={isLight ? "#E5E2D9" : "rgba(255,255,255,0.1)"}
                  strokeWidth="1.5"
                />
                <path d="M130,80 C150,95 250,95 270,80" fill="none" stroke={isLight ? "#E5E2D9" : "rgba(255,255,255,0.15)"} strokeWidth="1.5" />
                <rect x="120" y="120" width="160" height="200" fill="none" stroke={isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"} strokeWidth="1" strokeDasharray="4 4" rx="4" />
                <text x="200" y="425" textAnchor="middle" fill={isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"} fontSize="10" letterSpacing="3">
                  {side.toUpperCase()}
                </text>

                {/* Size dimension annotations */}
                {selectedSizeData && (
                  <>
                    {/* Chest width line */}
                    <line x1="80" y1="135" x2="320" y2="135" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" strokeDasharray="3 2" />
                    <line x1="80" y1="130" x2="80" y2="140" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
                    <line x1="320" y1="130" x2="320" y2="140" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
                    <rect x="160" y="125" width="80" height="18" rx="4" fill={isLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)"} />
                    <text x="200" y="138" textAnchor="middle" fill={isLight ? "#111827" : "#FFFFFF"} fontSize="10" fontWeight="600">
                      {selectedSizeData.chest}&quot; chest
                    </text>

                    {/* Length line */}
                    <line x1="335" y1="80" x2="335" y2="440" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" strokeDasharray="3 2" />
                    <line x1="330" y1="80" x2="340" y2="80" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
                    <line x1="330" y1="440" x2="340" y2="440" stroke={isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)"} strokeWidth="0.8" />
                    <rect x="340" y="250" width="55" height="18" rx="4" fill={isLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)"} />
                    <text x="367" y="263" textAnchor="middle" fill={isLight ? "#111827" : "#FFFFFF"} fontSize="10" fontWeight="600">
                      {selectedSizeData.length}&quot; long
                    </text>
                  </>
                )}
              </svg>

              {/* Uploaded image overlay — draggable */}
              {currentImage && (
                <div
                  className="absolute cursor-grab active:cursor-grabbing touch-none"
                  style={{
                    left: `${currentPos.x}%`,
                    top: `${currentPos.y}%`,
                    transform: `translate(-50%, -50%) scale(${currentScale}) rotate(${currentRotation}deg)`,
                    maxWidth: "30%",
                    maxHeight: "35%",
                  }}
                  onPointerDown={handlePointerDown}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentImage} alt="Your design" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                </div>
              )}

              {/* Text overlay */}
              {(textLine1 || textLine2) && (
                <div
                  className="absolute text-center"
                  style={{
                    left: "50%",
                    top: currentImage ? `${Math.min(currentPos.y + 17, ZONE.maxY + 5)}%` : "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {textLine1 && (
                    <p
                      style={{
                        fontFamily: selectedFont,
                        color: textColor,
                        fontSize: "clamp(10px, 2vw, 18px)",
                        fontWeight: 700,
                      }}
                    >
                      {textLine1}
                    </p>
                  )}
                  {textLine2 && (
                    <p
                      style={{
                        fontFamily: selectedFont,
                        color: textColor,
                        fontSize: "clamp(8px, 1.5vw, 14px)",
                        fontWeight: 500,
                      }}
                    >
                      {textLine2}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="space-y-4">
            {/* Step: Garment */}
            {step === "garment" && (
              <>
                <div className="bg-white rounded-xl border border-border p-4">
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">T-Shirt Colour</h3>
                  <div className="flex flex-wrap gap-2">
                    {TSHIRT_COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-10 h-10 rounded-lg border-2 transition-all",
                          selectedColor.name === color.name ? "border-navy scale-110 shadow-sm" : "border-border hover:border-navy/30"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-warm-grey mt-2">{selectedColor.name}</p>
                </div>

                <div className="bg-white rounded-xl border border-border p-4">
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">Size</h3>
                  <div className="flex gap-2 mb-3">
                    {(["kids", "men", "women"] as SizeCategory[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setSizeCategory(cat); setSelectedSize(SIZE_CHART[cat][0].label); }}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                          sizeCategory === cat ? "bg-navy text-white" : "bg-ivory text-warm-grey hover:text-navy"
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
                          selectedSize === s.label ? "border-navy bg-navy text-white" : "border-border text-warm-grey hover:border-navy/30"
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
              </>
            )}

            {/* Step: Design */}
            {step === "design" && (
              <div className="bg-white rounded-xl border border-border p-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 flex items-center gap-2">
                  <Upload size={14} />
                  Upload Image
                </h3>
                <label className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-navy/30 transition-colors border-border">
                  <Upload size={28} className="mx-auto text-warm-grey mb-3" />
                  <p className="text-sm font-medium text-navy mb-1">Drop image or click to browse</p>
                  <p className="text-xs text-warm-grey">PNG, JPG, SVG, WebP</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </label>

                {currentImage && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-navy">Image Size ({side})</span>
                      <button
                        onClick={() => { setCurrentImage(null); setCurrentScale(1); setCurrentRotation(0); }}
                        className="text-xs text-error hover:text-error/80 flex items-center gap-1"
                      >
                        <RotateCcw size={12} /> Remove
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0.3"
                      max="2"
                      step="0.1"
                      value={currentScale}
                      onChange={(e) => setCurrentScale(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-warm-grey">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-medium text-navy">Rotate</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setCurrentRotation((r) => (r - 15 + 360) % 360)}
                          className="p-1.5 rounded-md border border-border hover:border-navy/30 text-navy transition-colors"
                          title="Rotate anticlockwise"
                        >
                          <RotateCcw size={14} />
                        </button>
                        <button
                          onClick={() => setCurrentRotation((r) => (r + 15) % 360)}
                          className="p-1.5 rounded-md border border-border hover:border-navy/30 text-navy transition-colors"
                          title="Rotate clockwise"
                        >
                          <RotateCw size={14} />
                        </button>
                        {currentRotation !== 0 && (
                          <span className="text-[10px] text-warm-grey ml-1">{currentRotation}°</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step: Text */}
            {step === "text" && (
              <div className="bg-white rounded-xl border border-border p-4 space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-1 flex items-center gap-2">
                  <Type size={14} />
                  Add Text
                </h3>
                <div>
                  <label className="text-xs text-navy font-medium mb-1 block">Line 1 (e.g. Name)</label>
                  <input
                    value={textLine1}
                    onChange={(e) => setTextLine1(e.target.value)}
                    placeholder="e.g. AARAV"
                    maxLength={30}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-navy font-medium mb-1 block">Line 2 (e.g. Age, message)</label>
                  <input
                    value={textLine2}
                    onChange={(e) => setTextLine2(e.target.value)}
                    placeholder="e.g. Turns 3!"
                    maxLength={40}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-navy font-medium mb-2 block">Font</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FONT_OPTIONS.map((font) => (
                      <button
                        key={font}
                        onClick={() => setSelectedFont(font)}
                        className={cn(
                          "px-3 py-2 rounded-lg border text-sm transition-colors",
                          selectedFont === font ? "border-navy bg-navy text-white" : "border-border text-navy hover:border-navy/30"
                        )}
                        style={{ fontFamily: font }}
                      >
                        {font.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-navy font-medium mb-2 block">Text Colour</label>
                  <div className="flex flex-wrap gap-2">
                    {TEXT_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setTextColor(color)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all",
                          textColor === color ? "border-navy scale-110 shadow-sm" : "border-border"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step: Preview */}
            {step === "preview" && (
              <div className="bg-white rounded-xl border border-border p-4 space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-1 flex items-center gap-2">
                  <Eye size={14} />
                  Order Summary
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-grey">Colour</span>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded border border-border" style={{ backgroundColor: selectedColor.hex }} />
                      <span className="font-medium text-navy">{selectedColor.name}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-grey">Size</span>
                    <span className="font-medium text-navy">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-grey">Category</span>
                    <span className="font-medium text-navy capitalize">{sizeCategory}</span>
                  </div>
                  {(frontImage || backImage) && (
                    <div className="flex justify-between text-sm">
                      <span className="text-warm-grey">Custom image</span>
                      <span className="font-medium text-success">{frontImage && backImage ? "Front & Back" : frontImage ? "Front" : "Back"}</span>
                    </div>
                  )}
                  {textLine1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-warm-grey">Text</span>
                      <span className="font-medium text-navy">{textLine1}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-semibold text-navy">Total</span>
                    <span className="text-xl font-bold text-navy">₹{price}</span>
                  </div>
                </div>

                <button className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                  <ShoppingCart size={16} />
                  Add to Cart — ₹{price}
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {stepIndex > 0 && (
                <button
                  onClick={goPrev}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-border text-navy py-3 rounded-lg text-sm font-medium hover:bg-ivory transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
              {stepIndex < STEPS.length - 1 && (
                <button
                  onClick={goNext}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-navy text-white py-3 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-3 lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-lg font-bold text-navy">₹{price}</span>
            <p className="text-xs text-warm-grey">{selectedColor.name} · {selectedSize}</p>
          </div>
          {stepIndex < STEPS.length - 1 ? (
            <button onClick={goNext} className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
              <ShoppingCart size={16} /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
