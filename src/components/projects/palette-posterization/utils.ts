import { RgbColor, toHslColor, toLabColor, toRgbColor } from '../../common/colorUtils';

export enum ColorMetricType {
    EUCLIDEAN_RGB = 'Euclidean RGB',
    WEIGHTED_EUCLIDEAN_RGB = 'Weighted Euclidean RGB',
    DELTA_E = 'Delta E',
    HUE = 'Hue Difference',
    SATURATION = 'Saturation Difference',
    LIGHTNESS = 'Lightness Difference',
}

export type ColorMetric = (color1: RgbColor, color2: RgbColor) => number;

export const hueColorMetric: ColorMetric = (color1, color2) => {
    const hue1 = toHslColor(color1).hue;
    const hue2 = toHslColor(color2).hue;

    return Math.abs(hue1 - hue2);
};

export const saturationColorMetric: ColorMetric = (color1, color2) => {
    const saturation1 = toHslColor(color1).saturation;
    const saturation2 = toHslColor(color2).saturation;

    return Math.abs(saturation1 - saturation2);
};

export const lightnessColorMetric: ColorMetric = (color1, color2) => {
    const lightness1 = toHslColor(color1).lightness;
    const lightness2 = toHslColor(color2).lightness;

    return Math.abs(lightness1 - lightness2);
};

export const euclideanRgbColorMetric: ColorMetric = (color1, color2) => {
    return (color1.red - color2.red) ** 2 + (color1.green - color2.green) ** 2 + (color1.blue - color2.blue) ** 2;
};

export const weightedEuclideanRgbColorMetric: ColorMetric = (color1, color2) => {
    const redMean = (color1.red + color2.red) / 2;
    return (2 + redMean / 256) * (color1.red - color2.red) ** 2
        + 4 * (color1.green - color2.green) ** 2
        + (2 + (255 - redMean) / 256) * (color1.blue - color2.blue) ** 2;
};

export const deltaEColorMetric: ColorMetric = (color1, color2) => {
    const labColor1 = toLabColor(color1);
    const labColor2 = toLabColor(color2);

    return (labColor1.l - labColor2.l) ** 2 + (labColor1.a - labColor2.a) ** 2 + (labColor1.b - labColor2.b) ** 2;
};

export const COLOR_METRIC_MAP: Map<ColorMetricType, ColorMetric> = new Map<ColorMetricType, ColorMetric>([
    [ ColorMetricType.EUCLIDEAN_RGB, euclideanRgbColorMetric ],
    [ ColorMetricType.WEIGHTED_EUCLIDEAN_RGB, weightedEuclideanRgbColorMetric ],
    [ ColorMetricType.DELTA_E, deltaEColorMetric ],
    [ ColorMetricType.HUE, hueColorMetric ],
    [ ColorMetricType.SATURATION, saturationColorMetric ],
    [ ColorMetricType.LIGHTNESS, lightnessColorMetric ],
]);

export enum RenderedColorReducerType {
    PALETTE = 'Render palette color',
    PRESERVE_SL = 'Preserve saturation and lightness',
    PRESERVE_HUE = 'Preserve hue',
    AVERAGE = 'Average by color channel',
}

export type ColorReducer = (color1: RgbColor, color2: RgbColor) => RgbColor;

export const identityColorReducer: ColorReducer = (_, color2) => color2; // identity on the second argument

export const slPreservingColorReducer: ColorReducer = (color1, color2) => {
    const hslColor1 = toHslColor(color1);
    const hslColor2 = toHslColor(color2);

    return toRgbColor({ ...hslColor1, hue: hslColor2.hue });
};

export const huePreservingColorReducer: ColorReducer = (color1, color2) => {
    const hslColor1 = toHslColor(color1);
    const hslColor2 = toHslColor(color2);

    return toRgbColor({ ...hslColor2, hue: hslColor1.hue });
};

export const averageColorReducer: ColorReducer = (color1, color2) => {
    return {
        red: (color1.red + color2.red) / 2,
        green: (color1.green + color2.green) / 2,
        blue: (color1.blue + color2.blue) / 2,
    };
};

export const RENDERED_COLOR_REDUCER_MAP: Map<RenderedColorReducerType, ColorReducer> = new Map<RenderedColorReducerType, ColorReducer>([
    [ RenderedColorReducerType.PALETTE, identityColorReducer ],
    [ RenderedColorReducerType.PRESERVE_SL, slPreservingColorReducer ],
    [ RenderedColorReducerType.PRESERVE_HUE, huePreservingColorReducer ],
    [ RenderedColorReducerType.AVERAGE, averageColorReducer ],
]);

/**
 * Get the colors to render on the canvas based on the colors of the image and the colors in the palette
 * @param colors the colors of the iamge
 * @param palette the colors in the palette
 * @param colorMetricType type defining which color metric used to calculate distance between colors
 * @param renderedColorReducerType type defining how the current image color and the palette color should combine to create the rendered color
 * @returns the colors to render on the canvas
 */
export const getRenderedColors = (
    colors: RgbColor[],
    palette: RgbColor[],
    colorMetricType: ColorMetricType,
    renderedColorReducerType: RenderedColorReducerType,
) => {
    const colorMetric = COLOR_METRIC_MAP.get(colorMetricType);
    const colorReducer = RENDERED_COLOR_REDUCER_MAP.get(renderedColorReducerType);

    if (colorMetric === undefined || colorReducer === undefined) {
        throw new Error('Unexpected color metric and color reducers');
    }

    return colors.map((color) => {
        // get closest color present in the palette to the color of this pixel
        const closestPaletteColor = palette.reduce<{ color: RgbColor | undefined; distance: number }>((previousClosest, paletteColor) => {
            const distance = colorMetric(color, paletteColor);
            if (previousClosest.color === undefined) {
                return { color: paletteColor, distance };
            }

            if (distance < previousClosest.distance) {
                return { color: paletteColor, distance };
            }

            return previousClosest;
        }, { color: undefined, distance: Infinity }).color!;

        // given the color of the pixel and the closest color palette, generate the rendered color of the pixel
        return colorReducer(color, closestPaletteColor);
    });
};

export interface ColorPaletteChangeRequestData {
    /** the original colors in the image */
    colors: RgbColor[];
    /** the colors present in the palette */
    palette: RgbColor[];
    /** the type of color metric used to define color distance */
    colorMetric: ColorMetricType;
    /** the type of color reducer used to combine image and palette colors */
    renderedColorReducer: RenderedColorReducerType;
}

export interface ColorPaletteChangeResponseData {
    /** the colors the image should be set to */
    adjustedColors: RgbColor[];
}

