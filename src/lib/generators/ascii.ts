const ASCII_CHARS =
"@%#*+=-:. ";

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
    imageUrl: string
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

    if (!ctx) return "";

    const width = 120;

    const height = Math.floor(
        (img.height / img.width) *
        width *
        0.55
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

    let ascii = "";

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
            const offset =
                (y * width + x) * 4;

            const r =
                data.data[offset];

            const g =
                data.data[offset + 1];

            const b =
                data.data[offset + 2];

            const brightness =
                (r + g + b) / 3;

            ascii +=
                brightnessToChar(
                    brightness
                );
        }

        ascii += "\n";
    }

    return ascii;
}