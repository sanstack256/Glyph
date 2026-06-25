"use client";

import { Eye, EyeOff } from "lucide-react";

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

  const [isTouchDevice, setIsTouchDevice] =
    useState(false);

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
              onClick={() =>
                setShowOriginal(
                  (prev) => !prev
                )
              }
              onContextMenu={(e) =>
                e.preventDefault()
              }
              style={{
                WebkitTouchCallout: "none",
              }}
              className="
                absolute
                top-3
                right-3
                flex
                h-10
                w-10
                select-none
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                bg-black/70
                backdrop-blur-md
                transition
                hover:bg-black/90
              "
            >
              {showOriginal ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
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