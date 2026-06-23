interface PreviewPanelProps {
  image: File | null;
  ascii: string;
}

export default function PreviewPanel({
  image,
  ascii,


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
          <pre className="h-[500px] overflow-auto whitespace-pre text-[4px] leading-[0.8] font-mono">
            {ascii}
          </pre>
        )}
      </div>
    </div>
  );
}