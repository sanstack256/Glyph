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

  generator:
  "ascii" | "dots" | "mosaic" | null;

  setGenerator: (
    value: "ascii" | "dots" | "mosaic"
  ) => void;

  style:
  "classic" | "color" | null;

  setStyle: (
    value: "classic" | "color"
  ) => void;

  hasStarted: boolean;

  setHasStarted: (
    value: boolean
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
  generator,
  setGenerator,
  style,
  setStyle,
  hasStarted,
  setHasStarted,

}: Props) {

  useEffect(() => {
    if (!asciiImage) return;

    const timer = setTimeout(() => {
      generateAscii();
    }, 300);

    return () => clearTimeout(timer);
  }, [asciiWidth]);

  const downloadFileName =
    generator === "ascii"
      ? style === "classic"
        ? "glyph-ascii.png"
        : "glyph-color-ascii.png"
      : generator === "dots"
        ? style === "classic"
          ? "glyph-dots.png"
          : "glyph-color-dots.png"
        : "glyph-mosaic.png";

  return (
    <div>

      <div className="mb-6 text-center">
        <p className="mb-3 text-sm">
          Choose Generator
        </p>

        <div className="flex justify-center gap-2">
          <button
            onClick={() =>
              setGenerator("ascii")
            }
            className={`
        rounded-xl px-4 py-2
        ${generator === "ascii"
                ? "bg-white text-black"
                : "border border-white/20"
              }
      `}
          >
            ASCII
          </button>

          <button
            onClick={() =>
              setGenerator("dots")
            }
            className={`
        rounded-xl px-4 py-2
        ${generator === "dots"
                ? "bg-white text-black"
                : "border border-white/20"
              }
      `}
          >
            Dots
          </button>

          
          <button
            onClick={() =>
              setGenerator("mosaic")
            }
            className={`
    rounded-xl px-4 py-2
    ${generator === "mosaic"
                ? "bg-white text-black"
                : "border border-white/20"
              }
  `}
          >
            Mosaic
          </button>
        </div>

        {generator && (
          <>
            <p className="mb-3 mt-6 text-sm">
              Choose Style
            </p>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  setStyle("classic");
                  setHasStarted(true);
                }}
                className={`
            rounded-xl px-4 py-2
            ${style === "classic"
                    ? "bg-white text-black"
                    : "border border-white/20"
                  }
          `}
              >
                Classic
              </button>

              <button
                onClick={() => {
                  setStyle("color");
                  setHasStarted(true);
                }}
                className={`
            rounded-xl px-4 py-2
            ${style === "color"
                    ? "bg-white text-black"
                    : "border border-white/20"
                  }
          `}
              >
                Color
              </button>
            </div>
          </>
        )}
      </div>


      {hasStarted && (
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
      )}


      {hasStarted && asciiImage && (
        <a
          href={asciiImage}
          onClick={trackDownload}
          download={downloadFileName}
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
      )
      }

    </div >
  );
}