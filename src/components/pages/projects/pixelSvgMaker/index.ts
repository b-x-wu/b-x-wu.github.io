import { computed, map } from "nanostores";
import type { Optional } from "type-fest";
import { Color } from "~/lib/color";
import { HTMLStringBuilder } from "~/lib/dom";
import { isNonNull } from "~/lib/utils";

export enum Mode {
  DRAW,
  ERASE,
}

export interface State {
  mode: Mode;
  pixels: Optional<Color>[][];
  color: Color; // selected color
}

interface Bounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const pixelsFlatMap = <T>(
  pixels: State["pixels"],
  callback: (color: Optional<Color>, { x, y }: { x: number; y: number }) => T,
): T[] => {
  return pixels.flatMap((row, y) =>
    row.map((color, x) => callback(color, { x, y })),
  );
};

const pixelsForEach = (
  pixels: State["pixels"],
  callback: (
    color: Optional<Color>,
    { x, y }: { x: number; y: number },
  ) => void,
): void => {
  pixels.forEach((row, y) => {
    row.forEach((color, x) => {
      callback(color, { x, y });
    });
  });
};

export const stateStore = map<State>({
  mode: Mode.DRAW,
  pixels: Array.from({ length: 16 }, () => new Array(16).fill(undefined)),
  color: Color.fromRgb({ red: 0, green: 0, blue: 0 }),
});

export const renderCanvas = (canvas: HTMLCanvasElement, state: State) => {
  const context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

  const pixelSideLength = context.canvas.width / 16;
  pixelsForEach(state.pixels, (color, { x, y }) => {
    const computeFillStyle = () => {
      if (color !== undefined) {
        return color.asRgbString();
      }

      // TODO: do we wanna tokenize these raw colors?
      if ((x + y) % 2 === 0) {
        return "#eaeaea";
      }

      return "#dadada";
    };

    context.fillStyle = computeFillStyle();
    context.fillRect(
      x * pixelSideLength,
      y * pixelSideLength,
      pixelSideLength,
      pixelSideLength,
    );
  });
};

export const modifyAt = (x: number, y: number) => {
  if (x < 0 || x >= 16 || y < 0 || y >= 16) {
    return;
  }

  const { pixels, mode, color } = stateStore.get();

  const modifiedPixels = pixels.map((row) => [...row]);
  modifiedPixels[y][x] = mode === Mode.ERASE ? undefined : color;

  stateStore.setKey("pixels", modifiedPixels);
};

const getBounds = ({ pixels }: State): Bounds | null => {
  let bounds: Bounds | null = null;
  pixelsForEach(pixels, (color, { x, y }) => {
    if (color === undefined) {
      return;
    }

    if (bounds === null) {
      bounds = { xMin: x, xMax: x, yMin: y, yMax: y };
      return;
    }

    bounds.xMin = Math.min(bounds.xMin, x);
    bounds.xMax = Math.max(bounds.xMax, x);
    bounds.yMin = Math.min(bounds.yMin, y);
    bounds.yMax = Math.max(bounds.yMax, y);
  });

  return bounds;
};

export const asSvgString = (state: State) => {
  const bounds = getBounds(state);
  if (bounds === null) {
    return HTMLStringBuilder.fromTag("svg")
      .withAttribute("xmlns", "http://www.w3.org/2000/svg")
      .withAttribute("version", "1.1")
      .asString();
  }

  const rectStrings: string[] = pixelsFlatMap(
    state.pixels,
    (color, { x, y }) => {
      if (color === undefined) {
        return undefined;
      }

      return HTMLStringBuilder.fromTag("rect")
        .withAttribute("width", "1")
        .withAttribute("height", "1")
        .withAttribute("x", String(x))
        .withAttribute("y", String(y))
        .withAttribute("shape-rendering", "geometricPrecision")
        .withAttribute("fill", color.asRgbString())
        .asString();
    },
  ).filter(isNonNull);

  const { xMin, yMin, xMax, yMax } = bounds;

  return HTMLStringBuilder.fromTag("svg")
    .withAttribute("xmlns", "http://www.w3.org/2000/svg")
    .withAttribute("version", "1.1")
    .withAttribute(
      "viewBox",
      `${xMin} ${yMin} ${xMax - xMin + 1} ${yMax - yMin + 1}`,
    )
    .withAttribute("preserveAspectRatio", "xMidYMid meet")
    .withInnerHtml(rectStrings.join(""))
    .asString();
};

export const svgStringStore = computed(stateStore, asSvgString);
