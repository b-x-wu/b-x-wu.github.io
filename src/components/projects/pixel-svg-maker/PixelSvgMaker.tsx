import React from 'react';
import PixelCanvas from './PixelCanvas';

const DEFAULT_PIXEL_WIDTH: number = 20;
const DEFAULT_PIXEL_HEIGHT: number = 16;

const PixelSvgMaker: React.FC = () => {
    return (
        <div>
            <PixelCanvas pixelWidth={DEFAULT_PIXEL_WIDTH} pixelHeight={DEFAULT_PIXEL_HEIGHT} />
        </div>
    );
};

export default PixelSvgMaker;

