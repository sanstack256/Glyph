"use client";

import { useState } from "react";
import type { AsciiPixel } from "@/types";

import Navbar from "@/components/layout/Navbar";
import UploadZone from "@/components/upload/UploadZone";
import PreviewPanel from "@/components/preview/PreviewPanel";
import ControlPanel from "@/components/controls/ControlPanel";


export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [ascii, setAscii] =
    useState<AsciiPixel[][]>([]);

  const [asciiImage, setAsciiImage] =
    useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
            Character Art Generator
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Turn Photos Into
            <br />
            Characters & Dots
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Create stunning ASCII art, dot art, and symbol-based
            artwork directly in your browser.
          </p>
        </div>

        <div className="space-y-6">
          <UploadZone
            image={image}
            setImage={setImage}
          />

          <ControlPanel
            image={image}
            setAscii={setAscii}
            setAsciiImage={setAsciiImage}
          />

          <PreviewPanel
            image={image}
            ascii={ascii}
            asciiImage={asciiImage}
          />

        </div>
      </section>
    </main>
  );
}