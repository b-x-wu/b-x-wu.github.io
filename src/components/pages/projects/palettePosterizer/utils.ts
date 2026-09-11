import deltaEColorMetricSource from "~/assets/shaders/palette-posterizer/color-metrics/delta-e.glsl?raw";
import euclideanRgbColorMetricSource from "~/assets/shaders/palette-posterizer/color-metrics/euclidean-rgb.glsl?raw";
import hueColorMetricSource from "~/assets/shaders/palette-posterizer/color-metrics/hue.glsl?raw";
import lightnessColorMetricSource from "~/assets/shaders/palette-posterizer/color-metrics/lightness.glsl?raw";
import saturationColorMetricSource from "~/assets/shaders/palette-posterizer/color-metrics/saturation.glsl?raw";
import weightedEuclideanRgbColorMetricSource from "~/assets/shaders/palette-posterizer/color-metrics/weighted-euclidean-rgb.glsl?raw";
import averageColorReducerSource from "~/assets/shaders/palette-posterizer/color-reducers/average.glsl?raw";
import mixboxColorReducerSource from "~/assets/shaders/palette-posterizer/color-reducers/mixbox.glsl?raw";
import paletteColorReducerSource from "~/assets/shaders/palette-posterizer/color-reducers/palette.glsl?raw";
import preserveHueColorReducerSource from "~/assets/shaders/palette-posterizer/color-reducers/preserve-hue.glsl?raw";
import preserveSlColorReducerSource from "~/assets/shaders/palette-posterizer/color-reducers/preserve-sl.glsl?raw";
import fragmentShaderSourceTemplate from "~/assets/shaders/palette-posterizer/fragment-shader.glsl.template?raw";

export enum ColorMetricType {
  EUCLIDEAN_RGB = "Euclidean RGB",
  WEIGHTED_EUCLIDEAN_RGB = "Weighted Euclidean RGB",
  DELTA_E = "Delta E",
  HUE = "Hue Difference",
  SATURATION = "Saturation Difference",
  LIGHTNESS = "Lightness Difference",
}

export enum ColorReducerType {
  PALETTE = "Render palette color",
  PRESERVE_SL = "Preserve saturation and lightness",
  PRESERVE_HUE = "Preserve hue",
  AVERAGE = "Average by color channel",
  MIXBOX = "Mixbox average",
}

export const COLOR_METRIC_TO_SOURCE: Record<ColorMetricType, string> = {
  [ColorMetricType.EUCLIDEAN_RGB]: euclideanRgbColorMetricSource,
  [ColorMetricType.WEIGHTED_EUCLIDEAN_RGB]:
    weightedEuclideanRgbColorMetricSource,
  [ColorMetricType.DELTA_E]: deltaEColorMetricSource,
  [ColorMetricType.HUE]: hueColorMetricSource,
  [ColorMetricType.SATURATION]: saturationColorMetricSource,
  [ColorMetricType.LIGHTNESS]: lightnessColorMetricSource,
};

export const COLOR_REDUCER_TO_SOURCE: Record<ColorReducerType, string> = {
  [ColorReducerType.PALETTE]: paletteColorReducerSource,
  [ColorReducerType.AVERAGE]: averageColorReducerSource,
  [ColorReducerType.PRESERVE_HUE]: preserveHueColorReducerSource,
  [ColorReducerType.PRESERVE_SL]: preserveSlColorReducerSource,
  [ColorReducerType.MIXBOX]: mixboxColorReducerSource,
};

export const getFragmentShader = (
  colorMetric: ColorMetricType,
  colorReducer: ColorReducerType,
) =>
  fragmentShaderSourceTemplate
    .replaceAll(
      "{{ COLOR_METRIC_SOURCE_STRING }}",
      COLOR_METRIC_TO_SOURCE[colorMetric],
    )
    .replaceAll(
      "{{ COLOR_REDUCER_SOURCE_STRING }}",
      COLOR_REDUCER_TO_SOURCE[colorReducer],
    );
