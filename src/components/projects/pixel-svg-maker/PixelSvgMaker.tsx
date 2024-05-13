import React, { useEffect, useState } from 'react';
import PixelCanvas from './PixelCanvas';
import { Color, BLACK, Mode, Bounds, colorToRbgString } from './types';
import PixelPalette from './PixelPalette';

const DEFAULT_PIXELS_PER_SIDE: number = 16;

const PixelSvgMaker: React.FC = () => {
    const [ pixelArray, setPixelArray ] = useState<Array<Array<Color | undefined>>>(
        Array(DEFAULT_PIXELS_PER_SIDE).fill(Array(DEFAULT_PIXELS_PER_SIDE).fill(undefined)),
    );
    const [ colorQueue, setColorQueue ] = useState<Color[]>([ BLACK ]);
    const [ mode, setMode ] = useState<Mode>(Mode.PENCIL);
    const [ svgString, setSvgString ] = useState<string>('');

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

    const pixelArrayToSvgString = () => {
        const bounds: Partial<Bounds> = {
            x: undefined,
            y: undefined,
            width: undefined,
            height: undefined,
        };

        const rectStrings: string[] = pixelArray.reduce<string[]>((accumulator, pixelRow, yIndex) => {
            const rowRectStrings: string[] = pixelRow.map((pixel, xIndex) => {
                if (pixel === undefined) {
                    return undefined;
                }

                if (bounds.x === undefined || bounds.y === undefined) {
                    bounds.x = xIndex;
                    bounds.y = yIndex;
                }

                if (bounds.width === undefined || (bounds.x !== undefined && bounds.width < xIndex - bounds.x)) {
                    bounds.width = xIndex - bounds.x;
                }
                
                if (bounds.height === undefined || (bounds.y !== undefined && bounds.height < yIndex - bounds.y)) {
                    bounds.height = yIndex - bounds.y;
                }

                return `<rect width="1" height="1" x="${xIndex}" y="${yIndex}" fill="${colorToRbgString(pixel)}"></rect>`;
            }).filter<string>((val): val is string => val !== undefined);

            return [ ...accumulator, ...rowRectStrings ];
        }, []);

        if (bounds.x === undefined || bounds.y === undefined || bounds.width === undefined || bounds.height === undefined) {
            return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>';
        }

        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" '
            + `viewBox="${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}" `
            + `preserveAspectRatio="xMidYMid meet">${rectStrings.join('')}</svg>`;
    };

    useEffect(() => {
        setSvgString(pixelArrayToSvgString());
    }, [ pixelArray ]);

    return (
        <div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-x-2'>
                    <button onClick={ () => setMode(Mode.PENCIL) } style={ { border: mode === Mode.PENCIL ? '2px dotted' : undefined } }>PENCIL</button>
                    <button onClick={ () => setMode(Mode.ERASER) } style={ { border: mode === Mode.ERASER ? '2px dotted' : undefined } }>ERASER</button>
                </div>
                <div className='flex flex-row gap-x-2'>
                    <a href={ URL.createObjectURL(new Blob([ svgString ], { type: 'image/svg+xml' })) } download='pixel-art.svg'>DOWNLOAD SVG</a>
                    <button onClick={ () => navigator.clipboard.writeText(svgString) }>COPY TO CLIPBOARD</button>
                </div>
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

