import type { AsciiPixel } from "@/types";

export function mosaicToPng(
    ascii: AsciiPixel[][]
) {
    const tileSize = 40;
    const blockSize = 8;
    const grout = 2;

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

            const tileWidth =
                tileSize * (
                    0.75 +
                    Math.random() * 0.5
                );

            const tileHeight =
                tileSize * (
                    0.75 +
                    Math.random() * 0.5
                );


            const drawX =
                (x / blockSize) *
                tileSize;

            const drawY =
                (y / blockSize) *
                tileSize;

            const offsetX =
                (tileSize - tileWidth) / 2;

            const offsetY =
                (tileSize - tileHeight) / 2;

            ctx.fillRect(
                drawX + offsetX,
                drawY + offsetY,
                tileWidth,
                tileHeight
            );

            ctx.strokeStyle = "#202020";
            ctx.lineWidth = 2;

            ctx.strokeRect(
                drawX + offsetX,
                drawY + offsetY,
                tileWidth,
                tileHeight
            );
        }
    }

    return canvas.toDataURL(
        "image/png"
    );
}