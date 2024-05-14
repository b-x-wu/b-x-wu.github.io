import React, { useState } from 'react';
import { Color, colorToRbgString } from './types';
import ColorPicker from './ColorPicker';

const DEFAULT_COLOR_QUEUE_LENGTH = 12;

interface PixelPaletteProps {
    currentColor: Color | undefined;
    colorQueue: Array<Color | undefined>;
    onPickColor: (color: Color) => void;
}

const PixelPalette: React.FC<PixelPaletteProps> = ({
    currentColor,
    colorQueue,
    onPickColor,
}: PixelPaletteProps) => {
    const [ isColorPickerOpen, setIsColorPickerOpen ] = useState<boolean>(false);

    if (currentColor === undefined) {
        return (<></>);
    }

    const handlePickColor = (color: Color | undefined) => {
        if (color === undefined) {
            return;
        }

        setIsColorPickerOpen(false);
        onPickColor(color);
    };

    return (
        <div className='flex w-full flex-col'>
            <div
                className='aspect-square h-12 w-full border-2 border-dotted bg-clip-content p-1'
                style={ { backgroundColor: colorToRbgString(currentColor)} }
                onClick={ () => setIsColorPickerOpen(true) }
            ></div>
            <div className='flex w-full flex-row'>
                { colorQueue.map((val, idx) => (
                    <div
                        key={ `${val === undefined ? 'empty' : colorToRbgString(val)}-${idx}` }
                        className='h-12 border-2 border-dotted bg-clip-content p-1'
                        style={ { 
                            backgroundColor: val === undefined ? 'rgba(0, 0, 0, 0%)' : colorToRbgString(val),
                            width: `${100/DEFAULT_COLOR_QUEUE_LENGTH}%`,
                        } }
                        onClick={ () => handlePickColor(val) }
                    />
                )).filter((_, idx) => idx < DEFAULT_COLOR_QUEUE_LENGTH) }
            </div>
            { isColorPickerOpen
                ? (
                    <ColorPicker
                        initialColor={ currentColor }
                        onPickColor={ handlePickColor }
                        onClose={ () => setIsColorPickerOpen(false) }
                    />
                ) : (<></>) }
        </div>
    );
};

export default PixelPalette;

