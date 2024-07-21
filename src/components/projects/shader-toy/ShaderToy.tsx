import React, { useEffect, useRef } from 'react';
import vertexShaderSource from './shaders/vertex-shader-2d.glsl';
import fragmentShaderSource from './shaders/fragment-shader-2d.glsl';
import {
    initProgram,
    initArrayBuffer,
    initTexture,
    setTexture,
    setAttributeToArrayBuffer,
    clearFrame,
} from '../../common/webglUtils';

const IMG_URL = 'https://pbs.twimg.com/media/GSxczsHbYAAdrcv?format=jpg';

const ShaderToy: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shaderedCanvasRef = useRef<HTMLCanvasElement>(null);

    const initializeShader = (source: HTMLVideoElement | HTMLImageElement, gl: WebGL2RenderingContext) => {
        console.dir(source);
        const program = initProgram(gl, vertexShaderSource, fragmentShaderSource);

        if (program === undefined) {
            throw new Error('Program not initialized');
        }

        const positionBuffer = initArrayBuffer(
            gl,
            new Float32Array([
                0.0, 0.0,
                gl.canvas.width, 0.0,
                0.0, gl.canvas.height,
                0.0, gl.canvas.height,
                gl.canvas.width, 0.0,
                gl.canvas.width, gl.canvas.height,
            ]),
        );
        
        const texCoordBuffer = initArrayBuffer(
            gl,
            new Float32Array([
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                0.0, 1.0,
                1.0, 0.0,
                1.0, 1.0,
            ]),
        );

        if (positionBuffer === undefined || texCoordBuffer === undefined) {
            throw new Error('Could not initialize buffers');
        }
        
        const texture = initTexture(gl);

        if (texture === undefined) {
            throw new Error('Could not initialize texture');
        }

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        return [ program, positionBuffer, texCoordBuffer, texture ];
    };

    const drawFrame = (gl: WebGL2RenderingContext, program: WebGLProgram, positionBuffer: WebGLBuffer, texCoordBuffer: WebGLBuffer, texture: WebGLBuffer) => {
        clearFrame(gl);
        gl.useProgram(program);

        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        setAttributeToArrayBuffer(gl, positionBuffer, positionLocation);

        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        setAttributeToArrayBuffer(gl, texCoordBuffer, texCoordLocation);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                const canvas = canvasRef.current;
                const canvasContext = canvas?.getContext('2d') ?? undefined;
                const shaderedCanvas = shaderedCanvasRef.current;
                const gl = shaderedCanvas?.getContext('webgl2') ?? undefined;
                if (canvas === null || canvasContext === undefined || shaderedCanvas === null || gl === undefined) {
                    return;
                }

                const devicePixelRatio = window.devicePixelRatio ?? 1;

                canvas.width = Math.floor(devicePixelRatio * canvas.clientWidth);
                canvas.height = Math.floor(devicePixelRatio * canvas.clientHeight);

                shaderedCanvas.width = Math.floor(devicePixelRatio * shaderedCanvas.clientWidth);
                shaderedCanvas.height = Math.floor(devicePixelRatio * shaderedCanvas.clientHeight);

                let isVideoPlaying = false;
                let isVideoTimeUpdating = false;
                const video = document.createElement('video');

                video.addEventListener('playing', () => {
                    isVideoPlaying = true;
                }, true);

                video.addEventListener('timeupdate', () => {
                    isVideoTimeUpdating = true;
                }, true);

                video.addEventListener('play', (event: Event) => {
                    const targetVideo = event.target as HTMLVideoElement;
                    const [ program, positionBuffer, texCoordBuffer, texture ] = initializeShader(targetVideo, gl);
                    const render = () => {
                        if (isVideoPlaying && isVideoTimeUpdating) {
                            setTexture(gl, texture, targetVideo);
                        }

                        canvasContext.drawImage(targetVideo, 0, 0, canvas.width, canvas.height);
                        drawFrame(gl, program, positionBuffer, texCoordBuffer, texture);

                        requestAnimationFrame(render);
                    };

                    requestAnimationFrame(render);
                }, false);

                video.srcObject = stream;
                video.play();

                const image = document.createElement('img');
                image.crossOrigin = 'anonymous';

                image.addEventListener('load', (event: Event) => {
                    // console.log('image loaded');
                    // const [ program, positionBuffer, texCoordBuffer, texture ] = initializeShader(event.target as HTMLImageElement, gl);
                    // 
                    // const render = () => {
                    //     setTexture(gl, texture, event.target as HTMLImageElement);
                    //     drawFrame(gl, program, positionBuffer, texCoordBuffer, texture);
                    //     requestAnimationFrame(render);
                    // };
                    // requestAnimationFrame(render);
                }, false);

                image.src = 'https://pbs.twimg.com/media/GSxczsHbYAAdrcv?format=jpg';

            })
            // TODO: Visible error logging
            .catch(console.error);
    }, []);

    return (
        <div>
            <canvas className="h-96 w-full" ref={ canvasRef } />
            <canvas className="h-96 w-full" ref={ shaderedCanvasRef } />
        </div>
    );
};

export default ShaderToy;

