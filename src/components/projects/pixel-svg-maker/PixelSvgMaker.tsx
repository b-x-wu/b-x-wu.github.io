import React, { useState } from 'react';
import PixelCanvas from './PixelCanvas';
import { Color, BLACK } from './types';
import PixelPalette from './PixelPalette';

const DEFAULT_PIXELS_PER_SIDE: number = 16;

const PixelSvgMaker: React.FC = () => {
    const [ pixelArray, setPixelArray ] = useState<Array<Array<Color | undefined>>>(
        Array(DEFAULT_PIXELS_PER_SIDE).fill(Array(DEFAULT_PIXELS_PER_SIDE).fill(undefined)),
    );
    const [ colorQueue, setColorQueue ] = useState<Color[]>([ BLACK ]);

    // pixel click handler
    const handlePixelClick = (pixelX: number, pixelY: number) => {
        const currentColor = colorQueue.at(0);
        if (currentColor === undefined) {
            return;
        }

        const newPixelArray = pixelArray.map((pixelRow, yIndex) => {
            return pixelRow.map((pixel, xIndex) => {
                if (xIndex === pixelX && yIndex === pixelY) {
                    return currentColor;
                }
                
                if (pixel === undefined) {
                    return undefined;
                }

                return { ...pixel };
            });
        });
        setPixelArray(newPixelArray);
    };

    const handlePickColor = (color: Color) => {
        const newColorQueue = [ color ];
        colorQueue.forEach((color) => newColorQueue.push({ ...color }));
        setColorQueue(newColorQueue);
    };

    return (
        <div>
            <PixelCanvas
                pixelsPerSide={ DEFAULT_PIXELS_PER_SIDE }
                pixelArray={ pixelArray }
                handlePixelClick={ handlePixelClick }
            />
            <PixelPalette
                currentColor={ colorQueue.at(0) }
                colorQueue={ colorQueue.slice(1) }
                onPickColor={ handlePickColor }
            />
        </div>
    );
};

export default PixelSvgMaker;

