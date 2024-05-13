export interface Color {
    red: number;
    green: number;
    blue: number;
}

export enum Mode {
    PENCIL,
    ERASER,
}

export const colorToRbgString = (color: Color) => {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
};

export const numberToTwoDigitHexString = (n: number): string => {
    return n.toString(16).padStart(2, '0').slice(-2);
};

export const colorToHexString = (color: Color): string => {
    return `${numberToTwoDigitHexString(color.red)}${numberToTwoDigitHexString(color.green)}${numberToTwoDigitHexString(color.blue)}`;
};

/**
 * converts a given hex string to the corresponding color
 * returns undefined if the hex string is not valie
 */
export const hexStringToColor = (s: string): Color | undefined => {
    const sanitizedString = s.trim().toLowerCase();

    const sixCharMatch = sanitizedString.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
    const threeCharMatch = sanitizedString.match(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/);

    if (threeCharMatch !== null) {
        const redVal = threeCharMatch.at(1);
        const greenVal = threeCharMatch.at(2);
        const blueVal = threeCharMatch.at(3);

        return redVal === undefined || blueVal === undefined || greenVal === undefined
            ? undefined
            : {
                red: parseInt(redVal + redVal, 16),
                green: parseInt(greenVal + greenVal, 16),
                blue: parseInt(blueVal + blueVal, 16),
            };
    }


    if (sixCharMatch !== null) {
        const redVal = sixCharMatch.at(1);
        const greenVal = sixCharMatch.at(2);
        const blueVal = sixCharMatch.at(3);

        return redVal === undefined || blueVal === undefined || greenVal === undefined
            ? undefined
            : {
                red: parseInt(redVal + redVal, 16),
                green: parseInt(greenVal + greenVal, 16),
                blue: parseInt(blueVal + blueVal, 16),
            };
    }

    return undefined;
};

export const RED: Color = {
    red: 255,
    green: 0,
    blue: 0,
};

export const GREEN: Color = {
    red: 0,
    green: 255,
    blue: 0,
};

export const BLUE: Color = {
    red: 0,
    green: 0,
    blue: 255,
};

export const BLACK: Color = {
    red: 0,
    green: 0,
    blue: 0,
};

export const WHITE: Color = {
    red: 255,
    green: 255,
    blue: 255,
};

