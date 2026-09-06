import { map } from "nanostores";
import type { Optional } from "type-fest";
import { Color } from "~/lib/color";

export enum Mode {
  DRAW,
  ERASE,
}

export interface State {
  mode: Mode;
  pixels: Optional<Color>[][];
  color: Color; // selected color
}

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
  for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
      const color = state.pixels.at(y)?.at(x);
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
    }
  }
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
