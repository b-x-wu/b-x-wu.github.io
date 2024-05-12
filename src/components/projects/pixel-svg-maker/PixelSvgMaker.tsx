import React, { useState } from 'react';
import PixelCanvas from './PixelCanvas';
import { Color } from './types';

const DEFAULT_PIXELS_PER_SIDE: number = 16;

const PixelSvgMaker: React.FC = () => {
    const [ pixelArray, setPixelArray ] = useState<Array<Array<Color | undefined>>>(
        Array(DEFAULT_PIXELS_PER_SIDE).fill(Array(DEFAULT_PIXELS_PER_SIDE).fill(undefined)),
    );

    // pixel click handler
    const handlePixelClick = (pixelX: number, pixelY: number) => {
        const newPixelArray = pixelArray.map((pixelRow, yIndex) => {
            return pixelRow.map((pixel, xIndex) => {
                if (xIndex === pixelX && yIndex === pixelY) {
                    return { red: 0, green: 0, blue: 255, alpha: '100%' };
                }
                
                if (pixel === undefined) {
                    return undefined;
                }

                return { ...pixel };
            });
        });
        setPixelArray(newPixelArray);
    };

    return (
        <div>
            <PixelCanvas
                pixelsPerSide={DEFAULT_PIXELS_PER_SIDE}
                pixelArray={pixelArray}
                handlePixelClick={handlePixelClick}
            />
        </div>
    );
};

export default PixelSvgMaker;

