import type { AsciiPixel } from "@/types";

export function dotToPng(
    ascii: AsciiPixel[][]
) {
    const cellSize = 14;

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
        width * cellSize;

    canvas.height =
        height * cellSize;

    ctx.fillStyle = "#000";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.font =
        `${cellSize}px monospace`;

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

            ctx.beginPath();

            const radius =
                0.5 +
                (pixel.brightness / 255) * 3;

            ctx.arc(
                x * cellSize + cellSize / 2,
                y * cellSize + cellSize / 2,
                radius,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    }

    return canvas.toDataURL(
        "image/png"
    );
}