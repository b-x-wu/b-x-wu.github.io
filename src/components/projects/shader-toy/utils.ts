import { initProgram, initTexture, initArrayBuffer } from '../../common/webglUtils';

export const DATA_READY_EVENT_TYPE = 'dataReady';

/**
 * Creates an HTMLVideoElement with the 'dataReady' event
 * @returns an HTMLVideoElement
 */
export const createVideo = () => {
    let isVideoPlaying = false;
    let isVideoTimeUpdating = false;
    let hasFired = false;

    const video = document.createElement('video');

    video.addEventListener('playing', () => {
        isVideoPlaying = true;
        if (isVideoTimeUpdating && !hasFired) {
            video.dispatchEvent(new Event(DATA_READY_EVENT_TYPE));
            hasFired = true;
        }
    });

    video.addEventListener('timeupdate', () => {
        isVideoTimeUpdating = true;
        if (isVideoPlaying && !hasFired) {
            video.dispatchEvent(new Event(DATA_READY_EVENT_TYPE));
            hasFired = true;
        }
    });

    return video;
};

/**
 * Deletes resources from the webgl context, if they exist
 * @param gl the webgl rendering context
 * @param program the webgl program, if it exists
 * @param positionBuffer the webgl positionBuffer, if it exists
 * @param texCoordBuffer the webgl texCoordBuffer, if it exists
 * @param texture the webgl texture, if it exists
 */
export const deleteGlResources = (
    gl: WebGLRenderingContext,
    program: WebGLProgram | undefined,
    positionBuffer: WebGLBuffer | undefined,
    texCoordBuffer: WebGLBuffer | undefined,
    texture: WebGLTexture | undefined,
) => {
    if (program !== undefined) {
        gl.deleteProgram(program);
    }

    if (positionBuffer !== undefined) {
        gl.deleteBuffer(positionBuffer);
    }

    if (texCoordBuffer !== undefined) {
        gl.deleteBuffer(texCoordBuffer);
    }

    if (texture !== undefined) {
        gl.deleteTexture(texture);
    }
};

export const initializeShader = (
    vertexShaderSource: string,
    fragmentShaderSource: string, 
    source: HTMLVideoElement, 
    gl: WebGL2RenderingContext, 
    canvas: HTMLCanvasElement, 
    onError: (message: string) => void,
): [ WebGLProgram, WebGLBuffer, WebGLBuffer, WebGLTexture ] | void => {
    const program = initProgram(gl, vertexShaderSource, fragmentShaderSource);

    if (program === undefined) {
        onError?.('Could not initialize WebGL Program.');
        return;
    }

    // reset canvas size to match source dimensions
    const clientHeight = Math.floor(source.videoHeight / source.videoWidth * canvas.clientWidth);
    canvas.style.setProperty('height', clientHeight.toString() + 'px');
    const devicePixelRatio = window.devicePixelRatio || 1;
    gl.canvas.width = Math.floor(devicePixelRatio * canvas.clientWidth);
    gl.canvas.height = Math.floor(devicePixelRatio * clientHeight);

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
        onError?.('Could not initialize buffers.');
        return;
    }
        
    const texture = initTexture(gl);

    if (texture === undefined) {
        onError?.('Could not initialize texture.');
        return;
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    return [ program, positionBuffer, texCoordBuffer, texture ];
};
