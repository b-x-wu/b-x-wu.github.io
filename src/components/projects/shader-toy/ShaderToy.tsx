import React, { useEffect, useRef, useState } from 'react';
import vertexShaderSourceText from './shaders/vertex-shader-2d.glsl';
import fragmentShaderSourceText from './shaders/fragment-shader-2d.glsl';
import {
    setTexture,
    setAttributeToArrayBuffer,
    clearFrame,
} from '../../common/webglUtils';
import { DATA_READY_EVENT_TYPE, createVideo, initializeShader } from './utils';

    
const ShaderToy: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ video, setVideo ] = useState<HTMLVideoElement | undefined>(undefined);
    const [ fragmentShaderSource, setFragmentShaderSource ] = useState<string>(fragmentShaderSourceText);
    const [ glProgram, setGlProgram ] = useState<WebGLProgram | undefined>(undefined);
    const [ glPositionBuffer, setGlPositionBuffer ] = useState<WebGLBuffer | undefined>(undefined);
    const [ glTexCoordBuffer, setGlTexCoordBuffer ] = useState<WebGLBuffer | undefined>(undefined);
    const [ glTexture, setGlTexture ] = useState<WebGLTexture | undefined>(undefined);
    const [ animationFrameHandle, setAnimationFrameHandle ] = useState<number | undefined>(undefined);
    const [ errorMessage, setErrorMessage ] = useState<string | undefined>(undefined);

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

        const glResources = initializeShader(
            vertexShaderSourceText,
            fragmentShaderSource,
            video,
            gl,
            canvas,
            setErrorMessage,
        );

        if (glResources === undefined) {
            return;
        }
        const [ program, positionBuffer, texCoordBuffer, texture ] = glResources;

        setErrorMessage(undefined);
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
            try {
                setTexture(gl, glTexture, video);
                drawFrame(gl, glProgram, glPositionBuffer, glTexCoordBuffer);
                requestAnimationFrame(render);
            } catch (e: unknown) {
                setErrorMessage(e instanceof Error ? e.message : String(e));
            }
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
            .catch(setErrorMessage);
    }, []);

    return (
        <div>
            <div className = 'relative size-fit min-w-full'>
                <canvas className="w-full" ref={ canvasRef } />
                { errorMessage !== undefined && (
                    <div className='bg-background absolute left-0 top-0 z-10 flex size-full opacity-85'>
                        <div className='m-auto'>{ errorMessage }</div>
                    </div>
                ) }
            </div>
            <textarea
                className='bg-background min-h-96 w-full border-2 p-2'
                value={ fragmentShaderSource }
                onChange={ (event) => setFragmentShaderSource(event.target.value) }
            />
        </div>
    );
};

export default ShaderToy;

