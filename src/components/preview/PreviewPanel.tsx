interface PreviewPanelProps {
  image: File | null;
}

export default function PreviewPanel({
  image,
}: PreviewPanelProps) {
  if (!image) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-12">
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            Preview
          </h3>

          <p className="mt-2 text-muted">
            Upload an image to begin
          </p>
        </div>
      </div>
    );
  }

  const imageUrl = URL.createObjectURL(image);

  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <img
        src={imageUrl}
        alt="preview"
        className="mx-auto max-h-[500px] rounded-xl"
      />
    </div>
  );
}