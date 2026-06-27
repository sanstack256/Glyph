import type { AsciiPixel } from "@/types";

export function mosaicToPng(
    ascii: AsciiPixel[][]
) {
    const tileSize = 14;
    const minBlockSize = 3;
    const maxBlockSize = 6;

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
    ) {
        for (
            let x = 0;
            x < width;
        ) {

            const blockSize =
                Math.floor(
                    Math.random() *
                    (maxBlockSize - minBlockSize + 1)
                ) + minBlockSize;


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
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
            );

            x += blockSize;
        }

        y += minBlockSize;
    }

    return canvas.toDataURL(
        "image/png"
    );
}