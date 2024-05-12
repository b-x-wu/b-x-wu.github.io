export interface Color {
    red: number;
    green: number;
    blue: number;
}


export const colorToString = (color: Color) => {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
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

