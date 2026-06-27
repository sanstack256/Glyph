import type { AsciiPixel } from "@/types";

export function mosaicToPng(
    ascii: AsciiPixel[][]
) {
    const tileSize = 14;
    const blockSize = 4;

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
        (width / blockSize) * tileSize;

    canvas.height =
        (height / blockSize) * tileSize;

    ctx.fillStyle = "#000";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (
        let y = 0;
        y < height;
        y += blockSize
    ) {
        for (
            let x = 0;
            x < width;
            x += blockSize
        ) {

            let totalR = 0;
            let totalG = 0;
            let totalB = 0;
            let count = 0;

            for (
                let by = 0;
                by < blockSize;
                by++
            ) {
                for (
                    let bx = 0;
                    bx < blockSize;
                    bx++
                ) {
                    if (
                        y + by >= height ||
                        x + bx >= width
                    ) {
                        continue;
                    }

                    const pixel =
                        ascii[y + by][x + bx];

                    totalR += pixel.r;
                    totalG += pixel.g;
                    totalB += pixel.b;

                    count++;
                }
            }

            const r =
                totalR / count;

            const g =
                totalG / count;

            const b =
                totalB / count;

            ctx.fillStyle =
                `rgb(${r}, ${g}, ${b})`;

            ctx.fillRect(
                (x / blockSize) *
                    tileSize,
                (y / blockSize) *
                    tileSize,
                tileSize,
                tileSize
            );
        }
    }

    return canvas.toDataURL(
        "image/png"
    );
}