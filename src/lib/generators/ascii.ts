import type { AsciiPixel } from "@/types";

const ASCII_CHARS =
    " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"


export function brightnessToChar(
    brightness: number
) {
    const index = Math.floor(
        (brightness / 255) *
        (ASCII_CHARS.length - 1)
    );

    return ASCII_CHARS[index];
}


export async function imageToAscii(
    imageUrl: string,
    width: number
) {
    const img = new Image();

    img.src = imageUrl;

    await new Promise((resolve) => {
        img.onload = resolve;
    });

    const canvas =
        document.createElement("canvas");

    const ctx =
        canvas.getContext("2d");

    if (!ctx) return [];



    const height = Math.floor(
        (img.height / img.width) *
        width
    );
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(
        img,
        0,
        0,
        width,
        height
    );

    const data = ctx.getImageData(
        0,
        0,
        width,
        height
    );

    const ascii: AsciiPixel[][] = [];

    for (let y = 0; y < height; y++) {
        const row: AsciiPixel[] = [];
        for (
            let x = 0;
            x < width;
            x++
        ) {
            const offset =
                (y * width + x) * 4;

            const r =
                data.data[offset];

            const g =
                data.data[offset + 1];

            const b =
                data.data[offset + 2];

            const brightness =
                0.299 * r +
                0.587 * g +
                0.114 * b;

            row.push({
                char: brightnessToChar(brightness),
                brightness,

                r,
                g,
                b,
            });
        }

        ascii.push(row);
    }


    return ascii;
}