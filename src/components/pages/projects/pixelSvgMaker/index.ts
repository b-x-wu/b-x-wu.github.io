import { map } from "nanostores";
import type { Optional } from "type-fest";
import { Color } from "~/lib/color";

enum Mode {
  PENCIL,
  ERASER,
}

export interface State {
  mode: Mode;
  pixels: Optional<Color>[][];
  color: Color; // selected color
}

export const stateStore = map<State>({
  mode: Mode.PENCIL,
  pixels: Array(16).fill(Array(16).fill(undefined)),
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
