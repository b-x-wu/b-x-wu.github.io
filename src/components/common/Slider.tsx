import React, { useEffect, useRef, useState } from 'react';

interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    id?: string;
    value?: number;
    barStyle?: React.CSSProperties;
    thumbStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
}

const Slider: React.FC<SliderProps> = ({
    min = 0,
    max = 100,
    step,
    defaultValue,
    onChange,
    id,
    value,
    barStyle,
    thumbStyle,
    containerStyle,
}: SliderProps) => {

    const [ _value, _setValue ] = useState<number>(0);
    const [ isSettingValue, setIsSettingValue ] = useState<boolean>(false);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value !== undefined) {
            _setValue(value);
        }
    }, [ value ]);

    useEffect(() => {
        if (defaultValue !== undefined) {
            _setValue(defaultValue);
            return;
        }

        if (max < min) {
            _setValue(min);
            return;
        }

        if (value !== undefined) {
            _setValue(value);
            return;
        }

        _setValue(min + (max - min) / 2);
    }, []);

    const handleValueChange = (barElement: HTMLDivElement, clientX: number) => {
        if (max < min) {
            return;
        }

        const barBounds = barElement.getBoundingClientRect();
        const clickXPercent = Math.max(Math.min((clientX - barBounds.left) / barBounds.width, 1), 0);

        const rawValue = (max - min) * clickXPercent + min;
        
        if (step === undefined) {
            onChange?.(rawValue);
            _setValue(rawValue);
            return;
        }

        const steppedValue = _value + step * (Math.round((rawValue - _value) / step));
        onChange?.(steppedValue);
        _setValue(steppedValue);
    };

    const handleSliderBarMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsSettingValue(true);
        handleValueChange(event.target as HTMLDivElement, event.clientX);
    };

    const handleSliderBarTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.touches.item(0);
        if (touch === null) {
            return;
        }

        setIsSettingValue(true);
        handleValueChange(event.target as HTMLDivElement, touch.clientX);
    };

    useEffect(() => {
        const barElement = barRef.current;
        if (barElement === null) {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            event.stopPropagation();
            if (!isSettingValue) {
                return;
            }
            handleValueChange(barElement, event.screenX);
        };

        const handleTouchMove = (event: TouchEvent) => {
            const touch = event.touches.item(0);
            if (touch === null) {
                return;
            }

            if(!isSettingValue) {
                return;
            }
            handleValueChange(barElement, touch.clientX);

            event.stopPropagation();
            event.preventDefault();
        };
            
        const handleEnd = () => setIsSettingValue(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchup', handleEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchup', handleEnd);
        };
    }, [ isSettingValue ]);

    return (
        <div className='relative h-1 w-full' style={ containerStyle } id={ id }>
            <div
                style={ barStyle }
                ref={ barRef }
                className='size-full bg-black'
                onMouseDown={ handleSliderBarMouseDown } onTouchStart={ handleSliderBarTouchStart }
            ></div>
            <div
                className='absolute inset-y-0 size-1 bg-primary'
                onMouseDown={ () => setIsSettingValue(true) } onTouchStart={ () => setIsSettingValue(true) }
                style={ {...(thumbStyle ?? {}), left: thumbStyle?.width === undefined ? `${_value * 100 / max}%` : `calc(${_value * 100 / max}% - ${thumbStyle.width} / 2` } }
            ></div>
        </div>
    );
};

export default Slider;
