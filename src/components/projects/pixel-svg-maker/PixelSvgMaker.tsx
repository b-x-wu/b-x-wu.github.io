import React, { useState } from 'react';
import PixelCanvas from './PixelCanvas';
import { Color, BLACK, Mode } from './types';
import PixelPalette from './PixelPalette';

const DEFAULT_PIXELS_PER_SIDE: number = 16;

const PixelSvgMaker: React.FC = () => {
    const [ pixelArray, setPixelArray ] = useState<Array<Array<Color | undefined>>>(
        Array(DEFAULT_PIXELS_PER_SIDE).fill(Array(DEFAULT_PIXELS_PER_SIDE).fill(undefined)),
    );
    const [ colorQueue, setColorQueue ] = useState<Color[]>([ BLACK ]);
    const [ mode, setMode ] = useState<Mode>(Mode.PENCIL);

    // pixel click handler
    const handlePixelClick = (pixelX: number, pixelY: number) => {
        const currentColor = colorQueue.at(0);
        if (currentColor === undefined) {
            return;
        }

        const newPixelArray = pixelArray.map((pixelRow, yIndex) => {
            return pixelRow.map((pixel, xIndex) => {
                if (xIndex !== pixelX || yIndex !== pixelY) {
                    return pixel === undefined ? undefined : { ...pixel };
                }

                if (mode === Mode.ERASER) {
                    return undefined;
                }

                return currentColor;
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
            <div className='flex flex-row'>
                <button onClick={ () => setMode(Mode.PENCIL) } style={ { border: mode === Mode.PENCIL ? '2px dotted' : undefined } }>PENCIL</button>
                <button onClick={ () => setMode(Mode.ERASER) } style={ { border: mode === Mode.ERASER ? '2px dotted' : undefined } }>ERASER</button>
            </div>
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

