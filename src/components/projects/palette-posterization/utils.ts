import { RgbColor, toHslColor } from '../../common/colorUtils';

export type ColorMetric = (color1: RgbColor, color2: RgbColor) => number;

export const hueColorMetric: ColorMetric = (color1, color2) => {
    const hue1 = toHslColor(color1).hue;
    const hue2 = toHslColor(color2).hue;

    return Math.abs(hue1 - hue2);
};

export const euclideanRgbColorMetric: ColorMetric = (color1, color2) => {
    return (color1.red - color2.red) ** 2 + (color1.green - color2.green) ** 2 + (color1.blue - color2.blue) ** 2;
};

