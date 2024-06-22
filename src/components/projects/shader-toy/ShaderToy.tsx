import React, { useEffect, useRef } from 'react';

const FRAME_RATE = 24; // fps

const ShaderToy: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                const canvasContext = canvas?.getContext('2d') ?? undefined;
                if (video === null || canvas === null || canvasContext === undefined) {
                    return;
                }

                const drawVideoFrame = (event: Event) => {
                    canvasContext.drawImage((event.target as HTMLVideoElement), 0, 0, canvas.width, canvas.height);
                    setTimeout(drawVideoFrame, 1 / FRAME_RATE, event);
                };
                    
                video.srcObject = stream;
                video.addEventListener('loadedmetadata', video.play, false);
                video.addEventListener('play', drawVideoFrame, false);
            })
            .catch((error) => {
                // TODO: visible error logging
                console.error(error);
            });
    }, []);

    return (
        <div>
            <video className='hidden' autoPlay ref={ videoRef } />
            <canvas ref={ canvasRef } />
        </div>
    );
};

export default ShaderToy;

