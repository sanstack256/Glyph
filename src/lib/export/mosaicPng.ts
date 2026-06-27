import type { AsciiPixel } from "@/types";

export function mosaicToPng(
    ascii: AsciiPixel[][]
) {
    const tileSize = 14;

    const canvas =
        document.createElement("canvas");

    const ctx =
        canvas.getContext("2d");

    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;

    const width =
        ascii[0]?.length || 0;

    const height =
        ascii.length;

    canvas.width =
        width * tileSize;

    canvas.height =
        height * tileSize;

    ctx.fillStyle = "#000";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.font =
        `${tileSize}px monospace`;

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
                `rgb(
          ${pixel.brightness},
          ${pixel.brightness},
          ${pixel.brightness}
        )`;

            ctx.fillRect(
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
            );
        }
    }

    return canvas.toDataURL(
        "image/png"
    );
}