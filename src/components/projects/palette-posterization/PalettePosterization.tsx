import React, { useEffect, useRef } from 'react';

const TEST_IMAGE_URL = 'https://pbs.twimg.com/media/GQPis7wWsAIuRj5?format=jpg&name=large';

const PaletePosterization: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current ?? undefined;
        const context = canvas?.getContext('2d') ?? undefined;

        if (canvas === undefined || context === undefined) {
            return;
        }

        const image = new Image();
        image.addEventListener('load', () => {
            const aspectRatio = canvas.width / image.width;
            canvas.height = image.height * aspectRatio;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }, false);
        image.src = TEST_IMAGE_URL;
    });

    return (
        <div>
            <canvas ref={ canvasRef } className='size-full' />
        </div>
    );
};

export default PaletePosterization;

