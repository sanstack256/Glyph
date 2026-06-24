"use client";

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
        >
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
        mt-4
        rounded-xl
        border
        border-white/20
        px-4
        py-2
        text-sm
        transition
        hover:bg-white/10
      "
          >
            {showOriginal
              ? "Viewing original"
              : "Hold to view original"}
          </button>
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