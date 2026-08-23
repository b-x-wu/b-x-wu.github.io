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
