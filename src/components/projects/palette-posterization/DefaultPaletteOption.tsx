import React from 'react';
import { BLACK, BLUE, CYAN, GREEN, MAGENTA, RED, RgbColor, WHITE, YELLOW, colorToHexString } from '../../common/colorUtils';

interface DefaultPaletteOptionProps {
    name: string;
    palette: RgbColor[];
    onClick: () => void;
}

const DefaultPaletteOption: React.FC<DefaultPaletteOptionProps> = ({
    name,
    palette,
    onClick,
}) => {
    return (
        <div className='flex h-6 min-w-max flex-row justify-between gap-x-4 hover:cursor-pointer' onClick={ onClick }>
            <div>{ name }</div>
            <div className='border-text flex max-w-[calc(100vw/2)] flex-row gap-x-0 overflow-x-auto border-2'>
                { palette.map((color) => {
                    const colorHexString = colorToHexString(color);
                    return (
                        <div
                            className='my-auto size-5 min-w-5'
                            style={ { backgroundColor: `#${colorHexString}` } }
                            key={ `${name}-${colorHexString}` }
                        />
                    );
                }) }
            </div>
        </div>
    );
};

export const DEFAULT_PALETTE_OPTIONS: Omit<DefaultPaletteOptionProps, 'onClick'>[] = [
    { name: 'Monochrome', palette: [ BLACK, WHITE ] },
    { name: '2-bit Grayscale', palette: [ ...Array(3).fill(0).map(
        (_, idx) => ({ red: 85 * idx, green: 85 * idx, blue: 85 * idx }),
    ), WHITE ] },
    { name: 'RGB', palette: [ RED, GREEN, BLUE ] },
    { name: 'CMYK', palette: [ CYAN, MAGENTA, YELLOW, BLACK ] },
    { name: 'RYB', palette: [ RED, YELLOW, BLUE ] },
    { name: 'Teletext', palette: [ RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, BLACK, WHITE ] },
    { name: '4-bit RGBI', palette: [
        ...Array(8).fill(0).map((_, idx) => ({
            red: idx >= 4 ? 170 : 0,
            green: (idx % 4) >= 2 ? 170 : 0,
            blue: (idx % 2) >= 1 ? 170 : 0,
        })),
        RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, BLACK, WHITE,
    ] },
    { name: 'Apple II', palette: [
        BLACK, MAGENTA, GREEN, WHITE,
        { red: 0, green: 170, blue: 255 }, // blue
        { red: 255, green: 80, blue: 0 }, // orange
    ] },
    { name: 'Game Boy', palette: [
        { red: 41, green: 65, blue: 57 },
        { red: 57, green: 89, blue: 65 },
        { red: 90, green: 121, blue: 66 },
        { red: 123, green: 130, blue: 16 },
    ] },
    { name: 'Trans Pride', palette: [
        { red: 91, green: 206, blue: 250 }, // blue
        { red: 245, green: 169, blue: 184 }, // pink
        WHITE,
    ] },
];

export default DefaultPaletteOption;

