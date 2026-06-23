export default function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-accent" />

          <span className="text-lg font-semibold">
            Glyph
          </span>
        </div>

        <button className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-surface-hover">
          GitHub
        </button>
      </div>
    </header>
  );
}