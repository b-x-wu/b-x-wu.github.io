import { map } from "nanostores";
import type { Color } from "~/lib/color";
import { ColorMetricType, ColorReducerType } from "./utils";

export interface State {
  image: HTMLImageElement | undefined;
  palette: Color[];
  colorMetric: ColorMetricType;
  colorReducer: ColorReducerType;
}

export const stateStore = map<State>({
  image: undefined,
  palette: [],
  colorMetric: ColorMetricType.EUCLIDEAN_RGB,
  colorReducer: ColorReducerType.PALETTE,
});
