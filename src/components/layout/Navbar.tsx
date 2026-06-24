export default function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img
            src="/nlogo.png"
            alt="Glyph"
            className="h-10 w-auto"
          />

          <span>
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