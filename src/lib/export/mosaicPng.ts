import type { AsciiPixel } from "@/types";

export function mosaicToPng(
    ascii: AsciiPixel[][]
) {
    const tileSize = 40;
    const grout = 2;

    const minBlockWidth = 4;
    const maxBlockWidth = 8;

    const minBlockHeight = 4;
    const maxBlockHeight = 8;

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

    const occupied =
        Array.from(
            { length: height },
            () =>
                Array(width).fill(false)
        );

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

            if (occupied[y][x]) {
                continue;
            }

            let totalR = 0;
            let totalG = 0;
            let totalB = 0;
            let count = 0;

            let blockWidth =
                Math.floor(
                    Math.random() *
                    (maxBlockWidth - minBlockWidth + 1)
                ) + minBlockWidth;

            let blockHeight =
                Math.floor(
                    Math.random() *
                    (maxBlockHeight - minBlockHeight + 1)
                ) + minBlockHeight;
            blockWidth =
                Math.min(
                    blockWidth,
                    width - x
                );

            blockHeight =
                Math.min(
                    blockHeight,
                    height - y
                );

            let fits = false;

            while (
                !fits &&
                blockWidth > 0 &&
                blockHeight > 0
            ) {
                fits = true;

                for (
                    let by = 0;
                    by < blockHeight;
                    by++
                ) {
                    for (
                        let bx = 0;
                        bx < blockWidth;
                        bx++
                    ) {
                        if (
                            occupied[y + by][x + bx]
                        ) {
                            fits = false;
                            break;
                        }
                    }

                    if (!fits) break;
                }

                if (!fits) {
                    if (
                        blockWidth >= blockHeight
                    ) {
                        blockWidth--;
                    } else {
                        blockHeight--;
                    }
                }
            }

            if (
                blockWidth === 0 ||
                blockHeight === 0
            ) {
                continue;
            }

            for (
                let by = 0;
                by < blockHeight;
                by++
            ) {
                for (
                    let bx = 0;
                    bx < blockWidth;
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

            const drawX =
                x * tileSize;

            const drawY =
                y * tileSize;


            ctx.fillRect(
                drawX + grout / 2,
                drawY + grout / 2,
                blockWidth * tileSize - grout,
                blockHeight * tileSize - grout
            );

            ctx.strokeStyle = "#202020";
            ctx.lineWidth = 2;

            ctx.strokeRect(
                drawX + grout / 2,
                drawY + grout / 2,
                blockWidth * tileSize - grout,
                blockHeight * tileSize - grout
            );
            for (
                let by = 0;
                by < blockHeight;
                by++
            ) {
                for (
                    let bx = 0;
                    bx < blockWidth;
                    bx++
                ) {
                    occupied[y + by][x + bx] = true;
                }
            }


        }
    }

    return canvas.toDataURL(
        "image/png"
    );
}