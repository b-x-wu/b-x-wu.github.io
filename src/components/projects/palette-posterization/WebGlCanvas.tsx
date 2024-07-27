import React, { useEffect, useRef } from 'react';
import { RgbColor } from '../../common/colorUtils';
import { initArrayBuffer, initProgram, initTexture, setAttributeToArrayBuffer, setTexture } from '../../common/webglUtils';
import { ColorMetricType, RenderedColorReducerType } from './utils';

const VERTEX_SHADER = `
attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;

void main() {
    // remap positions to be in the [-1, 1] range
    vec2 clipSpace = ((a_position / u_resolution) * 2.0) - 1.0;
    
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
    v_texCoord = a_texCoord;
}
`

const FRAGMENT_SHADER = `
precision mediump float;

uniform int u_paletteSize;
uniform vec4 u_palette[64];
uniform sampler2D u_image;
varying vec2 v_texCoord;

float metric(in vec4 color1, in vec4 color2)
{
    vec4 diff = color1 - color2;
    return diff.r * diff.r + diff.g * diff.g + diff.b * diff.b;
}

vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    // palette color reducer
    return vec4(paletteColor);
}

void main() {
    if (u_paletteSize == 0)
    {
        gl_FragColor = texture2D(u_image, v_texCoord);
        return;
    }
    
    vec4 currentColor = texture2D(u_image, v_texCoord);
    float minDistance = 1.0 / 0.0; // inf
    float currentDistance = 0.0;
    vec4 paletteColor = vec4(currentColor);

    for(int i = 0; i < 64; i++)
    {
        if (i >= u_paletteSize)
            break;

        currentDistance = metric(currentColor, u_palette[i]);
        
        if (currentDistance < minDistance)
        {
            minDistance = currentDistance;
            paletteColor = vec4(u_palette[i]);
        }
    }

    gl_FragColor = reducer(currentColor, paletteColor);
}
`

interface WebGlCanvasProps {
    image: HTMLImageElement | undefined;
    palette: RgbColor[];
    colorMetric: ColorMetricType;
    colorReducer: RenderedColorReducerType;
}

const WebGlCanvas: React.FC<WebGlCanvasProps> = ({
    image,
    palette,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas?.getContext('webgl2') ?? undefined;

        if (canvas === null || gl === undefined || image === undefined) {
            return;
        }

        const program = initProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
        if (program === undefined) {
            console.error('Program could not be initialized.');
            return;
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(devicePixelRatio * canvas.clientWidth);
        canvas.height = Math.floor(devicePixelRatio * canvas.clientWidth * image.height / image.width);

        const positionBuffer = initArrayBuffer(
            gl,
            new Float32Array([
                0.0, 0.0,
                canvas.width, 0.0,
                0.0, canvas.height,
                0.0, canvas.height,
                canvas.width, 0.0,
                canvas.width, canvas.height,
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
            console.error('Buffers could not be initialized.');
            return;
        }

        const texture = initTexture(gl);
        if (texture === undefined) {
            console.error('Texture could not be initialized.')
            return;
        }

        setTexture(gl, texture, image)
        
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);

        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

        const paletteBufferData = palette.flatMap(
            (color) => [ color.red / 255, color.green / 255, color.blue / 255, 1 ]
        );
        paletteBufferData.push(...((new Array((64 - palette.length) * 4)).fill(0))) // pad with 0s
        const paletteLocation = gl.getUniformLocation(program, 'u_palette');
        gl.uniform4fv(paletteLocation, paletteBufferData);

        const paletteSizeLocation = gl.getUniformLocation(program, 'u_paletteSize');
        gl.uniform1i(paletteSizeLocation, palette.length)

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        setAttributeToArrayBuffer(gl, positionBuffer, positionLocation);

        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        setAttributeToArrayBuffer(gl, texCoordBuffer, texCoordLocation);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }, [ image, palette ])

    if (image === undefined) {
        return (
            <div className='w-full h-96 bg-enabled' />
        )
    }

    return (
        <canvas ref={ canvasRef } />
    )
}

export default WebGlCanvas;
