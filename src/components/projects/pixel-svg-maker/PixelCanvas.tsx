import React, { useEffect, useRef, useState } from 'react';

interface PixelCanvasProps {
    /**
     * the number of pixels wide the grid view is
    */
    pixelWidth: number
    /**
     * the number of pixels high the grid view is
    */
    pixelHeight: number
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({
    pixelWidth,
    pixelHeight,
}: PixelCanvasProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ containerWidth, setContainerWidth ] = useState<number | undefined>(undefined);

    const resizeObserver = new ResizeObserver((entries) => {
        const resizedElement = entries.at(0);
        if (resizedElement === undefined) {
            return;
        }

        if (resizedElement.contentRect) {
            setContainerWidth(resizedElement.contentRect.width);
        }
    });

    const setCanvasSize = (canvas: HTMLCanvasElement): void => {
        if (containerWidth === undefined) {
            return;
        }

        if (pixelWidth >= pixelHeight) {
            const height = Math.round(containerWidth * pixelHeight / pixelWidth);
            canvas.width = containerWidth;
            canvas.height = height;
            return;
        }

        const width = Math.round(containerWidth * pixelWidth / pixelHeight);
        canvas.width = width;
        canvas.height = containerWidth;
    };

    const renderPixelGrid = (context: CanvasRenderingContext2D): void => {
        if (containerWidth === undefined) {
            return;
        }

        context.lineWidth = containerWidth / 1000;
        const pixelSideLength = Math.min(context.canvas.width / pixelWidth, context.canvas.height / pixelHeight);
        const scaledPixelSideLength = pixelSideLength * 0.92;
        for (let x = 0; x < pixelWidth; x++) {
            for (let y = 0; y < pixelHeight; y++) {
                const centerX = (x + 0.5) * pixelSideLength;
                const centerY = (y + 0.5) * pixelSideLength;
                context.strokeRect(
                    centerX - scaledPixelSideLength / 2,
                    centerY - scaledPixelSideLength / 2,
                    scaledPixelSideLength,
                    scaledPixelSideLength,
                );
            }
        }
    };

    // subscribe to resize observer
    useEffect(() => {
        const containerElement = containerRef.current;
        if (containerElement === null) {
            return;
        }
        resizeObserver.observe(containerElement);
        return () => resizeObserver.unobserve(containerElement);
    }, []);

    // render grid and array when container size changes, or pixel dimensions change
    useEffect(() => {
        const canvasElement = canvasRef.current;
        if (canvasElement === null || containerWidth === undefined) {
            return;
        }

        // set canvas size
        setCanvasSize(canvasElement);

        const canvasContext = canvasElement.getContext('2d');
        if (canvasContext === null) {
            return;
        }

        renderPixelGrid(canvasContext);

    }, [ pixelWidth, pixelHeight, containerWidth ]);

    return (
        <div ref={containerRef} className='flex aspect-square h-full items-center justify-center'>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default PixelCanvas;

