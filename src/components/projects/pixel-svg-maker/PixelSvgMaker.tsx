import React, { useEffect, useState } from 'react';
import PixelCanvas from './PixelCanvas';
import { Color, BLACK, Mode, Bounds, colorToRgbString } from './types';
import PixelPalette from './PixelPalette';

const DEFAULT_PIXELS_PER_SIDE: number = 16;

const PixelSvgMaker: React.FC = () => {
    const [ pixelArray, setPixelArray ] = useState<Array<Array<Color | undefined>>>(
        Array(DEFAULT_PIXELS_PER_SIDE).fill(Array(DEFAULT_PIXELS_PER_SIDE).fill(undefined)),
    );
    const [ history, setHistory ] = useState<Array<Array<Array<Color | undefined>>>>([
        Array(DEFAULT_PIXELS_PER_SIDE).fill(Array(DEFAULT_PIXELS_PER_SIDE).fill(undefined)),
    ]);
    const [ colorQueue, setColorQueue ] = useState<Color[]>([ BLACK ]);
    const [ mode, setMode ] = useState<Mode>(Mode.PENCIL);
    const [ svgString, setSvgString ] = useState<string>('');

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'e':
                    return setMode(Mode.ERASER);
                case 'p':
                case 'b':
                    return setMode(Mode.PENCIL);
                default:
                    return;
            };
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

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

    const handleDrawEnd = () => {
        const newHistory = [
            pixelArray.map((row) => row.map((pixel) => pixel === undefined ? undefined : { ...pixel })),
            ...history.map(
                (state) => state.map((row) => row.map((pixel) => pixel === undefined ? undefined : { ...pixel })),
            ),
        ];
        setHistory(newHistory);
    };

    const handleUndo = () => {
        const newHistory = history.slice(1).map((state) => state.map((row) => row.map((pixel) => pixel === undefined ? undefined : { ...pixel })));
        const previousState = newHistory.at(0);
        if (previousState === undefined) {
            return;
        }

        setPixelArray(previousState.map((row) => row.map((pixel) => pixel === undefined ? undefined : { ...pixel })));
        setHistory(newHistory);
    };

    const handlePickColor = (color: Color) => {
        const newColorQueue = [ color ];
        colorQueue.forEach((color) => newColorQueue.push({ ...color }));
        setColorQueue(newColorQueue);
    };

    const pixelArrayToSvgString = () => {
        const bounds: Partial<Bounds> = {
            xMin: undefined,
            yMin: undefined,
            xMax: undefined,
            yMax: undefined,
        };

        const rectStrings: string[] = pixelArray.reduce<string[]>((accumulator, pixelRow, yIndex) => {
            const rowRectStrings: string[] = pixelRow.map((pixel, xIndex) => {
                if (pixel === undefined) {
                    return undefined;
                }

                if (bounds.xMin === undefined || xIndex < bounds.xMin) {
                    bounds.xMin = xIndex;
                }
                
                if (bounds.yMin === undefined || yIndex < bounds.yMin) {
                    bounds.yMin = yIndex;
                }

                if (bounds.xMax === undefined || xIndex > bounds.xMax) {
                    bounds.xMax = xIndex;
                }
                
                if (bounds.yMax === undefined || yIndex > bounds.yMax) {
                    bounds.yMax = yIndex;
                }

                return `<rect width="1" height="1" x="${xIndex}" y="${yIndex}" fill="${colorToRgbString(pixel)}"></rect>`;
            }).filter<string>((val): val is string => val !== undefined);

            return [ ...accumulator, ...rowRectStrings ];
        }, []);

        if (bounds.xMin === undefined || bounds.yMin === undefined || bounds.xMax === undefined || bounds.yMax === undefined) {
            return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>';
        }

        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" '
            + `viewBox="${bounds.xMin} ${bounds.yMin} ${bounds.xMax - bounds.xMin + 1} ${bounds.yMax - bounds.yMin + 1}" `
            + `preserveAspectRatio="xMidYMid meet">${rectStrings.join('')}</svg>`;
    };

    useEffect(() => {
        setSvgString(pixelArrayToSvgString());
    }, [ pixelArray ]);

    return (
        <div className='relative flex flex-col gap-y-2'>
            <div className='flex flex-row flex-wrap justify-between'>
                <div className='flex max-w-1/5 flex-row gap-x-2'>
                    <button className='outline-primary size-10 max-w-1/2 p-1 outline' onClick={ () => setMode(Mode.PENCIL) } style={ { outlineWidth: mode === Mode.PENCIL ? '2px' : '0px' } }>
                        <div aria-description='Set pencil mode' className='bg-text m-auto size-5 bg-clip-[url(/static/icons/pencil.svg)]' />
                    </button>
                    <button className='outline-primary size-10 max-w-1/2 p-1 outline' onClick={ () => setMode(Mode.ERASER) } style={ { outlineWidth: mode === Mode.ERASER ? '2px' : '0px' } }>
                        <div aria-description='Set eraser mode' className='bg-text m-auto size-5 bg-clip-[url(/static/icons/eraser.svg)]' />
                    </button>
                    <button className='size-10 max-w-1/2 p-1' onClick={ handleUndo }>
                        <div aria-description='Undo' className='bg-text m-auto size-5 bg-clip-[url(/static/icons/undo.svg)]' />
                    </button>
                </div>
                <div className='flex max-w-1/5 flex-row gap-x-2'>
                    <a href={ URL.createObjectURL(new Blob([ svgString ], { type: 'image/svg+xml' })) } download='pixel-art.svg' className='outline-enabled flex size-10 max-w-1/2 items-center justify-center p-1 outline outline-2'>
                        <div aria-description='Download pixel art as svg' className='bg-text m-auto size-5 bg-clip-[url(/static/icons/download.svg)]' />
                    </a>
                    <button onClick={ () => navigator.clipboard.writeText(svgString) } className='outline-enabled flex size-10 max-w-1/2 items-center justify-center p-1 outline outline-2'>
                        <div aria-description='Copy pixel art to clipboard' className='bg-text m-auto size-5 bg-clip-[url(/static/icons/clipboard.svg)]' />
                    </button>
                </div>
            </div>
            <PixelCanvas
                pixelsPerSide={ DEFAULT_PIXELS_PER_SIDE }
                pixelArray={ pixelArray }
                onPixelClick={ handlePixelClick }
                onDrawEnd={ handleDrawEnd }
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

