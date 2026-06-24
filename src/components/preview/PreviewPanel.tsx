import type { AsciiPixel } from "@/types";

interface PreviewPanelProps {
  image: File | null;
  ascii: AsciiPixel[][];
  asciiImage: string | null;
}

export default function PreviewPanel({
  image,
  ascii,
  asciiImage,
}: PreviewPanelProps) {
  const imageUrl = image
    ? URL.createObjectURL(image)
    : null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-border bg-surface p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Original
        </h3>

        {!image ? (
          <div className="flex h-[300px] items-center justify-center text-muted">
            Upload an image to begin
          </div>
        ) : (
          <img
            src={imageUrl!}
            alt="Original"
            className="mx-auto max-h-[500px] rounded-xl"
          />
        )}
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Result
        </h3>

        {!ascii ? (
          <div className="flex h-[300px] items-center justify-center text-muted">
            Generate artwork to see the result
          </div>
        ) : (
          <div className="flex h-[500px] items-center justify-center bg-black">
            {asciiImage && (
              <img
                src={asciiImage}
                alt="ASCII Result"
                className="max-h-full max-w-full"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}