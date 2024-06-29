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

    const paletteElements = palette.map((color, paletteIndex) => {
        return (
            <div key={ `palette-picker-${paletteIndex}` }>
                <div 
                    className='size-10'
                    style={ { backgroundColor: `#${colorToHexString(color)}` } }
                    onClick={ () => setCurrentOpenPickerIndex(paletteIndex) }
                />
                { paletteIndex === currentOpenPickerIndex ? (
                    <ColorPicker
                        onPickColor={ (color) => handlePickColor(color, paletteIndex) }
                        initialColor={ color }
                        onClose={ () => setCurrentOpenPickerIndex(undefined) }
                    />
                ) : (<></>) }
            </div>
        );
    });

    const newColorElement = (
        <div key='palette-picker-new'>
            <div
                className='size-10 border-2'
                aria-description='Add a new color'
                onClick={ () => setCurrentOpenPickerIndex(-1) }
            >
                { /** Replace with symbol */ }
                +
            </div>
            { currentOpenPickerIndex === -1 ? (
                <ColorPicker
                    onPickColor={ (newColor) => {
                        onPaletteChange([ ...palette.map((color) => ({ ...color })), newColor ]);
                        setCurrentOpenPickerIndex(undefined);
                    } }
                    initialColor={ BLACK }
                    onClose={ () => setCurrentOpenPickerIndex(undefined) }
                />
            ): (<></>) }
        </div>
    );

    paletteElements.push(newColorElement);

    return (
        <div className='flex flex-row space-x-2'>
            { paletteElements }
        </div>
    );
};

export default PalettePicker;

