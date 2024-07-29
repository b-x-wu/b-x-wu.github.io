import { BLACK, RgbColor, toHslColor, toLabColor, toRgbColor } from '../../common/colorUtils';
import mixbox, { RgbArray } from 'mixbox';

export enum ColorMetricType {
    EUCLIDEAN_RGB = 'Euclidean RGB',
    WEIGHTED_EUCLIDEAN_RGB = 'Weighted Euclidean RGB',
    DELTA_E = 'Delta E',
    HUE = 'Hue Difference',
    SATURATION = 'Saturation Difference',
    LIGHTNESS = 'Lightness Difference',
}

export type ColorMetric = (color1: RgbColor, color2: RgbColor) => number;

export const hueColorMetric: ColorMetric = (color1, color2) => {
    const hue1 = toHslColor(color1).hue;
    const hue2 = toHslColor(color2).hue;

    return Math.abs(hue1 - hue2);
};

export const saturationColorMetric: ColorMetric = (color1, color2) => {
    const saturation1 = toHslColor(color1).saturation;
    const saturation2 = toHslColor(color2).saturation;

    return Math.abs(saturation1 - saturation2);
};

export const lightnessColorMetric: ColorMetric = (color1, color2) => {
    const lightness1 = toHslColor(color1).lightness;
    const lightness2 = toHslColor(color2).lightness;

    return Math.abs(lightness1 - lightness2);
};

export const euclideanRgbColorMetric: ColorMetric = (color1, color2) => {
    return (color1.red - color2.red) ** 2 + (color1.green - color2.green) ** 2 + (color1.blue - color2.blue) ** 2;
};

export const weightedEuclideanRgbColorMetric: ColorMetric = (color1, color2) => {
    const redMean = (color1.red + color2.red) / 2;
    return (2 + redMean / 256) * (color1.red - color2.red) ** 2
        + 4 * (color1.green - color2.green) ** 2
        + (2 + (255 - redMean) / 256) * (color1.blue - color2.blue) ** 2;
};

export const deltaEColorMetric: ColorMetric = (color1, color2) => {
    const labColor1 = toLabColor(color1);
    const labColor2 = toLabColor(color2);

    return (labColor1.l - labColor2.l) ** 2 + (labColor1.a - labColor2.a) ** 2 + (labColor1.b - labColor2.b) ** 2;
};

export const COLOR_METRIC_MAP: Map<ColorMetricType, ColorMetric> = new Map<ColorMetricType, ColorMetric>([
    [ ColorMetricType.EUCLIDEAN_RGB, euclideanRgbColorMetric ],
    [ ColorMetricType.WEIGHTED_EUCLIDEAN_RGB, weightedEuclideanRgbColorMetric ],
    [ ColorMetricType.DELTA_E, deltaEColorMetric ],
    [ ColorMetricType.HUE, hueColorMetric ],
    [ ColorMetricType.SATURATION, saturationColorMetric ],
    [ ColorMetricType.LIGHTNESS, lightnessColorMetric ],
]);

export enum RenderedColorReducerType {
    PALETTE = 'Render palette color',
    PRESERVE_SL = 'Preserve saturation and lightness',
    PRESERVE_HUE = 'Preserve hue',
    AVERAGE = 'Average by color channel',
    MIXBOX = 'Mixbox average',
}

export type ColorReducer = (color1: RgbColor, color2: RgbColor) => RgbColor;

export const identityColorReducer: ColorReducer = (_, color2) => color2; // identity on the second argument

export const slPreservingColorReducer: ColorReducer = (color1, color2) => {
    const hslColor1 = toHslColor(color1);
    const hslColor2 = toHslColor(color2);

    return toRgbColor({ ...hslColor1, hue: hslColor2.hue });
};

export const huePreservingColorReducer: ColorReducer = (color1, color2) => {
    const hslColor1 = toHslColor(color1);
    const hslColor2 = toHslColor(color2);

    return toRgbColor({ ...hslColor2, hue: hslColor1.hue });
};

export const averageColorReducer: ColorReducer = (color1, color2) => {
    return {
        red: (color1.red + color2.red) / 2,
        green: (color1.green + color2.green) / 2,
        blue: (color1.blue + color2.blue) / 2,
    };
};

export const mixboxAverageColorReducer: ColorReducer = (color1, color2) => {
    const mixboxColor1: RgbArray = [ color1.red, color1.green, color1.blue ];
    const mixboxColor2: RgbArray = [ color2.red, color2.green, color2.blue ];

    const mixboxLerpResult = mixbox.lerp(mixboxColor1, mixboxColor2, 0.5);
    if (mixboxLerpResult === undefined) {
        // this shouldn't happen
        return BLACK;
    }

    return { red: mixboxLerpResult[0], green: mixboxLerpResult[1], blue: mixboxLerpResult[2] };
};

export const RENDERED_COLOR_REDUCER_MAP: Map<RenderedColorReducerType, ColorReducer> = new Map<RenderedColorReducerType, ColorReducer>([
    [ RenderedColorReducerType.PALETTE, identityColorReducer ],
    [ RenderedColorReducerType.PRESERVE_SL, slPreservingColorReducer ],
    [ RenderedColorReducerType.PRESERVE_HUE, huePreservingColorReducer ],
    [ RenderedColorReducerType.AVERAGE, averageColorReducer ],
    [ RenderedColorReducerType.MIXBOX, mixboxAverageColorReducer ],
]);

/**
 * Get the colors to render on the canvas based on the colors of the image and the colors in the palette
 * @param colors the colors of the iamge
 * @param palette the colors in the palette
 * @param colorMetricType type defining which color metric used to calculate distance between colors
 * @param renderedColorReducerType type defining how the current image color and the palette color should combine to create the rendered color
 * @returns the colors to render on the canvas
 */
export const getRenderedColors = (
    colors: RgbColor[],
    palette: RgbColor[],
    colorMetricType: ColorMetricType,
    renderedColorReducerType: RenderedColorReducerType,
) => {
    const colorMetric = COLOR_METRIC_MAP.get(colorMetricType);
    const colorReducer = RENDERED_COLOR_REDUCER_MAP.get(renderedColorReducerType);

    if (colorMetric === undefined || colorReducer === undefined) {
        throw new Error('Unexpected color metric and color reducers');
    }

    return colors.map((color) => {
        // get closest color present in the palette to the color of this pixel
        const closestPaletteColor = palette.reduce<{ color: RgbColor | undefined; distance: number }>((previousClosest, paletteColor) => {
            const distance = colorMetric(color, paletteColor);
            if (previousClosest.color === undefined) {
                return { color: paletteColor, distance };
            }

            if (distance < previousClosest.distance) {
                return { color: paletteColor, distance };
            }

            return previousClosest;
        }, { color: undefined, distance: Infinity }).color!;

        // given the color of the pixel and the closest color palette, generate the rendered color of the pixel
        return colorReducer(color, closestPaletteColor);
    });
};

export interface ColorPaletteChangeRequestData {
    /** the original colors in the image */
    colors: RgbColor[];
    /** the colors present in the palette */
    palette: RgbColor[];
    /** the type of color metric used to define color distance */
    colorMetric: ColorMetricType;
    /** the type of color reducer used to combine image and palette colors */
    renderedColorReducer: RenderedColorReducerType;
}

export interface ColorPaletteChangeResponseData {
    /** the colors the image should be set to */
    adjustedColors: RgbColor[];
}

export const RGB_TO_HSL_SHADER_SOURCE = `
vec3 rgb2hsl(vec3 color) {
 	vec3 hsl = vec3(0.0, 0.0, 0.0);

 	float fmin = min(min(color.r, color.g), color.b); //Min. value of RGB
 	float fmax = max(max(color.r, color.g), color.b); //Max. value of RGB
 	float delta = fmax - fmin; //Delta RGB value

 	hsl.z = (fmax + fmin) / 2.0; // Luminance

 	if (delta == 0.0) //This is a gray, no chroma...
 	{
 		hsl.x = 0.0; // Hue
 		hsl.y = 0.0; // Saturation
 	} else //Chromatic data...
 	{
 		if (hsl.z < 0.5)
 			hsl.y = delta / (fmax + fmin); // Saturation
 		else
 			hsl.y = delta / (2.0 - fmax - fmin); // Saturation

 		float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
 		float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
 		float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;

 		if (color.r == fmax)
 			hsl.x = deltaB - deltaG; // Hue
 		else if (color.g == fmax)
 			hsl.x = (1.0 / 3.0) + deltaR - deltaB; // Hue
 		else if (color.b == fmax)
 			hsl.x = (2.0 / 3.0) + deltaG - deltaR; // Hue

 		if (hsl.x < 0.0)
 			hsl.x += 1.0; // Hue
 		else if (hsl.x > 1.0)
 			hsl.x -= 1.0; // Hue
 	}

 	return hsl;
}
`

export const HSL_TO_RGB_SHADER_SOURCE = `
float hue2rgb(float f1, float f2, float hue) {
    if (hue < 0.0)
        hue += 1.0;
    else if (hue > 1.0)
        hue -= 1.0;
    float res;
    if ((6.0 * hue) < 1.0)
        res = f1 + (f2 - f1) * 6.0 * hue;
    else if ((2.0 * hue) < 1.0)
        res = f2;
    else if ((3.0 * hue) < 2.0)
        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
    else
        res = f1;
    return res;
}

vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;
    
    if (hsl.y == 0.0) {
        rgb = vec3(hsl.z); // Luminance
    } else {
        float f2;
        
        if (hsl.z < 0.5)
            f2 = hsl.z * (1.0 + hsl.y);
        else
            f2 = hsl.z + hsl.y - hsl.y * hsl.z;
            
        float f1 = 2.0 * hsl.z - f2;
        
        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
        rgb.g = hue2rgb(f1, f2, hsl.x);
        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
    }   
    return rgb;
}
`

export const VERTEX_SHADER = `
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

const COLOR_METRIC_TO_SOURCE_MAP = new Map<ColorMetricType, string>([
    [ColorMetricType.EUCLIDEAN_RGB, `
float metric(in vec4 color1, in vec4 color2)
{
    vec4 diff = color1 - color2;
    return diff.r * diff.r + diff.g * diff.g + diff.b * diff.b;
}
`], [ColorMetricType.WEIGHTED_EUCLIDEAN_RGB, `
float metric(in vec4 color1, in vec4 color2)
{
    float redMean = (color1.r + color2.r) / 2.0;
    vec4 diff = color1 - color2;
    vec3 squaredDiff = vec3(diff.r * diff.r, diff.g * diff.g, diff.b * diff.b);
    vec3 weightedDiff = vec3((2.0 + redMean / 256.0) * squaredDiff.r, 4.0 * squaredDiff.g, (2.0 + (255.0 - redMean) / 256.0) * squaredDiff.b);
    return weightedDiff.r + weightedDiff.g + weightedDiff.b;
}
`], [ColorMetricType.DELTA_E, `
vec3 rgb2xyz( vec3 c ) {
    vec3 tmp;
    tmp.x = ( c.r > 0.04045 ) ? pow( ( c.r + 0.055 ) / 1.055, 2.4 ) : c.r / 12.92;
    tmp.y = ( c.g > 0.04045 ) ? pow( ( c.g + 0.055 ) / 1.055, 2.4 ) : c.g / 12.92,
    tmp.z = ( c.b > 0.04045 ) ? pow( ( c.b + 0.055 ) / 1.055, 2.4 ) : c.b / 12.92;
    return 100.0 * tmp *
        mat3( 0.4124, 0.3576, 0.1805,
              0.2126, 0.7152, 0.0722,
              0.0193, 0.1192, 0.9505 );
}

vec3 xyz2lab( vec3 c ) {
    vec3 n = c / vec3( 95.047, 100, 108.883 );
    vec3 v;
    v.x = ( n.x > 0.008856 ) ? pow( n.x, 1.0 / 3.0 ) : ( 7.787 * n.x ) + ( 16.0 / 116.0 );
    v.y = ( n.y > 0.008856 ) ? pow( n.y, 1.0 / 3.0 ) : ( 7.787 * n.y ) + ( 16.0 / 116.0 );
    v.z = ( n.z > 0.008856 ) ? pow( n.z, 1.0 / 3.0 ) : ( 7.787 * n.z ) + ( 16.0 / 116.0 );
    return vec3(( 116.0 * v.y ) - 16.0, 500.0 * ( v.x - v.y ), 200.0 * ( v.y - v.z ));
}

vec3 rgb2lab(in vec3 c) {
    vec3 lab = xyz2lab( rgb2xyz( c ) );
    return vec3( lab.x / 100.0, 0.5 + 0.5 * ( lab.y / 127.0 ), 0.5 + 0.5 * ( lab.z / 127.0 ));
}

float metric(in vec4 color1, in vec4 color2)
{
    vec3 lab1 = rgb2lab(vec3(color1.rgb));
    vec3 lab2 = rgb2lab(vec3(color2.rgb));
    vec3 diff = lab1 - lab2;
    return diff.r * diff.r + diff.g * diff.g + diff.b * diff.b;
}
`], [ColorMetricType.HUE, `
${RGB_TO_HSL_SHADER_SOURCE}

float metric(in vec4 color1, in vec4 color2)
{
    vec3 hsl1 = rgb2hsl(color1.rgb);
    vec3 hsl2 = rgb2hsl(color2.rgb);
    return abs(hsl1.x - hsl2.x);
}
`], [ColorMetricType.SATURATION, `
${RGB_TO_HSL_SHADER_SOURCE}

float metric(in vec4 color1, in vec4 color2)
{
    vec3 hsl1 = rgb2hsl(color1.rgb);
    vec3 hsl2 = rgb2hsl(color2.rgb);
    return abs(hsl1.y - hsl2.y);
}
`], [ColorMetricType.LIGHTNESS, `
${RGB_TO_HSL_SHADER_SOURCE}

float metric(in vec4 color1, in vec4 color2)
{
    vec3 hsl1 = rgb2hsl(color1.rgb);
    vec3 hsl2 = rgb2hsl(color2.rgb);
    return abs(hsl1.z - hsl2.z);
}
`],
])

const COLOR_REDUCER_TO_SOURCE_MAP = new Map<RenderedColorReducerType, string>([
    [RenderedColorReducerType.PALETTE, `
vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    return vec4(paletteColor);
}
`], [RenderedColorReducerType.AVERAGE, `
vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    return vec4((textureColor + paletteColor) / 2.0);
}
`], [RenderedColorReducerType.PRESERVE_HUE, `
${RGB_TO_HSL_SHADER_SOURCE}

${HSL_TO_RGB_SHADER_SOURCE}

vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    vec3 textureHsl = rgb2hsl(textureColor.rgb);
    vec3 paletteHsl = rgb2hsl(paletteColor.rgb);

    return vec4(hsl2rgb(vec3(textureHsl.x, paletteHsl.yz)), 1.0);
}
`], [RenderedColorReducerType.PRESERVE_SL, `
${RGB_TO_HSL_SHADER_SOURCE}

${HSL_TO_RGB_SHADER_SOURCE}

vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    vec3 textureHsl = rgb2hsl(textureColor.rgb);
    vec3 paletteHsl = rgb2hsl(paletteColor.rgb);

    return vec4(hsl2rgb(vec3(paletteHsl.x, textureHsl.yz)), 1.0);
}
`], [RenderedColorReducerType.MIXBOX, `
uniform sampler2D mixbox_lut;

vec3 mixbox_eval_polynomial(vec3 c)
{
  float c0 = c[0];
  float c1 = c[1];
  float c2 = c[2];
  float c3 = 1.0 - (c0 + c1 + c2);

  float c00 = c0 * c0;
  float c11 = c1 * c1;
  float c22 = c2 * c2;
  float c01 = c0 * c1;
  float c02 = c0 * c2;
  float c12 = c1 * c2;
  float c33 = c3 * c3;

  return (c0*c00) * vec3(+0.07717053, +0.02826978, +0.24832992) +
         (c1*c11) * vec3(+0.95912302, +0.80256528, +0.03561839) +
         (c2*c22) * vec3(+0.74683774, +0.04868586, +0.00000000) +
         (c3*c33) * vec3(+0.99518138, +0.99978149, +0.99704802) +
         (c00*c1) * vec3(+0.04819146, +0.83363781, +0.32515377) +
         (c01*c1) * vec3(-0.68146950, +1.46107803, +1.06980936) +
         (c00*c2) * vec3(+0.27058419, -0.15324870, +1.98735057) +
         (c02*c2) * vec3(+0.80478189, +0.67093710, +0.18424500) +
         (c00*c3) * vec3(-0.35031003, +1.37855826, +3.68865000) +
         (c0*c33) * vec3(+1.05128046, +1.97815239, +2.82989073) +
         (c11*c2) * vec3(+3.21607125, +0.81270228, +1.03384539) +
         (c1*c22) * vec3(+2.78893374, +0.41565549, -0.04487295) +
         (c11*c3) * vec3(+3.02162577, +2.55374103, +0.32766114) +
         (c1*c33) * vec3(+2.95124691, +2.81201112, +1.17578442) +
         (c22*c3) * vec3(+2.82677043, +0.79933038, +1.81715262) +
         (c2*c33) * vec3(+2.99691099, +1.22593053, +1.80653661) +
         (c01*c2) * vec3(+1.87394106, +2.05027182, -0.29835996) +
         (c01*c3) * vec3(+2.56609566, +7.03428198, +0.62575374) +
         (c02*c3) * vec3(+4.08329484, -1.40408358, +2.14995522) +
         (c12*c3) * vec3(+6.00078678, +2.55552042, +1.90739502);
}

float mixbox_srgb_to_linear(float x)
{
  return (x >= 0.04045) ? pow((x + 0.055) / 1.055, 2.4) : x/12.92;
}

float mixbox_linear_to_srgb(float x)
{
  return (x >= 0.0031308) ? 1.055*pow(x, 1.0/2.4) - 0.055 : 12.92*x;
}

vec3 mixbox_srgb_to_linear(vec3 rgb)
{
  return vec3(mixbox_srgb_to_linear(rgb.r),
              mixbox_srgb_to_linear(rgb.g),
              mixbox_srgb_to_linear(rgb.b));
}

vec3 mixbox_linear_to_srgb(vec3 rgb)
{
  return vec3(mixbox_linear_to_srgb(rgb.r),
              mixbox_linear_to_srgb(rgb.g),
              mixbox_linear_to_srgb(rgb.b));
}

mat3 mixbox_rgb_to_latent(vec3 rgb)
{
  rgb = clamp(rgb, 0.0, 1.0);

  float x = rgb.r * 63.0;
  float y = rgb.g * 63.0;
  float z = rgb.b * 63.0;

  float iz = floor(z);

  float x0 = mod(iz, 8.0) * 64.0;
  float y0 = floor(iz / 8.0) * 64.0;

  float x1 = mod(iz + 1.0, 8.0) * 64.0;
  float y1 = floor((iz + 1.0) / 8.0) * 64.0;

  vec2 uv0 = vec2(x0 + x + 0.5, y0 + y + 0.5) / 512.0;
  vec2 uv1 = vec2(x1 + x + 0.5, y1 + y + 0.5) / 512.0;

  if (texture2D(mixbox_lut, vec2(0.5, 0.5) / 512.0).b < 0.1)
  {
    uv0.y = 1.0 - uv0.y;
    uv1.y = 1.0 - uv1.y;
  }

  vec3 c = mix(texture2D(mixbox_lut, uv0).rgb, texture2D(mixbox_lut, uv1).rgb, z - iz);

  return mat3(c, rgb - mixbox_eval_polynomial(c), vec3(0.0));
}

vec3 mixbox_latent_to_rgb(mat3 latent)
{
  vec3 rgb = clamp(mixbox_eval_polynomial(latent[0]) + latent[1], 0.0, 1.0);
  return rgb;
}

vec3 mixbox_lerp(vec3 color1, vec3 color2, float t)
{
  return mixbox_latent_to_rgb((1.0-t)*mixbox_rgb_to_latent(color1) + t*mixbox_rgb_to_latent(color2));
}

vec4 mixbox_lerp(vec4 color1, vec4 color2, float t)
{
  return vec4(mixbox_lerp(color1.rgb, color2.rgb, t), mix(color1.a, color2.a, t));
}

vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    return mixbox_lerp(textureColor, paletteColor, 0.5);
}
`]
]);

export const getFragmentShader = (colorMetric: ColorMetricType, colorReducer: RenderedColorReducerType) => {
    const colorMetricSourceString = COLOR_METRIC_TO_SOURCE_MAP.get(colorMetric);
    const colorReducerSourceString = COLOR_REDUCER_TO_SOURCE_MAP.get(colorReducer);
    return `
precision mediump float;

uniform int u_paletteSize;
uniform vec4 u_palette[64];
uniform sampler2D u_image;
varying vec2 v_texCoord;

${colorMetricSourceString}

${colorReducerSourceString}

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
}