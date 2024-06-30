import { ColorPaletteChangeRequestData, ColorPaletteChangeResponseData, getAdjustedColors, hueColorMetric } from './utils';

addEventListener('message', (messageEvent: MessageEvent<ColorPaletteChangeRequestData>) => {
    const { colors, palette } = messageEvent.data;

    const adjustedColors = getAdjustedColors(colors, palette);
    
    postMessage({
        adjustedColors,
    } as ColorPaletteChangeResponseData);
});
