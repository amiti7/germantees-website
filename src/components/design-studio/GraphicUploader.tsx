"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GraphicUploaderProps {
  onUpload: (file: File) => void;
}

export function GraphicUploader({ onUpload }: GraphicUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          onUpload(file);
        }
      });
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 flex items-center gap-2">
        <ImageIcon size={14} />
        Upload Your Design
      </h3>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragOver
            ? "border-gold bg-gold/5"
            : "border-border hover:border-navy/30 hover:bg-ivory"
        )}
      >
        <Upload size={28} className="mx-auto text-warm-grey mb-3" />
        <p className="text-sm font-medium text-navy mb-1">
          Drop your design here
        </p>
        <p className="text-xs text-warm-grey">
          or click to browse. PNG, JPG, SVG, WebP
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
