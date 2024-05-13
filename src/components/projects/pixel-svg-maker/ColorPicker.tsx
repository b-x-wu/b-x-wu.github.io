import React, { useEffect, useState } from 'react';
import { Color, colorToHexString, colorToRbgString, hexStringToColor } from './types';

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

    const [ hexValue, setHexValue ] = useState<string>('');

    useEffect(() => {
        setRed(initialColor.red);
        setGreen(initialColor.green);
        setBlue(initialColor.blue);
        setHexValue(colorToHexString(initialColor));
    }, [ initialColor ]);

    const handleHexValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const color = hexStringToColor(event.target.value);
        console.log(color);
        
        if (color !== undefined) {
            setRed(color.red);
            setGreen(color.green);
            setBlue(color.blue);
            setHexValue(colorToHexString(color));
            return;
        }

        setHexValue(event.target.value);
    };

    return (
        <div className='absolute flex w-64 flex-col gap-y-2 border-2 border-dotted bg-white p-2'>
            <div
                className='h-6 w-full'
                style={ { backgroundColor: colorToRbgString({ red, green, blue}) } }
            ></div>
            <div className='flex basis-4/6 flex-col gap-y-2'>
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
                <div className='flex flex-row justify-between gap-x-2'>
                    <div className='flex w-9/12 flex-row gap-x-2'>
                        <div>#</div>
                        <input
                            type='text'
                            id='hex-input'
                            value={ hexValue }
                            onChange={ handleHexValueChange }
                            className='grow border border-black pr-2 text-right'
                        />
                    </div>
                    <div>Hex</div>
                </div>
                <div className='flex flex-row justify-between gap-x-2 text-sm'>
                    <button className='text-disabled hover:underline hover:underline-offset-2' onClick={ onClose }>Cancel</button>
                    <button className='text-enabled hover:underline hover:underline-offset-2' onClick={ () => onPickColor({ red, green, blue }) }>Set Color</button>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;

