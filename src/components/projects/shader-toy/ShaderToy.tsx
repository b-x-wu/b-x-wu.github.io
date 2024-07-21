import React, { useEffect, useRef, useState } from 'react';
import vertexShaderSourceText from './shaders/vertex-shader-2d.glsl';
import fragmentShaderSourceText from './shaders/fragment-shader-2d.glsl';
import {
    setTexture,
    setAttributeToArrayBuffer,
    clearFrame,
} from '../../common/webglUtils';
import { DATA_READY_EVENT_TYPE, createVideo, deleteGlResources, initializeShader } from './utils';

    
const ShaderToy: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ video, setVideo ] = useState<HTMLVideoElement | undefined>(undefined);
    const [ fragmentShaderSource, setFragmentShaderSource ] = useState<string>(fragmentShaderSourceText);
    const [ glProgram, setGlProgram ] = useState<WebGLProgram | undefined>(undefined);
    const [ glPositionBuffer, setGlPositionBuffer ] = useState<WebGLBuffer | undefined>(undefined);
    const [ glTexCoordBuffer, setGlTexCoordBuffer ] = useState<WebGLBuffer | undefined>(undefined);
    const [ glTexture, setGlTexture ] = useState<WebGLTexture | undefined>(undefined);
    const [ animationFrameHandle, setAnimationFrameHandle ] = useState<number | undefined>(undefined);

    const drawFrame = (
        gl: WebGL2RenderingContext, 
        program: WebGLProgram, 
        positionBuffer: WebGLBuffer, 
        texCoordBuffer: WebGLBuffer, 
    ) => {
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
        const canvas = canvasRef.current;
        const gl = canvas?.getContext('webgl2') ?? undefined;
        if (canvas === null || gl === undefined || video === undefined) {
            return;
        }

        deleteGlResources(gl, glProgram, glPositionBuffer, glTexCoordBuffer, glTexture);

        const glResources = initializeShader(
            vertexShaderSourceText,
            fragmentShaderSource,
            video,
            gl,
            canvas,
            console.error,
        );

        if (glResources === undefined) {
            return;
        }
        const [ program, positionBuffer, texCoordBuffer, texture ] = glResources;

        setGlProgram(program);
        setGlPositionBuffer(positionBuffer);
        setGlTexCoordBuffer(texCoordBuffer);
        setGlTexture(texture);
    }, [ fragmentShaderSource, video ]);

    useEffect(() => {
        if (
            video === undefined
            || glProgram === undefined
            || glPositionBuffer === undefined
            || glTexCoordBuffer === undefined
            || glTexture === undefined
        ) {
            return;
        }

        const canvas = canvasRef.current;
        const gl = canvas?.getContext('webgl2') ?? undefined;
        if (gl === undefined) {
            return;
        }

        if (animationFrameHandle !== undefined) {
            cancelAnimationFrame(animationFrameHandle);
        }

        const render = () => {
            setTexture(gl, glTexture, video);
            drawFrame(gl, glProgram, glPositionBuffer, glTexCoordBuffer);
            requestAnimationFrame(render);
        };

        const currentAnimationFrameHandle = requestAnimationFrame(render);
        setAnimationFrameHandle(currentAnimationFrameHandle);

        return () => cancelAnimationFrame(currentAnimationFrameHandle);
    }, [ glProgram, glPositionBuffer, glTexCoordBuffer, glTexture ]);


    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                const canvas = canvasRef.current;
                const gl = canvas?.getContext('webgl2') ?? undefined;
                if (canvas === null || gl === undefined) {
                    return;
                }

                const video = createVideo();
                
                video.addEventListener(DATA_READY_EVENT_TYPE, (event: Event) => {
                    setVideo(event.target as HTMLVideoElement);
                }, false);

                video.srcObject = stream;
                video.play();
            })
            // TODO: Visible error logging
            .catch(console.error);
    }, []);

    return (
        <div>
            <canvas className="w-full" ref={ canvasRef } />
        </div>
    );
};

export default ShaderToy;

