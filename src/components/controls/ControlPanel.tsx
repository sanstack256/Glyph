"use client";

import { imageToAscii }
from "@/lib/generators/ascii";

interface Props {
  image: File | null;
  setAscii: (
    value: string
  ) => void;
}

export default function ControlPanel({
  image,
  setAscii,
}: Props) {
  async function handleGenerate() {
    if (!image) return;

    const url =
      URL.createObjectURL(image);

    const result =
      await imageToAscii(url);

    setAscii(result);
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