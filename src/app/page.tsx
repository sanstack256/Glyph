"use client";

import { useState, useEffect } from "react";
import type { AsciiPixel } from "@/types";
import Navbar from "@/components/layout/Navbar";
import UploadZone from "@/components/upload/UploadZone";
import PreviewPanel from "@/components/preview/PreviewPanel";
import ControlPanel from "@/components/controls/ControlPanel";
import { imageToAscii }
  from "@/lib/generators/ascii";

import { asciiToPng }
  from "@/lib/export/png";


export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [ascii, setAscii] =
    useState<AsciiPixel[][]>([]);

  const [asciiImage, setAsciiImage] =
    useState<string | null>(null);

  const [asciiWidth, setAsciiWidth] =
    useState(200);

  console.log("asciiImage", asciiImage);

  const generateAscii = async () => {
    if (!image) return;

    const url = URL.createObjectURL(image);

    const result = await imageToAscii(
      url,
      asciiWidth
    );

    const png = asciiToPng(result);

    setAscii(result);
    setAsciiImage(png);
  };

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
            setAscii={setAscii}
            setAsciiImage={setAsciiImage}
          />

          <PreviewPanel
            image={image}
            asciiImage={asciiImage}
          />
          <ControlPanel
            image={image}
            setAscii={setAscii}
            setAsciiImage={setAsciiImage}
            asciiWidth={asciiWidth}
            setAsciiWidth={setAsciiWidth}
            asciiImage={asciiImage}
          />



        </div>
      </section>

      <footer className="mt-24 border-t border-white/10 py-6">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-white/60">
            Glyph © 2026
          </p>

          <p className="mt-2 text-xs text-white/40">
            Logo effect generated using TextStudio.com
          </p>
        </div>
      </footer>


    </main>
  );
}