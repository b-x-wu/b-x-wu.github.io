import React from 'react';
import PixelCanvas from './PixelCanvas';

const DEFAULT_PIXELS_PER_SIDE: number = 16;

const PixelSvgMaker: React.FC = () => {
    return (
        <div>
            <PixelCanvas pixelsPerSide={DEFAULT_PIXELS_PER_SIDE} pixelArray={[[{ red: 0, green: 0, blue: 255, alpha: '100%' }]]} />
        </div>
    );
};

export default PixelSvgMaker;

