import React, { useEffect, useState } from 'react';
import { Color, colorToString } from './types';

interface ColorPickerProps {
    initialColor: Color;
    onPickColor: (color: Color) => void;
    onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    initialColor,
    onPickColor,
    onClose,
}) => {
    const [ red, setRed ] = useState<number>(0);
    const [ green, setGreen ] = useState<number>(0);
    const [ blue, setBlue ] = useState<number>(0);

    useEffect(() => {
        setRed(initialColor.red);
        setGreen(initialColor.green);
        setBlue(initialColor.blue);
    }, [ initialColor ]);

    return (
        <div className='absolute top-12 flex flex-row gap-x-2 border-2 border-dotted bg-white'>
            <div
                className='size-10'
                style={ { backgroundColor: colorToString({ red, green, blue}) } }
            ></div>
            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-row justify-between'>
                    <input
                        type='range'
                        id='red-slider'
                        min='0' max='255'
                        step='1'
                        value={ red }
                        className='w-9/12 cursor-pointer bg-disabled'
                        onInput={ (event) => setRed(parseInt((event.target as HTMLInputElement).value)) }
                    />
                    <label htmlFor='red-slider'>Red</label>
                </div>
                <div className='flex flex-row justify-between'>
                    <input
                        type='range'
                        id='green-slider'
                        min='0' max='255'
                        step='1'
                        value={ green }
                        className='w-9/12 cursor-pointer bg-disabled'
                        onInput={ (event) => setGreen(parseInt((event.target as HTMLInputElement).value)) }
                    />
                    <label htmlFor='green-slider'>Green</label>
                </div>
                <div className='flex flex-row justify-between'>
                    <input
                        type='range'
                        id='blue-slider'
                        min='0' max='255'
                        step='1'
                        value={ blue }
                        className='w-9/12 cursor-pointer bg-disabled'
                        onInput={ (event) => setBlue(parseInt((event.target as HTMLInputElement).value)) }
                    />
                    <label htmlFor='blue-slider'>Blue</label>
                </div>
                <div className='flex flex-row justify-end'>
                    <button onClick={ onClose }>Cancel</button>
                    <button onClick={ () => onPickColor({ red, green, blue }) }>Set Color</button>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;

