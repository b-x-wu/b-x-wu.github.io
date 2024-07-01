import React, { useState } from 'react';
import ColorPicker from '../../common/ColorPicker';
import { BLACK, RgbColor, colorToHexString } from '../../common/colorUtils';

interface PalettePickerProps {
    /** the current palette */
    palette: RgbColor[];
    /** handler for palette changes. arg is the new palette) */
    onPaletteChange: (palette: RgbColor[]) => void;
}

const PalettePicker: React.FC<PalettePickerProps> = ({
    palette,
    onPaletteChange,
}: PalettePickerProps) => {
    const [ currentOpenPickerIndex, setCurrentOpenPickerIndex ] = useState<number | undefined>(undefined);

    const handlePickColor = (color: RgbColor, paletteIndex: number) => {
        const newPalette = palette.map((oldPaletteColor, oldPaletteIndex) => {
            if (paletteIndex === oldPaletteIndex) {
                return color;
            }
            return { ...oldPaletteColor };
        });
        setCurrentOpenPickerIndex(undefined);
        onPaletteChange(newPalette);
    };

    const paletteElements = palette.map((color, paletteIndex) => (
        <div key={ `palette-picker-${paletteIndex}` } className='relative w-full sm:w-fit' >
            <div 
                className='border-text h-10 w-full border-2 bg-clip-content p-1 hover:cursor-pointer sm:size-10'
                style={ { backgroundColor: `#${colorToHexString(color)}` } }
                onClick={ () => setCurrentOpenPickerIndex(paletteIndex) }
                aria-description='Change current color'
                title='Change current color'
            />
            { paletteIndex === currentOpenPickerIndex && (
                <ColorPicker
                    onPickColor={ (color) => handlePickColor(color, paletteIndex) }
                    initialColor={ color }
                    onClose={ () => setCurrentOpenPickerIndex(undefined) }
                />
            ) }
        </div>
    ));

    const newColorElement = (
        <div key='palette-picker-new' className='relative w-full sm:w-fit' >
            <div
                className='border-text h-10 w-full border-2 hover:cursor-pointer sm:size-10'
                aria-description='Add a new color'
                title='Add a new color'
                onClick={ () => setCurrentOpenPickerIndex(-1) }
            >
                <div className='bg-text m-auto h-full w-4 bg-clip-[url(/static/icons/add.svg)]' aria-hidden={ true }/>
            </div>
            { currentOpenPickerIndex === -1 && (
                <ColorPicker
                    onPickColor={ (newColor) => {
                        onPaletteChange([ ...palette.map((color) => ({ ...color })), newColor ]);
                        setCurrentOpenPickerIndex(undefined);
                    } }
                    initialColor={ BLACK }
                    onClose={ () => setCurrentOpenPickerIndex(undefined) }
                />
            ) }
        </div>
    );

    paletteElements.unshift(newColorElement);

    return (
        <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
            { paletteElements }
        </div>
    );
};

export default PalettePicker;

