import { RgbColor, toHslColor, toRgbColor } from '../../common/colorUtils';

export interface ColorPaletteChangeRequestData {
    /** the original colors in the image */
    colors: RgbColor[];
    /** the colors present in the palette */
    palette: RgbColor[];
}

export interface ColorPaletteChangeResponseData {
    /** the colors the image should be set to */
    adjustedColors: RgbColor[];
}

export type ColorMetric = (color1: RgbColor, color2: RgbColor) => number;

export const hueColorMetric: ColorMetric = (color1, color2) => {
    const hue1 = toHslColor(color1).hue;
    const hue2 = toHslColor(color2).hue;

    return Math.abs(hue1 - hue2);
};

export const euclideanRgbColorMetric: ColorMetric = (color1, color2) => {
    return (color1.red - color2.red) ** 2 + (color1.green - color2.green) ** 2 + (color1.blue - color2.blue) ** 2;
};

/**
 * Get the colors to render on the canvas based on the colors of the image and the colors in the palette
 * @param colors the colors of the iamge
 * @param palette the colors in the palette
 * @returns the colors to render on the canvas
 */
export const getAdjustedColors = (colors: RgbColor[], palette: RgbColor[]) => {
    return colors.map((color) => {
        // get closest color present in the palette to the color of this pixel
        const closestPaletteColor = palette.reduce<{ color: RgbColor | undefined; distance: number }>((previousClosest, paletteColor) => {
            const distance = hueColorMetric(color, paletteColor);
            if (previousClosest.color === undefined) {
                return { color: paletteColor, distance };
            }

            if (distance < previousClosest.distance) {
                return { color: paletteColor, distance };
            }

            return previousClosest;
        }, { color: undefined, distance: Infinity }).color!;

        // given the color of the pixel and the closest color palette, generate the rendered color of the pixel
        return ((currentColor: RgbColor, closestPaletteColor: RgbColor) => {
            const currentHslColor = toHslColor(currentColor);
            const closestPaletteHslColor = toHslColor(closestPaletteColor);

            return toRgbColor({ ...currentHslColor, hue: closestPaletteHslColor.hue });
        })(color, closestPaletteColor);
    });
};
