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
}

export default function ControlPanel({
  image,
  setAscii,
  setAsciiImage,
}: Props) {
  async function handleGenerate() {
    if (!image) return;

    const url =
      URL.createObjectURL(image);

    const result =
      await imageToAscii(url);
    const png =
      asciiToPng(result);

    setAscii(result);
    setAsciiImage(png);
  }

  return (
    <div>
      <button
        onClick={
          handleGenerate
        }
        className="w-full rounded-xl bg-white px-4 py-3 font-medium text-black"
      >
        Generate ASCII
      </button>
    </div>
  );
}