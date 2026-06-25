"use client";

import { Eye } from "lucide-react";

import { useState } from "react";



interface PreviewPanelProps {
  image: File | null;
  asciiImage: string | null;
}

export default function PreviewPanel({
  image,
  asciiImage,
}: PreviewPanelProps) {
  const imageUrl = image
    ? URL.createObjectURL(image)
    : null;
  const [showOriginal, setShowOriginal] =
    useState(false);

  const displayedImage =
    showOriginal
      ? imageUrl
      : asciiImage;

  return (
    <div className="flex h-[500px] items-center justify-center bg-black">

      {asciiImage ? (
        <div
          className="
    flex
    h-full
    flex-col
    items-center
    justify-center
  "
        >

          <div className="relative">

            <img
              src={displayedImage || ""}
              alt="Preview"
              className="
        max-h-[420px]
        max-w-full
        object-contain
      "
            />

            <button
              onMouseDown={() =>
                setShowOriginal(true)
              }
              onMouseUp={() =>
                setShowOriginal(false)
              }
              onMouseLeave={() =>
                setShowOriginal(false)
              }
              onTouchStart={() =>
                setShowOriginal(true)
              }
              onTouchEnd={() =>
                setShowOriginal(false)
              }
              className="
    absolute
    top-3
    right-3
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    border
    border-white/20
    bg-black/70
    backdrop-blur-md
    transition
    hover:bg-black/90
  "
            >
              <Eye size={18} />
            </button>

          </div>

        </div>
      ) : image ? (
        <img
          src={imageUrl!}
          alt="Original"
          className="max-h-full max-w-full rounded-xl"
        />
      ) : (
        <div className="text-muted">
          Upload an image to begin
        </div>
      )}
    </div>
  );
}