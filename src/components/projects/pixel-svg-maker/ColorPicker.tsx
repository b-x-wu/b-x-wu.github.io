import React, { useEffect, useRef, useState } from 'react';
import { Color, colorToHexString, colorToRgbString, hexStringToColor } from './types';
import Slider from '../../common/Slider';

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
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current === null) {
            return;
        }

        const handleClick = (event: Event) => {
            if (!ref.current?.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        setRed(initialColor.red);
        setGreen(initialColor.green);
        setBlue(initialColor.blue);
        setHexValue(colorToHexString(initialColor));
    }, [ initialColor ]);

    const handleHexValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const color = hexStringToColor(event.target.value);
        
        if (color !== undefined) {
            setRed(color.red);
            setGreen(color.green);
            setBlue(color.blue);
            setHexValue(colorToHexString(color));
            return;
        }

        setHexValue(event.target.value);
    };

    useEffect(() => {
        setHexValue(colorToHexString({ red, green, blue }));
    }, [ red, green, blue ]);

    return (
        <div ref={ ref } className='absolute bottom-0 flex w-72 flex-col gap-y-4 border-2 border-dotted bg-white p-4'>
            <div
                className='h-6 w-full'
                style={ { backgroundColor: colorToRgbString({ red, green, blue}) } }
            ></div>
            <div className='flex basis-4/6 flex-col gap-y-2'>
                <div className='flex flex-row justify-between'>
                    <Slider
                        min={ 0 }
                        max={ 255 }
                        id='red-slider'
                        step={ 1 }
                        value={ red }
                        containerStyle={ { width: '75%', height: '4px', margin: 'auto 0' } }
                        barStyle={ { background: `linear-gradient(90deg, ${colorToRgbString({ red: 0, green, blue })} 0%, ${colorToRgbString({ red: 255, green, blue})} 100%)`, cursor: 'pointer' } }
                        thumbStyle={ { cursor: 'pointer', height: '12px', width: '12px', aspectRatio: '1 / 1', background: '#000', maskImage: 'url("/static/icons/crosshair.svg")', maskRepeat: 'no-repeat', WebkitMaskImage: 'url("/static/icons/crosshair.svg")', WebkitMaskRepeat: 'no-repeat', top: '-4px' } }
                        onChange={ (value) => setRed(value) }
                    />
                    <label htmlFor='red-slider'>Red</label>
                </div>
                <div className='flex flex-row justify-between'>
                    <Slider
                        min={ 0 }
                        max={ 255 }
                        id='green-slider'
                        step={ 1 }
                        value={ green }
                        containerStyle={ { width: '75%', height: '4px', margin: 'auto 0' } }
                        barStyle={ { background: `linear-gradient(90deg, ${colorToRgbString({ red, green: 0, blue })} 0%, ${colorToRgbString({ red, green: 255, blue})} 100%)`, cursor: 'pointer' } }
                        thumbStyle={ { cursor: 'pointer', height: '12px', width: '12px', aspectRatio: '1 / 1', background: '#000', maskImage: 'url("/static/icons/crosshair.svg")', maskRepeat: 'no-repeat', WebkitMaskImage: 'url("/static/icons/crosshair.svg")', WebkitMaskRepeat: 'no-repeat', top: '-4px' } }
                        onChange={ (value) => setGreen(value) }
                    />
                    <label htmlFor='green-slider'>Green</label>
                </div>
                <div className='flex flex-row justify-between'>
                    <Slider
                        min={ 0 }
                        max={ 255 }
                        id='blue-slider'
                        step={ 1 }
                        value={ blue }
                        containerStyle={ { width: '75%', height: '4px', margin: 'auto 0' } }
                        barStyle={ { background: `linear-gradient(90deg, ${colorToRgbString({ red, green, blue: 0 })} 0%, ${colorToRgbString({ red, green, blue: 255 })} 100%)`, cursor: 'pointer' } }
                        thumbStyle={ { cursor: 'pointer', height: '12px', width: '12px', aspectRatio: '1 / 1', background: '#000', maskImage: 'url("/static/icons/crosshair.svg")', maskRepeat: 'no-repeat', WebkitMaskImage: 'url("/static/icons/crosshair.svg")', WebkitMaskRepeat: 'no-repeat', top: '-4px' } }
                        onChange={ (value) => setBlue(value) }
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

