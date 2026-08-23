import { getByDataTag } from "~/lib/utils";

export type IconButtonProps = {
  "aria-label": string;
  src: string;
  "data-tag"?: string;
};

export const updateIconButton = (
  dataTag: string,
  { "aria-label": ariaLabel, src }: Partial<IconButtonProps>,
): void => {
  const button = getByDataTag(dataTag);
  const span = button.querySelector("span");

  if (span === null) {
    throw new Error();
  }

  if (src !== undefined) {
    span.style.setProperty("--bg-image", `url(${src})`);
  }

  if (ariaLabel !== undefined) {
    button.setAttribute("aria-label", ariaLabel);
  }
};
