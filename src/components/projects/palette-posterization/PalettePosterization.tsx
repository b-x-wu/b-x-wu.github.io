import React, { useCallback, useEffect, useRef, useState } from 'react';
import PalettePicker from './PalettePicker';
import { RgbColor } from '../../common/colorUtils';
import { ColorPaletteChangeRequestData, ColorPaletteChangeResponseData, getAdjustedColors } from './utils';
import ImageUploader from '../../common/ImageUploader';

const PaletePosterization: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ palette, setPalette ] = useState<RgbColor[]>([]);
    const [ imageColors, setImageColors ] = useState<RgbColor[]>([]);
    const [ isPaletteChangeLoading, setIsPaletteChangeLoading ] = useState<boolean>(false);

    const putImageData = useCallback((colors: RgbColor[], canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
        const newRawImageData = new Uint8ClampedArray(canvas.width * canvas.height * 4);
        newRawImageData.set(colors.flatMap((color) => ([ color.red, color.green, color.blue, 255 ])));
        const newImageData = new ImageData(newRawImageData, canvas.width, canvas.height, { colorSpace: 'srgb' });
        context.putImageData(newImageData, 0, 0);
    }, []);

    const handleImageLoad = (image: HTMLImageElement) => {
        const canvas = canvasRef.current ?? undefined;
        const context = canvas?.getContext('2d') ?? undefined;

        if (canvas === undefined || context === undefined) {
            return;
        }

        const devicePixelRatio = window.devicePixelRatio;

        canvas.width = image.width * devicePixelRatio;
        canvas.height = image.height * devicePixelRatio;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height, { colorSpace: 'srgb' });
        const colors = imageData.data.reduce<RgbColor[]>((accumulator, _, index, array) => {
            if (index % 4 === 0) {
                const red = array.at(index);
                const green = array.at(index + 1);
                const blue = array.at(index + 2);
                // skip alpha

                if (red === undefined || green === undefined || blue === undefined) {
                    throw new Error('Unable to parse image data.');
                }
                accumulator.push({ red, green, blue });
            }
            return accumulator;
        }, []);

        setImageColors(colors);
    };

    useEffect(() => {
        const canvas = canvasRef.current ?? undefined;
        const context = canvas?.getContext('2d') ?? undefined;

        if (canvas === undefined || context === undefined || palette.length === 0) {
            return;
        }

        setIsPaletteChangeLoading(true);

        if (window.Worker) {
            const worker = new Worker(new URL('./paletteChangeWorker.ts', import.meta.url));

            worker.addEventListener('message', (messageEvent: MessageEvent<ColorPaletteChangeResponseData>) => {
                putImageData(messageEvent.data.adjustedColors, canvas, context);
                setIsPaletteChangeLoading(false);
            });

            worker.postMessage({
                colors: imageColors,
                palette,
            } as ColorPaletteChangeRequestData);

            return;
        }

        const adjustedColors = getAdjustedColors(imageColors, palette);
        putImageData(adjustedColors, canvas, context);
        setIsPaletteChangeLoading(false);
    }, [ palette ]);

    return (
        <div>
            { imageColors.length === 0 && (
                <ImageUploader
                    onImageLoad={ handleImageLoad }
                />
            ) }
            <div className='relative size-fit'>
                <canvas ref={ canvasRef } className={ imageColors.length === 0 ? 'hidden' : 'size-full' } />
                { isPaletteChangeLoading && (
                    <div className='bg-background absolute left-0 top-0 z-10 flex size-full opacity-85'>
                        <div className='m-auto'>Loading...</div>
                    </div>
                ) }
            </div>
            { imageColors.length > 0 && (
                <PalettePicker
                    onPaletteChange={ (newPalette) => setPalette(newPalette) }
                    palette={ palette }
                />
            ) }
        </div>
    );
};

export default PaletePosterization;

