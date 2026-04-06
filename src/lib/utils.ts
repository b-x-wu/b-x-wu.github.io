export type IconButtonProps = {
  "aria-label": string;
  src: string;
  "data-tag"?: string;
};

export const getByDataTag = (dataTag: string): HTMLElement => {
  const eles = document.querySelectorAll(`[data-tag="${dataTag}"]`);
  if (eles.length > 1) {
    throw new Error(`Found ${eles.length} elements with data-tag: ${dataTag}`);
  }

  const ele = eles.values().next().value;
  if (ele === undefined) {
    throw new Error(`Found no elements with data-tag: ${dataTag}`);
  }

  return ele as HTMLElement;
};

export const updateIconButton = (
  dataTag: string,
  { "aria-label": ariaLabel, src }: Partial<IconButtonProps>,
): void => {
  console.log({ ariaLabel, src });
  const button = getByDataTag(dataTag);
  const div = button.querySelector("div");

  if (div === null) {
    throw new Error();
  }

  if (src !== undefined) {
    div.style.setProperty("--bg-image", `url(${src})`);
  }

  if (ariaLabel !== undefined) {
    button.setAttribute("aria-label", ariaLabel);
  }
};
