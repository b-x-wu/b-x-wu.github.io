import React, { useState } from 'react';
import { Color, colorToRbgString } from './types';
import ColorPicker from './ColorPicker';

const DEFAULT_COLOR_QUEUE_LENGTH = 4;

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
        <div className='relative flex w-full flex-row'>
            <div
                className='h-10 w-2/6'
                style={ { backgroundColor: colorToRbgString(currentColor)} }
                onClick={ () => setIsColorPickerOpen(true) }
            ></div>
            { colorQueue.map((val, idx) => (
                <div
                    key={ `${val === undefined ? 'empty' : colorToRbgString(val)}-${idx}` }
                    className='h-5 w-1/6'
                    style={ { backgroundColor: val === undefined ? 'rgba(0, 0, 0, 0%)' : colorToRbgString(val) } }
                    onClick={ () => handlePickColor(val) }
                />
            )).filter((_, idx) => idx < DEFAULT_COLOR_QUEUE_LENGTH) }
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

