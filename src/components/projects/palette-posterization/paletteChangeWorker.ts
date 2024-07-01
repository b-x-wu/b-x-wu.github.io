import { ColorPaletteChangeRequestData, ColorPaletteChangeResponseData, getRenderedColors } from './utils';

addEventListener('message', (messageEvent: MessageEvent<ColorPaletteChangeRequestData>) => {
    const { colors, palette, colorMetric, renderedColorReducer } = messageEvent.data;

    const adjustedColors = getRenderedColors(colors, palette, colorMetric, renderedColorReducer);
    
    postMessage({
        adjustedColors,
    } as ColorPaletteChangeResponseData);
});

