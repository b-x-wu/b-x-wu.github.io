import React, { useEffect, useRef, useState } from 'react';
import PalettePicker from './PalettePicker';
import { RgbColor, toHslColor, toRgbColor } from '../../common/colorUtils';
import { hueColorMetric } from './utils';
import ImageUploader from '../../common/ImageUploader';

const PaletePosterization: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ palette, setPalette ] = useState<RgbColor[]>([]);
    const [ imageColors, setImageColors ] = useState<RgbColor[]>([]);

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

        const adjustedColors = imageColors.map((color) => {
            const closestPaletteColor = palette.reduce<{ color: RgbColor | undefined; distance: number }>((previousClosest, paletteColor) => {
                const distance = hueColorMetric(color, paletteColor);
                if (previousClosest.color === undefined) {
                    return { color: paletteColor, distance };
                }

                if (distance < previousClosest.distance) {
                    return { color: paletteColor, distance };
                }

                return previousClosest;
            }, { color: undefined, distance: Infinity }).color!;

            // TODO: implement a function of the shape (color, closestPaletteColor) => color to set
            // return closestPaletteColor;
            return ((currentColor: RgbColor, closestPaletteColor: RgbColor) => {
                const currentHslColor = toHslColor(currentColor);
                const closestPaletteHslColor = toHslColor(closestPaletteColor);

                return toRgbColor({ ...currentHslColor, hue: closestPaletteHslColor.hue });
            })(color, closestPaletteColor);
        });

        const newRawImageData = new Uint8ClampedArray(canvas.width * canvas.height * 4);
        newRawImageData.set(adjustedColors.flatMap((color) => ([ color.red, color.green, color.blue, 255 ])));
        const newImageData = new ImageData(newRawImageData, canvas.width, canvas.height, { colorSpace: 'srgb' });
        context.putImageData(newImageData, 0, 0);
    }, [ palette ]);

    return (
        <div>
            { imageColors.length === 0 && (
                <ImageUploader
                    onImageLoad={ handleImageLoad }
                />
            ) }
            <canvas ref={ canvasRef } className={ imageColors.length === 0 ? 'hidden' : 'size-full' } />
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

