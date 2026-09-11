import { map } from "nanostores";

export interface State {
  image: HTMLImageElement | undefined;
}

export const stateStore = map<State>({
  image: undefined,
});
