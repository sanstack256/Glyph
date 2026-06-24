"use client";

import { imageToAscii }
  from "@/lib/generators/ascii";

import type { AsciiPixel } from "@/types";
import { asciiToPng }
  from "@/lib/export/png";

interface Props {
  image: File | null;

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
}: Props) {
  async function handleGenerate() {
    if (!image) return;

    const url =
      URL.createObjectURL(image);

    const result =
      await imageToAscii(
        url,
        asciiWidth
      );

    const png =
      asciiToPng(result);

    setAscii(result);
    setAsciiImage(png);
  }

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
        onClick={handleGenerate}
        className="w-full rounded-xl bg-white px-4 py-3 font-medium text-black"
      >
        Generate ASCII
      </button>

    </div>
  );
}