import { getById } from "~/lib/utils";

export type IconButtonProps = {
  "aria-label": string;
  src: string;
  id?: string;
};

export const updateIconButton = (
  id: string,
  { "aria-label": ariaLabel, src }: Partial<IconButtonProps>,
): void => {
  const button = getById(id);
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
