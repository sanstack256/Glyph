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

        </div>

        <a
          href="https://github.com/sanstack256/Glyph"
          target="_blank"
          rel="noopener noreferrer"
          className="
    rounded-xl
    border
    border-white/20
    px-4
    py-2
    transition
    hover:bg-white/10
  "
        >
          GitHub
        </a>
      </div>
    </header>
  );
}