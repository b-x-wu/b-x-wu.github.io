export const getById = (id: string): HTMLElement => {
  const ele = document.getElementById(id);
  if (ele === null) {
    throw new Error(`Found no element with id: ${id}`);
  }

  return ele;
};

export const killEvent = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};
