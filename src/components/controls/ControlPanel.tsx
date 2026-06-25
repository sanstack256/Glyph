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

  asciiMode: "grayscale" | "color";

  setAsciiMode: (
    value: "grayscale" | "color"
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
  asciiMode,
  setAsciiMode,
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
        <p className="mb-3 text-sm">
          Style
        </p>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setAsciiMode("grayscale")
            }
            className={`
        rounded-xl px-4 py-2
        ${asciiMode === "grayscale"
                ? "bg-white text-black"
                : "border border-white/20"}
      `}
          >
            Classic
          </button>

          <button
            onClick={() =>
              setAsciiMode("color")
            }
            className={`
        rounded-xl px-4 py-2
        ${asciiMode === "color"
                ? "bg-white text-black"
                : "border border-white/20"}
      `}
          >
            Color
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm text-muted">
          ASCII artwork updates automatically.
        </p>
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


      {asciiImage && (
        <a
          href={asciiImage}
          onClick={trackDownload}
          download="glyph-ascii.png"
          className="
  mt-3
  block
  w-full
  cursor-pointer
  rounded-xl
  bg-white
  px-4
  py-3
  text-center
  font-medium
  text-black
  transition-all
  duration-200
  hover:-translate-y-0.5
  hover:shadow-lg
  active:scale-[0.98]
"
        >
          Download PNG
        </a>
      )}

    </div>
  );
}