"use client";

import type { AsciiPixel } from "@/types";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { trackDownload } from "@/lib/analytics";


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
        onClick={() => {
          track("generate_ascii");
          generateAscii();
        }}
        className="
  w-full
  cursor-pointer
  rounded-xl
  bg-white
  px-4
  py-3
  font-medium
  text-black
  transition-all
  duration-200
  hover:-translate-y-0.5
  hover:shadow-lg
  active:translate-y-0
  active:scale-[0.98]
"
      >
        Generate ASCII
      </button>

      {asciiImage && (
        <a
          href={asciiImage}
          onClick={trackDownload}
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
      hover:bg-white/10
      cursor-pointer
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:border-white/40
      hover:bg-white/10
      active:scale-[0.98]
    "
        >
          Download PNG
        </a>
      )}

    </div>
  );
}