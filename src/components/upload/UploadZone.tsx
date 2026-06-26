import type { AsciiPixel } from "@/types";

interface UploadZoneProps {
  image: File | null;

  generateAscii: () => Promise<void>;

  setGenerateTracked: (
    value: boolean
  ) => void;

  setImage: (
    file: File | null
  ) => void;

  setAscii: (
    value: AsciiPixel[][]
  ) => void;

  setAsciiImage: (
    value: string | null
  ) => void;

  setGenerator: (
    value: "ascii" | "dots" | null
  ) => void;

  setStyle: (
    value: "classic" | "color" | null
  ) => void;

  setHasStarted: (
    value: boolean
  ) => void;
}

export default function UploadZone({
  setImage,
  setAscii,
  setAsciiImage,
  setGenerateTracked,
  setGenerator,
  setStyle,
  setHasStarted,

}: UploadZoneProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;



    // clear previous generation
    setImage(file);

    setAscii([]);
    setAsciiImage(null);

    setGenerator(null);
    setStyle(null);

    setHasStarted(false);
    setGenerateTracked(false);
  };

  return (
    <label className="block cursor-pointer">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <div className="rounded-3xl border border-border bg-surface p-16 transition hover:border-white/40">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 text-5xl">
            ↑
          </div>

          <h3 className="text-xl font-semibold">
            Upload an image
          </h3>

          <p className="mt-2 text-muted">
            PNG, JPG, WEBP
          </p>
        </div>
      </div>
    </label>
  );
}