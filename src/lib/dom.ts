export const getById = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const ele = document.getElementById(id);
  if (ele === null) {
    throw new Error(`Found no element with id: ${id}`);
  }

  return ele as T;
};

export const killEvent = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};
