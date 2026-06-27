"use client";

import { trackGenerate } from "@/lib/analytics";
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

import { asciiToColorPng }
  from "@/lib/export/colorPng";

import { dotToPng }
  from "@/lib/export/dotPng";

import { colorDotToPng }
  from "@/lib/export/colorDotPng";

import { mosaicToPng }
  from "@/lib/export/mosaicPng";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [ascii, setAscii] =
    useState<AsciiPixel[][]>([]);

  const [asciiImage, setAsciiImage] =
    useState<string | null>(null);

  const [asciiWidth, setAsciiWidth] =
    useState(200);

  const [generator, setGenerator] =
    useState<
      "ascii" | "dots" | "mosaic" | null
    >(null);

  const [style, setStyle] =
    useState<
      "classic" | "color" | null
    >(null);

  const [hasStarted, setHasStarted] =
    useState(false);

  const [generateTracked, setGenerateTracked] =
    useState(false);

  console.log("asciiImage", asciiImage);

  const generateAscii = async () => {

    if (!image) return;


    const url = URL.createObjectURL(image);

    const result = await imageToAscii(
      url,
      asciiWidth
    );

    let png: string | null;

    if (
      generator === "ascii" &&
      style === "classic"
    ) {
      png = asciiToPng(result);
    }
    else if (
      generator === "ascii" &&
      style === "color"
    ) {
      png = asciiToColorPng(result);
    }
    else if (
      generator === "dots" &&
      style === "classic"
    ) {
      png = dotToPng(result);
    }
    else if (
      generator === "dots" &&
      style === "color"
    ) {
      png = colorDotToPng(result);
    }

    else if (
      generator === "mosaic"
    ) {
      png = mosaicToPng(result);
    }

    else {
      return;
    }

    setAscii(result);
    setAsciiImage(png);


  };

  useEffect(() => {
    if (!image) return;
    if (!generator) return;
    if (!style) return;

    generateAscii();
  }, [generator, style]);

  useEffect(() => {
    if (!asciiImage) return;
    if (generateTracked) return;

    trackGenerate();
    setGenerateTracked(true);
  }, [asciiImage]);


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
            Transform any image into stunning ASCII artwork in seconds.
          </p>
        </div>

        <div className="space-y-6">

          <UploadZone
            image={image}
            setImage={setImage}
            setAscii={setAscii}
            setAsciiImage={setAsciiImage}
            setGenerator={setGenerator}
            setStyle={setStyle}
            setHasStarted={setHasStarted}
            generateAscii={generateAscii}
            setGenerateTracked={setGenerateTracked}
          />

          {image && (
            <>
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
                generateAscii={generateAscii}
                generator={generator}
                setGenerator={setGenerator}
                style={style}
                setStyle={setStyle}
                hasStarted={hasStarted}
                setHasStarted={setHasStarted}
              />
            </>
          )}



        </div>
      </section>

      <footer className="mt-24 border-t border-white/10 py-6">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-white/60">
            Glyph • v1.0 • 2026
          </p>

          <p className="mt-2 text-xs text-white/40">
            Logo effect generated using TextStudio.com
          </p>

        </div>
      </footer>


    </main>
  );
}