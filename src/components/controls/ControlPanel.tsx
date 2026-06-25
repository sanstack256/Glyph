"use client";

import type { AsciiPixel } from "@/types";
import { useEffect } from "react";


interface Props {
  image: File | null;
  asciiImage: string | null;
  generateAscii: () => Promise<void>;

  setAscii: (
    value: AsciiPixel[][]
  ) => void;

  setAsciiImage: (
    value: string | null
  ) => void;

  asciiWidth: number;

  setAsciiWidth: (
    value: number
  ) => void;
}



export default function ControlPanel({
  image,
  setAscii,
  setAsciiImage,
  asciiWidth,
  setAsciiWidth,
  asciiImage,
  generateAscii,
}: Props) {

  useEffect(() => {
  if (!asciiImage) return;

  const timer = setTimeout(() => {
    generateAscii();
  }, 300);

  return () => clearTimeout(timer);
}, [asciiWidth]);

  return (
    <div>

      <div className="mb-6">
        <div className="mb-2 flex justify-between">
          <span>Detail</span>
          <span>{asciiWidth}</span>
        </div>

        <input
          type="range"
          min="100"
          max="500"
          step="10"
          value={asciiWidth}
          onChange={(e) =>
            setAsciiWidth(
              Number(e.target.value)
            )
          }
          className="w-full"
        />
      </div>

      <button
        onClick={generateAscii}
        className="w-full rounded-xl bg-white px-4 py-3 font-medium text-black"
      >
        Generate ASCII
      </button>

      {asciiImage && (
        <a
          href={asciiImage}
          download="glyph-ascii.png"
          className="
      mt-3
      block
      w-full
      rounded-xl
      border
      border-white/20
      px-4
      py-3
      text-center
      font-medium
      transition
      hover:bg-white/10
    "
        >
          Download PNG
        </a>
      )}

    </div>
  );
}