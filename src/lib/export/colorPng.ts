import type { AsciiPixel } from "@/types";

export function asciiToColorPng(
  ascii: AsciiPixel[][]
) {
  const fontSize = 10;

  const boost = 1.5;
  
  const canvas =
    document.createElement("canvas");

  const ctx =
    canvas.getContext("2d");

  if (!ctx) return null;

  const width =
    ascii[0]?.length || 0;

  const height =
    ascii.length;

  canvas.width =
    width * fontSize;

  canvas.height =
    height * fontSize;

  ctx.fillStyle = "#000";
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.font =
    `${fontSize}px monospace`;

  for (
    let y = 0;
    y < height;
    y++
  ) {
    for (
      let x = 0;
      x < width;
      x++
    ) {
      const pixel =
        ascii[y][x];

     ctx.fillStyle =

  ctx.fillStyle =
  `rgb(
    ${Math.min(255, pixel.r * boost)},
    ${Math.min(255, pixel.g * boost)},
    ${Math.min(255, pixel.b * boost)}
  )`;

      ctx.fillText(
        pixel.char,
        x * fontSize,
        (y + 1) * fontSize
      );
    }
  }

  return canvas.toDataURL(
    "image/png"
  );
}